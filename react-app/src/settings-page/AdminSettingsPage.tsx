import React from 'react';
import "./AdminSettingsPage.css"
import SettingsForm from "./SettingsForm"
import ResetButton from './ResetButton';
import FormInput from './FormInput';
import AddButton from './AddButton';

export default function AdminSettingsPage() {
    return (
    <div className='container'>
        <div className = "header"></div> {/* Inset Navbar Here */}
        <div className='body'>
            <div className='green-background'>
                <SettingsForm/>
                <div className='form-second'>
                <h4 className="profile">Admin</h4>
                <form>
                    <label className="reset-password"><b>Add New Mentor</b></label>
                    <div className="button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Enter mentor's email address" />   
                        <AddButton/>
                    </div>
                    <label className="reset-password"><b>Add New Tutor</b></label>
                    <div className="button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Enter tutor's email address" /> 
                        <AddButton/>
                    </div>
                    <label className="reset-password"><b>Add New Administrator</b></label>
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