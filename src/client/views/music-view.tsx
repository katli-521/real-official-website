/**
 * Music section — lists all tracks with real audio players, album covers,
 * credits, YouTube embeds, and story notes.
 *
 * How it works:
 * 1. Each track has a real <audio> element with Dropbox MP3 direct links.
 * 2. A custom player UI wraps the audio element with play/pause, progress bar,
 *    and time display.
 * 3. Album cover images load from Dropbox direct links.
 * 4. Dream in Spotlight and One Day have YouTube embeds above the audio player.
 * 5. Only one track plays at a time — clicking another pauses the current one.
 */
import { PageLayout } from '@/components/page-layout';
import { Link } from '@tanstack/react-router';
import { useRef, useState, useCallback } from 'react';

interface Track {
  id: string;
  title: string;
  credits: { role: string; name: string }[];
  year: string;
  story: string;
  youtubeId?: string;
  hasSubpage?: boolean;
  stat?: string;
  coverUrl: string;
  audioUrl: string;
}

const tracks: Track[] = [
  {
    id: 'dream-in-spotlight',
    title: 'Dream In Spotlight',
    hasSubpage: true,
    credits: [
      { role: 'Lyricist', name: 'Andrew She' },
      { role: 'Composer', name: 'Katerina Li' },
      { role: 'Producer', name: 'Katerina Li' },
      { role: 'Recorder', name: 'Yunkai Huang' },
      { role: 'Audio Engineer', name: 'Katerina Li' },
      { role: 'Singers', name: 'Yuxuan Ye, Katerina Li' },
    ],
    year: '2023',
    youtubeId: 'YIEg-T6MZk8',
    stat: '165,000+ streams · 999+ comments on NetEase',
    coverUrl: 'https://dl.dropboxusercontent.com/scl/fi/1l8ks4768sksm5yl7wdpq/dream-in-spotlight.jpg?rlkey=d68y9axlm6sskx182p27jbyhi&st=so3p8vww&dl=0',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/xy3g1vqf9jfsoao25o3du/dream-in-spotlight.mp3?rlkey=s65czygnprayx3xpkoru428w6&st=0y7ttdl5&dl=0',
    story: `When my dorm lost power at midnight, I brought my laptop to the shared bathroom, unplugged a washing machine, and sat on a small stool making music. In that dimly lit room, I finished mixing Dream in Spotlight, which later became the BNU Valley Festival theme, performed for 1,164 people, and won a national outstanding original song award.\n\nThis taught me: real audio engineering isn't about perfect studios or expensive gear. It's about making your voice heard, even with limited resources.\n\nMr. Mike Chafee dedicated his life to accurate monitoring. I hope to continue his legacy as a Chinese female audio engineer in a male-dominated field, helping more women creators access better sound environments and clear monitoring.\n\nDream in Spotlight won first prize in the university competition and was performed live at CPAA Grand Theatre.`,
  },
  {
    id: 'circle',
    title: 'Circle.',
    credits: [
      { role: 'Composer', name: 'Katerina Li' },
      { role: 'Producer', name: 'Katerina Li' },
      { role: 'Mixing Engineer', name: 'Katerina Li' },
      { role: 'Photographer', name: 'Katerina Li' },
    ],
    year: '2020',
    stat: '2.1M streams · 9999+ likes',
    coverUrl: 'https://dl.dropboxusercontent.com/scl/fi/psjy6ndnkuo93415vxqe3/circle.jpg?rlkey=4nx82g7fyh97veub4fqdlre0v&st=i4daianr&dl=0',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/4vj6voo2xjrdmq3entvqo/circle.mp3?rlkey=q9rpgkjz0y33tvekpzce5edi7&st=juhy9bil&dl=0',
    story: `One of my first three published songs, with 2.1 million streams and 9999+ likes. The cover photo shows a pill from clothing, shot under soft light.`,
  },
  {
    id: 'voyage',
    title: 'Voyage',
    credits: [
      { role: 'Composer', name: 'Katerina Li / Winter-X' },
      { role: 'Producer', name: 'Katerina Li' },
      { role: 'Mixing Engineer', name: 'Katerina Li' },
    ],
    year: '2021',
    coverUrl: 'https://dl.dropboxusercontent.com/scl/fi/gvyzugqwq5leozecjxr1v/voyage.jpg?rlkey=4203mmyla2oqsrrao2dnhin4o&st=3rha238q&dl=0',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/0y0j6wptvc0yu1ncf5h8a/voyage.mp3?rlkey=lbzk4qxa5kcpk1nf4jq2eslaj&st=4q7iq5p2&dl=0',
    story: `Written for Winter-X's novel Voyage. Built from a simple 3-note melody; expanded with chords, layers, and chorus motif. First project using Kontakt and deep bass design in Serum.`,
  },
  {
    id: 'our-2020',
    title: 'Our 2020',
    credits: [
      { role: 'Composer', name: 'Katerina Li / Winter-X' },
      { role: 'Producer', name: 'Katerina Li / Winter-X' },
      { role: 'Mixing Engineer', name: 'Katerina Li / Winter-X' },
    ],
    year: '2020',
    coverUrl: 'https://dl.dropboxusercontent.com/scl/fi/0kgqv9g0bczefrrkv2uui/our-2020.jpg?rlkey=x9irxmqu2577ngwbyp967855q&st=sub0497b&dl=0',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/q0p3dx7iqc6p9k3e2w4z2/our-2020.mp3?rlkey=cgm7lmd01c8yew9cnnwzfh0c4&st=t6qjs1rg&dl=0',
    story: `A melodic dubstep song produced during the pandemic lockdown, with students shouting out our voices. I, as the first female president of Electronic Music Club from Zhuhai No.1 High School, led and co-produced this with another electronic music club from Huizhou No.1 High School: 2020 was a difficult year, with the virus spreading, stars falling, and us moving forward in darkness. Falling is proof that we are moving forward. This is not a desperate 2020 — this is our 2020. This song eventually ranked top 7 in the Chinese National Electronic Music Board in 2020.`,
  },
  {
    id: 'intro-seaside',
    title: 'Intro (from album Seaside)',
    credits: [
      { role: 'Composer', name: 'Katerina Li' },
      { role: 'Producer', name: 'Katerina Li' },
      { role: 'Mixing Engineer', name: 'Katerina Li' },
    ],
    year: '2024',
    coverUrl: 'https://dl.dropboxusercontent.com/scl/fi/s02mwwac4lb2rn187kvy6/intro.jpg?rlkey=szdtetjas85bedthn0semw5sq&st=p0ajthr1&dl=0',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/7wphky3flymc8wsuitjou/intro.mp3?rlkey=ajwu0f0dcrx3jxouw2yfg3ibq&st=oedc7co5&dl=0',
    story: `Ambient improvisation inspired by Manchester by the Sea. Guess how I found the easiest way to make ambient music ;) The answer is pretty clear from the track. I also had a piano improvisation for this album, but I didn't have the recording conditions for a nice piano recording, and there were too many details in my composition for me to produce. The demo made on my DAW annoys me. I hope some day I can have the chance to record on a grand piano in a nice studio.`,
  },
  {
    id: 'one-day',
    title: 'One Day',
    credits: [
      { role: 'Composer', name: 'Katerina Li' },
      { role: 'Pianist', name: 'Katerina Li' },
    ],
    year: '',
    youtubeId: 'ceXM0o4ODWg',
    coverUrl: 'https://dl.dropboxusercontent.com/scl/fi/fmcdxcivjp8e3b567b8cg/one-day.jpg?rlkey=1o4jsyc91x0phc5fmxos1x6qv&st=9uywwhfc&dl=0',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/yg7asmm5nzstr75g8k8eg/one-day.mp3?rlkey=zjt839lri535nhiatwlhspw90&st=c56krg5d&dl=0',
    story: `Composed in a single, unedited improvisation, this piece emerged in the quiet aftermath of watching One Day. The film's portrayal of love — interwoven with friendship, time, and unspoken emotions — resonated deeply, shaping every note as it unfolded. Rather than a structured composition, this music captures a fleeting moment of feeling: tenderness, longing, and the bittersweet weight of connection. It is not just about love in its romantic sense but the kind that lingers between friends, undefined yet profound.\n\nIt was later used in the movie She's Falling Into the Sea for a dancing scene. Please go to the Film tab and look for She's Falling Into the Sea.`,
  },
];

