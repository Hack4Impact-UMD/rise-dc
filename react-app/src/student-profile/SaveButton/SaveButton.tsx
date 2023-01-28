import { useState } from "react";
import { updateStudent } from "../../backend/FirestoreCalls";
import Modal from "../../ModalWrapper/Modal";
import { Student } from "../../types/StudentType";
import styles from "./SaveButton.module.css";

type saveButtonType = {
  open: boolean;
  onClose: any;
  saveInfo: any;
  data: Student;
};

const SaveButton = ({ open, onClose, saveInfo, data }: saveButtonType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    updateStudent(data)
      .then(() => {
        setSubmitted("Your changes have been saved.");
      })
      .catch((error) =>
        setSubmitted(
          `Changes failed to save due to the following error: ${error}`
        )
      )
      .finally(() => setLoading(false));
  };

  const handleOnClose = () => {
    if (submitted == "Your changes have been saved.") {
      saveInfo();
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
