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
// Clair de Lune melody — frequencies recalculated from scratch.
//
// Standard equal temperament, A4 = 440 Hz. Formula: f = 440 * 2^((n-49)/12)
// Piano key numbers (A4 = 49):
//
//   Ab2  = key 20  → 440 * 2^((20-49)/12) = 103.83 Hz
//   Ab3  = key 32  → 440 * 2^((32-49)/12) = 207.65 Hz
//   Ab4  = key 44  → 440 * 2^((44-49)/12) = 415.30 Hz
//   Ab5  = key 56  → 440 * 2^((56-49)/12) = 830.61 Hz
//   F2   = key 17  → 440 * 2^((17-49)/12) =  87.31 Hz
//   F3   = key 29  → 440 * 2^((29-49)/12) = 174.61 Hz
//   F4   = key 41  → 440 * 2^((41-49)/12) = 349.23 Hz
//   F5   = key 53  → 440 * 2^((53-49)/12) = 698.46 Hz
//   Eb2  = key 15  → 440 * 2^((15-49)/12) =  77.78 Hz
//   Eb3  = key 27  → 440 * 2^((27-49)/12) = 155.56 Hz
//   Eb4  = key 39  → 440 * 2^((39-49)/12) = 311.13 Hz
//   Eb5  = key 51  → 440 * 2^((51-49)/12) = 622.25 Hz
//   Db3  = key 25  → 440 * 2^((25-49)/12) = 138.59 Hz
//   Db4  = key 37  → 440 * 2^((37-49)/12) = 277.18 Hz
//   Db5  = key 49  → 440 * 2^((49-49)/12) = 554.37 Hz  [note: Db5=C#5, key 49 offset from A4]
//          Actually Db5 = key 49 is C#5 but we use: 440*2^(3/12)=554.37 ✓
//   Gb3  = key 30  → 440 * 2^((30-49)/12) = 184.99 Hz
//   Gb4  = key 42  → 440 * 2^((42-49)/12) = 369.99 Hz
//   C4   = key 36  → 440 * 2^((36-49)/12) = 261.63 Hz
//   C5   = key 48  → 440 * 2^((48-49)/12) = 523.25 Hz
//   Bb4  = key 46  → 440 * 2^((46-49)/12) = 466.16 Hz
//
// Full sequence from user spec (null = rest; ghost bass in REST_BASS map):
//
// Line 1: Ab2, Ab3, Ab4, Ab5, rest, rest, F5, rest[Gb3], rest
// Line 2: Eb5, F5, Eb5, rest[F3], rest
// Line 3: Db5, Eb5, Db5, F5, rest, Db5, rest[Eb3]
// Line 4: C5, Db5, C5, rest[Gb3], rest, rest
// Line 5: Bb4, C5, Bb4, Eb5, Bb4, rest[F3], Ab4, Bb4, Ab4, rest[Eb3], Gb4, Ab4, Gb4, F4, rest, rest, rest[Db3]
// Line 6: F4, Gb4, F4, Bb4, F4, rest[F2], Eb4, F4, Eb4, rest[Eb2], Db4, Eb4, Db4, C4, rest, rest, rest, Ab3[ghost], rest, rest, rest, rest
// ---------------------------------------------------------------------------
const MELODY_NOTES: (number | null)[] = [
  // Line 1: Ab2, Ab3, Ab4, Ab5, rest, rest, F5, rest, rest
  103.83,  // [0]  Ab2   (very low, near-silent — handled by low gain in playNote)
  207.65,  // [1]  Ab3
  415.30,  // [2]  Ab4
  830.61,  // [3]  Ab5
  null,    // [4]  rest (silent)
  null,    // [5]  rest (silent)
  698.46,  // [6]  F5
  null,    // [7]  rest → Gb3 ghost
  null,    // [8]  rest (silent)
  // Line 2: Eb5, F5, Eb5, rest, rest
  622.25,  // [9]  Eb5
  698.46,  // [10] F5
  622.25,  // [11] Eb5
  null,    // [12] rest → F3 ghost
  null,    // [13] rest (silent)
  // Line 3: Db5, Eb5, Db5, F5, rest, Db5, rest
  554.37,  // [14] Db5
  622.25,  // [15] Eb5
  554.37,  // [16] Db5
  698.46,  // [17] F5
  null,    // [18] rest (silent)
  554.37,  // [19] Db5
  null,    // [20] rest → Eb3 ghost
  // Line 4: C5, Db5, C5, rest, rest, rest
  523.25,  // [21] C5
  554.37,  // [22] Db5
  523.25,  // [23] C5
  null,    // [24] rest → Gb3 ghost
  null,    // [25] rest (silent)
  null,    // [26] rest (silent)
  // Line 5: Bb4, C5, Bb4, Eb5, Bb4, rest, Ab4, Bb4, Ab4, rest, Gb4, Ab4, Gb4, F4, rest, rest, rest
  466.16,  // [27] Bb4
  523.25,  // [28] C5
  466.16,  // [29] Bb4
  622.25,  // [30] Eb5
  466.16,  // [31] Bb4
  null,    // [32] rest → F3 ghost
  415.30,  // [33] Ab4
  466.16,  // [34] Bb4
  415.30,  // [35] Ab4
  null,    // [36] rest → Eb3 ghost
  369.99,  // [37] Gb4
  415.30,  // [38] Ab4
  369.99,  // [39] Gb4
  349.23,  // [40] F4
  null,    // [41] rest (silent)
  null,    // [42] rest (silent)
  null,    // [43] rest → Db3 ghost
  // Line 6: F4, Gb4, F4, Bb4, F4, rest, Eb4, F4, Eb4, rest, Db4, Eb4, Db4, C4, rest, rest, rest, Ab3, rest, rest, rest, rest
  349.23,  // [44] F4
  369.99,  // [45] Gb4
  349.23,  // [46] F4
  466.16,  // [47] Bb4
  349.23,  // [48] F4
  null,    // [49] rest → F2 ghost
  311.13,  // [50] Eb4
  349.23,  // [51] F4
  311.13,  // [52] Eb4
  null,    // [53] rest → Eb2 ghost
  277.18,  // [54] Db4
  311.13,  // [55] Eb4
  277.18,  // [56] Db4
  261.63,  // [57] C4
  null,    // [58] rest (silent)
  null,    // [59] rest (silent)
  null,    // [60] rest (silent)
  null,    // [61] rest → Ab3 ghost
  null,    // [62] rest (silent)
  null,    // [63] rest (silent)
  null,    // [64] rest (silent)
  null,    // [65] rest (silent)
];

