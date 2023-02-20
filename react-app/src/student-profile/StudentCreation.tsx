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
import { storeStudent, updateStudent } from "../backend/FirestoreCalls";
import {Student, Grades} from "../types/StudentType";

const StudentCreation = () => {

  const [information, setInformation] = useState<string>(
      "Enter a student name");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // create new student and update it with the inputed information from the user using functions from firestoreCalls.tsx
  const saveStudent = () => {
   
  };


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
          ></input>
        <NewContactInformation
          address="Enter address"
          email="Enter email"
          phoneNumber="Enter phone number"
          highSchool="Enter High School"
          grade="Enter 11"
        />
        <NewGuardianInformation
          name="Enter name"
          address="Enter address"
          email="Enter email"
          phoneNumber="Enter phone number"
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
            saveStudent();
          }}
        />
          <CancelButton></CancelButton>
        </div>
      </div>
    </div>
  );
};

export default StudentCreation;