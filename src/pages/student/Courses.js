import React from "react";
import "../../styles/Courses.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";
import { useState, useEffect } from "react";
function Courses({ search }) {
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
        <h1 className="over">Courses</h1>
        {/* <div className="search-container">
          <input
            type="text"
            placeholder="Search by student ID"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div> */}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Instructor Name</th>
                <th>Total Classes</th>
              </tr>
            </thead>
            <tbody>
              {course.map((course) => (
                <tr key={course["Course ID"]}>
                  <td>{course["Course ID"]}</td>
                  <td>{course["Course Name"]}</td>
                  <td>{course["Instructor Name"]}</td>
                  <td>{course["Total Classes"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Courses;
