import React from 'react';
import "./AdminSettingsPage.css"
import SettingsForm from "./SettingsForm"
import ResetButton from './ResetButton';
import FormInput from './FormInput';
import AddButton from './AddButton';
import NavBar from '../navbar/Navbar';

export default function AdminSettingsPage() {
    return (
    <div className='container'>
        <div className = "header"></div> {<NavBar title = "Settings"></NavBar>}
        <div className='body'>
            <div className='green-background'>
                <SettingsForm/>
                <div className='form-second'>
                <h4 className="profile">Admin</h4>
                <form className='admin-form'>
                    <label className="reset-password"><b>Add New Mentor</b></label>
                    <FormInput className = 'input' name = 'email' placeholder = "Enter mentor's name" />   
                    <div className="button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Enter mentor's email address" />   
                        <AddButton/>
                    </div>
                    <label className="reset-password"><b>Add New Tutor</b></label>
                    <FormInput className = 'input' name = 'email' placeholder = "Enter tutor's name" />   
                    <div className="button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Enter tutor's email address" /> 
                        <AddButton/>
                    </div>
                    <label className="reset-password"><b>Add New Administrator</b></label>
                    <FormInput className = 'input' name = 'email' placeholder = "Enter administrator's name" />   
                    <div className="button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Enter administrator's email address" /> 
                        <AddButton/>
                    </div>
                </form> 
               </div>
            </div>
        </div>
     </div>
     
    );
  }
