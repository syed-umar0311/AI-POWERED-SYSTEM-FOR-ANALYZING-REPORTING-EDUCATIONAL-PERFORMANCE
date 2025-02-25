import React from "react";
import "../../styles/Courses.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Performance({ search }) {
  const [course, setcourse] = useState([]);

  useEffect(() => {
    if (search && search["Courses"]) {
      setcourse(search["Courses"]);
    }
  }, [search]);

  console.log("course", course);

  useEffect(() => {
    let isClosing = false;

    const handleBeforeUnload = (event) => {
      // Set a flag to indicate the tab/window is being closed
      isClosing = true;
    };

    const handleUnload = () => {
      if (isClosing) {
        // Send a request to clear the database only when the tab/window is closed
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

  const courses = course;
  const courseNames = courses.map((course) => course["Course Name"]);
  const assignmentMarks = courses.map((course) => course["Assignment Marks"]);
  const attendance = courses.map((course) => course["Attendance"]);
  const takenClasses = courses.map((course) => course["Taken Classes"]); // Add Taken Classes

  const chartData = {
    labels: courseNames, // X-axis labels (course names)
    datasets: [
      {
        label: "Assignment Marks",
        data: assignmentMarks, // Y-axis data (assignment marks)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Attendance (%)",
        data: attendance, // Y-axis data (attendance)
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Taken Classes", // New dataset for Taken Classes
        data: takenClasses, // Y-axis data (taken classes)
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: `Grade Trends for ${search["Student Name"]}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Assuming marks and attendance are out of 100
      },
    },
  };
  return (
    <div className="main_student">
      <Studentsidebar />

      <div className="side_overview">
        <h3
          style={{
            fontFamily: "sans-serif",
            fontSize: "23px",
            marginBottom: "0px",
          }}
        >
          Performance
        </h3>

        <div className="table-container" style={{overflowY:"auto", height:"150px"}}>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Instructor Name</th>
                <th>Taken Classes</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {course.map((course) => (
                <tr key={course["Course ID"]}>
                  <td>{course["Course Name"]}</td>
                  <td>{course["Instructor Name"]}</td>
                  <td>{course["Taken Classes"]}</td>
                  <td>{course["Assignment Marks"]}</td>
                  <td>{course["Grade"]}</td>
                  <td>{course["Progress"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="over" style={{ fontFamily: "sans-serif", marginBottom:"0px"}}>
          Student Grade Trends
        </h3>

        <div>
          <div style={{ width: "70%", margin: "auto" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
