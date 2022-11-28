import { useState } from "react";
import styles from "./SettingsPage.module.css";
import Button from "./Button";
import { updateUserPassword } from "../backend/AuthCalls";
import ConfirmModal from "./Modals/ConfirmModal/ConfirmModal";

export default function SettingsForm() {
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  return (
    <div className={styles.settingsForm}>
      <h4 className={styles.profile}>Profile</h4>
      {ResetEmailForm()}
      {ResetPasswordForm()}
    </div>
  );
}

function ResetEmailForm() {
  const [value, setValue] = useState("");
  const [emailModal, setEmailModal] = useState<boolean>(false);
  const [emailBlank, setEmailBlank] = useState<boolean>(false);

  function handleTextAreaChange(event: any) {
    setValue(event.target.value);
    setEmailBlank(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    value.trim().length === 0 ? setEmailBlank(true) : setEmailModal(true);
  }

  return (
    <>
      <ConfirmModal
        open={emailModal}
        onClose={() => setEmailModal(false)}
        email={value}
        resetFunction={() => setValue("")}
      />
      <form onSubmit={handleSubmit}>
        <label className={styles.resetEmail}>
          <b>Reset Email</b>
        </label>
        <div className={styles.buttonContainer}>
          <input
            className={`${styles.input} ${
              emailBlank ? styles.invalidInput : ""
            }`}
            placeholder="Enter email address"
            value={value}
            onChange={handleTextAreaChange}
          />
          <Button
            text="Reset"
            onClick={() => {
              value.trim().length === 0
                ? setEmailBlank(true)
                : setEmailModal(true);
            }}
          />
        </div>
      </form>
    </>
  );
}

// TODO: improve error messaging
function ResetPasswordForm() {
  //TODO: update this state handling to match AdminSettingsPage account
  // creation.
  const initialPasswordValues = {
    currPass: "",
    newPass: "",
    confirmNewPass: "",
  };

  const blankPasswordValues = {
    currPass: false,
    newPass: false,
    confirmNewPass: false,
  };

  const [passwordState, setPasswordState] = useState(initialPasswordValues);
  const [blankPasswordState, setBlankPasswordState] =
    useState(blankPasswordValues);

  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  function handleCurrPassChange(event: any) {
    setPasswordState({ ...passwordState, currPass: event.target.value });
    setBlankPasswordState({ ...blankPasswordState, currPass: false });
  }

  function handleNewPassChange(event: any) {
    setPasswordState({ ...passwordState, newPass: event.target.value });
    setBlankPasswordState({ ...blankPasswordState, newPass: false });
  }

  function handleConfirmNewPassChange(event: any) {
    setPasswordState({ ...passwordState, confirmNewPass: event.target.value });
    setBlankPasswordState({ ...blankPasswordState, confirmNewPass: false });
  }

  async function handleSubmit(e: any) {
    e?.preventDefault();
    if (passwordState.currPass.trim().length === 0) {
      setBlankPasswordState({ ...blankPasswordState, currPass: true });
    } else if (passwordState.newPass.trim().length === 0) {
      setBlankPasswordState({ ...blankPasswordState, newPass: true });
    } else if (passwordState.confirmNewPass.trim().length === 0) {
      setBlankPasswordState({ ...blankPasswordState, confirmNewPass: true });
    } else {
      setPasswordModal(true);
    }
  }

  return (
    <>
      <ConfirmModal
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
        passwordState={passwordState}
        resetFunction={() => setPasswordState(initialPasswordValues)}
      />
      <form onSubmit={handleSubmit}>
        <label className={styles.resetPassword}>
          <b>Reset Password</b>
        </label>
        <input
          className={`${styles.input} ${
            blankPasswordState.currPass ? styles.invalidInput : ""
          }`}
          type="password"
          placeholder="Enter current password"
          value={passwordState.currPass}
          onChange={handleCurrPassChange}
        />
        <input
          className={`${styles.input} ${
            blankPasswordState.newPass ? styles.invalidInput : ""
          }`}
          type="password"
          placeholder="Enter new password"
          value={passwordState.newPass}
          onChange={handleNewPassChange}
        />
        <div className={styles.buttonContainer}>
          <input
            className={`${styles.input} ${
              blankPasswordState.confirmNewPass ? styles.invalidInput : ""
            }`}
            type="password"
            placeholder="Confirm new password"
            value={passwordState.confirmNewPass}
            onChange={handleConfirmNewPassChange}
          />
          <Button
            text="Reset"
            onClick={() => {
              handleSubmit(null);
            }}
          />
        </div>
      </form>
    </>
  );
}
