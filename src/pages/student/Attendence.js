import React from 'react'
import '../../styles/Courses.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';
import { useEffect, useState } from 'react';
function Attendence({search}) {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
      if (search) {
        console.log("Specific Student Data:", search["Courses"]); // ✅ Debug log
      }
    }, [search]);
    console.log(search)

  
  useEffect(() => {
    const fetchStudentScatterPlot = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/scatter-plot/${search["Student ID"]}`,
          { responseType: "blob" }
        );

        // Convert blob to URL
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching scatter plot:", error);
      }
    };

    fetchStudentScatterPlot();
  },[search]);


// *****************************************************************************************************
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
    // *****************************************************************************************************


    
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Impact of Attendance on Grades</h2>
      {imageSrc ? (
        <img src={imageSrc} alt={`Scatter Plot for Student ${search["Student Name"]}`} className="border rounded-lg shadow-lg" />
      ) : (
        <p>Loading scatter plot...</p>
      )}
    </div>
    </div>
  )
}

export default Attendence
