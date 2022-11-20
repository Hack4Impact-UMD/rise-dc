import { useState } from "react";
import Header from "./Header/Header";
import ContactInformation from "./ContactInformation/ContactInformation";
import styles from "./StudentProfile.module.css";
import GuardianInformation from "./GuardianInformation/GuardianInformation";
import GradeInformation from "./GradeInformation/GradeInformation";
import Forms from "./Forms/Forms";
import { calculateBackoffMillis } from "@firebase/util";
import { TypeFlags } from "typescript";

const StudentProfile = () => {
  return (
    <div className={styles.profile}>
      <Header title="Alice Lee" />
      <div className={styles.profileContent}>
        <ContactInformation
          address="House"
          email="email"
          phoneNumber="123"
          highSchool="High School"
          grade="11"
        />
        <GuardianInformation
          name="first name"
          address="House"
          email="email"
          phoneNumber="123"
        />
        <div className={styles.gradesAndForms}>
          <GradeInformation />
          <Forms />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;