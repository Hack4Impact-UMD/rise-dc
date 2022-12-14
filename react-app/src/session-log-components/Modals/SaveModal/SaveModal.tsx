import Modal from "../../../ModalWrapper/Modal";
import styles from "./SaveModal.module.css";

type saveModalPropsType = {
  open: boolean;
  onClose: any;
};

const SaveModal = ({ open, onClose }: saveModalPropsType) => {
  const handleSaveLog = () => {};
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className={styles.header}>
          <button className={styles.close} onClick={onClose}>
            &#x2715;
          </button>
          <div className={styles.heading}> New Session Log Confirmation </div>
        </div>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Are you sure you want to create a new session log?
          </p>
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <button
              className={styles.yesButton}
              onClick={() => handleSaveLog()}
            >
              Yes
            </button>
            <button className={styles.noButton} onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default SaveModal;
