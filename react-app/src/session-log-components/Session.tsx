import { useEffect, useState } from "react";
import AddSession from "./AddSession/AddSession";
import Navbar from "../navbar/Navbar";
import StudentSession from "./StudentSession/StudentSession";
import CollapseButton from "./CollapseButton/CollapseButton";
import styles from "./Session.module.css";
import { Log } from "../types/LogType";
import { getAllLogs, getCurrentUser, getRecentLogs } from "../backend/FirestoreCalls";
import { RISEUser } from "../types/UserType";

const Session = () => {
  const [user, setUser] = useState<RISEUser>();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [addSession, setAddSession] = useState<boolean>(false);
  const [recentLogs, setRecentLogs] = useState<Log[]>([]);
  
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      if (user.id) {
        getAllLogs().then((logs) => {
          setRecentLogs(logs)
        }).catch((e) => console.log(e))
      }
    }).catch((e) => console.log(e));
  }, [])

  console.log(recentLogs);

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
        <>
          {
          recentLogs.map(value => (
              <StudentSession
                teacherName={value.instructor_name}
                role="Mentor"
                date="2022-09-30"
                startTime="16:00"
                endTime="18:00"
                reason="Reason 2"
                summary="hello world"
                collapse={collapse}
              />
          ))
          }
        </>
      </div>
    </div>
  );
};

export default Session;
