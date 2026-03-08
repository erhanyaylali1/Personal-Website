'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Project from './Project';
import 'swiper/swiper-bundle.css';

const projectsList = [
  {
    id: 'rich-blog',
    name: 'Rich Blog Post',
    title: 'Rich Blog Post',
    images: [
      '/assets/p0_1-optimized.webp',
      '/assets/p0_2-optimized.webp',
      '/assets/p0_3-optimized.webp',
      '/assets/p0_4-optimized.webp',
      '/assets/p0_5-optimized.webp',
      '/assets/p0_6-optimized.webp',
      '/assets/p0_7-optimized.webp',
      '/assets/p0_8-optimized.webp',
      '/assets/p0_9-optimized.webp',
      '/assets/p0_0-optimized.webp',
    ],
    features: [
      'Next JS',
      'Node Js',
      'Express.js',
      'Mongo DB',
      'Jsonwebtoken',
      'Google Cloud',
    ],
    github: 'https://github.com/erhanyaylali1/blog-post-client',
    url: 'https://blog-post-client.vercel.app/',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    title: 'E-Wallet',
    images: [
      '/assets/p5_1-optimized.webp',
      '/assets/p5_2-optimized.webp',
      '/assets/p5_3-optimized.webp',
      '/assets/p5_4-optimized.webp',
      '/assets/p5_5-optimized.webp',
      '/assets/p5_6-optimized.webp',
      '/assets/p5_7-optimized.webp',
      '/assets/p5_8-optimized.webp',
      '/assets/p5_9-optimized.webp',
      '/assets/p5_10-optimized.webp',
    ],
    features: [
      'React',
      'Redux',
      'Material-UI',
      'Ant Design UI Kit',
      'Chart Js',
      'Node JS',
      'Express.js',
      'Bcryptjs',
      'Jsonwebtoken',
      'Sequelize',
      'MySQL',
    ],
    github: 'https://github.com/erhanyaylali1/wallet-client',
    url: 'http://portfolio-wallet.s3-website.eu-north-1.amazonaws.com/',
  },
  {
    id: 'unihub',
    name: 'UniHub',
    title: 'UniHub',
    images: [
      'https://user-images.githubusercontent.com/32177766/148796699-ebb0b24a-da55-40d8-9f7a-506cf736138c.png',
      'https://user-images.githubusercontent.com/32177766/148796789-0dcd85b3-d9ec-40f1-876c-d0292d732808.png',
      'https://user-images.githubusercontent.com/32177766/148797111-530810df-94f5-45d7-a573-71e1b96c59be.png',
      'https://user-images.githubusercontent.com/32177766/148797040-4624f3e9-9603-454d-9f54-9d4fd211b7a7.png',
      'https://user-images.githubusercontent.com/32177766/148797054-0b5bc34a-bfab-4d48-b27e-e7f8ca0c7706.png',
      'https://user-images.githubusercontent.com/32177766/148797069-729e0d6e-1359-4795-826e-d5db8095c26d.png',
      'https://user-images.githubusercontent.com/32177766/148797089-dbdd5fec-4bc7-4c14-93ac-9575bd66081f.png',
      'https://user-images.githubusercontent.com/32177766/148797512-51f89c5a-cc33-4cba-a56b-1adc52c265a6.png',
      'https://user-images.githubusercontent.com/32177766/148797530-e4c7fe56-67a8-41e2-8c9c-1eb3bbaef87a.png',
      'https://user-images.githubusercontent.com/32177766/148797551-c055ab98-f00c-4d0c-925d-46b193c10797.png',
      'https://user-images.githubusercontent.com/32177766/148797592-a36b3488-81b3-460a-abca-2e3b1763f2cc.png',
      'https://user-images.githubusercontent.com/32177766/148797921-e8550e43-a955-451a-a9dc-1c65f5f3c125.png',
    ],
    features: [
      'React',
      'Redux',
      'Node JS',
      'Express.js',
      'AWS',
      'Jsonwebtoken',
      'Sequelize',
      'MySQL',
    ],
    github: 'https://github.com/erhanyaylali1/uniHub-Client',
    url: 'http://unihub-client.s3-website.us-east-2.amazonaws.com/',
  },
  {
    id: 'socialony',
    name: 'Socialony',
    title: 'Socialony - Social Media',
    images: [
      '/assets/p1_1-optimized.webp',
      '/assets/p1_2-optimized.webp',
      '/assets/p1_3-optimized.webp',
      '/assets/p1_4-optimized.webp',
      '/assets/p1_5-optimized.webp',
      '/assets/p1_6-optimized.webp',
      '/assets/p1_7-optimized.webp',
      '/assets/p1_8-optimized.webp',
      '/assets/p1_9-optimized.webp',
    ],
    features: [
      'React',
      'Redux',
      'Material-UI',
      'Firebase',
      'Express.js',
      'Ant-Design',
      'Grommet',
      'Semantic UI',
    ],
    github: 'https://github.com/erhanyaylali1/Socialony-SocialMedia',
    url: 'https://socialony.web.app/',
  },
  {
    id: 'media-read',
    name: 'Media Read',
    title: 'Media Read',
    images: [
      '/assets/p2_10-optimized.webp',
      '/assets/p2_11-optimized.webp',
      '/assets/p2_12-optimized.webp',
      '/assets/p2_13-optimized.webp',
      '/assets/p2_14-optimized.webp',
      '/assets/p2_15-optimized.webp',
      '/assets/p2_16-optimized.webp',
      '/assets/p2_17-optimized.webp',
      '/assets/p2_18-optimized.webp',
    ],
    features: ['Python', 'Flask', 'Bootstrap', 'JQuery', 'MySQL'],
    github: 'https://github.com/erhanyaylali1/MediaRead',
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    title: 'Weather App',
    images: [
      '/assets/p3_0-optimized.webp',
      '/assets/p3_1-optimized.webp',
      '/assets/p3_2-optimized.webp',
      '/assets/p3_3-optimized.webp',
      '/assets/p3_4-optimized.webp',
      '/assets/p3_5-optimized.webp',
      '/assets/p3_6-optimized.webp',
      '/assets/p3_7-optimized.webp',
      '/assets/p3_8-optimized.webp',
    ],
    features: [
      'React',
      'Redux',
      'Google Map API',
      'Wikipedia API',
      'OpenWeatherMap',
    ],
    github: 'https://github.com/erhanyaylali1/ReactApps/tree/main/WeatherApp',
    url: 'https://weatherapp-erhan.netlify.app',
  },
  {
    id: 'amazon',
    name: 'Amazon Website',
    title: 'Amazon Website',
    images: [
      '/assets/p4_1-optimized.webp',
      '/assets/p4_2-optimized.webp',
      '/assets/p4_3-optimized.webp',
      '/assets/p4_4-optimized.webp',
      '/assets/p4_5-optimized.webp',
      '/assets/p4_6-optimized.webp',
      '/assets/p4_7-optimized.webp',
      '/assets/p4_8-optimized.webp',
      '/assets/p4_4-optimized.webp',
    ],
    features: ['React', 'Redux', 'Firebase', 'Splash'],
    github: 'https://github.com/erhanyaylali1/ReactApps/tree/main/Amazon%20Clone',
    url: 'https://ey1-f69b8.web.app',
  },
  {
    id: 'civil-defense',
    name: 'Civil Defense Ukraine',
    title: 'Civil Defense Ukraine',
    images: [
      '/assets/p6_0-optimized.webp',
      '/assets/p6_1-optimized.webp',
      '/assets/p6_2-optimized.webp',
      '/assets/p6_3-optimized.webp',
    ],
    features: ['Figma'],
    url: 'https://www.figma.com/proto/Fl8NMovelipgIPGF3zz2FK/Civil-Defence-Ukraine?node-id=2-6&t=rftKaxqOcJzKUKW9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A6',
  },
];

const Projects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState('rich-blog');
  const activeProject = projectsList.find((p) => p.id === activeProjectId);

  return (
    <Container id="Projects">
      <TabMenu>
        {projectsList.map((project) => (
          <TabButton
            key={project.id}
            $active={activeProjectId === project.id}
            onClick={() => setActiveProjectId(project.id)}
          >
            {project.name}
          </TabButton>
        ))}
      </TabMenu>
      <TabContent>
        {activeProject && (
          <Project
            title={activeProject.title}
            images={activeProject.images}
            features={activeProject.features}
            url={activeProject.url}
            github={activeProject.github}
          />
        )}
      </TabContent>
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  background-color: #1aa39c;
  padding-bottom: 50px;
`;

const TabMenu = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  justify-content: center;
  overflow-x: auto;
  flex-wrap: nowrap;
  
  /* Mobile scrolling */
  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
  
  /* Desktop wrap behavior */
  @media (min-width: 769px) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.$active ? 'white' : 'transparent')};
  color: ${(props) => (props.$active ? '#1aa39c' : 'white')};
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => (props.$active ? 'white' : '#16a085')};
    color: ${(props) => (props.$active ? '#1aa39c' : 'white')};
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
