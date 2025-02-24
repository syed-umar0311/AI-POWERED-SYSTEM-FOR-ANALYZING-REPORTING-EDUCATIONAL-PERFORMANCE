import React, { useState, useEffect } from "react";
import CourseSidebar from "../../components/curse_sidebar/CourseSidebar";
import "../../styles/Studentoverview.css";
import * as XLSX from "xlsx";

function Course() {
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [getcourse, setgetcourse] = useState(null); // Initialize as null
  const [id, setid] = useState("");

  const get_selected_course = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_course/${id}`);
      const data = await response.json();
      setgetcourse(data); // Update state
      console.log("Fetched course data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (getcourse) {
      console.log("Updated getcourse:", getcourse);
    }
  }, [getcourse]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setShowPopup(data.length === 0); // Show popup if no courses exist
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
      try {
        // Group data by Course ID and Course Name
        const groupedData = jsonData.reduce((acc, row) => {
          const courseKey = `${row["Course ID"]}-${row["Course Name"]}`;
          if (!acc[courseKey]) {
            acc[courseKey] = {
              "Course ID": row["Course ID"],
              "Course Name": row["Course Name"],
              "Section": []
            };
          }
          acc[courseKey].Section.push({
            "Instructor Name": row["Instructor Name"],
            "Section": row["Section"],
            "Total Students": row["Total Students"],
            "Department": row["Department"],
            "Attendance": row["Attendance"],
            "Progress": row["Progress"],
            "Feedback_rate": row["Feedback_rate"],
            "Participation": row["Participation"],
            "Dropout": row["Dropout"],
            "Grade_a": row["Grade_a"],
            "Grade_b": row["Grade_b"],
            "Grade_c": row["Grade_c"],
            "Grade_d": row["Grade_d"],
            "credit_hours": row["credit_hours"]
          });
          return acc;
        }, {});
  
        // Convert the grouped data into an array
        const transformedData = Object.values(groupedData);
  
        const response = await fetch("http://127.0.0.1:5000/add_course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload data");
        }
  
        const result = await response.json();
        alert(result.message);
        setShowPopup(false);
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("Failed to upload data. Please try again.");
      }
    };
  
    reader.readAsBinaryString(file);
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
    <h2 className="opt_h2">
      {getcourse ? getcourse["Course Name"] : ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Instructor Name:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["Instructor Name"] || ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Department:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["Department"] || ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Section:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["Section"] || ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Credit Hours:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["credit_hours"] || ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Attendance:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["Attendance"] || ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Progress:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["Progress"] || ""}
    </h2>
  </div>
  <div className="opt">
    <h2 className="opt_h2">Class Size:</h2>
    <h2 className="opt_h2">
      {getcourse?.Section?.[0]?.["Total Students"] || ""}
    </h2>
  </div>
</div>
      </div>
    </div>
  );
}

export default Course;