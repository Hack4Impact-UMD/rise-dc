import { ConsoleWriter } from "istanbul-lib-report";
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
              let used_name = studentName;
              if (studentName.length > 20) {
                let names = studentName.split(" ");
                names = names.filter((name) => name.length > 0);
                if (names.length == 1) {
                  used_name = studentName.substring(0, 40);
                } else if (names.length == 2) {
                  used_name =
                    names[0].substring(0, 20) + " " + names[1].substring(0, 20);
                } else if (names.length == 3) {
                  used_name =
                    names[0].substring(0, 19) +
                    " " +
                    names[1].substring(0, 1) +
                    ". " +
                    names[2].substring(0, 19);
                } else {
                  used_name = "";
                  const avg = (40 - names.length) / names.length;
                  names.forEach((name) => {
                    used_name = used_name.concat(" ", name.substring(0, avg));
                  });
                }
              }
              return (
                <div className={styles.row}>
                  <p>{used_name}</p>
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
              let used_name = studentName;
              if (studentName.length > 20) {
                let names = studentName.split(" ");
                names = names.filter((name) => name.length > 0);
                if (names.length == 1) {
                  used_name = studentName.substring(0, 40);
                } else if (names.length == 2) {
                  used_name =
                    names[0].substring(0, 20) + " " + names[1].substring(0, 20);
                } else if (names.length == 3) {
                  used_name =
                    names[0].substring(0, 19) +
                    " " +
                    names[1].substring(0, 1) +
                    ". " +
                    names[2].substring(0, 19);
                } else {
                  used_name = "";
                  const avg = (40 - names.length) / names.length;
                  names.forEach((name) => {
                    used_name = used_name.concat(" ", name.substring(0, avg));
                  });
                }
              }
              return (
                <div className={styles.row}>
                  <p>{used_name}</p>
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
