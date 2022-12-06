import React from 'react';
import ContactInformation from '../Form/ContactInformation';
import "./Report.css"

export default function MentorTutorSettingsPage() {
    return (
    <div className='container'>
        <div className='navbar'></div>
        <div className='body'>
            <div className='container-1'>
                <h2 className='main-text'>Students Receiving High-Impact Tutoring</h2>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
            </div>
            <div className='container-2'>
                <h2 className='main-text'>Students Not Receiving High-Impact Tutoring</h2>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
                <div className='row'>
                    <ContactInformation name="Alice"/>
                    <ContactInformation name="Alice"/>
                </div>
            </div>
        </div>

    </div>
    );
  }
