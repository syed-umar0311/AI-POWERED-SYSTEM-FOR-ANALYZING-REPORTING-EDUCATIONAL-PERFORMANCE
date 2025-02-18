import React, { useState } from "react";
import "../../styles/Studentoverview.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";
import * as XLSX from "xlsx"; // Import XLSX to read Excel

function Overview() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcel(selectedFile); // Read the file immediately
    }
  };

  const readExcel = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsBinaryString(selectedFile);

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      console.log("Converted JSON:", json); // ✅ Now this will always be logged
    };

    reader.onerror = (error) => {
      console.log("Error reading file:", error);
    };
  };

  return (
    <>
      {file ? (
        <div className="main_student">
          <Studentsidebar />
          <div className="side_overview">
            <h1 className="over">Overview</h1>
            <div className="search-container">
              <input type="text" placeholder="Search by student ID" className="search-input" />
              <button className="search-button">Search</button>
            </div>
            <div className="over_options">
              <div className="opt">
                <h2 className="opt_h2">Name:</h2>
                <h2 className="opt_h2">Umar</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Gender:</h2>
                <h2 className="opt_h2">Male</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Semester:</h2>
                <h2 className="opt_h2">6</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Department:</h2>
                <h2 className="opt_h2">SE</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Courses:</h2>
                <h2 className="opt_h2">10</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Current GPA:</h2>
                <h2 className="opt_h2">3.4</h2>
              </div>
              <div className="opt">
                <h2 className="opt_h2">Progress:</h2>
                <h2 className="opt_h2">GOOD</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Upload Student Record Excel File</h2>
            <input type="file" accept=".xls,.xlsx,.csv" onChange={handleFileChange} />
            <div className="popup-buttons">
              <button className="upload-btn">Upload</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overview;
