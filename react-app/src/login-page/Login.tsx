import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";
import ForgotPassword from "./ForgotPasswordModal/ForgotPassword";
import TextField, { TextFieldTypes } from "./TextField/TextField";
import { logOut } from "../backend/FirebaseCalls";
import { AuthError } from "@firebase/auth";
import logo from "./assets/rise-dc-logo.png";
import styles from "./Login.module.css";
import app from "../config/firebase";
import {authenticateUser} from "../backend/FirebaseCalls";
import { addStudent, addLog } from "../backend/FirestoreCalls";

const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openForgotModal, setOpenForgotModal] = useState<boolean>(false);

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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsLoading(true);
              login();
            }}
          >
            <TextField
              header="Email"
              isDisabled={isLoading}
              fieldType={TextFieldTypes.email}
              onChange={(val) => {
                setEmail(val);
              }}
              error={failureMessage != ""}
            />
            <TextField
              header="Password"
              isDisabled={isLoading}
              fieldType={TextFieldTypes.password}
              onChange={(val) => {
                setPassword(val);
              }}
              error={failureMessage != ""}
            />
            <button style={{ display: "none" }}></button>
          </form>
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
