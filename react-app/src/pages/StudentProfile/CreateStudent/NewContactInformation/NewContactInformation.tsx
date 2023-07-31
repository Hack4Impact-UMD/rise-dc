import { useState } from "react";
import { Student } from "../../../../types/StudentType";
import styles from "./NewContactInformation.module.css";

const NewContactInformation: React.FC<{
  sharedStudent: Student;
  setSharedStudent: any;
}> = ({ sharedStudent, setSharedStudent }) => {
  return (
    <div className={styles.contactInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Student Information</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Address</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.address}
            onChange={(e) =>
              setSharedStudent({ ...sharedStudent, address: e.target.value })
            }
            placeholder="Enter new address"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Email</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.email}
            onChange={(e) =>
              setSharedStudent({ ...sharedStudent, email: e.target.value })
            }
            placeholder="Enter new email"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Phone Number</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.phone_number}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                phone_number: e.target.value,
              })
            }
            placeholder="Enter new phone number"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>High School</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.high_school}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                high_school: e.target.value,
              })
            }
            placeholder="Enter new high school"
          ></input>
        </div>
        <div className={`${styles.bottomLine} ${styles.containerLines}`}>
          <div className={styles.lineLabel}>Grade Level</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.grade_level}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                grade_level: e.target.value,
              })
            }
            placeholder="Enter new grade level"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default NewContactInformation;
