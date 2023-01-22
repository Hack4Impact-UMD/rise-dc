import { getLogsTimeframe } from "../../backend/FirestoreCalls";
import { SessionInformation } from "./types";
const getDates = (givenDates: String) => {
  const startDate = givenDates?.substring(0, 8);
  const endDate = givenDates?.substring(8);
  if (startDate == undefined || endDate == undefined || endDate.length != 8) {
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
    console.log(
      new Date(modifiedStart).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tz = new Intl.DateTimeFormat("en-GB", {
      timeZone: timeZone,
      timeZoneName: "short",
    }).format(new Date());

    const diff = tz.split("GMT")[1];
    const offset = parseInt(diff, 10);
    const offsetMins = offset * 60;

    return {
      startDate: new Date(
        new Date(modifiedStart).getTime() - offsetMins * 60000
      ),
      endDate: new Date(new Date(modifiedEnd).getTime() - offsetMins * 60000),
      dateError: false,
    };
  }
};

export default async function getData(dateRange: String) {
  const allStudents: Set<String> = new Set();

  const allSessions: SessionInformation = {
    dateRange: { startDate: new Date(), endDate: new Date() },
    total_sessions: 0,
    high_impact: 0,
    mentor: {
      names: [],
      time: 0,
    },
    students: new Map(),
    tutor: {
      names: [],
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
            allSessions[type].names.push(log.instructor_name);
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
              case "HUMANITIES":
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
    return { information: allSessions, error };
  }
}
