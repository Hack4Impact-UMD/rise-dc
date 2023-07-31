import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/ModalWrapper/Modal";
import styles from "./AccountModals.module.css";
import Loading from "../../../../components/LoadingScreen/Loading";

type accountModalPropsType = {
  open: boolean;
  onClose: any;
  mode: "CREATE" | "DELETE" | "CHANGE";
  information: any;
  backendCall: any;
  resetFunction: any;
};

const AccountModal = ({
  open,
  onClose,
  mode,
  information,
  backendCall,
  resetFunction,
}: accountModalPropsType) => {
  // Tracks whether someone has attempted to create a user. The first string in the submit array is either
  // nothing, "Error", or "Success".
  let displayMessage;
  if (mode == "CREATE") {
    displayMessage = `Are you sure you want to create a ${information.role.toLowerCase()} account for ${
      information.name
    } using the email ${information.email}?`;
  } else if (mode == "DELETE") {
    displayMessage = `Are you sure you want to delete the account with the email ${information.email}?`;
  } else if (mode == "CHANGE") {
    displayMessage = `Are you sure you want to change the account of ${
      information.email
    } to the role of ${information.role.toLowerCase()}?`;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [submit, setSubmitted] = useState<[String, String]>(["", ""]);
  const navigate = useNavigate();
  const handleConfirm = async () => {
    backendCall()
      .then((message: string) => {
        setSubmitted(["Success", message]);
      })
      .catch((error: string) => {
        setSubmitted(["Error", error]);
      })
      .finally(() => setLoading(false));
  };

  const handleOnClose = () => {
    if (submit[0].includes("Success")) {
      resetFunction();
    }
    onClose();
    setLoading(false);
    setSubmitted(["", ""]);
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <>
        <div className={styles.header}>
          <button className={styles.close} onClick={handleOnClose}>
            &#x2715;
          </button>
          <div className={styles.heading}>
            {submit[0] != "" ? (
              <p
                style={
                  submit[0].includes("Error")
                    ? { color: "red", paddingBottom: "0px" }
                    : {}
                }
              >
                {submit[0]}
              </p>
            ) : (
              "Confirmation"
            )}
          </div>
        </div>
        {loading ? (
          <div className={styles.content}>
            {" "}
            <Loading />
          </div>
        ) : (
          <>
            <div className={styles.content}>
              <p className={styles.paragraph}>
                {submit[0] != "" ? submit[1] : displayMessage}
              </p>
            </div>
            {submit[0].includes("Error") || submit[0].includes("Success") ? (
              <div className={styles.actions}>
                <div className={styles.container}>
                  <button
                    className={`${styles.resetButton} ${styles.loginButton}`}
                    onClick={() => {
                      handleOnClose();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.actions}>
                <div className={styles.container}>
                  <button
                    className={styles.resetButton}
                    onClick={() => {
                      setLoading(true);
                      handleConfirm();
                    }}
                  >
                    {mode == "CREATE"
                      ? "Create Account"
                      : mode == "DELETE"
                      ? "Delete Account"
                      : "Change Role"}
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      handleOnClose();
                    }}
                  >
                    Cancel
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

export default AccountModal;
