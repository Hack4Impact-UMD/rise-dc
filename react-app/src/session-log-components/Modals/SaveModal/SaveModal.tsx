import Modal from "../../../ModalWrapper/Modal";
import styles from "./SaveModal.module.css";
import { Log } from "../../../types/LogType";
import { storeLog, updateLog } from "../../../backend/FirestoreCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type saveModalPropsType = {
  open: boolean;
  onClose: any;
  information: Log;
};

const SaveModal = ({ open, onClose, information }: saveModalPropsType) => {
  const [submitted, setSubmitted] = useState<string>("");
  const [route, setRoute] = useState<string>("./");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleSaveLog = () => {
    setLoading(true);
    storeLog(information)
      .then((id) => {
        console.log(id);
        setSubmitted("Session log has been created successfully.");
        setRoute(`../log/${information.student_id}`);
      })
      .catch((error) => {
        setSubmitted(
          `Session log creation failed due to the following error: ${error}`
        );
        setRoute("failed");
      })
      .finally(() => setLoading(false));
  };

  const handleOnClose = () => {
    if (route != "failed") {
      navigate(route);
      window.location.reload();
    }
    onClose();
    setSubmitted("");
    setLoading(false);
  };
  
  return (
    <Modal open={open} onClose={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClose()}>
      <>
        <div className={styles.header}>
          <button 
            className={styles.close} 
            onClick={() => {handleOnClose();}}>
            &#x2715;
          </button>
          <div className={styles.heading}> New Session Log Confirmation </div>
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
                    Are you sure you would like to create a new session?
                  </p>
                </>
              ) }
            </div>
            {submitted != "" ? (
              <></>
            ) : (
              <div className={styles.actions}>
                <div className={styles.container}>
                  <button
                    className={styles.yesButton}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handleSaveLog();
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

export default SaveModal;
