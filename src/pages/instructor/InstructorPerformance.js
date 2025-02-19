import React from "react";
import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import { useState, useEffect } from "react";
function InstructorPerformance() {
  const [get, setget] = useState([]); // State for filtered course
  const [id, setid] = useState(""); // State for search input
  const [getall, setgetall] = useState([]); // State for all courses
  const [show, setshowall] = useState(false); // State to toggle between filtered and all courses

  const get_selected_insta = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_instructor/${id}`
      );
      const data = await response.json();
      setget(data); // Update state
      setshowall(true)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_instructors");
        const data = await response.json();
        setgetall(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="main_student">
      <InstructorSidebar />
      <div className="side_overview">
        <h1 className="over">Performance</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Instructor ID"
            className="search-input"
            value={id}
            onChange={(e) => setid(e.target.value.toUpperCase())}
          />
          <button
            className="search-button"
            onClick={() => {
              get_selected_insta(id);
            }}
          >
            Search
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Instructor Name</th>
                <th>Course Name</th>
                <th>Students</th>
                <th>Attendance</th>
                <th>Department</th>
                <th>section</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {show ? (
                <tr>
                  <td>{get["INSTRUCTOR NAME"]}</td>
                  <td>{get["COURSE NAME"]}</td>
                  <td>{get["TOTAL STUDENTS"]}</td>
                  <td>{get["ATTENDANCE"]}%</td>
                  <td>{get["DEPARTMENT"]}</td>
                  <td>{get["SECTION"]}</td>
                  <td>{get["PROGRESS"]}</td>
                </tr>
              ) : (
                getall.map((course) => (
                  <tr key={course["COURSE ID"]}>
                    <td>{course["INSTRUCTOR NAME"]}</td>
                    <td>{course["COURSE NAME"]}</td>
                    <td>{course["TOTAL STUDENTS"]}</td>
                    <td>{course["ATTENDANCE"]}%</td>
                    <td>{course["DEPARTMENT"]}</td>
                    <td>{course["SECTION"]}</td>
                    <td>{get["PROGRESS"]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InstructorPerformance;
