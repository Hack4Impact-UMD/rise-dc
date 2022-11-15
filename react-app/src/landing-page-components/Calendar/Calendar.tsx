import calPic from "./calPic.svg";
import styles from "./Calendar.module.css";
const Calendar = () => {
  return (
    <button className={styles.calendar}>
      <img src={calPic} alt="Calendar Picture" className={styles.image} />
      <p> Aug 2022 - September 2022</p>
    </button>
  );
};

export default Calendar;
