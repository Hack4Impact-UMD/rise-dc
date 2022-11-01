import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "@firebase/auth";
import TextField, { TextFieldTypes } from "./TextField/TextField"
import Button from "./Button/Button";
import logo from "./assets/rise-dc-logo.png";
import "./Login.css";
import app from "../config/firebase";
import {authenticateUser} from "../backend/FirebaseCalls";

const LoginPage: React.FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = () => {
    authenticateUser(email, password).then(() => {
      navigate("/landing");
    }).catch(() => {
      setFailureMessage("Incorrect email or password");
    });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img id="login-logo" src={logo} />
        <TextField
          header="Email"
          isDisabled={isLoading}
          fieldType={TextFieldTypes.email}
          onChange={(val) => setEmail(val)} />
        <a href="" className="forgot">Forgot Email?</a>
        <TextField
          header="Password"
          isDisabled={isLoading}
          fieldType={TextFieldTypes.password}
          onChange={(val) => setPassword(val)} />
        <a href="" className="forgot">Forgot Password?</a>
        <Button text="Login" isDisabled={isLoading} handleClick={login} />
      </div>

    </div>
  );
};

export default LoginPage;