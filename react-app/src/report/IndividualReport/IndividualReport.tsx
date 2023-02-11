import styles from "./IndividualReport.module.css";
import Sessions from "./Sessions/Sessions";
import Subjects from "./Subjects/Subjects";

export default function IndividualReport() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <div className={styles.body}>
        <div className={styles.stylingBox}>
          <div className={styles.timeRange}>
            September 1, 2022 &nbsp;- &nbsp;Dec 2, 2022
          </div>
          <Sessions
            total={10}
            highImpact={4}
            highImpactWeeks={2}
            averageLength={20}
          />
          <Subjects
            mathHours={10}
            readingHours={3}
            scienceHours={4}
            historyHours={2}
          />
        </div>
      </div>
    </div>
  );
}
