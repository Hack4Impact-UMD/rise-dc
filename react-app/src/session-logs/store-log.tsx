import {Timestamp, collection, addDoc} from "firebase/firestore"
import {db} from "../config/firebase"

async function storeLog(
    date: Timestamp, duration: number, reason: string, subject: string, summary: string, type: string
    ): Promise<void> {
    // missing getcurrentuser auxillary for name and type
    const docData = {
        date: date,
        duration_minutes: duration,
        instructor_name: "dummy",
        reason: reason,
        subject: subject,
        summary: summary,
        type: "dummy"
    };

    await addDoc(collection(db, "Logs"), docData);
}


export default storeLog