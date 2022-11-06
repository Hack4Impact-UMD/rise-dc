import calPic from './calPic.svg'
import './Calendar.css'
const Calendar = () => {

    return (
            <button className = "calendar-box">
                <img src = {calPic} alt = "Calendar Picture" className = "calendar-image"/>
                <p> Aug 2022 - September 2022</p>
            </button>
    )
}

export default Calendar;