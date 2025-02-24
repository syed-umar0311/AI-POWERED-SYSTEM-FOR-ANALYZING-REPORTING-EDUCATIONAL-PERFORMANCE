import '../../styles/Courses.css';
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Compare({ search }) {
  const [data, setData] = useState([]);
  const [specificStudentData, setSpecificStudentData] = useState([]);
  const [overallData, setOverallData] = useState([]);

  // Update specific student data when search prop changes
  useEffect(() => {
    if (search && search["Courses"]) {
      setSpecificStudentData(search["Courses"]);
      console.log("Specific Student Data:", search["Courses"]); // ✅ Debug log
    }
  }, [search]);

  // Fetch overall data from the API
  useEffect(() => {
    const fetchOverallData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_students');
        const data = await response.json();
        setOverallData(data);
        // console.log("Overall Data:", data); // ✅ Debug log
      } catch (error) {
        console.error('Error fetching overall data:', error);
      }
    };

    fetchOverallData();
  }, []);

  // Process data only when both specificStudentData and overallData are available
  useEffect(() => {
    if (specificStudentData.length === 0 || overallData.length === 0) return;

    const courseAverages = {};

    overallData.forEach((student) => {
      if (student["Student ID"] === search["Student ID"]) return;

      student.Courses.forEach((course) => {
        const courseId = course['Course ID'];

        if (!courseAverages[courseId]) {
          courseAverages[courseId] = {
            totalAssignmentMarks: 0,
            totalAttendance: 0,
            totalStudents: 0,
            courseName: course['Course Name'],
          };
        }

        courseAverages[courseId].totalAssignmentMarks += course['Assignment Marks'] || 0;
        courseAverages[courseId].totalAttendance += course['Attendance'] || 0;
        courseAverages[courseId].totalStudents += 1;
      });
    });

    console.log("Course Averages Before Division:", courseAverages); // ✅ Debug log

    // Prepare the chart data
    const combinedData = specificStudentData.map((course) => {
      const courseId = course['Course ID'];
      const courseStats = courseAverages[courseId] || {
        totalAssignmentMarks: 0,
        totalAttendance: 0,
        totalStudents: 0,
      };

      const totalStudents = courseStats.totalStudents || 1; // ✅ Prevent division by 0

      const averageAssignmentMarks = totalStudents > 0
        ? courseStats.totalAssignmentMarks / totalStudents
        : 0;

      const averageAttendance = totalStudents > 0
        ? courseStats.totalAttendance / totalStudents
        : 0;

      return {
        name: course['Course Name'],
        studentAssignment: course['Assignment Marks'] || 0,
        studentAttendance: course['Attendance'] || 0,
        averageAssignment: Number(averageAssignmentMarks.toFixed(2)),
        averageAttendance: Number(averageAttendance.toFixed(2)),
      };
    });

    console.log("Final Data for Chart:", combinedData); // ✅ Debug log

    setData(combinedData);
  }, [specificStudentData, overallData, search]);

  return (
    <div className="main_student">
      <Studentsidebar />
      <div className="side_overview">
        <h1 className="over">Compare</h1>

        <div style={{ width: '100%', height: 500 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
            Student Performance vs Class Average
          </h2>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="studentAssignment" fill="#8884d8" name="Student Assignment Marks" />
              <Bar dataKey="averageAssignment" fill="#82ca9d" name="Class Average Assignment Marks" />
              <Bar dataKey="studentAttendance" fill="#ffc658" name="Student Attendance" />
              <Bar dataKey="averageAttendance" fill="#ff8042" name="Class Average Attendance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Compare;
