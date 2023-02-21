import styles from "./Subjects.module.css";

type SessionProps = {
  mathHours: number;
  readingHours: number;
  scienceHours: number;
  historyHours: number;
};

const Subjects = (props: SessionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainText}>Tutoring Subjects</h2>
      <div className={styles.students}>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Hours Spent on Math</p>
          <p className={styles.rowStat}>{props.mathHours}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Hours Spent on Reading</p>
          <p className={styles.rowStat}>{props.readingHours}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Hours Spent on Science</p>
          <p className={styles.rowStat}>{props.scienceHours}</p>
        </div>
        <div className={`${styles.row} ${styles.lastRow}`}>
          <p className={styles.rowTitle}>Hours Spent on Social Studies</p>
          <p className={styles.rowStat}>{props.historyHours}</p>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
