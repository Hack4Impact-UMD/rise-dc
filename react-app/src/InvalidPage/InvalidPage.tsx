import styles from "./InvalidPage.module.css";

const InvalidPage: React.FC<any> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.numbers}>404</div>
        <div className={styles.page}>PAGE NOT FOUND</div>
      </div>
    </div>
  );
};
export default InvalidPage;
