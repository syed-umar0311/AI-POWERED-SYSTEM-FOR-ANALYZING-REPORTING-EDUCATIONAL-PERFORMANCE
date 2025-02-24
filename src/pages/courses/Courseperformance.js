import React, { useState, useEffect } from "react";
import CourseSidebar from "../../components/curse_sidebar/CourseSidebar";
import "../../styles/Studentoverview.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  CartesianGrid, LineChart, Line
} from "recharts";

function Performance() {
  const [coursesData, setCoursesData] = useState([]); 
  const [bestInstructors, setBestInstructors] = useState([]); 
  const [worstInstructors, setWorstInstructors] = useState([]); 
  const [bestCourses, setBestCourses] = useState([]); 
  const [worstCourses, setWorstCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_courses");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("API Response:", data);
        setCoursesData(data);

        analyzeData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const analyzeData = (data) => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return;
    }

    const allSections = data.flatMap((course) => {
      if (!course.Section || !Array.isArray(course.Section)) {
        console.warn("Invalid course data:", course);
        return [];
      }
      return course.Section.map((section) => ({
        ...section,
        CourseID: course["Course ID"],
        CourseName: course["Course Name"],
        Department: course["Department"],
        AverageGrade: (section.Grade_a * 4 + section.Grade_b * 3 + section.Grade_c * 2 + section.Grade_d * 1) / section["Total Students"], 
        Attendance: parseFloat(section["Attendance"].replace("%", "")), 
      }));
    });

    const instructorPerformance = allSections.reduce((acc, section) => {
      const instructor = section["Instructor Name"];
      if (!acc[instructor]) {
        acc[instructor] = { totalGrade: 0, totalSections: 0, courses: new Set() };
      }
      acc[instructor].totalGrade += section.AverageGrade;
      acc[instructor].totalSections += 1;
      acc[instructor].courses.add(section.CourseName);
      return acc;
    }, {});

    const instructors = Object.keys(instructorPerformance).map((instructor) => ({
      name: instructor,
      averageGrade: (instructorPerformance[instructor].totalGrade / instructorPerformance[instructor].totalSections).toFixed(2),
      courses: Array.from(instructorPerformance[instructor].courses),
    }));

    const sortedInstructors = instructors.sort((a, b) => b.averageGrade - a.averageGrade);
    setBestInstructors(sortedInstructors.slice(0, 3));
    setWorstInstructors(sortedInstructors.slice(-3));

    const bestCoursesData = allSections.filter((section) => section.AverageGrade >= 3.5);
    setBestCourses(bestCoursesData);

    const worstCoursesData = allSections.filter((section) => section.AverageGrade <= 2.0);
    setWorstCourses(worstCoursesData);
  };




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
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;





  

  return (
    <div className="main_student">
      <CourseSidebar />
      <div className="side_overview" style={{height:"100vh", overflow:"auto"}}>
        <h1 className="over">Performance Analysis</h1>

        {/* Best Instructors */}
        <div className="chart-container">
          <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Top 3 Instructors</h3>
          <ResponsiveContainer width="75%" height={300}>
            <BarChart data={bestInstructors} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGrade" fill="#8884d8" name="Average Grade" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Worst Instructors */}
        <div className="chart-container">
          <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Bottom 3 Instructors</h3>
          <ResponsiveContainer width="75%" height={300}>
            <BarChart data={worstInstructors} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGrade" fill="#ff8042" name="Average Grade" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Best Courses */}
        <div className="chart-container">
          <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Courses Where Students Perform Well</h3>
          <ResponsiveContainer width="90%" height={300}>
            <LineChart data={bestCourses} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="CourseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="AverageGrade" stroke="#82ca9d" name="Average Grade" />
              <Line type="monotone" dataKey="Attendance" stroke="#8884d8" name="Attendance (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Worst Courses */}
        <div className="chart-container">
          <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Courses Where Students Perform Poorly</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={worstCourses} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="CourseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="AverageGrade" stroke="#ff8042" name="Average Grade" />
              <Line type="monotone" dataKey="Attendance" stroke="#8884d8" name="Attendance (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Performance;
