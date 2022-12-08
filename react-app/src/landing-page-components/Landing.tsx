import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Header from "./Header/Header";
import RecentLogs from "./RecentLogs/RecentLogs";
import Statistics from "./Statistics/Statistics";
import Hours from "./Hours/Hours";
import Students from "./Students/Students";
import Calendar from "./Calendar/Calendar";
import NavBar from "../navbar/Navbar";
import styles from "./Landing.module.css";
import {
  getCurrentUser,
  getRecentLogsByCreator,
  getRecentLogs,
  getStudentsAlphabetically,
  countTutors,
  countMentors,
  getNumberStudents,
  numberOfLogs,
} from "../backend/FirestoreCalls";
import { RISEUser } from "../types/UserType";
import { Log } from "../types/LogType";
import { Student } from "../types/StudentType";

const Landing = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<String>("");
  const [user, setUser] = useState<RISEUser>();
  const [recentLogs, setRecentLogs] = useState<Log[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [numTutors, setNumTutors] = useState<number>(0);
  const [numMentors, setNumMentors] = useState<number>(0);
  const [numStudents, setNumStudents] = useState<number>(0);
  const [numSessions, setNumSessions] = useState<number>(0);

  useEffect(() => {
    const getBackendInfo = async () => {
      await getCurrentUser()
        .then(async (user) => {
          setUser(user);
          if (user.id) {
            await getRecentLogs()
              .then((logs) => {
                setRecentLogs(logs);
              })
              .catch((e) => {
                setError(e);
                console.log(e);
              });
          }
          await getStudentsAlphabetically()
            .then((students) => {
              setStudents(students);
            })
            .catch((e) => setError(e));
          await countTutors()
            .then((num) => {
              setNumTutors(num);
            })
            .catch((e) => setError(e));
          await countMentors()
            .then((num) => {
              setNumMentors(num);
            })
            .catch((e) => setError(e));
          await getNumberStudents()
            .then((num) => {
              setNumStudents(num);
            })
            .catch((e) => setError(e));
          await numberOfLogs()
            .then((num) => {
              setNumSessions(num);
            })
            .catch((e) => setError(e));
        })
        .catch((e) => setError(e));
      setLoading(false);
    };
    getBackendInfo();
  }, []);

  return (
    <div className={styles.landing}>
      <NavBar title=""></NavBar>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : error != "" ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <Header name={user?.name || ""} role={user?.type || ""} />
          <div className={styles.content}>
            <div className={styles.calendar}>
              {" "}
              <Calendar />{" "}
            </div>
            <div className={styles.statistics}>
              <Statistics title="Sessions Conducted" value={numSessions} />
              <Statistics title="Students Participating" value={numStudents} />
              <Statistics title="Mentors Participating" value={numMentors} />
              <Statistics title="Tutors Participating" value={numTutors} />
            </div>
            <div className={styles.logsRow}>
              <RecentLogs logs={recentLogs} />
            </div>
            <Students students={students} />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;

function setFailureMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
