import { EmailAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { AuthProvider } from "../../../auth/AuthProvider";
import {
  updateUserEmail,
  updateUserPassword,
} from "../../../backend/AuthCalls";
import app from "../../../config/firebase";
import Modal from "../../../ModalWrapper/Modal";
import styles from "./ConfirmModal.module.css";

type confirmModalPropsType = {
  open: boolean;
  onClose: any;
  email?: string;
  passwordState?: {
    currPass: string;
    newPass: string;
    confirmNewPass: string;
  };
  resetFunction?: any;
};

const ConfirmModal = ({
  open,
  onClose,
  email,
  passwordState,
  resetFunction,
}: confirmModalPropsType) => {
  const [submit, setSubmitted] = useState<[String, String]>(["", ""]);
  const handleConfirm = async () => {
    if (passwordState == undefined) {
      const definedEmail: string = email != undefined ? email : "";
      const result = await updateUserEmail(definedEmail);
      if (result.includes("Changed current account's email from")) {
        setSubmitted(["Email Reset!", result]);
      } else {
        setSubmitted(["Error!", result]);
      }
    } else {
      if (passwordState.newPass != passwordState.confirmNewPass) {
        setSubmitted(["Error!", "Please make sure your passwords match"]);
      } else {
        const result = await updateUserPassword(
          passwordState.newPass,
          passwordState.currPass
        );
        if (result.includes("Successfully updated password")) {
          setSubmitted(["Password Reset!", result]);
        } else {
          setSubmitted(["Error!", result]);
        }
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className={styles.header}>
          <button
            className={styles.close}
            onClick={() => {
              if (submit[0] != "") {
                resetFunction();
              }
              onClose();
              setSubmitted(["", ""]);
            }}
          >
            &#x2715;
          </button>
          <div className={styles.heading}>
            {" "}
            {submit[0] != "" ? (
              <p style={submit[0].includes("Error") ? { color: "red" } : {}}>
                {submit[0]}
              </p>
            ) : (
              "Confirmation"
            )}
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            {submit[0] != ""
              ? submit[1]
              : `Are you sure you want to reset your
                ${passwordState == undefined ? "email" : "password"}`}
          </p>
        </div>
        {submit[0] == "" ? (
          <div className={styles.actions}>
            <div className={styles.container}>
              <button
                className={styles.resetButton}
                onClick={() => {
                  handleConfirm();
                }}
              >
                Reset
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  if (submit[0] != "") {
                    resetFunction();
                  }
                  onClose();
                  setSubmitted(["", ""]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </>
    </Modal>
  );
};

export default ConfirmModal;
