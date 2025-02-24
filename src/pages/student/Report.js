import React from 'react'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';
import '../../styles/Courses.css';
import { useState, useEffect } from "react";


function Report() {
    const [id, setid] = useState("")
      const [get, setget] = useState([])

    const get_selected_insta = async (id) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/get_student/${id}`
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
        //   alert("Failed to save data. Check the console for more details.");
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




      useEffect(() => {
          let isClosing = false;
      
          const handleBeforeUnload = (event) => {
            // Set a flag to indicate the tab/window is being closed
            isClosing = true;
          };
      
          const handleUnload = () => {
            if (isClosing) {
              // Send a request to clear the database only when the tab/window is closed
              fetch("http://127.0.0.1:5000/clear_database", {
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
            <Studentsidebar />
            <div className="side_overview">
                <h1 className="over">Report</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search by student ID" className="search-input" value={id} onChange={(e)=>setid(e.target.value.toUpperCase())}/>
                    <button className="search-button" onClick={ async () => {await get_selected_insta(id); await saveInstructorData(); }}>Search</button>
                </div>

                <div style={{ padding: 20 }}>
                    <h1 style={{fontFamily:'sans-serif'}}>STUDENT NAME : {get&&(get["Student Name"])}</h1>
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

export default Report
