import { Week } from "../types";
import styles from "./Weeks.module.css";

const Weeks = ({ startDate, highImpact, logs }: Week) => {
  const sorted_logs = logs.sort((a, b) => (a.date > b.date ? 1 : -1));
  return (
    <div className={styles.container}>
      <div className={styles.topLine}>
        <h2 className={styles.mainText}>
          {"Week of " +
            startDate.split("-")[1] +
            "/" +
            startDate.split("-")[2] +
            "/" +
            startDate.split("-")[0]}
        </h2>
        {highImpact ? (
          <div className={styles.highImpact}>High-Impact Week</div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.students}>
        <div className={`${styles.row} ${styles.titles}`}>
          <p className={`${styles.date} ${styles.allSubfields}`}>Date</p>
          <p className={`${styles.highImp} ${styles.allSubfields}`}>
            High-Impact
          </p>
          <p className={`${styles.duration} ${styles.allSubfields}`}>
            Duration
          </p>
          <p className={`${styles.reason} ${styles.allSubfields}`}>Reason</p>
          <p className={`${styles.instructor} ${styles.allSubfields}`}>
            Tutor/Mentor
          </p>
        </div>
      </div>
      {sorted_logs.map((log) => {
        return (
          <div className={styles.students}>
            <div className={styles.row}>
              <p className={`${styles.date} ${styles.allSubfields}`}>
                {log.date.split("-")[1] + "/" + log.date.split("-")[2]}
              </p>
              <p className={`${styles.highImp} ${styles.allSubfields}`}>
                {log.duration_minutes >= 30 ? (
                  <div className={styles.coloredCircle}></div>
                ) : (
                  <div
                    className={`${styles.coloredCircle} ${styles.noColor}`}
                  ></div>
                )}
              </p>
              <p className={`${styles.duration} ${styles.allSubfields}`}>
                {log.duration_minutes} mins
              </p>
              <p className={`${styles.reason} ${styles.allSubfields}`}>
                {log.reason}
              </p>
              <p className={`${styles.instructor} ${styles.allSubfields}`}>
                {log.instructor_name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Weeks;
