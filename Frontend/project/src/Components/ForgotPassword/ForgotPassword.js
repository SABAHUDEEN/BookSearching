// ForgotPassword.js
import React, { useState } from 'react';
import Axios from 'axios';
import styles from './Forgot.module.css'; // Import your CSS file

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleResetPassword = () => {
    if (!username || !newPassword || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (!passwordMatch) {
      setMessage('Passwords do not match.');
      return;
    }
    Axios.post('http://localhost:3000/reset-password', { username, newPassword })
      .then((response) => {
        setMessage(response.data.message);
        // Reset the input fields after successful password change
        setUsername('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setMessage('Invalid username.');
        } else {
          setMessage('Error: Failed to reset password.');
        }
      });
  };

  const validatePasswords = (newPass, confirmPass) => {
    setPasswordMatch(newPass === confirmPass);
  };

  return (
    <div className={styles.container}>
      <h3>Reset Password</h3>
      <form className={styles.form}>
        <div className={styles.inputDiv}>
          <label htmlFor='username' className={styles.label}></label>
          <div className={styles.input}>
            <input
              type='text'
              id='username'
              className={styles.formControl}
              placeholder='Enter Username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor='newPassword' className={styles.label}></label>
          <div className={`${styles.input} ${!passwordMatch ? styles.isInvalid : ''}`}>
            <input
              type='password'
              id='newPassword'
              className={styles.formControl}
              placeholder='Enter New Password'
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                validatePasswords(event.target.value, confirmPassword);
              }}
            />
          </div>
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor='confirmPassword' className={styles.label}></label>
          <div className={`${styles.input} ${!passwordMatch ? styles.isInvalid : ''}`}>
            <input
              type='password'
              id='confirmPassword'
              className={styles.formControl}
              placeholder='Confirm New Password'
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                validatePasswords(newPassword, event.target.value);
              }}
            />
          </div>
        </div>
        {!passwordMatch && <div className={styles.errorMessage}>Passwords do not match.</div>}
        <button type='button' className={styles.btnOutlineSecondary} onClick={handleResetPassword}>
          Reset Password
        </button>
      </form>
      {message && <div className={styles.validationMessage}>{message}</div>}
    </div>
  );
};

export default ForgotPassword;
