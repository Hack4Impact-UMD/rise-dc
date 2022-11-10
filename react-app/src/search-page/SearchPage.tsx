import React from 'react';
import styles from "./SearchPage.module.css";
import StudentProfile from './StudentProfile';

export default function SearchPage() {
    return (
    <div className={styles.container}>
        <div className={styles.header}></div> {/* Inset Navbar Here */}
        <div className={styles.body}>
            <div className={styles.greenBackground}>
                <div className={styles.whiteBackground}>
"                   <div className={styles.displayHorizontal}>
                        <input className={styles.searchBar} name="email" placeholder="Search"/>
                        <button className={styles.elementButton}>New Student</button>
                    </div>
                    <StudentProfile/>
                </div>
            </div>
        </div>
    </div>
    );
}
