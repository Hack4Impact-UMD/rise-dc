import React from "react";
import styles from "./SettingsPage.module.css";

type buttonClick = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ text, onClick }: buttonClick) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
