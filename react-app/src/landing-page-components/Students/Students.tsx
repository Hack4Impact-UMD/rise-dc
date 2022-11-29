import person from "./person.svg";
import notepad from "./notepad.svg";
import styles from "./Students.module.css";
import {Role} from "../../types/UserType"

type Props = {
  userType: Role | undefined
}

const Students = (props: Props) => {
  const handleClickPlus = () => {
    console.log("+ icon");
  };
  const handleClickSettings = () => {
    console.log("settings icon");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Students </h1>
      <div className={styles.student}>
        <h1 className={styles.studentName}> Alice Lee</h1>
        <div className={styles.icons}>
          <button onClick={handleClickSettings} className={styles.button}>
            <img src={notepad} className={styles.icon} alt="Notepad Icon" />
          </button>
          <button onClick={handleClickPlus} className={styles.button}>
            <img src={person} className={styles.icon} alt="Person Icon" />
          </button>
        </div>
      </div>
      <div className={styles.student}>
        <h1 className={styles.studentName}> Bobby Clark </h1>
        <div className={styles.icons}>
          <button onClick={handleClickSettings} className={styles.button}>
            <img src={notepad} className={styles.icon} alt="Notepad Icon" />
          </button>
          <button onClick={handleClickPlus} className={styles.button}>
            <img src={person} className={styles.icon} alt="Person Icon" />
          </button>
        </div>
      </div>
      <div className={styles.student}>
        <h1 className={styles.studentName}> Eve Smith</h1>
        <div className={styles.icons}>
          <button onClick={handleClickSettings} className={styles.button}>
            <img src={notepad} className={styles.icon} alt="Notepad Icon" />
          </button>
          <button onClick={handleClickPlus} className={styles.button}>
            <img src={person} className={styles.icon} alt="Person Icon" />
          </button>
        </div>
      </div>
      <a className={styles.viewMore} href={"/students"}>
        View More
      </a>
    </div>
  );
};

export default Students;
