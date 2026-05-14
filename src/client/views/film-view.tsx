/**
 * Film section — rescores and film music compositions with real YouTube embeds.
 *
 * How it works:
 * 1. Each film entry has a real YouTube video ID.
 * 2. An iframe embed renders the video inline at 16:9 aspect ratio.
 * 3. Titles, credits, and descriptions reflect the actual works.
 */
import { PageLayout } from '@/components/page-layout';
import { Link } from '@tanstack/react-router';

interface FilmEntry {
  id: string;
  title: string;
  subtitle?: string;
  quote?: string;
  credits: { role: string; name: string }[];
  description: string;
  hasSubpage?: boolean;
  externalUrl?: string;
  youtubeId: string;
}

const films: FilmEntry[] = [
  {
    id: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    subtitle: 'Trailer Rescore',
    quote: '"Inspired music arises from an inspired movie." — Hans Zimmer',
    hasSubpage: true,
    externalUrl: 'https://blade-runner-2049-black.vercel.app',
    youtubeId: 'R69gWzh7kE4',
    credits: [
      { role: 'Composer / Arranger / Programmer / Producer / Mixer', name: 'Katerina Li' },
      { role: 'Software', name: 'Logic Pro, FL Studio, Vital, Serum, Spitfire, Kontakt' },
      { role: 'Time', name: '16 hours' },
    ],
    description: `My Blade Runner 2049 trailer rescore uses melodic dubstep and hybrid electronic-orchestral scoring. I designed sound to support dialogue and avoid frequency masking.\n\nI focused on spectral control, dynamic automation, and tempo mapping at 74 BPM to sync with gunshots and cuts. The recurring motif (C♯–G♯–F♯–D) shifts harmoniously across chords. I carved out 1–4 kHz for dialogue clarity and anchored low end below 120 Hz.`,
  },
  {
    id: 'wandering-earth',
    title: 'Wandering Earth',
    subtitle: 'Rescore',
    youtubeId: '_PqyjADEO2Y',
    credits: [],
    description: `Piano-led orchestral rescore focused on emotion and visual timing. The cello entrance mirrors Earth being pushed away. Cross-hand piano melody expresses hope and tension. Designed the sun-explosion sound using deep impacts and edited lion roar texture.`,
  },
  {
    id: 'shes-falling',
    title: "Short Film: She's Falling Into the Sea",
    youtubeId: 'Mut3zCO6U84',
    credits: [
      { role: 'Film Composer', name: 'Katerina Li' },
      { role: 'Music Producer', name: 'Katerina Li' },
      { role: 'Music Supervisor', name: 'Katerina Li' },
      { role: 'Director', name: 'Janet Huang' },
    ],
    description: `I served as film composer, music producer, and music supervisor for this student short film directed by Janet Huang.\n\nFor the dancing scene at the end of the film, I used my piano improvisation "One Day" — composed in a single unedited take after watching the Netflix series One Day. The piece captures the tenderness, longing, and bittersweet weight of connection that the scene called for.\n\nI also produced the original soundtrack and supervised the selection of all songs throughout the film.\n\nI never plan; I improvise. The director said only "blue" and "dance". I recorded One Day in one 5-minute take. I work fast, emotionally, and collaboratively.`,
  },
];

/** YouTube embed iframe for a given video ID. */
function YoutubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        border: '1px solid oklch(0.18 0.03 265)',
        overflow: 'hidden',
        marginBottom: '1.2rem',
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
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ display: 'block' }}
      />
    </div>
  );
}

export function FilmView() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          film /
        </div>
        <h1 style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '3rem' }}>
          Film
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {films.map((film) => (
            <div key={film.id} style={{ borderTop: '1px solid oklch(0.18 0.03 265)', paddingTop: '2.5rem' }}>
              {film.quote && (
                <blockquote style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: '13px', fontStyle: 'italic', color: 'oklch(0.52 0.06 250)', marginBottom: '1rem', borderLeft: '2px solid oklch(0.25 0.06 250)', paddingLeft: '1rem' }}>
                  {film.quote}
                </blockquote>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'monospace', fontSize: '17px', fontWeight: 600, color: 'oklch(0.88 0.08 250)', letterSpacing: '0.04em' }}>
                    {film.title}
                  </h2>
                  {film.subtitle && (
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.50 0.06 250)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                      {film.subtitle}
                    </span>
                  )}
                </div>
                {film.hasSubpage && (
                  film.externalUrl ? (
                    <a
                      href={film.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'monospace', fontSize: '9px', color: 'oklch(0.55 0.10 250)', letterSpacing: '0.1em', border: '1px solid oklch(0.25 0.06 250)', padding: '2px 6px', textTransform: 'uppercase', flexShrink: 0, textDecoration: 'none' }}
                    >
                      details →
                    </a>
                  ) : (
                    <Link
                      to="/film/$id"
                      params={{ id: film.id }}
                      style={{ fontFamily: 'monospace', fontSize: '9px', color: 'oklch(0.55 0.10 250)', letterSpacing: '0.1em', border: '1px solid oklch(0.25 0.06 250)', padding: '2px 6px', textTransform: 'uppercase', flexShrink: 0 }}
                    >
                      details →
                    </Link>
                  )
                )}
              </div>

              {/* Real YouTube embed */}
              <YoutubeEmbed videoId={film.youtubeId} />

              {film.credits.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginBottom: '12px' }}>
                  {film.credits.map((c, i) => (
                    <span key={i} style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.48 0.04 265)' }}>
                      <span style={{ color: 'oklch(0.36 0.06 250)' }}>{c.role}:</span> {c.name}
                    </span>
                  ))}
                </div>
              )}

              <div>
                {film.description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: '14px', lineHeight: 1.9, color: 'oklch(0.68 0.03 265)', marginBottom: '10px' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
