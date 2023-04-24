import Arrow from "../../../assets/rightArrow.svg";
import TutorIcon from "../../../assets/Tutor.svg";
import MentorIcon from "../../../assets/Mentor.svg";
import styles from "./RecentLogs.module.css";
import { Log } from "../../../types/LogType";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthProvider";

interface Props {
  logs: Log[];
}

const RecentLogs = ({ logs }: Props) => {
  const navigate = useNavigate();
  const handleClick = (log: Log) => {
    navigate("/log");
  };
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <p className={styles.title}> Most Recent Logs </p>
      {logs.length == 0 ? (
        <div className={styles.noLogs}>
          {auth?.token?.claims.role == "ADMIN"
            ? "No Logs Exist For This Timeframe"
            : "You Did Not Create Any Logs During This Timeframe."}
        </div>
      ) : (
        logs.map((log) => {
          return (
            <button
              onClick={() => {
                handleClick(log);
              }}
              className={styles.logs}
            >
              <div className={styles.name}>
                <img
                  src={log.type == "MENTOR" ? MentorIcon : TutorIcon}
                  alt={log.type == "MENTOR" ? "MentorIcon" : "TutorIcon"}
                  className={styles.icon}
                />
                <p className={styles.logName}>{log.instructor_name}</p>
              </div>
              <img src={Arrow} alt="Arrow" className={styles.arrow} />
            </button>
          );
        })
      )}
    </div>
  );
};

export default RecentLogs;
