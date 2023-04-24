import { useState, useEffect } from "react";
import Header from "./Header/Header";
import RecentLogs from "./RecentLogs/RecentLogs";
import Statistics from "./Statistics/Statistics";
import Students from "./Students/Students";
import Calendar from "./Calendar/Calendar";
import NavBar from "../../navbar/Navbar";
import styles from "./Landing.module.css";
import {
  getLogsTimeframe,
  getStudentWithID,
  getUserWithID,
} from "../../backend/FirestoreCalls";
import { RISEUser } from "../../types/UserType";
import { Log } from "../../types/LogType";
import { Student, StudentID } from "../../types/StudentType";
import Loading from "../../components/LoadingScreen/Loading";
import { useAuth } from "../../auth/AuthProvider";
import Report from "./Report/Report";
import { DateTime } from "luxon";

type LandingInfo = {
  recentLogs: Log[];
  students: Partial<StudentID>[];
  numTutors: number;
  numMentors: number;
  numStudents: number;
  numSessions: number;
  dateString: string;
};

const Landing = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<RISEUser>();
  const [landingInfo, setLandingInfo] = useState<Partial<LandingInfo>>({});
  const [dates, setDate] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  useEffect(() => {
    setLoading(true);
    const backendCalls = async () => {
      const userID = auth.user?.uid;
      if (!userID) {
        setError(true);
        setLoading(false);
        return;
      }
      await getUserWithID(userID)
        .then(async (users) => {
          setUser(users[0]);
          let startDate: string, endDate: string;
          if (dates.start == "" || dates.end == "") {
            const today = DateTime.now();
            const lastMonth = today.minus({ days: 30 });
            endDate = today.toISO()?.split("T")[0]!;
            startDate = lastMonth.toISO()?.split("T")[0]!;
          } else {
            startDate = dates.start;
            endDate = dates.end;
          }
          await getLogsTimeframe(startDate!, endDate!)
            .then(async (logs) => {
              const reversedLogs = logs.reverse();
              let students: Map<string, number> = new Map();
              let numTutors = new Set();
              let numMentors = new Set();
              logs.forEach((log) => {
                const appearedTimes = students.get(log.student_id) ?? 0;
                students.set(
                  log.student_id,
                  appearedTimes + log.duration_minutes
                );
                log.type == "MENTOR"
                  ? numMentors.add(log.creator_id)
                  : numTutors.add(log.creator_id);
              });
              const sortedStudents = Array.from(students.entries()).sort(
                (a, b) => b[1] - a[1]
              );
              const slicedArray = sortedStudents.slice(0, 4);
              let activeStudents: Partial<StudentID>[] = [];
              const promises: Promise<Student>[] = [];
              slicedArray.map(async (stud) => {
                activeStudents.push({ id: stud[0] });
                promises.push(getStudentWithID(stud[0]));
              });
              await Promise.all(promises)
                .then((result) => {
                  for (let i = 0; i < result.length; i++) {
                    const studentInfo = result[i];
                    const studentID = activeStudents[i].id!;
                    // Files are set to an empty array to avoid slowing down the client by storing extra information
                    const fullStudent: StudentID = {
                      ...studentInfo,
                      id: studentID,
                      files: [],
                    };
                    activeStudents[i] = fullStudent;
                  }
                })
                .catch((e) => {
                  setError(true);
                  activeStudents = [];
                });
              const dateString =
                startDate.substring(5, 7) +
                "/" +
                startDate.substring(8) +
                "/" +
                startDate.substring(0, 4) +
                " - " +
                endDate.substring(5, 7) +
                "/" +
                endDate.substring(8) +
                "/" +
                endDate.substring(0, 4);
              let displayedLogs = reversedLogs.slice(0, 4);
              if (user?.type != "ADMIN") {
                displayedLogs = reversedLogs
                  .filter((log) => log.instructor_name == user?.name)
                  .slice(0, 4);
              }
              const information = {
                recentLogs: displayedLogs,
                students: activeStudents,
                numTutors: numTutors.size,
                numMentors: numMentors.size,
                numStudents: sortedStudents.length,
                numSessions: reversedLogs.length,
                dateString: dateString,
              };
              setLandingInfo(information);
            })
            .catch((e) => {
              console.log(startDate);
              console.log(endDate);
              setError(true);
              console.log(e);
            });
        })
        .catch((e) => setError(true))
        .finally(() => setLoading(false));
    };
    if (!auth.loading) {
      backendCalls();
    }
  }, [auth.loading, dates]);

  return (
    <div className={styles.landing}>
      <NavBar title=""></NavBar>
      {loading ? (
        <div className={styles.loadingDiv}>
          <Loading />
        </div>
      ) : error ? (
        <div className={styles.error}>
          Error fetching data. Please try again later.
        </div>
      ) : (
        <>
          <Header name={user?.name || ""} role={user?.type || ""} />
          <div className={styles.content}>
            <div className={styles.calendar}>
              <Calendar
                dates={landingInfo.dateString}
                onDateChange={(dates: any) => setDate(dates)}
              />
              {user?.type == "ADMIN" ? <Report /> : <></>}
            </div>
            <div className={styles.statistics}>
              <Statistics
                title="Sessions Conducted"
                value={landingInfo.numSessions || 0}
              />
              <Statistics
                title="Students Participating"
                value={landingInfo.numStudents || 0}
              />
              <Statistics
                title="Mentors Participating"
                value={landingInfo.numMentors || 0}
              />
              <Statistics
                title="Tutors Participating"
                value={landingInfo.numTutors || 0}
              />
            </div>
            <div className={styles.logsRow}>
              <RecentLogs logs={landingInfo.recentLogs || []} />
            </div>
            <Students students={landingInfo.students || []} />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
