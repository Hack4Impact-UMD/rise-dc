/* hi*/
import { Dispatch, SetStateAction } from "react";
import styles from "./CollapseButton.module.css";

type collapseFunction = {
  collapse: boolean;
  setCollapse: Dispatch<SetStateAction<boolean>>;
};

const CollapseButton = ({ collapse, setCollapse }: collapseFunction) => {
  return (
    <button className={styles.collapse} onClick={() => setCollapse(!collapse)}>
      <p> {collapse ? "Expand All" : "Collapse All"} </p>
    </button>
  );
};

export default CollapseButton;
