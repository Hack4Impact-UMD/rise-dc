import Modal from "../Modal";
import "./CancelModal.css";

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
        <div className="cancel-modal-header">
          <div className="cancel-modal-heading"> Cancel Confirmation </div>
        </div>
        <div className="cancel-modal-content">
          <p className="cancel-modal-paragraph">
            Are you sure you want to cancel? The session log you created will be
            permanently deleted.
          </p>
        </div>
        <div className="cancel-modal-actions">
          <div className="cancel-actions-container">
            <button
              className="cancel-modal-yes"
              onClick={() => handleCancelLog()}
            >
              Yes
            </button>
            <button className="cancel-modal-no" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default CancelModal;
