import React from "react";
import styles from "./StudentCreation.module.css";

export default function SaveButton() {
  return (
    <button className={styles.saveButton} type="submit">
      Save
    </button>
  );
}
