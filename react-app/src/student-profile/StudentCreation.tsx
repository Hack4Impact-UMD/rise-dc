import { useState } from "react";
import Header from "./Header/Header";
import NewContactInformation from "./NewContactInformation/NewContactInformation";
import styles from "./StudentCreation.module.css";
import NewGuardianInformation from "./NewGuardianInformation/NewGuardianInformation";
import NewGradesInformation from "./NewGradesInformation/NewGradesInformation";
import NewForms from "./NewForms/NewForms";
import { calculateBackoffMillis } from "@firebase/util";
import { TypeFlags } from "typescript";
import NavBar from "../navbar/Navbar";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import {Student, StudentFile, Grades} from "../types/StudentType";
import {storeStudent, updateStudent} from "../backend/FirestoreCalls";
const StudentCreation = () => {

  const [information, setInformation] = useState<string>(
      "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [student, setStudent] = useState<Student>({
  //   address: "",
  //   email: string,
  //   grade_level: string,
  //   grades: Grades,
  //   files: StudentFile[],
  //   guardian_email: string,
  //   guardian_name: string,
  //   guardian_phone: string,
  //   high_school: string,
  //   name: string,
  //   phone_number: string,
  //   reading_level: string
  // });
        
  
  return (
    <div className={styles.profile}>
      <div className={styles.header}>{<NavBar title="New Student"></NavBar>}</div>

      <div className={styles.profileContent}>
      <input
            type="text"
            className={styles.informationEdit}
            value={information}
            onChange={(e) =>
              setInformation(e.target.value)
            }
            placeholder="Enter student name"
          ></input>
        <NewContactInformation
          address=""
          email=""
          phoneNumber=""
          highSchool=""
          grade=""
        />
        <NewGuardianInformation
          name=""
          address=""
          email=""
          phoneNumber=""
        />
        <div className={styles.gradesAndForms}>
          <NewGradesInformation />
          <NewForms />
        </div>
        <div className={styles.buttons}>
        <SaveButton
          text="Save"
          isDisabled={isLoading}
          handleClick={() => {
            setIsLoading(true);
            // createStudent();
          }}
        />
          <CancelButton></CancelButton>
        </div>
      </div>
    </div>
  );
};

export default StudentCreation;