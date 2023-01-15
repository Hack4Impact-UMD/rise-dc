import ImpactTutoring from "./ImpactTutoring/ImpactTutoring";
import LineGraph from "./LineGraph/LineGraph";
import Mentors from "./Mentors/Mentors";
import Sessions from "./Sessions/Sessions";
import Subjects from "./Subjects/Subjects";
import styles from "./TimeReport.module.css";

export default function TimeReport() {
  const highImpactStudents = [
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
    "Bob",
    "James",
    "Elizabeth",
  ];
  const lowImpactStudents = [
    "No",
    "One",
    "Exists",
    "Here",
    "No",
    "One",
    "Exists",
    "Here",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <div className={styles.body}>
        <div className={styles.stylingBox}>
          <div className={styles.timeRange}>September 1 - Dec 2</div>
          <LineGraph />
          <div className={styles.lineGraph}></div>
          <div className={styles.sessionAndMentors}>
            <Sessions
              total={10}
              highImpact={30}
              averageLength={80}
              averageNumber={4}
            />
            <Mentors
              totalMentors={10}
              totalTutors={20}
              mentorHours={80}
              tutorHours={4}
            />
          </div>
          <Subjects
            mathHours={5}
            readingHours={2}
            scienceHours={3}
            historyHours={4}
          />
          <ImpactTutoring
            highImpact={highImpactStudents}
            lowImpact={lowImpactStudents}
          />
        </div>
      </div>
    </div>
  );
}
