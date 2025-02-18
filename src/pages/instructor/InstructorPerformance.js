import React from 'react'
import '../../styles/Courses.css'
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar'
function InstructorPerformance() {
  const courses = [
    {
      "instructorName": "Dr. John Smith",
      "courseName": "Data Structures",
      "students": 50,
      "attendance": 80,  // percentage of attendance
      "department": "Computer Science",
      "section": "A",
      "progress": "Good"
    },
    {
      "instructorName": "Dr. John Smith",
      "courseName": "Algorithms",
      "students": 45,
      "attendance": 75,
      "department": "Computer Science",
      "section": "B",
      "progress": "Poor"
    },
    {
      "instructorName": "Dr. John Smith",
      "courseName": "Software Engineering",
      "students": 60,
      "attendance": 85,
      "department": "Computer Science",
      "section": "C",
      "progress": "Excellent"
    },
    {
      "instructorName": "Dr. Emily Brown",
      "courseName": "Calculus I",
      "students": 55,
      "attendance": 90,
      "department": "Mathematics",
      "section": "A",
      "progress": "Excellent"
    },
    {
      "instructorName": "Dr. Emily Brown",
      "courseName": "Linear Algebra",
      "students": 52,
      "attendance": 70,
      "department": "Mathematics",
      "section": "B",
      "progress": "Poor"
    },
    {
      "instructorName": "Dr. Emily Brown",
      "courseName": "Probability & Stats",
      "students": 48,
      "attendance": 78,
      "department": "Mathematics",
      "section": "C",
      "progress": "Good"
    },
    {
      "instructorName": "Prof. Michael Lee",
      "courseName": "Microeconomics",
      "students": 40,
      "attendance": 65,
      "department": "Economics",
      "section": "A",
      "progress": "Poor"
    },
    {
      "instructorName": "Prof. Michael Lee",
      "courseName": "Macroeconomics",
      "students": 42,
      "attendance": 82,
      "department": "Economics",
      "section": "B",
      "progress": "Good"
    },
    {
      "instructorName": "Prof. Michael Lee",
      "courseName": "Financial Accounting",
      "students": 38,
      "attendance": 88,
      "department": "Economics",
      "section": "C",
      "progress": "Excellent"
    }
  ];
  
  return (
    <div className="main_student">
    <InstructorSidebar />
    <div className="side_overview">
      <h1 className="over">Performance</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Instructor ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="table-container">
      <table>
        <thead>
          <tr>
           
            <th>Instructor Name</th>
            <th>Course Name</th>
            <th>Students</th>
            <th>Attendance</th>
            <th>Department</th>
            <th>section</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.instructorName}</td>
              <td>{course.courseName}</td>
              <td>{course.students}</td>
              <td>{course.attendance}</td>
              <td>{course.department}</td>
              <td>{course.section}</td>
              <td>{course.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </div>
  </div>
  )
}

export default InstructorPerformance





