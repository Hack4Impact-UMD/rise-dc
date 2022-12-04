import {doc, collection, addDoc, getDoc, query, where, getDocs, updateDoc, arrayUnion, orderBy, limit} from "firebase/firestore"
import {ref} from "firebase/storage"
import { getStorage, uploadBytes } from "firebase/storage";
import {Student} from "../types/StudentType"
import {db} from "../config/firebase";
import {Log} from "../types/LogType"
import { getAuth } from "firebase/auth";
import { RISEUser } from "../types/UserType";
import { SubjectHours } from "../types/SubjectHoursType"
import randomstring from "randomstring"
import app from '../config/firebase'

export function getStudentWithID(
    id : string
): Promise<Student> {
    return new Promise((resolve, reject) => {
    const studentRef = doc(db, "Students", id)
    getDoc(studentRef).then((studentSnap) => {
        if(studentSnap.exists()) {
            let student = studentSnap.data()
            student.id = id
            return resolve((student as Student))
        }
        else {
            return reject(new Error("Student not found"))
        }
    }).catch((e) => {
        return reject(e);
    })
    })
}

export function getAllStudents(): 
Promise<Array<Student>> {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "Students")).then((snap) => {
            const students = snap.docs.map(doc =>
                {
                    let student : Student = doc.data() as Student
                    student.id = doc.id
                    return student
                })
            return resolve(students);
        }).catch((e) => {
            reject(e);
        })
    })  
}
export function getCurrentUser(): Promise<RISEUser> {
    return new Promise((resolve, reject) => {
      const user = getAuth(app).currentUser;
      const usersRef = collection(db, "Users", )
      if (user) {
        getDocs(query(usersRef, where("firebase_id", "==", user.uid))).then((docs) => {
            docs.forEach((doc) => {
                return resolve(doc.data() as RISEUser);
            });
        }).catch((e) => {
            return reject(e);
        })
      } else {
        return reject(new Error("Error retrieving user"));
      }
    })
}

export function storeStudent(student: Student): Promise<void> {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "Students"), student).then(() => {
            return resolve();
        }).catch((e) => {
            return reject(e);
        })
    })
} 

export async function getStudentLogs(student_id : string) : Promise<Array<Log>> {
    const q = query(collection(db, "Logs"), where("student_id", "==", student_id))
    return new Promise((resolve, reject) => {
        getDocs(q).then((querySnapshot) => {
            return resolve(querySnapshot.docs.map((doc) => doc.data() as Log))
        }
        ).catch((e) => {
            return reject(e)
        })
    })
}

export function storeLog(log: Log): Promise<void> {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "Logs"), log).then(
        () => {
            return Promise.resolve()})
            .catch((e) => {
                return Promise.reject(e)
        })
    });
}

export function countMentors(): Promise<number> {
    const usersRef = collection(db, "Users");
    const mentorQuery = query(usersRef, where("type", "==", "MENTOR"));

    return new Promise((resolve, reject) => {
        getDocs(mentorQuery)
        .then((snap) => {
            resolve(snap.size);
        })
        .catch((error:any) => {
            reject(error);
        });
    });
}

export function countTutors(): Promise<number> {
    const usersRef = collection(db, "Users")
    const mentorQuery = query(usersRef, where("type", "==", "TUTOR"))

    return new Promise((resolve, reject) => {
        getDocs(mentorQuery)
        .then((snap) => {
            resolve(snap.size);
        })
        .catch((error:any) => {
            reject(error);
        });
    })
}

export function updateStudent(student: Student): Promise<void> {
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
              science_after: student.grades.science_after
            },
            guardian_email: student.guardian_email,
            guardian_name: student.guardian_name,
            guardian_phone: student.guardian_phone,
            high_school: student.high_school,
            name: student.name,
            phone_number: student.phone_number,
            reading_level: student.reading_level
          }).then(() => {
            return resolve()
        }).catch((e) => {return reject(e)})
        } else {return reject("student missing id")}
    })
}

export function countHISessions(logs: Array<Log>): Promise<number> {
    return new Promise((resolve, reject) => {
        let count = 0;
        logs.forEach((log) => {
            let minutes = log.duration_minutes;
            if(minutes >= 30) {
                count++;
            }
        })
        return resolve(count);
    })
}
export function getLogsTimeframe(start: Date, end: Date): Promise<Array<Log>> {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "Logs")).then((snap) => {
            const docs = snap.docs;
            docs.sort((a, b) => (a.data().date > b.data().date) ? 1 : -1);
            const logs: Log[] = [];

            docs.forEach((doc) => {
                const log = doc.data() as Log;
                if (log.date >= start && log.date <= end) {
                    logs.push(log);
                }
            });
            return resolve(logs);
        }).catch((e) => {
            reject(e);
        })
    })  
}

export function getRecentLogs(): Promise<Array<Log>> {
    return new Promise((resolve, reject) => {
        const logsRef = collection(db, "Logs")
        const logsQuery = query(logsRef, orderBy("date"), limit(5));

        getDocs(logsQuery).then((snap) => {
            const docs = snap.docs;
            const logs: Log[] = [];

            const length = Math.min(5, docs.length);
            for (let i = 0; i < length; i++) {
                logs.push(docs[i].data() as Log);
            }
            return resolve(logs);
        }).catch((e) => {
            reject(e);
        })
    })  
}

