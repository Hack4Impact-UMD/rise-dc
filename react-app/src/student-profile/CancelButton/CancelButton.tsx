import Modal from "../../components/ModalWrapper/Modal";
import styles from "./CancelButton.module.css";

type cancelModalType = {
  open: boolean;
  onClose: any;
  resetInfo: any;
};

const CancelButton = ({ open, onClose, resetInfo }: cancelModalType) => {
  const handleOnClose = () => {
    onClose();
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
          <div className={styles.title}> Cancel Confirmation</div>
        </div>
        <div className={styles.content}>
          <div className={styles.submit}>
            Are you sure you want to cancel? <br /> Any changes you made will
            not be saved.
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <button
              className={styles.yesButton}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                resetInfo();
                handleOnClose();
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
      </>
    </Modal>
  );
};

export default CancelButton;
