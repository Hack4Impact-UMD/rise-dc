import { useState } from "react";
import Modal from "../../../components/ModalWrapper/Modal";
import styles from "./GenerateReport.module.css";
import { useNavigate } from "react-router-dom";

type modalType = {
  open: boolean;
  onClose: any;
  id?: string;
};

const GenerateReport = ({ open, onClose, id }: modalType) => {
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const navigate = useNavigate();

  const handleOnClose = () => {
    onClose();
    setStartDate("");
    setEndDate("");
  };

  function handleSubmit() {
    if (startDate == "" || endDate == "") {
      setError("*Fields Are Required");
    } else if (startDate > endDate) {
      setError("*Start Date Must Happen Before End Date");
    } else {
      const dates = startDate.replaceAll("-", "") + endDate.replaceAll("-", "");
      id
        ? navigate(`/indivreport/${id}/${dates}`)
        : navigate(`/timereport/${dates}`);
    }
  }

  return (
    <Modal
      open={open}
      onClose={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClose()}
    >
      <>
        <div className={styles.header}>
          <p className={styles.headerText}> Select Report Time </p>
          <button
            className={styles.close}
            onClick={() => {
              handleOnClose();
            }}
          >
            &#x2715;
          </button>
        </div>
        <p className={styles.error}>{error}</p>
        <div className={styles.content}>
          <input
            type="date"
            value={startDate}
            className={styles.dateEdit}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <p className={styles.contentText}>to</p>
          <input
            type="date"
            value={endDate}
            className={styles.dateEdit}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <button
              className={styles.submitButton}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSubmit();
              }}
            >
              Generate Report
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default GenerateReport;
