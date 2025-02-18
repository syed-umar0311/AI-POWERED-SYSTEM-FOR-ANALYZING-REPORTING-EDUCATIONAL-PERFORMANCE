import React from 'react'
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar'
import "../../styles/Studentoverview.css";

function Course() {
  return (
    <div className="main_student">
    <CourseSidebar />
    <div className="side_overview">
      <h1 className="over">Overview</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>


      <div className="over_options">
              <div className="opt">
                <h2 className="opt_h2">Course Name:</h2>
                <h2 className="opt_h2">calculus</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">instructor name:</h2>
                <h2 className="opt_h2">umare</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Department:</h2>
                <h2 className="opt_h2">se</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">section</h2>
                <h2 className="opt_h2">2</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">credit_hours:</h2>
                <h2 className="opt_h2">10</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">attendense</h2>
                <h2 className="opt_h2">3.4</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Progress:</h2>
                <h2 className="opt_h2">GOOD</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Class size:</h2>
                <h2 className="opt_h2">32</h2>
              </div>
            </div>
      </div>
      </div>


  )
}

export default Course
