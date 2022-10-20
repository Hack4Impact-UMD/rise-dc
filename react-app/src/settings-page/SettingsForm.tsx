import React from 'react';
import "./AdminSettingsPage.css"
import ResetButton from './ResetButton';
import FormInput from './FormInput';

export default function SettingsForm() {
    return (
            <div className="form">
            <h4 className="profile">Profile</h4>
            <form>
                    <label className="reset-email"><b>Reset Email</b></label>
                    <div className = "button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Enter email address" /> 
                        <ResetButton/>
                    </div>
                    <label className="reset-password"><b>Reset Password</b></label>
                    <FormInput className = 'input' name = 'email' placeholder = "Enter current password" />   
                    <FormInput className = 'input' name = 'email' placeholder = "Enter new password" />   
                    <div className="button-container">
                        <FormInput className = 'input' name = 'email' placeholder = "Confirm new password" />
                        <ResetButton/>
                    </div>
            </form>
        </div>
      );
    }
      