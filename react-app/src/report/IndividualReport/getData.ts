import {
  countHIWeeks,
  getLogsByTimeframe,
  getStudentWithID,
} from "../../backend/FirestoreCalls";
import { Log } from "../../types/LogType";
import { IndividualSessionInformation, Week } from "./types";
import { Student } from "../../types/StudentType";
import { DateTime } from "luxon";

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

export default async function getData(student: Student, dateRange: String) {
  const allStudents: Set<String> = new Set();

  const allSessions: IndividualSessionInformation = {
    dateRange: { startDate: "", endDate: "" },
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
      if (result.length == 0) {
        error = true;
      } else {
        allSessions.dateRange = { startDate, endDate };
        let week: Week = { highImpact: false, startDate: "", logs: [] };
        let lastSunday: string = "";
        let weeklyMin = 0;
        result.forEach((log) => {
          const date = DateTime.fromSQL(log.date, { zone: "GMT" });
          const sunday = date.minus({ days: date.weekday % 7 });
          const formattedSunday = sunday!.toISO()!.split("T")[0];
          if (formattedSunday != lastSunday) {
            if (lastSunday != "") {
              allSessions.weeks.push(week);
            }
            week = { highImpact: false, startDate: "", logs: [] };
            week.startDate = formattedSunday;
            lastSunday = formattedSunday;
          }
          week.logs.push(log);
          weeklyMin += log.duration_minutes;
          if (weeklyMin >= 90 && !week.highImpact) {
            week.highImpact = true;
            allSessions.high_impact_weeks += 1;
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
    .catch((e) => {
      error = true;
    });

  return { information: allSessions, error };
}

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
