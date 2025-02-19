import React from 'react'
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar'
import "../../styles/Studentoverview.css";
import "../../styles/Courses.css";
import { useState, useEffect } from "react";

function Courseperformance() {
  const [get, setget] = useState([]); // State for filtered course
  const [getall, setgetall] = useState([]); // State for all courses
  const [id, setid] = useState(""); // State for search input
  const [show, setshowall] = useState(false); // State to toggle between filtered and all courses

  // Fetch a specific course by ID
  const get_selected_course = async (id) => {
    if (!id) {
      alert("Please enter a Course ID");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/get_course/${id}`);
      if (!response.ok) {
        throw new Error("Course not found");
      }
      const data = await response.json();
      setget(data);
      setshowall(true); // Show filtered course
    } catch (error) {
      console.error("Error fetching data:", error);
      setget([]); // Clear filtered course
      setshowall(false); // Show all courses
      alert("Course not found. Please try again.");
    }
  };
  // console.log(get["course_id"]);
  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_courses");
        const data = await response.json();
        setgetall(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);

  // Log the filtered course data whenever it changes
  // useEffect(() => {
  //   console.log("get data", get);
  // }, [get]);

  return (
    <div className="main_student">
    <CourseSidebar />
    <div className="side_overview">
      <h1 className="over">Performance</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" value={id} onChange={(e) => setid(e.target.value.toUpperCase())} />
        <button className="search-button" onClick={()=>{get_selected_course(id)}}>Search</button>
      </div>

      {/* table */}
      <div className="table-container" style={{ overflowY: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Department Name</th>
            <th>Taken classes</th>
            <th>Total classes</th>
            <th>Attendance (%)</th>
            <th>Feedback Rate</th>
            <th>Participation</th>
            <th>DropOut</th>
          </tr>
        </thead>
        <tbody>
        {show ? (
                <tr>
                  <td>{get["course_id"]}</td>
                  <td>{get["course_name"]}</td>
                  <td>{get["instructor_name"]}</td>
                  <td>{get["department_name"]}</td>
                  <td>{get["taken_classes"]}</td>
                  <td>{get["total_classes"]}</td>
                  <td>{get["attendance"]}%</td>
                  <td>{get["feedback_rate"]}</td>
                  <td>{get["participation"]}</td>
                  <td>{get["dropout"]}</td>
                </tr>
              ) : (
                getall.map((course) => (
                  <tr key={course["course_id"]}>
                    <td>{course["course_id"]}</td>
                    <td>{course["course_name"]}</td>
                    <td>{course["instructor_name"]}</td>
                    <td>{course["department_name"]}</td>
                    <td>{course["taken_classes"]}</td>
                    <td>{course["total_classes"]}%</td>
                    <td>{course["attendance"]}%</td>
                    <td>{course["feedback_rate"]}</td>
                    <td>{course["participation"]}</td>
                    <td>{course["dropout"]}</td>
                  </tr>
                ))
              )}
        </tbody>
      </table>

      </div>
      </div>
      </div>


  )
}

export default Courseperformance
