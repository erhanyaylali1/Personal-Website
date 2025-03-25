import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IconButton, Typography } from "@material-ui/core";
import { Modal, List } from "semantic-ui-react";
import styled from "styled-components";
import "swiper/swiper-bundle.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import { Button } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const Project = ({ title, images, features, url, github, color }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const width = window.innerWidth;

  const increaseIndex = () => {
    if (active === images.length - 1) setActive(0);
    else setActive(active + 1);
  };

  const decreaseIndex = () => {
    if (active === 0) setActive(images.length - 1);
    else setActive(active - 1);
  };

  return (
    <Container style={{ background: color }}>
      <Modal
        style={{
          width: "max-content",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "scroll",
          }}
        >
          <Button
            size="large"
            type="link"
            icon={<LeftCircleOutlined />}
            onClick={decreaseIndex}
          />
          <ZoomImage src={images[active]} className="project-image" />
          <Button
            size="large"
            type="link"
            icon={<RightCircleOutlined />}
            onClick={increaseIndex}
          />
        </div>
      </Modal>
      <Title style={{ fontSize: width < 450 ? "25px" : "40px" }}>{title}</Title>
      <Swiper
        style={{ overflow: "hidden" }}
        centeredSlides
        slidesPerView="auto"
      >
        {images.map((img, index) => (
          <SwiperSlide style={{ width: "max-content" }} key={index}>
            <ProjectImage
              src={img}
              style={{
                height: width < 450 ? "60vh" : 400,
                objectFit: "cover",
                objectPosition: "top center",
                width: width < 450 ? "80vw" : "auto",
                margin: 10,
              }}
              onClick={async () => {
                await setActive(index);
                setOpen(true);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Details>
        <More>Specifications</More>
        <Detail>
          <List selection horizontal verticalAlign="middle">
            {features.map((feature, index) => (
              <List.Item key={index}>
                <List.Content>
                  <Detail>{feature}</Detail>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Detail>
        {(url || github) && (
          <Visit>
            <Typography varianth="body1" style={{ color: "#ddd" }}>
              Visit
            </Typography>
            {url && (
              <a href={url}>
                <IconButton>
                  <LinkOutlinedIcon style={{ color: "#faebd0" }} />
                </IconButton>
              </a>
            )}
            {github && (
              <a href={github}>
                <IconButton>
                  <GitHubIcon style={{ color: "#faebd0" }} />
                </IconButton>
              </a>
            )}
          </Visit>
        )}
      </Details>
    </Container>
  );
};

export default Project;

const Container = styled.div`
  overflow: visible;
  padding: 30px 0px;
  overflow: hidden;
`;
const ProjectImage = styled.img`
  margin-bottom: 50px;
  z-index: 999;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
const ZoomImage = styled.img``;
const Title = styled.div`
  color: #eee;
  font-weight: 300;
  line-height: 1.2;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin-bottom: 50px;
  text-align: center;
`;
const Details = styled.div`
  text-align: center;
`;
const More = styled.p`
  color: whitesmoke;
  font-size: 32px;
  font-family: monospace;
  margin-bottom: 10px;
`;
const Detail = styled.div`
  color: white;
`;
const Visit = styled.div`
  margin-top: 20px;
`;
