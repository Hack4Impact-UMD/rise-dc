import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "../types/StudentType";
import { getAllStudents } from "../backend/FirestoreCalls";
import Navbar from "../navbar/Navbar";
import StudentInfo from "./StudentInfo/StudentInfo";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [failure, setFailure] = useState<string>("false");

  const navigate = useNavigate();
  useEffect(() => {
    const loadStudents = async () => {
      /* Loading is set in here, so that on state change, it remains false */
      setLoading(true);
      await getAllStudents()
        .then((result) => {
          setStudents(result);
        })
        .catch((error) => setFailure(error));
      setLoading(false);
    };
    loadStudents();
  }, []);

  const handleAdd = () => {
    // fix this
    navigate("/createstudent");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar title="Students" />
      </div>
      <div className={styles.body}>
        {loading ? (
          <div className={styles.spinner}> </div>
        ) : (
          <div className={styles.whiteBackground}>
            {failure != "false" ? (
              <div className={styles.failureMessage}> {failure} </div>
            ) : (
              <div className={styles.displayHorizontal}>
                <div className={styles.topLine}>
                  <input
                    className={styles.searchBar}
                    name="email"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className={styles.elementButton} onClick={handleAdd}>
                    Add Student
                  </button>
                </div>
                {students.length == 0 ? (
                  <div className={styles.failureMessage}>
                    {" "}
                    There are no students{" "}
                  </div>
                ) : (
                  students.map((student) => {
                    return (
                      <>
                        {student?.name.match(`^${search}`) ? (
                          <StudentInfo name={student?.name} id={student?.id} />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
