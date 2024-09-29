import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import {fetchUserData} from './query'
export function CreateSkillBarChart() {
    useEffect(() => {
        const BarChart = async () => {
            const dataa =   await fetchUserData(query)
            const idata = dataa.user[0].transactions;
            const data = idata.reduce((acc, item) => {
              const type = item.type.replace("skill_", "");
             
                const existingItem = acc.find(i => i.type === type);
                if (existingItem) {
                  existingItem.amount = Math.max(existingItem.amount, item.amount);
                } else {
                  acc.push({ type, amount: item.amount });
                }
              
              return acc;
            }, []);
      // Get the unique skill types
      const skillTypes = [...new Set(data.map(d => d.type))];
    
      // Get the maximum value for scaling the chart
     // const maxValue = d3.max(data, d => d.amount);
    
      // Set up the chart dimensions
      
const width = 700;
const height = 350;
const paddingLeft = 10;
const paddingBottom = 10;
// Create the SVG container
const svg = d3.select('.chart1')
  .attr('width', width + paddingLeft)
  .attr('height', height + paddingBottom);
// Create the x-scale
const x = d3.scaleBand()
  .range([paddingLeft+30, width - paddingLeft])
  .padding(0.1);
// Create the y-scale
const y = d3.scaleLinear()
  .range([height - paddingBottom, paddingLeft]);
// Set the domains for the scales
x.domain(skillTypes);
y.domain([0, 100]);
// Create the bars
svg.selectAll('.bar')
  .data(data)
  .enter().append('rect')
  .attr('class', 'bar')
  .attr('x', d => x(d.type))
  .attr('width', x.bandwidth())
  .attr('height', d => height - paddingBottom - y(d.amount))
  .attr('y', d => y(d.amount));
  // Add chart title
svg.append("text")
.attr("x", width / 2)
.attr("y", 60 / 2)
.attr("text-anchor", "middle")
.style("font-size", "20px")
.style("font-weight", "bold")
.text("skills");
// Add the x-axis
svg.append('g')
  .attr('transform', `translate(0, ${height - paddingBottom})`)
  .call(d3.axisBottom(x));
// Add the y-axis
svg.append('g')
  .attr('transform', `translate(${paddingLeft+30}, 0)`)
  .call(d3.axisLeft(y)
  .tickFormat(d => `${(d / 100 * 100)}%`)
);
           }
           BarChart();
}, []);
}
const query = `query {
    user {
        transactions (
               where: { type: { _like: "skill_%" }}
        )
        {
            type
            amount
        }
    }
  }`;
 
    export function formatXP(xp, decimalPlaces) {
      if (xp >= 1000000) {
        return `${(xp / 1000000).toFixed(decimalPlaces)}MB`;
      } else if (xp >= 1000) {
        return `${(xp / 1000).toFixed(decimalPlaces)}kB`;
      } else {
        return xp.toFixed(decimalPlaces);
      }
    }
