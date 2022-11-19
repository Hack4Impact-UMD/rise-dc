import { useState } from "react";
import { getAuth } from "firebase/auth";
import Header from "./Header/Header";
import RecentLogs from "./RecentLogs/RecentLogs";
import Statistics from "./Statistics/Statistics";
import Hours from "./Hours/Hours";
import Students from "./Students/Students";
import Calendar from "./Calendar/Calendar";
import NavBar from "../navbar/Navbar";
import styles from "./Landing.module.css";
import { getCurrentUser } from "../backend/FirestoreCalls";
import { RISEUser } from "../types/UserType";



const Landing = () => {
  let user: RISEUser = {} as RISEUser;
  const getUser = async () => {
    user = await getCurrentUser();
  };
  getUser();

  return (
    <div className={styles.landing}>
      <NavBar title=""></NavBar>
      <Header name={user.name} role={user.type}/>
      <div className={styles.content}>
        <div className={styles.calendar}>
          {" "}
          <Calendar />{" "}
        </div>
        <div className={styles.statistics}>
          <Statistics title="Sessions Conducted" value={50} />
          <Statistics title="Students Participating" value={50} />
          <Statistics title="Mentors Participating" value={50} />
          <Statistics title="Tutors Participating" value={50} />
        </div>
        <Hours />
        <div className={styles.logsRow}>
          <RecentLogs />
        </div>
        <Students />
      </div>
    </div>
  );
};

export default Landing;

function setFailureMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