/**
 * AudioPlayer — a functional audio player wrapping the native <audio> element.
 * Supports play/pause, seek bar, and time display.
 * Calls onPlay when playback starts, so the parent can pause other tracks.
 */
function AudioPlayer({ audioUrl, trackId, currentlyPlaying, onPlay }: {
  audioUrl: string;
  trackId: string;
  currentlyPlaying: string | null;
  onPlay: (id: string) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  // Pause if another track starts playing
  if (currentlyPlaying !== trackId && isPlaying) {
    audioRef.current?.pause();
    setIsPlaying(false);
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      onPlay(trackId);
      audio.play().catch(() => null);
      setIsPlaying(true);
    }
  }, [isPlaying, trackId, onPlay]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
    setCurrentTime(formatTime(audio.currentTime));
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(formatTime(audio.duration));
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  }, []);

  return (
    <div style={{ marginTop: '12px' }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          border: '1px solid oklch(0.22 0.04 265)',
          background: 'oklch(0.09 0.02 265)',
        }}
      >
        {/* Play/pause button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: '28px',
            height: '28px',
            border: '1px solid oklch(0.35 0.08 250)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            color: 'oklch(0.72 0.15 250)',
            fontSize: '10px',
          }}
        >
          {isPlaying ? '■' : '▶'}
        </button>

        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{ flex: 1, height: '4px', background: 'oklch(0.20 0.04 265)', cursor: 'pointer', position: 'relative' }}
        >
          <div style={{ width: `${progress}%`, height: '100%', background: 'oklch(0.72 0.15 250)', transition: 'width 0.1s linear' }} />
        </div>

        {/* Time display */}
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.40 0.04 265)', whiteSpace: 'nowrap' }}>
          {currentTime} / {duration}
        </span>
      </div>
    </div>
  );
}

