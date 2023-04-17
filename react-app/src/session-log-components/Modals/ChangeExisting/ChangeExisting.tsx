import { useState } from "react";
import { deleteLog, updateLog } from "../../../backend/FirestoreCalls";
import Modal from "../../../ModalWrapper/Modal";
import { Log } from "../../../types/LogType";
import styles from "./ChangeExisting.module.css";

type saveButtonType = {
  open: boolean;
  onClose: any;
  saveInfo: any;
<<<<<<< HEAD:react-app/src/session-log-components/Modals/SaveExisting/SaveExisting.tsx
  information: { info: Log; id: string };
=======
  information?: Log;
  id: string;
  del: boolean;
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515:react-app/src/session-log-components/Modals/ChangeExisting/ChangeExisting.tsx
};

const ChangeExisting = ({
  open,
  onClose,
  saveInfo,
  information,
<<<<<<< HEAD:react-app/src/session-log-components/Modals/SaveExisting/SaveExisting.tsx
=======
  id,
  del,
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515:react-app/src/session-log-components/Modals/ChangeExisting/ChangeExisting.tsx
}: saveButtonType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
<<<<<<< HEAD:react-app/src/session-log-components/Modals/SaveExisting/SaveExisting.tsx
    updateLog(information.info, information.id)
      .then(() => {
        setSubmitted("Your changes have been saved.");
      })
      .catch((error) => {
        setSubmitted(
          `An error occurred while trying to save your changes. Please try again later. Error: ${error}`
        );
        setRoute("failed");
      })
      .finally(() => setLoading(false));
=======
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
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515:react-app/src/session-log-components/Modals/ChangeExisting/ChangeExisting.tsx
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

<<<<<<< HEAD:react-app/src/session-log-components/Modals/SaveExisting/SaveExisting.tsx
export default SaveExisting;
=======
export default ChangeExisting;
>>>>>>> 5abcafd4088605ac8f1e1aa4c3ec7f1c32d69515:react-app/src/session-log-components/Modals/ChangeExisting/ChangeExisting.tsx
