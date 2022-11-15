import styles from "./Statistics.module.css";

type statProp = {
  title: string;
  value: number;
};

export default function Statistics({ title, value }: statProp) {
  return (
    <div className={styles.statistic}>
      <h1>{value}</h1>
      <h2>{title}</h2>
    </div>
  );
}
