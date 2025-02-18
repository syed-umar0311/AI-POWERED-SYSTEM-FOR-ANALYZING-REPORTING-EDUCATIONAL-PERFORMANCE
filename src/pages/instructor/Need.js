import React from 'react'
import '../../styles/Courses.css'
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar'

function Need() {
  const courses = [
    {
      "instructorName": "Dr. John Smith",
      "goodIn": "Clear Explanations",
      "needsImprovement": "More Practical Examples",
      "studentSatisfaction": "Good"
    },
    {
      "instructorName": "Dr. Emily Brown",
      "goodIn": "Engagement",
      "needsImprovement": "Improve Slides",
      "studentSatisfaction": "Excellent"
    },
    {
      "instructorName": "Prof. Michael Lee",
      "goodIn": "Real-World Examples",
      "needsImprovement": "More Student Interaction",
      "studentSatisfaction": "Good"
    },
    {
      "instructorName": "Dr. Sarah Green",
      "goodIn": "Lab Sessions",
      "needsImprovement": "More Detailed Notes",
      "studentSatisfaction": "Excellent"
    },
    {
      "instructorName": "Dr. David White",
      "goodIn": "Clear Communication",
      "needsImprovement": "Better Pace of Teaching",
      "studentSatisfaction": "Bad"
    }
  ];


  return (
    <div className="main_student">
      <InstructorSidebar />
      <div className="side_overview">
        <h1 className="over">Needs </h1>
        <div className="search-container">
          <input type="text" placeholder="Search by Instructor ID" className="search-input" />
          <button className="search-button">Search</button>
        </div>


        {/* table */}

        <div className="table-container">
          <table>
            <thead>
              <tr>

                <th>Instructor Name</th>
                <th>Good In</th>
                <th>Need Improvement</th>
                <th>Student Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.instructorName}</td>
                  <td>{course.goodIn}</td>
                  <td>{course.needsImprovement}</td>
                  <td>{course.studentSatisfaction}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  )
}

export default Need
