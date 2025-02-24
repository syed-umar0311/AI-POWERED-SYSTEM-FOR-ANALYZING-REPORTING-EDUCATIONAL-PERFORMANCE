import "../../styles/Courses.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";
import React, { useState, useEffect } from "react";
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

function Trends({ search }) {
    const [course, setcourse] = useState([]);
  useEffect(() => {
    if (search && search["Courses"]) {
      setcourse(search["Courses"]);
    }
  }, [search]);

  console.log("course", course);

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
        <h1 className="over">Student Grade Trends</h1>

        <div>
          <div style={{ width: "80%", margin: "auto" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
