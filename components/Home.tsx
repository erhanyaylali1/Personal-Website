'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Home = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container id="Home">
      <ImageBannerWrapper
        style={{
          height: width < 450 ? '80vh' : 'auto',
          width: '100%',
          position: 'relative',
        }}
      >
        <picture>
          <source 
            media="(max-width: 450px)"
            srcSet="/assets/basic-optimized.webp"
            type="image/webp"
          />
          <source 
            media="(max-width: 450px)"
            srcSet="/assets/basic-optimized.avif"
            type="image/avif"
          />
          <source 
            srcSet="/assets/bg-optimized.webp" 
            type="image/webp" 
          />
          <source 
            srcSet="/assets/bg-optimized.avif" 
            type="image/avif" 
          />
          <img
            src="/assets/bg.png"
            alt="Home Banner - Web Development and Design"
            loading="eager"
            decoding="async"
            width={1920}
            height={1336}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              contentVisibility: 'auto',
              display: 'block',
            }}
          />
        </picture>
      </ImageBannerWrapper>

      <WebDevOverlay>
        <ItemText>Web Development</ItemText>
        <ImageWrapper>
          <picture>
            <source 
              srcSet="/assets/development-optimized.webp" 
              type="image/webp" 
            />
            <source 
              srcSet="/assets/development-optimized.avif" 
              type="image/avif" 
            />
            <img
              src="/assets/development.png"
              alt="Web Development Icon"
              loading="lazy"
              decoding="async"
              width={732}
              height={460}
              style={{
                width: width < 450 ? '45vw' : '20vw',
                height: 'auto',
                contentVisibility: 'auto',
                display: 'block',
              }}
            />
          </picture>
        </ImageWrapper>
      </WebDevOverlay>

      <WebDesignOverlay>
        <ItemText>Web Design</ItemText>
        <ImageWrapper>
          <picture>
            <source 
              srcSet="/assets/design-optimized.webp" 
              type="image/webp" 
            />
            <source 
              srcSet="/assets/design-optimized.avif" 
              type="image/avif" 
            />
            <img
              src="/assets/design.png"
              alt="Web Design Icon"
              loading="lazy"
              decoding="async"
              width={732}
              height={460}
              style={{
                width: width < 450 ? '45vw' : '20vw',
                height: 'auto',
                contentVisibility: 'auto',
                display: 'block',
              }}
            />
          </picture>
        </ImageWrapper>
      </WebDesignOverlay>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: min-content;
  position: relative;
  margin-top: -50px;
`;

const ImageBannerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const WebDevOverlay = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  right: auto;
  bottom: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  @media (max-width: 450px) {
    top: 15%;
    right: 15%;
    left: auto;
    align-items: flex-end;
  }
`;

const WebDesignOverlay = styled.div`
  position: absolute;
  top: auto;
  left: auto;
  right: 10%;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;

  @media (max-width: 450px) {
    bottom: 15%;
    left: 15%;
    right: auto;
    align-items: flex-start;
  }
`;

const ItemText = styled.p`
  font-size: 3.5rem;
  font-weight: 500;
  font-family: Helvetica, Arial, sans-serif;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 450px) {
    font-size: 2rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;
