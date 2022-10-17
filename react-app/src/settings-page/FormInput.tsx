import React from 'react';
import "./AdminSettingsPage.css"
import { useState } from 'react';

export default function FormInput(props: any) {
        const {
          className,  
          type = 'text', 
          placeholder,
          name, 
          value, 
        } = props;
      
        return (
          <div>
                <input
                className = {className}
                placeholder = {placeholder}
                type={type}
                name={name}
                value={value}
                />
          </div>
        )
      }