'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Navbar = dynamic(() => import('@/components/Navbar'), { 
  ssr: false,
  loading: () => <div style={{ height: '80px', background: '#1aa39c' }} />,
});
const Home = dynamic(() => import('@/components/Home'), { 
  ssr: false,
  loading: () => <div style={{ height: '600px', background: '#f5f5f5' }} />,
});
const Credentials = dynamic(() => import('@/components/Credentials'), { 
  ssr: false,
  loading: () => <div style={{ height: '400px', background: '#fff' }} />,
});

// Lazy load Projects - only on scroll
const Projects = dynamic(() => import('@/components/Projects'), { 
  ssr: false,
  loading: () => <div style={{ height: '500px', background: '#1aa39c' }} />,
});

const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: false,
  loading: () => <div style={{ height: '300px', background: '#1aa39c' }} />,
});

export default function ClientRoot(): ReactNode {
  return (
    <>
      <Navbar />
      <Home />
      <Credentials />
      <Projects />
      <Contact />
    </>
  );
}
