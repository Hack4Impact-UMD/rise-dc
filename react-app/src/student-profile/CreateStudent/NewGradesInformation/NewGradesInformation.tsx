import { Student } from "../../../types/StudentType";
import styles from "./NewGradesInformation.module.css";

const NewGradesInformation: React.FC<{
  sharedStudent: Student;
  setSharedStudent: any;
}> = ({ sharedStudent, setSharedStudent }) => {
  return (
    <div className={styles.gradeInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Grades</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Reading Comprehension</div>
          <>
            <select
              className={styles.reason}
              value={sharedStudent.reading_level}
              onChange={(e) => {
                setSharedStudent({
                  ...sharedStudent,
                  reading_level: e.target.value,
                });
              }}
            >
              <option className={styles.selectOption} value=""></option>
              <option className={styles.selectOption} value="1st Grade">
                1st Grade
              </option>
              <option className={styles.selectOption} value="2nd Grade">
                2nd Grade
              </option>
              <option className={styles.selectOption} value="3rd Grade">
                3rd Grade
              </option>
              <option className={styles.selectOption} value="4th Grade">
                4th Grade
              </option>
              <option className={styles.selectOption} value="5th Grade">
                5th Grade
              </option>
              <option className={styles.selectOption} value="6th Grade">
                6th Grade
              </option>
              <option className={styles.selectOption} value="7th Grade">
                7th Grade
              </option>
              <option className={styles.selectOption} value="8th Grade">
                8th Grade
              </option>
              <option className={styles.selectOption} value="9th Grade">
                9th Grade
              </option>
              <option className={styles.selectOption} value="10th Grade">
                10th Grade
              </option>
              <option className={styles.selectOption} value="11th Grade">
                11th Grade
              </option>
              <option className={styles.selectOption} value="12th Grade">
                12th Grade
              </option>
            </select>
          </>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}></div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>Starting </div>
            <div className={styles.informationText}>Ending </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            <div className={`${styles.informationText} ${styles.startingText}`}>
              Math
            </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.math_before}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      math_before: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.math_after}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      math_after: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            <div className={`${styles.informationText} ${styles.startingText}`}>
              English
            </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.english_before}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      english_before: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.english_after}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      english_after: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            <div className={`${styles.informationText} ${styles.startingText}`}>
              Science
            </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.science_before}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      science_before: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.science_after}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      science_after: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            <div className={`${styles.informationText} ${styles.startingText}`}>
              Social Studies
            </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.socialStudies_before}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      socialStudies_before: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.socialStudies_after}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      socialStudies_after: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
          </div>
        </div>
        <div className={`${styles.containerLines} ${styles.lastLine}`}>
          <div className={styles.lineLabel}>
            <div className={`${styles.informationText} ${styles.startingText}`}>
              Humanities
            </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.humanities_before}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      humanities_before: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
            <div className={styles.informationText}>
              <select
                className={styles.reason}
                value={sharedStudent.grades.humanities_after}
                onChange={(e) => {
                  setSharedStudent({
                    ...sharedStudent,
                    grades: {
                      ...sharedStudent.grades,
                      humanities_after: e.target.value,
                    },
                  });
                }}
              >
                <>
                  <option className={styles.selectOption} value=""></option>
                  <option className={styles.selectOption} value="A">
                    A
                  </option>
                  <option className={styles.selectOption} value="B">
                    B
                  </option>{" "}
                  <option className={styles.selectOption} value="C">
                    C
                  </option>{" "}
                  <option className={styles.selectOption} value="D">
                    D
                  </option>{" "}
                  <option className={styles.selectOption} value="F">
                    F
                  </option>{" "}
                </>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGradesInformation;
