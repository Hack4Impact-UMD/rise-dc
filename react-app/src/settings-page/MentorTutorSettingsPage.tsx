import React from 'react';
import "./AdminSettingsPage.css"
import SettingsForm from "./SettingsForm"

export default function MentorTutorSettingsPage() {
    return (
      <div className='container'>
      <div className = "header"></div> {/* Inset Navbar Here */}
      <div className='body'>
          <div className='green-background'>
              <SettingsForm/>
          </div>
      </div>
    </div>
    );
  }