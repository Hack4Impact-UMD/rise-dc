import React from "react";
import styles from "./Header.module.css";

interface headerProps {
  name: string;
  role: string;
}

const Header: React.FC<headerProps> = ({ name, role }) => {
  return (
    <div className={styles.header}>
      <span className={styles.circle}></span>
      <div className={styles.welcome_container}>
        <h1 className={styles.text}>Welcome back,</h1>
        <h1 className={styles.text}>{name}!</h1>
        <p className={styles.role}>
          {role.charAt(0) + role.substring(1).toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default Header;
