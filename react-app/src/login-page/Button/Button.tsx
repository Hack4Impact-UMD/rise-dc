import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string,
  isDisabled?: boolean,
  handleClick: VoidFunction
}


export const LoginButton: React.FC<ButtonProps> = ({text, isDisabled, handleClick}) => {
  return (
    <button className='login-btn' disabled={isDisabled} onClick={handleClick}>{text}</button>
  )
}

export default LoginButton