import { useState } from "react";
import styles from "./NewContactInformation.module.css";

type ContactInformationProp = {
  address: string;
  email: string;
  phoneNumber: string;
  highSchool: string;
  grade: string;
};

const NewContactInformation = ({
  address,
  email,
  phoneNumber,
  highSchool,
  grade,
}: ContactInformationProp) => {

  const [information, setInformation] = useState<ContactInformationProp>({
    address,
    email,
    phoneNumber,
    highSchool,
    grade,
  });



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
            placeholder="Enter new email here"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Phone Number</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={information.phoneNumber}
            onChange={(e) =>
              setInformation({ ...information, phoneNumber: e.target.value })
            }
            placeholder="Enter new phone number here"
          ></input>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>High School</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={information.highSchool}
            onChange={(e) =>
              setInformation({ ...information, highSchool: e.target.value })
            }
            placeholder="Enter new high school here"
          ></input>
        </div>
        <div className={`${styles.bottomLine} ${styles.containerLines}`}>
          <div className={styles.lineLabel}>Grade Level</div>
          <input
            type="text"
            className={styles.informationEdit}
            value={information.grade}
            onChange={(e) =>
              setInformation({ ...information, grade: e.target.value })
            }
            placeholder="Enter new grade level here"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default NewContactInformation;
