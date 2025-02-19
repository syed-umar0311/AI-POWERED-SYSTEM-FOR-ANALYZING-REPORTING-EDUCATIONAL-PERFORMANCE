import React from 'react'
import "../../styles/Studentoverview.css";
import "../../styles/Courses.css";
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar';
import { useState, useEffect } from 'react';

function InstructorSection() {
const [get, setget] = useState([]); // State for filtered course
  const [getall, setgetall] = useState([]); // State for all courses
  const [id, setid] = useState(""); // State for search input
  const [show, setshowall] = useState(false); // State to toggle between filtered and all courses
  console.log(getall);    


  const get_selected_insta = async (id) => {
    if (!id) {
      alert("Please enter a Course ID");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/get_instructor/${id}`);
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
      <h1 className="over">Section</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" value={id} onChange={(e) => setid(e.target.value.toUpperCase())} />
        <button className="search-button" onClick={()=>{get_selected_insta(id)}}>Search</button>
      </div>

      {/* table */}
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Instructor Name</th>
            <th>Course Name</th>
            <th>Department Name</th>
            <th>Students</th>
            <th>Section</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
        {show ? (
                <tr>
                  <td>{get["INSTRUCTOR NAME"]}</td>
                  <td>{get["COURSE NAME"]}</td>
                  <td>{get["DEPARTMENT"]}</td>
                  <td>{get["TOTAL STUDENTS"]}</td>
                  <td>{get["SECTION"]}</td>
                  <td>{get["ATTENDANCE"]}%</td>
                </tr>
              ) : (
                getall.map((course) => (
                  <tr key={course["COURSE ID"]}>
                    <td>{course["INSTRUCTOR NAME"]}</td>
                    <td>{course["COURSE NAME"]}</td>
                    <td>{course["DEPARTMENT NAME"]}</td>
                    <td>{course["TOTAL STUDENTS"]}</td>
                    <td>{course["SECTION"]}</td>
                    <td>{course["ATTENDANCE"]}%</td>
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

export default InstructorSection
