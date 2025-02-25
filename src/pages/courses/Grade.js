import React, { useState, useEffect } from 'react';
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar';
import "../../styles/Studentoverview.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

function Grade() {
    const [get, setGet] = useState({}); // Selected course data
    const [id, setId] = useState(""); // Course ID input
    const [chartData, setChartData] = useState([]); // Data for the grouped bar chart

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

            // Prepare data for the grouped bar chart
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

    // Format data for the grouped bar chart
    const formatChartData = (sections) => {
        return sections.map((section) => ({
            sectionName: section["Section"],
            Grade_a: section["Grade_a"] || 0,
            Grade_b: section["Grade_b"] || 0,
            Grade_c: section["Grade_c"] || 0,
            Grade_d: section["Grade_d"] || 0,
        }));
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
                <h1 className="over">Section Grades</h1>
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

                {/* Grouped Bar Chart */}
                <div className="p-4">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sectionName" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Grade_a" fill="#8884d8" name="Grade A" />
                            <Bar dataKey="Grade_b" fill="#82ca9d" name="Grade B" />
                            <Bar dataKey="Grade_c" fill="#ffc658" name="Grade C" />
                            <Bar dataKey="Grade_d" fill="#ff8042" name="Grade D" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Grade;