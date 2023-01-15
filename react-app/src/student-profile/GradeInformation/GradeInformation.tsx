import { useState, useEffect } from "react";
import { updateStudent } from "../../backend/FirestoreCalls";
import { Student } from "../../types/StudentType";
import styles from "./GradeInformation.module.css";

interface Props {
  student: Student
}

const GradeInformation = ({student} : Props) => {
  const blankStudent = {
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
      science_after: ""
    },
    guardian_email: "",
    guardian_name: "",
    guardian_phone: "",
    high_school: "",
    name: "",
    phone_number: "",
    reading_level: ""
  }
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<Student>(student || blankStudent);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    if (edit) saveStudent()
    setEdit(!edit);
  };

  useEffect(() => {
    setData(student || blankStudent)
  }, [student])

  const saveStudent = () => {
      updateStudent(data).catch((e) => console.log(e))
  }

  return (
    <div className={styles.gradeInfo}>
      <div className={styles.topLine}>
        <h2 className={styles.title}>Grades</h2>
        <div className={styles.editButtons}>
          <button className={styles.edit} onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </button>
          {edit ?
          <button className={styles.cancel} onClick={() => {setData(student || blankStudent); setEdit(false)}}>
            Cancel
          </button>
          : ""
          }
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>Reading Comprehension</div>
          <select
            className={styles.reason}
            disabled={!edit}
            value={data.reading_level}
            onChange={(e) =>
              {setData({...data, reading_level: e.target.value})}
            }
          >
            {edit ? (
              <>
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
              </>
            ) : (
              <option value={data.reading_level}>{data.reading_level}</option>
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
              <div className={styles.informationText}>
                Math
              </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.math_before}
                  onChange={(e) => {setData({...data, grades: {...data.grades, math_before: e.target.value}})}}
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
                  {data.grades.math_before}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.math_after}
                  onChange={(e) => {setData({...data, grades: {...data.grades, math_after: e.target.value}})}}
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
                  {data.grades.math_after}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
              <div className={styles.informationText}>
                English
              </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.english_before}
                  onChange={(e) => {setData({...data, grades: {...data.grades, english_before: e.target.value}})}}
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
                  {data.grades.english_before}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.english_after}
                  onChange={(e) => {setData({...data, grades: {...data.grades, english_after: e.target.value}})}}
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
                  {data.grades.english_after}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
              <div className={styles.informationText}>
                Science
              </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.science_before}
                  onChange={(e) => {setData({...data, grades: {...data.grades, science_before: e.target.value}})}}
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
                  {data.grades.science_before}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.science_after}
                  onChange={(e) => {setData({...data, grades: {...data.grades, science_after: e.target.value}})}}
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
                  {data.grades.science_after}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
              <div className={styles.informationText}>
                Social Studies
              </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.socialStudies_before}
                  onChange={(e) => {setData({...data, grades: {...data.grades, socialStudies_before: e.target.value}})}}
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
                  {data.grades.socialStudies_before}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.socialStudies_after}
                  onChange={(e) => {setData({...data, grades: {...data.grades, socialStudies_after: e.target.value}})}}
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
                  {data.grades.socialStudies_after}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.containerLines}>
          <div className={styles.lineLabel}>
              <div className={styles.informationText}>
                Humanities
              </div>
          </div>
          <div className={styles.gradeLabels}>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.humanities_before}
                  onChange={(e) => {setData({...data, grades: {...data.grades, humanities_before: e.target.value}})}}
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
                  {data.grades.humanities_before}
                </div>
              )}
            </div>
            <div className={styles.informationText}>
              {edit ? (
                <select
                  className={styles.reason}
                  disabled={!edit}
                  value={data.grades.humanities_after}
                  onChange={(e) => {setData({...data, grades: {...data.grades, humanities_after: e.target.value}})}}
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
                  {data.grades.humanities_after}
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
