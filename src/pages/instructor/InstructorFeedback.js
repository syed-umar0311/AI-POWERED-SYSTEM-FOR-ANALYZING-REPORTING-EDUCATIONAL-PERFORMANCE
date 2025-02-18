import React from 'react'
import '../../styles/Courses.css'
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function InstructorFeedback() {

  const feedbackData = [
  {
    "feedback": "Good",
    "students": 120
  },
  {
    "feedback": "Bad",
    "students": 30
  },
  {
    "feedback": "Excellent",
    "students": 150
  }
];
const COLORS = ['#4CAF50', '#FF5722', '#00BCD4'];

  return (
    <div className="main_student">
    <InstructorSidebar />
    <div className="side_overview">
      <h1 className="over">Feedback</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Instructor ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>




      <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={feedbackData}
          dataKey="students"
          nameKey="feedback"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {feedbackData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>




    </div>
  </div>
  )
}

export default InstructorFeedback
