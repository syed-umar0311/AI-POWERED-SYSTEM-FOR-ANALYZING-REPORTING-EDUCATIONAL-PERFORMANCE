import React, { useEffect, useState } from "react";
import "../../styles/Courses.css";
import CourseSidebar from "../../components/curse_sidebar/CourseSidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"; // Using Recharts for charts

function Section() {
  const [get, setget] = useState([]); // Selected course data
  const [getall, setgetall] = useState([]); // All courses data
  const [id, setid] = useState(""); // Course ID input
  const [show, setshowall] = useState(false); // Toggle between selected course and all courses

  // Fetch selected course data
  const get_selected_course = async (id) => {
    if (!id) {
      alert("Please enter a Course ID");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/get_course/${id}`);
      if (!response.ok) {
        throw new Error("Course not found");
      }
      const data = await response.json();
      setget(data);
      setshowall(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setget([]);
      setshowall(false);
      alert("Course not found. Please try again.");
    }
  };

  // Fetch all courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_courses");
        const data = await response.json();
        setgetall(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);

  // Clear page data on unload
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

  // Prepare data for charts
  const prepareChartData = (sections) => {
    return sections.map((section) => ({
      name: section["Section"],
      attendance: parseFloat(section["Attendance"].replace("%", "")),
      feedback_rate: section["Feedback_rate"],
      participation: section["Participation"],
      dropout: section["Dropout"],
    }));
  };

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="main_student">
      <CourseSidebar />
      <div className="side_overview">
        <h1 className="over">Section</h1>
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

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Total Sections</th>
                <th>Department Name</th>
                <th>Credit Hours</th>
              </tr>
            </thead>
            <tbody>
              {show ? (
                <tr>
                  <td>{get["Course ID"]}</td>
                  <td>{get["Course Name"]}</td>
                  <td>{get["Section"]?.length}</td>
                  <td>{get["Section"]?.[0]?.["Department"]}</td>
                  <td>{get["Section"]?.[0]?.["credit_hours"]}</td>
                </tr>
              ) : (
                getall.map((course) => (
                  <tr key={course["Course ID"]}>
                    <td>{course["Course ID"]}</td>
                    <td>{course["Course Name"]}</td>
                    <td>{course["Section"]?.length}</td>
                    <td>{course["Section"]?.[0]?.["Department"]}</td>
                    <td>{course["Section"]?.[0]?.["credit_hours"]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        {show && get["Section"] && (
          <div className="charts-container">
            {/* Flex container for side-by-side charts */}
            <div className="charts-row">
              {/* Bar Chart for Attendance */}
              <div className="chart">
                <h3>Attendance by Section</h3>
                <BarChart
                  width={400}
                  height={300}
                  data={prepareChartData(get["Section"])}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#8884d8" />
                </BarChart>
              </div>

              {/* Pie Chart for Feedback Rate */}
              <div className="chart">
                <h3>Feedback Rate Distribution</h3>
                <PieChart width={400} height={300}>
                  <Pie
                    data={prepareChartData(get["Section"])}
                    dataKey="feedback_rate"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {prepareChartData(get["Section"]).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Section;
