import React, { useState, useEffect } from "react";
import "../../styles/Studentoverview.css";
import Studentsidebar from "../../components/student_sidebar/Studentsidebar";
import * as XLSX from "xlsx";

function Overview({ onsearch }) {
  // const [triggerSearch, setTriggerSearch] = useState(false);
  const [pop, setpop] = useState(false);
  const [students, setStudents] = useState([]); // store json data
  const [file, setFile] = useState(null); // store file
  const [showPopup, setShowPopup] = useState(false); // show popup
  const [search, setSearch] = useState(null); // search student

  useEffect(() => {
    onsearch(search);
  }, [search]);

  // ****************************************************************************************

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcel(selectedFile);
    }
  };
  // ************************************************************************************************
  // get student
  const get_student = async (studentId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_student/${studentId}`
      );
      const data = await response.json();
      setSearch(data); // Update state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Monitor `search` updates
  // useEffect(() => {
  //     if (search) {
  //         console.log("done", search);
  //     }
  // }, [search]);

  // ****************************************************************************************
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_students") // Fetch data from Flask backend
      .then((response) => response.json())
      .then((data) => {
        setpop(data);
        if (data.length === 0) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
  // ********************************************************************************************************************
  const readExcel = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsBinaryString(selectedFile);

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Transform the JSON to the desired structure
      const transformedData = {};

      json.forEach((row) => {
        const studentId = row["Student ID"];

        if (!transformedData[studentId]) {
          transformedData[studentId] = {
            "Student ID": studentId,
            "Student Name": row["Student Name"],
            Department: row["Department"],
            Gender: row["Gender"],
            Section: row["Section"],
            Semester: row["Semester"],
            progress: row["Progress"],
            "Current GPA": row["Current GPA"],
            "Predict GPA": row["Predict GPA"],
            "Total Courses": row["Total Courses"],
            Courses: [],
          };
        }

        // Add course details
        transformedData[studentId].Courses.push({
          "Course ID": row["Course ID"],
          "Course Name": row["Course Name"],
          "Instructor Name": row["Instructor Name"],
          "INSTRUCTOR ID": row["INSTRUCTOR ID"],
          "Taken Classes": row["Taken Classes"],
          "Total Classes": row["Total Classes"],
          "Assignment Marks": row["Assignment Marks"],
          "Grade": row["Grade"],
          Attendance: row["Attendance"],
          Progress: row["Progress"],
          Prediction: row["Prediction"],
          Grade: row["Grade"],
        });
      });

      // Convert object values to an array of students
      const result = Object.values(transformedData);

      // Send the transformed data to the backend
      sendDataToBackend(result);
    };

    reader.onerror = (error) => {
      console.log("Error reading file:", error);
    };
  };
  // ********************************************************************************************************************
  const sendDataToBackend = async (jsonData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      console.log("Response from backend:", result);
      setShowPopup(false); // Hide popup after successful upload
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      {!showPopup ? (
        <div className="main_student">
          <Studentsidebar />
          <div className="side_overview">
            <h1 className="over">Overview</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by student ID"
                className="search-input"
                value={students}
                onChange={(e) => setStudents(e.target.value.toUpperCase())}
              />
              <button
                className="search-button"
                onClick={() => get_student(students)}
              >
                Search
              </button>
            </div>
            {search && (
              <div className="over_options">
                <div className="opt">
                  <h2 className="opt_h2">Name:</h2>
                  <h2 className="opt_h2">{search["Student Name"]}</h2>
                </div>
                <div className="opt">
                  <h2 className="opt_h2">Gender:</h2>
                  <h2 className="opt_h2">{search["Gender"]}</h2>
                </div>
                <div className="opt">
                  <h2 className="opt_h2">Semester:</h2>
                  <h2 className="opt_h2">{search["Semester"]}</h2>
                </div>
                <div className="opt">
                  <h2 className="opt_h2">Department:</h2>
                  <h2 className="opt_h2">{search["Department"]}</h2>
                </div>
                <div className="opt">
                  <h2 className="opt_h2">Courses:</h2>
                  <h2 className="opt_h2">{search["Total Courses"]}</h2>
                </div>
                <div className="opt">
                  <h2 className="opt_h2">Current GPA:</h2>
                  <h2 className="opt_h2">{search["Current GPA"]}</h2>
                </div>
                <div className="opt">
                  <h2 className="opt_h2">Progress:</h2>
                  <h2 className="opt_h2">{search["progress"]}</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Upload Student Record Excel File</h2>
            <input
              type="file"
              accept=".xls,.xlsx,.csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Overview;
