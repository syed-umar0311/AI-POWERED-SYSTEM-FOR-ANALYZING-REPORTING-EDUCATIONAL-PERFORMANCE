import React from 'react'
import '../../styles/Courses.css'
import styles from '../../styles/StudentCourseForm.module.css'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar'
import { useState } from 'react'
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
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // You can add your form submission logic here (e.g., API call)
      };
  return (
    <div className="main_student">
    <Studentsidebar />
    <div className="side_overview">
      <h1 className="over">Add Student</h1>

      {/* form */}
      <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Student Course Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Course ID:</label>
          <input
            type="text"
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Semester:</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
     
     
      
    </div>
  </div>
  )
}

export default Add
