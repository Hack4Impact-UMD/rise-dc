import { useState, useEffect } from "react";
import styles from "./NewForms.module.css";
import symbol from "../fileUpload.svg";
import deleteIcon from "./delete.png";
import { Student } from "../../../types/StudentType";

const NewForms: React.FC<{
  files: File[];
  setFiles: any;
}> = ({ files, setFiles }) => {
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
            onChange={(e: any) => setFiles([...files, e.target.files[0]])}
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
        {files?.map((file) => {
          return (
            <div className={styles.containerLines}>
              <div className={styles.informationText}>{file.name}</div>
              <button
                onClick={() => {
                  setFiles(files.filter((ele) => ele != file));
                }}
                className={styles.button}
              >
                <img
                  className={styles.icon}
                  alt="Delete Icon"
                  src={deleteIcon}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewForms;
