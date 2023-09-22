import React, { useState } from "react";
import styled from "styled-components";
import sign from "../Assets/sign.png";
const SignupForm = () => {
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
    <Sign className="page-container">
      <Card>
        <Entry onSubmit={handleSubmit}>
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
            <Button className="primary-button" type="submit">
              Register
            </Button>
          </div>
        </Entry>
        <Entry>
          <SignupImg src={sign} alt="signup-image" />
          <a href="/signin">Already have an account?</a>
        </Entry>
      </Card>
    </Sign>
  );
};

export default SignupForm;

const Sign = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
  padding: 2em;
  border-radius: 1rem;
  border: 1px solid rgb(0, 0, 0, 0.2);
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.3);
`;
const Entry = styled.form`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 50%;
  padding: 1em;
  a {
    align-self: center;
    color: black;
    margin-bottom: 1em;
    :hover {
      color: var(--primary);
    }
  }
  input,
  select {
    color: black;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    padding: 0.5em;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const SignupImg = styled.img`
  padding: 2em;
  object-fit: scale-down;
  max-width: 100%;
`;

const Button = styled.div`
  justify-content: center;
`;
