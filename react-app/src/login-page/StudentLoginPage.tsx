import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthError, getAuth } from "@firebase/auth";
import TextField, {TextFieldTypes} from "./TextField/TextField"
import Button from "./Button/Button";

import "./LoginPage.css";
import app from "../config/firebase";

const StudentLoginPage: React.FC<any> = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (
    <div className="login-page">
      <div className="login-fields">
        <TextField 
        header = "Email"
        isDisabled={isLoading}
        fieldType={TextFieldTypes.email}
        onChange={(val) => setEmail(val)}/>
        <a href="" className="forgot">Forgot Email?</a>
        <TextField 
        header = "Password"
        isDisabled={isLoading}
        fieldType={TextFieldTypes.password}
        onChange={(val) => setPassword(val)}/>
        <a href="" className="forgot">Forgot Password?</a>
        <Button text="Login" isDisabled={isLoading}/>
      </div>
      
    </div>
  );
};

export default StudentLoginPage;