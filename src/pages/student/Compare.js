import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function Compare() {
    const data = [
        { name: 'Marks', student: 85, average: 75 },
        { name: 'Attendance', student: 90, average: 80 },
        { name: 'Assignment Marks', student: 88, average: 78 },
        { name: 'Predict Final Marks', student: 80, average: 72 },
        { name: 'Score', student: 92, average: 85 },
        { name: 'GPA', student: 3.8, average: 3.2 },
        { name: 'Total Courses', student: 5, average: 5 },
      ];
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Compare</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by student ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>


      <div style={{ width: '100%', height: 500 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Student Performance vs Average</h2>
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
          <Bar dataKey="student" fill="#8884d8" name="Student" />
          <Bar dataKey="average" fill="#82ca9d" name="Average" />
        </BarChart>
      </ResponsiveContainer>
    </div>

      
    </div>
  </div>
  )
}

export default Compare
