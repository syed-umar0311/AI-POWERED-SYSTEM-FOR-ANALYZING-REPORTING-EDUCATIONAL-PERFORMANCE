import React from "react";
import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import { useState, useEffect } from "react";

function Need() {
  const [instructor, setInstructor] = useState(null); // State for the selected instructor
  const [instructorId, setInstructorId] = useState(""); // State for search input
  const [allInstructors, setAllInstructors] = useState([]); // State for all instructors
  const [showAll, setShowAll] = useState(false); // State to toggle between filtered and all instructors

  const fetchSelectedInstructor = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_instructor/${id}`);
      const data = await response.json();
      setInstructor(data); // Update state with the selected instructor
      setShowAll(true); // Show the selected instructor's data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchAllInstructors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_instructors");
        const data = await response.json();
        setAllInstructors(data); // Update state with all instructors
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllInstructors();
  }, []);

  useEffect(() => {
    let isClosing = false;

    const handleBeforeUnload = (event) => {
      isClosing = true;
    };

    const handleUnload = () => {
      if (isClosing) {
        fetch("http://127.0.0.1:5000/clear", {
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
      <InstructorSidebar />
      <div className="side_overview">
        <h1 className="over">Needs</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Instructor ID"
            className="search-input"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value.toUpperCase())}
          />
          <button
            className="search-button"
            onClick={() => {
              fetchSelectedInstructor(instructorId);
            }}
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Good In</th>
                <th>Need Improvement</th>
                <th>Student Feedback</th>
              </tr>
            </thead>
            <tbody>
              {showAll && instructor ? (
                instructor.Courses.map((course) => (
                  <tr key={course["COURSE ID"]}>
                    <td>{course["COURSE ID"]}</td>
                    <td>{course["COURSE NAME"]}</td>
                    <td>{course["QUALITY"]}</td>
                    <td>{course["NEED"]}</td>
                    <td>{course["STUDENT FEEDBACK"]}</td>
                  </tr>
                ))
              ) : (
                allInstructors.map((instructor) =>
                  instructor.Courses.map((course) => (
                    <tr key={course["COURSE ID"]}>
                      <td>{course["COURSE ID"]}</td>
                      <td>{course["COURSE NAME"]}</td>
                      <td>{course["QUALITY"]}</td>
                      <td>{course["NEED"]}</td>
                      <td>{course["STUDENT FEEDBACK"]}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Need;