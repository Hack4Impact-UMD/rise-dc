import downArrow from "../../assets/downArrow.svg";
import { useState, useEffect } from "react";
import SaveModal from "../Modals/SaveModal/SaveModal";
import CancelModal from "../Modals/CancelModal/CancelModal";
import styles from "./StudentSession.module.css";
import { Log, LogID, Subject } from "../../types/LogType";
import ChangeExisting from "../Modals/ChangeExisting/ChangeExisting";
import { durationToString, findDuration, formatDate } from "./helperFunctions";
import CollapsedView from "./CollapsedView/CollapsedView";
import { info } from "console";

type studentSessionProp = {
<<<<<<< HEAD
  id?: String;
  log?: Log;
=======
  logID?: LogID;
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515
  collapse: boolean;
  newLog?: boolean;
  removeSession?: any;
  studentId: string;
  user?: any;
};

const StudentSession = ({
  logID,
  collapse,
  newLog,
  removeSession,
  studentId,
  user,
}: studentSessionProp) => {
  const log: Log = logID?.log!;
  const currLogID = logID?.id;
  const [edit, setEdit] = useState<boolean>(newLog ? true : false);
  const [collapsed, setCollapsed] = useState<boolean>(collapse);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [openChangeSaveModal, setOpenChangeSaveModal] =
    useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
<<<<<<< HEAD
  const [user, setUser] = useState<RISEUser>();
  const [role, setRole] = useState<"MENTOR" | "TUTOR">("MENTOR");
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
        if (user.type == "TUTOR") {
          setRole(user.type);
        }
      })
      .catch((e) => console.log(e));
  }, []);
=======
  const [openChangeDeleteModal, setOpenChangeDeleteModal] =
    useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515

  useEffect(() => {
    setCollapsed(collapse);
  }, [collapse]);

<<<<<<< HEAD
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

  // parses a string of the form "HH hour MM minutes" into a number of minutes
  const str_to_duration = (time: string): number => {
    let duration = 0;
    if (time.includes("hour")) {
      duration += parseInt(time.split(" ")[0]) * 60;
    }
    if (time.includes("minute")) {
      duration += parseInt(time.split(" ")[2]);
    }
    return duration;
  };

  const url = window.location.pathname.split("/");
  const stud_id = url[url.length - 1];

  const [information, setInformation] = useState<Log>({
    date: new Date(),
    duration_minutes: log
      ? str_to_duration(findDuration(log.start_time, log.end_time))
      : 0,
    instructor_name: log ? log.instructor_name : user?.name || "",
    reason: log ? log.reason : "",
    creator_id: log ? log.creator_id : user?.id || "",
    subject: log ? log.subject : "ENGLISH",
    summary: log ? log.summary : "",
    type: log ? log.type : role,
    student_id: log ? log.student_id : stud_id,
    start_time: log ? log.end_time : "00:00",
    end_time: log ? log.start_time : "00:00",
=======
  const [information, setInformation] = useState<Log>({
    date: log?.date || "",
    duration_minutes: log?.duration_minutes || 0,
    instructor_name: log?.instructor_name || "",
    reason: log?.reason || "",
    creator_id: log?.creator_id || "",
    subject: log?.subject || "ENGLISH",
    summary: log?.summary || "",
    type: log?.type || "MENTOR",
    student_id: studentId,
    start_time: log?.start_time || "00:00",
    end_time: log?.end_time || "00:00",
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515
  });

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) {
      setOpenChangeSaveModal(!openChangeSaveModal);
    } else {
      setEdit(true);
    }
  };
