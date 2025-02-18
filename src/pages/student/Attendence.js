import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
function Attendence({search}) {
  const [course, setcourse] = useState([]);
    
      useEffect(() => {
        if (search && search["Courses"]) {
          setcourse(search["Courses"]);
        }
      }, [search]);
    
      console.log("course", course);
  
   // Transform data for the pie chart
   const pieData = course.map((course) => ({
    name: course["Course Name"],
    value: course["Attendance"],
  }));

  // Define colors for each pie slice
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Attendance</h1>
      {/* <div className="search-container">
        <input type="text" placeholder="Search by student ID" className="search-input" />
        <button className="search-button">Search</button>
      </div> */}
{/* table */}
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Takes Classes</th>
            <th>Total Classes</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {course.map((course) => (
            <tr key={course["Course ID"]}>
              <td>{course["Course Name"]}</td>
              <td>{course["Taken Classes"]}</td>
              <td>{course["Total Classes"]}</td>
              <td>{course["Attendance"]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


{/* pie chart       */}

<div style={{ width: '100%', height: 250 }}>
     
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  </div>
  )
}

export default Attendence
