import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import ThemeSwitch from "./themeswitch";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "https://9dac-49-205-81-55.ngrok-free.app/getuser/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setUserData(response.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImg src={logo} alt="logo"></LogoImg>
        FloraDoc
      </LogoContainer>
      <LinkContainer>
        <Link onClick={() => navigate("/")}>Home</Link>
        <Link onClick={() => navigate("/book")}>Services</Link>
        <Link onClick={() => navigate("/appointment")}>Appointment</Link>
        {userData ? (
          <LinkContainer>
            <Link onClick={() => navigate("/profile")}>My Profile</Link>
            <HeaderAvatar onClick={() => navigate("/profile")}>
              {userData.user.username[0]}
            </HeaderAvatar>
          </LinkContainer>
        ) : (
          <div
            className="primary-button"
            onClick={() => navigate("/signup")}
            style={{ color: "var(--background)" }}
          >
            Sign Up
          </div>
        )}
        <ThemeSwitch />
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  transition: opacity 0.3s ease;
  :hover {
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  color: var(--text);
  font-size: var(--h2);
  font-weight: 600;
  letter-spacing: -0.5px;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
`;

const LogoImg = styled.img`
  width: 50px;
`;

const LinkContainer = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  gap: 2em;
  justify-content: center;
  align-items: center;
`;

const Link = styled.div`
  cursor: pointer;
  font-size: var(--sub);
  color: var(--text);
  width: 100%;
  white-space: nowrap;
  padding: 1em;
  transition: opacity 0.3s ease;
  text-decoration: none;
  :hover {
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
`;
