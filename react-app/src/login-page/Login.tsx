import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../backend/FirebaseCalls";
import { logOut } from "../backend/FirebaseCalls";
import TextField, { TextFieldTypes } from "./TextField/TextField";
import Button from "./Button/Button";
import logo from "./assets/rise-dc-logo.png";
import styles from "./Login.module.css";
import { AuthError } from "@firebase/auth";
import ForgotPassword from "./ForgotPasswordModal/ForgotPassword";

const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openForgotModal, setOpenForgotModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = () => {
    authenticateUser(email, password)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          navigate("/landing");
        }, 300);
      })
      .catch((error) => {
        setTimeout(() => {
          let code = (error as AuthError).code;
          if (code === "auth/user-not-found") {
            setFailureMessage(
              "Account does not exist. Make sure your email is correct."
            );
          } else if (code === "auth/wrong-password") {
            setFailureMessage("Incorrect Password");
          } else if (code === "auth/too-many-requests") {
            setFailureMessage(
              "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later."
            );
          } else {
            setFailureMessage("Incorrect email or password");
          }
          setIsLoading(false);
        }, 300);
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
            }}
            onSubmit={login}
            error={failureMessage != ""}
          />
          <TextField
            header="Password"
            isDisabled={isLoading}
            fieldType={TextFieldTypes.password}
            onChange={(val) => {
              setPassword(val);
            }}
            onSubmit={login}
            error={failureMessage != ""}
          />
          <button
            onClick={() => setOpenForgotModal(!openForgotModal)}
            className={styles.forgot}
          >
            Forgot Password?
          </button>
          <ForgotPassword
            open={openForgotModal}
            onClose={() => setOpenForgotModal(!openForgotModal)}
          />
        </div>

        <Button
          text="Login"
          isDisabled={isLoading}
          handleClick={() => {
            setIsLoading(true);
            login();
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
