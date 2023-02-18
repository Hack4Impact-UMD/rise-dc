import { useState } from "react";
import styles from "./GenerateReport.module.css";
import GenerateReportModal from "./GenerateReportModal/GenerateReportModal";
import notebook from "./notebook.svg";

const GenerateReport = () => {
  const [openGenerateModal, setOpenGenerateModal] = useState<boolean>(false);
  return (
    <>
      <button
        className={styles.container}
        onClick={() => setOpenGenerateModal(!openGenerateModal)}
      >
        <img
          src={notebook}
          className={styles.notebook}
          alt="Notebook Image"
        ></img>
        <div className={styles.text}>Generate Report</div>
        <GenerateReportModal
          open={openGenerateModal}
          onClose={() => {
            setOpenGenerateModal(!openGenerateModal);
          }}
        />
      </button>
    </>
  );
};

export default GenerateReport;
