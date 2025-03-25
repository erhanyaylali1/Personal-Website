import React from "react";
import Banner from "../assets/bg.png";
import Banner2 from "../assets/basic.png";
import WebDev from "../assets/development.png";
import WebDesign from "../assets/design.png";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const Home = () => {
  const width = window.innerWidth;
  return (
    <Container item xs={12} id="Home">
      <ImageBanner
        src={width < 450 ? Banner2 : Banner}
        style={{
          height: width < 450 ? "80vh" : "initial",
          width: "100%",
        }}
        alt="Home Banner"
      />
      <WebDevOverlay>
        <ItemText>Web Development</ItemText>
        <ItemImage src={WebDev} />
      </WebDevOverlay>
      <WebDesignOverlay>
        <ItemText>Web Design</ItemText>
        <ItemImage src={WebDesign} />
      </WebDesignOverlay>
    </Container>
  );
};

export default Home;

const Container = styled(Grid)`
  height: min-content;
  position: relative;
  margin-top: -50px;
`;
const ImageBanner = styled.img`
  width: 100%;
  z-index: -2;
`;

const WebDevOverlay = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  right: auto;
  bottom: auto;

  @media (max-width: 450px) {
    top: 15%;
    right: 15%;
    left: auto;
  }
`;

const WebDesignOverlay = styled.div`
  position: absolute;
  top: auto;
  left: auto;
  right: 10%;
  bottom: 20%;

  @media (max-width: 450px) {
    bottom: 15%;
    left: 15%;
    right: auto;
  }
`;

const ItemText = styled.p`
  font-size: 3.5rem;
  font-weight: 500;
  font-family: Helvatica;
  color: white;
  margin-bottom: 15px;
  margin-left: 15px;

  @media (max-width: 450px) {
    font-size: 2rem;
  }
`;

const ItemImage = styled.img`
  width: 20vw;

  @media (max-width: 450px) {
    width: 45vw;
  }
`;
