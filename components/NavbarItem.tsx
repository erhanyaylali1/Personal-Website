'use client';

import React from 'react';
import styled from 'styled-components';

interface NavbarItemProps {
  active: boolean;
  title: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ active, title }) => {
  return active ? (
    <ActiveItem>
      <p>{title}</p>
    </ActiveItem>
  ) : (
    <NotActiveItem>
      <p>{title}</p>
    </NotActiveItem>
  );
};

export default NavbarItem;

const ActiveItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  color: white;
  width: 100%;

  p {
    margin: 0;
    color: white;
  }
`;

const NotActiveItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  padding: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  p {
    margin: 0;
    color: #ddd;
  }

  &:hover {
    transform: scale(1.1);
    p {
      color: #fff;
    }
  }
`;
