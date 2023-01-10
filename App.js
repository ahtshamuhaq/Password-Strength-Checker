// eslint-disable-file no-use-before-define
import './App.css'
import React from 'react'
import {
  hasNumber,
  hasUpperCase,
  hasLowerCase,
  hasSpecialCharacters
} from './utils'
import { useState, useEffect } from 'react'
export default function App() {
  const [password, setPassword] = useState('')
  const handlePasswordChange = (e) => {
    const {
      target: { value = '' }
    } = e;
    setPassword(value);
  }
  const [strength, setStrength] = useState(0)
  const [progressBar, setProgressBar] = useState({
    width: '0%',
    backgroundColor: 'red'
  });

  useEffect(() => {
    const updatedProgressBarStyles = {
      backgroundColor: 'red'
    }
    let totalStrength = 0;
    if (password.length > 3) {
      const strengthByLength = Math.min(6, Math.floor(password.length / 3));
      let strengthByCharacterType = 0
      if (hasNumber.test(password)) {
        strengthByCharacterType += 1
      }
      if (hasUpperCase.test(password)) {
        strengthByCharacterType += 1
      }
      if (hasLowerCase.test(password)) {
        strengthByCharacterType += 1
      }
      if (hasSpecialCharacters.test(password)) {
        strengthByCharacterType += 1
      }
      totalStrength = strengthByLength + strengthByCharacterType;
    }
    else {
      totalStrength = 0;
    }
    updatedProgressBarStyles.width = `${totalStrength * 10}%`
    if (totalStrength > 8) {
      updatedProgressBarStyles.backgroundColor = 'green'
    } else if (totalStrength > 6) {
      updatedProgressBarStyles.backgroundColor = 'orange'
    }
    setProgressBar(updatedProgressBarStyles)
    setStrength(totalStrength);
    setStrength(totalStrength);
  }, [password]);

  return (
    <div className='app'>
      <h1>Password Strength Checker</h1>
      <p>Enter your password</p>
      <input type="text" value={password} onChange={handlePasswordChange} />
      <div className='progress-container'>

        <div className='progress-bar' style={{
          ...progressBar
        }}>
        </div>
      </div>
      <p>strength of your password is {strength} out of 10 </p>
    </div>

  )
}
