import React, { useState, useEffect } from "react";
import "../../styles/Courses.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";

function Courses({ search }) {
  const [highGradeCourses, setHighGradeCourses] = useState([]);
  const [lowGradeCourses, setLowGradeCourses] = useState([]);

  useEffect(() => {
    if (search && search["Courses"]) {
      const courses = search["Courses"];

      // Separate high and low grade courses
      const highGrades = courses.filter((course) => ["A", "B"].includes(course["Grade"]));
      const lowGrades = courses.filter((course) => ["C", "D"].includes(course["Grade"]));

      setHighGradeCourses(highGrades);
      setLowGradeCourses(lowGrades);
    }
  }, [search]);

  console.log("High Grade Courses", highGradeCourses);
  console.log("Low Grade Courses", lowGradeCourses);

  useEffect(() => {
    let isClosing = false;

    const handleBeforeUnload = () => {
      isClosing = true;
    };

    const handleUnload = () => {
      if (isClosing) {
        fetch("http://127.0.0.1:5000/clear_database", {
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
      <Studentsidebar />
      <div className="side_overview">
        <h1 className="over">Courses</h1>

        {/* High Grade Courses Table */}
        <h2 className="table-heading" style={{fontFamily:"sans-serif"}}>High Grade Courses</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Instructor Name</th>
                <th>Attendance</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {highGradeCourses.map((course) => (
                <tr key={course["Course ID"]}>
                  <td>{course["Course ID"]}</td>
                  <td>{course["Course Name"]}</td>
                  <td>{course["Instructor Name"]}</td>
                  <td>{course["Attendance"]}%</td>
                  <td className="high-grade">{course["Grade"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Grade Courses Table */}
        <h2 className="table-heading" style={{fontFamily:"sans-serif"}}>Low Grade Courses</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Instructor Name</th>
                <th>Attendance</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {lowGradeCourses.map((course) => (
                <tr key={course["Course ID"]}>
                  <td>{course["Course ID"]}</td>
                  <td>{course["Course Name"]}</td>
                  <td>{course["Instructor Name"]}</td>
                  <td>{course["Attendance"]}%</td>
                  <td className="low-grade">{course["Grade"]}</td>
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
