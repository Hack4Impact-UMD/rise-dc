import { useState } from "react";
import styles from "./ContactInformation.module.css";

type ContactInformationProp = {
  name: string;
};

const ContactInformation = ({
  name
}: ContactInformationProp) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [information, setInformation] = useState<ContactInformationProp>({
    name
  });

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEdit(!edit);
  };

  return (
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>{name}</div>
          <input
            type="text"
            className={
              edit
                ? `${styles.informationEdit} ${styles.informationText}`
                : styles.informationText
            }
            disabled={!edit}
          ></input>
        </div>
      </div>
  );
};

export default ContactInformation;