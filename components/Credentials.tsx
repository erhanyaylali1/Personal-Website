'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';


const Credentials = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateTheAge = () => {
    const today = new Date();
    const birthDate = new Date('1998-03-27');
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const experienceData = [
    {
      company: 'Accenture',
      position: 'Fullstack Developer',
      location: 'İstanbul',
      period: '01.2025 - Now',
    },
    {
      company: 'Hesehus A/S',
      position: 'Frontend Developer',
      location: 'Denmark-Odense',
      period: '07.2022 - 12.2024',
    },
    {
      company: 'Orion Innovation',
      position: 'Full Stack Developer',
      location: 'Turkey-Istanbul',
      period: '12.2021 - 07.2022',
    },
    {
      company: 'Yapı Kredi Technology',
      position: 'Full Stack Developer',
      location: 'Turkey-Istanbul',
      period: '06.2021 - 12.2021',
    },
    {
      company: 'Ibtech',
      position: 'Jr. Full Stack',
      location: 'Turkey-Istanbul',
      period: '02.2021 - 06.2021',
    },
    {
      company: 'Exhibin',
      position: 'Student Worker Front End Developer',
      location: 'Turkey-Istanbul',
      period: '09.2020 - 12.2020',
    },
    {
      company: 'IBM',
      position: 'AI Cloud Intern',
      location: 'Turkey-Istanbul',
      period: '07.2020 - 08.2020',
    },
  ];

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Styled-Components', 'Tailwind CSS'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'Python', 'MongoDB', 'MySQL'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'AWS', 'Firebase', 'Vercel'],
    },
  ];

  return (
    <Container style={{ padding: width < 450 ? '30px' : '20px 100px' }} id="About">
      <Main>
        <IconWrapper>👤</IconWrapper>
        <Title>About Me</Title>
      </Main>

      <Header style={{ margin: width < 450 ? '35px 20px' : '50px' }}>
        <ContentGrid>
          <ImageContainer>
            <picture>
              <source 
                srcSet="/assets/me-optimized.webp" 
                type="image/webp" 
              />
              <source 
                srcSet="/assets/me-optimized.avif" 
                type="image/avif" 
              />
              <img
                src="/assets/me.jpg"
                alt="Erhan Yaylalı - Full Stack Developer"
                width={200}
                height={200}
                loading="eager"
                decoding="async"
                style={{
                  borderRadius: '100%',
                  width: width < 450 ? '80px' : '200px',
                  height: 'auto',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </picture>
          </ImageContainer>
          <InfoContainer>
            <Name style={{ fontSize: width < 450 ? '25px' : '35px' }}>
              Erhan Yaylalı
            </Name>
            <Name style={{ fontSize: width < 450 ? '15px' : '25px' }}>
              {`${calculateTheAge()} Years Old`}
            </Name>
            <Name style={{ fontSize: width < 450 ? '15px' : '25px' }}>
              Born at Izmir, Turkey. 27.03.1998
            </Name>
          </InfoContainer>
        </ContentGrid>
      </Header>

      <CVDownloadContainer>
        <a href="/assets/Erhan_Yaylali_CV.pdf" download="Erhan_Yaylali_CV" target="_blank" rel="noopener noreferrer">
          <CVText style={{ fontSize: width < 450 ? '15px' : '18px' }}>
            📥 My Resume
          </CVText>
        </a>
      </CVDownloadContainer>

      {/* Education Section */}
      <EachPart>
        <SectionDivider>
          <SectionTitle>🎓 Education</SectionTitle>
        </SectionDivider>
        <Education>
          <EducationItem>
            <EducationLabel>University</EducationLabel>
            <EducationContent>
              <EducationTitle>Istanbul Technical University</EducationTitle>
              <EducationSubtitle>Computer Engineering</EducationSubtitle>
              <EducationDate>2016-2021</EducationDate>
            </EducationContent>
          </EducationItem>

          <EducationItem>
            <EducationLabel>High School</EducationLabel>
            <EducationContent>
              <EducationTitle>Çiğli Science High School</EducationTitle>
              <EducationSubtitle>2012-2016</EducationSubtitle>
            </EducationContent>
          </EducationItem>
        </Education>
      </EachPart>

      {/* Experience Section */}
      <EachPart>
        <SectionDivider>
          <SectionTitle>💼 Experiences</SectionTitle>
        </SectionDivider>
        <Education>
          {experienceData.map((exp, index) => (
            <EducationItem key={index}>
              <EducationLabel>{exp.company}</EducationLabel>
              <EducationContent>
                <EducationSubtitle>{exp.position}</EducationSubtitle>
                <EducationDate>{exp.location}</EducationDate>
                <EducationDate>{exp.period}</EducationDate>
              </EducationContent>
            </EducationItem>
          ))}
        </Education>
      </EachPart>

      {/* Skills Section */}
      <EachPart>
        <SectionDivider>
          <SectionTitle>💻 Skills</SectionTitle>
        </SectionDivider>
        <SkillsContainer>
          {skillCategories.map((category, index) => (
            <SkillCategory key={index}>
              <SkillCategoryTitle>{category.title}</SkillCategoryTitle>
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge key={skillIndex}>{skill}</SkillBadge>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsContainer>
      </EachPart>
    </Container>
  );
};

export default Credentials;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 15px;
`;

const IconWrapper = styled.div`
  font-size: 28px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
  align-items: center;
  width: 100%;
  max-width: 700px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Name = styled.p`
  font-family: inherit;
  margin: 0;
  color: #333;
  font-weight: 500;
`;

const CVDownloadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const CVText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  margin: 0;
  color: #1aa39c;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const EachPart = styled.div`
  margin-bottom: 100px;
`;

const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #ddd, transparent);
  }
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
  background-color: white;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Education = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EducationItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-top: 25px;
  width: 100%;
  max-width: 900px;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    text-align: center;
    margin-top: 20px;
  }
`;

const EducationLabel = styled.div`
  font-size: 28px;
  font-weight: 600;
  text-align: right;
  color: #1aa39c;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const EducationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EducationTitle = styled.div`
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
`;

const EducationSubtitle = styled.div`
  font-size: 17px;
  text-align: center;
  color: #666;
`;

const EducationDate = styled.div`
  font-size: 15px;
  margin-top: 8px;
  text-align: center;
  color: #999;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 50px;
  width: 100%;
  padding: 0 20px;
`;

const SkillCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SkillCategoryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1aa39c;
  margin: 0;
  text-align: center;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const SkillBadge = styled.span`
  background-color: #1aa39c;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #148a82;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 163, 156, 0.3);
  }
`;
