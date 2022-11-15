import styles from "./AdminSettingsPage.module.css";
import SettingsForm from "./SettingsForm";
import ResetButton from "./ResetButton";
import FormInput from "./FormInput";
import AddButton from "./AddButton";

export default function AdminSettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div> {/* Inset Navbar Here */}
      <div className={styles.body}>
        <div className={styles.background}>
          <SettingsForm />
          <div className={styles.formSecond}>
            <h4 className={styles.profile}>Admin</h4>
            <form className={styles.adminForm}>
              <label className={styles.resetPassword}>
                <b>Add New Mentor</b>
              </label>
              <FormInput
                className={styles.input}
                name="email"
                placeholder="Enter mentor's name"
              />
              <div className={styles.buttonContainer}>
                <FormInput
                  className={styles.input}
                  name="email"
                  placeholder="Enter mentor's email address"
                />
                <AddButton />
              </div>
              <label className={styles.resetPassword}>
                <b>Add New Tutor</b>
              </label>
              <FormInput
                className={styles.input}
                name="email"
                placeholder="Enter tutor's name"
              />
              <div className={styles.buttonContainer}>
                <FormInput
                  className={styles.input}
                  name="email"
                  placeholder="Enter tutor's email address"
                />
                <AddButton />
              </div>
              <label className={styles.resetPassword}>
                <b>Add New Administrator</b>
              </label>
              <FormInput
                className={styles.input}
                name="email"
                placeholder="Enter administrator's name"
              />
              <div className={styles.buttonContainer}>
                <FormInput
                  className={styles.input}
                  name="email"
                  placeholder="Enter administrator's email address"
                />
                <AddButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