export function getStudentsAlphabetically(): Promise<Array<Student>> {
    return new Promise((resolve, reject) => {
        const studentsRef = collection(db, "Students")
        const studentsQuery = query(studentsRef, orderBy("name"), limit(5));

        getDocs(studentsQuery).then((snap) => {
            const docs = snap.docs;
            const students: Student[] = [];

            const length = Math.min(5, docs.length);
            for (let i = 0; i < length; i++) {
                let s = docs[i].data() as Student
                s.id = docs[i].id
                students.push(s);
            }
            console.log(students);
            return resolve(students);
        }).catch((e) => {
            reject(e);
        })
    })  
}

export function getRecentLogsByCreator(creatorId: string): Promise<Array<Log>> {
    return new Promise((resolve, reject) => {
        const logsRef = collection(db, "Logs")
        const logsQuery = query(logsRef, where("creator_id", "==", creatorId));

        getDocs(logsQuery).then((snap) => {
            const docs = snap.docs;
            const logs: Log[] = [];

            const length = Math.min(5, docs.length);
            for (let i = 0; i < length; i++) {
                logs.push(docs[i].data() as Log);
            }

            return resolve(logs);
        }).catch((e) => {
            reject(e);
        })
    })  
}

export function getLogsByTimeframe(s : Student, sd : Date, ed : Date) : Promise<Array<Log>> {
    const filterStudent = query(collection(db, "Logs"), where("student_id", "==", s.id))
    const filterStartDate = query(filterStudent, where("date", ">=", sd))
    const filterEndDate = query(filterStartDate, where("date", "<=", ed))
    return new Promise((resolve, reject) => {
        getDocs(filterEndDate).then((querySnapshot) => {
            return resolve(querySnapshot.docs.map((doc) => doc.data() as Log))
        }).catch((e) => {
            return Promise.reject(e)
        })
    })
}

export function logsToWeeks(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "Logs")).then((snap) => {
            const docs = snap.docs;
            docs.sort((a, b) => (a.data().date > b.data().date) ? 1 : -1);
            const logs: any[] = [];

            docs.forEach((doc) => {
                const date = doc.data().date.toDate();
                /* The closest Monday to the log date is found. So weeks are from Monday - Sunday*/
                const officialDate = new Date(date);
                const dateDay = officialDate.getDay();
                const diff = officialDate.getDate() - dateDay + (dateDay == 0 ? -6:1); 
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
                    logs.push(newDate)
                }
            });
            return resolve(logs);
        }).catch((e) => {
            reject(e);
        })
    })  
}

export function averageSessionLength(logs : Array<Log>) : number {
    let s = 0.0
    logs.forEach((log) => {
        s += log.duration_minutes
    })
    return s/logs.length
}

export function hoursSpent(logs : Array<Log>) : SubjectHours {
    let hrs = {
        english_hours : 0,
        humanities_hours : 0,
        socialStudies_hours : 0,
        math_hours : 0,
        science_hours : 0
    } as SubjectHours
    // adding time as minutes
    logs.forEach((log) => {
        if(log.subject == "ENGLISH") {
            hrs.english_hours += log.duration_minutes
        }
        else if(log.subject == "MATH") {
            hrs.math_hours += log.duration_minutes
        }
        else if(log.subject == "HUMANITIES") {
            hrs.humanities_hours += log.duration_minutes
        }
        else if(log.subject == "SCIENCE") {
            hrs.science_hours += log.duration_minutes
        }
        else {
            hrs.socialStudies_hours += log.duration_minutes
        }
    })
    // hours form
    hrs.english_hours/=60
    hrs.humanities_hours/=60
    hrs.math_hours/=60
    hrs.science_hours/=60
    hrs.socialStudies_hours/=60
    return hrs
}

// returns true if the two dates are in the same week
function sameWeek(date : Date, date1 : Date) : boolean {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();
    if(year != year1) {
        return false;
    }
    if(month != month1) {
        return false;
    }
    if(day - day1 > 7) {
        return false;
    }
    return true;
}

export async function receivedHITutoring(logs : Promise<Array<Log>>) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        logs.then((logs) => {
            logs.sort((a, b) => (a.date > b.date) ? 1 : -1);
            if (logs.length == 0) {
                return resolve(false);
            }
            let thirty = true;
            let ninety = 0;
            let date = logs[0].date;
            let date1 = date;
            logs.forEach((l) => {
                const date = l.date;
                const same = sameWeek(date, date1);
                if(!same) {
                    thirty = true;
                    ninety = 0;
                }
                if(l.duration_minutes < 30) {
                    thirty = false;
                }
                ninety += l.duration_minutes;
                if(thirty && ninety >= 90) {
                    return true;
                }
                date1 = date;
            })
            return resolve(false);
        }).catch((e) => {
            return Promise.reject(e)
        })
    })
}
export function uploadStudentFile(file: File, studentId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const name = randomstring.generate(20);
        const storageRef = ref(storage, name);
        uploadBytes(storageRef, file).then((snapshot) => {
            updateDoc(doc(db, "Students", studentId), {
                files: arrayUnion(name)
            }).then(() => {
                return resolve();
            }).catch((e) => {
                return reject(e);
            })
        }).catch((e) => {
            return reject(e);
        });
    })
}

export function splitStudents(students : Array<Student>) : Array<Array<Student>> {
    let s = [[],[]] as Array<Array<Student>>
    students.forEach((student) => {
        const stud: string = student.id !== undefined ? student.id : "";
        const p = getStudentLogs(stud!);
        receivedHITutoring(p).then((r) => {
            if(r) {
                s[0].push(student)
            }
            else {
                s[1].push(student)
            }
        })
    })
    return s;
}