/**
 * Bio subpage 2.1: Cross-disciplinary background
 */

const content = [
  {
    para: `Dr. Christian Heil's transition from particle physics to audio engineering showed me the power of interdisciplinary thinking. As a non-music major in college, I believe the future of sound technology will not be an isolated engineering field, but one deeply integrated with narrative, education, and cognitive science. I never saw my non-music background as a drawback.`,
  },
  {
    para: `In the iGEM competition, I used audio and multimedia to make complex synthetic biology accessible. I coded multimedia elements into our team wiki, created a multilingual podcast to break language barriers, coordinated international contributors, recorded vocals, composed background music, edited episodes, and mixed everything myself. The podcast reached over 135,000 global streams, and our team was nominated as one of the Top 5 Best Education Teams in the world. Most importantly, people across countries listened to and understood a cancer research project.`,
  },
  {
    para: `As a student teacher passionate about music and audio engineering, I volunteered to teach English in rural schools across several of China's 832 once-impoverished counties. I merged audio basics with language education: using vocal dynamics to teach pronunciation, layering melodies over vocabulary drills, and recording balanced audio clips for personal listening exercises. I created original music for lessons, edited four educational videos with custom sound design, and wrote an original song later selected as the BNU Valley Festival theme. As an intern, I directed the National Day Choir, taught over 50 English lessons, and recorded students' progress.`,
  },
  {
    para: `This work showed me that audio and music are bridges—between languages, villages and the world, teachers and students. I believe the best technical innovation comes from crossing disciplines to solve real problems. At NYU, I want to continue exploring sound technology, narrative, and education to create work that changes how people experience the world.`,
  },
];

export function BioCrossDisciplinaryView() {
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
        2.1 / cross-disciplinary
      </div>

      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: 'oklch(0.90 0.08 250)',
          marginBottom: '2rem',
          fontFamily: 'monospace',
        }}
      >
        Cross-disciplinary
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {content.map((c, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'ui-serif, Georgia, serif',
              fontSize: '15px',
              lineHeight: 1.9,
              color: 'oklch(0.75 0.03 265)',
              borderLeft: '1px solid oklch(0.22 0.04 265)',
              paddingLeft: '1.5rem',
            }}
          >
            {c.para}
          </p>
        ))}
      </div>
    </article>
  );
}
