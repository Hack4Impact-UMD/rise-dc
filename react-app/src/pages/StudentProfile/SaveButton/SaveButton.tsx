import { useState } from "react";
import {
  deleteStudentFile,
  updateStudent,
  uploadStudentFile,
} from "../../../backend/FirestoreCalls";
import Modal from "../../../components/ModalWrapper/Modal";
import { Student, StudentFile, StudentID } from "../../../types/StudentType";
import styles from "./SaveButton.module.css";

type saveButtonType = {
  open: boolean;
  onClose: any;
  saveInfo: any;
  data?: StudentID;
  files?: { uploaded: File[]; deleted: StudentFile[] };
};

const SaveButton = ({
  open,
  onClose,
  saveInfo,
  data,
  files,
}: saveButtonType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    if (!files) {
      updateStudent(data!)
        .then(() => {
          setSubmitted("Your changes have been saved.");
        })
        .catch((error) =>
          setSubmitted(
            `Changes failed to save due to the following error: ${error}`
          )
        )
        .finally(() => setLoading(false));
    } else {
      let uploadError = 0;
      let deleteError = 0;
      Promise.all([]);
      const uploadArray = [];
      for (const uploadedFile of files.uploaded) {
        setLoading(true);
        uploadStudentFile(uploadedFile, data!.id!)
          .then(() => {})
          .catch((e) => {
            uploadError++;
          })
          .finally(() => setLoading(false));
      }

      for (const deletedFile of files.deleted) {
        setLoading(true);
        deleteStudentFile(deletedFile, data!.id!)
          .then(() => {})
          .catch((e) => {
            deleteError++;
          })
          .finally(() => setLoading(false));
      }
      if (uploadError == 0 && deleteError == 0) {
        setSubmitted("Your changes have been saved.");
      } else {
        setSubmitted(
          "An error occurred while trying to save your changes. Please try again later."
        );
      }
    }
  };

  const handleOnClose = () => {
    if (submitted == "Your changes have been saved.") {
      saveInfo();
    }
    if (files) {
      window.location.reload();
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
                    {files
                      ? "The page will be reloaded and any unsaved changes will be deleted. "
                      : ""}
                    Are you sure you would like to save your changes?
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