<<<<<<< HEAD
  console.log(new Date());
  return (
    <div
      className={
        collapsed
          ? `${styles.studentSession} ${styles.collapsedSession}`
          : styles.studentSession
      }
    >
      <div className={styles.topLine}>
        <h2 className={styles.studentName}>{log?.instructor_name}</h2>
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
              information={information}
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
            <SaveExisting
              open={openSaveModal}
              onClose={() => setOpenSaveModal(false)}
              saveInfo={() => {
                setEdit(!edit);
                setInformation(information);
              }}
              information={{ info: information, id: stud_id }}
            />
=======
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515

  return (
    <div style={remove ? { display: "none" } : {}}>
      {collapsed ? (
        <CollapsedView
          instructor_name={log?.instructor_name!}
          date={log?.date!}
          changeCollapse={() => setCollapsed(!collapsed)}
        />
      ) : (
<<<<<<< HEAD
        <div className={styles.container}>
          <div className={styles.containerLines}>
            <div className={styles.lineLabel}>{information.type}</div>
            <input
              type="text"
              className={
                edit
                  ? `${styles.informationEdit} ${styles.informationText}`
                  : styles.informationText
              }
              disabled={!edit}
              value={information.instructor_name}
              onChange={(e) =>
                setInformation({
                  ...information,
                  instructor_name: e.target.value,
                })
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
                value={information.date.toDateString()}
                onChange={(e) =>
                  setInformation({
                    ...information,
                    date: e.target.valueAsDate!,
                  })
                }
              ></input>
=======
        <div className={styles.studentSession}>
          <div className={styles.topLine}>
            <h2 className={styles.studentName}>{log?.instructor_name}</h2>
            {newLog ? (
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
                  open={openChangeSaveModal}
                  onClose={() => setOpenChangeSaveModal(false)}
                  information={information}
                />
                <CancelModal
                  open={openCancelModal}
                  onClose={() => setOpenCancelModal(false)}
                  onCancel={removeSession}
                />
              </div>
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515
            ) : (
              <div className={styles.editButtons}>
                {user.uid === log?.creator_id ? (
                  <>
                    <button className={styles.edit} onClick={handleEdit}>
                      {edit ? "Save" : "Edit"}
                    </button>
                    <ChangeExisting
                      open={openChangeSaveModal}
                      onClose={() => setOpenChangeSaveModal(false)}
                      saveInfo={() => {
                        setEdit(!edit);
                        setInformation(information);
                      }}
                      information={information}
                      id={currLogID!}
                      del={false}
                    />
                    {edit ? (
                      <>
                        <button
                          className={`${styles.edit} ${styles.cancelButton}`}
                          onClick={() => setOpenCancelModal(true)}
                        >
                          Cancel
                        </button>
                        <CancelModal
                          open={openCancelModal}
                          onClose={() => setOpenCancelModal(false)}
                          onCancel={() => {
                            setInformation({ ...information });
                            setEdit(!edit);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <button
                          className={`${styles.edit} ${styles.cancelButton}`}
                          onClick={() => setOpenChangeDeleteModal(true)}
                        >
                          Delete
                        </button>
                        <ChangeExisting
                          open={openChangeDeleteModal}
                          onClose={() => {
                            setOpenChangeDeleteModal(false);
                          }}
                          saveInfo={() => {
                            setRemove(true);
                          }}
                          id={currLogID!}
                          del={true}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {!edit && (
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
                )}
              </div>
            )}
          </div>
          <div className={styles.container}>
            <div className={styles.containerLines}>
              <div className={styles.lineLabel}>
                {information.type[0] +
                  information.type.substring(1).toLowerCase()}
              </div>
              <input
                type="text"
                className={
                  edit
                    ? `${styles.informationEdit} ${styles.informationText}`
                    : styles.informationText
                }
                disabled={!edit}
                value={information.instructor_name}
                onChange={(e) =>
                  setInformation({
                    ...information,
<<<<<<< HEAD
                    start_time: e.target.value,
                    duration_minutes: str_to_duration(
                      findDuration(e.target.value, information.end_time)
                    ),
=======
                    instructor_name: e.target.value,
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515
                  })
                }
              ></input>
            </div>
<<<<<<< HEAD
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
                value={information.end_time}
                onChange={(e) =>
                  setInformation({
                    ...information,
                    end_time: e.target.value,
                    duration_minutes: str_to_duration(
                      findDuration(information.start_time, e.target.value)
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
              value={findDuration(information.start_time, information.end_time)}
              onChange={(e) =>
                setInformation({
                  ...information,
                  duration_minutes: str_to_duration(e.target.value),
                })
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
=======
            <div className={styles.containerLines}>
              <div className={styles.lineLabel}>Date</div>
              {edit ? (
                <input
                  type="date"
                  className={`${styles.informationEdit} ${styles.dateEdit}`}
                  value={information.date}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      date: e.target.value,
                    })
                  }
                ></input>
              ) : (
                <p className={styles.informationText}>
                  {formatDate(information.date)}
                </p>
              )}
            </div>
            <div className={styles.containerLines}>
              <div className={styles.timeLine}>
                <div className={`${styles.lineLabel} ${styles.time}`}>
                  Start Time (EST)
                </div>
                <input
                  type="time"
                  className={
                    edit
                      ? ` ${styles.informationEdit} ${styles.timeEdit}`
                      : `${styles.timeInformation} ${styles.informationText}`
                  }
                  disabled={!edit}
                  value={information.start_time}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      start_time: e.target.value,
                      duration_minutes: findDuration(
                        e.target.value,
                        information.end_time
                      ),
                    })
                  }
                ></input>
              </div>
              <div className={styles.timeLine}>
                <div className={`${styles.lineLabel} ${styles.time}`}>
                  End Time (EST)
                </div>
                <input
                  type="time"
                  className={
                    edit
                      ? `${styles.informationEdit} ${styles.timeEdit}`
                      : styles.informationText
                  }
                  disabled={!edit}
                  value={information.end_time}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      end_time: e.target.value,
                      duration_minutes: findDuration(
                        information.start_time,
                        e.target.value
                      ),
                    })
                  }
                ></input>
              </div>
            </div>
            <div className={styles.containerLines}>
              <div className={styles.lineLabel}>Duration</div>
              <p className={styles.informationText}>
                {durationToString(information.duration_minutes)}
              </p>
            </div>
            <div className={styles.containerLines}>
              <div className={styles.lineLabel}>Subject</div>
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515
              {edit ? (
                <>
                  <select
                    className={styles.reason}
                    value={information.subject}
                    onChange={(e) =>
                      setInformation({
                        ...information,
                        subject: e.target.value.toUpperCase() as Subject,
                      })
                    }
                  >
                    {log.type === "MENTOR" ? (
                      <>
                        <option className={styles.selectOption} value="ENGLISH">
                          English
                        </option>
                        <option className={styles.selectOption} value="MATH">
                          Math
                        </option>
                        <option
                          className={styles.selectOption}
                          value="SOCIAL STUDIES"
                        >
                          Social Studies
                        </option>
                        <option className={styles.selectOption} value="SCIENCE">
                          Science
                        </option>
                        <option
                          className={styles.selectOption}
                          value="HUMANITIES/OTHER"
                        >
                          Humanities/Other
                        </option>
                      </>
                    ) : (
                      <>
                        <option
                          className={styles.selectOption}
                          value="College Prep Support"
                        >
                          College Prep Support
                        </option>
                        <option
                          className={styles.selectOption}
                          value="Mentor-Mentee Outing"
                        >
                          Mentor-Mentee Outing
                        </option>
                        <option
                          className={styles.selectOption}
                          value="Mentor-Mentee Outing"
                        >
                          Mentor-Mentee Outing
                        </option>
                      </>
                    )}
                  </select>
                </>
              ) : (
                <div className={styles.informationText}>
                  {information.subject === "HUMANITIES/OTHER"
                    ? "Humanities/Other"
                    : information.subject === "SOCIAL STUDIES"
                    ? "Social Studies"
                    : information.subject[0] +
                      information.subject.substring(1).toLowerCase()}
                </div>
              )}
            </div>
            <div className={`${styles.summaryLine} ${styles.containerLines}`}>
              <div className={styles.lineLabel}>Session Summary</div>
              {edit ? (
                <textarea
                  className={`${styles.summaryEdit} ${styles.informationEdit} ${styles.informationText}`}
                  value={information.summary}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      summary: e.target.value,
                    })
                  }
                ></textarea>
              ) : (
                <div className={styles.informationText}>
                  {information.summary}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSession;
