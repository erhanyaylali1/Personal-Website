import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1aa39c 0%, #0f7a74 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: '"Lato", sans-serif',
          fontWeight: 700,
          textAlign: 'center',
          flexDirection: 'column',
          padding: '40px',
        }}
      >
        <div style={{ marginBottom: '40px' }}>Erhan Yaylalı</div>
        <div style={{ fontSize: '64px', fontWeight: 400 }}>
          Full Stack Developer
        </div>
        <div style={{ fontSize: '48px', marginTop: '40px', fontWeight: 300 }}>
          React • Next.js • Node.js
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
