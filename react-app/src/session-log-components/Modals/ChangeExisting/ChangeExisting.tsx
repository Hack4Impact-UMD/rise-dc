import { useState } from "react";
import { deleteLog, updateLog } from "../../../backend/FirestoreCalls";
import Modal from "../../../ModalWrapper/Modal";
import { Log } from "../../../types/LogType";
import styles from "./ChangeExisting.module.css";

type saveButtonType = {
  open: boolean;
  onClose: any;
  saveInfo: any;
  information?: Log;
  id: string;
  del: boolean;
};

const ChangeExisting = ({
  open,
  onClose,
  saveInfo,
  information,
  id,
  del,
}: saveButtonType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    if (del) {
      deleteLog(id)
        .then(() => {
          setSubmitted("The log has been deleted.");
          saveInfo();
        })
        .catch((error) => {
          setSubmitted(
            `An error occurred while trying to delete the log. Please try again later.`
          );
          setError(true);
        })
        .finally(() => setLoading(false));
    } else {
      updateLog(information!, id)
        .then(() => {
          setSubmitted("Your changes have been saved.");
        })
        .catch((error) => {
          setSubmitted(
            `An error occurred while trying to save your changes. Please try again later.`
          );
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleOnClose = () => {
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
          <div className={styles.title}>
            {" "}
            {del ? "Delete" : "Save"} Confirmation
          </div>
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
                    {del
                      ? "Are you sure you would like to delete this log?"
                      : "Are you sure you would like to save your changes?"}
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

export default ChangeExisting;
