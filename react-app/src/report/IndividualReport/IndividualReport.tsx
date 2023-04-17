import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentWithID } from "../../backend/FirestoreCalls";
import Loading from "../../components/LoadingScreen/Loading";
import NavBar from "../../navbar/Navbar";
import getData, { formatDate } from "./getData";
import styles from "./IndividualReport.module.css";
import { IndividualSessionInformation } from "./types";
import Sessions from "./Sessions/Sessions";
import Subjects from "./Subjects/Subjects";
import Weeks from "./Week/Weeks";

export default function IndividualReport() {
  const [data, setData] = useState<IndividualSessionInformation>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const studentId = params.id;
  const date = params.date;
  useEffect(() => {
    if (!date || !studentId) {
      setError(true);
      return;
    }
    const retrieveData = async () => {
      const student = await getStudentWithID(studentId)
        .then(async (result) => {
          const data = await getData(result, date);
          if (data!.error) {
            setError(true);
            setLoading(false);
            return;
          }
          setData(data.information);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
        });
    };
    retrieveData();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.navbar}>
            <NavBar title="Report" />
          </div>
          {error ? (
            <div className={styles.error}>
              Error fetching data
              <br />
              Please try again later
            </div>
          ) : (
            <div className={styles.body}>
              <div className={styles.stylingBox}>
                <div className={styles.timeRange}>
                  {formatDate(data?.dateRange.startDate!) +
                    " - " +
                    formatDate(data?.dateRange.endDate!)}
                </div>
                <Sessions
                  total={data?.total_sessions!}
                  highImpact={data?.high_impact!}
                  highImpactWeeks={data?.high_impact_weeks!}
                  averageLength={Math.round(
                    data?.total_minutes! / data?.total_sessions!
                  )}
                />
                <Subjects
                  mathHours={Math.round(data?.math_minutes! / 6) / 10}
                  englishHours={Math.round(data?.english_minutes! / 6) / 10}
                  scienceHours={Math.round(data?.science_minutes! / 6) / 10}
                  historyHours={
                    Math.round(data?.social_studies_minutes! / 6) / 10
                  }
                  humanitiesHours={
                    Math.round(data?.humanities_minutes! / 6) / 10
                  }
                />
                {data?.weeks.map((week) => {
                  return <Weeks {...week} />;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
