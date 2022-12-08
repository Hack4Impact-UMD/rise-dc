import { useState, useEffect } from "react";
import styles from "./ContactInformation.module.css";
import {Student} from "../../types/StudentType"
import { updateStudent } from "../../backend/FirestoreCalls";

interface Props {
  student: Student | undefined
}

const ContactInformation = ({student}: Props) => {
  const blankStudent = {
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
      science_after: ""
    },
    guardian_email: "",
    guardian_name: "",
    guardian_phone: "",
    high_school: "",
    name: "",
    phone_number: "",
    reading_level: ""
  }
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<Student>(blankStudent);

  useEffect(() => {
    setData(student || blankStudent)
  }, [student])

  const saveStudent = () => {
    updateStudent(data);
  }

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) saveStudent();
    setEdit(!edit);
  };

  return (
    <div className={styles.contactInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Contact Information</h2>
        <div className={styles.editButtons}>
          <button className={styles.edit} onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </button>
          {edit ?
          <button className={styles.cancel} onClick={() => {setData(student || blankStudent); setEdit(false)}}>
            Cancel
          </button>
          : ""
          }
        </div>
      </div>
      <div className={styles.container}>
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
            onChange={(e) =>
              {setData({...data, address: e.target.value})}
            }
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
            onChange={(e) =>{setData({...data, email: e.target.value})}
            }
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
            onChange={(e) =>
              {setData({...data, phone_number: e.target.value})}
            }
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
            onChange={(e) =>
              {setData({...data, high_school: e.target.value})}
            }
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
            onChange={(e) =>
              {setData({...data, grade_level: e.target.value})}
            }
            placeholder="Enter new grade level here"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
