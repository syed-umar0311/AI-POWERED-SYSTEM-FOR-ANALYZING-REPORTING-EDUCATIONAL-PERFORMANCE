import React from 'react'
import "../../styles/Studentoverview.css";
import "../../styles/Courses.css";
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar';

function InstructorSection() {
    const courses = [
        {
            "instructorName": "Dr. John Smith",
            "courseName": "Software Engineering",
            "students": 60,
            "section": "C",
            "department": "Computer Science",
            "attendeance": 88
        },
        {
            "instructorName": "Dr. Emily Brown",
            "courseName": "Calculus I",
            "students": 55,
            "section": "A",
            "department": "Mathematics",
            "attendeance": 88
        },
        {
            "instructorName": "Dr. Emily Brown",
            "courseName": "Linear Algebra",
            "students": 52,
            "section": "B",
            "department": "Mathematics",
            "attendeance": 88
        },
        {
            "instructorName": "Dr. Emily Brown",
            "courseName": "Probability & Stats",
            "students": 48,
            "section": "C",
            "department": "Mathematics",
            "attendeance": 88
        },
        {
            "instructorName": "Prof. Michael Lee",
            "courseName": "Microeconomics",
            "students": 40,
            "section": "A",
            "department": "Economics",
            "attendeance": 88
        },
        {
            "instructorName": "Dr. Sarah Green",
            "courseName": "Inorganic Chemistry",
            "students": 45,
            "section": "B",
            "department": "Chemistry",
            "attendeance": 88
        },
        {
            "instructorName": "Dr. Sarah Green",
            "courseName": "Biochemistry",
            "students": 47,
            "section": "C",
            "department": "Chemistry",
            "attendeance": 88
        }
    ];
    

  return (
    <div className="main_student">
    <InstructorSidebar />
    <div className="side_overview">
      <h1 className="over">Section</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      {/* table */}
      <table>
        <thead>
          <tr>
            <th>Instructor Name</th>
            <th>Course Name</th>
            <th>Department Name</th>
            <th>Students</th>
            <th>Section</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseCRN}>
              <td>{course.instructorName}</td>
              <td>{course.courseName}</td>
              <td>{course.department}</td>
              <td>{course.students}</td>
              <td>{course.section}</td>
              <td>{course.attendeance}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
      </div>
      </div>


  )
}

export default InstructorSection
