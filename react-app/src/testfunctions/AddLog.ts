import { storeLog } from "../backend/FirestoreCalls";
import { Log, Subject } from "../types/LogType";

function randomDate(start: Date, end: Date) {
  return new Date(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleString("en-US", { timeZone: "America/New_York" })
  );
}
export default function addLog() {
  for (let i = 0; i < 365; i++) {
    const sampleLog: Log = {
      date: "",
      duration_minutes: 0,
      instructor_name: "a",
      reason: "MATH",
      creator_id: "None",
      subject: "MATH",
      summary: "Basic Summary",
      type: "MENTOR",
      student_id: "a",
      start_time: "0",
      end_time: "0",
    };
    const studentIDs = [
      "1dOQrfrLIxf4dhreYHCb",
      "4U5ZrWCZyDtEEbBYGkix",
      "8FtLgKJ0eu0ryo82XpdD",
      "GdYt554rayekAkwW0hF6",
    ];
    const subjects: Subject[] = [
      "MATH",
      "ENGLISH",
      "SOCIAL STUDIES",
      "HUMANITIES/OTHER",
      "SCIENCE",
    ];
    const instructors: {
      name: string;
      type: "TUTOR" | "MENTOR";
      id: string;
    }[] = [
      {
        name: "Jacob Lane",
        type: "MENTOR",
        id: "y1MxXeVUmBUEFd2oqbS1v7sVxx93",
      },
      { name: "Test Tutor", type: "TUTOR", id: "bc5yUrZvGebUmXsROrcl9wW3WDm1" },
    ];
    const startDate = new Date("2022-01-01T00:00:00-05:00");
    const endDate = new Date("2022-12-31T11:59:59-05:00");
    const randomDay = randomDate(startDate, endDate);
    const duration = Math.floor(Math.random() * 360);
    const instructor = instructors[Math.floor(Math.random() * 2)];
    const subject: Subject = subjects[Math.floor(Math.random() * 5)];
    const student = studentIDs[Math.floor(Math.random() * 4)];
    sampleLog.date = "";
    sampleLog.duration_minutes = duration;
    sampleLog.instructor_name = instructor.name;
    sampleLog.reason = subject;
    sampleLog.creator_id = instructor.id;
    sampleLog.subject = subject;
    sampleLog.type = instructor.type;
    sampleLog.student_id = student;
    sampleLog.start_time = randomDay.getTime().toString();
    sampleLog.end_time = new Date(
      new Date(randomDay.getTime() + duration * 60000).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    ).toTimeString();
    storeLog(sampleLog);
  }
}
