import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = ({ resetToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await fetch('/resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: resetToken, password }), // Use resetToken here
        });
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setMessage('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div>
          <label className="reset-password-label">New Password:</label>
          <input className="reset-password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label className="reset-password-label">Confirm Password:</label>
          <input className="reset-password-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="reset-password-button">Reset Password</button>
        {message && <p className="reset-password-message">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
