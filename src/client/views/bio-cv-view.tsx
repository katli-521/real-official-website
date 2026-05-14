/**
 * Bio subpage 2.2: CV / Resume
 */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'oklch(0.72 0.15 250)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          paddingBottom: '6px',
          borderBottom: '1px solid oklch(0.20 0.04 265)',
        }}
      >
        {title}
      </div>
      {children}
    </section>
  );
}

function Entry({ title, sub, detail, items }: { title: string; sub?: string; detail?: string; items?: string[] }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: 'oklch(0.88 0.06 265)' }}>
          {title}
        </span>
        {sub && (
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.50 0.04 265)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
            {sub}
          </span>
        )}
      </div>
      {detail && (
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'oklch(0.58 0.06 250)', marginTop: '2px' }}>
          {detail}
        </div>
      )}
      {items && (
        <ul style={{ marginTop: '6px', paddingLeft: '1rem', listStyle: 'none' }}>
          {items.map((item, i) => (
            <li key={i} style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: '13px', color: 'oklch(0.68 0.03 265)', lineHeight: 1.7, marginBottom: '3px' }}>
              <span style={{ color: 'oklch(0.45 0.08 250)', marginRight: '6px' }}>—</span>{item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BioCvView() {
  return (
    <article>
      <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'oklch(0.50 0.08 250)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
        2.2 / cv
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em', color: 'oklch(0.90 0.08 250)', marginBottom: '4px', fontFamily: 'monospace' }}>Katerina Li</h2>
        <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'oklch(0.50 0.04 265)' }}>katli440402@gmail.com · New York / Guangdong</p>
      </div>

      <Section title="Education">
        <Entry title="Beijing Normal University, China" sub="Sep 2022 – Present"
          detail="B.A. in English Education · GPA 3.7/4.0 · First Class & National Merit Scholarship (top 0.2%)"
          items={[
            'Completed 4-year curriculum in 2 years to focus on overseas music study',
            'Art Song Interpretation (99) · Voice Training (96) · Piano Composition (92)',
            'iGEM Human Practice Lead (Gold Award, World Top 5); President BNU Live Music Society; Technical Director BNU Guitar Society; Choir Leader & Accompanist',
          ]}
        />
        <Entry title="University of California, Berkeley" sub="Jul–Aug 2023"
          detail="Electronic Music Production (Summer Session) · GPA 4.0/4.0 · A+ Voice & New Music Production"
        />
        <Entry title="iGEM Grand Jamboree, France" sub="Oct–Nov 2023"
          detail="Human Practice Team Leader · Best HP Nomination (Top 5 Worldwide) · Gold Medal"
          items={[
            'Coordinated 100+ teams and events',
            'Built multimedia wiki and produced 14 multilingual podcasts (135k+ listens)',
          ]}
        />
        <Entry title="Cardiff University, UK" sub="Sep 2024 – Jul 2025"
          detail="Composition & Film Music Production (Full Year Exchange · Full Tuition Waiver · Taith Grant Scholarship)"
          items={[
            'Studio techniques, composition, film sound; scored trailers, films, TV themes',
            'Performed in 20+ concerts, 11 gigs, 1 festival; 5 headlining shows; ~1,000 total audience',
          ]}
        />
      </Section>

      <Section title="Internship">
        <Entry title="Independent Music Producer · NetEase Cloud Music" sub="Feb 2020 – Present"
          detail="Ranked #7 China Electronic Music Board (2020) · 2.8M+ streams"
          items={[
            'Future bass, dubstep, piano, strings, cinematic, hybrid electronic-orchestral',
            'FL Studio, Ableton Live, arranging, mixing, sound design',
          ]}
        />
        <Entry title="Audio Engineer · K3 Production Studio" sub="May 2023 – Present"
          items={[
            'Recording assistant, mixing engineer, editing, tracking, session support',
            'Mixed BNU Valley Festival theme, graduation songs, college anthems',
            'Produced for middle schools, government, commercials, videos',
          ]}
        />
        <Entry title="Music Director · French Woods Festival, New York" sub="Jun–Aug 2025"
          items={[
            'Lead accompanist for Aladdin; promoted to Music Director',
            'Music directed Shrek, The Lion King, High School Musical, and more',
            'Most-requested classical accompanist; taught students from LaGuardia Arts',
          ]}
        />
      </Section>

      <Section title="Awards">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            'China National Merit Scholarship',
            'BNU First-Class Scholarship',
            'BNU Outstanding Student Leader',
            'BNU Outstanding Future Teacher',
            'Taith Grant Scholarship',
            'iGEM Gold Medal & World Top 5 Education Team',
            'BNU Future Teacher Competition 1st Prize',
            'China Daily 21st Century Cup 1st Prize',
            'FLTRP Cup 1st Prize',
            'Talented Youth of South China',
            '1st Prize Piano Accompaniment — Guangdong University Choir Competition',
          ].map((award, i) => (
            <span key={i} style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              padding: '3px 8px',
              border: '1px solid oklch(0.25 0.06 250)',
              color: 'oklch(0.68 0.08 250)',
              letterSpacing: '0.04em',
            }}>
              {award}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Certifications">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            'ABRSM Grade 5 Music Theory (Merit)',
            'China Musicians Association Piano Grade 10 (Distinction)',
            'ABRSM Piano Grade 8 (Distinction, full marks in aural)',
            'IELTS 7.5',
          ].map((cert, i) => (
            <span key={i} style={{ fontFamily: 'monospace', fontSize: '12px', color: 'oklch(0.68 0.04 265)' }}>↳ {cert}</span>
          ))}
        </div>
      </Section>
    </article>
  );
}
