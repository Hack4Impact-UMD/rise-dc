import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentWithID } from "../../backend/FirestoreCalls";
import getData from "./getData";
import styles from "./IndividualReport.module.css";
import Sessions from "./Sessions/Sessions";
import Subjects from "./Subjects/Subjects";

export default function IndividualReport() {
  // error processing logs. please make sure there are logs in this time range for this student
  const [error, setError] = useState(false);
  const params = useParams();
  const studentId = params.id;
  const date = params.date;
  useEffect(() => {
    if (!date || !studentId) {
      setError(true);
      return;
    }
    const retrieveData = async () => {
      const studentName = await getStudentWithID(studentId)
        .then((result) => {
          return result.name;
        })
        .catch((e) => setError(true));
      const parsedDates = await getData(date);
      if (parsedDates!.error) {
        setError(true);
        return;
      }
    };
    retrieveData();
  }, []);

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