/** YouTube embed iframe for a given video ID. */
function YoutubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        marginTop: '12px',
        marginBottom: '4px',
        border: '1px solid oklch(0.18 0.03 265)',
        overflow: 'hidden',
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

/** Album cover image with graceful fallback to a monochrome placeholder. */
function AlbumCover({ url, title }: { url: string; title: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        style={{
          width: '120px',
          height: '120px',
          flexShrink: 0,
          border: '1px solid oklch(0.22 0.04 265)',
          background: 'oklch(0.10 0.03 265)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'oklch(0.30 0.04 265)', letterSpacing: '0.08em' }}>COVER</span>
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={`${title} album cover`}
      onError={() => setErrored(true)}
      style={{
        width: '120px',
        height: '120px',
        flexShrink: 0,
        objectFit: 'cover',
        border: '1px solid oklch(0.22 0.04 265)',
        display: 'block',
      }}
    />
  );
}

export function MusicView() {
  // Track which song is currently playing so we can pause others
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const handlePlay = useCallback((id: string) => {
    setCurrentlyPlaying(id);
  }, []);

  return (
    <PageLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          music /
        </div>
        <h1 style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '3rem' }}>
          Music
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {tracks.map((track) => (
            <div key={track.id} style={{ borderTop: '1px solid oklch(0.18 0.03 265)', paddingTop: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                {/* Left: info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
                    <h2 style={{ fontFamily: 'monospace', fontSize: '17px', fontWeight: 600, color: 'oklch(0.88 0.08 250)', letterSpacing: '0.04em' }}>
                      {track.title}
                    </h2>
                    {track.hasSubpage && (
                      <Link
                        to="/music/$id"
                        params={{ id: track.id }}
                        style={{ fontFamily: 'monospace', fontSize: '9px', color: 'oklch(0.55 0.10 250)', letterSpacing: '0.1em', border: '1px solid oklch(0.25 0.06 250)', padding: '2px 6px', textTransform: 'uppercase', flexShrink: 0 }}
                      >
                        details →
                      </Link>
                    )}
                  </div>

                  {/* Credits */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginBottom: '12px' }}>
                    {track.credits.map((c, i) => (
                      <span key={i} style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.48 0.04 265)' }}>
                        <span style={{ color: 'oklch(0.36 0.06 250)' }}>{c.role}:</span> {c.name}
                      </span>
                    ))}
                    {track.year && (
                      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.36 0.04 265)' }}>{track.year}</span>
                    )}
                  </div>

                  {track.stat && (
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.60 0.10 250)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      {track.stat}
                    </div>
                  )}

                  {/* YouTube embed (Dream in Spotlight & One Day) */}
                  {track.youtubeId && <YoutubeEmbed videoId={track.youtubeId} />}

                  {/* Real audio player */}
                  <AudioPlayer
                    audioUrl={track.audioUrl}
                    trackId={track.id}
                    currentlyPlaying={currentlyPlaying}
                    onPlay={handlePlay}
                  />

                  {/* Story */}
                  <div style={{ marginTop: '16px' }}>
                    {track.story.split('\n\n').map((para, i) => (
                      <p key={i} style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: '13px', lineHeight: 1.85, color: 'oklch(0.62 0.03 265)', marginBottom: '10px' }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right: real album cover */}
                <AlbumCover url={track.coverUrl} title={track.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
