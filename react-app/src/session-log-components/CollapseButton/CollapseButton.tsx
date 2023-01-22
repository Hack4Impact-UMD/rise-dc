import { Dispatch, SetStateAction } from "react";
import styles from "./CollapseButton.module.css";

type collapseFunction = {
  collapse: boolean;
  setCollapse: any;
  logs: number;
};

const CollapseButton = ({ collapse, setCollapse, logs }: collapseFunction) => {
  return (
    <button
      className={styles.collapse}
      onClick={() => setCollapse(!collapse)}
      style={logs == 0 ? { visibility: "hidden" } : {}}
    >
      <p> {collapse ? "Expand All" : "Collapse All"} </p>
    </button>
  );
};

export default CollapseButton;
