import { useEffect, useState } from "react";
import { createUser } from "../backend/CloudFunctionsCalls";
import styles from "./SettingsPage.module.css";
import SettingsForm from "./SettingsForm";
import Button from "./Button";
import Navbar from "../navbar/Navbar";
import { useAuth } from "../auth/AuthProvider";

export default function AdminSettingsPage() {
  const authContext = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar title="Settings" />
      </div>
      <div className={styles.body}>
        <SettingsForm />
        {authContext?.token?.claims.role === "admin" ? (
          <>
            <AccountCreationForm />
            <AccountDeletionForm />
          </>
        ) : (
          <> </>
        )}
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
    adminEmail: "",
  };

  const [state, setState] = useState(initialValues);

  function handleTextAreaChange(event: any) {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  }

  function handleSubmit(event: any, role: string) {
    event.preventDefault();

    if (role.toLowerCase().includes("admin")) {
      createUser(state.adminEmail, state.adminName, "admin");
    } else if (role.toLowerCase().includes("tutor")) {
      createUser(state.tutorEmail, state.tutorName, "tutor");
    } else if (role.toLowerCase().includes("mentor")) {
      createUser(state.mentorEmail, state.mentorName, "mentor");
    }
  }

  return (
    <div className={styles.formSecond}>
      <h4 className={styles.profile}>Account Creation</h4>
      <form
        onSubmit={(e) => handleSubmit(e, "mentor")}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Add New Mentor</label>
        <input
          className={styles.input}
          name="mentorName"
          placeholder="Enter mentor's name"
          value={state.mentorName}
          onChange={handleTextAreaChange}
        />
        <div className={styles.buttonContainer}>
          <input
            className={styles.input}
            name="mentorEmail"
            placeholder="Enter mentor's email address"
            value={state.mentorEmail}
            onChange={handleTextAreaChange}
          />
          <Button text="Add" onClick={(e) => handleSubmit(e, "mentor")} />
        </div>
      </form>
      <form
        onSubmit={(e) => handleSubmit(e, "tutor")}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Add New Tutor</label>
        <input
          className={styles.input}
          name="tutorName"
          placeholder="Enter tutor's name"
          value={state.tutorName}
          onChange={handleTextAreaChange}
        />
        <div className={styles.buttonContainer}>
          <input
            className={styles.input}
            name="tutorEmail"
            placeholder="Enter tutor's email address"
            value={state.tutorEmail}
            onChange={handleTextAreaChange}
          />
          <Button text="Add" onClick={(e) => handleSubmit(e, "mentor")} />
        </div>
      </form>
      <form
        onSubmit={(e) => handleSubmit(e, "admin")}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Add New Administrator</label>
        <input
          className={styles.input}
          name="adminName"
          placeholder="Enter administrator's name"
          value={state.adminName}
          onChange={handleTextAreaChange}
        />
        <div className={styles.buttonContainer}>
          <input
            className={styles.input}
            name="adminEmail"
            placeholder="Enter administrator's email address"
            value={state.adminEmail}
            onChange={handleTextAreaChange}
          />
          <Button text="Add" onClick={(e) => handleSubmit(e, "admin")} />
        </div>
      </form>
    </div>
  );
}

function AccountDeletionForm() {
  const initialValues = {
    mentorEmail: "",
    tutorEmail: "",
  };

  const [emailState, setEmailState] = useState(initialValues);

  function handleTextAreaChange(event: any) {
    const { name, value } = event.target;

    setEmailState({ ...emailState, [name]: value });
  }

  function handleSubmit(event: any, role: string) {
    event.preventDefault();
    if (role.toLowerCase().includes("tutor")) {
      //deleteUser(emailState.tutorEmail, "tutor")
    } else if (role.toLowerCase().includes("mentor")) {
      //deleteUser(emailState.mentorEmail, "mentor")
    }
  }

  return (
    <div className={styles.formSecond}>
      <h4 className={styles.profile}>Account Deletion</h4>
      <form
        onSubmit={(e) => handleSubmit(e, "Mentor")}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Remove Existing Mentor</label>
        <div className={styles.buttonContainer}>
          <input
            className={styles.input}
            name="mentorEmail"
            placeholder="Enter mentor's email address"
            value={emailState.mentorEmail}
            onChange={handleTextAreaChange}
          />
          <Button text="Remove" onClick={(e) => handleSubmit(e, "Mentor")} />
        </div>
      </form>
      <form
        onSubmit={(e) => handleSubmit(e, "Tutor")}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Remove Existing Tutor</label>
        <div className={styles.buttonContainer}>
          <input
            className={styles.input}
            name="tutorEmail"
            placeholder="Enter tutor's email address"
            value={emailState.tutorEmail}
            onChange={handleTextAreaChange}
          />
          <Button text="Remove" onClick={(e) => handleSubmit(e, "Tutor")} />
        </div>
      </form>
    </div>
  );
}
