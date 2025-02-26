import React, { useState } from "react";
import {Link} from 'react-router-dom'
const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowResetPassword(false);
  };

  const handleResetPasswordClick = () => {
    setShowResetPassword(true);
    setShowForgotPassword(false);
  };

  return (
    <div className="login-page" style={{ backgroundColor: "rgb(10, 10, 50)", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="login-container">
        {!showForgotPassword && !showResetPassword && (
          <>
            <h2 className="ko1">Login</h2>
            <form id="loginForm">
              <div className="input-group">
                <input type="text" id="username" name="username" placeholder="Username" required />
                <div id="username-error" className="error"></div>
              </div>
              <div className="input-group">
                <input type="password" id="password" name="password" placeholder="Password" required />
                <div id="password-error" className="error"></div>
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
            <div className="forgot-password">
              <a href="#" onClick={handleForgotPasswordClick}>Forgot Password?</a>
            </div>
          </>
        )}

        {showForgotPassword && (
          <>
            <h2>Forgot Password</h2>
            <form>
              <div className="input-group">
                <input type="email" name="email" placeholder="Enter your email" required />
              </div>
              <button type="submit" className="login-btn" onClick={handleResetPasswordClick}>Send Reset Link</button>
            </form>
          </>
        )}

        {showResetPassword && (
          <>
            <h2>Reset Password</h2>
            <form>
              <div className="input-group">
                <input type="password" name="new-password" placeholder="New Password" required />
              </div>
              <div className="input-group">
                <input type="password" name="confirm-password" placeholder="Confirm Password" required />
              </div>
              <button type="submit" className="login-btn">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
