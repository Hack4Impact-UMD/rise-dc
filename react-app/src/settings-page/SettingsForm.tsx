import styles from "./AdminSettingsPage.module.css";
import ResetButton from "./ResetButton";
import FormInput from "./FormInput";

export default function SettingsForm() {
  return (
    <div className={styles.form}>
      <h4 className={styles.profile}>Profile</h4>
      <form>
        <label className={styles.resetEmail}>
          <b>Reset Email</b>
        </label>
        <div className={styles.buttonContainer}>
          <FormInput
            className={styles.input}
            name="email"
            placeholder="Enter email address"
          />
          <ResetButton />
        </div>
        <label className={styles.resetPassword}>
          <b>Reset Password</b>
        </label>
        <FormInput
          className={styles.input}
          name="email"
          placeholder="Enter current password"
        />
        <FormInput
          className={styles.input}
          name="email"
          placeholder="Enter new password"
        />
        <div className={styles.buttonContainer}>
          <FormInput
            className={styles.input}
            name="email"
            placeholder="Confirm new password"
          />
          <ResetButton />
        </div>
      </form>
    </div>
  );
}
