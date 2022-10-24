import React from 'react';
import "./SearchPage.css"

export default function SearchPage(props: any) {
    const {student} = props;
    return (
        <div>
            <div className='student-profile'>
                <h1 className = 'student-name'>{student}</h1>
            </div>
        </div>
    );
}