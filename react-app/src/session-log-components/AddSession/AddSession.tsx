import sessionPic from "./sessionPic.svg";
import styles from "./AddSession.module.css";
import { Dispatch, SetStateAction } from "react";

type addSessionFunction = {
  setAddSession: any;
};

const AddSession = ({ setAddSession }: addSessionFunction) => {
  return (
    <button className={styles.addSession} onClick={() => setAddSession(true)}>
      <img
        src={sessionPic}
        alt="Add Session Picture"
        className={styles.sessionImage}
      />
      <p> New Session Log </p>
    </button>
  );
};

export default AddSession;
