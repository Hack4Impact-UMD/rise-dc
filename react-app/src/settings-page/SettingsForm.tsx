import { useState } from "react";
import styles from "./AdminSettingsPage.module.css";
import ResetButton from "./ResetButton";
import { updateUserEmail, updateUserPassword } from "../backend/AuthCalls";

export default function SettingsForm() {
  return (
    <div className={styles.form}>
      <h4 className={styles.profile}>Profile</h4>
      {ResetEmailForm()}
      {ResetPasswordForm()}
    </div>
  );
}

function ResetEmailForm() {
  const [value, setValue] = useState("");

  function handleTextAreaChange(event: any) {
    setValue(event.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const result = updateUserEmail(value);
    setValue(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.resetEmail}>
        <b>Reset Email</b>
      </label>
      <div className={styles.buttonContainer}>
        <input
          className={styles.input}
          placeholder="Enter email address"
          value={value}
          onChange={handleTextAreaChange}
        />
        <ResetButton />
      </div>
    </form>
  );
}

// TODO: improve error messaging
function ResetPasswordForm() {
  //TODO: update this state handling to match AdminSettingsPage account
  // creation.
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  function handleCurrPassChange(event: any) {
    setCurrPass(event.target.value);
  }

  function handleNewPassChange(event: any) {
    setNewPass(event.target.value);
  }

  function handleConfirmNewPassChange(event: any) {
    setConfirmNewPass(event.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    var result;
    if (newPass == confirmNewPass) {
      result = updateUserPassword(newPass, currPass);
    }
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.resetPassword}>
        <b>Reset Password</b>
      </label>
      <input
        className={styles.input}
        type="password"
        placeholder="Enter current password"
        value={currPass}
        onChange={handleCurrPassChange}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Enter new password"
        value={newPass}
        onChange={handleNewPassChange}
      />
      <div className={styles.buttonContainer}>
        <input
          className={styles.input}
          type="password"
          placeholder="Confirm new password"
          value={confirmNewPass}
          onChange={handleConfirmNewPassChange}
        />
        <ResetButton />
      </div>
    </form>
  );
}
