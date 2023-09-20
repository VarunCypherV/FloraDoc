import React, { useEffect, useState } from "react";
import "./loginform.css";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Loginform = () => {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load('client: auth2', start)
    })

  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const onSuccess = (e) => {
    alert("User signed in");
    console.log(e);
  };

  const onFailure = (e) => {
    alert("User sign in Failed");
    console.log(e);
  };

  const handleForgotPassword = () => {
    const phoneNumber = prompt("Please enter your mobile number:");
    // Here, you can implement logic to send OTP and handle redirection
    // based on OTP verification.
  };

  return (
    <div className="cover">
      <h1>Login</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="tel" placeholder="Phone Number" />
      <input type="text" placeholder="Role" />

      <div className="login-btn" onClick={popup}>
        Login
      </div>

      <p className="text">Or login using</p>

      <div className="alt-login">
        <div className="facebook"></div>
        <div className="google">
          <GoogleLogin
            className="blue"
            clientId="79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com"
            buttonText=""
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            icon={false}
            theme="dark"
          />
        </div>
      </div>

      <div className="additional-options">
        <span onClick={() => alert("Redirect to Sign Up page")}>
          Don't have an account? Sign In
        </span><br/>
        <span onClick={handleForgotPassword}>Forgot Password</span>
      </div>
    </div>
  );
};

export default Loginform;
