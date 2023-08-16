import { useEffect, useRef, useState } from "react";
import {
  changeUserRole,
  createUser,
  deleteUser,
} from "../../backend/CloudFunctionsCalls";
import styles from "./SettingsPage.module.css";
import SettingsForm from "./SettingsForm";
import Button from "./Button";
import Navbar from "../../navbar/Navbar";
import { useAuth } from "../../auth/AuthProvider";
import Select from "react-select";
import {
  InputActionMeta,
  SelectInstance,
} from "react-select/dist/declarations/src";
import AccountModals from "./Modals/AccountModals/AccountModals";

enum Roles {
  "ADMIN",
  "TUTOR",
  "MENTOR",
}

type AccountCreationValues = {
  name: string;
  email: string;
  role: "ADMIN" | "TUTOR" | "MENTOR";
};

const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "TUTOR", label: "Tutor" },
  { value: "MENTOR", label: "Mentor" },
];

export default function AdminSettingsPage() {
  const authContext = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar title="Settings" />
      </div>
      <div className={styles.body}>
        <SettingsForm />
        {authContext?.token?.claims.role === "admin" ? (
          <>
            <AccountCreationForm />
            <AccountChangeForm />
          </>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
}

function AccountCreationForm() {
  const initialValues: AccountCreationValues = {
    name: "",
    email: "",
    role: "TUTOR",
  };

  const [account, setAccount] = useState(initialValues);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });
  const [confirmUser, setConfirmUser] = useState<boolean>(false);

  function handleSubmit(event: any) {
    event.preventDefault();
    if (account.name.trim().length == 0) {
      setErrors({ ...errors, name: true });
    } else if (account.email.trim().length == 0) {
      setErrors({ ...errors, email: true });
    } else {
      setConfirmUser(true);
    }
  }

  return (
    <div className={styles.creationForm}>
      <AccountModals
        open={confirmUser}
        onClose={() => setConfirmUser(false)}
        mode="CREATE"
        information={{
          name: account.name,
          email: account.email,
          role: account.role,
        }}
        backendCall={() =>
          createUser(account.email, account.name, account.role)
        }
        resetFunction={() => setAccount({ ...initialValues })}
      />
      <h4 className={styles.creationProfile}>Account Creation</h4>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.adminForm}>
        <input
          className={`${styles.input} ${styles.creationInput} ${
            errors.name ? styles.invalidInput : ""
          }`}
          placeholder="Enter name"
          value={account.name}
          onChange={(e) => {
            setErrors({ ...errors, name: false });
            setAccount({ ...account, name: e.target.value });
          }}
        />
        <input
          className={`${styles.input} ${styles.creationInput} ${
            errors.email ? styles.invalidInput : ""
          }`}
          placeholder="Enter email"
          type="email"
          value={account.email}
          onChange={(e) => {
            setErrors({ ...errors, email: false });
            setAccount({ ...account, email: e.target.value });
          }}
        />
        <div className={styles.buttonContainer}>
          <div className={styles.selectInput}>
            <Select
              placeholder="Tutor"
              options={roleOptions}
              menuPosition="fixed"
              onChange={(event) =>
                // Used some weird solution to get typescript to recognize event.value as one of the 3 roles
                setAccount({
                  ...account,
                  role: event!.value as keyof typeof Roles,
                })
              }
              styles={{
                container: (defaultStyles) => ({
                  ...defaultStyles,
                  position: "relative",
                  zIndex: "0",
                }),
                option: (defaultStyles, state) => ({
                  ...defaultStyles,
                  minHeight: "25px",
                  height: "25px",
                  paddingBottom: "5px",
                  paddingTop: "5px",
                }),
                control: (defaultStyles) => ({
                  ...defaultStyles,
                  minHeight: "35px",
                  height: "35px",
                  position: "relative",
                  zIndex: "0",
                }),
              }}
            />
          </div>
          <Button text="Create" onClick={(e) => handleSubmit(e)} />
        </div>
      </form>
    </div>
  );
}

function AccountChangeForm() {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [emailState, setEmailState] = useState("");
  const [roleModal, setRoleModal] = useState<boolean>(false);
  const [roleError, setRoleError] = useState<boolean>(false);
  const [roleState, setRoleState] = useState({ email: "", role: "TUTOR" });
  function handleDeleteSubmit(event: any) {
    event.preventDefault();
    if (emailState.trim().length == 0) {
      setDeleteError(true);
      return;
    }
    setDeleteModal(true);
  }

  function handleRoleChangeSubmit(event: any) {
    event.preventDefault();
    if (roleState.email.trim().length == 0) {
      setRoleError(true);
      return;
    }
    setRoleModal(true);
  }

  return (
    <div className={styles.creationForm}>
      <AccountModals
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        mode="DELETE"
        information={{
          email: emailState,
        }}
        backendCall={() => deleteUser(emailState)}
        resetFunction={() => setEmailState("")}
      />
      <h4 className={styles.profile}>Account Deletion</h4>
      <form
        onSubmit={(e) => handleDeleteSubmit(e)}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Remove Existing Account</label>
        <div className={styles.buttonContainer}>
          <input
            className={`${styles.input} ${styles.creationInput} ${
              deleteError ? styles.invalidInput : ""
            }`}
            placeholder="Enter account's email address"
            value={emailState}
            onChange={(e) => {
              setEmailState(e.target.value);
              setDeleteError(false);
            }}
          />
          <Button text="Remove" onClick={(e) => handleDeleteSubmit(e)} />
        </div>
      </form>
      <AccountModals
        open={roleModal}
        onClose={() => setRoleModal(false)}
        mode="CHANGE"
        information={{
          email: roleState.email,
          role: roleState.role,
        }}
        backendCall={() => changeUserRole(roleState.email, roleState.role)}
        resetFunction={() => setRoleState({ email: "", role: "TUTOR" })}
      />
      <form
        onSubmit={(e) => handleRoleChangeSubmit(e)}
        className={styles.adminForm}
      >
        <label className={styles.resetPassword}>Change Existing Role</label>
        <input
          className={`${styles.input} ${styles.creationInput} ${
            roleError ? styles.invalidInput : ""
          }`}
          placeholder="Enter email"
          type="email"
          value={roleState.email}
          onChange={(e) => {
            setRoleError(false);
            setRoleState({ ...roleState, email: e.target.value });
          }}
        />
        <div className={styles.buttonContainer}>
          <div className={styles.selectInput}>
            <Select
              placeholder="Tutor"
              options={roleOptions}
              menuPosition="fixed"
              onChange={(event) =>
                // Used some weird solution to get typescript to recognize event.value as one of the 3 roles
                setRoleState({
                  ...roleState,
                  role: event!.value as keyof typeof Roles,
                })
              }
              styles={{
                container: (defaultStyles) => ({
                  ...defaultStyles,
                  position: "relative",
                  zIndex: "0",
                }),
                option: (defaultStyles, state) => ({
                  ...defaultStyles,
                  minHeight: "25px",
                  height: "25px",
                  paddingBottom: "5px",
                  paddingTop: "5px",
                }),
                control: (defaultStyles) => ({
                  ...defaultStyles,
                  minHeight: "35px",
                  height: "35px",
                  position: "relative",
                  zIndex: "0",
                }),
              }}
            />
          </div>
          <Button text="Update" onClick={(e) => handleRoleChangeSubmit(e)} />
        </div>
      </form>
    </div>
  );
}
