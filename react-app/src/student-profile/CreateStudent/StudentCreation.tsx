import { useState } from "react";
import Header from "../Header/Header";
import styles from "./StudentCreation.module.css";
import guardianStyles from "./NewGuardianInformation.module.css";
import contactStyles from "./NewContactInformation.module.css";
import gradeStyles from "./NewGradesInformation.module.css";


import NewForms from "../NewForms/NewForms";
import { calculateBackoffMillis } from "@firebase/util";
import { TypeFlags } from "typescript";
import NavBar from "../../navbar/Navbar";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import { Student, StudentFile, Grades } from "../../types/StudentType";
import { storeStudent, updateStudent } from "../../backend/FirestoreCalls";
type GuardianInformationProp = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
};
type ContactInformationProp = {
  address: string;
  email: string;
  phoneNumber: string;
  highSchool: string;
  grade: string;
};
const StudentCreation = () => {

  const [information, setInformation] = useState<string>(
    "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [guardianInfo, setGuardianInfo] = useState<GuardianInformationProp>({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [contactInfo, setContactInfo] = useState<ContactInformationProp>({
    address: "",
    email: "",
    phoneNumber: "",
    highSchool: "",
    grade: "",
  });

  const [gradesInfo, setGradesInfo] = useState({
    reading: "Select Level",
    subjects: {
      GradeOne: { name: "Select Subject", starting: "Grade", ending: "Grade" },
      GradeTwo: { name: "Select Subject", starting: "Grade", ending: "Grade" },
      GradeThree: { name: "Select Subject", starting: "Grade", ending: "Grade" },
    },
  });

  const handleChangeGradeName = (
    e: React.ChangeEvent<HTMLSelectElement>,
    grade: number
  ) => {
    let copySubjects = gradesInfo.subjects;
    if (grade === 1) {
      copySubjects["GradeOne"]["name"] = e.target.value;
    } else if (grade == 2) {
      copySubjects["GradeTwo"]["name"] = e.target.value;
    } else {
      copySubjects["GradeThree"]["name"] = e.target.value;
    }
    setGradesInfo({
      ...gradesInfo,
      subjects: copySubjects,
    });
  };

  const handleChangeGradeValue = (
    e: React.ChangeEvent<HTMLSelectElement>,
    grade: number,
    position: number
  ) => {
    let copySubjects = gradesInfo.subjects;
    if (grade === 1) {
      if (position === 1) {
        copySubjects["GradeOne"]["starting"] = e.target.value;
      } else {
        copySubjects["GradeOne"]["ending"] = e.target.value;
      }
    } else if (grade == 2) {
      if (position === 1) {
        copySubjects["GradeTwo"]["starting"] = e.target.value;
      } else {
        copySubjects["GradeTwo"]["ending"] = e.target.value;
      }
    } else {
      if (position === 1) {
        copySubjects["GradeThree"]["starting"] = e.target.value;
      } else {
        copySubjects["GradeThree"]["ending"] = e.target.value;
      }
    }
    setGradesInfo({
      ...gradesInfo,
      subjects: copySubjects,
    });
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
          placeholder="Enter student name"
        ></input>

        <div className={contactStyles.contactInfo}>
          <div className={contactStyles.topLine}>
            <h2 className={contactStyles.title}>Student Information</h2>
          </div>
          <div className={contactStyles.container}>
            <div className={contactStyles.containerLines}>
              <div className={contactStyles.lineLabel}>Address</div>
              <input
                type="text"
                className={contactStyles.informationEdit}
                value={contactInfo.address}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, address: e.target.value })
                }
                placeholder="Enter new address here"
              ></input>
            </div>
            <div className={contactStyles.containerLines}>
              <div className={contactStyles.lineLabel}>Email</div>
              <input
                type="text"
                className={contactStyles.informationEdit}
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                placeholder="Enter new email here"
              ></input>
            </div>
            <div className={contactStyles.containerLines}>
              <div className={contactStyles.lineLabel}>Phone Number</div>
              <input
                type="text"
                className={contactStyles.informationEdit}
                value={contactInfo.phoneNumber}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phoneNumber: e.target.value })
                }
                placeholder="Enter new phone number here"
              ></input>
            </div>
            <div className={contactStyles.containerLines}>
              <div className={contactStyles.lineLabel}>High School</div>
              <input
                type="text"
                className={contactStyles.informationEdit}
                value={contactInfo.highSchool}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, highSchool: e.target.value })
                }
                placeholder="Enter new high school here"
              ></input>
            </div>
            <div className={`${contactStyles.bottomLine} ${contactStyles.containerLines}`}>
              <div className={contactStyles.lineLabel}>Grade Level</div>
              <input
                type="text"
                className={contactStyles.informationEdit}
                value={contactInfo.grade}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, grade: e.target.value })
                }
                placeholder="Enter new grade level here"
              ></input>
            </div>
          </div>
        </div>

        <div className={guardianStyles.guardianInfo}>
          <div className={guardianStyles.topLine}>
            <h2 className={guardianStyles.title}>Guardian Information</h2>
          </div>
          <div className={guardianStyles.container}>
            <div className={guardianStyles.containerLines}>
              <div className={guardianStyles.lineLabel}>Name</div>
              <input
                type="text"
                className={guardianStyles.informationEdit}
                value={guardianInfo.name}
                onChange={(e) =>
                  setGuardianInfo({ ...guardianInfo, name: e.target.value })
                }
                placeholder="Enter name here"
              ></input>
            </div>
            <div className={guardianStyles.containerLines}>
              <div className={guardianStyles.lineLabel}>Address</div>
              <input
                type="text"
                className={guardianStyles.informationEdit}
                value={guardianInfo.address}
                onChange={(e) =>
                  setGuardianInfo({ ...guardianInfo, address: e.target.value })
                }
                placeholder="Enter new address here"
              ></input>
            </div>
            <div className={guardianStyles.containerLines}>
              <div className={guardianStyles.lineLabel}>Email</div>
              <input
                type="text"
                className={guardianStyles.informationEdit}
                value={guardianInfo.email}
                onChange={(e) =>
                  setGuardianInfo({ ...guardianInfo, email: e.target.value })
                }
                placeholder="Enter new email here"
              ></input>
            </div>
            <div className={`${guardianStyles.bottomLine} ${guardianStyles.containerLines}`}>
              <div className={guardianStyles.lineLabel}>Phone Number</div>
              <input
                type="text"
                className={guardianStyles.informationEdit}
                value={guardianInfo.phoneNumber}
                onChange={(e) =>
                  setGuardianInfo({ ...guardianInfo, phoneNumber: e.target.value })
                }
                placeholder="Enter new phone number here"
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.gradesAndForms}>
          <div className={gradeStyles.gradeInfo}>
            <div className={gradeStyles.topLine}>
              <h2 className={gradeStyles.title}>Grades Information</h2>
              <div className={gradeStyles.editButtons}>
              </div>
            </div>
            <div className={gradeStyles.container}>
              <div className={gradeStyles.containerLines}>
                <div className={gradeStyles.lineLabel}>Reading Comprehension</div>
                <select
                  className={gradeStyles.reason}
                  value={gradesInfo.reading}
                  onChange={(e) =>
                    setGradesInfo({ ...gradesInfo, reading: e.target.value })
                  }
                >
                  (
                  <>
                    <option className={gradeStyles.selectOption} value="N/A">
                      Select Level
                    </option>
                    <option className={gradeStyles.selectOption} value="10th Grade">
                      10th Grade
                    </option>
                    <option className={gradeStyles.selectOption} value="11th Grade">
                      11th Grade
                    </option>
                    <option className={gradeStyles.selectOption} value="12th Grade">
                      12th Grade
                    </option>
                  </>
                  )
                </select>
              </div>
              <div className={gradeStyles.containerLines}>
                <div className={gradeStyles.lineLabel}></div>
                <div className={gradeStyles.gradeLabels}>
                  <div className={gradeStyles.informationText}> Starting </div>
                  <div className={gradeStyles.informationText}> Ending </div>
                </div>
              </div>
              <div className={gradeStyles.containerLines}>
                <div className={gradeStyles.lineLabel}>
                  <select
                    className={gradeStyles.reason}
                    value={gradesInfo.subjects["GradeOne"]["name"]}
                    onChange={(e) => handleChangeGradeName(e, 1)}
                  >
                    <>
                      <option className={gradeStyles.selectOption} value="N/A">
                        Select Subject
                      </option>
                      <option className={gradeStyles.selectOption} value="Math">
                        Math
                      </option>
                      <option className={gradeStyles.selectOption} value="History">
                        History
                      </option>{" "}
                      <option className={gradeStyles.selectOption} value="Science">
                        Science
                      </option>{" "}
                    </>
                  </select>
                </div>
                <div className={gradeStyles.gradeLabels}>
                  <div className={gradeStyles.informationText}>

                    <select
                      className={gradeStyles.reason}
                      value={gradesInfo.subjects["GradeOne"]["starting"]}
                      onChange={(e) => handleChangeGradeValue(e, 1, 1)}
                    >
                      <>
                        <option className={gradeStyles.selectOption} value="N/A">
                          Grade
                        </option>
                        <option className={gradeStyles.selectOption} value="A">
                          A
                        </option>
                        <option className={gradeStyles.selectOption} value="B">
                          B
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="C">
                          C
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="D">
                          D
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="F">
                          F
                        </option>{" "}
                      </>
                    </select>

                  </div>
                  <div className={gradeStyles.informationText}>

                    <select
                      className={gradeStyles.reason}
                      value={gradesInfo.subjects["GradeOne"]["ending"]}
                      onChange={(e) => handleChangeGradeValue(e, 1, 2)}
                    >
                      <>
                        <option className={gradeStyles.selectOption} value="N/A">
                          Grade
                        </option>
                        <option className={gradeStyles.selectOption} value="A">
                          A
                        </option>
                        <option className={gradeStyles.selectOption} value="B">
                          B
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="C">
                          C
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="D">
                          D
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="F">
                          F
                        </option>{" "}
                      </>
                    </select>

                  </div>
                </div>
              </div>
              <div className={gradeStyles.containerLines}>
                <div className={gradeStyles.lineLabel}>
                  <select
                    className={gradeStyles.reason}
                    value={gradesInfo.subjects["GradeTwo"]["name"]}
                    onChange={(e) => handleChangeGradeName(e, 2)}
                  >
                    <>
                      <option className={gradeStyles.selectOption} value="N/A">
                        Select Subject
                      </option>
                      <option className={gradeStyles.selectOption} value="Math">
                        Math
                      </option>
                      <option className={gradeStyles.selectOption} value="History">
                        History
                      </option>{" "}
                      <option className={gradeStyles.selectOption} value="Science">
                        Science
                      </option>{" "}
                    </>
                  </select>
                </div>
                <div className={gradeStyles.gradeLabels}>
                  <div className={gradeStyles.informationText}>
                    <select
                      className={gradeStyles.reason}
                      value={gradesInfo.subjects["GradeTwo"]["starting"]}
                      onChange={(e) => handleChangeGradeValue(e, 2, 1)}
                    >
                      <>
                        <option className={gradeStyles.selectOption} value="N/A">
                          Grade
                        </option>
                        <option className={gradeStyles.selectOption} value="A">
                          A
                        </option>
                        <option className={gradeStyles.selectOption} value="B">
                          B
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="C">
                          C
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="D">
                          D
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="F">
                          F
                        </option>{" "}
                      </>
                    </select>

                  </div>
                  <div className={gradeStyles.informationText}>
                    <select
                      className={gradeStyles.reason}
                      value={gradesInfo.subjects["GradeTwo"]["ending"]}
                      onChange={(e) => handleChangeGradeValue(e, 2, 2)}
                    >
                      <>
                        <option className={gradeStyles.selectOption} value="N/A">
                          Grade
                        </option>
                        <option className={gradeStyles.selectOption} value="A">
                          A
                        </option>
                        <option className={gradeStyles.selectOption} value="B">
                          B
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="C">
                          C
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="D">
                          D
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="F">
                          F
                        </option>{" "}
                      </>
                    </select>
                  </div>
                </div>
              </div>
              <div className={gradeStyles.containerLines}>
                <div className={gradeStyles.lineLabel}>
                  <select
                    className={gradeStyles.reason}
                    value={gradesInfo.subjects["GradeThree"]["name"]}
                    onChange={(e) => handleChangeGradeName(e, 3)}
                  >
                    <>
                      <option className={gradeStyles.selectOption} value="N/A">
                        Select Subject
                      </option>
                      <option className={gradeStyles.selectOption} value="Math">
                        Math
                      </option>
                      <option className={gradeStyles.selectOption} value="History">
                        History
                      </option>{" "}
                      <option className={gradeStyles.selectOption} value="Science">
                        Science
                      </option>{" "}
                    </>
                  </select>
                </div>
                <div className={gradeStyles.gradeLabels}>
                  <div className={gradeStyles.informationText}>
                    <select
                      className={gradeStyles.reason}
                      value={gradesInfo.subjects["GradeThree"]["starting"]}
                      onChange={(e) => handleChangeGradeValue(e, 3, 1)}
                    >
                      <>
                        <option className={gradeStyles.selectOption} value="N/A">
                          Grade
                        </option>
                        <option className={gradeStyles.selectOption} value="A">
                          A
                        </option>
                        <option className={gradeStyles.selectOption} value="B">
                          B
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="C">
                          C
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="D">
                          D
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="F">
                          F
                        </option>{" "}
                      </>
                    </select>

                  </div>
                  <div className={gradeStyles.informationText}>
                    <select
                      className={gradeStyles.reason}
                      value={gradesInfo.subjects["GradeThree"]["ending"]}
                      onChange={(e) => handleChangeGradeValue(e, 3, 2)}
                    >
                      <>
                        <option className={gradeStyles.selectOption} value="N/A">
                          Grade
                        </option>
                        <option className={gradeStyles.selectOption} value="A">
                          A
                        </option>
                        <option className={gradeStyles.selectOption} value="B">
                          B
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="C">
                          C
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="D">
                          D
                        </option>{" "}
                        <option className={gradeStyles.selectOption} value="F">
                          F
                        </option>{" "}
                      </>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
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