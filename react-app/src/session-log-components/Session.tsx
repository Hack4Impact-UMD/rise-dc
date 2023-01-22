import { useEffect, useState } from "react";
import AddSession from "./AddSession/AddSession";
import Navbar from "../navbar/Navbar";
import StudentSession from "./StudentSession/StudentSession";
import CollapseButton from "./CollapseButton/CollapseButton";
import styles from "./Session.module.css";
import { Log } from "../types/LogType";
import { getStudentLogs, getStudentWithID } from "../backend/FirestoreCalls";
import { useParams } from "react-router";
import Loading from "../loading-screen/Loading";

type SessionState = {
  loading: boolean;
  error: boolean;
  collapse: boolean;
  addSession: boolean;
};

const Session = () => {
  const starting_state: SessionState = {
    loading: true,
    error: false,
    collapse: false,
    addSession: false,
  };
  const [sessionState, setSessionState] =
    useState<SessionState>(starting_state);
  const [name, setName] = useState<string>();
  const [recentLogs, setRecentLogs] = useState<{ id: string; log: Log }[]>([]);
  const student_id = useParams().id;

  useEffect(() => {
    if (student_id == undefined) {
      setSessionState({ ...sessionState, error: true, loading: false });
    } else {
      const fetchData = async () => {
        await getStudentWithID(student_id!)
          .then(async (student) => {
            setName(student.name);
            await getStudentLogs(student_id!)
              .then((result) => {
                const sorted_logs = result.sort((a, b) =>
                  a.log.date < b.log.date ? 1 : -1
                );
                setRecentLogs(sorted_logs);
                setSessionState({
                  ...sessionState,
                  loading: false,
                });
              })
              .catch(() =>
                setSessionState({
                  ...sessionState,
                  error: true,
                  loading: false,
                })
              );
          })
          .catch(() =>
            setSessionState({ ...sessionState, error: true, loading: false })
          );
      };
      fetchData();
    }
  }, []);

  return (
    <div className={styles.session}>
      {sessionState.loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.header}>
            <Navbar
              title={
                sessionState.error ? "Session Logs" : `${name}'s Session Logs`
              }
            />
          </div>
          {sessionState.error ? (
            <div className={styles.error}>
              Error fetching data <br /> <br />
              Please try again later
            </div>
          ) : (
            <div className={styles.sessionContent}>
              <div className={styles.sessionButtons}>
                <CollapseButton
                  collapse={sessionState.collapse}
                  setCollapse={() =>
                    setSessionState({
                      ...sessionState,
                      collapse: !sessionState.collapse,
                    })
                  }
                  logs={recentLogs.length}
                />

                <AddSession
                  setAddSession={() =>
                    setSessionState({
                      ...sessionState,
                      addSession: !sessionState.addSession,
                    })
                  }
                />
              </div>
              {sessionState.addSession ? (
                <StudentSession
                  collapse={false}
                  newLog={true}
                  removeSession={() =>
                    setSessionState({ ...sessionState, addSession: false })
                  }
                />
              ) : (
                <></>
              )}
              {recentLogs.length == 0 && !sessionState.addSession ? (
                <div className={styles.noLogs}>No logs exist for {name}</div>
              ) : (
                <>
                  {recentLogs.map((curr_log) => (
                    <StudentSession
                      id={curr_log.id}
                      log={curr_log.log}
                      collapse={sessionState.collapse}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Session;
