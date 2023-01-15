import person from "./person.svg";
import notepad from "./notepad.svg";
import styles from "./Students.module.css";
import {Student} from "../../types/StudentType"
import { useNavigate } from "react-router-dom";

interface Props {
  students: Student[]
}

const Students = ({students}: Props) => {
  const navigate = useNavigate();
  const handleClickProfile = (student: Student) => {
    navigate(`/profile/${student.id}`)
  };
  const handleClickLog = () => {
    navigate("/log")
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Students </h1>
      <>
      {students.map(student => (
        <div className={styles.student} key={student.name}>
        <h1 className={styles.studentName}>{student.name}</h1>
        <div className={styles.icons}>
          <button onClick={handleClickLog} className={styles.button}>
            <img src={notepad} className={styles.icon} alt="Notepad Icon" />
          </button>
          <button onClick={() => {handleClickProfile(student)}} className={styles.button}>
            <img src={person} className={styles.icon} alt="Person Icon" />
          </button>
        </div>
      </div>
      ))}
      <a className={styles.viewMore} href="/search">
        View More
      </a>
      </>
    </div>
  );
};

export default Students;
