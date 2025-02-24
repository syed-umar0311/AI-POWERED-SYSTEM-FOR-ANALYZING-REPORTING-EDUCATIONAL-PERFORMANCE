import React from 'react'
import CourseSidebar from '../../components/curse_sidebar/CourseSidebar'
import "../../styles/Studentoverview.css";
import { useState, useEffect } from "react";


function CourseReport() {
  const [id, setid] = useState("")
      const [get, setget] = useState([])

    const get_selected_insta = async (id) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/get_course/${id}`
          );
          const data = await response.json();
          setget(data); 
          }
         catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    
    
    
      const saveInstructorData = async () => {
        try {
          if (!get) {
            
            return;
          }
      
         
      
          const response = await fetch("http://127.0.0.1:5000/report", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(get),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
         
        } catch (error) {
          console.error("Error saving data:", error);
         
        }
      };
    
      const generateReport = async () => {
        try {
          
          const response = await fetch('http://127.0.0.1:5000/generate-report', {
            method: 'GET',
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          
        } catch (error) {
          console.error('Error generating report:', error);
        }
      };
    
    
    
      useEffect(() => {
        if (get) {
          saveInstructorData();
        }
      }, [get]);
    


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
        <h1 className="over">Generate Report</h1>
        <div className="search-container">
          <input type="text" placeholder="Search by Course ID" className="search-input" value={id} onChange={(e)=>setid(e.target.value.toUpperCase())}/>
          <button className="search-button" onClick={ async () => {await get_selected_insta(id); await saveInstructorData(); }}>Search</button>
        </div>
        {get&&(<h1>Course Name : {get["course_name"]}</h1>)}

        {/* report */}
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <button
              style={buttonStyle}
              onClick={generateReport}
            >
              Generate Report
            </button>
            
          </div>
        </div>




      </div>
    </div>


  )
}

const buttonStyle = {

  margin: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',

};
export default CourseReport
