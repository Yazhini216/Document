import React from 'react'

const SignUp = () => {
  return (
    <div className="login-page" style={{ backgroundColor: "rgb(10, 10, 50)", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="login-container">
        <h2>Signup</h2>
        <form id="loginForm">
            <div className="input-group">
                <input type="text" id="username" name="username" placeholder="Username" required/>
                <div id="username-error" className="error"></div>
            </div>
            <div class="input-group">
                <input type="password" id="password" name=" password" placeholder="Create Password" required/>
                <div id="password-error" className="error"></div>
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder="Confirm Password" required/>
                <div id="password-error" class="error"></div>
            </div>
            <button type="submit" className="login-btn">Signup</button>
        </form>
        </div>
        </div>
  )
}

export default SignUp