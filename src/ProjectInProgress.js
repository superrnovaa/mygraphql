import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'

export function ProjectInProgress(){
    useEffect(() => {
      const InProgress = async () => {
        let status;
        const data =   await fetchUserData(query)
        const objectNames = data.progress.map(item => item.object.name);
        if (objectNames.length < 1) {
  status = "Inactive";
        } else{
          status = "Active";
        }
        const box = document.querySelector('.ProjectInProgress');
        box.innerHTML = `
        <h3 class="title" style="text-align: center;">
          You are currently
          <div style="font-size: 40px; color: green; ">
            <span >•  ${status}</span>
          </div>
        </h3>
      `;
      if (status === "Active"){
        box.innerHTML += '<h4> You are currently working on:</h4>';
          // Iterate over the data array and add each item as a list item
       objectNames.forEach(item => {
        box.innerHTML += `<ul style="list-style-type: square;"><li style="font-size: 20px;">${item}</li></ul>`;
      });
    } else {
      box.innerHTML += '<h3> Start working on new projects !!!</h3>';
    }
  
      }
        InProgress();
    }, []);
  }
  
  export default ProjectInProgress;
  
  //in progress 
  const query = `
  query {
    progress(
      where: { isDone: { _eq: false }, object: { type: { _eq: "project" } } }
    ) {
      object {
        name
      }
    }
  }
  `;
  
