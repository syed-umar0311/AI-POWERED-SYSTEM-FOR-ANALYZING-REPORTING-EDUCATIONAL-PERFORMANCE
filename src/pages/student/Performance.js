import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar'
function Performance() {
  const courses = [
    { id: 1, name: 'Introduction to React', instructor: 'John Doe', progress: 'Excellent', prediction: 'Pass', midTermMarks: 85, assignmentMarks: 90, predictGPA: 3.8 },
    { id: 2, name: 'Advanced JavaScript', instructor: 'Jane Smith', progress: 'Good', prediction: 'Pass', midTermMarks: 78, assignmentMarks: 85, predictGPA: 3.5 },
    { id: 3, name: 'Node.js Fundamentals', instructor: 'Alice Johnson', progress: 'Poor', prediction: 'Fail', midTermMarks: 50, assignmentMarks: 60, predictGPA: 2.0 },
    { id: 4, name: 'CSS Mastery', instructor: 'Bob Brown', progress: 'Good', prediction: 'Pass', midTermMarks: 82, assignmentMarks: 88, predictGPA: 3.6 },
    { id: 5, name: 'Database Design', instructor: 'Charlie Davis', progress: 'Excellent', prediction: 'Pass', midTermMarks: 90, assignmentMarks: 92, predictGPA: 4.0 },
  ];
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Performance</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by student ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Progress</th>
            <th>Prediction</th>
            <th>Mid Term Marks</th>
            <th>Assignment Marks</th>
            <th>Predict GPA</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.progress}</td>
              <td>{course.prediction}</td>
              <td>{course.midTermMarks}</td>
              <td>{course.assignmentMarks}</td>
              <td>{course.predictGPA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </div>
  </div>
  )
}

export default Performance
