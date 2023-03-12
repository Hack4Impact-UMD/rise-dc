import { useState } from "react";
import { storeLog, updateLog } from "../../../backend/FirestoreCalls";
import Modal from "../../../ModalWrapper/Modal";
import { Log } from "../../../types/LogType";
import styles from "./SaveExisting.module.css";

type saveButtonType = {
  open: boolean;
  onClose: any;
  saveInfo: any;
  information: { info: Log; id: string };
};

const SaveExisting = ({
  open,
  onClose,
  saveInfo,
  information,
}: saveButtonType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [route, setRoute] = useState<string>("./");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
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
  };

  const handleOnClose = () => {
    if (submitted == "Your changes have been saved.") {
      saveInfo();
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

export default SaveExisting;
