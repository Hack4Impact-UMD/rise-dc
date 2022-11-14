import { useState } from "react";
import styles from "./GuardianInformation.module.css";

type GuardianInformationProp = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
};

const GuardianInformation = ({
  name,
  address,
  email,
  phoneNumber,
}: GuardianInformationProp) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [information, setInformation] = useState<GuardianInformationProp>({
    name,
    address,
    email,
    phoneNumber,
  });

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
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
            value={information.name}
            onChange={(e) =>
              setInformation({ ...information, name: e.target.value })
            }
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
            value={information.address}
            onChange={(e) =>
              setInformation({ ...information, address: e.target.value })
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
            value={information.email}
            onChange={(e) =>
              setInformation({ ...information, email: e.target.value })
            }
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
            value={information.phoneNumber}
            onChange={(e) =>
              setInformation({ ...information, phoneNumber: e.target.value })
            }
            placeholder="Enter new phone number here"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default GuardianInformation;
