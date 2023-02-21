import { useState, useEffect } from "react";
import styles from "./Forms.module.css";
import symbol from "./fileUpload.svg";
import deleteIcon from "./delete.png";
import { Student, StudentFile } from "../../types/StudentType";
import {
  uploadStudentFile,
  getStudentWithID,
  deleteStudentFile,
} from "../../backend/FirestoreCalls";
import SaveButton from "../SaveButton/SaveButton";
import CancelButton from "../CancelButton/CancelButton";
interface Prop {
  student: Student | undefined;
}

const Forms = ({ student }: Prop) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  const [files, setFiles] = useState<{
    uploaded: File[];
    deleted: StudentFile[];
  }>({
    uploaded: [],
    deleted: [],
  });

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
      setOpenSaveModal(!openSaveModal);
    } else {
      setEdit(!edit);
    }
  };

  const saveFiles = async () => {
    if (student?.id) {
      setLoading(true);
      // for (let file of files) {
      //   try {
      //     await uploadStudentFile(file, student.id);
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
      setLoading(false);
    }
  };

  return (
    <div className={styles.studentSession}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Forms</h2>
        <div className={styles.editButtons}>
          <button className={styles.edit} onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </button>
          <SaveButton
            open={openSaveModal}
            onClose={() => {
              setOpenSaveModal(!openSaveModal);
              setEdit(!edit);
            }}
            data={student}
            saveInfo={() => {
              setFiles({ ...files, uploaded: [] });
            }}
            files={files}
          />
          {edit ? (
            <>
              <button
                onClick={() => setOpenCancelModal(!openCancelModal)}
                className={`${styles.edit} ${styles.marginLeft}`}
                style={{ color: "red" }}
              >
                Cancel
              </button>
              <CancelButton
                open={openCancelModal}
                onClose={() => setOpenCancelModal(!openCancelModal)}
                resetInfo={() => {
                  setFiles({ ...files, uploaded: [], deleted: [] });
                  setEdit(false);
                }}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.containerLines} ${styles.uploadLine}`}>
          <input
            type="file"
            id="upload"
            onChange={(e: any) =>
              setFiles({
                ...files,
                uploaded: [...files.uploaded, e!.target!.files[0]],
              })
            }
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
        {files.uploaded?.map((file) => {
          return (
            <div className={styles.containerLines}>
              <div className={styles.informationText}>
                {file.name.length > 30
                  ? file.name.substring(0, 28) +
                    ". . . " +
                    file.name.substring(file.name.indexOf(".") - 3)
                  : file.name}
              </div>
              <button
                onClick={() => {
                  setFiles({
                    ...files,
                    uploaded: files.uploaded.filter((ele) => ele != file),
                  });
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

        {currentStudent.files?.map((file) => {
          return (
            <>
              {files.deleted.find(
                (deletedFile) => deletedFile.path == file.path
              ) ? (
                <></>
              ) : (
                <div className={styles.containerLines}>
                  <div className={styles.informationText}>
                    <a href={file.downloadURL} target="_blank">
                      {file.name.length > 30
                        ? file.name.substring(0, 28) +
                          ". . . " +
                          file.name.substring(file.name.indexOf(".") - 3)
                        : file.name}
                    </a>
                  </div>
                  {edit ? (
                    <button
                      onClick={() => {
                        const arr = files.deleted;
                        if (!arr.includes(file)) {
                          arr.push(file);
                        }
                        setFiles({
                          ...files,
                          deleted: arr,
                        });
                      }}
                      className={styles.button}
                    >
                      <img
                        className={styles.icon}
                        alt="Delete Icon"
                        src={deleteIcon}
                      />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Forms;
