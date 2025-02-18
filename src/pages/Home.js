import React from 'react'
import logo from '../assets/logo.jpg'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <>
            <div className='container'>
                <img src={logo} alt='logo' className='logo' />
                <h1 className='heading'>AI-POWERED SYSTEM FOR ANALYZING & REPORTING EDUCATIONAL PERFORMANCE</h1>
                <h3 className='SUB'>PICK ANY ANALYZING OPTION</h3>
                <div className='options'>
                    <Link to='/overview' className='button'>STUDENT ANALYSIS</Link>
                    <Link to='/courseoverview' className='button'>COURSE ANALYSIS</Link>
                    <Link to='/insta' className='button'>INSTRUCTOR ANALYSIS</Link>
                </div>

            </div>
        </>
    )
}

export default Home
