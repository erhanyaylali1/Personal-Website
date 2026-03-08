'use client';

/* eslint-disable-next-line @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/swiper-bundle.css';

interface ProjectProps {
  title: string;
  images: (string | any)[];
  features: string[];
  url?: string;
  github?: string;
  color?: string;
}

const Project: React.FC<ProjectProps> = ({
  title,
  images,
  features,
  url,
  github,
  color,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const increaseIndex = () => {
    if (active === images.length - 1) setActive(0);
    else setActive(active + 1);
  };

  const decreaseIndex = () => {
    if (active === 0) setActive(images.length - 1);
    else setActive(active - 1);
  };

  const isRemoteImage = (src: any) => typeof src === 'string' && src.startsWith('http');

  const getOptimizedImagePath = (src: string, format: 'webp' | 'avif' | 'original') => {
    if (isRemoteImage(src)) return src;
    const nameWithoutExt = src.substring(0, src.lastIndexOf('.'));
    if (format === 'original') return src;
    return `${nameWithoutExt}-optimized.${format === 'webp' ? 'webp' : 'avif'}`;
  };

  const renderImage = (img: string | any, index: number, title: string, isModal: boolean = false) => {
    const baseStyles: React.CSSProperties = isModal
      ? {
          maxWidth: '90vw',
          maxHeight: '80vh',
          objectFit: 'contain',
          display: 'block',
        }
      : {
          height: width < 450 ? '60vh' : 400,
          objectFit: 'cover',
          objectPosition: 'top center',
          width: width < 450 ? '80vw' : 'auto',
          margin: 10,
          display: 'block',
        };

    if (isRemoteImage(img)) {
      return (
        <img
          src={img}
          alt={`${title} - Gallery image ${index + 1}`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          style={baseStyles}
        />
      );
    }

    return (
      <picture>
        <source
          srcSet={getOptimizedImagePath(img, 'webp')}
          type="image/webp"
        />
        <source
          srcSet={getOptimizedImagePath(img, 'avif')}
          type="image/avif"
        />
        <img
          src={img}
          alt={`${title} - Gallery image ${index + 1}`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          style={baseStyles}
        />
      </picture>
    );
  };

  return (
    <Container style={{ background: color || '#333' }}>
      {open && (
        <ModalOverlay onClick={() => setOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setOpen(false)}>✕</ModalCloseButton>
            <ModalImageWrapper>
              <NavButton onClick={decreaseIndex} style={{ left: '20px' }}>
                ◀
              </NavButton>
              <ZoomImageWrapper>
                {renderImage(images[active], active, title, true)}
              </ZoomImageWrapper>
              <NavButton onClick={increaseIndex} style={{ right: '20px' }}>
                ▶
              </NavButton>
            </ModalImageWrapper>
          </ModalContent>
        </ModalOverlay>
      )}

      <Title style={{ fontSize: width < 450 ? '25px' : '40px' }}>
        {title}
      </Title>

      <Swiper centeredSlides slidesPerView="auto">
        {images.map((img, index) => (
          <SwiperSlide style={{ width: 'max-content' }} key={index}>
            <ProjectImageWrapper
              onClick={async () => {
                await setActive(index);
                setOpen(true);
              }}
            >
              {renderImage(img, index, title, width < 450)}
            </ProjectImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>

      <Details>
        <More>Specifications</More>
        <Detail>
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </Detail>
        {(url || github) && (
          <Visit>
            <VisitText>Visit</VisitText>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <VisitLink>🔗</VisitLink>
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <VisitLink>GitHub</VisitLink>
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

const ProjectImageWrapper = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    transition: all 0.2s ease-in-out;
  }

  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    &:hover img {
      transform: scale(1);
    }
  }
`;

const ZoomImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Title = styled.div`
  color: #eee;
  font-weight: 300;
  line-height: 1.2;
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const VisitText = styled.p`
  color: #ddd;
  margin: 0;
  font-size: 16px;
`;

const VisitLink = styled.button`
  background: none;
  border: none;
  color: #faebd0;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  padding: 5px 10px;

  &:hover {
    transform: scale(1.2);
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 95vw;
  max-height: 95vh;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, rgba(26, 163, 156, 0.9) 0%, rgba(22, 160, 133, 0.9) 100%);
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 1001;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 24px rgba(26, 163, 156, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #1aa39c 0%, #16a085 100%);
    box-shadow: 0 12px 32px rgba(26, 163, 156, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: scale(1.12) rotate(90deg);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 12px rgba(26, 163, 156, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`;

const ModalImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  position: relative;
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, rgba(26, 163, 156, 0.85) 0%, rgba(22, 160, 133, 0.85) 100%);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  position: absolute;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: 10px;
  width: 48px;
  height: 48px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(26, 163, 156, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);

  &:hover {
    background: linear-gradient(135deg, #1aa39c 0%, #16a085 100%);
    box-shadow: 0 12px 32px rgba(26, 163, 156, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 12px rgba(26, 163, 156, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const FeatureItem = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  color: #faebd0;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
