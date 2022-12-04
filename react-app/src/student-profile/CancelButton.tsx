import React from "react";
import styles from "./StudentCreation.module.css";

export default function CancelButton() {
  return (
    <button className={styles.cancelButton} type="submit">
      Cancel
    </button>
  );
}
