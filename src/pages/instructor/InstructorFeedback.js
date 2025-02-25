import React, { useState, useEffect } from "react";
import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function InstructorFeedback() {
  const [instructor, setInstructor] = useState(null);
  const [instructorId, setInstructorId] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);

  const COLORS = ["#e74c3c", "#2ecc71", "#3498db"];

  const fetchSelectedInstructor = async (id) => {
    if (!id) {
      alert("Please enter an Instructor ID");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_instructor/${id}`
      );
      if (!response.ok) {
        throw new Error("Instructor not found");
      }
      const data = await response.json();
      setInstructor(data);

      if (data && data.Courses) {
        const feedback = data.Courses.map((course) => ({
          courseName: course["COURSE NAME"],
          bad: course.BAD || 0,
          good: course.GOOD || 0,
          excellent: course.EXCELLENT || 0,
        }));
        setFeedbackData(feedback);
      }

      fetchStudentPerformance(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInstructor(null);
      setFeedbackData([]);
      setStudentPerformance([]);
    }
  };

  const fetchStudentPerformance = async (instructorData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_students`);
      if (!response.ok) {
        throw new Error("Student performance data not found");
      }
      const students = await response.json();
      console.log("API Response:", students);

      const lowPerformers = students
        .map((student) => {
          const coursesWithThisInstructor = student.Courses.filter(
            (course) =>
              course["INSTRUCTOR ID"] === instructorData["INSTRUCTOR ID"]
          );
          const coursesWithOtherInstructors = student.Courses.filter(
            (course) =>
              course["INSTRUCTOR ID"] !== instructorData["INSTRUCTOR ID"]
          );

          console.log(
            "Courses with this instructor:",
            coursesWithThisInstructor
          );
          console.log(
            "Courses with other instructors:",
            coursesWithOtherInstructors
          );

          const lowGradesInThisInstructor = coursesWithThisInstructor.some(
            (course) => course.Grade === "D" || course.Grade === "F"
          );
          const highGradesInOtherInstructors = coursesWithOtherInstructors.some(
            (course) => course.Grade === "A" || course.Grade === "B"
          );

          if (lowGradesInThisInstructor && highGradesInOtherInstructors) {
            return {
              studentId: student["Student ID"],
              studentName: student["Student Name"],
              courseName: coursesWithThisInstructor
                .map((course) => course["Course Name"])
                .join(", "),
              gradeInThisCourse: coursesWithThisInstructor
                .map((course) => course.Grade)
                .join(", "),
              gradeInOtherCourses: coursesWithOtherInstructors
                .map((course) => course.Grade)
                .join(", "),
            };
          }
          return null;
        })
        .filter((student) => student !== null);

      console.log("Low Performers:", lowPerformers);
      setStudentPerformance(lowPerformers);
    } catch (error) {
      console.error("Error fetching student performance data:", error);
      setStudentPerformance([]);
    }
  };

  useEffect(() => {
    if (instructorId) {
      fetchSelectedInstructor(instructorId);
    }
  }, [instructorId]);

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
      <div
        className="side_overview"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <h1 className="over">Feedback</h1>
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
        <h3 style={{ fontFamily: "sans-serif" }}>
          Instructor Name: {instructor && instructor["INSTRUCTOR NAME"]}
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={feedbackData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bad" fill={COLORS[0]} name="Bad" />
            <Bar dataKey="good" fill={COLORS[1]} name="Good" />
            <Bar dataKey="excellent" fill={COLORS[2]} name="Excellent" />
          </BarChart>
        </ResponsiveContainer>

        <div
          className="chart-container"
          style={{ height: "150px", marginBottom: "20px" }}
        >
          <h3 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
            Students with Low Grades in This Instructor's Courses
          </h3>
          {studentPerformance.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Course Name</th>
                  <th>Grade in This Course</th>
                  <th>Grade in Other Courses</th>
                </tr>
              </thead>
              <tbody>
                {studentPerformance.map((student, index) => (
                  <tr key={index}>
                    <td>{student.studentId}</td>
                    <td>{student.studentName}</td>
                    <td>{student.courseName}</td>
                    <td>{student.gradeInThisCourse}</td>
                    <td>{student.gradeInOtherCourses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ fontFamily: "sans-serif" }}>
              No data available for students with low grades in this
              instructor's courses.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructorFeedback;
