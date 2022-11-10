import sessionPic from "./sessionPic.svg";
import "./AddSession.css";
import { Dispatch, SetStateAction } from "react";

type addSessionFunction = {
  addSession: boolean;
  setAddSession: Dispatch<SetStateAction<boolean>>;
};

const AddSession = ({ addSession, setAddSession }: addSessionFunction) => {
  return (
    <button className="add-session-box" onClick={() => setAddSession(true)}>
      <img
        src={sessionPic}
        alt="Add Session Picture"
        className="add-session-image"
      />
      <p> New Session Log </p>
    </button>
  );
};

export default AddSession;
