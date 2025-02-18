import React from 'react'
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar'
import "../../styles/Studentoverview.css";
import "../../styles/Courses.css";

function Courseperformance() {
const courses = [
    {
        "courseCRN": 12345,
        "courseName": "Introduction to React",
        "instructorName": "John Doe",
        "department": "Computer Science",
        "classSize": 30,
        "takesClasses": 24,
        "totalClasses": 30,
        "attendanceRate": 80,
        "completionRate": 85,
        "averageScore": 78,
        "studentFeedback": 4.5,
        "participationLevel": "High",
        "dropoutRate": 5
    },
    {
        "courseCRN": 67890,
        "courseName": "Advanced JavaScript",
        "instructorName": "Jane Smith",
        "department": "Computer Science",
        "classSize": 50,
        "takesClasses": 40,
        "totalClasses": 50,
        "attendanceRate": 80,
        "completionRate": 75,
        "averageScore": 82,
        "studentFeedback": 4.2,
        "participationLevel": "Medium",
        "dropoutRate": 10
    },
    {
        "courseCRN": 12346,
        "courseName": "Node.js Fundamentals",
        "instructorName": "Alice Johnson",
        "department": "Computer Science",
        "classSize": 25,
        "takesClasses": 22,
        "totalClasses": 25,
        "attendanceRate": 88,
        "completionRate": 90,
        "averageScore": 85,
        "studentFeedback": 4.7,
        "participationLevel": "High",
        "dropoutRate": 4
    },
    {
        "courseCRN": 67891,
        "courseName": "CSS Mastery",
        "instructorName": "Bob Brown",
        "department": "Computer Science",
        "classSize": 40,
        "takesClasses": 35,
        "totalClasses": 40,
        "attendanceRate": 87.5,
        "completionRate": 80,
        "averageScore": 79,
        "studentFeedback": 4.3,
        "participationLevel": "Medium",
        "dropoutRate": 8
    },
    {
        "courseCRN": 12347,
        "courseName": "Database Design",
        "instructorName": "Charlie Davis",
        "department": "Computer Science",
        "classSize": 35,
        "takesClasses": 32,
        "totalClasses": 35,
        "attendanceRate": 92.86,
        "completionRate": 95,
        "averageScore": 88,
        "studentFeedback": 4.8,
        "participationLevel": "High",
        "dropoutRate": 3
    }
]

  return (
    <div className="main_student">
    <CourseSidebar />
    <div className="side_overview">
      <h1 className="over">Performance</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by Course ID" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      {/* table */}
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Department Name</th>
            <th>Taken classes</th>
            <th>Total classes</th>
            <th>Attendance (%)</th>
            <th>Feedback Rate</th>
            <th>Participation</th>
            <th>DropOut</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseCRN}>
              <td>{course.courseCRN}</td>
              <td>{course.courseName}</td>
              <td>{course.instructorName}</td>
              <td>{course.department}</td>
              <td>{course.takesClasses}</td>
              <td>{course.totalClasses}</td>
              <td>{course.attendanceRate}</td>
              <td>{course.studentFeedback}</td>
              <td>{course.participationLevel}</td>
              <td>{course.dropoutRate}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
      </div>
      </div>


  )
}

export default Courseperformance
