import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../backend/FirebaseCalls";
import { logOut } from "../backend/FirebaseCalls";
import TextField, { TextFieldTypes } from "./TextField/TextField";
import Button from "./Button/Button";
import logo from "./assets/rise-dc-logo.png";
import styles from "./Login.module.css";
import { AuthError } from "@firebase/auth";
import { classicNameResolver } from "typescript";

const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");
  const [error, setError] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = () => {
    authenticateUser(email, password)
      .then(() => {
        navigate("/landing");
      })
      .catch((error) => {
        let code = (error as AuthError).code;
        if (code === "auth/user-not-found") {
          setFailureMessage(
            "Account does not exist. Make sure your email is correct."
          );
          setError({ email: true, password: false });
        } else if (code === "auth/wrong-password") {
          setFailureMessage("Incorrect Password");
          setError({ email: false, password: true });
        } else if (code === "auth/too-many-requests") {
          setFailureMessage(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later."
          );
          setError({ email: true, password: true });
        } else {
          setFailureMessage("Incorrect email or password");
          setError({ email: true, password: true });
        }
      });
  };

  useEffect(() => {
    const logOutFunction = async () => {
      logOut();
    };
    logOutFunction();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} />
        <p className={styles.error}>{failureMessage}</p>
        <div className={styles.content}>
          <TextField
            header="Email"
            isDisabled={isLoading}
            fieldType={TextFieldTypes.email}
            onChange={(val) => {
              setEmail(val);
              setError({ ...error, email: false });
            }}
            onSubmit={login}
            error={error.email}
          />
          <TextField
            header="Password"
            isDisabled={isLoading}
            fieldType={TextFieldTypes.password}
            onChange={(val) => {
              setPassword(val);
              setError({ ...error, password: false });
            }}
            onSubmit={login}
            error={error.password}
          />
          <a href="" className={styles.forgot}>
            Forgot Password?
          </a>
        </div>

        <Button text="Login" isDisabled={isLoading} handleClick={login} />
      </div>
    </div>
  );
};

export default LoginPage;
