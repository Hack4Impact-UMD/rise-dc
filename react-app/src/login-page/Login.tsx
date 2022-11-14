import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../backend/FirebaseCalls";
import TextField, { TextFieldTypes } from "./TextField/TextField";
import Button from "./Button/Button";
import logo from "./assets/rise-dc-logo.png";
import styles from "./Login.module.css";
import {getLogs} from "../backend/FirestoreCalls";
const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = () => {
    console.log(getLogs());
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
