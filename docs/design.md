# Design System

## Colors

- Primary: `oklch(0.72 0.15 250)` — blue-violet (accent/highlight)
- Background: `oklch(0.07 0.02 265)` — deep dark navy-black
- Card/Surface: `oklch(0.10 0.025 265)` — slightly lighter dark
- Text: `oklch(0.93 0.01 265)` — off-white
- Muted Text: `oklch(0.58 0.04 265)` — medium gray
- Border: `oklch(0.25 0.04 265)` — subtle dark border
- Accent Glow: `oklch(0.62 0.18 240)` — vivid blue

## Typography

- Main Font: Inter (sans-serif)
- Code/Labels: monospace (system)
- Body Text: ui-serif / Georgia for readable paragraphs

## Style Preferences

- Overall Style: Dark digital space, engineering-focused, cool technologist
- Border Radius: 0px (sharp rectangular corners everywhere, enforced globally)
- Animations: Slow & smooth — particle scatter, star pulse, fade
- Inspiration: Linear, Vercel — minimal, precise, high contrast

## Component Guidelines

- All corners are sharp (border-radius: 0 !important in global CSS)
- Navigation is always fixed at top, 52px height, with blur backdrop
- Section headers use monospace font with letter-spacing
- Body paragraphs use serif font for readability
- Status labels use 9px monospace ALL CAPS with 0.14em letter spacing
- Borders/dividers use oklch(0.18–0.25 0.04 265)
- Active states use blue-violet primary color
