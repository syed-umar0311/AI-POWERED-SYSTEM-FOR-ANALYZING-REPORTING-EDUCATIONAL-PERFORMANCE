import React from 'react'
import '../../styles/Studentoverview.css'
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar'
function Instructor() {
  return (
    <div className="main_student">
    <InstructorSidebar />
    <div className="side_overview">
      <h1 className="over">Overview</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>


      <div className="over_options">
              <div className="opt">
                <h2 className="opt_h2">Instructor Name:</h2>
                <h2 className="opt_h2">umar</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Teaching Courses</h2>
                <h2 className="opt_h2">4</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Departments:</h2>
                <h2 className="opt_h2">4</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Total Students</h2>
                <h2 className="opt_h2">22</h2>
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
              
            </div>
      </div>
      </div>
  )
}

export default Instructor
