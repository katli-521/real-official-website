/**
 * KAT.LI Homepage view.
 *
 * How it works:
 * 1. Fixed animated background: slow-drifting nebula orbs using CSS keyframe animations.
 *    These provide subtle depth without distracting from the main content.
 * 2. Particle title hero with interactive mouse-scatter effect and ambient audio.
 * 3. Corner labels: top-right "technologist to be", bottom-left NYU info,
 *    bottom-right "status: active".
 * 4. Ambient star dots scattered across the hero for extra depth.
 */
import { PageLayout } from '@/components/page-layout';
import { HeroParticle } from '@/components/home/hero-particle';

/** Nebula background orbs — slow drifting radial gradients for depth */
const NEBULA_ORBS = [
  {
    // Top-center large diffuse glow
    style: {
      top: '-10%', left: '30%',
      width: '700px', height: '500px',
      background: 'radial-gradient(ellipse, oklch(0.25 0.12 250 / 0.12) 0%, transparent 65%)',
      animation: 'nebula-drift-1 22s ease-in-out infinite alternate',
    },
  },
  {
    // Bottom-left deep purple wash
    style: {
      top: '45%', left: '-15%',
      width: '600px', height: '450px',
      background: 'radial-gradient(ellipse, oklch(0.20 0.10 280 / 0.10) 0%, transparent 70%)',
      animation: 'nebula-drift-2 28s ease-in-out infinite alternate',
    },
  },
  {
    // Right side indigo haze
    style: {
      top: '20%', left: '65%',
      width: '500px', height: '600px',
      background: 'radial-gradient(ellipse, oklch(0.22 0.08 260 / 0.09) 0%, transparent 70%)',
      animation: 'nebula-drift-3 34s ease-in-out infinite alternate',
    },
  },
  {
    // Bottom-right warm accent trace
    style: {
      top: '60%', left: '55%',
      width: '400px', height: '300px',
      background: 'radial-gradient(ellipse, oklch(0.30 0.14 240 / 0.07) 0%, transparent 65%)',
      animation: 'nebula-drift-1 18s ease-in-out infinite alternate-reverse',
    },
  },
];

export function HomeView() {
  return (
    <PageLayout>
      {/* CSS keyframes for nebula drift */}
      <style>{`
        @keyframes nebula-drift-1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(30px, -20px) scale(1.04); }
          66%  { transform: translate(-15px, 25px) scale(0.97); }
          100% { transform: translate(20px, 10px) scale(1.02); }
        }
        @keyframes nebula-drift-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-25px, 30px) scale(1.06); }
          70%  { transform: translate(20px, -15px) scale(0.95); }
          100% { transform: translate(-10px, 20px) scale(1.03); }
        }
        @keyframes nebula-drift-3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          30%  { transform: translate(20px, 35px) scale(1.05); }
          65%  { transform: translate(-30px, -10px) scale(0.96); }
          100% { transform: translate(15px, 25px) scale(1.02); }
        }
        @keyframes star-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.8); }
        }
        .star-dot {
          animation: star-pulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      {/* Nebula depth layer — fixed so they persist during scroll */}
      {NEBULA_ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 0,
            ...orb.style,
          }}
        />
      ))}

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          paddingTop: '2rem',
        }}
      >
        {/* Tight ambient glow directly behind particle title */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, oklch(0.30 0.15 250 / 0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Particle canvas */}
        <div style={{ width: '100%', maxWidth: '900px', zIndex: 1, padding: '0 1rem' }}>
          <HeroParticle />
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            zIndex: 1,
            padding: '0 2rem',
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: 'oklch(0.50 0.06 250)',
              textTransform: 'uppercase',
            }}
          >
            audio engineer · music producer · technologist to be
          </p>
          <p
            style={{
              marginTop: '0.5rem',
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'oklch(0.38 0.06 250)',
            }}
          >
            click kat.li to play some debussy ;)
          </p>
        </div>

        {/* Ambient star dots scattered across hero */}
        {[
          { top: '15%', left: '8%',  delay: '0s' },
          { top: '25%', left: '90%', delay: '1s' },
          { top: '70%', left: '5%',  delay: '2s' },
          { top: '60%', left: '92%', delay: '0.5s' },
          { top: '40%', left: '3%',  delay: '1.5s' },
          { top: '80%', left: '88%', delay: '2.5s' },
          { top: '10%', left: '50%', delay: '0.8s' },
          { top: '85%', left: '45%', delay: '1.8s' },
          { top: '50%', left: '96%', delay: '3.1s' },
        ].map((s, i) => (
          <div
            key={i}
            className="star-dot"
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              width: '2px',
              height: '2px',
              background: 'oklch(0.72 0.15 250)',
              animationDelay: s.delay,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Corner: top-right */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '24px',
            textAlign: 'right',
          }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: 'oklch(0.72 0.15 250)',
            textTransform: 'uppercase',
          }}>
            technologist to be
          </span>
        </div>

        {/* Corner: bottom-left — NYU only, no role line */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
          }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: 'oklch(0.55 0.08 250)',
          }}>
            New York University
          </span>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '8px',
            letterSpacing: '0.10em',
            color: 'oklch(0.40 0.05 265)',
          }}>
            MM. of Music Technology
          </span>
        </div>

        {/* Corner: bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '24px',
            textAlign: 'right',
          }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: 'oklch(0.72 0.15 250)',
            textTransform: 'uppercase',
          }}>
            status: active
          </span>
        </div>
      </section>
    </PageLayout>
  );
}
