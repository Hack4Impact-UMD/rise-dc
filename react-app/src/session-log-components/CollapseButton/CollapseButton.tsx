import { Dispatch, SetStateAction } from "react";
import "./CollapseButton.css";

type collapseFunction = {
  collapse: boolean;
  setCollapse: Dispatch<SetStateAction<boolean>>;
};

const CollapseButton = ({ collapse, setCollapse }: collapseFunction) => {
  return (
    <button
      className="session-collapse-all"
      onClick={() => setCollapse(!collapse)}
    >
      <p> {collapse ? "Expand All" : "Collapse All"} </p>
    </button>
  );
};

export default CollapseButton;
