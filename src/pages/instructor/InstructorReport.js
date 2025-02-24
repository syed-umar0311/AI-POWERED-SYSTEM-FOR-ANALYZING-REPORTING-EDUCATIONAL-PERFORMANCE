import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import { useState, useEffect } from "react";
function InstructorReport() {
  const [id, setid] = useState("")
  const [get, setget] = useState([])

  const get_selected_insta = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_instructor/${id}`
      );
      const data = await response.json();
      setget(data); 
      }
     catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  const saveInstructorData = async () => {
    try {
      if (!get) {
        return;
      }
  
  
      const response = await fetch("http://127.0.0.1:5000/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(get), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
    } catch (error) {
      console.error("Error saving data:", error);
      // alert("Failed to save data. Check the console for more details.");
    }
  };

  const generateReport = async () => {
    try {
      
      const response = await fetch('http://127.0.0.1:5000/generate-report', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
        <h1 className="over">Report </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Instructor ID"
            className="search-input"
            value={id}
            onChange={(e)=>setid(e.target.value.toUpperCase())}
          />
          <button className="search-button" onClick={ async () => {await get_selected_insta(id); await saveInstructorData(); }}>Search</button>
        </div>
        {get&&(<h1 style={{fontFamily:"roboto"}}>INSTRUCTOR NAME : {get["INSTRUCTOR NAME"]}</h1>)}
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <button style={buttonStyle} onClick={generateReport}>Generate Report</button>
          </div>
        </div>

      </div>
    </div>
  );
}
const buttonStyle = {
  margin: "5px",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default InstructorReport;
