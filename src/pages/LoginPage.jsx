import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess("Password reset successful! You can now login.");
      setShowResetPassword(false);
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundColor: "rgb(10, 10, 50)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-container">
        {!showResetPassword ? (
          <>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form id="loginForm" onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <div className="forgot-password">
              <a href="#" onClick={() => setShowResetPassword(true)}>
                Forgot Password?
              </a>
            </div>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="new-password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Reset Password
              </button>
            </form>
            <div className="forgot-password">
              <a href="#" onClick={() => setShowResetPassword(false)}>
                Back to Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
