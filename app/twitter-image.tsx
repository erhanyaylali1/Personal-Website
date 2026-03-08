import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
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
          padding: '20px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>Erhan Yaylalı</div>
        <div style={{ fontSize: '48px', fontWeight: 400 }}>
          Full Stack Developer
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
