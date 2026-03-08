import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Lato } from 'next/font/google';
import './globals.css';
import 'swiper/swiper-bundle.css';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1aa39c',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://erhanyaylali.com'),
  title: {
    default: 'Erhan Yaylalı - Full Stack Developer | React, Next.js, Node.js',
    template: '%s | Erhan Yaylalı',
  },
  description:
    'Full Stack Developer with expertise in React, Next.js, Node.js, Express.js, and AWS. Specialized in building scalable web applications. Available for freelance and contract work.',
  keywords: [
    'Erhan Yaylalı',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Turkey',
    'Istanbul',
    'Accenture',
    'Hesehus',
  ],
  authors: [{ name: 'Erhan Yaylalı', url: 'https://erhanyaylali.com' }],
  creator: 'Erhan Yaylalı',
  publisher: 'Erhan Yaylalı',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://erhanyaylali.com',
    title: 'Erhan Yaylalı - Full Stack Developer',
    description:
      'Full Stack Developer with expertise in React, Next.js, Node.js, Express.js, and AWS.',
    siteName: 'Erhan Yaylalı Portfolio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Erhan Yaylalı - Full Stack Developer Portfolio',
        type: 'image/png',
      },
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
        alt: 'Erhan Yaylalı Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erhan Yaylalı - Full Stack Developer',
    description:
      'Full Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies.',
    creator: '@erhanyaylali',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://erhanyaylali.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Erhan Yaylalı',
    url: 'https://erhanyaylali.com',
    jobTitle: 'Full Stack Developer',
    image: 'https://erhanyaylali.com/assets/me.jpg',
    sameAs: [
      'https://www.linkedin.com/in/erhanyaylali/',
      'https://github.com/erhanyaylali1',
    ],
    email: 'erhanyaylali9@gmail.com',
    telephone: '+90 533 501 08 95',
    knowsLanguage: ['en', 'tr'],
    worksFor: {
      '@type': 'Organization',
      name: 'Accenture',
      url: 'https://www.accenture.com',
    },
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'Express.js',
      'MongoDB',
      'MySQL',
      'AWS',
      'Firebase',
      'Redux',
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Erhan Yaylalı',
    url: 'https://erhanyaylali.com',
    logo: 'https://erhanyaylali.com/favicon.ico',
    description:
      'Full Stack Developer with expertise in React, Next.js, Node.js, Express.js, and AWS. Specialized in building scalable web applications.',
    sameAs: [
      'https://www.linkedin.com/in/erhanyaylali/',
      'https://github.com/erhanyaylali1',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Professional Services',
      email: 'erhanyaylali9@gmail.com',
      availableLanguage: ['en', 'tr'],
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://erhanyaylali.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: 'https://erhanyaylali.com/#Projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Credentials',
        item: 'https://erhanyaylali.com/#Credentials',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: 'https://erhanyaylali.com/#Contact',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={lato.className}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1aa39c" />
        <meta name="msapplication-TileColor" content="#1aa39c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Erhan Yaylali" />
        
        {/* Canonical and alternate URLs */}
        <link rel="canonical" href="https://erhanyaylali.com" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect and DNS prefetch for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Prefetch important image assets - optimized formats */}
        <link rel="prefetch" href="/assets/me-optimized.webp" as="image" />
        <link rel="prefetch" href="/assets/bg-optimized.webp" as="image" />
        <link rel="prefetch" href="/assets/basic-optimized.webp" as="image" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
