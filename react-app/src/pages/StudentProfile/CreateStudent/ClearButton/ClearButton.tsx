import Modal from "../../../../components/ModalWrapper/Modal";
import styles from "./ClearButton.module.css";

type cancelModalType = {
  open: boolean;
  onClose: any;
  resetInfo: any;
};

const ClearButton = ({ open, onClose, resetInfo }: cancelModalType) => {
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
          <div className={styles.title}> Clear Confirmation</div>
        </div>
        <div className={styles.content}>
          <div className={styles.submit}>
            Are you sure you want to clear the entries?
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

export default ClearButton;
