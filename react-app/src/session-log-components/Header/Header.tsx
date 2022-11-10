import styles from "./Header.module.css";

type sessionHeaderProp = {
  title: string;
};

const Header = ({ title }: sessionHeaderProp) => {
  return <div className={styles.header}>{title}'s Logs</div>;
};

export default Header;
