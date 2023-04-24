import styles from "./Statistics.module.css";

type statProp = {
  title: string;
  value: number;
};

export default function Statistics({ title, value }: statProp) {
  return (
    <div className={styles.statistic}>
      <p className={styles.value}>{value}</p>
      <p className={styles.title}>{title}</p>
    </div>
  );
}
