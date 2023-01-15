import styles from "./Mentors.module.css";

type MentorProps = {
  totalMentors: number;
  totalTutors: number;
  mentorHours: number;
  tutorHours: number;
};

const Mentors = (props: MentorProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainText}>Mentors and Tutors</h2>
      <div className={styles.students}>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Mentors Participating</p>
          <p className={styles.rowStat}>{props.totalMentors}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Tutors Participating</p>
          <p className={styles.rowStat}>{props.totalTutors}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.rowTitle}>Hours Mentoring</p>
          <p className={styles.rowStat}>{props.mentorHours}</p>
        </div>
        <div className={`${styles.row} ${styles.lastRow}`}>
          <p className={styles.rowTitle}>Hours Tutoring</p>
          <p className={styles.rowStat}>{props.tutorHours}</p>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
