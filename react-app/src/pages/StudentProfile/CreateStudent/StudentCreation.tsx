import { useState } from "react";
import styles from "./StudentCreation.module.css";
import NavBar from "../../../navbar/Navbar";
import { Student } from "../../../types/StudentType";
import NewContactInformation from "./NewContactInformation/NewContactInformation";
import NewGuardianInformation from "./NewGuardianInformation/NewGuardianInformation";
import NewGradesInformation from "./NewGradesInformation/NewGradesInformation";
import NewForms from "./NewForms/NewForms";
import ClearButton from "./ClearButton/ClearButton";
import SaveButton from "./SaveButton/SaveButton";

const StudentCreation = () => {
  const [requireName, setRequireName] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);

  const blankStudent: Student = {
    address: "",
    email: "",
    grade_level: "",
    grades: {
      english_before: "",
      english_after: "",
      humanities_before: "",
      humanities_after: "",
      socialStudies_before: "",
      socialStudies_after: "",
      math_before: "",
      math_after: "",
      science_before: "",
      science_after: "",
    },
    guardian_email: "",
    guardian_name: "",
    guardian_phone: "",
    guardian_address: "",
    high_school: "",
    name: "",
    phone_number: "",
    reading_level: "",
    files: [],
    active: true,
  };

  const [student, setStudent] = useState<Student>(blankStudent);

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        {<NavBar title="New Student"></NavBar>}
      </div>

      <div className={styles.profileContent}>
        <input
          type="text"
          className={`${styles.informationEdit} ${
            requireName ? styles.redName : ""
          }`}
          value={student.name}
          onChange={(e) => {
            setRequireName(false);
            setStudent({ ...student, name: e.target.value });
          }}
          placeholder="Enter student name"
        ></input>

        <NewContactInformation
          sharedStudent={student}
          setSharedStudent={setStudent}
        />
        <NewGuardianInformation
          sharedStudent={student}
          setSharedStudent={setStudent}
        />
        <div className={styles.gradesAndForms}>
          <NewGradesInformation
            sharedStudent={student}
            setSharedStudent={setStudent}
          />
          <NewForms files={files} setFiles={setFiles} />
        </div>

        <div className={styles.buttons}>
          <button
            onClick={() => {
              if (student.name != "") {
                setOpenSaveModal(!openSaveModal);
              } else {
                window.scrollTo(0, 0);
                setRequireName(true);
              }
            }}
            className={styles.saveButton}
          >
            Save
          </button>
          <SaveButton
            open={openSaveModal}
            onClose={() => setOpenSaveModal(!openSaveModal)}
            data={student}
            files={files}
          />
          <button
            onClick={() => setOpenCancelModal(!openCancelModal)}
            className={styles.clearButton}
          >
            Clear
          </button>
          <ClearButton
            open={openCancelModal}
            onClose={() => setOpenCancelModal(!openCancelModal)}
            resetInfo={() => {
              setStudent(blankStudent);
              setOpenCancelModal(!openCancelModal);
              setFiles([]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCreation;
