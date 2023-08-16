import React, { useEffect, useState } from "react";
import eyeIcon from "./eye.svg";
import eyeSlashIcon from "./eye-slash.svg";
import styles from "./TextField.module.css";

export enum TextFieldTypes {
  password = "password",
  email = "email",
  text = "text",
}

interface TextFieldProps {
  header: string;
  fieldType: TextFieldTypes;
  isDisabled?: boolean;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  error: boolean;
}

const LoginTextField: React.FC<TextFieldProps> = ({
  header,
  fieldType,
  isDisabled,
  onChange,
  onSubmit = () => {},
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.container}>
      <label className={styles.header}>{header}</label> <br />
      <div className={styles.showPassword}>
        <input
          disabled={isDisabled}
          type={
            fieldType == TextFieldTypes.password
              ? showPassword
                ? TextFieldTypes.text
                : TextFieldTypes.password
              : fieldType
          }
          onChange={({ target: { value } }) => {
            onChange(value);
          }}
          onKeyPress={(e) => {
            if (e.code === "Enter" || e.key === "Enter") {
              onSubmit();
            }
          }}
          style={error ? { borderColor: "red" } : {}}
        />
        {header == "Password" ? (
          <button
            type="button"
            className={styles.showPasswordButton}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <img
              className={styles.showPasswordIcon}
              src={showPassword ? eyeIcon : eyeSlashIcon}
              alt="Toggle password visibility"
            />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LoginTextField;
