import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  storeStudent,
  updateStudent,
  uploadStudentFile,
} from "../../../backend/FirestoreCalls";
import Modal from "../../../ModalWrapper/Modal";
import { Student } from "../../../types/StudentType";
import styles from "./SaveButton.module.css";

type saveButtonType = {
  open: boolean;
  onClose: any;
  data: Student;
  files: File[];
};

const SaveButton = ({ open, onClose, data, files }: saveButtonType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [route, setRoute] = useState<string>("./");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    storeStudent(data)
      .then((id) => {
        let unsavedFile = false;
        files.forEach((file) => {
          uploadStudentFile(file, id).catch(() => {
            unsavedFile = true;
          });
        });
        if (unsavedFile) {
          setSubmitted(
            "Student profile has been created but some files failed to save. They can be reuploaded in the student profile page."
          );
        } else {
          setSubmitted("Student profile has been created successfully.");
        }
        setRoute(`../profile/${id}`);
      })
      .catch((error) => {
        setSubmitted(
          `Student creation failed due to the following error: ${error}`
        );
        setRoute("failed");
      })
      .finally(() => setLoading(false));
  };

  const handleOnClose = () => {
    if (route != "failed") {
      navigate(route);
    }
    onClose();
    setSubmitted("");
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClose()}
    >
      <>
        <div className={styles.header}>
          <button
            className={styles.close}
            onClick={() => {
              handleOnClose();
            }}
          >
            &#x2715;
          </button>
          <div className={styles.title}> Save Confirmation</div>
        </div>
        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          <>
            <div className={styles.content}>
              {submitted ? (
                <div className={styles.submitted}>{submitted}</div>
              ) : (
                <>
                  <p className={styles.submit}>
                    Are you sure you would like to create a new student?
                  </p>
                </>
              )}
            </div>
            {submitted != "" ? (
              <></>
            ) : (
              <div className={styles.actions}>
                <div className={styles.container}>
                  <button
                    className={styles.yesButton}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handleSubmit();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.noButton}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handleOnClose();
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </Modal>
  );
};

export default SaveButton;
