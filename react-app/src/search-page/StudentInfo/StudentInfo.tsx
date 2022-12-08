import person from "../assets/person.svg";
import notepad from "../assets/notepad.svg";
import styles from "./StudentInfo.module.css";
import notebook from "../assets/notebook.svg";

type studentInformation = {
  name: string;
  id: string | undefined;
};

const StudentInfo = ({ name, id }: studentInformation) => {
  const handleGenerateReport = () => {
    // implemenet this
  };

  const handleClickLogs = () => {
    // implemenet this
  };

  const handleClickProfile = () => {
    // implemenet this
  };

  return (
    <div>
      <div className={styles.student}>
        <h1 className={styles.studentName}> {name} </h1>
        <div className={styles.icons}>
          <button onClick={handleGenerateReport} className={styles.button}>
            <img src={notebook} className={styles.icon} alt="Notebook Icon" />
          </button>
          <button onClick={handleClickLogs} className={styles.button}>
            <img src={notepad} className={styles.icon} alt="Notepad Icon" />
          </button>
          <button onClick={handleClickProfile} className={styles.button}>
            <img src={person} className={styles.icon} alt="Person Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
