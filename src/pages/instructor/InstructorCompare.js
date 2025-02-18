import React from 'react'
import '../../styles/Courses.css'
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar'

function InstructorCompare() {

  return (
    <div className="main_student">
    <InstructorSidebar />
    <div className="side_overview">
      <h1 className="over">Compare </h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Instructor ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>



    </div>
  </div>
  )
}

export default InstructorCompare
