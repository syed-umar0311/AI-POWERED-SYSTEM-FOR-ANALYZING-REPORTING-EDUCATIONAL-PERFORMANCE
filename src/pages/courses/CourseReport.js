import React from 'react'
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar'
import "../../styles/Studentoverview.css";

function CourseReport() {
  return (
    <div className="main_student">
      <CourseSidebar />
      <div className="side_overview">
        <h1 className="over">Generate Report</h1>
        <div className="search-container">
          <input type="text" placeholder="Search by Course ID" className="search-input" />
          <button className="search-button">Search</button>
        </div>

        {/* report */}
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <button
              style={buttonStyle}
            >
              Generate Report
            </button>
            <button
              style={buttonStyle}
            >
              Generate AI Performance Graph
            </button>
            <button
              style={buttonStyle}
            >
              Generate Attendance AI Graph
            </button>
            <button
              style={buttonStyle}
            >
              Generate Instructor Performance Graph
            </button>
          </div>
        </div>




      </div>
    </div>


  )
}

const buttonStyle = {

  margin: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',

};
export default CourseReport
