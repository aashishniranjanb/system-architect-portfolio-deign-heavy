# System Architect Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**A cinematic, scroll-driven portfolio website that visually narrates the reverse abstraction journey from user interface to transistor-level physics.**

[Live Demo](#) · [Features](#features) · [Architecture](#architecture) · [Getting Started](#getting-started)

</div>

---

## Overview

This portfolio website is designed for semiconductor engineers, system architects, embedded systems professionals, and deep-tech enthusiasts. It showcases a unique visual journey through the layers of computing — from the OS layer down to silicon.

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                    ABSTRACTION LAYERS                       │
├─────────────────────────────────────────────────────────────┤
│  Layer 0  │  UI / Application    │  Human Interface        │
│  Layer 1  │  OS / Environment    │  Kernel & Drivers       │
│  Layer 2  │  Firmware / ISA      │  Binary & Instructions  │
│  Layer 3  │  VLSI / Silicon      │  Transistors & Physics  │
│  Layer 4  │  The Architect       │  Identity Reveal        │
└─────────────────────────────────────────────────────────────┘
```

</div>

## Features

### Cinematic Visual Journey
- **Stage 0 - Opening Stillness**: CRT terminal boot sequence with phosphor glow, scanlines, and cursor blinking
- **Stage 1 - Environment Layer**: 3D pixel grid with RGB separation effect simulating display penetration
- **Stage 2 - Firmware & ISA**: Binary particle streams, hexadecimal blocks, ARM/RISC-V instruction visualization
- **Stage 3 - VLSI & Physics**: Silicon wafer patterns, GDSII layouts, interactive transistor with electron flow
- **Stage 4 - The Architect**: Blueprint grid, 3D chip visualization, identity reveal

### Portfolio Sections
- **About**: Professional bio, statistics, and expertise areas
- **Projects**: Featured projects with metrics, tech stacks, and highlights
- **Skills**: Interactive skill bars across Languages, Hardware, Embedded, and Protocols
- **Research**: Publications, patents, and citation metrics
- **Contact**: Professional contact form with availability status

### Technical Highlights
- WebGL-powered 3D graphics via React Three Fiber
- Scroll-driven animations with smooth progress tracking
- Responsive design (mobile, tablet, desktop)
- Performance-optimized with dynamic imports
- Grain texture overlay for cinematic effect
- Custom CRT and phosphor glow effects

## Architecture

```
src/
├── app/
│   ├── globals.css      # Global styles, animations, CSS variables
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page with scroll tracking
│
├── components/
│   ├── Stage0Opening.tsx    # CRT terminal boot sequence
│   ├── Stage1Environment.tsx # OS/Kernel layer with pixel effects
│   ├── Stage2Binary.tsx     # Firmware/ISA binary streams
│   ├── Stage3Silicon.tsx    # VLSI transistor visualization
│   ├── Stage4Architect.tsx  # Identity reveal with chip model
│   ├── Navigation.tsx       # Responsive navigation
│   ├── About.tsx            # About section
│   ├── Projects.tsx         # Project showcase
│   ├── Skills.tsx           # Skills visualization
│   ├── Research.tsx         # Publications & patents
│   └── Contact.tsx          # Contact form
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| 3D Graphics | Three.js + React Three Fiber |
| Styling | Tailwind CSS 4 |
| Fonts | Inter (sans-serif), JetBrains Mono (monospace) |

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Charcoal | `#0F1216` | Primary background |
| Slate Blue | `#1B2633` | Secondary/cards |
| Electric Amber | `#FFB000` | Accent/highlights |
| Cold Cyan | `#00D1FF` | Technical elements |

### Typography
- **Monospace**: JetBrains Mono — Technical narration, code, metrics
- **Sans-serif**: Inter — Identity, profile, human-facing content

### Motion Philosophy
> All motion must feel physically motivated. No random easing. Camera motion must simulate mass, inertia, and depth.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/system-architect-portfolio.git

# Navigate to project
cd system-architect-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Personal Information
Update the following components with your information:
- `src/components/About.tsx` — Bio, stats, expertise
- `src/components/Projects.tsx` — Your projects
- `src/components/Skills.tsx` — Your skills
- `src/components/Research.tsx` — Publications & patents
- `src/components/Contact.tsx` — Contact details

### Boot Messages
Customize the terminal boot sequence in `src/components/Stage0Opening.tsx`:
```typescript
const bootMessages = [
  '[    0.000000] Your custom boot message...',
  // ...
];
```

## Performance

- Dynamic imports for Three.js components (SSR disabled)
- Optimized scroll event handling with passive listeners
- Efficient particle systems with instanced meshes
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

WebGL 2.0 required for 3D visualizations.

## License

MIT License — feel free to use this as a template for your own portfolio.

---

<div align="center">

**Designed & Built with precision**

*From silicon to software, from electrons to experiences.*

</div>
