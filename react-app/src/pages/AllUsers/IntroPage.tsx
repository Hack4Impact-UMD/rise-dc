import { useState } from "react";
import styles from "./IntroPage.module.css";
import AllUsers from "./AllUsers";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar title="Users" />
      </div>
      <div className={styles.body}>
        {" "}
        <button
          className={styles.button}
          onClick={() => navigate("../students")}
        >
          View Students
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("../teachers")}
        >
          View Teachers
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
