
import './index.css';
import {handleLogout} from './LogOut'; 
import {AuditRatio} from './AuditRatio';
import {Matrices} from './Matrices';
import {ProjectInProgress} from './ProjectInProgress';
import {PieChart} from './PieChart';
import {CreateSkillBarChart} from './Skill';
import {Timeline} from './TimeLine';


export function ProfilePage() {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      window.location.href = "/";
      return null;
    }
    return (
      <div className="container">
        {/* Navigation Bar */}
        <div className="nav-bar">
          <div className="nav-link"><a href="/" onClick={handleLogout}>Logout</a></div>
          <h3 className='username'></h3>
        </div>
        {/* Body Sections */}
        <div className="profile-body">
        <div className='sections'>
        <div className="section">
          <div className='BasicInfo'>
          </div>
          </div>
        <div className="section">
          <Matrices/>
          </div>
          <div className="section">
          <div className='ProjectInProgress'>
          <ProjectInProgress/>
          </div>
          </div>
          </div>
          <div className='TimelineAndPieChart'>
          <div className="Timeline">
          <svg className="chart1"></svg>
            <CreateSkillBarChart/>
            {/* Overview content goes here */}
          </div>
         
          <div className="section" id='audit'>
          <div className='audit-ratio'></div>
         
            <svg className="hbar1a"></svg>
            <p className='Done'></p>
            <svg className="hbar1b"></svg>
            <p className='Received'></p>
            <AuditRatio/>
            {/* Activity content goes here */}
      
          </div>
  </div>
        </div>
        <div className='TimelineAndPieChart'>
        <div className='Timeline'>
          <svg className="chart2">
          </svg>
            <Timeline/>
            {/* Settings content goes here */}
          
          </div>
          <div className='PieChart'>
          <svg className="chart4">
          </svg>
            <PieChart/>
            {/* Settings content goes here */}
            <h4 className='Arc-Info'></h4>
          </div>
      
          </div>
      </div>
    );
  }

  export default ProfilePage;
  