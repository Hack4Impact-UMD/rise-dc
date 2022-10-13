import {useState} from 'react'
import {getAuth} from 'firebase/auth'
import Header from './Header/Header';
import RecentLogs from './RecentLogs/RecentLogs';
import './Landing.css'

const Landing = () => {


    return (
            <div className = "landing">
                <div className = "header">
                    <Header/>
                </div>
                <div className = "content">
                    hi
                    <RecentLogs />
                </div>
            </div>
    )
}

export default Landing;