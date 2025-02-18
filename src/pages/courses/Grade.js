import React from 'react';
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar';
import "../../styles/Studentoverview.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Grade() {
    const rawData = [
        {
            courseName: "Introduction to React",
            totalStudents: 30,
            grades: { A: 10, B: 8, C: 7, D: 5 }
        },
        {
            courseName: "Advanced JavaScript",
            totalStudents: 50,
            grades: { A: 15, B: 20, C: 10, D: 5 }
        },
        {
            courseName: "Node.js Fundamentals",
            totalStudents: 25,
            grades: { A: 8, B: 10, C: 5, D: 2 }
        },
        {
            courseName: "CSS Mastery",
            totalStudents: 40,
            grades: { A: 12, B: 15, C: 8, D: 5 }
        },
        {
            courseName: "Database Design",
            totalStudents: 35,
            grades: { A: 14, B: 12, C: 5, D: 4 }
        }
    ];

    // 🔹 Transform Data for Chart
    const data = rawData.map(course => ({
        course: course.courseName, // Use a simpler key name
        A: course.grades.A,
        B: course.grades.B,
        C: course.grades.C,
        D: course.grades.D
    }));

    return (
        <div className="main_student">
            <CourseSidebar />
            <div className="side_overview">
                <h1 className="over">Grade</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search by Course Name" className="search-input" />
                    <button className="search-button">Search</button>
                </div>

                {/* Chart */}
                <div className="p-4">
                    <ResponsiveContainer width="100%" height={420}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <XAxis dataKey="course" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="A" fill="#4CAF50" />
                            <Bar dataKey="B" fill="#2196F3" />
                            <Bar dataKey="C" fill="#FFC107" />
                            <Bar dataKey="D" fill="#F44336" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Grade;
