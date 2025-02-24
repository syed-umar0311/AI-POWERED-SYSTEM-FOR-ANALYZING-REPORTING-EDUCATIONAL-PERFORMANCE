import React, { useEffect, useState } from "react";
import "../../styles/Courses.css";
import CourseSidebar from "../../components/curse_sidebar/CourseSidebar";

function Section() {
  const [get, setget] = useState([]); 
  const [getall, setgetall] = useState([]); 
  const [id, setid] = useState(""); 
  const [show, setshowall] = useState(false); 
  console.log(getall);
  
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
      setshowall(true); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setget([]); 
      setshowall(false); 
      alert("Course not found. Please try again.");
    }
  };
  
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

  

  useEffect(() => {
      let isClosing = false;
  
      const handleBeforeUnload = (event) => {
        isClosing = true;
      };
  
      const handleUnload = () => {
        if (isClosing) {
          fetch("http://127.0.0.1:5000/clear_page_data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "clear" }),
          })
            .then((response) => response.json())
            .catch((error) => console.error("Error clearing database:", error));
        }
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("unload", handleUnload);
      };
    }, []);
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
