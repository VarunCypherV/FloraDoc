import React from 'react';
import styled from "styled-components";
import { Avatar } from "@mui/material";

function Home() {

  return (
    <HomePageContainer>
       <HeaderAvatar //add Onlick
        />
    </HomePageContainer>
  );
}

export default Home;


const HomePageContainer = styled.div`
  background-color: black;
`


const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;