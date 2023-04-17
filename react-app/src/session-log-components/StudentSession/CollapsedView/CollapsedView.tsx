import rightArrow from "../../../assets/rightArrow.svg";
import styles from "../StudentSession.module.css";
import customStyles from "./CollapsedView.module.css";
import { formatDate } from "../helperFunctions";

type CollapsedInfo = {
  date: string;
  instructor_name: string;
  changeCollapse: any;
};
const CollapsedView = ({
  date,
  instructor_name,
  changeCollapse,
}: CollapsedInfo) => {
  return (
    <div className={`${styles.studentSession} ${styles.collapsedSession}`}>
      <div className={styles.topLine}>
        <div className={customStyles.collapsedInfo}>
          <h2 className={styles.studentName}>{instructor_name}</h2>
          <h6 className={customStyles.date}>{formatDate(date)}</h6>
        </div>
        <div>
          <button
            className={styles.collapseButton}
            onClick={() => changeCollapse()}
          >
            <img
              src={rightArrow}
              alt="Expand Session"
              className={styles.collapseImage}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollapsedView;
