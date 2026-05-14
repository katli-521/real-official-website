# Edit History

## V1: Full KAT.LI Portfolio Build

Built a complete personal portfolio website from scratch for Katerina Li (KAT.LI) featuring a dark gradient aesthetic, particle title hero with ambient Debussy-style audio, persistent navigation, and 7 full sections: Home, Bio (3 subpages), Music (6 tracks), Film (3 rescores), Game, Live, and Interaction.

## V2: Particle Refinement, Label Updates & Bio Contact Page

Refined particle hero (smaller scatter radius, varying brightness/size, starlight halos, faster snap-back), updated homepage corner labels (added MUSIC PRODUCER, changed bottom-left to NYU MM. Music Technology), replaced floating phrases with 7 new ones, and added Bio Contact subpage (2.4) with email, Instagram, YouTube, and NetEase links. Bio sidebar order changed to CV → Cross-disciplinary → readme → Contact.

## V3: Corner Label Cleanup, Floating Phrases Update & Dynamic Background

Removed "audio engineer · music producer" from the bottom-left corner (now shows only NYU info), trimmed floating phrases to 4 (ISFP / PERFECT PITCH / IMMERSIVE AUDIO / NYU MUSIC TECH), added slow-drifting nebula depth orbs as ambient background, and improved the Debussy audio engine (lower volume 0.025, longer 6s reverb, wetter mix 85%, true chromatic C3 scale).

## V4: Real Media Integration — Audio, YouTube, Album Covers

Replaced all placeholder elements in Music and Film sections with real content: 6 MP3 audio tracks with functional custom player (play/pause, seek, time display), 6 album cover images, YouTube embeds for Dream in Spotlight and One Day in Music section, and 3 real YouTube embeds in Film section. Film titles updated (Wandering Earth rescore, She's Falling Into the Sea with full credits and story), and the player enforces single-track playback.

## V5: Fixed YouTube Error 153 & Added Silent Hill f Video

Switched all YouTube embeds from youtube.com to youtube-nocookie.com with updated sandbox/referrer attributes to fix Error 153 in sandboxed iframes. Added the real Silent Hill f rescore video (4La4wpYSJmQ) to the Game section, replacing the placeholder.

## V6: Melody Refinement, Particle Fix, Phrases Polish & Admitted Schools

Updated Clair de Lune melody with corrected A♭5 octave, rests with ghost bass notes (G♭3/F3/E♭3), and stronger particle spring-back physics so particles never stay scattered. Floating phrases now appear at 70% opacity, fade in 1.2s, trigger more frequently. Added Bio section 2.4 "Admitted Schools" (NYU committed, Berklee/SFCM/LACM with scholarships).

## V7: Full Melody Rewrite, Audio Trigger on Click, Cursor Restore & New Phrases

Rewrote the full Clair de Lune melody with exact frequency sequence (A♭2 arpeggio up, two full sections with rests and ghost bass), slowed tempo significantly (0.65s min interval), added lush synth pad timbre (sine chorus + long reverb). Audio now only plays when clicking the KAT.LI canvas (not on all mouse movement). Removed custom circle cursor (restored default pointer). "Perfect Pitch" always appears first; "NYU Music Tech" is rare. Added new phrases: Grade 8 Aural Skills Full Marks, Film Scoring, UC Berkeley Alumni. Tagline updated to "click kat.li to play some debussy ;)".

## V8: Corrected B♭ Frequencies, Tempo Adjustment & Phrase Rebalance

Fixed all B notes to B♭ (466.16 Hz for B♭4), corrected rest counts to match exact spec (2+1, 1+1, 1+1, 3+1 structure), set ghost bass indices precisely. Tempo changed to 0.42s interval for gentle flowing Debussy feel. "Perfect Pitch" weight reduced to 2× (not 4×), "NYU Music Tech" kept rare (weight 1), added METALCORE to phrase pool.

## V9: Exact Frequency Fix, Shiny Particles, Faster Loading & Phrase Spacing

Corrected all melody frequencies to exact spec (Ab2=329.63, Ab3=391.99, Ab5=493.88, Bb4=246.94). Restructured note sequence (arpeggio → 2 rests → F5 → 2 rests with Gb3 ghost). Added sparkle/cross-shaped star particles, warm gold/pink accent particles, larger glow halos and faster twinkle for a more fun, jewel-like look. Floating phrases now appear every 2500ms (was 1300ms) to prevent overlap. Music/Film iframes use loading="lazy" and audio uses preload="none" for faster page opening.

## V10: Full Melody Frequency Recalculation, Clean Particles & Loading Fix

Recalculated every note frequency from scratch using A4=440Hz equal temperament (Ab2=103.83, Ab3=207.65, Ab5=830.61, Bb4=466.16, F5=698.46, Eb5=622.25, etc.) — all previous octave errors corrected. Reverted particles to clean white/pale-blue only (no colors, less frequent shimmer at 8% glow). Floating phrases now every 3s with max 2 visible. Reverted audio to preload="metadata" for faster perceived loading.
