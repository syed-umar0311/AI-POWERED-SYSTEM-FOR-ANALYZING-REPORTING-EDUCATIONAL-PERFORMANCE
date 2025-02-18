import React from 'react'
import '../student_sidebar/Student_sidebar.css';
import { Link } from "react-router-dom";

function Studentsidebar() {
  return (
    <div className="sidebar">
    <h2 className="sidebar-title">ANALYSIS</h2>
    <ul className="sidebar-menu">
      <li><Link to="/overview">Overview</Link></li>
      <li><Link to="/courses">Courses</Link></li>
      <li><Link to="/performance">Performance</Link></li>
      <li><Link to="/attendence">Attendence</Link></li>
      <li><Link to="/compare">Compare</Link></li>
      <li><Link to="/report">Report</Link></li>
      <li><Link to="/add">Add Manually</Link></li>
      <li><Link to="/">Back</Link></li>
    </ul>
  </div>
  )
}

export default Studentsidebar
