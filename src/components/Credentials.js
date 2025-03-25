import React, { useEffect } from "react";
import styled from "styled-components";
import { Divider, Header as Hdr, Icon } from "semantic-ui-react";
import { Grid, Typography } from "@material-ui/core";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import WOW from "wow.js";
import "./style.css";
import Me from "../assets/me.jpg";
import CV from "../assets/Erhan_Yaylali_CV.pdf";

const Credentials = () => {
  const width = window.innerWidth;

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  const calculateTheAge = () => {
    const today = new window.Date();
    const birthDate = new window.Date("1998-03-27");
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Container
      style={{ padding: width < 450 ? "30px" : "20px 100px" }}
      id="About"
    >
      <Main>
        <PermContactCalendarIcon fontSize="large" />
        <Typography variant="h4" style={{ marginLeft: "20px " }}>
          About Me
        </Typography>
      </Main>
      <Header
        style={{ margin: width < 450 ? "35px 20px" : "50px" }}
        className="wow bounceInUp"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <Grid container direction="row">
          <Grid item container xs={4} lg={5} justifyContent="flex-end">
            <img
              src={Me}
              alt="Erhan Yaylalı"
              style={{
                borderRadius: "100%",
                width: width < 450 ? "80px" : "200px",
                height: width < 450 ? "80px" : "200px",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid
            item
            container
            xs={7}
            lg={6}
            direction="column"
            justifyContent="center"
          >
            <Name style={{ fontSize: width < 450 ? "25px" : "35px" }}>
              Erhan Yaylalı
            </Name>
            <Name style={{ fontSize: width < 450 ? "15px" : "25px" }}>
              {`${calculateTheAge()} Years Old`}
            </Name>
            <Name style={{ fontSize: width < 450 ? "15px" : "25px" }}>
              Born at Izmir, Turkey. 27.03.1998
            </Name>
          </Grid>
        </Grid>
      </Header>
      <Grid
        className="wow bounceInUp"
        item
        container
        justifyContent="center"
        style={{ marginBottom: 30 }}
      >
        <a href={CV} download="Erhan_Yaylali_CV">
          <Name
            style={{
              fontSize: width < 450 ? "15x" : "18px",
              marginBottom: 0,
            }}
          >
            <Icon name="download" style={{ marginRight: 10 }} />
            My Resume
          </Name>
        </a>
      </Grid>
      <EachPart>
        <Divider
          horizontal
          className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Hdr as="h3">
            <Icon name="university" />
            Education
          </Hdr>
        </Divider>
        <Education container>
          <Grid
            container
            item
            xs={12}
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "70px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                University
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <Title>Istanbul Technical University</Title>
              <SubTitle>Computer Engineering</SubTitle>
              <Date>2016-2021</Date>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "80px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                High School
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <Title>Çiğli Science High Scool</Title>
              <SubTitle>2012-2016</SubTitle>
            </Grid>
          </Grid>
        </Education>
      </EachPart>
      <EachPart>
        <Divider
          horizontal
          className={width < 450 ? "wow bounceInUp" : "wow bounceInRight"}
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Hdr as="h3">
            <Icon name="briefcase" />
            Experiences
          </Hdr>
        </Divider>
        <Education>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "70px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                Accenture
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>Fullstack Developer</SubTitle>
              <Date>İstanbul</Date>
              <Date>01.2025 - Now</Date>
            </Grid>
          </Grid>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "70px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                Hesehus A/S
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>Frontend Developer</SubTitle>
              <Date>Denmark-Odense</Date>
              <Date>07.2022 - 12.2024</Date>
            </Grid>
          </Grid>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "70px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                Orion Innovation
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>Full Stack Developer</SubTitle>
              <Date>Turkey-Istanbul</Date>
              <Date>12.2021 - 07.2022</Date>
            </Grid>
          </Grid>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "70px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                Yapı Kredi Technology
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>Full Stack Developer</SubTitle>
              <Date>Turkey-Istanbul</Date>
              <Date>06.2021 - 12.2021</Date>
            </Grid>
          </Grid>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "70px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                Ibtech
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>Jr. Full Stack</SubTitle>
              <Date>Turkey-Istanbul</Date>
              <Date>02.2021 - 06.2021</Date>
            </Grid>
          </Grid>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "80px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                Exhibin
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>Student Worker Front End Developer</SubTitle>
              <Date>Turkey-Istanbul</Date>
              <Date>09.2020 - 12.2020</Date>
            </Grid>
          </Grid>
          <Grid
            container
            className={width < 450 ? "wow bounceInUp" : "wow bounceInLeft"}
            data-wow-duration="1s"
            data-wow-delay="0.5s"
            style={{ marginTop: "80px" }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              alignItems="center"
              justifyContent="center"
            >
              <Description
                style={{
                  textAlign: width < 450 ? "center" : "right",
                  marginBottom: width < 450 ? "25px" : "0",
                }}
              >
                IBM
              </Description>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={8}
              direction="column"
              justifyContent="center"
            >
              <SubTitle>AI Cloud Intern</SubTitle>
              <Date>Turkey-Istanbul</Date>
              <Date>07.2020 - 08.2020</Date>
            </Grid>
          </Grid>
        </Education>
      </EachPart>
    </Container>
  );
};

export default Credentials;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Name = styled.p`
  font-family: initial;
  margin-bottom: 0;
`;
const EachPart = styled(Grid)`
  margin-bottom: 90px;
`;
const Description = styled.div`
  font-size: 30px;
  width: 100%;
`;
const Title = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 15px;
`;
const SubTitle = styled.div`
  font-size: 18px;
  text-align: center;
`;
const Date = styled.div`
  font-size: 15px;
  margin-top: 10px;
  text-align: center;
`;
const Education = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
