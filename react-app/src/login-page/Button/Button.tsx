import React from "react";
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
    <button
      className={styles.loginBtn}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {isDisabled ? <div className={styles.spinner}></div> : text}
    </button>
  );
};

export default LoginButton;
