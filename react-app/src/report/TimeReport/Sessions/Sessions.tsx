import styles from "./Sessions.module.css";

type SessionProps = {
  total: number;
  highImpact: number;
  averageLength: number;
  averageNumber: number;
};

const Sessions = (props: SessionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainText}>Sessions</h2>
      <div className={styles.students}>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Sessions Conducted</p>
          <p className={styles.rowStat}>{props.total}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>High Impact Sessions Conducted</p>
          <p className={styles.rowStat}>{props.highImpact}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Average Session Length (minutes)</p>
          <p className={styles.rowStat}>{props.averageLength}</p>
        </div>
        <div className={`${styles.row} ${styles.lastRow}`}>
          <p className={styles.rowTitle}>Average Sessions per Student</p>
          <p className={styles.rowStat}>{props.averageNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
