//given in yyyymmddyyyymmdd format
import ImpactTutoring from "./ImpactTutoring/ImpactTutoring";
import Mentors from "./Mentors/Mentors";
import Sessions from "./Sessions/Sessions";
import Subjects from "./Subjects/Subjects";
import styles from "./TimeReport.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getData from "./getData";
import { SessionInformation } from "./types";
import NavBar from "../../navbar/Navbar";

export default function TimeReport() {
  const [error, setError] = useState<boolean>(false);
  const [sessionInfo, setSessionInfo] = useState<SessionInformation>();
  const [sessionMinutes, setSessionMinutes] = useState<number>(0);
  const [date, setDate] = useState<String>("");

  const urlDate = useParams().id;

  const makeDateString = (dateRange: any) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatter = new Intl.DateTimeFormat("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timeZone,
    });
    const startFormatted = formatter.formatToParts(dateRange?.startDate);
    const endFormatted = formatter.formatToParts(dateRange?.endDate);

    function ending(day: number) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
    return (
      startFormatted[0].value +
      " " +
      startFormatted[2].value +
      ending(parseInt(startFormatted[2].value)) +
      ", " +
      startFormatted[4].value +
      " - " +
      endFormatted[0].value +
      " " +
      endFormatted[2].value +
      ending(parseInt(endFormatted[2].value)) +
      ", " +
      endFormatted[4].value
    );
  };

  useEffect(() => {
    if (!urlDate) {
      setError(true);
      return;
    }
    const retrieveData = async () => {
      const result = await getData(urlDate!);
      console.log(result);
      if (result!.error) {
        setError(true);
        return;
      }
      setSessionInfo(result?.information);
      setSessionMinutes(
        result?.information.english_minutes! +
          result?.information.math_minutes! +
          result?.information.humanities_minutes! +
          result?.information.science_minutes! +
          result?.information.social_studies_minutes!
      );
      const dateRange = result?.information.dateRange;
      setDate(makeDateString(dateRange));
    };
    retrieveData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavBar title="Report" />
      </div>
      {error ? (
        <div className={styles.error}>
          Error fetching data <br /> <br />
          Please try again later
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.stylingBox}>
            <div className={styles.timeRange}>{date}</div>
            <div className={styles.lineGraph}></div>
            <div className={styles.sessionAndMentors}>
              <Sessions
                total={sessionInfo?.total_sessions!}
                highImpact={sessionInfo?.high_impact!}
                averageLength={Math.round(
                  sessionMinutes / sessionInfo?.total_sessions!
                )}
                averageNumber={Math.round(
                  sessionInfo?.total_sessions! / sessionInfo?.students.size!
                )}
              />
              <Mentors
                totalMentors={sessionInfo?.mentor.names.length!}
                totalTutors={sessionInfo?.tutor.names.length!}
                mentorHours={Math.round(sessionInfo?.mentor.time! / 6) / 10}
                tutorHours={Math.round(sessionInfo?.tutor.time! / 6) / 10}
              />
            </div>
            <Subjects
              students={sessionInfo?.students.size!}
              mathHours={Math.round(sessionInfo?.math_minutes! / 6) / 10}
              englishHours={Math.round(sessionInfo?.english_minutes! / 6) / 10}
              scienceHours={Math.round(sessionInfo?.science_minutes! / 6) / 10}
              historyHours={
                Math.round(sessionInfo?.social_studies_minutes! / 6) / 10
              }
              humanitiesHours={
                Math.round(sessionInfo?.humanities_minutes! / 6) / 10
              }
            />
            {/* <ImpactTutoring
            highImpact={highImpactStudents}
            lowImpact={lowImpactStudents}
          /> */}
          </div>
        </div>
      )}
    </div>
  );
}
