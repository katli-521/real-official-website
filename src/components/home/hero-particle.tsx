/**
 * Particle title hero component for the KAT.LI homepage.
 *
 * How it works:
 * 1. Canvas renders particles forming "KAT.LI" text.
 * 2. Particles scatter on hover and spring back to origin.
 * 3. Subtle glow halos on ~8% of particles — white/pale blue only, no colors.
 * 4. Floating phrases appear near cursor on hover/click (every 3s to avoid overlap).
 * 5. Audio only plays when clicking the KAT.LI canvas.
 * 6. AudioContext pre-warmed on first pointer interaction.
 */
import { useEffect, useRef, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Floating phrases — weighted pool
// ---------------------------------------------------------------------------
const PHRASES_POOL = [
  'PERFECT PITCH',
  'ISFP',
  'IMMERSIVE AUDIO',
  'GRADE 8 AURAL SKILLS FULL MARKS',
  'FILM SCORING',
  'UC BERKELEY ALUMNI',
  'METALCORE',
  'NYU MUSIC TECH',
];

const PHRASE_WEIGHTS = [2, 2, 2, 2, 2, 2, 2, 1];
const PHRASE_TOTAL = PHRASE_WEIGHTS.reduce((a, b) => a + b, 0);

function pickPhrase(firstPick: boolean): string {
  if (firstPick) return PHRASES_POOL[0]!;
  let r = Math.random() * PHRASE_TOTAL;
  for (let i = 0; i < PHRASES_POOL.length; i++) {
    r -= PHRASE_WEIGHTS[i]!;
    if (r <= 0) return PHRASES_POOL[i]!;
  }
  return PHRASES_POOL[0]!;
}

// ---------------------------------------------------------------------------
// Clair de Lune melody — all frequencies recalculated from scratch.
//
// Standard equal temperament, A4 = 440 Hz. Formula: f = 440 * 2^((n-49)/12)
// where n = piano key number (A4 = 49).
//
// Notes used (verified Hz):
//   Ab2  =  103.83 Hz   (key 20)
//   Ab3  =  207.65 Hz   (key 32)
//   Ab4  =  415.30 Hz   (key 44)
//   Ab5  =  830.61 Hz   (key 56)
//   F2   =   87.31 Hz   (key 17)
//   F3   =  174.61 Hz   (key 29)
//   F4   =  349.23 Hz   (key 41)
//   F5   =  698.46 Hz   (key 53)
//   Eb2  =   77.78 Hz   (key 15)
//   Eb3  =  155.56 Hz   (key 27)
//   Eb4  =  311.13 Hz   (key 39)
//   Eb5  =  622.25 Hz   (key 51)
//   Db3  =  138.59 Hz   (key 25)
//   Db4  =  277.18 Hz   (key 37)
//   Db5  =  554.37 Hz   (key 49)
//   Gb3  =  184.99 Hz   (key 30)
//   Gb4  =  369.99 Hz   (key 42)
//   C4   =  261.63 Hz   (key 36)
//   C5   =  523.25 Hz   (key 48)
//   Bb4  =  466.16 Hz   (key 46)
//
// Sequence (null = silent rest; ghost bass notes mapped in REST_BASS):
//   [0]  Ab2   103.83
//   [1]  Ab3   207.65
//   [2]  Ab4   415.30
//   [3]  Ab5   830.61
//   [4]  rest (silent)
//   [5]  rest (silent)
//   [6]  F5    698.46
//   [7]  rest → Gb3 ghost  184.99
//   [8]  rest (silent)
//   [9]  Eb5   622.25
//   [10] F5    698.46
//   [11] Eb5   622.25
//   [12] rest → F3 ghost   174.61
//   [13] Db5   554.37
//   [14] Eb5   622.25
//   [15] Db5   554.37
//   [16] F5    698.46
//   [17] Db5   554.37
//   [18] rest → Eb3 ghost  155.56
//   [19] C5    523.25
//   [20] Db5   554.37
//   [21] C5    523.25
//   [22] rest → Gb3 ghost  184.99
//   [23] rest (silent)
//   [24] rest (silent)
//   [25] Bb4   466.16
//   [26] C5    523.25
//   [27] Bb4   466.16
//   [28] Eb5   622.25
//   [29] Bb4   466.16
//   [30] rest → F3 ghost   174.61
//   [31] Ab4   415.30
//   [32] Bb4   466.16
//   [33] Ab4   415.30
//   [34] rest → Eb3 ghost  155.56
//   [35] Gb4   369.99
//   [36] Ab4   415.30
//   [37] Gb4   369.99
//   [38] F4    349.23
//   [39] rest → Db3 ghost  138.59
//   [40] F4    349.23
//   [41] Gb4   369.99
//   [42] F4    349.23
//   [43] Bb4   466.16
//   [44] F4    349.23
//   [45] rest → F2 ghost    87.31
//   [46] Eb4   311.13
//   [47] F4    349.23
//   [48] Eb4   311.13
//   [49] rest → Eb2 ghost   77.78
//   [50] Db4   277.18
//   [51] Eb4   311.13
//   [52] Db4   277.18
//   [53] C4    261.63
//   [54] rest (silent)
//   [55] rest (silent)
//   [56] rest (silent)
//   [57] rest → Ab3 ghost  207.65
//   [58] rest (silent)
//   [59] rest (silent)
//   [60] rest (silent)
//   [61] rest (silent)
//   → repeat
// ---------------------------------------------------------------------------
const MELODY_NOTES: (number | null)[] = [
  103.83,  // [0]  Ab2
  207.65,  // [1]  Ab3
  415.30,  // [2]  Ab4
  830.61,  // [3]  Ab5
  null,    // [4]  rest (silent)
  null,    // [5]  rest (silent)
  698.46,  // [6]  F5
  null,    // [7]  rest → Gb3 ghost
  null,    // [8]  rest (silent)
  622.25,  // [9]  Eb5
  698.46,  // [10] F5
  622.25,  // [11] Eb5
  null,    // [12] rest → F3 ghost
  554.37,  // [13] Db5
  622.25,  // [14] Eb5
  554.37,  // [15] Db5
  698.46,  // [16] F5
  554.37,  // [17] Db5
  null,    // [18] rest → Eb3 ghost
  523.25,  // [19] C5
  554.37,  // [20] Db5
  523.25,  // [21] C5
  null,    // [22] rest → Gb3 ghost
  null,    // [23] rest (silent)
  null,    // [24] rest (silent)
  466.16,  // [25] Bb4
  523.25,  // [26] C5
  466.16,  // [27] Bb4
  622.25,  // [28] Eb5
  466.16,  // [29] Bb4
  null,    // [30] rest → F3 ghost
  415.30,  // [31] Ab4
  466.16,  // [32] Bb4
  415.30,  // [33] Ab4
  null,    // [34] rest → Eb3 ghost
  369.99,  // [35] Gb4
  415.30,  // [36] Ab4
  369.99,  // [37] Gb4
  349.23,  // [38] F4
  null,    // [39] rest → Db3 ghost
  349.23,  // [40] F4
  369.99,  // [41] Gb4
  349.23,  // [42] F4
  466.16,  // [43] Bb4
  349.23,  // [44] F4
  null,    // [45] rest → F2 ghost
  311.13,  // [46] Eb4
  349.23,  // [47] F4
  311.13,  // [48] Eb4
  null,    // [49] rest → Eb2 ghost
  277.18,  // [50] Db4
  311.13,  // [51] Eb4
  277.18,  // [52] Db4
  261.63,  // [53] C4
  null,    // [54] rest (silent)
  null,    // [55] rest (silent)
  null,    // [56] rest (silent)
  null,    // [57] rest → Ab3 ghost
  null,    // [58] rest (silent)
  null,    // [59] rest (silent)
  null,    // [60] rest (silent)
  null,    // [61] rest (silent)
];

// Ghost bass notes: index → Hz (very quiet, gain 0.008)
const REST_BASS: Record<number, number> = {
  7:  184.99,  // Gb3
  12: 174.61,  // F3
  18: 155.56,  // Eb3
  22: 184.99,  // Gb3
  30: 174.61,  // F3
  34: 155.56,  // Eb3
  39: 138.59,  // Db3
  45:  87.31,  // F2
  49:  77.78,  // Eb2
  57: 207.65,  // Ab3
};

let melodyIndex = 0;
let lastNoteTime = 0;
let melodyStarted = false;

/**
 * Plays the next note in the Clair de Lune melody.
 * Tempo: 0.42s min interval.
 * Timbre: warm sine pad with gentle reverb.
 */
function playNote(audioCtx: AudioContext, muted: boolean) {
  if (muted || !melodyStarted) return;
  const now = audioCtx.currentTime;
  if (now - lastNoteTime < 0.42) return;
  lastNoteTime = now;

  const noteIndex = melodyIndex % MELODY_NOTES.length;
  const freq = MELODY_NOTES[noteIndex];
  melodyIndex++;

  // Shared reverb
  const convolver = audioCtx.createConvolver();
  const reverbLen = Math.floor(audioCtx.sampleRate * 4.5);
  const reverbBuf = audioCtx.createBuffer(2, reverbLen, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = reverbBuf.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 1.8);
    }
  }
  convolver.buffer = reverbBuf;
  const wetGain = audioCtx.createGain();
  wetGain.gain.value = 0.55;
  convolver.connect(wetGain);
  wetGain.connect(audioCtx.destination);

  if (freq == null) {
    const bassFreq = REST_BASS[noteIndex];
    if (!bassFreq) return;
    const bassOsc = audioCtx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(bassFreq, now);
    const bassGain = audioCtx.createGain();
    bassGain.gain.setValueAtTime(0, now);
    bassGain.gain.linearRampToValueAtTime(0.008, now + 0.15);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
    bassOsc.connect(bassGain);
    bassGain.connect(audioCtx.destination);
    bassGain.connect(convolver);
    bassOsc.start(now);
    bassOsc.stop(now + 3.5);
    return;
  }

  // Melody note — warm sine pad
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  const osc2 = audioCtx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 1.003, now);

  const osc3 = audioCtx.createOscillator();
  osc3.type = 'triangle';
  osc3.frequency.setValueAtTime(freq * 2, now);

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.050, now + 0.08);
  masterGain.gain.setValueAtTime(0.050, now + 0.45);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

  const osc2Gain = audioCtx.createGain();
  osc2Gain.gain.value = 0.70;
  const osc3Gain = audioCtx.createGain();
  osc3Gain.gain.value = 0.06;
  const dryGain = audioCtx.createGain();
  dryGain.gain.value = 0.40;

  osc1.connect(masterGain);
  osc2.connect(osc2Gain); osc2Gain.connect(masterGain);
  osc3.connect(osc3Gain); osc3Gain.connect(masterGain);
  masterGain.connect(dryGain);
  masterGain.connect(convolver);
  dryGain.connect(audioCtx.destination);

  const stopTime = now + 4.2;
  osc1.start(now); osc1.stop(stopTime);
  osc2.start(now); osc2.stop(stopTime);
  osc3.start(now); osc3.stop(stopTime);
}

