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
  logID?: LogID;
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
  const [openChangeDeleteModal, setOpenChangeDeleteModal] =
    useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  useEffect(() => {
    setCollapsed(collapse);
  }, [collapse]);

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
  });

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) {
      setOpenChangeSaveModal(!openChangeSaveModal);
    } else {
      setEdit(true);
    }
  };

  return (
    <div style={remove ? { display: "none" } : {}}>
      {collapsed ? (
        <CollapsedView
          instructor_name={log?.instructor_name!}
          date={log?.date!}
          changeCollapse={() => setCollapsed(!collapsed)}
        />
      ) : (
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
