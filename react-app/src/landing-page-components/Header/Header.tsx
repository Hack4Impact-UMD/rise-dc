import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.circle}></span>
      <div className = {styles.welcome_container}>
        <h1 className={styles.text}>Welcome back,</h1>
        <h1 className={styles.text}>name!</h1>
        <p className={styles.role}>role</p>
      </div>
    </div>
  );
};

export default Header;
