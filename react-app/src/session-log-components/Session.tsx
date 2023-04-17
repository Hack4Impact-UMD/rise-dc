import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getStudentLogs, getStudentWithID } from "../backend/FirestoreCalls";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../components/LoadingScreen/Loading";
import AddSession from "./AddSession/AddSession";
import Navbar from "../navbar/Navbar";
import StudentSession from "./StudentSession/StudentSession";
import CollapseButton from "./CollapseButton/CollapseButton";
import styles from "./Session.module.css";
import { LogID } from "../types/LogType";

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
    collapse: true,
    addSession: false,
  };
  const [sessionState, setSessionState] =
    useState<SessionState>(starting_state);
  const [name, setName] = useState<string>();
  const [recentLogs, setRecentLogs] = useState<LogID[]>([]);
  const student_id = useParams().id;
  const auth = useAuth();

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
                {!auth.loading && auth.token.claims.role !== "admin" ? (
                  <AddSession
                    setAddSession={() =>
                      setSessionState({
                        ...sessionState,
                        addSession: !sessionState.addSession,
                      })
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
              {sessionState.addSession ? (
                <StudentSession
                  collapse={false}
                  newLog={true}
                  removeSession={() =>
                    setSessionState({ ...sessionState, addSession: false })
                  }
                  studentId={student_id!}
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
                      logID={curr_log}
                      collapse={sessionState.collapse}
                      studentId={student_id!}
                      user={auth.user}
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
