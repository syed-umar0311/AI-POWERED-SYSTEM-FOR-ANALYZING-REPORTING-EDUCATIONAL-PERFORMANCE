import React from 'react'
import '../student_sidebar/Student_sidebar.css';
import { Link } from "react-router-dom";
function InstructorSidebar() {
  return (
    <div className="sidebar">
       <h2 className="sidebar-title">ANALYSIS</h2>
       <ul className="sidebar-menu">
         <li><Link to="/insta">Overview</Link></li>
         <li><Link to="/instasection">Sections</Link></li>
         <li><Link to="/studentfeed">Student Feedback</Link></li>
         <li><Link to="/instaPerformance">Performance</Link></li>
         <li><Link to="/comparison">Trends</Link></li>
         <li><Link to="/need">Needs</Link></li>
         <li><Link to="/instareport">Report</Link></li>
         <li><Link to="/">Back</Link></li>
       </ul>
     </div>
  )
}

export default InstructorSidebar
