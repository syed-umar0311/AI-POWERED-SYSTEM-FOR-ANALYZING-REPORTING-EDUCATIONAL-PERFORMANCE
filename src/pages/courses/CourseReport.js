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
          setget(data); // Update state with fetched data
          }
         catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    
    
    
      const saveInstructorData = async () => {
        try {
          if (!get) {
            // alert("No data to save!");
            return;
          }
      
          // console.log("Data being sent to backend:", get); // Log the data
      
          const response = await fetch("http://127.0.0.1:5000/report", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(get), // Send the single object
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          // alert(result.message);
        } catch (error) {
          console.error("Error saving data:", error);
          // alert("Failed to save data. Check the console for more details.");
        }
      };
    
      const generateReport = async () => {
        try {
          // Call the Flask API endpoint
          const response = await fetch('http://127.0.0.1:5000/generate-report', {
            method: 'GET',
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          // Get the PDF file name from the response
          // const result = await response.json();
          // const pdfFilename = result.pdf_filename;
    
          // Open the PDF in a new tab
          // window.open(`http://127.0.0.1:5000/static/${pdfFilename}`, '_blank');
        } catch (error) {
          console.error('Error generating report:', error);
        }
      };
    
    
    
      useEffect(() => {
        if (get) {
          saveInstructorData();
        }
      }, [get]);
    
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
