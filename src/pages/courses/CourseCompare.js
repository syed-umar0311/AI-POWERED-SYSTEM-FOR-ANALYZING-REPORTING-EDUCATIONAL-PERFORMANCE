import React, { useState, useEffect } from 'react';
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar';
import "../../styles/Studentoverview.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import '../../styles/Courses.css'

function CourseCompare() {
    const [get, setGet] = useState({}); // Selected course data
    const [id, setId] = useState(""); // Course ID input
    const [sectionsData, setSectionsData] = useState([]); // All sections data
    const [highAttendanceLowGrades, setHighAttendanceLowGrades] = useState([]); // High attendance, low grades
    const [lowAttendanceHighGrades, setLowAttendanceHighGrades] = useState([]); // Low attendance, high grades
    const [bestSections, setBestSections] = useState([]); // Best sections
    const [worstSections, setWorstSections] = useState([]); // Worst sections

    // Fetch selected course data
    const get_selected_course = async (id) => {
        if (!id) {
            alert("Please enter a Course ID");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/get_course/${id}`);
            if (!response.ok) {
                throw new Error("Course not found");
            }
            const data = await response.json();
            setGet(data);

            // Prepare data for analysis
            if (data["Section"]) {
                const formattedData = formatChartData(data["Section"]);
                setSectionsData(formattedData);

                // Analyze data
                analyzeData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setGet({});
            setSectionsData([]);
            alert("Course not found. Please try again.");
        }
    };

    // Format data for analysis
    const formatChartData = (sections) => {
        return sections.map((section) => ({
            sectionName: section["Section"],
            instructor: section["Instructor Name"],
            attendance: parseFloat(section["Attendance"].replace("%", "")),
            averageGrade: calculateAverageGrade(section),
            totalStudents: section["Total Students"],
        }));
    };

    // Calculate average grade for a section
    const calculateAverageGrade = (section) => {
        const totalStudents = section["Total Students"];
        const gradeWeights = {
            Grade_a: 4, // A = 4.0
            Grade_b: 3, // B = 3.0
            Grade_c: 2, // C = 2.0
            Grade_d: 1, // D = 1.0
        };

        const totalGradePoints =
            (section["Grade_a"] || 0) * gradeWeights.Grade_a +
            (section["Grade_b"] || 0) * gradeWeights.Grade_b +
            (section["Grade_c"] || 0) * gradeWeights.Grade_c +
            (section["Grade_d"] || 0) * gradeWeights.Grade_d;

        return (totalGradePoints / totalStudents).toFixed(2); // Average grade points
    };

    // Analyze data to find insights
    const analyzeData = (data) => {
        // High attendance (>= 90%) but low grades (<= 2.5)
        const highAttLowGrades = data.filter(
            (section) => section.attendance >= 90 && section.averageGrade <= 2.5
        );
        setHighAttendanceLowGrades(highAttLowGrades);

        // Low attendance (<= 70%) but high grades (>= 3.5)
        const lowAttHighGrades = data.filter(
            (section) => section.attendance <= 70 && section.averageGrade >= 3.5
        );
        setLowAttendanceHighGrades(lowAttHighGrades);

        // Best sections (top 3 by average grade)
        const best = [...data].sort((a, b) => b.averageGrade - a.averageGrade).slice(0, 3);
        setBestSections(best);

        // Worst sections (bottom 3 by average grade)
        const worst = [...data].sort((a, b) => a.averageGrade - b.averageGrade).slice(0, 3);
        setWorstSections(worst);
    };

    // Clear page data on unload
    useEffect(() => {
        let isClosing = false;

        const handleBeforeUnload = (event) => {
            isClosing = true;
        };

        const handleUnload = () => {
            if (isClosing) {
                fetch("http://127.0.0.1:5000/clear_page_data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ action: "clear" }),
                })
                    .then((response) => response.json())
                    .catch((error) => console.error("Error clearing database:", error));
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);

    return (
        <div className="main_student" style={{height:"100vh", overflow:"auto"}}>
            <CourseSidebar />
            <div className="side_overview" style={{overflowY:"scroll"}}>
                <h1 className="over">Compare Sections</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Course ID"
                        className="search-input"
                        value={id}
                        onChange={(e) => setId(e.target.value.toUpperCase())}
                    />
                    <button className="search-button" onClick={() => get_selected_course(id)}>Search</button>
                </div>

                <div className="insights-container">
    {/* High Attendance, Low Grades */}
        <h3 style={{fontFamily:"sans-serif", fontSize:"18px"}}>High Attendance, Low Grades</h3>
    <div className="table-container">
        <table className="insight-table">
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Instructor</th>
                    <th>Attendance (%)</th>
                    <th>Average Grade</th>
                </tr>
            </thead>
            <tbody>
                {highAttendanceLowGrades.map((section, index) => (
                    <tr key={index}>
                        <td>{section.sectionName}</td>
                        <td>{section.instructor}</td>
                        <td>{section.attendance}%</td>
                        <td>{section.averageGrade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Low Attendance, High Grades */}
        <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Low Attendance, High Grades</h3>
    <div className="table-container">
        <table className="insight-table">
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Instructor</th>
                    <th>Attendance (%)</th>
                    <th>Average Grade</th>
                </tr>
            </thead>
            <tbody>
                {lowAttendanceHighGrades.map((section, index) => (
                    <tr key={index}>
                        <td>{section.sectionName}</td>
                        <td>{section.instructor}</td>
                        <td>{section.attendance}%</td>
                        <td>{section.averageGrade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Best Sections */}
        <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Best Sections (Top 3 by Average Grade)</h3>
    <div className="table-container">
        <table className="insight-table">
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Instructor</th>
                    <th>Average Grade</th>
                </tr>
            </thead>
            <tbody>
                {bestSections.map((section, index) => (
                    <tr key={index}>
                        <td>{section.sectionName}</td>
                        <td>{section.instructor}</td>
                        <td>{section.averageGrade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Worst Sections */}
        <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Worst Sections (Bottom 3 by Average Grade)</h3>
    <div className="table-container">
        <table className="insight-table">
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Instructor</th>
                    <th>Average Grade</th>
                </tr>
            </thead>
            <tbody>
                {worstSections.map((section, index) => (
                    <tr key={index}>
                        <td>{section.sectionName}</td>
                        <td>{section.instructor}</td>
                        <td>{section.averageGrade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
                {/* Class Size vs Performance Chart */}
                <div className="chart-container">
                    <h3 style={{fontFamily:"sans-serif" , fontSize:"18px"}}>Class Size vs Average Grade</h3>
                    <ResponsiveContainer width="60%" height={400}>
                        <BarChart data={sectionsData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="totalStudents" name="Class Size" />
                            <YAxis dataKey="averageGrade" name="Average Grade" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="averageGrade" fill="#8884d8" name="Average Grade" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default CourseCompare;