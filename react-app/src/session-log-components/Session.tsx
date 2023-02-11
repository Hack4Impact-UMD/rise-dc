import { useState, useEffect } from "react";
import AddSession from "./AddSession/AddSession";
import Navbar from "../navbar/Navbar";
import StudentSession from "./StudentSession/StudentSession";
import CollapseButton from "./CollapseButton/CollapseButton";
import styles from "./Session.module.css";
import { getCurrentUser } from "../backend/FirestoreCalls";

const Session = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [addSession, setAddSession] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<String>("");
  
  // get current user
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUserRole(user?.type || "");
    }).catch((e) => console.log(e));
  }, [])

  return (
    <div className={styles.session}>
      <div className={styles.header}>
        <Navbar title="Session Logs" />
      </div>
      <div className={styles.sessionContent}>
        <div className={styles.sessionButtons}>
          <CollapseButton collapse={collapse} setCollapse={setCollapse} />
          {userRole === "MENTOR" || userRole === "TUTOR" ? (
            <AddSession setAddSession={setAddSession} />
          ) : (
            <></>
          )}
        </div>
        {addSession ? (
          <StudentSession
            teacherName=""
            role="Mentor"
            date=""
            startTime=""
            endTime=""
            reason=""
            summary=""
            collapse={false}
            newLog={true}
            removeSession={() => setAddSession(false)}
          />
        ) : (
          <></>
        )}
        <StudentSession
          teacherName="John Smith"
          role="Mentor"
          date="2022-09-30"
          startTime="16:00"
          endTime="18:00"
          reason="Reason 2"
          summary="hello world"
          collapse={collapse}
        />
        <StudentSession
          teacherName="John Smith"
          role="Tutor"
          date="2022-09-30"
          startTime="16:00"
          endTime="18:00"
          reason="Reason 2"
          summary="hello world"
          collapse={collapse}
        />
      </div>
    </div>
  );
};

export default Session;
