import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentID } from "../../types/StudentType";
import { getAllStudents, getUsers } from "../../backend/FirestoreCalls";
import Navbar from "../../navbar/Navbar";
import UserInfo from "./UserInfo/UserInfo";
import styles from "./AllUsers.module.css";
import Loading from "../../components/LoadingScreen/Loading";
import add from "../../assets/Add.svg";
import down from "../../assets/downArrow.svg";
import { RISEUser } from "../../types/UserType";

type Mode = {
  mode: "STUDENTS" | "TEACHERS";
};

export default function AllUsers({ mode }: Mode) {
  type desired = typeof mode extends "STUDENTS" ? StudentID : RISEUser;
  const [users, setUsers] = useState<Array<Partial<desired>>>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(50);
  let currCount = 0;
  let leftOver = 0;

  const navigate = useNavigate();
  const backendCall =
    mode == "STUDENTS" ? () => getAllStudents() : () => getUsers();
  useEffect(() => {
    setLoading(true);
    backendCall()
      .then((result) => {
        setUsers(result);
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
        <Navbar title={mode == "STUDENTS" ? "Students" : "Teachers"} />
      </div>
      <div className={styles.body}>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.whiteBackground}>
            {failure ? (
              <div className={styles.failureMessage}>
                {" "}
                {users.length == 0
                  ? `No ${mode.toLowerCase()} have been added`
                  : `Error fetching ${mode.toLowerCase()}. Please try again later.`}
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
                  {mode == "STUDENTS" ? (
                    <button
                      className={styles.elementButton}
                      onClick={handleAdd}
                    >
                      <img
                        className={styles.addImage}
                        src={add}
                        alt="Add student"
                      />
                      Add Student
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                {users.length == 0 ? (
                  <div className={styles.failureMessage}>
                    There are no {mode.toLowerCase()}.
                  </div>
                ) : (
                  users.map((user) => {
                    if (
                      user
                        ?.name!.toLowerCase()
                        .match(`^${search.toLowerCase()}`)
                    ) {
                      if (currCount < limit) {
                        currCount++;
                        return (
                          <UserInfo
                            key={currCount}
                            name={user?.name!}
                            id={user?.id!}
                            mode={mode}
                            type={user?.type}
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
                      alt="View More"
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
