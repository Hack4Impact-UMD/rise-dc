import React from "react";
import styles from "./AdminSettingsPage.module.css";
import SettingsForm from "./SettingsForm";
import NavBar from "../navbar/Navbar";

export default function MentorTutorSettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div> {<NavBar title = "Settings"></NavBar>}
      <div className={styles.body}>
        <div className={styles.background}>
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
