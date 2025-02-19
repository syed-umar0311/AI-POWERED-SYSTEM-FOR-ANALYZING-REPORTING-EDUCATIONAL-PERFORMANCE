import React from 'react'
import '../student_sidebar/Student_sidebar.css';
import { Link } from "react-router-dom";
function CourseSidebar() {
  return (
    <div className="sidebar">
    <h2 className="sidebar-title">ANALYSIS</h2>
    <ul className="sidebar-menu">
      <li><Link to="/courseoverview">Overview</Link></li>
      <li><Link to="/section">Sections</Link></li>
      <li><Link to="/courseperformance">Performance</Link></li>
      <li><Link to="/grade">Grade</Link></li>
      {/* <li><Link to="/coursecompare">Compare</Link></li> */}
      <li><Link to="/coursereport">Report</Link></li>
      <li><Link to="/">Back</Link></li>
    </ul>
  </div>
  )
}

export default CourseSidebar
