import { useState } from "react";
import Modal from "../../ModalWrapper/Modal";
import TextField, { TextFieldTypes } from "../TextField/TextField";
import { sendResetEmail } from "../../backend/FirebaseCalls";
import { AuthError } from "firebase/auth";
import styles from "./ForgotPassword.module.css";

type forgotModalType = {
  open: boolean;
  onClose: any;
};

const ForgotPassword = ({ open, onClose }: forgotModalType) => {
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePasswordReset = () => {
    if (submitted) {
      handleOnClose();
    } else {
      sendResetEmail(email)
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
          }, 300);
        })
        .catch((error) => {
          setTimeout(() => {
            let code = (error as AuthError).code;
            console.log(code);
            if (
              code === "auth/invalid-email" ||
              code === "auth/missing-email"
            ) {
              setErrorEmail("Make sure your email is correct.");
            } else {
              setErrorEmail("Please try again later");
            }
            setLoading(false);
          }, 300);
        });
    }
  };

  const handleOnClose = () => {
    onClose();
    setSubmitted(false);
    setErrorEmail("");
    setLoading(false);
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
        </div>
        <div className={styles.content}>
          {submitted ? (
            <div className={styles.submit}>
              Thank you! Check your email for further instructions.
            </div>
          ) : (
            <>
              <p className={styles.error}>{errorEmail ? errorEmail : ""}</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setLoading(true);
                  handlePasswordReset();
                }}
              >
                <TextField
                  header="Email"
                  fieldType={TextFieldTypes.email}
                  onChange={(val) => {
                    setEmail(val);
                  }}
                  error={errorEmail != ""}
                />
              </form>
            </>
          )}
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <button
              className={styles.resetButton}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setLoading(true);
                handlePasswordReset();
              }}
              disabled={loading}
            >
              {submitted ? (
                "Back to Login"
              ) : (
                <div>
                  {loading ? (
                    <div className={styles.spinner}></div>
                  ) : (
                    "Reset Password"
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ForgotPassword;
