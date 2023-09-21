import React from "react";
import styled from "styled-components";
import Header from "../Components/header";
import Footer from "../Components/footer";
import hero from "../Assets/hero.png";
import logo from "../Assets/logo.png";
function Home() {
  return (
    <>
      <Header />
      <HeroContainer>
        <HeroText>
          <TitleContainer>
            Plant Disease <span className="color-effect">Diagnosis</span> <br />
            Made Easy
          </TitleContainer>
          <p>Get Expert Advice from Plant Pathologists</p>
          <ButtonContainer>
            <a className="primary-button" href="/signup">
              Get Started
            </a>
            <a className="secondary-button" href="/">
              Learn More
            </a>
          </ButtonContainer>
        </HeroText>
        <HeroImg src={hero} alt="hero" />
      </HeroContainer>
      <CardsContainer>
        <h2>
          Why <span className="color-effect">FloraDoc</span>?
        </h2>
        <Cards>
          <Card>
            <CardImg src={logo} alt="card-image" />
            <CardTitle>Expert-Backed Insights</CardTitle>
            <p>
              Connect directly with certified plant pathologists, ensuring you
              receive accurate and reliable advice from seasoned professionals.
            </p>
            <CardBg />
          </Card>
          <Card>
            <CardImg src={logo} alt="card-image" />
            <CardTitle>Comprehensive Communication Tools</CardTitle>
            <p>
              Utilize real-time video, in-depth audio, and instant chat support
              for a thorough understanding of your plant's condition.
            </p>
            <CardBg />
          </Card>
          <Card>
            <CardImg src={logo} alt="card-image" />
            <CardTitle>AI-Powered Accuracy</CardTitle>
            <p>
              Integrated with a machine learning model boasting 90% accuracy,
              providing you with highly reliable preliminary diagnoses.
            </p>
            <CardBg />
          </Card>
        </Cards>
      </CardsContainer>
      <Footer />
    </>
  );
}

export default Home;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6em;
  gap: 3em;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3em;
  width: 50%;
  letter-spacing: normal;
  font-size: var(--subtitle);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
`;

const TitleContainer = styled.div`
  font-size: var(--h1);
  letter-spacing: -1px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const HeroImg = styled.img`
  width: 600px;
  height: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  flex-wrap: wrap;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;
  width: 100%;
  align-items: center;
  margin-bottom: 6em;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  padding: 3em;
  position: relative;
  :hover > CardTitle:before {
    transition: all 0.3s ease;
    height: 100%;
  }
`;

const CardBg = styled.div`
  position: absolute;
  background-color: var(--text);
  opacity: 3%;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  top: 0;
  left: 0;
  z-index: -5;
`;

const CardTitle = styled.p`
  font-size: var(--subtitle);
  z-index: 5;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  :before {
    content: "";
    height: 50%;
    width: 100%;
    display: block;
    z-index: -5;
    opacity: 30%;
    position: absolute;
    transition: all 0.3s ease;
    background-color: linear-gradient(
      180deg,
      transparent 50%,
      var(--accent) 50%
    );
  }
`;

const CardImg = styled.img`
  width: 117px;
  height: 117px;
  z-index: 5;
`;
