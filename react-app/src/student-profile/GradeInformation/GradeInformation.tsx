import { useState } from "react";
import styles from "./GradeInformation.module.css";

const GradeInformation = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const [information, setInformation] = useState({
    reading: "11th Grade",
    subjects: {
      GradeOne: { name: "Math", starting: "A", ending: "C" },
      GradeTwo: { name: "History", starting: "F", ending: "A" },
      GradeThree: { name: "Science", starting: "D", ending: "C" },
    },
  });

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEdit(!edit);
  };

  const handleChangeGradeName = (
    e: React.ChangeEvent<HTMLSelectElement>,
    grade: number
  ) => {
    let copySubjects = information.subjects;
    if (grade === 1) {
      copySubjects["GradeOne"]["name"] = e.target.value;
    } else if (grade == 2) {
      copySubjects["GradeTwo"]["name"] = e.target.value;
    } else {
      copySubjects["GradeThree"]["name"] = e.target.value;
    }
    setInformation({
      ...information,
      subjects: copySubjects,
    });
  };

  const handleChangeGradeValue = (
    e: React.ChangeEvent<HTMLSelectElement>,
    grade: number,
    position: number
  ) => {
    let copySubjects = information.subjects;
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
    setInformation({
      ...information,
      subjects: copySubjects,
    });
  };

  return (
    <div className={styles.gradeInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Guardian Information</h2>
        <div className={styles.editButtons}>
          <button className={styles.edit} onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Reading Comprehension</div>
          <select
            className={styles.reason}
            disabled={!edit}
            value={information.reading}
            onChange={(e) =>
              setInformation({ ...information, reading: e.target.value })
            }
          >
            {edit ? (
              <>
                <option className={styles.selectOption} value="10th Grade">
                  10th Grade
                </option>
                <option className={styles.selectOption} value="11th Grade">
                  11th Grade
                </option>
                <option className={styles.selectOption} value="12th Grade">
                  12th Grade
                </option>
              </>
            ) : (
              <option value={information.reading}>{information.reading}</option>
            )}
          </select>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}></div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}> Starting </div>
            <div className={styles.informationText}> Ending </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            {edit ? (
              <select
                className={styles.reason}
                disabled={!edit}
                value={information.subjects["GradeOne"]["name"]}
                onChange={(e) => handleChangeGradeName(e, 1)}
              >
                <>
                  <option className={styles.selectOption} value="Math">
                    Math
                  </option>
                  <option className={styles.selectOption} value="History">
                    History
                  </option>{" "}
                  <option className={styles.selectOption} value="Science">
                    Science
                  </option>{" "}
                </>
              </select>
            ) : (
              <div className={styles.informationText}>
                {information.subjects["GradeOne"]["name"]}
              </div>
            )}
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={information.subjects["GradeOne"]["starting"]}
                  onChange={(e) => handleChangeGradeValue(e, 1, 1)}
                >
                  <>
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
              ) : (
                <div className={styles.informationText}>
                  {information.subjects["GradeOne"]["starting"]}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={information.subjects["GradeOne"]["ending"]}
                  onChange={(e) => handleChangeGradeValue(e, 1, 2)}
                >
                  <>
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
              ) : (
                <div className={styles.informationText}>
                  {information.subjects["GradeOne"]["ending"]}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            {edit ? (
              <select
                className={styles.reason}
                disabled={!edit}
                value={information.subjects["GradeTwo"]["name"]}
                onChange={(e) => handleChangeGradeName(e, 2)}
              >
                <>
                  <option className={styles.selectOption} value="Math">
                    Math
                  </option>
                  <option className={styles.selectOption} value="History">
                    History
                  </option>{" "}
                  <option className={styles.selectOption} value="Science">
                    Science
                  </option>{" "}
                </>
              </select>
            ) : (
              <div className={styles.informationText}>
                {information.subjects["GradeTwo"]["name"]}
              </div>
            )}
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={information.subjects["GradeTwo"]["starting"]}
                  onChange={(e) => handleChangeGradeValue(e, 2, 1)}
                >
                  <>
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
              ) : (
                <div className={styles.informationText}>
                  {information.subjects["GradeTwo"]["starting"]}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={information.subjects["GradeTwo"]["ending"]}
                  onChange={(e) => handleChangeGradeValue(e, 2, 2)}
                >
                  <>
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
              ) : (
                <div className={styles.informationText}>
                  {information.subjects["GradeTwo"]["ending"]}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
            {edit ? (
              <select
                className={styles.reason}
                disabled={!edit}
                value={information.subjects["GradeThree"]["name"]}
                onChange={(e) => handleChangeGradeName(e, 3)}
              >
                <>
                  <option className={styles.selectOption} value="Math">
                    Math
                  </option>
                  <option className={styles.selectOption} value="History">
                    History
                  </option>{" "}
                  <option className={styles.selectOption} value="Science">
                    Science
                  </option>{" "}
                </>
              </select>
            ) : (
              <div className={styles.informationText}>
                {information.subjects["GradeThree"]["name"]}
              </div>
            )}
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={information.subjects["GradeThree"]["starting"]}
                  onChange={(e) => handleChangeGradeValue(e, 3, 1)}
                >
                  <>
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
              ) : (
                <div className={styles.informationText}>
                  {information.subjects["GradeThree"]["starting"]}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={information.subjects["GradeThree"]["ending"]}
                  onChange={(e) => handleChangeGradeValue(e, 3, 2)}
                >
                  <>
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
              ) : (
                <div className={styles.informationText}>
                  {information.subjects["GradeThree"]["ending"]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeInformation;
