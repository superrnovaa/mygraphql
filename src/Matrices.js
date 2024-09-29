import { useState, useEffect } from 'react';
import { fetchUserData } from './query';
import { formatXP } from './XPFormatter'; // Import the formatXP function

export function Matrices() {
  
    const [XPS, setXPS] = useState(0);
    const [Level, setLevel] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const XPdata = await fetchUserData(query1);
            setXPS(parseInt(XPdata.transaction_aggregate.aggregate.sum.amount));
            const userId = await fetchUserData(query3);
            let Id =userId.user[0].id
            const query2 = `query {
              level: transaction(
                                         limit: 1
                                         order_by: { amount: desc }
                                         where: {
                                             userId: { _eq: ${Id} }
                                             type: { _eq: "level" }
                                             }
                                         
                                         ) { amount }
                                     }
                                     `;
    
            const Leveldata = await fetchUserData(query2);;
            setLevel(parseInt(Leveldata.level[0].amount));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      let LevelTitle;
    if (Level < 12) {
LevelTitle = 'Aspiring developer'
    } else if (Level >= 12 && Level < 20) {
        LevelTitle = 'Beginner developer'   
    } else if (Level >= 20 && Level < 33) {
        LevelTitle = 'Apprentice developer'   
    } else if (Level >= 33 && Level < 42) {
        LevelTitle = 'Assistant developer'   
    } else if (Level >= 42 && Level < 50) {
        LevelTitle = 'Basic developer'   
    } else if (Level >= 50) {
        LevelTitle = 'Junior developer'   
    }
      return (
        <>
        <div className="circle-container">
          <h3 className='title'>{LevelTitle}</h3>
          <div className="circle">
            <span className="level-text">Level</span>
            <span className="level-number">{Level}</span>
          </div>
        </div>
        <div className='xps-container'>
          <div className='xps'>
            <h3 className="xps-title">Total XP</h3>
            <span className="xps-value">{formatXP(XPS, 0)}</span>
          </div>
        </div>
      </>
      );
    };

    export default Matrices;

    //xps
const query1 = `query {
    transaction_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }`;
  //level
  const query3 = `
         
  query {
    user {
      id
    }
  }
  `;