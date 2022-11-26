import React, { useEffect, useState } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  handleClick: VoidFunction;
}

export const LoginButton: React.FC<ButtonProps> = ({
  text,
  isDisabled,
  handleClick,
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleClick();
      }}
    >
      <button className={styles.loginBtn} disabled={isDisabled}>
        {isDisabled ? <div className={styles.spinner}></div> : text}
      </button>
    </form>
  );
};

export default LoginButton;
