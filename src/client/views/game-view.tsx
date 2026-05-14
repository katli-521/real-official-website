/**
 * Game section — game rescores and interactive audio design.
 * Features the Silent Hill f rescore with a real YouTube embed.
 */
import { PageLayout } from '@/components/page-layout';
import { Link } from '@tanstack/react-router';

/** YouTube embed using youtube-nocookie.com to avoid Error 153 in sandboxed iframes. */
function YoutubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        border: '1px solid oklch(0.18 0.03 265)',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ display: 'block' }}
      />
    </div>
  );
}

export function GameView() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          game /
        </div>
        <h1 style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '3rem' }}>
          Game
        </h1>

        <div style={{ borderTop: '1px solid oklch(0.18 0.03 265)', paddingTop: '2.5rem' }}>
          <blockquote style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: '13px', fontStyle: 'italic', color: 'oklch(0.52 0.06 250)', marginBottom: '1.2rem', borderLeft: '2px solid oklch(0.25 0.06 250)', paddingLeft: '1rem' }}>
            "Welcome to Silent Hill, we've been expecting you."
          </blockquote>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <h2 style={{ fontFamily: 'monospace', fontSize: '17px', fontWeight: 600, color: 'oklch(0.88 0.08 250)', letterSpacing: '0.04em' }}>
              Silent Hill f
            </h2>
            <Link
              to="/game/$id"
              params={{ id: 'silent-hill-f' }}
              style={{ fontFamily: 'monospace', fontSize: '9px', color: 'oklch(0.55 0.10 250)', letterSpacing: '0.1em', border: '1px solid oklch(0.25 0.06 250)', padding: '2px 6px', textTransform: 'uppercase' }}
            >
              details →
            </Link>
          </div>

          {/* Real Silent Hill f YouTube embed */}
          <YoutubeEmbed videoId="4La4wpYSJmQ" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              `This rescore is built on unease: unresolved harmony, delayed drums, shifting stereo space, and unstable reverb. Melodies avoid resolution; left-hand lines enter 1/4 beat late.`,
              `I used Japanese harp textures, soprano layers, orchestra, and melodic dubstep. Tempo shifts, narrowing stereo width, and wet-to-dry reverb create psychological tension.`,
              `As John Eargle said: The best audio engineers are first musicians. Horror comes not from sound, but from perceptual manipulation. I design anxiety through timing, tuning, and psychoacoustics — using technical discipline to serve artistic emotion.`,
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: '14px', lineHeight: 1.9, color: 'oklch(0.68 0.03 265)' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
