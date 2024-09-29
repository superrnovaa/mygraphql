import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'
import {formatXP} from './XPFormatter'

export function AuditRatio() {
    useEffect(() => {
      const Auditratio = async () => {
      
  const data =   await fetchUserData(query1)
  const usernameElement = document.querySelector('.username');
  
  // Set the text content of the <h1> element
  usernameElement.textContent = `${data.user[0].firstName} ${data.user[0].lastName} Profile`;
  
  const BasicInfo = document.querySelector('.BasicInfo');
  BasicInfo.innerHTML = `
    <h3 className="title" style="text-align: center;">Basic user identification</h3>
    <ul style="list-style-type: none;">
      <li style="font-weight: bold;">Username: <span style="color: green; font-weight: normal;">${data.user[0].login || '-'}</span></li>
      <li style="font-weight: bold;">National ID: <span style="color: green; font-weight: normal;">${data.user[0].attrs[2] || '-'}</span></li>
      <li style="font-weight: bold;">Gender: <span style="color: green; font-weight: normal;">${data.user[0].attrs[3] || '-'}</span></li>
      <li style="font-weight: bold;">Email: <span style="color: green; font-weight: normal;">${data.user[0].email || '-'}</span></li>
      <li style="font-weight: bold;">Mobile: <span style="color: green; font-weight: normal;">${data.user[0].attrs['Phone'] || '-'}</span></li>
      <li style="font-weight: bold;">Qualifications: <span style="color: green; font-weight: normal;">${data.user[0].attrs['Degree'] || '-'}</span></li>
      <li style="font-weight: bold;">Occuption: <span style="color: green; font-weight: normal;">${data.user[0].attrs['jobtitle'] || '-'}</span></li>
      <li style="font-weight: bold;">Employment: <span style="color: green; font-weight: normal;">${data.user[0].attrs['employment'] || '-'}</span></li>
    </ul>
  `;
  //<li>Date of Birth: <span>${formatDate(userData[0].attrs['4'])}</span></li>
  
  const userData = {
  totalUp: parseFloat(data.user[0].totalUp),
  totalDown: parseFloat(data.user[0].totalDown),
  auditRatio: parseFloat(data.user[0].auditRatio)
  };
  
  const totalWidth = 300;
  const totalWidth1 = 400;
  
  const chartContainera = d3.select('.hbar1a');
  const chartContainerb = d3.select('.hbar1b');
  
    const upWidth = (userData.totalUp / (userData.totalUp + userData.totalDown)) * totalWidth1;
    const downWidth = (userData.totalDown / (userData.totalUp + userData.totalDown)) * totalWidth1;
  
    // Create the SVG elements
    chartContainera.append('rect')
      .attr('class', 'bar-down')
      .attr('width', downWidth)
  
    chartContainerb.append('rect')
      .attr('class', 'bar-up')
      .attr('width', upWidth)
      // Display the audit ratio
  
  d3.select('.audit-ratio')
    .text(`Audit Ratio: ${userData.auditRatio.toFixed(1)}`)
    .style('left', `${downWidth - 50}xp`);
  
    const Up1 = document.querySelector('.Done');
  
  // Set the text content of the <h1> element
  Up1.textContent = `Done: ${formatXP(userData.totalUp, 2)} XP`;
  
  const Down1 = document.querySelector('.Received');
  
  // Set the text content of the <h5> element
  Down1.textContent = `Received: ${formatXP(userData.totalDown, 2)} XP`;
  
      }
  
      Auditratio();
    }, []);
  
  }

  export default AuditRatio;

    
  const query1 = `
         
  query {
    user {
      id
      login
      auditRatio
      totalDown
      totalUp
      lastName
      firstName
      email
      attrs
    }
  }
  `;
  