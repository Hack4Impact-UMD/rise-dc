/* hi*/
import dayjs from "dayjs";
import downArrow from "./downArrow.svg";
import rightArrow from "./rightArrow.svg";
import { useState, useEffect } from "react";
import SaveModal from "../Modals/SaveModal/SaveModal";
import CancelModal from "../Modals/CancelModal/CancelModal";
import styles from "./StudentSession.module.css";

type studentSessionProp = {
  teacherName: string;
  role: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string;
  reason: string;
  summary: string;
  collapse: boolean;
  newLog?: boolean;
  removeSession?: any;
};

const StudentSession = ({
  teacherName,
  role,
  date,
  startTime,
  endTime,
  reason,
  summary,
  collapse,
  newLog,
  removeSession,
}: studentSessionProp) => {
  const [edit, setEdit] = useState<boolean>(newLog ? true : false);
  const [collapsed, setCollapsed] = useState<boolean>(collapse);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  useEffect(() => {
    setCollapsed(collapse);
  }, [collapse]);

  const findDuration = (startingTime: string, endingTime: string): string => {
    const startTimeHour: number = parseInt(startingTime.split(":")[0]);
    let endTimeHour: number = parseInt(endingTime.split(":")[0]);
    if (startTimeHour > endTimeHour) {
      endTimeHour += 24;
    }
    const hoursTaken = endTimeHour - startTimeHour;
    let hoursString = "";
    if (hoursTaken === 1) {
      hoursString = `${hoursTaken} hour `;
    } else if (hoursTaken > 1) {
      hoursString = `${hoursTaken} hours `;
    }

    const startTimeMinutes: number = parseInt(startingTime.split(":")[1]);
    let endTimeMinutes: number = parseInt(endingTime.split(":")[1]);
    if (startTimeMinutes > endTimeMinutes) {
      endTimeMinutes += 60;
      if (hoursTaken == 0) {
        hoursString = `${hoursTaken + 23} hours `;
      } else {
        hoursString = `${hoursTaken - 1} hours `;
      }
    }
    const minutesTaken = endTimeMinutes - startTimeMinutes;
    let minutesString = "";
    if (minutesTaken === 1) {
      minutesString = `${minutesTaken} minute`;
    } else if (minutesTaken > 1) {
      minutesString = `${minutesTaken} minutes`;
    }

    if (hoursString === "" && minutesString === "") {
      return "0 minutes";
    }

    return `${hoursString}${minutesString}`;
  };

  const initialDuration = findDuration(startTime, endTime);
  const [information, setInformation] = useState<studentSessionProp>({
    teacherName,
    role,
    date,
    startTime,
    endTime,
    duration: initialDuration,
    reason,
    summary,
    collapse,
  });

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEdit(!edit);
  };

  return (
    <div
      className={
        collapsed
          ? `${styles.studentSession} ${styles.collapsedSession}`
          : styles.studentSession
      }
    >
      <div className={styles.topLine}>
        <h2 className={styles.studentName}>{information.teacherName}</h2>
        {collapsed ? (
          <div>
            <button
              className={styles.collapseButton}
              onClick={() => setCollapsed(!collapsed)}
            >
              <img
                src={rightArrow}
                alt="Expand Session"
                className={styles.collapseImage}
              />
            </button>
          </div>
        ) : newLog ? (
          <div className={styles.editButtons}>
            <button
              className={styles.edit}
              onClick={() => setOpenSaveModal(true)}
            >
              Save
            </button>
            <button
              className={`${styles.edit} ${styles.cancelButton}`}
              onClick={() => setOpenCancelModal(true)}
            >
              Cancel
            </button>
            <SaveModal
              open={openSaveModal}
              onClose={() => setOpenSaveModal(false)}
            />
            <CancelModal
              open={openCancelModal}
              onClose={() => setOpenCancelModal(false)}
              onCancel={removeSession}
            />
          </div>
        ) : (
          <div className={styles.editButtons}>
            <button className={styles.edit} onClick={handleEdit}>
              {edit ? "Save" : "Edit"}
            </button>
            <button
              className={styles.collapseButton}
              onClick={() => setCollapsed(!collapsed)}
            >
              <img
                src={downArrow}
                alt="Collapse Session"
                className={styles.collapseImage}
              />
            </button>
          </div>
        )}
      </div>
      {collapsed ? (
        <></>
      ) : (
        <div className={styles.container}>
          <div className={styles.containerLines}>
            <div className={styles.lineLabel}>{role}</div>
            <input
              type="text"
              className={
                edit
                  ? `${styles.informationEdit} ${styles.informationText}`
                  : styles.informationText
              }
              disabled={!edit}
              value={information.teacherName}
              onChange={(e) =>
                setInformation({ ...information, teacherName: e.target.value })
              }
            ></input>
          </div>
          <div className={styles.containerLines}>
            <div className={styles.lineLabel}>Date</div>
            {edit ? (
              <input
                type="date"
                className={`${styles.informationEdit} ${styles.dateEdit}`}
                disabled={!edit}
                value={information.date}
                onChange={(e) =>
                  setInformation({ ...information, date: e.target.value })
                }
              ></input>
            ) : (
              <input
                type="text"
                className={
                  edit
                    ? `${styles.informationEdit} ${styles.informationText}`
                    : styles.informationText
                }
                disabled
                value={dayjs(information.date, "YYYY-MM-DD").format(
                  "MMMM DD, YYYY"
                )}
              ></input>
            )}
          </div>
          <div className={styles.containerLines}>
            <div className={styles.timeLine}>
              <div className={`${styles.lineLabel} ${styles.time}`}>
                Start Time
              </div>
              <input
                type="time"
                className={
                  edit
                    ? ` ${styles.informationEdit} ${styles.timeEdit}`
                    : `${styles.timeInformation} ${styles.informationText}`
                }
                disabled={!edit}
                value={information.startTime}
                onChange={(e) =>
                  setInformation({
                    ...information,
                    startTime: e.target.value,
                    duration: findDuration(e.target.value, information.endTime),
                  })
                }
              ></input>
            </div>
            <div className={styles.timeLine}>
              <div className={`${styles.lineLabel} ${styles.time}`}>
                End Time
              </div>
              <input
                type="time"
                className={
                  edit
                    ? `${styles.informationEdit} ${styles.timeEdit}`
                    : styles.informationText
                }
                disabled={!edit}
                value={information.endTime}
                onChange={(e) =>
                  setInformation({
                    ...information,
                    endTime: e.target.value,
                    duration: findDuration(
                      information.startTime,
                      e.target.value
                    ),
                  })
                }
              ></input>
            </div>
          </div>
          <div className={styles.containerLines}>
            <div className={styles.lineLabel}>Duration</div>
            <input
              type="text"
              className={styles.informationText}
              disabled
              value={information.duration}
              onChange={(e) =>
                setInformation({ ...information, duration: e.target.value })
              }
            ></input>
          </div>
          <div className={styles.containerLines}>
            <div className={styles.lineLabel}>Session Reason</div>
            <select
              className={styles.reason}
              disabled={!edit}
              value={information.reason}
              onChange={(e) =>
                setInformation({ ...information, reason: e.target.value })
              }
            >
              {edit ? (
                <>
                  <option className={styles.selectOption} value="Reason 1">
                    Reason 1
                  </option>
                  <option className={styles.selectOption} value="Reason 2">
                    Reason 2
                  </option>
                  <option className={styles.selectOption} value="Reason 3">
                    Reason 3
                  </option>
                </>
              ) : (
                <option value={information.reason}>{information.reason}</option>
              )}
            </select>
          </div>
          <div className={`${styles.summaryLine} ${styles.containerLines}`}>
            <div className={styles.lineLabel}>Session Summary</div>
            {edit ? (
              <textarea
                className={
                  edit
                    ? `${styles.informationEdit} ${styles.informationText}`
                    : styles.informationText
                }
                disabled={!edit}
                value={information.summary}
                onChange={(e) =>
                  setInformation({ ...information, summary: e.target.value })
                }
              ></textarea>
            ) : (
              <div
                className={edit ? styles.summaryEdit : styles.informationText}
              >
                {information.summary}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSession;
