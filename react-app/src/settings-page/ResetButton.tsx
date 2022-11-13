import React from "react";
import styles from "./AdminSettingsPage.module.css";

export default function ResetButton() {
  return (
    <button className={styles.resetButton} type="submit">
      Reset
    </button>
  );
}