// Ghost bass notes: index → Hz (very quiet background pulse)
// Ab2 (index 0) and Ab3 (index 1) are played as near-silent melody notes with extra-low gain.
const REST_BASS: Record<number, number> = {
  7:  184.99,  // Gb3 ghost
  12: 174.61,  // F3 ghost
  20: 155.56,  // Eb3 ghost
  24: 184.99,  // Gb3 ghost
  32: 174.61,  // F3 ghost
  36: 155.56,  // Eb3 ghost
  43: 138.59,  // Db3 ghost
  49:  87.31,  // F2 ghost
  53:  77.78,  // Eb2 ghost
  61: 207.65,  // Ab3 ghost
};

// Indices that are "very low volume, almost unheard" bass register melody notes
const NEAR_SILENT_INDICES = new Set([0, 1]);

let melodyIndex = 0;
let lastNoteTime = 0;
let melodyStarted = false;

/**
 * Plays the next note in the Clair de Lune melody.
 * Tempo: 0.42s min interval.
 * Timbre: dreamy sine pad — mid-scooped EQ, two-stage hall reverb for wide open space.
 *
 * Special cases:
 * - NEAR_SILENT_INDICES (Ab2, Ab3): played at very low gain (0.012) — almost unheard.
 * - REST_BASS entries: ghost bass pulse at gain 0.022 — clearly audible but gentle.
 * - Normal melody notes: gain 0.048 (raised for more volume).
 *
 * Reverb architecture (hall simulation):
 * - Early reflections: 0.8s bright tail (gain 0.40) — width and room presence
 * - Late reverb: 5s diffuse hall tail (gain 0.72) with 60ms pre-delay — depth/distance
 * - Pre-delay separates the dry attack from the reverb wash → concert hall feel
 * - Mid scoop EQ: 800 Hz, -8 dB, Q=1.2 — keeps notes clear despite big reverb
 * - Dry signal: 0.38
 * - Decay: 4.5s
 */
