import React from "react";
import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function InstructorPerformance() {
  const [instructorId, setInstructorId] = useState("");
  const [instructorData, setInstructorData] = useState(null); // Holds the instructor data
  const [termData, setTermData] = useState([]); // Data for a specific term
  const [sixTermsData, setSixTermsData] = useState([]); // Data for the last six terms
  const [comparisonData, setComparisonData] = useState([]); // Data for section comparison
  const [bestCourses, setBestCourses] = useState([]); // Best three courses
  const [worstCourses, setWorstCourses] = useState([]); // Least performing three courses

  // Fetch instructor data
  const fetchInstructorData = async (id) => {
    if (!id) {
      alert("Please enter an Instructor ID");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_instructor/${id}`
      );
      if (!response.ok) {
        throw new Error("Instructor not found");
      }
      const data = await response.json();
      setInstructorData(data);

      // Process data for the charts
      processTermData(data);
      processSixTermsData(data);
      processComparisonData(data);
      processBestAndWorstCourses(data);
    } catch (error) {
      console.error("Error fetching instructor data:", error);
      setInstructorData(null);
      setTermData([]);
      setSixTermsData([]);
      setComparisonData([]);
      setBestCourses([]);
      setWorstCourses([]);
      // alert("Instructor not found. Please try again.");
    }
  };

  // Process data for the term performance chart
  const processTermData = (data) => {
    if (data && data.Courses) {
      const termPerformance = data.Courses.map((course) => ({
        courseName: course["COURSE NAME"] || "N/A", // Fallback to "N/A" if missing
        averageGrade: course["STUDENT FEEDBACK"] || 0, // Fallback to 0 if missing
        attendance: course["ATTENDANCE"] || 0, // Fallback to 0 if missing
      }));
      setTermData(termPerformance);
    } else {
      setTermData([]); // Reset if no data
    }
  };

  // Process data for the last six terms performance chart
  const processSixTermsData = (data) => {
    if (data && data.Courses) {
      // Assuming each course represents a term
      const lastSixTerms = data.Courses.slice(0, 6).map((course, index) => ({
        term: `Term ${index + 1}`,
        averageGrade: course["STUDENT FEEDBACK"] || 0, // Fallback to 0 if missing
        attendance: course["ATTENDANCE"] || 0, // Fallback to 0 if missing
      }));
      setSixTermsData(lastSixTerms);
    } else {
      setSixTermsData([]); // Reset if no data
    }
  };

  // Process data for the section comparison chart
  const processComparisonData = (data) => {
    if (data && data.Courses) {
      const comparison = data.Courses.map((course) => ({
        section: course["SECTION"] || "N/A", // Fallback to "N/A" if missing
        averageGrade: course["STUDENT FEEDBACK"] || 0, // Fallback to 0 if missing
        attendance: course["ATTENDANCE"] || 0, // Fallback to 0 if missing
      }));
      setComparisonData(comparison);
    } else {
      setComparisonData([]); // Reset if no data
    }
  };

  // Process data to find the best and worst three courses
  const processBestAndWorstCourses = (data) => {
    if (data && data.Courses) {
      // Sort courses by STUDENT FEEDBACK (descending for best, ascending for worst)
      const sortedByFeedback = [...data.Courses].sort(
        (a, b) => b["STUDENT FEEDBACK"] - a["STUDENT FEEDBACK"]
      );

      // Get the best three courses
      const bestThree = sortedByFeedback.slice(0, 3).map((course) => ({
        courseName: course["COURSE NAME"] || "N/A",
        averageGrade: course["STUDENT FEEDBACK"] || 0,
        attendance: course["ATTENDANCE"] || 0,
      }));
      setBestCourses(bestThree);

      // Get the worst three courses
      const worstThree = sortedByFeedback.slice(-3).map((course) => ({
        courseName: course["COURSE NAME"] || "N/A",
        averageGrade: course["STUDENT FEEDBACK"] || 0,
        attendance: course["ATTENDANCE"] || 0,
      }));
      setWorstCourses(worstThree);
    } else {
      setBestCourses([]);
      setWorstCourses([]);
    }
  };

  // Fetch data when instructor ID changes
  useEffect(() => {
    if (instructorId) {
      fetchInstructorData(instructorId);
    }
  }, [instructorId]);

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
      <div
        className="side_overview"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <h1 className="over">Instructor Performance</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Instructor ID"
            className="search-input"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value.toUpperCase())}
          />
          <button
            className="search-button"
            onClick={() => fetchInstructorData(instructorId)}
          >
            Search
          </button>
        </div>

        {/* Chart 1: Performance in All Courses for a Term */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
            Performance in All Courses for a Term
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={termData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="courseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGrade" fill="#8884d8" name="Average Grade" />
              <Bar dataKey="attendance" fill="#82ca9d" name="Attendance (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Performance Over the Last Six Terms */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
            Performance Over the Last Six Terms
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sixTermsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="averageGrade"
                stroke="#8884d8"
                name="Average Grade"
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#82ca9d"
                name="Attendance (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Section Comparison */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
            Section Comparison (Average Grade and Attendance)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGrade" fill="#8884d8" name="Average Grade" />
              <Bar dataKey="attendance" fill="#82ca9d" name="Attendance (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Best Three Courses */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
            Best Three Courses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bestCourses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="courseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGrade" fill="#8884d8" name="Average Grade" />
              <Bar dataKey="attendance" fill="#82ca9d" name="Attendance (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 5: Least Performing Three Courses */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
            Least Performing Three Courses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={worstCourses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="courseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGrade" fill="#8884d8" name="Average Grade" />
              <Bar dataKey="attendance" fill="#82ca9d" name="Attendance (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default InstructorPerformance;
