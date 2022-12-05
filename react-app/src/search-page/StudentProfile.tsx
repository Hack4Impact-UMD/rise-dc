import person from './assets/person.svg'
import notepad from './assets/notepad.svg'
import styles from "./Students.module.css"

const Students = ({props}: any) => {
    const handleClickPlus = () => {
        console.log('+ icon')
    }
    const handleClickSettings = () => {
        console.log('settings icon')
    }

    return (
        <div>
            <div className={styles.student}>
                <h1 className={styles.studentName}> Alice Lee</h1>
                <div className ={styles.icons}>
                    <button onClick = {handleClickSettings} className={styles.button}>
                        <img src = {notepad} className ={styles.icon} alt = "Notepad Icon" />
                    </button>
                    <button onClick = {handleClickPlus} className ={styles.button}>
                        <img src = {person} className ={styles.icon} alt = "Person Icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Students;