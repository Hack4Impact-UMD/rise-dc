import { useState, useEffect } from "react";
import styles from "./GuardianInformation.module.css";
import { Student } from "../../types/StudentType";
import { updateStudent } from "../../backend/FirestoreCalls";

interface Prop {
  student: Student | undefined;
}

const GuardianInformation = ({ student }: Prop) => {
  const blankStudent: Student = {
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
    high_school: "",
    name: "",
    phone_number: "",
    reading_level: "",
    files: [],
  };
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<Student>(student || blankStudent);

  useEffect(() => {
    setData(student || blankStudent);
  }, [student]);

  const saveStudent = () => {
    updateStudent(data);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) saveStudent();
    setEdit(!edit);
  };

  return (
    <div className={styles.guardianInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Guardian Information</h2>
        <div className={styles.editButtons}>
          <button className={styles.edit} onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </button>
          {edit ? (
            <button
              className={styles.cancel}
              onClick={() => {
                setData(student || blankStudent);
                setEdit(false);
              }}
            >
              Cancel
            </button>
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
