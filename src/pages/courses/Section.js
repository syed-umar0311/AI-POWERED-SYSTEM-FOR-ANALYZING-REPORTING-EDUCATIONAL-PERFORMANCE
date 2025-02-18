import React from 'react'
import '../../styles/Courses.css'

import CourseSidebar from '../../components/curse_sidebar/CourseSidebar';
function Section() {
    const courses = [
        {
            courseCRN: 12345,
            courseName: 'Introduction to React',
            instructorName: 'John Doe',
            department: 'Computer Science',
            classSize: 30,
            progress: 80 // (takesClasses / totalClasses) * 100
        },
        {
            courseCRN: 67890,
            courseName: 'Advanced JavaScript',
            instructorName: 'Jane Smith',
            department: 'Computer Science',
            classSize: 50,
            progress: 80 // (takesClasses / totalClasses) * 100
        },
        {
            courseCRN: 12346,
            courseName: 'Node.js Fundamentals',
            instructorName: 'Alice Johnson',
            department: 'Computer Science',
            classSize: 25,
            progress: 83.33 // (takesClasses / totalClasses) * 100
        },
        {
            courseCRN: 67891,
            courseName: 'CSS Mastery',
            instructorName: 'Bob Brown',
            department: 'Computer Science',
            classSize: 40,
            progress: 87.5 // (takesClasses / totalClasses) * 100
        },
        {
            courseCRN: 12347,
            courseName: 'Database Design',
            instructorName: 'Charlie Davis',
            department: 'Computer Science',
            classSize: 35,
            progress: 92.86 // (takesClasses / totalClasses) * 100
        }
    ];
    return (
        <div className="main_student">
            <CourseSidebar/> 
            <div className="side_overview">
                <h1 className="over">Section</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search by Course ID" className="search-input" />
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
            <th>Department Name</th>
            <th>Class Size</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseCRN}>
              <td>{course.courseCRN}</td>
              <td>{course.courseName}</td>
              <td>{course.instructorName}</td>
              <td>{course.department}</td>
              <td>{course.classSize}</td>
              <td>{course.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

            </div>
        </div>

    )
}

export default Section
