import React, { useState } from "react";
import "../../styles/Studentoverview.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";

function Overview() {
  const [file, setFile] = useState(true);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set selected file
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading:", file.name);
    }
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
            <h2>Upload Student Recode Excel File</h2>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
            <div className="popup-buttons">
              <button onClick={handleUpload} className="upload-btn">
                Upload
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overview;




