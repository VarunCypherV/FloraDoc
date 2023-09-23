import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import sign from "../Assets/sign.png";
import styled from "styled-components";
const Loginform = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [popupStyle, showPopup] = useState("hide");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    loginStatus: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://9dac-49-205-81-55.ngrok-free.app/api-token-auth/",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        setFormData({ ...formData, loginStatus: "Login Successful" });
        navigate("/book");
        console.log(token);
      } else {
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
    alert("User sign-in Failed");
    console.log(e);
  };

  const handleForgotPassword = () => {
    const phoneNumber = prompt("Please enter your mobile number:");
  };

  return (
    <div className="sign page-container">
      <div className="card">
        <form className="entry" style={{ alignItems: "center" }}>
          <img
            className="sign-img"
            src={sign}
            alt="signin-img"
            style={{ maxHeight: "90%" }}
          />
          <p onClick={() => navigate("/signup")}>Don't have an account?</p>
        </form>
        <form className="entry">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className="button-container">
            <div className="secondary-button" onClick={handleForgotPassword}>
              Forgot Password
            </div>
            <div className="primary-button" onClick={handleLogin}>
              {formData.loginStatus || "Login"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
