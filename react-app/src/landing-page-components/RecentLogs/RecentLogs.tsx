import Arrow from "./icons/rightArrow.svg";
import TutorIcon from "./icons/Tutor.svg";
import MentorIcon from "./icons/Mentor.svg";
import styles from "./RecentLogs.module.css";
import {Log} from "../../types/LogType";
import { logsToWeeks } from "../../backend/FirestoreCalls";
import { useNavigate } from "react-router-dom"

interface Props {
  logs: Log[]
}

const RecentLogs = ({logs}: Props) => {
  const navigate = useNavigate();
  const handleClick = (log: Log) => {
    navigate("/log")
  };

  return (
    <div className={styles.container}>
      <>
      <h1 className={styles.title}> Most Recent Logs </h1>
      {logs.map(log => (
        <button onClick={() => {handleClick(log)}} className={styles.logs}>
          <div className={styles.name}>
            <img src={log.type == "MENTOR" ? MentorIcon : TutorIcon} alt={log.type == "MENTOR" ? "MentorIcon" : "TutorIcon"} className={styles.icon} />
            <h1 className={styles.logName}>{log.instructor_name}</h1>
          </div>
          <img src={Arrow} alt="Arrow" className={styles.arrow} />
        </button>
      ))}
      </>
    </div>
  );
};

export default RecentLogs;
