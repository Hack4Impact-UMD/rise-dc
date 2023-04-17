import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentID } from "../../types/StudentType";
import { getAllStudents } from "../../backend/FirestoreCalls";
import Navbar from "../../navbar/Navbar";
import StudentInfo from "./StudentInfo/StudentInfo";
import styles from "./SearchPage.module.css";
import Loading from "../../components/LoadingScreen/Loading";
import add from "../../assets/Add.svg";
import down from "../../assets/downArrow.svg";

export default function SearchPage() {
  const [students, setStudents] = useState<Array<Partial<StudentID>>>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(50);
  let currCount = 0;
  let leftOver = 0;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllStudents()
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => setFailure(true))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    navigate("/createstudent");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar title="Students" />
      </div>
      <div className={styles.body}>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.whiteBackground}>
            {failure ? (
              <div className={styles.failureMessage}>
                {" "}
                {students.length == 0
                  ? "No students have been added"
                  : "Error fetching students. Please try again later."}{" "}
              </div>
            ) : (
              <div className={styles.displayHorizontal}>
                <div className={styles.topLine}>
                  <input
                    className={styles.searchBar}
                    name="email"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      currCount = 0;
                      leftOver = 0;
                    }}
                  />
                  <button className={styles.elementButton} onClick={handleAdd}>
                    <img
                      className={styles.addImage}
                      src={add}
                      alt="Add student"
                    />
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
                    if (student?.name!.match(`^${search}`)) {
                      if (currCount < limit) {
                        currCount++;
                        return (
                          <StudentInfo
                            key={currCount}
                            name={student?.name!}
                            id={student?.id}
                          />
                        );
                      } else {
                        leftOver++;
                      }
                    }
                  })
                )}
                {leftOver > 0 ? (
                  <button
                    className={styles.viewMore}
                    onClick={() => setLimit(limit + 50)}
                  >
                    <img
                      className={styles.addImage}
                      src={down}
                      alt="Add student"
                    />
                    View More
                  </button>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
