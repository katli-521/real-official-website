/**
 * Bio subpage 2.3: readme.txt — personal narrative
 */

const paragraphs = [
  `Growing up, my path was mapped: return home, become a public school teacher, choose stability. As the oldest daughter, this felt like an unspoken responsibility. My major was English Education — the "responsible" path.`,
  `But studying education taught me real learning isn't about filling knowledge; it's about lighting fire and unboxing your world. Its purpose is to break boundaries.`,
  `In iGEM, I asked: If people can't understand us, how can they care? As an English major, I used language. As a self-taught musician, I used resonance. I built a multilingual podcast to unbox language barriers. It reached 135k+ streams. But what mattered was that people listened and understood.`,
  `Education is about unboxing what is hidden.`,
  `I started music production in middle school with YouTube and curiosity. In 2023, I went to UC Berkeley and earned full marks. That summer confirmed my passion. I finished four years of coursework in two, maintained a 3.7 GPA, and earned scholarships. I earned the top exchange spot to Cardiff University, where I fully unboxed my life as a musician and composer.`,
  `Today I believe education's greatest gift is the courage to unbox. I choose growth. In teaching, I unbox knowledge. In composition, I unbox stories. In sound, I unbox emotion and innovation.`,
  `I once thought safety was right. Education taught me: the right life is the one I unbox from my heart. And music is how I unbox myself — and let the world listen.`,
];

export function BioReadmeView() {
  return (
    <article>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '9px',
          letterSpacing: '0.14em',
          color: 'oklch(0.50 0.08 250)',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
        }}
      >
        2.3 / readme.txt
      </div>

      <h2
        style={{
          fontSize: '16px',
          fontWeight: 400,
          letterSpacing: '0.14em',
          color: 'oklch(0.55 0.04 265)',
          marginBottom: '2.5rem',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
        }}
      >
        — personal statement
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'ui-serif, Georgia, serif',
              fontSize: '15px',
              lineHeight: 1.9,
              color: i === 3 || i === 5 ? 'oklch(0.80 0.06 250)' : 'oklch(0.72 0.03 265)',
              fontStyle: i === 3 ? 'italic' : 'normal',
              fontWeight: i === 3 ? 500 : 400,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
