import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./ContactInformation.module.css";
import { Student, StudentID } from "../../../types/StudentType";
import CancelButton from "../CancelButton/CancelButton";
import SaveButton from "../SaveButton/SaveButton";

interface Props {
  student: StudentID | undefined;
  setStudent: Dispatch<SetStateAction<StudentID | undefined>>;
}

const ContactInformation = ({ student, setStudent }: Props) => {
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
      name: data.name,
      address: data.address,
      email: data.email,
      phone_number: data.phone_number,
      high_school: data.high_school,
      grade_level: data.grade_level,
    });
  }, [student]);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) {
      setOpenSaveModal(!openSaveModal);
    } else {
      setEdit(!edit);
    }
  };

  // const saveData = () => {
  //   setStudent({ ...student });
  // };

  return (
    <div className={styles.contactInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Contact Information</h2>
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
              setEdit(!edit);
              setStudent(data);
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
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
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
            value={data.address}
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
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
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            placeholder="Enter new email here"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Phone Number</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.phone_number}
            onChange={(e) => {
              setData({ ...data, phone_number: e.target.value });
            }}
            placeholder="Enter new phone number here"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>High School</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.high_school}
            onChange={(e) => {
              setData({ ...data, high_school: e.target.value });
            }}
            placeholder="Enter new high school here"
          ></input>
        </div>
        <div className={`${styles.bottomLine} ${styles.containerLines}`}>
          <div className={styles.lineLabel}>Grade Level</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
            value={data.grade_level}
            onChange={(e) => {
              setData({ ...data, grade_level: e.target.value });
            }}
            placeholder="Enter new grade level here"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
