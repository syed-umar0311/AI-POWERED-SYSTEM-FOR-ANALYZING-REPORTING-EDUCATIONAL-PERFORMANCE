import React, { useState, useEffect } from 'react';
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar';
import "../../styles/Studentoverview.css";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
function Effects() {
    const [get, setGet] = useState({}); // Selected course data
    const [id, setId] = useState(""); // Course ID input
    const [chartData, setChartData] = useState([]); // Data for the scatter plot

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

            // Prepare data for the scatter plot
            if (data["Section"]) {
                const formattedData = formatChartData(data["Section"]);
                setChartData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setGet({});
            setChartData([]);
            alert("Course not found. Please try again.");
        }
    };

    // Format data for the scatter plot
    const formatChartData = (sections) => {
        return sections.map((section) => ({
            sectionName: section["Section"],
            attendance: parseFloat(section["Attendance"].replace("%", "")), // Convert "96%" to 96
            averageGrade: calculateAverageGrade(section), // Calculate average grade for the section
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
    <div className="main_student">
            <CourseSidebar />
            <div className="side_overview">
                <h1 className="over">Attendance Impact on Grades By Sections</h1>
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

                {/* Scatter Plot */}
                <div className="p-4">
                    
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="attendance"
                                name="Attendance (%)"
                                domain={[0, 100]}
                                label={{ value: "Attendance (%)", position: "insideBottom", offset: -10 }}
                            />
                            <YAxis
                                type="number"
                                dataKey="averageGrade"
                                name="Average Grade"
                                domain={[0, 4]}
                                label={{ value: "Average Grade", angle: -90, position: "insideLeft" }}
                            />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Legend />
                            <Scatter
                                name="Section"
                                data={chartData}
                                fill="#8884d8"
                                shape="circle"
                                line
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
  );
}

export default Effects;
