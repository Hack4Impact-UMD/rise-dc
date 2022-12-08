import { useState } from "react";
import styles from "./NewForms.module.css";
import symbol from "./fileUpload.svg";

const NewForms = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const [files, setFiles] = useState<any[]>([]);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEdit(!edit);
  };

  return (
    <div className={styles.studentSession}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Forms</h2>
      </div>
      <div className={styles.container}>
        <div className={`${styles.containerLines} ${styles.uploadLine}`}>
          <input
            type="file"
            id="upload"
            onChange={(e: any) => setFiles([...files, e!.target!.files[0]])}
            hidden
          />
            <label htmlFor="upload" className={styles.edit}>
              Upload{" "}
              <img
                src={symbol}
                alt="File Upload Symbol"
                className={styles.uploadImage}
              ></img>
            </label>
        </div>
        {files.map((file) => {
          return (
            <div className={styles.containerLines}>
              <div className={styles.informationText}>{file.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewForms;
