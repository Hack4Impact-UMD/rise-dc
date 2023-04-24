import { useState } from "react";
import notebook from "../../../assets/notebook.svg";
import styles from "./Report.module.css";
import GenerateReport from "../GenerateReportModal/GenerateReport";

const Report = () => {
  const [reportModal, setReportModal] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <button className={styles.report} onClick={() => setReportModal(true)}>
        <img src={notebook} alt="Notebook" className={styles.image} />
        <p> Generate Report</p>
      </button>
      <GenerateReport
        open={reportModal}
        onClose={() => setReportModal(false)}
      />
    </div>
  );
};

export default Report;
