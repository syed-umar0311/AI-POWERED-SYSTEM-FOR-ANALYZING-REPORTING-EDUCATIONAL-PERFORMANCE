import React, { useEffect, useState } from "react";
import "../../styles/Courses.css";
import CourseSidebar from "../../components/curse_sidebar/CourseSidebar";

function Section() {
  const [get, setget] = useState([]); // State for filtered course
  const [getall, setgetall] = useState([]); // State for all courses
  const [id, setid] = useState(""); // State for search input
  const [show, setshowall] = useState(false); // State to toggle between filtered and all courses
  console.log(getall);
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
        <h1 className="over">Section</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Course ID"
            className="search-input"
            value={id}
            onChange={(e) => setid(e.target.value.toUpperCase())}
          />
          <button
            className="search-button"
            onClick={() => get_selected_course(id)}
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="table-container" >
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Instructor Name</th>
                <th>Department Name</th>
                <th>Class Size</th>
                <th>Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {show ? (
                <tr>
                  <td>{get["course_id"]}</td>
                  <td>{get["course_name"]}</td>
                  <td>{get["instructor_name"]}</td>
                  <td>{get["department_name"]}</td>
                  <td>{get["class_size"]}</td>
                  <td>{get["attendance"]}%</td>
                </tr>
              ) : (
                getall.map((course) => (
                  <tr key={course["course_id"]}>
                    <td>{course["course_id"]}</td>
                    <td>{course["course_name"]}</td>
                    <td>{course["instructor_name"]}</td>
                    <td>{course["department_name"]}</td>
                    <td>{course["class_size"]}</td>
                    <td>{course["attendance"]}%</td>
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

export default Section;
