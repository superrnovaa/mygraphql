import * as d3 from 'd3';
import { useEffect } from 'react';
import { fetchUserData } from './query';
import { formatXP } from './XPFormatter';

 
export function PieChart() {
    useEffect(() => {
      const Piechart = async () => {
        const dataa = await fetchUserData(query);
        const data = dataa.user[0].timeline;

  const width = 350;
  const height = 350;
  const padding = 30;

  const svg = d3.select(".chart4")
    .attr("width", width)
    .attr("height", height);

  // Calculate the total amount
  const totalAmount = d3.sum(data, d => d.amount);

  // Create the pie chart
  const pie = d3.pie()
    .value(d => d.amount);

    const arc = d3.arc()
    .outerRadius(Math.min(width, height) / 2 - padding)
    .innerRadius(0);
  
  const g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
  // Define the colors with opacity, excluding black
  const colors = d3.schemeCategory10.filter(color => color !== "#000000")
    .map(color => d3.color(color).copy({ opacity: 0.2 }));
  
  const borderColors = d3.schemeCategory10.filter(color => color !== "#000000");
  
  g.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colors[i % colors.length])
    .attr("stroke", (d, i) => borderColors[i % borderColors.length])
    .attr("stroke-width", 2);
  

  g.append("text")
  .attr("transform", (d) => `translate(0)`)
    .attr('class', 'arcs')
    .style('visibility', 'hidden')
    .text(d => `${d.data.path.split('/')[3]}: ${(formatXP(d.data.amount, 2))} xp`);
    const ArcInfo = document.querySelector('.Arc-Info');
  
  g.on('mouseover', function(d) {
    d3.select(this).select('.arcs')
      //.style('visibility', 'visible')
      .style('font-weight', 'bold');
      let value = d3.select(this).select('.arcs').text()
      

// Set the text content of the <h1> element
ArcInfo.textContent = `${value}`;
  })
  .on('mouseout', function(d) {
    d3.select(this).select('.arcs')
      .style('visibility', 'hidden');
      ArcInfo.textContent = "";
  });

    // Add the label for each data point
    g.append("text")
    .attr("transform", `translate(${width / 2}, ${height})`)
    .attr('class', 'arcs')
    .style('font-weight', 'bold')
    .style('visibility', 'hidden')
    .text(d => `${d.data.path.split('/')[3]}: ${(d.data.amount )}`);


  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", padding / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("XP earned by project");
}
Piechart();
}, []);
  }

  export default PieChart;


// Query for the pie chart data
const query = `query {
  user {
    login
    timeline: transactions(
      where: {type: {_eq: "xp"}, _and:[
        {path: {_nlike: "%/bh-piscine/%"},
        _or: [{path:{_nlike: "%/piscine-js%"}}],
        _and:[{path:{_nlike: "%/checkpoint/%"}}]}]}
    ) {
      amount
      type
      createdAt
      path
    }
  }
}`;
