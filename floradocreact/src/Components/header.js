import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import ThemeSwitch from "./themeswitch";
const header = () => {
  const user = null;
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImg src={logo} alt="logo"></LogoImg>
        Flora Doc
      </LogoContainer>
      <LinkContainer>
        <Link href="/">Home</Link>
        <Link href="/book">Services</Link>
        <Link href="/">About</Link>
        {user !== null ? (
          <>
            <Link href="/profile">My Profile</Link>
            <a href="/profile">
              <HeaderAvatar />
            </a>
          </>
        ) : (
          <a
            className="primary-button"
            href="/signup"
            style={{ color: "var(--background)" }}
          >
            Sign Up
          </a>
        )}
        <ThemeSwitch />
      </LinkContainer>
    </HeaderContainer>
  );
};

export default header;

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

const Link = styled.a`
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
