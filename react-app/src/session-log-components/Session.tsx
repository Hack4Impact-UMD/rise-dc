import { useState, useEffect } from "react";
import AddSession from "./AddSession/AddSession";
import Navbar from "../navbar/Navbar";
import StudentSession from "./StudentSession/StudentSession";
import CollapseButton from "./CollapseButton/CollapseButton";
import styles from "./Session.module.css";
import { getCurrentUser } from "../backend/FirestoreCalls";
import { RISEUser } from "../types/UserType";

const Session = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [addSession, setAddSession] = useState<boolean>(false);
  const [user, setUser] = useState<RISEUser>();
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      setName(user.name);
      if(user.type == "TUTOR") {
        setRole("Tutor");
      }
    }).catch((e) => console.log(e));
  }, [])

  // returns the current user's name
  const [name, setName] = useState<string>("");
  // returns the current user's role
  const [role, setRole] = useState<string>("Mentor");

  return (
    <div className={styles.session}>
      <div className={styles.header}>
        <Navbar title="Session Logs" />
      </div>
      <div className={styles.sessionContent}>
        <div className={styles.sessionButtons}>
          <CollapseButton collapse={collapse} setCollapse={setCollapse} />
          <AddSession setAddSession={setAddSession} />
        </div>
        {addSession ? (
          <StudentSession
            teacherName={name}
            role={role}
            date=""
            startTime=""
            endTime=""
            reason=""
            summary=""
            creatorId={user?.id || ""}
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
          creatorId="123"
          
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
          creatorId="123"
          collapse={collapse}
        />
      </div>
    </div>
  );
};

export default Session;
