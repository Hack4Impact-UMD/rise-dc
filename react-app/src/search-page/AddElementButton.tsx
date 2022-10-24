import React from 'react';
import "./SearchPage.css"

export default function AddElementButton(props: any) {
    const {className, text} = props;
    return (
        <div>
            <button className = {className}>
                {text}
            </button>
        </div>
    );
}