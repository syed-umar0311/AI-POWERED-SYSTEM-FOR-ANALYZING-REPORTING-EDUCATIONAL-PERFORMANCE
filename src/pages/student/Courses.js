import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar'
function Courses() {
    const courses = [
        { id: 1, name: 'Introduction to React', instructor: 'John Doe', classes: 10 },
        { id: 2, name: 'Advanced JavaScript', instructor: 'Jane Smith', classes: 15 },
        { id: 3, name: 'Node.js Fundamentals', instructor: 'Alice Johnson', classes: 12 },
        { id: 4, name: 'CSS Mastery', instructor: 'Bob Brown', classes: 8 },
        { id: 5, name: 'Database Design', instructor: 'Charlie Davis', classes: 14 },
      ];
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Courses</h1>
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
            <th>Total Classes</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.classes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </div>
  </div>
  )
}

export default Courses
