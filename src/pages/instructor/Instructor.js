import React, { useState, useEffect } from 'react';
import '../../styles/Studentoverview.css';
import InstructorSidebar from '../../components/instructor_sidebar/InstructorSidebar';
import * as XLSX from 'xlsx';

function Instructor() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Initially set to false
  const [get, setget] = useState([]);
  const [id, setid] = useState("");
  const [INSTA, setINSTA] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_instructors") // Fetch data from Flask backend
      .then((response) => response.json())
      .then((data) => {
        setINSTA(data);
        // Show popup if no instructors are available
        if (data.length === 0) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle file upload and conversion to JSON
  const handleFileUpload = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to JSON
      setJsonData(jsonData); // Store JSON data in state

      try {
        // Send JSON data to backend using fetch
        const response = await fetch('http://127.0.0.1:5000/add_instructor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData), // Send the entire array
        });

        if (!response.ok) {
          throw new Error('Failed to upload data');
        }

        const result = await response.json();
        alert(result.message); // Show success message
        setShowPopup(false); // Hide the popup after successful upload
      } catch (error) {
        console.error('Error uploading data:', error);
        alert('Failed to upload data. Please try again.');
      }
    };

    reader.readAsBinaryString(file); // Read the file as binary string
  };

  const get_selected_insta = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_instructor/${id}`);
      const data = await response.json();
      setget(data); // Update state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
      let isClosing = false;
  
      const handleBeforeUnload = (event) => {
        // Set a flag to indicate the tab/window is being closed
        isClosing = true;
      };
  
      const handleUnload = () => {
        if (isClosing) {
          // Send a request to clear the database only when the tab/window is closed
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

        {/* Popup for file upload */}
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
            <h2 className="opt_h2">{get["COURSE NAME"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Departments:</h2>
            <h2 className="opt_h2">{get["DEPARTMENT"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Total Students</h2>
            <h2 className="opt_h2">{get["TOTAL STUDENTS"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Credit Hours:</h2>
            <h2 className="opt_h2">{get["CREDIT HOURS"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Attendance</h2>
            <h2 className="opt_h2">{get["ATTENDANCE"]}</h2>
          </div>
          <div className="opt">
            <h2 className="opt_h2">Progress:</h2>
            <h2 className="opt_h2">{get["PROGRESS"]}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructor;