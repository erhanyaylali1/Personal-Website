import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import styled from "styled-components";
import Project from "./Project";
import "swiper/swiper-bundle.css";
import WOW from "wow.js";
import "./style.css";
import p00 from "../assets/p0_0.png";
import p01 from "../assets/p0_1.png";
import p02 from "../assets/p0_2.png";
import p03 from "../assets/p0_3.png";
import p04 from "../assets/p0_4.png";
import p05 from "../assets/p0_5.png";
import p06 from "../assets/p0_6.png";
import p07 from "../assets/p0_7.png";
import p08 from "../assets/p0_8.png";
import p09 from "../assets/p0_9.png";
import p11 from "../assets/p1_1.png";
import p12 from "../assets/p1_2.png";
import p13 from "../assets/p1_3.png";
import p14 from "../assets/p1_4.png";
import p15 from "../assets/p1_5.png";
import p16 from "../assets/p1_6.png";
import p17 from "../assets/p1_7.png";
import p18 from "../assets/p1_8.png";
import p19 from "../assets/p1_9.png";
import p210 from "../assets/p2_10.png";
import p211 from "../assets/p2_11.png";
import p212 from "../assets/p2_12.png";
import p213 from "../assets/p2_13.png";
import p214 from "../assets/p2_14.png";
import p215 from "../assets/p2_15.png";
import p216 from "../assets/p2_16.png";
import p217 from "../assets/p2_17.png";
import p218 from "../assets/p2_18.png";
import p30 from "../assets/p3_0.png";
import p31 from "../assets/p3_1.png";
import p32 from "../assets/p3_2.png";
import p33 from "../assets/p3_3.png";
import p34 from "../assets/p3_4.png";
import p35 from "../assets/p3_5.png";
import p36 from "../assets/p3_6.png";
import p37 from "../assets/p3_7.png";
import p38 from "../assets/p3_8.png";
import p41 from "../assets/p4_1.png";
import p42 from "../assets/p4_2.png";
import p43 from "../assets/p4_3.png";
import p44 from "../assets/p4_4.png";
import p45 from "../assets/p4_5.png";
import p46 from "../assets/p4_6.png";
import p47 from "../assets/p4_7.png";
import p48 from "../assets/p4_8.png";
import p51 from "../assets/p5_1.jpeg";
import p52 from "../assets/p5_2.jpeg";
import p53 from "../assets/p5_3.jpeg";
import p54 from "../assets/p5_4.jpeg";
import p55 from "../assets/p5_5.jpeg";
import p56 from "../assets/p5_6.jpeg";
import p57 from "../assets/p5_7.jpeg";
import p58 from "../assets/p5_8.jpeg";
import p59 from "../assets/p5_9.jpeg";
import p510 from "../assets/p5_10.jpeg";
import p60 from "../assets/p6_0.png";
import p61 from "../assets/p6_1.png";
import p62 from "../assets/p6_2.png";
import p63 from "../assets/p6_3.png";

const Projects = () => {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  const panes = [
    {
      menuItem: "Rich Blog Post",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="Rich Blog Post"
            images={[p01, p02, p03, p04, p05, p06, p07, p08, p09, p00]}
            features={[
              "Next JS",
              "Node Js",
              "Express.js",
              "Mongo DB",
              "Jsonwebtoken",
              "Google Clou",
            ]}
            github="https://github.com/erhanyaylali1/blog-post-client"
            url="https://blog-post-client.vercel.app/"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Civil Defense Ukraine",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="Civil Defense Ukraine"
            images={[p60, p61, p62, p63]}
            features={[
              "Figma",
            ]}
            url="https://www.figma.com/proto/Fl8NMovelipgIPGF3zz2FK/Civil-Defence-Ukraine?node-id=2-6&t=rftKaxqOcJzKUKW9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A6"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "E-Wallet",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="E-Wallet"
            images={[p51, p52, p53, p54, p55, p56, p57, p58, p59, p510]}
            features={[
              "React",
              "Redux",
              "Material-UI",
              "Ant Desing UI Kit",
              "Chart Js",
              "Node JS",
              "Express.js",
              "Bcryptjs",
              "Jsonwebtoken",
              "Sequelize",
              "MySQL",
            ]}
            github="https://github.com/erhanyaylali1/wallet-client"
            url="http://portfolio-wallet.s3-website.eu-north-1.amazonaws.com/"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "UniHub",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="UniHub"
            images={[
              "https://user-images.githubusercontent.com/32177766/148796699-ebb0b24a-da55-40d8-9f7a-506cf736138c.png",
              "https://user-images.githubusercontent.com/32177766/148796789-0dcd85b3-d9ec-40f1-876c-d0292d732808.png",
              "https://user-images.githubusercontent.com/32177766/148797111-530810df-94f5-45d7-a573-71e1b96c59be.png",
              "https://user-images.githubusercontent.com/32177766/148797040-4624f3e9-9603-454d-9f54-9d4fd211b7a7.png",
              "https://user-images.githubusercontent.com/32177766/148797054-0b5bc34a-bfab-4d48-b27e-e7f8ca0c7706.png",
              "https://user-images.githubusercontent.com/32177766/148797069-729e0d6e-1359-4795-826e-d5db8095c26d.png",
              "https://user-images.githubusercontent.com/32177766/148797089-dbdd5fec-4bc7-4c14-93ac-9575bd66081f.png",
              "https://user-images.githubusercontent.com/32177766/148797512-51f89c5a-cc33-4cba-a56b-1adc52c265a6.png",
              "https://user-images.githubusercontent.com/32177766/148797530-e4c7fe56-67a8-41e2-8c9c-1eb3bbaef87a.png",
              "https://user-images.githubusercontent.com/32177766/148797551-c055ab98-f00c-4d0c-925d-46b193c10797.png",
              "https://user-images.githubusercontent.com/32177766/148797592-a36b3488-81b3-460a-abca-2e3b1763f2cc.png",
              "https://user-images.githubusercontent.com/32177766/148797921-e8550e43-a955-451a-a9dc-1c65f5f3c125.png",
            ]}
            features={[
              "React",
              "Redux",
              "Node JS",
              "Express.js",
              "AWS",
              "Jsonwebtoken",
              "Sequelize",
              "MySQL",
            ]}
            github="https://github.com/erhanyaylali1/uniHub-Client"
            url="http://unihub-client.s3-website.us-east-2.amazonaws.com/"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Socialony",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="Socialony - Social Media"
            images={[p11, p12, p13, p14, p15, p16, p17, p18, p19]}
            features={[
              "React",
              "Redux",
              "Material-UI",
              "Firebase",
              "Express.js",
              "Ant-Design",
              "Grommet",
              "Semantic UI",
            ]}
            github="https://github.com/erhanyaylali1/Socialony-SocialMedia"
            url="https://socialony.web.app/"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Media Read",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="Media Read"
            images={[p210, p211, p212, p213, p214, p215, p216, p217, p218]}
            features={["Python", "Flask", "Bootstrap", "JQuery", "MySQL"]}
            github="https://github.com/erhanyaylali1/MediaRead"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Weather App",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="Weather App"
            images={[p30, p31, p32, p33, p34, p35, p36, p37, p38]}
            features={[
              "React",
              "Redux",
              "Google Map API",
              "Wikipedia API",
              "OpenWeatherMap",
            ]}
            github="https://github.com/erhanyaylali1/ReactApps/tree/main/WeatherApp"
            url="https://weatherapp-erhan.netlify.app"
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Amazon Website",
      render: () => (
        <Tab.Pane
          attached={false}
          className="wow bounceInUp"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Project
            title="Amazon Website"
            images={[p41, p42, p43, p44, p45, p46, p47, p48, p44]}
            features={["React", "Redux", "Firebase", "Splash"]}
            github="https://github.com/erhanyaylali1/ReactApps/tree/main/Amazon%20Clone"
            url="https://ey1-f69b8.web.app"
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container id="Projects">
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  background-color: #1aa39c;
`;
