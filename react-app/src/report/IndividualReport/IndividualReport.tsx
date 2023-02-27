import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentWithID } from "../../backend/FirestoreCalls";
import Loading from "../../loading-screen/Loading";
import NavBar from "../../navbar/Navbar";
import getData from "./getData";
import styles from "./IndividualReport.module.css";

export default function IndividualReport() {
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
      {loading ? (
        <Loading />
      ) : (
        <>
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
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
