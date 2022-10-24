import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string,
  isDisabled?: boolean,
}


export const LoginButton: React.FC<ButtonProps> = ({text, isDisabled}) => {
  return (
    <button className='login-btn' disabled={isDisabled}>{text}</button>
  )
}

export default LoginButton