import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sign from "../Assets/sign.png";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form Data:", formData);
    alert("Account created successfully!");
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
            <div className="primary-button" onClick={handleSubmit}>
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
