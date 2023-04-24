import person from "../../../assets/person.svg";
import notepad from "../../../assets/notepad.svg";
import notebook from "../../../assets/notebook.svg";
import styles from "./Students.module.css";
import { StudentID } from "../../../types/StudentType";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenerateReport from "../GenerateReportModal/GenerateReport";

interface Props {
  students: Partial<StudentID>[];
}

const Students = ({ students }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.title}> Most Active Students </p>
      {students.length == 0 ? (
        <div className={styles.noStudents}>
          No Students Exist For This Timeframe
        </div>
      ) : (
        students.map((student) => {
          return <Student currStudent={student} />;
        })
      )}
      <></>
    </div>
  );
};

const Student = ({ currStudent }: { currStudent: Partial<StudentID> }) => {
  const [report, setReport] = useState<boolean>(false);
  return (
    <div className={styles.student} key={currStudent.name}>
      <h1 className={styles.studentName}>
        {currStudent?.name!.substring(0, 80)}
      </h1>
      <div className={styles.icons}>
        <button className={styles.button} onClick={() => setReport(true)}>
          <img src={notebook} className={styles.icon} alt="Generate Report" />
        </button>
        <a href={`/log/${currStudent.id}`} className={styles.button}>
          <img src={notepad} className={styles.icon} alt="View Logs" />
        </a>
        <a href={`/profile/${currStudent.id}`} className={styles.button}>
          <img src={person} className={styles.icon} alt="View Profile" />
        </a>
      </div>
      <GenerateReport
        open={report}
        onClose={() => setReport(false)}
        id={currStudent?.id!}
      />
    </div>
  );
};

export default Students;
