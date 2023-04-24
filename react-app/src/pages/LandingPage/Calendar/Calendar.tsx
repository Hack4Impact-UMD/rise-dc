import { useState } from "react";
import calPic from "../../../assets/calPic.svg";
import styles from "./Calendar.module.css";
import TimeRange from "./TimeRangeModal/TimeRange";
const Calendar = (props: { dates?: string; onDateChange: any }) => {
  const dates = props.dates;
  const [timeModal, setTimeModal] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <button className={styles.calendar} onClick={() => setTimeModal(true)}>
        <img src={calPic} alt="Calendar Picture" className={styles.image} />
        <p> {dates}</p>
      </button>
      <TimeRange
        open={timeModal}
        onClose={() => setTimeModal(false)}
        onChange={(newDates: any) => props.onDateChange(newDates)}
      />
    </div>
  );
};

export default Calendar;
