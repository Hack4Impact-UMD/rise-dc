import React from 'react';
import "./SearchPage.css"
import FormInput from '../settings-page/FormInput';
import AddElementButton from './AddElementButton';
import StudentProfile from './StudentProfile';
import notepad from './assets/notepad.svg';
import person from './assets/person.svg';

export default function SearchPage() {
    return (
    <div className='container'>
        <div className = "header"></div> {/* Inset Navbar Here */}
        <div className='body'>
            <div className='green-background'>
                <div className = 'white-background'>
                    <div className='display-horizontal'>
                        <input className = 'search' name = 'email' placeholder = "Search"/>
                        <AddElementButton className = 'element-button' text='New Student' />
                    </div>
                    <StudentProfile/>
                </div>
            </div>
        </div>
    </div>
    );
}