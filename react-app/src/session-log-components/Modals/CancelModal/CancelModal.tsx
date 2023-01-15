import Modal from "../../../ModalWrapper/Modal";
import styles from "./CancelModal.module.css";

type cancelModalPropsType = {
  open: boolean;
  onClose: any;
  onCancel: any;
};

const CancelModal = ({ open, onClose, onCancel }: cancelModalPropsType) => {
  const handleCancelLog = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className={styles.header}>
          <button className={styles.close} onClick={onClose}>
            &#x2715;
          </button>
          <div className={styles.heading}> Cancel Confirmation </div>
        </div>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Are you sure you want to cancel? The session log you created will be
            permanently deleted.
          </p>
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <button
              className={styles.yesButton}
              onClick={() => handleCancelLog()}
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

export default CancelModal;
