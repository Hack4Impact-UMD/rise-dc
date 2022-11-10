import "./Modal.css";

type modalPropsType = {
  open: boolean;
  onClose: any;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: modalPropsType) => {
  return (
    <div>
      {open ? (
        <>
          <div className="dark-background" onClick={() => onClose()} />
          <div className="centered">
            <div className="modal">{children}</div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Modal;
