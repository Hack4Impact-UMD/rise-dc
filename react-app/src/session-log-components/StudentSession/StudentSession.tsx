import moment from "moment";
import downArrow from "./downArrow.svg";
import rightArrow from "./rightArrow.svg";
import { useState, useEffect } from "react";
import "./StudentSession.css";
import SaveModal from "../Modals/SaveModal/SaveModal";
import CancelModal from "../Modals/CancelModal/CancelModal";

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
          ? "student-session student-session-collapsed"
          : "student-session"
      }
    >
      <div className="top-session-line">
        <h2 className="session-student-name">{information.teacherName}</h2>
        {collapsed ? (
          <div>
            <button
              className="collapse-session-image-button"
              onClick={() => setCollapsed(!collapsed)}
            >
              <img
                src={rightArrow}
                alt="Expand Session"
                className="collapse-session-image"
              />
            </button>
          </div>
        ) : newLog ? (
          <div className="session-edit-and-collapse">
            <button
              className="session-edit session-save"
              onClick={() => setOpenSaveModal(true)}
            >
              Save
            </button>
            <button
              className="session-edit session-cancel"
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
          <div className="session-edit-and-collapse">
            <button className="session-edit" onClick={handleEdit}>
              {edit ? "Save" : "Edit"}
            </button>
            <button
              className="collapse-session-image-button"
              onClick={() => setCollapsed(!collapsed)}
            >
              <img
                src={downArrow}
                alt="Collapse Session"
                className="collapse-session-image"
              />
            </button>
          </div>
        )}
      </div>
      {collapsed ? (
        <></>
      ) : (
        <div className="session-information">
          <div className="session-information-line">
            <div className="session-information-label">{role}</div>
            <input
              type="text"
              className={
                edit
                  ? "session-information-edit session-information-text"
                  : "session-information-text"
              }
              disabled={!edit}
              value={information.teacherName}
              onChange={(e) =>
                setInformation({ ...information, teacherName: e.target.value })
              }
            ></input>
          </div>
          <div className="session-information-line">
            <div className="session-information-label">Date</div>
            {edit ? (
              <input
                type="date"
                className="session-information-edit session-date-edit"
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
                    ? "session-information-edit session-information-text"
                    : "session-information-text"
                }
                disabled
                value={moment(information.date, "YYYY-MM-DD").format(
                  "MMMM DD, YYYY"
                )}
              ></input>
            )}
          </div>
          <div className="session-information-line">
            <div className="session-time-line">
              <div className={"session-information-label" && "session-time"}>
                Start Time
              </div>
              <input
                type="time"
                className={
                  edit
                    ? "session-information-text session-time-edit"
                    : "session-information-text session-time-information"
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
            <div className="session-time-line">
              <div className={"session-information-label" && "session-time"}>
                End Time
              </div>
              <input
                type="time"
                className={
                  edit
                    ? "session-time-edit session-information-text"
                    : "session-information-text"
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
          <div className="session-information-line">
            <div className="session-information-label">Duration</div>
            <input
              type="text"
              className="session-information-text"
              disabled
              value={information.duration}
              onChange={(e) =>
                setInformation({ ...information, duration: e.target.value })
              }
            ></input>
          </div>
          <div className="session-information-line">
            <div className="session-information-label">Session Reason</div>
            <select
              className="session-reason"
              disabled={!edit}
              value={information.reason}
              onChange={(e) =>
                setInformation({ ...information, reason: e.target.value })
              }
            >
              {edit ? (
                <>
                  <option className="session-reason-option" value="Reason 1">
                    Reason 1
                  </option>
                  <option className="session-reason-option" value="Reason 2">
                    Reason 2
                  </option>
                  <option className="session-reason-option" value="Reason 3">
                    Reason 3
                  </option>
                </>
              ) : (
                <option value={information.reason}>{information.reason}</option>
              )}
            </select>
          </div>
          <div className="session-information-line session-summary-line">
            <div className="session-information-label">Session Summary</div>
            {edit ? (
              <textarea
                className={
                  edit
                    ? "session-summary-edit session-information-text"
                    : "session-information-text"
                }
                disabled={!edit}
                value={information.summary}
                onChange={(e) =>
                  setInformation({ ...information, summary: e.target.value })
                }
              ></textarea>
            ) : (
              <div
                className={
                  edit ? "session-summary-edit" : "session-information-text"
                }
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
