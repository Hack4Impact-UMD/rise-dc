import Arrow from "./rightArrow.svg";
import styles from "./RecentLogs.module.css";

const RecentLogs = ({ props }: any) => {
  const handleClick = () => {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Most Recent Logs </h1>
      <button onClick={handleClick} className={styles.logs}>
        <h1 className={styles.logName}>Log 1</h1>
        <img src={Arrow} alt="Arrow" className={styles.arrow} />
      </button>
      <button onClick={handleClick} className={styles.logs}>
        <h1 className={styles.logName}>Log 2</h1>
        <img src={Arrow} alt="Arrow" className={styles.arrow} />
      </button>
      <button onClick={handleClick} className={styles.logs}>
        <h1 className={styles.logName}>Log 3</h1>
        <img src={Arrow} alt="Arrow" className={styles.arrow} />
      </button>
      <a className={styles.viewMore} href={props}>
        View More
      </a>
    </div>
  );
};

export default RecentLogs;
