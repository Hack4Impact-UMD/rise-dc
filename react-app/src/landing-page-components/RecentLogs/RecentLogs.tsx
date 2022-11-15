import Arrow from "./icons/rightArrow.svg";
import TutorIcon from "./icons/Tutor.svg";
import MentorIcon from "./icons/Mentor.svg";
import styles from "./RecentLogs.module.css";

const RecentLogs = ({ props }: any) => {
  const handleClick = () => {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Most Recent Logs </h1>
      <button onClick={handleClick} className={styles.logs}>
        <div className={styles.name}>
          <img src={TutorIcon} alt="TutorIcon" className={styles.icon} />
          <h1 className={styles.logName}>Tutor Name</h1>
        </div>
        <img src={Arrow} alt="Arrow" className={styles.arrow} />
      </button>
      <button onClick={handleClick} className={styles.logs}>
        <div className={styles.name}>
          <img src={MentorIcon} alt="MentorIcon" className={styles.icon} />
          <h1 className={styles.logName}>Mentor Name</h1>
        </div>
        <img src={Arrow} alt="Arrow" className={styles.arrow} />
      </button>
      <button onClick={handleClick} className={styles.logs}>
        <div className={styles.name}>
          <img src={TutorIcon} alt="TutorIcon" className={styles.icon} />
          <h1 className={styles.logName}>Tutor Name</h1>
        </div>
        <img src={Arrow} alt="Arrow" className={styles.arrow} />
      </button>
      <a className={styles.viewMore} href={props}>
        View More
      </a>
    </div>
  );
};

export default RecentLogs;
