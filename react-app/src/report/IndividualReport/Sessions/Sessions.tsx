import styles from "./Sessions.module.css";

type SessionProps = {
  total: number;
  highImpact: number;
  highImpactWeeks: number;
  averageLength: number;
};

const Sessions = (props: SessionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainText}>Sessions</h2>
      <div className={styles.students}>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Sessions Attended</p>
          <p className={styles.rowStat}>{props.total}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>High Impact Sessions Attended</p>
          <p className={styles.rowStat}>{props.highImpact}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>High Impact Weeks</p>
          <p className={styles.rowStat}>{props.highImpactWeeks}</p>
        </div>
        <div className={`${styles.row} ${styles.lastRow}`}>
          <p className={styles.rowTitle}>Average Sessions Length (minutes)</p>
          <p className={styles.rowStat}>{props.averageLength}</p>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
