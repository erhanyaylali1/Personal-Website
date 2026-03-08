'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import NavbarItem from './NavbarItem';

interface NavbarProps {
  activeItem?: string;
  setActiveItem?: (item: string) => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [width, setWidth] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const navs = useMemo(() => ['Home', 'About', 'Projects', 'Contact'], []);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);

    const divs = navs.map((nav) =>
      document.querySelector(`#${nav}`)
    );

    const currentHeight = window.innerHeight;

    const HandleScroll = () => {
      divs.forEach((item, index) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          if (
            rect.y < currentHeight / 4 &&
            rect.height + rect.y > currentHeight / 2
          ) {
            setActiveItem(navs[index]);
          }
        }
      });
    };

    window.addEventListener('scroll', HandleScroll);
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener('scroll', HandleScroll);
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, [navs]);

  const Scroll = (name: string) => {
    const element = document.getElementById(name);
    if (element && navRef.current) {
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        navRef.current.offsetHeight +
        4;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  let backgroundColor = '#3D138D';

  switch (activeItem) {
    case 'Home':
      backgroundColor = '#1aa39c';
      break;
    case 'About':
      backgroundColor = '#333';
      break;
    case 'Projects':
      backgroundColor = '#1aa39c';
      break;
    case 'Contact':
      backgroundColor = '#3D138D';
      break;
    default:
      backgroundColor = '#1aa39c';
      break;
  }

  const lineWidth = navRef.current ? navRef.current.offsetWidth / 4 : 0;
  const lineLeft = navRef.current ? (navRef.current.offsetWidth * navs.indexOf(activeItem)) / 4 : 0;

  return (
    <Container style={{ backgroundColor }}>
      <MenuContainer>
        <MenuPlaceholder />
        <NavMenu ref={navRef}>
          {navs.map((nav, index) => (
            <NavItemContainer
              key={nav}
              onClick={() => Scroll(nav)}
            >
              <NavbarItem title={nav} active={activeItem === nav} />
            </NavItemContainer>
          ))}
          <Line
            style={{
              left: `${lineLeft}px`,
              width: `${lineWidth}px`,
            }}
          />
        </NavMenu>
      </MenuContainer>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
`;

const MenuContainer = styled.div`
  display: flex;
  transition: all ease-in 0.4s;
  width: 100%;
  cursor: pointer;
`;

const MenuPlaceholder = styled.div`
  flex: 1;
  @media (max-width: 1280px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  max-width: 100%;
  @media (max-width: 1280px) {
    max-width: 100%;
    flex: 1;
  }

  @media (max-width: 600px) {
    flex: 1;
  }
`;

const NavItemContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

const Line = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: white;
  transition: all ease 0.3s;
`;
