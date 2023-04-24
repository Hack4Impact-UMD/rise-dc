import {
  doc,
  collection,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  orderBy,
  limit,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { getStorage, uploadBytes } from "firebase/storage";
import { Student, StudentFile, StudentID } from "../types/StudentType";
import { db } from "../config/firebase";
import { Log, LogID } from "../types/LogType";
import { RISEUser } from "../types/UserType";

import randomstring from "randomstring";
import app from "../config/firebase";

import { useAuth } from "../auth/AuthProvider";

export function getUsers(): Promise<RISEUser[]> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "Users"))
      .then((snap) => {
        const users: RISEUser[] = [];
        snap.docs.map((doc) => {
          const user = doc.data() as RISEUser;
          user.id = doc.id;
          users.push(user);
        });
        resolve(users);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

export function getUserWithID(id: string): Promise<RISEUser[]> {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, "Users"), where("firebase_id", "==", id));
    getDocs(q)
      .then((userSnap) => {
        if (userSnap.size > 0) {
          const users: RISEUser[] = [];
          userSnap.docs.map((user) => {
            let riseUser = user.data() as RISEUser;
            users.push(riseUser);
          });
          return resolve(users);
        } else {
          return reject(new Error("User not found"));
        }
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function getStudentWithID(id: string): Promise<StudentID> {
  return new Promise((resolve, reject) => {
    const studentRef = doc(db, "Students", id);
    getDoc(studentRef)
      .then((studentSnap) => {
        if (studentSnap.exists()) {
          let student = studentSnap.data() as Student;
          return resolve({ ...student, id: studentSnap.id });
        } else {
          return reject(new Error("Student not found"));
        }
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function getAllStudents(): Promise<Array<Partial<StudentID>>> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "Students"))
      .then((snap) => {
        const allStudents: Partial<StudentID>[] = [];
        const students = snap.docs.map((doc) => {
          let student: Student = doc.data() as Student;
          const partialStudent: Partial<StudentID> = {};
          partialStudent.name = student.name;
          partialStudent.id = doc.id;
          allStudents.push(partialStudent);
        });
        allStudents.sort((a, b) => (a.name! > b.name! ? 1 : -1));
        return resolve(allStudents);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function storeStudent(student: Student): Promise<string> {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, "Students"), student)
      .then((docRef) => {
        // return id of student added
        return resolve(docRef.id);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

// return all logs that have
export async function getStudentLogs(student_id: string): Promise<LogID[]> {
  const q = query(
    collection(db, "Logs"),
    where("student_id", "==", student_id)
  );
  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((querySnapshot) => {
        const log_objects: LogID[] = [];

        querySnapshot.docs.map((doc) => {
          log_objects.push({ id: doc.id, log: doc.data() as Log });
        });

        return resolve(log_objects);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function storeLog(log: Log): Promise<string> {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, "Logs"), log)
      .then((docRef) => {
        return resolve(docRef.id);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function deleteLog(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const logRef = doc(db, "Logs", id);
    deleteDoc(logRef)
      .then(() => {
        return resolve();
      })
      .catch((e) => {
        return reject();
      });
  });
}

export function updateStudent(student: StudentID): Promise<void> {
  return new Promise((resolve, reject) => {
    if (student.id) {
      const ref = doc(db, "Students", student.id);
      updateDoc(ref, {
        address: student.address,
        email: student.email,
        grade_level: student.grade_level,
        grades: {
          english_before: student.grades.english_before,
          english_after: student.grades.english_after,
          humanities_before: student.grades.humanities_before,
          humanities_after: student.grades.humanities_after,
          socialStudies_before: student.grades.socialStudies_before,
          socialStudies_after: student.grades.socialStudies_after,
          math_before: student.grades.math_before,
          math_after: student.grades.math_after,
          science_before: student.grades.science_before,
          science_after: student.grades.science_after,
        },
        guardian_email: student.guardian_email,
        guardian_name: student.guardian_name,
        guardian_phone: student.guardian_phone,
        high_school: student.high_school,
        name: student.name,
        phone_number: student.phone_number,
        reading_level: student.reading_level,
      })
        .then(() => {
          return resolve();
        })
        .catch((e) => {
          return reject(e);
        });
    } else {
      return reject("student missing id");
    }
  });
}

export function updateLog(log: Log, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (id) {
      const ref = doc(db, "Logs", id);
      updateDoc(ref, { ...log })
        .then(() => {
          return resolve();
        })
        .catch((e) => {
          return reject(e);
        });
    } else {
      return reject("Log missing id");
    }
  });
}

/* Takes dates in the form YYYY-MM-DD */
export function getLogsTimeframe(
  start: string,
  end: string
): Promise<Array<Log>> {
  const q = query(
    collection(db, "Logs"),
    where("date", ">=", start),
    where("date", "<=", end)
  );
  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((snap) => {
        const logs: Log[] = [];
        if (snap.size != 0) {
          const docs = snap.docs;
          docs.sort((a, b) => (a.data().date > b.data().date ? 1 : -1));
          docs.map((doc) => logs.push(doc.data() as Log));
        }
        return resolve(logs);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getRecentLogs(): Promise<Array<Log>> {
  return new Promise((resolve, reject) => {
    const logsRef = collection(db, "Logs");
    const logsQuery = query(logsRef, orderBy("date"), limit(5));

    getDocs(logsQuery)
      .then((snap) => {
        const docs = snap.docs;
        const logs: Log[] = [];

        const length = Math.min(5, docs.length);
        for (let i = 0; i < length; i++) {
          logs.push(docs[i].data() as Log);
        }
        return resolve(logs);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

// export function getStudentsAlphabetically(): Promise<Array<StudentID>> {
//   return new Promise((resolve, reject) => {
//     const studentsRef = collection(db, "Students");
//     const studentsQuery = query(studentsRef, orderBy("name"), limit(5));

//     getDocs(studentsQuery)
//       .then((snap) => {
//         const docs = snap.docs;
//         const students: StudentID[] = [];

//         const length = Math.min(5, docs.length);
//         for (let i = 0; i < length; i++) {
//           let s = docs[i].data() as Student;
//           s.id = docs.id;
//           students.push(s);
//         }
//         console.log(students);
//         return resolve(students);
//       })
//       .catch((e) => {
//         reject(e);
//       });
//   });
// }

export function getRecentLogsByCreator(creatorId: string): Promise<Array<Log>> {
  return new Promise((resolve, reject) => {
    const logsRef = collection(db, "Logs");
    const logsQuery = query(logsRef, where("creator_id", "==", creatorId));

    getDocs(logsQuery)
      .then((snap) => {
        const docs = snap.docs;
        const logs: Log[] = [];

        const length = Math.min(5, docs.length);
        for (let i = 0; i < length; i++) {
          logs.push(docs[i].data() as Log);
        }

        return resolve(logs);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getLogsByTimeframe(
  s: StudentID,
  sd: string,
  ed: string
): Promise<Array<Log>> {
  const filterCollection = query(
    collection(db, "Logs"),
    where("date", ">=", sd),
    where("date", "<=", ed),
    where("student_id", "==", s.id)
  );
  return new Promise((resolve, reject) => {
    getDocs(filterCollection)
      .then((querySnapshot) => {
        return resolve(querySnapshot.docs.map((doc) => doc.data() as Log));
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  });
}

export function logsToWeeks(): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "Logs"))
      .then((snap) => {
        const docs = snap.docs;
        docs.sort((a, b) => (a.data().date > b.data().date ? 1 : -1));
        const logs: any[] = [];

        docs.forEach((doc) => {
          const date = doc.data().date.toDate();
          /* The closest Monday to the log date is found. So weeks are from Monday - Sunday*/
          const officialDate = new Date(date);
          const dateDay = officialDate.getDay();
          const diff =
            officialDate.getDate() - dateDay + (dateDay == 0 ? -6 : 1);
          const mondayDate = new Date(officialDate.setDate(diff));
          const month = mondayDate.getUTCMonth() + 1; //months from 1-12
          const day = mondayDate.getUTCDate();
          const year = mondayDate.getUTCFullYear();
          const newDate = year + "/" + month + "/" + day;

          if (logs.indexOf(newDate) == -1) {
            /* 
                        Each log was posted on a certain week. The Monday in that week is found, and the 
                        logs array contains those dates in a YYYY/MM/DD format.
                    */
            logs.push(newDate);
          }
        });
        return resolve(logs);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export async function receivedHITutoring(
  logs: Promise<Array<{ id: String; log: Log }>>
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    logs
      .then((logs) => {
        logs.sort((a, b) => (a.log.date > b.log.date ? 1 : -1));
        if (logs.length == 0) {
          return resolve(false);
        }
        let thirty = true;
        let ninety = 0;
        let date = logs[0].log.date;
        let date1 = date;
        logs.forEach((l) => {
          const date = l.log.date;
          const same = 0;
          if (!same) {
            thirty = true;
            ninety = 0;
          }
          if (l.log.duration_minutes < 30) {
            thirty = false;
          }
          ninety += l.log.duration_minutes;
          if (thirty && ninety >= 90) {
            return true;
          }
          date1 = date;
        });
        return resolve(false);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  });
}

export async function getAllLogs(): Promise<Array<LogID>> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "Logs"))
      .then((snap) => {
        const logs: LogID[] = [];
        snap.docs.map((doc) => {
          const log = doc.data() as Log;
          const id = doc.id;
          logs.push({ log, id });
        });
        return resolve(logs);
      })
      .catch((e) => reject(e));
  });
}

export async function numberOfLogs(): Promise<number> {
  return new Promise((resolve, reject) => {
    getAllLogs()
      .then((logs) => {
        return resolve(logs.length);
      })
      .catch((e) => reject(e));
  });
}

export function countHIWeeks(logs: Array<Log>): number {
  let count = 0;
  logs.sort((a, b) => (a.date > b.date ? 1 : -1));
  if (logs.length == 0) {
    return 0;
  }
  let thirty = true;
  let ninety = 0;
  let date = logs[0].date;
  let date1 = date;
  logs.forEach((log) => {
    const date = log.date;
    const same = 0;
    if (!same) {
      thirty = true;
      ninety = 0;
    }
    if (log.duration_minutes < 30) {
      thirty = false;
    }
    ninety += log.duration_minutes;
    if (thirty && ninety >= 90) {
      count++;
    }
    date1 = date;
  });
  return count;
}

export function getNumberStudents(): Promise<number> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "Students"))
      .then((snap) => {
        return resolve(snap.size);
      })
      .catch((e) => reject(e));
  });
}

export function uploadStudentFile(
  file: File,
  studentId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const name = randomstring.generate(20);
    const storageRef = ref(storage, name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            updateDoc(doc(db, "Students", studentId), {
              files: arrayUnion({
                path: name,
                name: file.name,
                downloadURL: url,
              } as StudentFile),
            })
              .then(() => {
                return resolve();
              })
              .catch((e) => {
                return reject(e);
              });
          })
          .catch((e) => {
            return reject(e);
          });
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function deleteStudentFile(
  file: StudentFile,
  studentId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, file.path);
    deleteObject(storageRef)
      .then(() => {
        updateDoc(doc(db, "Students", studentId), {
          files: arrayRemove(file),
        })
          .then(() => {
            return resolve();
          })
          .catch((e) => {
            return reject(e);
          });
      })
      .catch((e) => {
        return reject(e);
      });
  });
}
