import { useState, useEffect} from "react";
import Header from "./Header/Header";
import ContactInformation from "./ContactInformation/ContactInformation";
import styles from "./StudentProfile.module.css";
import GuardianInformation from "./GuardianInformation/GuardianInformation";
import GradeInformation from "./GradeInformation/GradeInformation";
import Forms from "./Forms/Forms";
import { calculateBackoffMillis } from "@firebase/util";
import { TypeFlags } from "typescript";
import NavBar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
import { getStudentWithID } from "../backend/FirestoreCalls";
import { Student } from "../types/StudentType";


const StudentProfile = () => {
  
  const studentId = useParams().id;
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if(studentId) {
      getStudentWithID(studentId).then((student) => {
        setStudent({...student, id:studentId})
        console.log(student)
      }).catch((e) => console.log(e))
    }
  }, [])

  return (
    <div className={styles.profile}>
      <div className={styles.header}>{<NavBar title={student?.name || ""}></NavBar>}</div>
      <div className={styles.profileContent}>
        <ContactInformation
          student={student}
        />
        <GuardianInformation
          student={student}
        />
        <div className={styles.gradesAndForms}>
          {student ? <GradeInformation student={student}/> : ""}
          <Forms student={student}/>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
