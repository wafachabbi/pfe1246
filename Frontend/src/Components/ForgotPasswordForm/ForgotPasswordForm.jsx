import React, { useState } from 'react';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div>
          <label className="forgot-password-label">Email:</label>
          <input
            className="forgot-password-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit" className="forgot-password-button">
          Reset Password
        </button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