function playNote(audioCtx: AudioContext, muted: boolean) {
  if (muted || !melodyStarted) return;
  const now = audioCtx.currentTime;
  if (now - lastNoteTime < 0.42) return;
  lastNoteTime = now;

  const noteIndex = melodyIndex % MELODY_NOTES.length;
  const freq = MELODY_NOTES[noteIndex];
  melodyIndex++;

  // Reverb — two-stage: short early reflections (0.06s pre-delay, 1.8s) + long hall tail (5s)
  // This creates a wide, open space feeling instead of a narrow studio box.
  // Pre-delay on the tail separates the dry attack from the reverb wash, giving a "concert hall" depth.
  const sampleRate = audioCtx.sampleRate;

  // Early reflections: short, bright (0.8s tail, no pre-delay)
  const earlyConv = audioCtx.createConvolver();
  const earlyLen = Math.floor(sampleRate * 0.8);
  const earlyBuf = audioCtx.createBuffer(2, earlyLen, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = earlyBuf.getChannelData(ch);
    for (let i = 0; i < earlyLen; i++) {
      // Sparse early reflections — fast decay, slight L/R offset for width
      const t = i / earlyLen;
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * (ch === 0 ? 1 : 0.92);
    }
  }
  earlyConv.buffer = earlyBuf;
  const earlyWet = audioCtx.createGain();
  earlyWet.gain.value = 0.40;
  earlyConv.connect(earlyWet);
  earlyWet.connect(audioCtx.destination);

  // Late hall reverb: 5s tail with pre-delay node for depth
  const lateConv = audioCtx.createConvolver();
  const lateLen = Math.floor(sampleRate * 5.0);
  const lateBuf = audioCtx.createBuffer(2, lateLen, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = lateBuf.getChannelData(ch);
    for (let i = 0; i < lateLen; i++) {
      const t = i / lateLen;
      // Dense diffuse tail — slow build-up then long decay (power 1.8 = gentle tail)
      d[i] = (Math.random() * 2 - 1) * Math.min(t * 8, 1) * Math.pow(1 - t, 1.8) * (ch === 0 ? 1 : 0.88);
    }
  }
  lateConv.buffer = lateBuf;
  // Pre-delay: 60ms — separates attack from reverb wash, makes room sound larger
  const preDelay = audioCtx.createDelay(0.2);
  preDelay.delayTime.value = 0.06;
  const lateWet = audioCtx.createGain();
  lateWet.gain.value = 0.72;
  lateConv.connect(lateWet);
  lateWet.connect(audioCtx.destination);

  // Unified convolver alias used below for routing melody signal into reverb
  const convolver = earlyConv;  // melody signal feeds both convolver chains below

  // Rest slot — ghost bass, audible but gentle, feeds both reverb chains
  if (freq == null) {
    const bassFreq = REST_BASS[noteIndex];
    if (!bassFreq) return;
    const bassOsc = audioCtx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(bassFreq, now);
    const bassGain = audioCtx.createGain();
    bassGain.gain.setValueAtTime(0, now);
    bassGain.gain.linearRampToValueAtTime(0.022, now + 0.20);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    bassOsc.connect(bassGain);
    bassGain.connect(audioCtx.destination);
    bassGain.connect(earlyConv);
    bassGain.connect(preDelay); preDelay.connect(lateConv);
    bassOsc.start(now);
    bassOsc.stop(now + 4.0);
    return;
  }

  // Determine peak gain — raised overall for more volume
  // Near-silent for Ab2/Ab3 arpeggio opening notes
  const peakGain = NEAR_SILENT_INDICES.has(noteIndex) ? 0.012 : 0.048;

  // Melody note — dreamy pure sine pad (two slightly detuned sines)
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  const osc2 = audioCtx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 1.007, now);

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(peakGain, now + 0.15);
  masterGain.gain.setValueAtTime(peakGain, now + 0.50);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

  const osc2Gain = audioCtx.createGain();
  osc2Gain.gain.value = 0.60;

  // Mid-scoop EQ: peaking filter at 800 Hz, -8 dB, Q=1.2
  const midEq = audioCtx.createBiquadFilter();
  midEq.type = 'peaking';
  midEq.frequency.value = 800;
  midEq.gain.value = -8;
  midEq.Q.value = 1.2;

  // Dry signal — direct output for attack clarity
  const dryGain = audioCtx.createGain();
  dryGain.gain.value = 0.38;

  osc1.connect(masterGain);
  osc2.connect(osc2Gain); osc2Gain.connect(masterGain);
  masterGain.connect(midEq);
  midEq.connect(dryGain);
  // Feed both reverb stages: early reflections (width) + late hall (depth)
  midEq.connect(earlyConv);
  midEq.connect(preDelay); preDelay.connect(lateConv);
  dryGain.connect(audioCtx.destination);

  const stopTime = now + 5.5;
  osc1.start(now); osc1.stop(stopTime);
  osc2.start(now); osc2.stop(stopTime);
}

interface FloatingPhrase {
  id: number;
  text: string;
  x: number;
  y: number;
}

/** Particle — pure white dots, no glow, no color */
interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  brightness: number;
  size: number;
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
            const size = rand < 0.15 ? 2.4 : rand < 0.45 ? 1.6 : 1.1;

            newParticles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              ox: px, oy: py,
              vx: 0, vy: 0,
              brightness: 0.55 + Math.random() * 0.45,
              size,
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

        // Pure white — constant opacity, no twinkle, no color
        const alpha = p.brightness * (isHover ? 0.75 : 0.85);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
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
