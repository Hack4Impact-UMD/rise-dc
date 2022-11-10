import React from 'react';
import "./SearchPage.css"
import StudentProfile from './StudentProfile';

export default function SearchPage() {
    return (
    <div className="container">
        <div className = "header"></div> {/* Inset Navbar Here */}
        <div className="body">
            <div className="green-background">
                <div className="white-background">
"                   <div className="display-horizontal">
                        <input className="search" name="email" placeholder="Search"/>
                        <button className="element-button">New Student</button>
                    </div>
                    <StudentProfile/>
                </div>
            </div>
        </div>
    </div>
    );
}
