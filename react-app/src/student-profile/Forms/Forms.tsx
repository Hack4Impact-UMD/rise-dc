import { useState, useEffect } from "react";
import styles from "./Forms.module.css";
import symbol from "./fileUpload.svg";
import { Student, StudentFile } from "../../types/StudentType";
import {
  uploadStudentFile,
  getStudentWithID,
  deleteStudentFile,
} from "../../backend/FirestoreCalls";

interface Prop {
  student: Student | undefined;
}

const Forms = ({ student }: Prop) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState<Boolean>(false);

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
    guardian_address: "",
    high_school: "",
    name: "",
    phone_number: "",
    reading_level: "",
    files: [],
    active: true,
  };

  const [currentStudent, setCurrentStudent] = useState<Student>(
    student || blankStudent
  );

  useEffect(() => {
    setFiles([]);
    setCurrentStudent(student || blankStudent);
  }, [student]);

  const refreshStudent = () => {
    if (student && student.id) {
      getStudentWithID(student.id)
        .then((student) => {
          setCurrentStudent({ ...student, id: student.id });
        })
        .catch((e: any) => console.log(e));
    }
  };

  const deleteFile = (file: StudentFile) => {
    if (student && student.id) {
      setLoading(true);
      deleteStudentFile(file, student.id)
        .then(() => {
          setLoading(false);
          refreshStudent();
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) {
      saveFiles()
        .then(() => {
          refreshStudent();
        })
        .catch((e) => console.log(e));

      setFiles([]);
    }
    setEdit(!edit);
  };

  const saveFiles = async () => {
    if (student?.id) {
      setLoading(true);
      for (let file of files) {
        try {
          await uploadStudentFile(file, student.id);
        } catch (e) {
          console.log(e);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.studentSession}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Forms</h2>
        {!loading ? (
          <div className={styles.editButtons}>
            <button className={styles.edit} onClick={handleEdit}>
              {edit ? "Save" : "Edit"}
            </button>
            {edit ? (
              <button
                className={styles.cancel}
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.container}>
        <div className={`${styles.containerLines} ${styles.uploadLine}`}>
          <input
            type="file"
            id="upload"
            onChange={(e: any) => setFiles([...files, e!.target!.files[0]])}
            hidden
          />
          {edit ? (
            <label htmlFor="upload" className={styles.edit}>
              Upload{" "}
              <img
                src={symbol}
                alt="File Upload Symbol"
                className={styles.uploadImage}
              ></img>
            </label>
          ) : (
            <></>
          )}
        </div>
        {loading ? <p>Loading...</p> : ""}
        {files.map((file) => {
          return (
            <div className={styles.containerLines}>
              <div className={styles.informationText}>{file.name}</div>
            </div>
          );
        })}
        {currentStudent.files.map((file) => {
          return (
            <div className={styles.containerLines}>
              <div className={styles.informationText}>
                <a href={file.downloadURL} target="_blank">
                  {file.name}
                </a>
              </div>
              <button
                onClick={() => {
                  deleteFile(file);
                }}
                className={styles.button}
              >
                <img className={styles.icon} alt="Delete Icon" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forms;
