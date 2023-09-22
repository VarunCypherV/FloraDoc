import logo from "../Assets/logo.png";
import styled from "styled-components";

const footer = () => {
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
        </FooterCol>
        <FooterCol>
          <FooterHeader>LET'S CONNECT</FooterHeader>
        </FooterCol>
      </FooterCols>
      <Line />
      <p>Rights not reserved lol</p>
    </FooterContainer>
  );
};

export default footer;

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
// > p {
//   margin-top: 0;
//   margin-bottom: 0;
// }

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
