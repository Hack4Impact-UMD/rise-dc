import { useState } from "react";
import styles from "./NewGuardianInformation.module.css";

type GuardianInformationProp = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
};

const NewGuardianInformation = ({
  name,
  address,
  email,
  phoneNumber,
}: GuardianInformationProp) => {

  const [information, setInformation] = useState<GuardianInformationProp>({
    name,
    address,
    email,
    phoneNumber,
  });


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
            value={information.name}
            onChange={(e) =>
              setInformation({ ...information, name: e.target.value })
            }
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Address</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={information.address}
            onChange={(e) =>
              setInformation({ ...information, address: e.target.value })
            }
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Email</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={information.email}
            onChange={(e) =>
              setInformation({ ...information, email: e.target.value })
            }
          ></input>
        </div>
        <div className={`${styles.bottomLine} ${styles.containerLines}`}>
          <div className={styles.lineLabel}>Phone Number</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={information.phoneNumber}
            onChange={(e) =>
              setInformation({ ...information, phoneNumber: e.target.value })
            }
          ></input>
        </div>
      </div>
    </div>
  );
};

export default NewGuardianInformation;
