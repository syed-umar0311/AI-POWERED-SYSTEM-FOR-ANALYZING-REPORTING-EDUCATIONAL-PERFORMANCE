import React, { useState, useEffect} from 'react';
import '../../styles/Courses.css';
import styles from '../../styles/StudentCourseForm.module.css';
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';

function Add() {
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    studentName: '',
    courseName: '',
    semester: '',
    department: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/add_student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Student ID": formData.studentId,  // Match backend field name
          "Course ID": formData.courseId,
          "Student Name": formData.studentName,
          "Course Name": formData.courseName,
          "Semester": formData.semester,
          "Department": formData.department,
        }),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (response.ok) {
        alert("Student added successfully!");
        setFormData({
          studentId: "",
          courseId: "",
          studentName: "",
          courseName: "",
          semester: "",
          department: "",
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
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
        <h1 className="over">Add Student</h1>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Student Course Form</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            {Object.keys(formData).map((key) => (
              <div className={styles.formGroup} key={key}>
                <label className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            ))}
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
