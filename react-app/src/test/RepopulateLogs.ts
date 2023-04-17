import { getAllLogs, storeLog, updateLog } from "../backend/FirestoreCalls";
import { DateTime } from "luxon";
import { Log, Subject } from "../types/LogType";

export const repopulateLogs = async () => {
  let i = 0;
  while (i < 200) {
    i = i + 1;
    const date = new Date(
      new Date(2020, 0, 1).getTime() +
        Math.random() *
          (new Date(2020, 11, 31).getTime() - new Date(2020, 0, 1).getTime())
    )
      .toISOString()
      .split("T")[0];
    const duration_minutes = Math.floor(Math.random() * 360) + 1;
    const instructors = ["Test Tutor", "Jacob Lane"];
    const instructor_name = instructors[Math.floor(Math.random() * 2)];
    const reason = "Sample Reason";
    const creator_id =
      instructor_name == "Test Tutor"
        ? "bc5yUrZvGebUmXsROrcl9wW3WDm1"
        : "y1MxXeVUmBUEFd2oqbS1v7sVxx93";
    const subjects = [
      "ENGLISH",
      "MATH",
      "SOCIAL STUDIES",
      "HUMANITIES/OTHER",
      "SCIENCE",
    ];
    const subject = subjects[Math.floor(Math.random() * 5)] as Subject;
    const summary = "Sample Summary";
    const type = instructor_name == "Test Tutor" ? "TUTOR" : "MENTOR";
    const student_ids = [
      "1dOQrfrLIxf4dhreYHCb",
      "3uEz8Tm8PSaeDoRqC3zJ",
      "4U5ZrWCZyDtEEbBYGkix",
      "8FtLgKJ0eu0ryo82XpdD",
      "GdYt554rayekAkwW0hF6",
    ];
    const student_id = student_ids[Math.floor(Math.random() * 5)];
    const start_time_total = Math.floor(Math.random() * 1440);
    const end_time_total = (start_time_total + duration_minutes) % 1440;
    const start_time =
      Math.floor(start_time_total / 60) + ":" + (start_time_total % 60);
    const end_time =
      Math.floor(end_time_total / 60) + ":" + (end_time_total % 60);
    const log: Log = {
      date,
      duration_minutes,
      instructor_name,
      reason,
      creator_id,
      subject,
      summary,
      type,
      student_id,
      start_time,
      end_time,
    };
    await storeLog(log);
    console.log(i);
  }
};

export const updateLogs = async () => {
  getAllLogs().then(async (result) => {
    console.log(result.length);
    const updates: { log: Log; id: string }[] = [];
    result.map((logID) => {
      const curr_log = logID.log;
      const id = logID.id;
      let updated = 0;
      if (curr_log?.start_time?.length < 5) {
        const substrings = curr_log.start_time.split(":");
        const first = substrings[0];
        const seconds = substrings[1];
        const new_first = first.length < 2 ? "0" + first : first;
        const new_seconds = seconds.length < 2 ? "0" + seconds : seconds;
        const new_start = new_first + ":" + new_seconds;
        curr_log.start_time = new_start;
        updated += 1;
      }
      if (curr_log?.end_time?.length < 5) {
        const end_substrings = curr_log.end_time.split(":");
        const end_first = end_substrings[0];
        const end_seconds = end_substrings[1];
        const end_new_first =
          end_first.length < 2 ? "0" + end_first : end_first;
        const end_new_seconds =
          end_seconds.length < 2 ? "0" + end_seconds : end_seconds;
        const end_new_start = end_new_first + ":" + end_new_seconds;
        curr_log.end_time = end_new_start;
        updated += 1;
      }
      if (updated != 0) {
        updates.push({ log: curr_log, id: id });
      }
    });
    for (var i = 0; i < updates.length; i++) {
      const update = updates[i];
      await updateLog(update.log, update.id);
      console.log("updated");
    }
  });
};
