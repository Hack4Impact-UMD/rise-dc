import { useState } from "react";
import { createUser } from "../backend/CloudFunctionsCalls";
import styles from "./AdminSettingsPage.module.css";
import SettingsForm from "./SettingsForm";
import AddButton from "./AddButton";

export default function AdminSettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div> {/* Inset Navbar Here */}
      <div className={styles.body}>
        <div className={styles.background}>
          <SettingsForm />
          <AccountCreationForm />
        </div>
      </div>
    </div>
  );
}

function AccountCreationForm() {
    const initialValues = {
        mentorName: "",
        mentorEmail: "",
        tutorName: "",
        tutorEmail: "",
        adminName: "",
        adminEmail: ""
    };

    const [state, setState] = useState(initialValues);

    function handleTextAreaChange(event: any) {
        const { name, value } = event.target;

        setState({...state, [name]: value});
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        var role:string = "";
        var email:string = "";

        if (event.nativeEvent.submitter.name == "submitAdmin") {
            role = "admin";
            email = state.adminEmail;
        } else if (event.nativeEvent.submitter.name == "submitMentor") {
            role = "mentor";
            email = state.mentorEmail;
        } else if (event.nativeEvent.submitter.name == "submitTutor") {
            role = "tutor";
            email = state.tutorEmail;
        }

        if (role && email) {
            createUser(email, role);
        }
    }

    return (
      <div className={styles.formSecond}>
        <h4 className={styles.profile}>Account Creation</h4>
        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <label className={styles.resetPassword}>Add New Mentor</label>
          <input className={styles.input}
                 name="mentorName"
                 placeholder="Enter mentor's name"
                 value={state.mentorName}
                 onChange={handleTextAreaChange}
          />
          <div className={styles.buttonContainer}>
              <input className={styles.input}
                     name="mentorEmail"
                     placeholder="Enter mentor's email address"
                     value={state.mentorEmail}
                     onChange={handleTextAreaChange}
              />
            <AddButton name="submitMentor"/>
          </div>
          <label className={styles.resetPassword}>Add New Tutor</label>
          <input className={styles.input}
                 name="tutorName"
                 placeholder="Enter tutor's name"
                 value={state.tutorName}
                 onChange={handleTextAreaChange}
          />
          <div className={styles.buttonContainer}>
              <input className={styles.input}
                     name="tutorEmail"
                     placeholder="Enter tutor's email address"
                     value={state.tutorEmail}
                     onChange={handleTextAreaChange}
              />
            <AddButton name="submitTutor"/>
          </div>
          <label className={styles.resetPassword}>Add New Administrator</label>
          <input className={styles.input}
                 name="adminName"
                 placeholder="Enter administrator's name"
                 value={state.adminName}
                 onChange={handleTextAreaChange}
          />
          <div className={styles.buttonContainer}>
              <input className={styles.input}
                     name="adminEmail"
                     placeholder="Enter administrator's email address"
                     value={state.adminEmail}
                     onChange={handleTextAreaChange}
              />
              <AddButton name="submitAdmin"/>
          </div>
        </form>
      </div>
    );
}

