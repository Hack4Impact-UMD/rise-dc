import styles from "./Header.module.css";

type sessionHeaderProp = {
  title: string;
};

const Header = ({ title }: sessionHeaderProp) => {
  return <div className={styles.header}>{title}</div>;
};

export default Header;
