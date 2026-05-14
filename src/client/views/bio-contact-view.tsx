/**
 * Bio Contact subpage — social links and email.
 */

const contacts = [
  {
    label: 'EMAIL',
    handle: 'katli440402@gmail.com',
    href: 'mailto:katli440402@gmail.com',
    icon: '✉',
  },
  {
    label: 'INSTAGRAM',
    handle: '@katerinali_521',
    href: 'https://www.instagram.com/katerinali_521?igsh=eDF4YWhzeWh0Zzlx&utm_source=qr',
    icon: '◈',
  },
  {
    label: 'YOUTUBE',
    handle: 'katerinali-521',
    href: 'https://youtube.com/@katerinali-521?si=Xq5XIiL3LKWcbbJM',
    icon: '▶',
  },
  {
    label: 'NETEASE MUSIC',
    handle: 'Katerina Li on NetEase',
    href: 'https://music.163.com/#/artist?id=34272638',
    icon: '♪',
  },
];

export function BioContactView() {
  return (
    <div>
      <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
        bio / contact
      </div>
      <h1 style={{ fontFamily: 'monospace', fontSize: '24px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '2.5rem' }}>
        Contact
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              padding: '1rem 1.4rem',
              border: '1px solid oklch(0.20 0.04 265)',
              background: 'oklch(0.10 0.025 265)',
              transition: 'border-color 0.2s, background 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.45 0.10 250)';
              (e.currentTarget as HTMLElement).style.background = 'oklch(0.13 0.04 265)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.20 0.04 265)';
              (e.currentTarget as HTMLElement).style.background = 'oklch(0.10 0.025 265)';
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '16px', color: 'oklch(0.55 0.10 250)', width: '20px', flexShrink: 0, textAlign: 'center' }}>
              {c.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.16em', color: 'oklch(0.42 0.06 250)', textTransform: 'uppercase', marginBottom: '3px' }}>
                {c.label}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '13px', color: 'oklch(0.82 0.08 250)', letterSpacing: '0.02em' }}>
                {c.handle}
              </div>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.40 0.04 265)' }}>→</span>
          </a>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '1.2rem 1.4rem', border: '1px solid oklch(0.16 0.03 265)', background: 'oklch(0.085 0.015 265)' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.42 0.04 265)', letterSpacing: '0.08em', lineHeight: 1.7 }}>
          Based in New York · Open to collaborations, commissions, and creative projects.
        </p>
      </div>
    </div>
  );
}
