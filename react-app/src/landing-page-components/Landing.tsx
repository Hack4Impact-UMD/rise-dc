import {useState} from 'react'
import {getAuth} from 'firebase/auth'
import Header from './Header/Header';
import RecentLogs from './RecentLogs/RecentLogs';
import Statistics from './Statistics/Statistics';
import Hours from './Hours/Hours';
import './Landing.css'
import GoogleCalendar from './GoogleCalendar/GoogleCalendar';
import Students from './Students/Students';

const Landing = () => {


    return (
            <div className = "landing">
                <Header />
                <div className = "content">
                  <div className='statistics'>
                    <Statistics title="Sessions Conducted" value={50} />
                    <Statistics title="Students Participating" value={50} />
                    <Statistics title="Mentors Participating" value={50} />
                    <Statistics title="Tutors Participating" value={50} />
                  </div>
                  <Hours/>
                  <div className = "logs-row">
                    <RecentLogs/>
                    <GoogleCalendar />
                  </div>
                  <Students />
                </div>
            </div>
    )
}

export default Landing;