import React, { useState, useEffect } from "react";
import "../../styles/Courses.css";
import InstructorSidebar from "../../components/instructor_sidebar/InstructorSidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function InstructorCompare() {
  const [instructorId, setInstructorId] = useState("");
  const [instructorData, setInstructorData] = useState(null); // Holds the instructor data
  const [performanceTrends, setPerformanceTrends] = useState([]); // Trends in performance
  const [termComparison, setTermComparison] = useState([]); // Term-to-term performance comparison
  const [bestSubjects, setBestSubjects] = useState([]); // Subjects taught well
  const [worstSubjects, setWorstSubjects] = useState([]); // Subjects taught poorly

  // Colors for Pie Charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

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
      processPerformanceTrends(data);
      processTermComparison(data);
      processBestAndWorstSubjects(data);
    } catch (error) {
      console.error("Error fetching instructor data:", error);
      setInstructorData(null);
      setPerformanceTrends([]);
      setTermComparison([]);
      setBestSubjects([]);
      setWorstSubjects([]);
      // alert("Instructor not found. Please try again.");
    }
  };

  // Process data to identify performance trends
  const processPerformanceTrends = (data) => {
    if (data && data.Courses) {
      // Group courses by term (assuming each course has a term field)
      const terms = {};
      data.Courses.forEach((course) => {
        const term = course["TERM"] || "N/A"; // Replace "TERM" with the actual field name
        if (!terms[term]) {
          terms[term] = {
            term,
            totalFeedback: 0,
            totalAttendance: 0,
            totalCourses: 0,
          };
        }
        terms[term].totalFeedback += course["STUDENT FEEDBACK"] || 0;
        terms[term].totalAttendance += course["ATTENDANCE"] || 0;
        terms[term].totalCourses += 1;
      });

      // Calculate average feedback and attendance per term
      const trends = Object.values(terms).map((term) => ({
        term: term.term,
        averageFeedback: term.totalFeedback / term.totalCourses,
        averageAttendance: term.totalAttendance / term.totalCourses,
      }));

      setPerformanceTrends(trends);
    } else {
      setPerformanceTrends([]);
    }
  };

  // Process data for term-to-term performance comparison
  const processTermComparison = (data) => {
    if (data && data.Courses) {
      // Group courses by term and calculate average feedback
      const terms = {};
      data.Courses.forEach((course) => {
        const term = course["TERM"] || "N/A"; // Replace "TERM" with the actual field name
        if (!terms[term]) {
          terms[term] = {
            term,
            totalFeedback: 0,
            totalCourses: 0,
          };
        }
        terms[term].totalFeedback += course["STUDENT FEEDBACK"] || 0;
        terms[term].totalCourses += 1;
      });

      // Calculate average feedback per term
      const comparison = Object.values(terms).map((term) => ({
        term: term.term,
        averageFeedback: term.totalFeedback / term.totalCourses,
      }));

      setTermComparison(comparison);
    } else {
      setTermComparison([]);
    }
  };

  // Process data to identify best and worst subjects
  const processBestAndWorstSubjects = (data) => {
    if (data && data.Courses) {
      // Group courses by subject and calculate average feedback
      const subjects = {};
      data.Courses.forEach((course) => {
        const subject = course["COURSE NAME"] || "N/A";
        if (!subjects[subject]) {
          subjects[subject] = {
            subject,
            totalFeedback: 0,
            totalCourses: 0,
          };
        }
        subjects[subject].totalFeedback += course["STUDENT FEEDBACK"] || 0;
        subjects[subject].totalCourses += 1;
      });

      // Calculate average feedback per subject
      const subjectPerformance = Object.values(subjects).map((subject) => ({
        subject: subject.subject,
        averageFeedback: subject.totalFeedback / subject.totalCourses,
      }));

      // Sort subjects by average feedback
      const sortedSubjects = subjectPerformance.sort(
        (a, b) => b.averageFeedback - a.averageFeedback
      );

      // Get the best three subjects
      const bestThree = sortedSubjects.slice(0, 3);
      setBestSubjects(bestThree);

      // Get the worst three subjects
      const worstThree = sortedSubjects.slice(-3);
      setWorstSubjects(worstThree);
    } else {
      setBestSubjects([]);
      setWorstSubjects([]);
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
        <h1 className="over">Trends </h1>
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

        {/* Chart 3: Best Subjects (Bar Chart) */}
        <div className="chart-container">
          <h2>Best Subjects</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bestSubjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="averageFeedback"
                fill="#4CAF50"
                name="Average Feedback"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Worst Subjects (Bar Chart) */}
        <div className="chart-container">
          <h2>Worst Subjects</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={worstSubjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="averageFeedback"
                fill="#FF5722"
                name="Average Feedback"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Chart 1: Performance Trends (Pie Chart) */}
        <div className="chart-container">
          <h2>Performance Trends (Average Feedback by Term)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={performanceTrends}
                dataKey="averageFeedback"
                nameKey="term"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {performanceTrends.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Term-to-Term Performance Comparison (Pie Chart) */}
        <div className="chart-container">
          <h2>Term-to-Term Performance Comparison</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={termComparison}
                dataKey="averageFeedback"
                nameKey="term"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#82ca9d"
                label
              >
                {termComparison.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default InstructorCompare;
