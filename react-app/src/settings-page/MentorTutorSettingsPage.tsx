import React from 'react';
import "./AdminSettingsPage.css"
import SettingsForm from "./SettingsForm"
import NavBar from '../navbar/Navbar';

export default function MentorTutorSettingsPage() {
    return (
      <div className='container'>
      <div className = "header"></div> {<NavBar title = "Settings"></NavBar>}
      <div className='body'>
          <div className='green-background'>
              <SettingsForm/>
          </div>
      </div>
    </div>
    );
  }
