import { ImageResponse } from 'next/og';

export const alt = 'AI Email Writer by ZenryPro';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          fontFamily: 'Inter, sans-serif',
          padding: 80,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            fontSize: 52,
            fontWeight: 700,
            color: 'white',
            marginBottom: 40,
            boxShadow: '0 0 60px rgba(124, 58, 237, 0.4)',
          }}
        >
          EW
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          AI Email Writer
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          Generate professional emails, replies, and follow-ups in seconds.
        </p>

        {/* Feature chips */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 48,
          }}
        >
          {['Free to Use', 'Tone Control', 'Instant Results'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                borderRadius: 20,
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                color: '#c4b5fd',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
