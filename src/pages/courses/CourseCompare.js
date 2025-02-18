import React from 'react'
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar'
import "../../styles/Studentoverview.css";

function CourseCompare() {
  return (
    <div className="main_student">
    <CourseSidebar />
    <div className="side_overview">
      <h1 className="over">Compare</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>


      </div>
      </div>


  )
}

export default CourseCompare
