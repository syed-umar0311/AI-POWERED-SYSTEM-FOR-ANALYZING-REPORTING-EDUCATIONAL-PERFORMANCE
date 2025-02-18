import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Attendence() {
  const courses = [
    { id: 1, name: 'Introduction to React', instructor: 'John Doe', takesClasses: 8, totalClasses: 10, attendance: 80 },
    { id: 2, name: 'Advanced JavaScript', instructor: 'Jane Smith', takesClasses: 12, totalClasses: 15, attendance: 80 },
    { id: 3, name: 'Node.js Fundamentals', instructor: 'Alice Johnson', takesClasses: 10, totalClasses: 12, attendance: 83.33 },
    { id: 4, name: 'CSS Mastery', instructor: 'Bob Brown', takesClasses: 7, totalClasses: 8, attendance: 87.5 },
    { id: 5, name: 'Database Design', instructor: 'Charlie Davis', takesClasses: 13, totalClasses: 14, attendance: 92.86 },
  ];

   // Transform data for the pie chart
   const pieData = courses.map((course) => ({
    name: course.name,
    value: course.attendance,
  }));

  // Define colors for each pie slice
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Attendance</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by student ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>
{/* table */}
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Takes Classes</th>
            <th>Total Classes</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.takesClasses}</td>
              <td>{course.totalClasses}</td>
              <td>{course.attendance}%</td>
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
