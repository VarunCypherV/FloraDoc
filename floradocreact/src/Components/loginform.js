import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Loginform = () => {
  const [popupStyle, showPopup] = useState("hide");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    loginStatus: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Update login status if successful
        setFormData({ ...formData, loginStatus: "Login Successful" });
      } else {
        // Update login status if login fails
        setFormData({ ...formData, loginStatus: "Login Failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
  };

  return (
    <div className="cover">
      <h1>Login</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />

      <div className="login-btn" onClick={handleLogin}>
        {formData.loginStatus || "Login"}
      </div>

      <div className="additional-options">
        <span>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
        <br />
        <span onClick={handleForgotPassword}>Forgot Password</span>
      </div>
    </div>
  );
};

export default Loginform;
