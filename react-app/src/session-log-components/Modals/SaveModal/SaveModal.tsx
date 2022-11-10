import Modal from "../Modal";
import "./SaveModal.css";

type saveModalPropsType = {
  open: boolean;
  onClose: any;
};

const SaveModal = ({ open, onClose }: saveModalPropsType) => {
  const handleSaveLog = () => {};

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className="save-modal-header">
          <div className="save-modal-heading">
            {" "}
            New Session Log Confirmation{" "}
          </div>
        </div>
        <div className="save-modal-content">
          <p className="save-modal-paragraph">
            Are you sure you want to create a new session log?
          </p>
        </div>
        <div className="save-modal-actions">
          <div className="save-actions-container">
            <button className="save-modal-yes" onClick={() => handleSaveLog()}>
              Yes
            </button>
            <button className="save-modal-no" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default SaveModal;
