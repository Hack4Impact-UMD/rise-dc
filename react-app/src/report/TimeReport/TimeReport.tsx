//given in yyyymmddyyyymmdd format
import ImpactTutoring from "./ImpactTutoring/ImpactTutoring";
import LineGraph from "./LineGraph/LineGraph";
import Mentors from "./Mentors/Mentors";
import Sessions from "./Sessions/Sessions";
import Subjects from "./Subjects/Subjects";
import styles from "./TimeReport.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLogsTimeframe, storeLog } from "../../backend/FirestoreCalls";
import { Log, Subject } from "../../types/LogType";

type dates = {
  startDate: Date;
  endDate: Date;
};

export default function TimeReport() {
  const [error, setError] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<dates>();
  const [logs, setLogs] = useState<Array<Log>>();
  const urlDate = useParams().id;

  const getDates = (givenDates: string) => {
    const startDate = givenDates?.substring(0, 8);
    const endDate = givenDates?.substring(8);
    if (startDate == undefined || endDate == undefined || endDate.length != 8) {
      setError(true);
      return { startDate: undefined, endDate: undefined };
    } else {
      const modifiedStart =
        startDate?.substring(0, 4) +
        "-" +
        startDate?.substring(4, 6) +
        "-" +
        startDate?.substring(6);

      const modifiedEnd =
        endDate?.substring(0, 4) +
        "-" +
        endDate?.substring(4, 6) +
        "-" +
        endDate?.substring(6);

      setDateRange({
        startDate: new Date(modifiedStart),
        endDate: new Date(modifiedEnd),
      });
      return {
        startDate: new Date(modifiedStart),
        endDate: new Date(modifiedEnd),
      };
    }
  };

  useEffect(() => {
    if (!urlDate) {
      setError(true);
      return;
    }
    const { startDate, endDate } = getDates(urlDate!);
    if (!startDate || !endDate) {
      return;
    } else {
      const getLogs = async () => {
        await getLogsTimeframe(startDate, endDate)
          .then((result) => setLogs(result))
          .catch((error) => setError(true));
      };
      getLogs();
    }
  }, []);

  console.log(logs);

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
          {/* <ImpactTutoring
            highImpact={highImpactStudents}
            lowImpact={lowImpactStudents}
          /> */}
        </div>
      </div>
    </div>
  );
}
