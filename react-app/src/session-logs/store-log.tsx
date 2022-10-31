import {Timestamp, collection, addDoc} from "firebase/firestore"
import {db} from "../config/firebase"

async function storeLog(
    date: Timestamp, duration: number, name: string, reason: string, subject: string, summary: string, type: string
    ): Promise<void> {
    
        // in case name and type are not parameters  
    // const auth = getAuth(app);
    // return new Promise((resolve, reject) => {
    //     getDocs(
    //         query(
    //             collection(db, "users"), 
    //             where("firebase_id", "==", getAuth().currentUser?.uid)
    //         )
    //     );
    // });  
    const docData = {
        date: date,
        duration_minutes: duration,
        instructor_name: name,
        reason: reason,
        subject: subject,
        summary: summary,
        type: type
    };  
    
    await addDoc(collection(db, "Logs"), docData);   
}


export default storeLog