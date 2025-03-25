import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import NavbarItem from "./NavbarItem";

const Navbar = ({ activeItem, setActiveItem }) => {
  const [width, setWidth] = useState(0);
  const navs = ["Home", "About", "Projects", "Contact"];
  const navRef = useRef(null);
  const divs = [
    document.querySelector("#Home"),
    document.querySelector("#About"),
    document.querySelector("#Projects"),
    document.querySelector("#Contact"),
  ];
  const height = window.innerHeight;

  useEffect(() => {
    if (navRef.current) {
      setWidth(navRef.current.offsetWidth);
    }
    const HandleScroll = () => {
      divs.forEach((item, index) => {
        if (
          item?.getBoundingClientRect().y < height / 4 &&
          item?.getBoundingClientRect().height +
            item?.getBoundingClientRect().y >
            height / 2
        ) {
          setActiveItem(navs[index]);
        }
      });
    };
    window.addEventListener("scroll", HandleScroll);
  }, [divs, height, navs, setActiveItem]);

  const Scroll = (name) => {
    const y =
      document.getElementById(name).getBoundingClientRect().top +
      window.pageYOffset -
      navRef.current.offsetHeight +
      4;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  let backgroundColor = "#3D138D";

  switch (activeItem) {
    case "Home":
      backgroundColor = "#1aa39c";
      break;
    case "About":
      backgroundColor = "#333";
      break;
    case "Projects":
      backgroundColor = "#1aa39c";
      break;
    case "Contact":
      backgroundColor = "#3D138D";
      break;
    default:
      backgroundColor = "#1aa39c";
      break;
  }

  return (
    <Container container style={{ backgroundColor }}>
      <Menu container justifyContent="center">
        <Grid item container lg={7} />
        <Grid
          item
          container
          xs={11}
          lg={5}
          style={{ position: "relative" }}
          ref={navRef}
        >
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignItems="center"
            onClick={() => Scroll("Home")}
          >
            <NavbarItem title={navs[0]} active={activeItem === navs[0]} />
          </Grid>
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignItems="center"
            onClick={() => Scroll("About")}
          >
            <NavbarItem title={navs[1]} active={activeItem === navs[1]} />
          </Grid>
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignItems="center"
            onClick={() => Scroll("Projects")}
          >
            <NavbarItem title={navs[2]} active={activeItem === navs[2]} />
          </Grid>
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignItems="center"
            onClick={() => Scroll("Contact")}
          >
            <NavbarItem title={navs[3]} active={activeItem === navs[3]} />
          </Grid>
          <Line
            style={{
              left: (width * navs.indexOf(activeItem)) / 4,
              width: width / 4,
            }}
          />
        </Grid>
      </Menu>
    </Container>
  );
};

export default Navbar;

const Container = styled(Grid)`
  position: fixed;
  top: 0;
`;
const Menu = styled(Grid)`
  display: flex;
  transition: all ease-in 0.4s;
  cursor: pointer;
`;
const Line = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: white;
  transition: all ease 0.3s;
`;
