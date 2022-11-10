import person from './person.svg'
import notepad from './notepad.svg'
import './Students.css'

const Students = ({props}: any) => {
    const handleClickPlus = () => {
        console.log('+ icon')
    }
    const handleClickSettings = () => {
        console.log('settings icon')
    }

    return (
        <div className = "student-container">
            <h1 className = "student-title"> Students </h1>
            <div className = "student">
                <h1 className = "student-name"> Alice Lee</h1>
                <div className = "icons">
                    <button onClick = {handleClickSettings} className = "button">
                        <img src = {notepad} className = "icon" alt = "Notepad Icon" />
                    </button>
                    <button onClick = {handleClickPlus} className = "button">
                        <img src = {person} className = "icon" alt = "Person Icon" />
                    </button>
                </div>
            </div>
            <div className = "student">
                <h1 className = "student-name"> Bobby Clark </h1>
                <div className = "icons">
                    <button onClick = {handleClickSettings} className = "button">
                        <img src = {notepad} className = "icon" alt = "Notepad Icon" />
                    </button>
                    <button onClick = {handleClickPlus} className = "button">
                        <img src = {person} className = "icon" alt = "Person Icon" />
                    </button>
                </div>
            </div>
            <div className = "student">
                <h1 className = "student-name"> Eve Smith</h1>
                <div className = "icons">
                    <button onClick = {handleClickSettings} className = "button">
                        <img src = {notepad} className = "icon" alt = "Notepad Icon" />
                    </button>
                    <button onClick = {handleClickPlus} className = "button">
                        <img src = {person} className = "icon" alt = "Person Icon" />
                    </button>
                </div>
            </div>
            <a className = "view-more-student" href = {props}>
                View More 
            </a>
        </div>
    )
}

export default Students;