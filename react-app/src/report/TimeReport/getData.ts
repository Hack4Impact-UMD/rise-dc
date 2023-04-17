import { nextTick } from "process";
import {
  countHIWeeks,
  getLogsTimeframe,
  getStudentWithID,
} from "../../backend/FirestoreCalls";
import { Log } from "../../types/LogType";
import { SessionInformation } from "./types";

const getDates = (givenDates: String) => {
  const startDate = givenDates?.substring(0, 8);
  const endDate = givenDates?.substring(8);
  if (startDate == undefined || endDate == undefined || endDate.length != 8) {
    return { startDate: "", endDate: "", dateError: true };
  } else {
    const modifiedStart =
      startDate?.substring(0, 4) +
      "-" +
      startDate?.substring(4, 6) +
      "-" +
      startDate?.substring(6);

    const modifiedEnd =
      endDate?.substring(0, 4) +
      "-" +
      endDate?.substring(4, 6) +
      "-" +
      endDate?.substring(6);

    return {
      startDate: modifiedStart,
      endDate: modifiedEnd,
      dateError: false,
    };
  }
};

const filterStudents = async (students: Map<string, Log[]>) => {
  const high_impact_students: String[] = [];
  const low_impact_students: String[] = [];
  const student_ids: string[] = [];
  let error = false;

  students.forEach((value, key) => {
    student_ids.push(key);
  });
  for (const key of student_ids) {
    error = false;
    const student_name: String = await getStudentWithID(key)
      .then((result) => {
        return result.name;
      })
      .catch((err) => {
        error = true;
        return "";
      });
    if (error) {
      console.log(`Error getting the student name for student with id ${key}`);
    } else {
      const logs = students.get(key);
      const high_imp_weeks = countHIWeeks(logs!);
      if (high_imp_weeks >= 10) {
        high_impact_students.push(student_name);
      } else {
        low_impact_students.push(student_name);
      }
    }
  }

  return { high_impact_students, low_impact_students };
};

export const getData = async (dateRange: String) => {
  const allStudents: Set<String> = new Set();

  const allSessions: SessionInformation = {
    dateRange: { startDate: "", endDate: "" },
    total_sessions: 0,
    high_impact: 0,
    mentor: {
      names: new Set(),
      time: 0,
    },
    students: new Map(),
    high_impact_students: [],
    low_impact_students: [],
    tutor: {
      names: new Set(),
      time: 0,
    },
    math_minutes: 0,
    english_minutes: 0,
    science_minutes: 0,
    social_studies_minutes: 0,
    humanities_minutes: 0,
  };
  let error = false;
  const { startDate, endDate, dateError } = getDates(dateRange);

  if (dateError) {
    error = true;
  } else {
    await getLogsTimeframe(startDate!, endDate!)
      .then((result) => {
        if (result.length == 0) {
          error = true;
        } else {
          allSessions.dateRange = { startDate, endDate };
          result.forEach((log) => {
            allSessions.total_sessions += 1;
            if (log.duration_minutes >= 30) {
              allSessions.high_impact += 1;
            }
            const type = log.type === "MENTOR" ? "mentor" : "tutor";
            const subject = log.subject.toString();
            allSessions[type].time += log.duration_minutes;
            allSessions[type].names.add(log.instructor_name);
            switch (log.subject) {
              case "MATH":
                allSessions.math_minutes += log.duration_minutes;
                break;
              case "ENGLISH":
                allSessions.english_minutes += log.duration_minutes;
                break;
              case "SCIENCE":
                allSessions.science_minutes += log.duration_minutes;
                break;
              case "SOCIAL STUDIES":
                allSessions.social_studies_minutes += log.duration_minutes;
                break;
              case "HUMANITIES/OTHER":
                allSessions.humanities_minutes += log.duration_minutes;
                break;
            }
            const curr_logs = allSessions.students.get(log.student_id);
            if (curr_logs != undefined) {
              curr_logs.push(log);
              allSessions.students.set(log.student_id, curr_logs);
            } else {
              allSessions.students.set(log.student_id, [log]);
            }
          });
        }
      })
      .catch((error) => {
        error = true;
      });

    const { high_impact_students, low_impact_students } = await filterStudents(
      allSessions.students
    );

    allSessions.high_impact_students = high_impact_students;
    allSessions.low_impact_students = low_impact_students;
    return { information: allSessions, error };
  }
};

export const formatDate = (date: string): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[parseInt(date.split("-")[1]) - 1];
  const getEnding = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const ending = getEnding(parseInt(date.split("-")[2]));
  const finalDate =
    month +
    " " +
    parseInt(date.split("-")[2]) +
    ending +
    ", " +
    date.split("-")[0];
  return finalDate;
};
