import React from 'react';
import "./AdminSettingsPage.css"

export default function AdminSettingsPage() {
    return (
     <div className='container'>
        <div className = "header">
            <div className = "rise-dc-img">
                <img src = "https://process.filestackapi.com/resize=width:600,height:315,fit:max/quality=value:90/UM8LSPrZR1aOFRfn7KyC"
                width={90} height={110} alt = "logo"/>
            </div>
            <h2 className = "settings-page-title">Settings</h2>
        </div>
        <div className='body'>
            <div className="form">
               <h4 className="profile">Profile</h4>
               <form>
                    <label className="reset-email"><b>Reset Email</b></label>
                    <div className = "button-container">
                        <input className="input" type="text" placeholder="Enter email address" name="email"/>
                        <button className = "reset-button">Reset</button>
                    </div>
                    <label className="reset-password"><b>Reset Password</b></label>
                    <input className="input" type="text" placeholder="Enter current password" name="password-curr"/>
                    <input className="input" type="text" placeholder="Enter new password" name="password-new"/>
                    <div className="button-container">
                        <input className="input" type="text" placeholder="Confirm new password" name="password-new-again"/>
                        <button className = "reset-button">Reset</button>
                    </div>
               </form>
            </div>
        </div>
     </div>
     
    );
  }
