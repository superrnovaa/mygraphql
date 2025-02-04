import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'
import {formatXP} from './XPFormatter'



export function Timeline() {
    useEffect(() => {
      const PieChart = async () => {
        const dataa = await fetchUserData(query);
        const data = dataa.user[0].timeline;
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
 
        // Set up the dimensions of the chart
        var width = 600;
        var height = 270;
        var padding = { top: 80, right: 120, bottom: 20, left: 90 };
  
        // Create the SVG container
        var svg = d3.select(".chart2")
          .attr("width", width + padding.left + padding.right)
          .attr("height", height + padding.top + padding.bottom);
  
        // Create the chart area within the SVG container
        var chartArea = svg.append("g")
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")");
  
        // Create the scales for the x and y axes
        var x = d3.scaleTime()
          .range([0, width]);
        var y = d3.scaleLinear()
          .range([height, 0]);
  
        // Set the domains for the scales
        x.domain(d3.extent(data, function(d) { return new Date(d.createdAt); }));
  
        // Calculate the cumulative amount
        let cumulativeAmount = 0;
        data.forEach((d) => {
          cumulativeAmount += d.amount;
          d.cumulativeAmount = cumulativeAmount;
        });
  
        // Set the y-axis domain based on the maximum cumulative amount
        y.domain([0, d3.max(data, function(d) { return d.cumulativeAmount; })]);
  
        // Create the line generator
        var line = d3.line()
          .x(function(d) { return x(new Date(d.createdAt)); })
          .y(function(d) { return y(d.cumulativeAmount); });
  
        // Add the line to the chart
        chartArea.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", line);
  
        // Add the data points to the chart
        var dots = chartArea.selectAll(".dot")
          .data(data)
          .enter().append("g")
          .attr("class", "dot")
          .attr("transform", function(d) {
            return "translate(" + x(new Date(d.createdAt)) + "," + y(d.cumulativeAmount) + ")";
          });
  
        // Add the dot
      dots.append('circle')
      .attr('r', 5)
      .on('mouseover', function(d) {
        d3.select(this.parentNode).select('.label')
          .style('visibility', 'visible');
      })
      .on('mouseout', function(d) {
        d3.select(this.parentNode).select('.label')
          .style('visibility', 'hidden');
      });

    // Add the label for each data point
    dots.append('text')
      .attr('class', 'label')
      .attr('x', 10)
      .attr('y', 0)
      .attr('dy', '.35em')
      .style('visibility', 'hidden')
      .text((d) => d.path.split('/')[3]);

  
        // Add the x-axis
        chartArea.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m")));
  
        // Add the y-axis
        chartArea.append("g")
          .attr("class", "y-axis")
          .call(d3.axisLeft(y).tickFormat(d3.format(",.0f")));
  
        // Add the y-axis label
        chartArea.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Cumulative Amount");
  
        // Add the chart title
        chartArea.append("text")
          .attr("x", width / 2)
          .attr("y", -40)
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .attr("text-anchor", "middle")
          .text("progress over time");
      };
      PieChart();
    }, []);
  }

  export default Timeline;
 



    // timeline
    const query = `query {
  user {
    login
    timeline: transactions(
where: {type: {_eq: "xp"}, _and:[
{path: {
  _nlike: "%/bh-piscine/%"},
  _or: [
    {
      path:{_nlike: "%/piscine-js%"
      }}
  ],_and:[{
      path:{_nlike: "%/checkpoint/%"
  }}]
    
  

}]}
) {

      amount
type
      createdAt
      path
    }
  }
}`;
