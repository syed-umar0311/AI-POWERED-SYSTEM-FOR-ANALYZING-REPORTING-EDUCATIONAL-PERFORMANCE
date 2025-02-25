import React from 'react';
import "../../styles/Studentoverview.css";
import "../../styles/Courses.css";
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar';
import { useState, useEffect } from 'react';

function InstructorSection() {
  const [instructor, setInstructor] = useState(null); 
  const [allInstructors, setAllInstructors] = useState([]); 
  const [instructorId, setInstructorId] = useState(""); 
  const [showDetails, setShowDetails] = useState(false);

  const fetchSelectedInstructor = async (id) => {
    if (!id) {
      alert("Please enter an Instructor ID");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/get_instructor/${id}`);
      if (!response.ok) {
        throw new Error("Instructor not found");
      }
      const data = await response.json();
      setInstructor(data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInstructor(null); 
      setShowDetails(false); 
      alert("Instructor not found. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAllInstructors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_instructors");
        const data = await response.json();
        setAllInstructors(data);
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
        <h1 className="over">Section</h1>
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
            onClick={() => fetchSelectedInstructor(instructorId)}
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Instructor Name</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Students</th>
                <th>Section</th>
                <th>Attendance</th>
                <th>Feedback</th>
                <th>Progress</th>
                <th>Quality</th>
              </tr>
            </thead>
            <tbody>
              {showDetails && instructor ? (
                instructor.Courses.map((course, index) => (
                  <tr key={index}>
                    <td>{instructor["INSTRUCTOR NAME"]}</td>
                    <td>{course["COURSE NAME"]}</td>
                    <td>{course["DEPARTMENT"]}</td>
                    <td>{course["TOTAL STUDENTS"]}</td>
                    <td>{course["SECTION"]}</td>
                    <td>{course["ATTENDANCE"]}%</td>
                    <td>{course["STUDENT FEEDBACK"]}</td>
                    <td>{course["PROGRESS"]}</td>
                    <td>{course["QUALITY"]}</td>
                  </tr>
                ))
              ) : (
                allInstructors.map((instructor, index) => (
                  instructor.Courses.map((course, courseIndex) => (
                    <tr key={`${index}-${courseIndex}`}>
                      <td>{instructor["INSTRUCTOR NAME"]}</td>
                      <td>{course["COURSE NAME"]}</td>
                      <td>{course["DEPARTMENT"]}</td>
                      <td>{course["TOTAL STUDENTS"]}</td>
                      <td>{course["SECTION"]}</td>
                      <td>{course["ATTENDANCE"]}%</td>
                      <td>{course["STUDENT FEEDBACK"]}</td>
                      <td>{course["PROGRESS"]}</td>
                      <td>{course["QUALITY"]}</td>
                    </tr>
                  ))
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;