interface FloatingPhrase {
  id: number;
  text: string;
  x: number;
  y: number;
}

/** Particle — white/pale blue only, no color variants */
interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  brightness: number;
  size: number;
  isGlow: boolean;
  phase: number;
}

export function HeroParticle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const mouseXRef = useRef(-9999);
  const mouseYRef = useRef(-9999);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const [phrases, setPhrases] = useState<FloatingPhrase[]>([]);
  const phraseIdRef = useRef(0);
  const lastPhraseTimeRef = useRef(0);
  const firstPhraseRef = useRef(true);
  const timeRef = useRef(0);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      mutedRef.current = !m;
      return !m;
    });
  }, []);

  /** Pre-warm AudioContext on first user interaction. */
  useEffect(() => {
    const prewarm = () => {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume().catch(() => null);
    };
    document.addEventListener('pointerdown', prewarm, { once: true });
    document.addEventListener('pointermove', prewarm, { once: true });
    return () => {
      document.removeEventListener('pointerdown', prewarm);
      document.removeEventListener('pointermove', prewarm);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !ctx) return;
      const w = canvas.parentElement?.clientWidth ?? window.innerWidth;
      const h = Math.min(window.innerHeight * 0.52, 400);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(DPR, DPR);
      buildParticles(w, h);
    }

    function buildParticles(w: number, h: number) {
      if (!ctx || !canvas) return;
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const octx = offscreen.getContext('2d');
      if (!octx) return;

      const fontSize = Math.min(w / 4.2, 130);
      octx.fillStyle = '#fff';
      octx.font = `700 ${fontSize}px monospace`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText('KAT.LI', w / 2, h / 2);

      const imageData = octx.getImageData(0, 0, w, h);
      const data = imageData.data;
      const gap = 5;
      const newParticles: Particle[] = [];

      for (let py = 0; py < h; py += gap) {
        for (let px = 0; px < w; px += gap) {
          const idx = (py * w + px) * 4;
          if ((data[idx + 3] ?? 0) > 128) {
            const rand = Math.random();
            const size = rand < 0.15 ? 2.6 : rand < 0.45 ? 1.8 : 1.2;
            // 8% glow particles — subtle, not frequent
            const isGlow = Math.random() < 0.08;

            newParticles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              ox: px, oy: py,
              vx: 0, vy: 0,
              brightness: 0.45 + Math.random() * 0.55,
              size,
              isGlow,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
      particlesRef.current = newParticles;
    }

    function animate() {
      if (!ctx || !canvas) return;
      const w = canvas.width / DPR;
      const h = canvas.height / DPR;
      ctx.clearRect(0, 0, w, h);

      timeRef.current += 0.015; // gentle twinkle speed
      const t = timeRef.current;

      const isHover = isHoveringRef.current;
      const mouseX = mouseXRef.current;
      const mouseY = mouseYRef.current;
      const scatter = 48;

      particlesRef.current.forEach((p) => {
        const toOx = p.ox - p.x;
        const toOy = p.oy - p.y;

        if (isHover) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < scatter && dist > 0.01) {
            const force = (scatter - dist) / scatter;
            p.vx += (dx / dist) * force * 2.0;
            p.vy += (dy / dist) * force * 2.0;
          }
          p.vx += toOx * 0.055;
          p.vy += toOy * 0.055;
          p.vx *= 0.78;
          p.vy *= 0.78;
        } else {
          p.vx += toOx * 0.12;
          p.vy += toOy * 0.12;
          p.vx *= 0.70;
          p.vy *= 0.70;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Gentle twinkle — pale blue-white only
        const twinkle = p.brightness * (0.72 + 0.28 * Math.sin(t * 1.6 + p.phase));
        const alpha = isHover
          ? 0.50 + twinkle * 0.50
          : 0.65 + twinkle * 0.35;

        // White with very slight blue tint
        const base = Math.round(200 + twinkle * 55);
        const r = base;
        const g = base;
        const b = Math.min(255, base + 18);

        // Subtle glow halo on 8% of particles
        if (p.isGlow && !isHover) {
          const glowR = p.size * 6;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, `rgba(200, 215, 255, ${0.14 * twinkle})`);
          grad.addColorStop(1, 'rgba(180, 200, 255, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core particle dot
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    /** Click on canvas starts/continues the melody */
    const handleClick = (e: MouseEvent) => {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume().catch(() => null);
      melodyStarted = true;
      playNote(audioCtxRef.current, mutedRef.current);

      const text = pickPhrase(firstPhraseRef.current);
      if (firstPhraseRef.current) firstPhraseRef.current = false;
      const id = ++phraseIdRef.current;
      setPhrases((prev) => [...prev.slice(-2), { id, text, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setPhrases((prev) => prev.filter((ph) => ph.id !== id));
      }, 1600);
    };

    /** Mouse move: continue melody + floating phrases every 3s */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;

      if (melodyStarted && audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume().catch(() => null);
        playNote(audioCtxRef.current, mutedRef.current);
      }

      // Phrases every 3000ms — plenty of gap to avoid overlap
      const now = Date.now();
      if (now - lastPhraseTimeRef.current > 3000) {
        lastPhraseTimeRef.current = now;
        const text = pickPhrase(firstPhraseRef.current);
        if (firstPhraseRef.current) firstPhraseRef.current = false;
        const id = ++phraseIdRef.current;
        setPhrases((prev) => [...prev.slice(-2), { id, text, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setPhrases((prev) => prev.filter((ph) => ph.id !== id));
        }, 1600);
      }
    };

    const handleMouseEnter = () => { isHoveringRef.current = true; };
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      mouseXRef.current = -9999;
      mouseYRef.current = -9999;
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        style={{ display: 'block', cursor: 'default', width: '100%' }}
      />

      {/* Mute button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute ambient audio' : 'Mute ambient audio'}
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '20px',
          background: 'oklch(0.14 0.03 265 / 0.8)',
          border: '1px solid oklch(0.30 0.06 250)',
          color: muted ? 'oklch(0.50 0.04 265)' : 'oklch(0.72 0.15 250)',
          padding: '4px 10px',
          fontSize: '10px',
          fontFamily: 'monospace',
          letterSpacing: '0.12em',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {muted ? '[ MUTED ]' : '[ AUDIO ON ]'}
      </button>

      {/* Floating phrases */}
      {phrases.map((phrase) => (
        <div
          key={phrase.id}
          className="hover-phrase"
          style={{
            position: 'fixed',
            left: phrase.x + 18,
            top: phrase.y - 12,
            color: 'oklch(0.78 0.10 250 / 0.70)',
            fontSize: '10px',
            fontFamily: 'monospace',
            letterSpacing: '0.10em',
            pointerEvents: 'none',
            zIndex: 200,
            whiteSpace: 'nowrap',
          }}
        >
          {phrase.text}
        </div>
      ))}
    </div>
  );
}
