import { useState } from "react";
import Modal from "../../../../components/ModalWrapper/Modal";
import styles from "./TimeRange.module.css";
import { useNavigate } from "react-router-dom";

type modalType = {
  open: boolean;
  onClose: any;
  onChange: any;
};

const TimeRange = ({ open, onClose, onChange }: modalType) => {
  const [custom, setCustom] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleOnClose = () => {
    onClose();
    setCustom(false);
    setStartDate("");
    setEndDate("");
  };

  function handleSubmit() {
    if (startDate == "" || endDate == "") {
      setError("*Fields Are Required");
    } else if (startDate > endDate) {
      setError("*Start Date Must Happen Before End Date");
    } else {
      const dates = {
        start: startDate,
        end: endDate,
      };
      onChange(dates);
      onClose();
    }
  }
  return (
    <Modal
      open={open}
      onClose={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClose()}
    >
      <>
        <div className={styles.header}>
          <p className={styles.headerText}> Select Time Range</p>
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
        {!custom ? (
          <></>
        ) : (
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
        )}

        <div className={styles.actions}>
          <div className={styles.container}>
            {custom ? (
              <>
                <button
                  className={styles.submitButton}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleSubmit();
                  }}
                >
                  Change Time Range
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.submitButton}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    window.location.reload();
                  }}
                >
                  All Time
                </button>
                <button
                  className={styles.submitButton}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setCustom(true);
                  }}
                >
                  Set Custom Time Range
                </button>
              </>
            )}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default TimeRange;
