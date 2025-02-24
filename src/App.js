import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Overview from "./pages/student/Overview";
import Course from "./pages/courses/Course";
import Instructor from "./pages/instructor/Instructor";
import Courses from "./pages/student/Courses";
import Attendence from "./pages/student/Attendence";
import Performance from "../src/pages/student/Performance";
import Compare from "./pages/student/Compare";
import Report from "./pages/student/Report";
import Add from "./pages/student/Add";
import Section from "../src/pages/courses/Section";
import CourseCompare from "./pages/courses/CourseCompare";
import CourseReport from "./pages/courses/CourseReport";
import Courseperformance from "./pages/courses/Courseperformance";
import Grade from "./pages/courses/Grade";
import InstructorCompare from "./pages/instructor/InstructorCompare";
import InstructorReport from "./pages/instructor/InstructorReport";
import InstructorPerformance from "./pages/instructor/InstructorPerformance";
import InstructorFeedback from "./pages/instructor/InstructorFeedback";
import Need from "./pages/instructor/Need";
import InstructorSection from "./pages/instructor/InstructorSection";
import { useState } from "react";
import Trends from "./pages/student/Trends";
function App() {
  const [search, setSearch] = useState(null); // State to store data from child

  // Callback function to receive data from child
  const handleSearch = (data) => {
    setSearch(data); // Update state in parent
  };
  

  return (
    <>
      <Routes>
        {/* student */}
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview onsearch={handleSearch}/>} />
        <Route path="/courses" element={<Courses search={search} />} />
        <Route path="/performance" element={<Performance search={search} />} />
        <Route path="/attendence" element={<Attendence search={search} />} />
        <Route path="/compare" element={<Compare search={search} />} />
        <Route path="/report" element={<Report search={search} />} />
        <Route path="/add" element={<Add />} />
        <Route path="/trends" element={<Trends search={search}/>}/>

        <Route path="/courseoverview" element={<Course />} />
        <Route path="/insta" element={<Instructor />} />
        <Route path="/section" element={<Section />} />
        <Route path="/coursecompare" element={<CourseCompare />} />
        <Route path="/coursereport" element={<CourseReport />} />
        <Route path="/courseperformance" element={<Courseperformance />} />
        <Route path="/grade" element={<Grade />} />
        <Route path="/comparison" element={<InstructorCompare />} />
        <Route path="/instareport" element={<InstructorReport />} />
        <Route path="/instaPerformance" element={<InstructorPerformance />} />
        <Route path="/studentfeed" element={<InstructorFeedback />} />
        <Route path="/need" element={<Need />} />
        <Route path="/instasection" element={<InstructorSection />} />
      </Routes>
    </>
  );
}

export default App;
