/**
 * Bio Admitted Schools subpage — college admissions results with scholarship info.
 * Section 2.5 in the bio file tree.
 */

interface School {
  name: string;
  note?: string;
  scholarship?: string;
  committed?: boolean;
}

const schools: School[] = [
  {
    name: 'New York University',
    note: 'Steinhardt School of Culture, Education, and Human Development',
    committed: true,
  },
  {
    name: 'Berklee College of Music',
    scholarship: '$9,000 merit scholarship',
  },
  {
    name: 'San Francisco Conservatory of Music',
    scholarship: '$74,000 merit scholarship',
  },
  {
    name: 'Los Angeles College of Music',
  },
];

export function BioAdmittedSchoolsView() {
  return (
    <div>
      <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
        bio / admitted schools
      </div>
      <h1 style={{ fontFamily: 'monospace', fontSize: '24px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '0.6rem' }}>
        Admitted Schools
      </h1>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'oklch(0.45 0.04 265)', letterSpacing: '0.06em', marginBottom: '2.5rem', lineHeight: 1.7 }}>
        Graduate admissions cycle · MM Music Technology
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {schools.map((s) => (
          <div
            key={s.name}
            style={{
              padding: '1.1rem 1.4rem',
              border: s.committed
                ? '1px solid oklch(0.55 0.15 250)'
                : '1px solid oklch(0.20 0.04 265)',
              background: s.committed
                ? 'oklch(0.12 0.04 265)'
                : 'oklch(0.10 0.025 265)',
              position: 'relative',
            }}
          >
            {s.committed && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '14px',
                fontFamily: 'monospace',
                fontSize: '8px',
                letterSpacing: '0.18em',
                color: 'oklch(0.72 0.15 250)',
                border: '1px solid oklch(0.45 0.12 250)',
                padding: '2px 7px',
                textTransform: 'uppercase',
              }}>
                COMMITTED
              </div>
            )}
            <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 600, color: s.committed ? 'oklch(0.88 0.10 250)' : 'oklch(0.80 0.06 265)', letterSpacing: '0.03em', marginBottom: s.note || s.scholarship ? '5px' : 0 }}>
              {s.name}
            </div>
            {s.note && (
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.48 0.05 265)', letterSpacing: '0.04em', marginBottom: s.scholarship ? '4px' : 0 }}>
                {s.note}
              </div>
            )}
            {s.scholarship && (
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.60 0.12 145)', letterSpacing: '0.06em' }}>
                ★ {s.scholarship}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', padding: '1.1rem 1.4rem', border: '1px solid oklch(0.16 0.03 265)', background: 'oklch(0.085 0.015 265)' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.42 0.04 265)', letterSpacing: '0.08em', lineHeight: 1.8 }}>
          Fully committed to NYU Steinhardt · Arriving Fall 2025
        </p>
      </div>
    </div>
  );
}
