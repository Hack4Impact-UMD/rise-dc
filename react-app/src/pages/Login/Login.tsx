import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button/Button";
import ForgotPassword from "./ForgotPasswordModal/ForgotPassword";
import TextField, { TextFieldTypes } from "./TextField/TextField";
import { authenticateUser } from "../../backend/FirebaseCalls";
import { logOut } from "../../backend/FirebaseCalls";
import { AuthError } from "@firebase/auth";
import logo from "../../assets/rise-dc-logo.png";
import styles from "./Login.module.css";

const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openForgotModal, setOpenForgotModal] = useState<boolean>(false);

  const location = useLocation();
  const directTo: string = location.state?.redir || "/";
  const navigate = useNavigate();

  const login = () => {
    authenticateUser(email, password)
      .then(() => {
        navigate(directTo);
      })
      .catch((error) => {
        let code = (error as AuthError).code;
        if (code === "auth/too-many-requests") {
          setFailureMessage(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later."
          );
        } else {
          setFailureMessage("Incorrect email or password");
        }
      })
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  };

  useEffect(() => {
    const logOutFunction = async () => {
      await logOut();
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
