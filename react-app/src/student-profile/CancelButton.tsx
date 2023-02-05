import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./StudentCreation.module.css";

export default function CancelButton() {
  return (
    <NavLink to="/search" end>
      <button className={styles.cancelButton} type="submit">
        Cancel
      </button>
    </NavLink>
  );
}
