import { Student } from "../../../../types/StudentType";
import styles from "./NewGuardianInformation.module.css";

const NewGuardianInformation: React.FC<{
  sharedStudent: Student;
  setSharedStudent: any;
}> = ({ sharedStudent, setSharedStudent }) => {
  return (
    <div className={styles.guardianInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Guardian Information</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Name</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.guardian_name}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                guardian_name: e.target.value,
              })
            }
            placeholder="Enter new name"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Address</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.guardian_address}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                guardian_address: e.target.value,
              })
            }
            placeholder="Enter new address"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Email</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.guardian_email}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                guardian_email: e.target.value,
              })
            }
            placeholder="Enter new email"
          ></input>
        </div>
        <div className={`${styles.bottomLine} ${styles.containerLines}`}>
          <div className={styles.lineLabel}>Phone Number</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={sharedStudent.guardian_phone}
            onChange={(e) =>
              setSharedStudent({
                ...sharedStudent,
                guardian_phone: e.target.value,
              })
            }
            placeholder="Enter new phone number"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default NewGuardianInformation;
