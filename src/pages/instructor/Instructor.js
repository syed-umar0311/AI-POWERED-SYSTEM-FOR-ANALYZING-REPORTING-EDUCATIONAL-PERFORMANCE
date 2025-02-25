import React, { useState, useEffect } from 'react';
import '../../styles/Studentoverview.css';
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar';
import * as XLSX from 'xlsx';

function Instructor() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [get, setget] = useState([]);
  const [id, setid] = useState("");
  const [INSTA, setINSTA] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_instructors") 
      .then((response) => response.json())
      .then((data) => {
        setINSTA(data);
        if (data.length === 0) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; 
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet); 
  
      // Process data into the required JSON structure
      const instructorMap = {};
  
      rawData.forEach(row => {
        const instructorId = row["INSTRUCTOR ID"];
        const instructorName = row["INSTRUCTOR NAME"];
  
        if (!instructorMap[instructorId]) {
          instructorMap[instructorId] = {
            "INSTRUCTOR ID": instructorId,
            "INSTRUCTOR NAME": instructorName,
            "Courses": []
          };
        }
  
        instructorMap[instructorId]["Courses"].push({
          "ATTENDANCE": row["ATTENDANCE"],
          "COURSE ID": row["COURSE ID"],
          "COURSE NAME": row["COURSE NAME"],
          "CREDIT HOURS": row["CREDIT HOURS"],
          "DEPARTMENT": row["DEPARTMENT"],
          "PROGRESS": row["PROGRESS"],
          "SECTION": row["SECTION"],
          "STUDENT FEEDBACK": row["STUDENT FEEDBACK"],
          "TOTAL STUDENTS": row["TOTAL STUDENTS"],
          "BAD": row["BAD"],
          "GOOD": row["GOOD"],
          "EXCELLENT": row["EXCELLENT"],
          "NEED": row["NEED"],
          "QUALITY": row["QUALITY"],
          "TERM": row["TERM"]
        });
      });
  
      // Convert instructorMap to an array of instructors
      const formattedData = Object.values(instructorMap);
      setJsonData(formattedData);
  
      try {
        const response = await fetch('http://127.0.0.1:5000/add_instructor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload data');
        }
  
        const result = await response.json();
        alert(result.message);
        setShowPopup(false);
      } catch (error) {
        console.error('Error uploading data:', error);
        alert('Failed to upload data. Please try again.');
      }
    };
  
    reader.readAsBinaryString(file);
  };
  

  const get_selected_insta = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_instructor/${id}`);
      const data = await response.json();
      setget(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


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
        <h1 className="over">Overview</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by Course ID" 
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

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Upload Instructor Record Excel File</h2>
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
              />
              <button onClick={handleFileUpload} className="upload-button">
                Upload
              </button>
              <button onClick={() => setShowPopup(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="over_options">
          <div className="opt">
            <h2 className="opt_h2">Instructor Name:</h2>
            <h2 className="opt_h2">{get["INSTRUCTOR NAME"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Teaching Courses</h2>
            <h2 className="opt_h2">{get?.Courses?.length}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Departments:</h2>
            <h2 className="opt_h2">{get?.Courses?.[0]?.["DEPARTMENT"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Total Students</h2>
            <h2 className="opt_h2">{get?.Courses?.[0]?.["TOTAL STUDENTS"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Credit Hours:</h2>
            <h2 className="opt_h2">{get?.Courses?.[0]?.["CREDIT HOURS"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Attendance</h2>
            <h2 className="opt_h2">{get?.Courses?.[0]?.["ATTENDANCE"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Progress:</h2>
            <h2 className="opt_h2">{get?.Courses?.[0]?.["PROGRESS"]}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructor;