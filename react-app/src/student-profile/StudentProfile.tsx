import { useState, useEffect } from "react";
import ContactInformation from "./ContactInformation/ContactInformation";
import styles from "./StudentProfile.module.css";
import GuardianInformation from "./GuardianInformation/GuardianInformation";
import GradeInformation from "./GradeInformation/GradeInformation";
import NavBar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
import { getStudentWithID } from "../backend/FirestoreCalls";
import { Student } from "../types/StudentType";
import Loading from "../loading-screen/Loading";
import Forms from "./Forms/Forms";
import GenerateReport from "./GenerateReport/GenerateReport";

const StudentProfile = () => {
  const studentId = useParams().id;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [student, setStudent] = useState<Student>();

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
  };

  useEffect(() => {
    if (studentId) {
      getStudentWithID(studentId)
        .then((student) => {
          let newStudent: Student = student || blankStudent;
          setStudent({ ...newStudent, id: studentId });
          console.log(newStudent);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.profile}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.header}>
            {<NavBar title={error ? "Student" : student?.name!}></NavBar>}
          </div>
          {error ? (
            <div className={styles.error}>
              Error fetching student data <br /> <br />
              Please make sure the student id is correct or try again later.
            </div>
          ) : (
            <div className={styles.profileContent}>
              <GenerateReport id={student?.id!} />
              <ContactInformation student={student} setStudent={setStudent} />
              <GuardianInformation student={student} setStudent={setStudent} />
              <div className={styles.gradesAndForms}>
                {student ? (
                  <GradeInformation student={student} setStudent={setStudent} />
                ) : (
                  ""
                )}
                {/* <Forms student={student} /> */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentProfile;
