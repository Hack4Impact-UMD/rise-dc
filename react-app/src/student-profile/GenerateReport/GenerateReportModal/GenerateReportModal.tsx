import { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../../../components/ModalWrapper/Modal";
import styles from "./GenerateReportModal.module.css";

type reportModalType = {
  open: boolean;
  onClose: any;
  id: string;
};

const GenerateReportModal = ({ open, onClose, id }: reportModalType) => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const navigate = useNavigate();
  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClose()}
    >
      <>
        <div className={styles.header}>
          <button
            className={styles.close}
            onClick={() => {
              handleOnClose();
            }}
          >
            &#x2715;
          </button>
          <div className={styles.title}> Generate Report</div>
        </div>
        <div className={styles.content}>
          <input
            type="date"
            className={styles.date}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <div className={styles.submit}>to</div>
          <input
            type="date"
            className={styles.date}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <button
              className={styles.yesButton}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleOnClose();
                navigate(
                  `../indivreport/${id}/${startDate?.replaceAll(
                    "-",
                    ""
                  )}${endDate?.replaceAll("-", "")}`
                );
              }}
            >
              Generate Report!
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default GenerateReportModal;
