import React, { useState } from 'react';
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar';
import "../../styles/Studentoverview.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect } from 'react';

function Grade() {
    const [get, setGet] = useState({}); 
    const [id, setId] = useState(""); 

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
        } catch (error) {
            console.error("Error fetching data:", error);
            setGet({}); 
            alert("Course not found. Please try again.");
        }
    };

    
    const data = [
        { name: 'Grade A', value: get["grade_a"] || 0 },
        { name: 'Grade B', value: get["grade_b"] || 0 },
        { name: 'Grade C', value: get["grade_c"] || 0 },
        { name: 'Grade D', value: get["grade_d"] || 0 }
    ];



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
                <h1 className="over">Grade</h1>
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

                {/* Chart */}
                <div className="p-4">
                    <ResponsiveContainer width="100%" height={420}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#4CAF50" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Grade;