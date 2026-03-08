import Script from 'next/script';

export function PerformanceScripts() {
  return (
    <>
      {/* Web Vitals monitoring */}
      <Script
        src="https://web-vitals.vercel-analytics.com/v1/web-vitals.js"
        strategy="lazyOnload"
      />
      
      {/* Preload fonts with async */}
      <Script
        id="preload-fonts"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'style';
              link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap';
              document.head.appendChild(link);
            })();
          `,
        }}
      />
    </>
  );
}
