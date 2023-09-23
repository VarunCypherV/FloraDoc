import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sign from "../Assets/sign.png";
import axios from "axios";
const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("https://9dac-49-205-81-55.ngrok-free.app/signup/", {
        user: {
          username: formData.username,
          password: formData.password,
        },
        role: formData.role === "expert" ? true : false,
        phone_number: formData.phoneNumber,
      });
  
      // Handle success
      console.log("Response Data:", response.data);
      alert("Account created successfully!");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      alert("An error occurred while creating the account.");
    }
  };
  

  return (
    <div className="sign page-container">
      <div className="card">
        <form className="entry" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="expert">Expert</option>
          </select>
          <div>
            <div className="primary-button" type="submit" onClick={handleSubmit}>
              Register
            </div>
          </div>
        </form>
        <form className="entry">
          <img className="sign-img" src={sign} alt="signup-img" />
          <a onClick={() => navigate('/signin')}>Already have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
