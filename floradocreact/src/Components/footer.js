import logo from "../Assets/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      <LogoContainer>
        <LogoImg src={logo} alt="logo"></LogoImg>
        Flora Doc
      </LogoContainer>
      <FooterCols>
        <FooterCol>
          <FooterHeader>GITHUB</FooterHeader>
          <a href="https://github.com/VarunCypherV/FloraDoc">
            <RepoCard
              src="https://gh-card.dev/repos/VarunCypherV/FloraDoc.png"
              alt="Github"
            />
          </a>
        </FooterCol>
        <FooterCol>
          <FooterHeader>EXPLORE</FooterHeader>
          <FooterItem onClick={() => navigate("/")}>Home</FooterItem>
          <FooterItem onClick={() => navigate("/book")}>Services</FooterItem>
          <FooterItem onClick={() => navigate("/")}>About</FooterItem>
          <FooterItem onClick={() => navigate("/signup")}>Sign Up</FooterItem>
          <FooterItem onClick={() => navigate("/signin")}>Sign In</FooterItem>
        </FooterCol>
        <FooterCol>
          <FooterHeader>LET'S CONNECT</FooterHeader>
          <FooterItem>
            <a href="https://github.com/SeveralSnipe">Vishwa Kumar S</a>
          </FooterItem>
          <FooterItem>
            <a href="https://github.com/d-man1212">Dharshan S</a>
          </FooterItem>
          <FooterItem>
            <a href="https://github.com/VarunCypherV">Varun Vetrivendan</a>
          </FooterItem>
          <FooterItem>
            <a href="https://github.com/TheDarkKnight-24">
              Bhavesh Varma Rudraraju
            </a>
          </FooterItem>
          <FooterItem>
            <a href="https://github.com/pranamyaRK">Pranamya Rajashekhar</a>
          </FooterItem>
          <FooterItem>
            <a href="https://github.com/SuryaSahith">Padala Surya Sahith</a>
          </FooterItem>
        </FooterCol>
      </FooterCols>
      <Line />
      <p>&copy; All Rights Reserved</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2em;
  border-radius: 1rem;
  background-color: var(--text);
  color: var(--background);
  padding: 3em 5em;
  margin-bottom: 2em;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  font-size: var(--h2);
  font-weight: 600;
  letter-spacing: -0.5px;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 50px;
`;

const FooterCols = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3em;
  width: 100%;
`;
const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 30%;
`;

const RepoCard = styled.img`
  width: 250px;
`;

const FooterHeader = styled.div`
  color: var(--background);
  background-color: var(--text);
  opacity: 50%;
  font-size: var(--sub);
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--background);
  opacity: 20%;
  margin-top: 1em;
`;

const FooterItem = styled.div`
  cursor: pointer;
  font-size: var(--sub);
  color: var(--background);
  width: 100%;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 6px;
  transition: opacity 0.3s ease;
  a {
    color: var(--background);
    text-decoration: none;
  }
  :hover {
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
`;
