import styles from "./Header.module.css";
import NavBar from '../../navbar/Navbar'

type sessionHeaderProp = {
  title: string;
};

const Header = ({ title }: sessionHeaderProp) => {
  return <div className={styles.header}>{<NavBar title={title}></NavBar>}</div>;
};

export default Header;
