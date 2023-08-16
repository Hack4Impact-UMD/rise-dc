import person from "../../../assets/person.svg";
import notepad from "../../../assets/notepad.svg";
import styles from "./UserInfo.module.css";
import notebook from "../../../assets/notebook.svg";
import { useNavigate } from "react-router-dom";
import { StudentID } from "../../../types/StudentType";

type UserProps = {
  name: string;
  id: string;
  mode: "STUDENTS" | "TEACHERS";
  type?: "ADMIN" | "MENTOR" | "TUTOR";
};

const UserInfo = ({ name, id, mode, type }: UserProps) => {
  const navigate = useNavigate();
  const handleGenerateReport = (id?: string) => {
    let newDate = new Date();
    navigate(`/indivreport/${id}/${newDate}`);
  };
  const handleClickProfile = (id?: string) => {
    navigate(`/profile/${id}`);
  };
  const handleClickLog = (id?: String) => {
    navigate(`/log/${id}`);
  };

  return (
    <div>
      <div className={styles.student}>
        <h1 className={styles.studentName}>
          {" "}
          {name}{" "}
          {mode == "TEACHERS" ? (
            <h4 className={styles.teacherRole}> {type} </h4>
          ) : (
            <></>
          )}
        </h1>

        <div className={styles.icons}>
          {mode == "STUDENTS" ? (
            <>
              {" "}
              <button
                onClick={() => {
                  handleGenerateReport(id);
                }}
                className={styles.button}
              >
                <img
                  src={notebook}
                  className={styles.icon}
                  alt="Notebook Icon"
                />
              </button>
              <button
                onClick={() => {
                  handleClickLog(id);
                }}
                className={styles.button}
              >
                <img src={notepad} className={styles.icon} alt="Notepad Icon" />
              </button>
            </>
          ) : (
            <></>
          )}

          <button
            onClick={() => {
              handleClickProfile(id);
            }}
            className={styles.button}
          >
            <img src={person} className={styles.icon} alt="Person Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
