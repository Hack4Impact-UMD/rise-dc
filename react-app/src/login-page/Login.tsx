import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField, { TextFieldTypes } from "./TextField/TextField";
import Button from "./Button/Button";
import logo from "./assets/rise-dc-logo.png";
import styles from "./Login.module.css";
import "./Login.css";
import app from "../config/firebase";
import {authenticateUser} from "../backend/FirebaseCalls";
import { addStudent, addLog } from "../backend/FirestoreCalls";

const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const addDummyUsers = () => {
    for(let i = 0; i < 5; i++)
      try{
      addStudent({
        address: "address1",
        email: i+"@e.mail",
        grade_level: i+"",
        grades: {
          english_before: "A",
          english_after: "A",
          humanities_before: "A",
          humanities_after: "A",
          socialStudies_before: "A",
          socialStudies_after: "A",
          math_before: "A",
          math_after: "A",
          science_before: "A",
          science_after: "A"
        },
        guardian_email: i+"@e.mail",
        guardian_name: "guardian "+i,
        guardian_phone: "000-000-000"+i,
        high_school: "school"+i,
        name: "name "+i,
        phone_number: "000-000-000"+i,
        reading_level: ""+i
      });
    } catch {
      console.log("error adding student")
    }
  }

  const login = () => {
    authenticateUser(email, password)
      .then(() => {
        navigate("/landing");
      })
      .catch(() => {
        setFailureMessage("Incorrect email or password");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} />
        <TextField
          header="Email"
          isDisabled={isLoading}
          fieldType={TextFieldTypes.email}
          onChange={(val) => setEmail(val)}
        />
        <TextField
          header="Password"
          isDisabled={isLoading}
          fieldType={TextFieldTypes.password}
          onChange={(val) => setPassword(val)}
        />
        <a href="" className={styles.forgot}>
          Forgot Password?
        </a>
        <Button text="Login" isDisabled={isLoading} handleClick={login} />
      </div>
    </div>
  );
};

export default LoginPage;
