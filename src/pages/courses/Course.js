import React, { useState, useEffect } from "react";
import CourseSidebar from "../../components/curse_sidebar/CourseSidebar";
import "../../styles/Studentoverview.css";
import * as XLSX from "xlsx";

function Course() {
  const [showPopup, setShowPopup] = useState(false); 
  const [file, setFile] = useState(null); 
  const [courses, setCourses] = useState([]); // Stores course data
  const [getcourse, setgetcourse] = useState([]); // Stores course data
  const [id, setid] = useState(""); // Stores the course ID

  const get_selected_course = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_course/${id}`);
      const data = await response.json();
      setgetcourse(data); // Update state
      console.log(getcourse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Monitor `search` updates
  useEffect(() => {
    if (getcourse) {
      console.log("done", getcourse);
    }
  }, [getcourse]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_courses") // Fetch data from Flask backend
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        // Show popup if no courses are available
        if (data.length === 0) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // console.log(courses);
  useEffect(() => {
    let isClosing = false;

    const handleBeforeUnload = (event) => {
      // Set a flag to indicate the tab/window is being closed
      isClosing = true;
    };

    const handleUnload = () => {
      if (isClosing) {
        // Send a request to clear the database only when the tab/window is closed
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

  // Handle file upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Parse Excel file and send data to backend using fetch
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to JSON

      try {
        // Send JSON data to backend using fetch
        const response = await fetch("http://127.0.0.1:5000/add_course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData), // Send the entire array
        });

        if (!response.ok) {
          throw new Error("Failed to upload data");
        }

        const result = await response.json();
        alert(result.message); // Show success message
        setShowPopup(false); // Close the popup after successful upload
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("Failed to upload data. Please try again.");
      }
    };

    reader.readAsBinaryString(file); // Read the file as binary string
  };

  return (
    <div className="main_student">
      <CourseSidebar />
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
            onClick={() => get_selected_course(id)}
          >
            Search
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Upload Student Record Excel File</h2>
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
              />
              <button onClick={handleFileUpload} className="upload-button">
                Upload
              </button>
            </div>
          </div>
        )}

          <div className="over_options">
            <div className="opt">
              <h2 className="opt_h2">Course Name:</h2>
              <h2 className="opt_h2">{getcourse?(getcourse["course_name"]):("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Instructor Name:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["instructor_name"]:("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Department:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["department_name"]:("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Section:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["section"]:("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Credit Hours:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["credit_hours"]:("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Attendance:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["attendance"]:("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Progress:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["progress"]:("")}</h2>
            </div>
            <div className="opt">
              <h2 className="opt_h2">Class Size:</h2>
              <h2 className="opt_h2">{getcourse?getcourse["class_size"]:("")}</h2>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Course;
