import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom"

const Loginform = () => {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [popupStyle, showPopup] = useState("hide");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    loginStatus: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://9dac-49-205-81-55.ngrok-free.app/api-token-auth/", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const token  = response.data.token;
        login(token);
        setFormData({ ...formData, loginStatus: "Login Successful" });
        navigate("/book")
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
    <div className="cover">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button className="login-btn" onClick={handleLogin}>
        {formData.loginStatus || "Login"}
      </button>

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
