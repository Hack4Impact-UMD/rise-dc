import { useState, useEffect, SetStateAction, Dispatch } from "react";
import styles from "./GuardianInformation.module.css";
import { Student, StudentID } from "../../types/StudentType";
import { storeStudent, updateStudent } from "../../backend/FirestoreCalls";
import CancelButton from "../CancelButton/CancelButton";
import SaveButton from "../SaveButton/SaveButton";

interface Prop {
  student: StudentID | undefined;
  setStudent: Dispatch<SetStateAction<StudentID | undefined>>;
}

const GuardianInformation = ({ student, setStudent }: Prop) => {
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);

  const blankStudent: StudentID = {
    id: "",
    address: "",
    email: "",
    grade_level: "",
    grades: {
      english_before: "",
      english_after: "",
      humanities_before: "",
      humanities_after: "",
      socialStudies_before: "",
      socialStudies_after: "",
      math_before: "",
      math_after: "",
      science_before: "",
      science_after: "",
    },
    guardian_email: "",
    guardian_name: "",
    guardian_phone: "",
    guardian_address: "",
    high_school: "",
    name: "",
    phone_number: "",
    reading_level: "",
    files: [],
    active: true,
  };
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<StudentID>(student!);

  useEffect(() => {
    setData({
      ...student!,
      guardian_address: data.guardian_address,
      guardian_email: data.guardian_email,
      guardian_phone: data.guardian_phone,
      guardian_name: data.guardian_name,
    });
  }, [student]);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) {
      setOpenSaveModal(!openSaveModal);
    } else {
      setEdit(!edit);
    }
  };

  return (
    <div className={styles.guardianInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Guardian Information</h2>
        <div className={styles.editButtons}>
          <button className={styles.edit} onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </button>
          <SaveButton
            open={openSaveModal}
            onClose={() => {
              setOpenSaveModal(!openSaveModal);
            }}
            saveInfo={() => {
              setStudent(data);
              setEdit(!edit);
            }}
            data={data}
          />
          {edit ? (
            <>
              <button
                onClick={() => setOpenCancelModal(!openCancelModal)}
                className={styles.edit}
                style={{ color: "red" }}
              >
                Cancel
              </button>
              <CancelButton
                open={openCancelModal}
                onClose={() => setOpenCancelModal(!openCancelModal)}
                resetInfo={() => {
                  setData(student || blankStudent);
                  setEdit(false);
                }}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Name</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.guardian_name}
            onChange={(e) => {
              setData({ ...data, guardian_name: e.target.value });
            }}
            placeholder="Enter new name here"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Address</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.guardian_address}
            onChange={(e) => {
              setData({ ...data, guardian_address: e.target.value });
            }}
            placeholder="Enter new address here"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Email</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.guardian_email}
            onChange={(e) => {
              setData({ ...data, guardian_email: e.target.value });
            }}
            placeholder="Enter new email here"
          ></input>
        </div>
        <div className={`${styles.bottomLine} ${styles.containerLines}`}>
          <div className={styles.lineLabel}>Phone Number</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.guardian_phone}
            onChange={(e) => {
              setData({ ...data, guardian_phone: e.target.value });
            }}
            placeholder="Enter new phone number here"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default GuardianInformation;
