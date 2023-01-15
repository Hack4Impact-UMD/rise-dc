import styles from "./ImpactTutoring.module.css";

type TutoringRepProps = {
  highImpact: String[];
  lowImpact: String[];
};

const ImpactTutoring = (props: TutoringRepProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.containerInner}>
          <h2 className={styles.mainText}>
            Students Receiving High-Impact Tutoring
          </h2>
          <div className={styles.students}>
            {props.highImpact.map((studentName) => {
              return (
                <div className={styles.row}>
                  <p>{studentName}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.containerInner}>
          <h2 className={styles.mainText}>
            Students Not Receiving High-Impact Tutoring
          </h2>
          <div className={styles.students}>
            {props.lowImpact.map((studentName) => {
              return (
                <div className={styles.row}>
                  <p>{studentName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactTutoring;
