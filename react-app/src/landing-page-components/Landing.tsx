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
  getNumberStudents,
  numberOfLogs,
  countTypeOfUsers,
} from "../backend/FirestoreCalls";
import { RISEUser } from "../types/UserType";
import { Log } from "../types/LogType";
import { Student } from "../types/StudentType";

const Landing = () => {
  const [user, setUser] = useState<RISEUser>();
  const [recentLogs, setRecentLogs] = useState<Log[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [numTutors, setNumTutors] = useState<number>(0);
  const [numMentors, setNumMentors] = useState<number>(0);
  const [numStudents, setNumStudents] = useState<number>(0);
  const [numSessions, setNumSessions] = useState<number>(0);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
        if (user.id) {
          getRecentLogs()
            .then((logs) => {
              setRecentLogs(logs);
            })
            .catch((e) => console.log(e));
        }
        getStudentsAlphabetically()
          .then((students) => {
            setStudents(students);
          })
          .catch((e) => console.log(e));
        countTypeOfUsers()
          .then((numbers) => {
            setNumTutors(numbers.tutors);
            setNumMentors(numbers.mentors);
          })
          .catch((e) => console.log(e));
        getNumberStudents()
          .then((num) => {
            setNumStudents(num);
          })
          .catch((e) => console.log(e));
        numberOfLogs()
          .then((num) => {
            setNumSessions(num);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={styles.landing}>
      <NavBar title=""></NavBar>
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
    </div>
  );
};

export default Landing;

function setFailureMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
