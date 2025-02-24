import React, { useState, useEffect } from "react";
import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function InstructorFeedback() {
  const [get, setget] = useState({}); 
  const [id, setid] = useState("");
  const [feedbackData, setFeedbackData] = useState([]); 

  const COLORS = ["#FF5722", "#4CAF50", "#00BCD4"]; 
  const get_selected_insta = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_instructor/${id}`
      );
      const data = await response.json();
      setget(data); 

      if (data) {
        const feedback = [
          { feedback: "Bad", students: data.BAD || 0 },
          { feedback: "Good", students: data.GOOD || 0 },
          { feedback: "Excellent", students: data.EXCELLENT || 0 },
        ];
        setFeedbackData(feedback); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      get_selected_insta(id);
    }
  }, [id]);






  useEffect(() => {
        let isClosing = false;
    
        const handleBeforeUnload = (event) => {
          isClosing = true;
        };
    
        const handleUnload = () => {
          if (isClosing) {
            fetch("http://127.0.0.1:5000/clear", {
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
      <InstructorSidebar />
      <div className="side_overview">
        <h1 className="over">Feedback</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Instructor ID"
            className="search-input"
            value={id}
            onChange={(e) => setid(e.target.value.toUpperCase())}
          />
          <button
            className="search-button"
            onClick={() => get_selected_insta(id)}
          >
            Search
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={feedbackData}
              dataKey="students"
              nameKey="feedback"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {feedbackData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InstructorFeedback;
