import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar'
import { useState, useEffect } from 'react'
function Performance({search}) {
   const [course, setcourse] = useState([]);
  
    useEffect(() => {
      if (search && search["Courses"]) {
        setcourse(search["Courses"]);
      }
    }, [search]);
  
    console.log("course", course);
  
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Performance</h1>
      {/* <div className="search-container">
        <input type="text" placeholder="Search by student ID" className="search-input" />
        <button className="search-button">Search</button>
      </div> */}

      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Progress</th>
            <th>Prediction</th>
            <th>Mid Term Marks</th>
            <th>Predict GPA</th>
          </tr>
        </thead>
        <tbody>
          {course.map((course) => (
            <tr key={course["Course ID"]}>
              <td>{course["Course Name"]}</td>
              <td>{course["Instructor Name"]}</td>
              <td>{course["Progress"]}</td>
              <td>{course["Prediction"]}</td>
              <td>{course["Assignment Marks"]}</td>
              <td>{course["Prediction"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </div>
  </div>
  )
}

export default Performance
