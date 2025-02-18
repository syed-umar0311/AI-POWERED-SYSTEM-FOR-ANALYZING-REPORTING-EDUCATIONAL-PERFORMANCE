import React from 'react'
import Studentsidebar from '../../components/student_sidebar/Studentsidebar';
import '../../styles/Courses.css';

function Report() {
   
    return (


        <div className="main_student">
            <Studentsidebar />
            <div className="side_overview">
                <h1 className="over">Report</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search by student ID" className="search-input" />
                    <button className="search-button">Search</button>
                </div>

                <div style={{ padding: 20 }}>
                    <h1 style={{fontFamily:'sans-serif'}}>Student Performance Dashboard</h1>
                    <div style={{ marginBottom: 20 }}>
                        <button
                            style={buttonStyle}
                        >
                            Generate Report
                        </button>
                        <button
                            style={buttonStyle}
                        >
                            Generate AI Performance Graph
                        </button>
                        <button
                            style={buttonStyle}
                        >
                            Generate Attendance AI Graph
                        </button>
                        <button
                            style={buttonStyle}
                        >
                            Generate Prediction Pass/Fail Graph
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
const buttonStyle = {
    
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    
};

export default Report
