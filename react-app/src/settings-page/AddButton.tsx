import styles from "./AdminSettingsPage.module.css";

export default function ResetButton(props: any) {
  return (
    <button className={styles.resetButton} type="submit" name={props.name}>
            Add
    </button>
  );
}
