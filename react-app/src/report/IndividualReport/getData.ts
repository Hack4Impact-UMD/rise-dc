import {
  countHIWeeks,
  getLogsByTimeframe,
  getStudentWithID,
} from "../../backend/FirestoreCalls";
import { Log } from "../../types/LogType";
import { IndividualSessionInformation, Week } from "./types";
import dayjs from "dayjs";
import { Student } from "../../types/StudentType";
import { DateTime } from "luxon";

const getDates = (givenDates: String) => {
  const startDate = givenDates?.substring(0, 8);
  const endDate = givenDates?.substring(8);
  if (
    givenDates.length != 16 ||
    startDate == undefined ||
    endDate == undefined
  ) {
    return { startDate: new Date(), endDate: new Date(), dateError: true };
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
    // "T00:00:00Z";

    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const tz = new Intl.DateTimeFormat("en-GB", {
    //   timeZone: timeZone,
    //   timeZoneName: "short",
    // }).format(new Date());

    // const diff = tz.split("GMT")[1];
    // // 4 is subtracted so that all times are converted to EST
    // const offset = parseInt(diff, 10) - 4;
    // const offsetMins = offset * 60;

    const startOffset = new Date(
      new Date(modifiedStart).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    ).getTimezoneOffset();
    const endOffset = new Date(
      new Date(modifiedEnd).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    ).getTimezoneOffset();
    const startLetter = startOffset == 240 ? "4" : "5";
    const endLetter = endOffset == 240 ? "4" : "5";
    const trueStart = new Date(
      new Date(modifiedStart + `T00:00:00-0${startLetter}:00`).toLocaleString(
        "en-US",
        { timeZone: "America/New_York" }
      )
    );
    const trueEnd = new Date(
      new Date(modifiedEnd + `T00:00:00-0${endLetter}:00`).toLocaleString(
        "en-US",
        { timeZone: "America/New_York" }
      )
    );

    return {
      startDate: trueStart,
      endDate: trueEnd,
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

export default async function getData(student: Student, dateRange: String) {
  const allStudents: Set<String> = new Set();

  const allSessions: IndividualSessionInformation = {
    dateRange: { startDate: new Date(), endDate: new Date() },
    total_sessions: 0,
    high_impact: 0,
    high_impact_weeks: 0,
    total_minutes: 0,
    math_minutes: 0,
    english_minutes: 0,
    science_minutes: 0,
    social_studies_minutes: 0,
    humanities_minutes: 0,
    weeks: [],
  };
  let error = false;
  const { startDate, endDate, dateError } = getDates(dateRange);
  if (dateError) {
    return { information: allSessions, error: true };
  }

  await getLogsByTimeframe(student, startDate!, endDate!)
    .then((result) => {
      console.log(result);
      if (result.length == 0) {
        error = true;
      } else {
        allSessions.dateRange = { startDate, endDate };
        let week: Week = { highImpact: false, startDate: new Date(), logs: [] };
        let lastSunday: string = "";
        result.forEach((log) => {
          if (week.logs.length == 0) {
            const hi = DateTime.fromSeconds(log.date.seconds).setZone(
              "America/New_York"
            );
            const day = hi.weekday % 7;
            const other = hi.minus({ days: day });
            console.log(hi.toISO());
            lastSun = other.toLocaleString();
          }
          allSessions.total_sessions += 1;
          if (log.duration_minutes >= 30) {
            allSessions.high_impact += 1;
          }
          allSessions.total_minutes += log.duration_minutes;
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
        });
      }
    })
    .catch((error) => {
      error = true;
    });

  return { information: allSessions, error };
}
