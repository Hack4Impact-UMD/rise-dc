import React from "react";
import styles from "./AdminSettingsPage.module.css";
import SettingsForm from "./SettingsForm";

export default function MentorTutorSettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div> {/* Inset Navbar Here */}
      <div className={styles.body}>
        <div className={styles.background}>
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
