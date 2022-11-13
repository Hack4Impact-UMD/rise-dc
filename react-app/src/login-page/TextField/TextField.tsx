import React from "react";
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
}

const LoginTextField: React.FC<TextFieldProps> = ({
  header,
  fieldType,
  isDisabled,
  onChange,
  onSubmit = () => {},
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.header}>{header}</label> <br />
      <input
        disabled={isDisabled}
        type={fieldType}
        onChange={({ target: { value } }) => onChange(value)}
        onKeyPress={(e) => {
          if (e.code === "Enter" || e.key === "Enter") {
            onSubmit();
          }
        }}
      />
    </div>
  );
};

export default LoginTextField;
