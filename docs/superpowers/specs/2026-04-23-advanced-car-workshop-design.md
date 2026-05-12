# ADVANCED CAR WORKSHOP Website Design

## Goal
Build a production-grade, ultra-smooth, cinematic website for ADVANCED CAR WORKSHOP that feels like a futuristic automotive tech startup rather than a local garage while still making service booking and direct contact obvious.

## Brand Positioning
ADVANCED CAR WORKSHOP should read as a high-tech 4-wheeler service platform. The experience should feel premium, precise, and immersive. Trust comes from polished motion, system-like UI, cinematic lighting, and disciplined information hierarchy rather than crowded garage-style marketing.

## Visual Direction
- Dark futuristic interface with glassmorphism panels, blur, reflections, and depth
- Palette:
  - Background: `#0B0F14`
  - Secondary surfaces: `#111827`
  - Accent red: `#EF4444`
  - Accent blue glow: `#3B82F6`
  - Text: `#E5E7EB`
- Minimal typography with strong contrast and restrained copy
- Cinematic lighting and reflective surfaces
- Layout should feel premium and intentional, not cluttered or template-like

## Experience Principles
- Smoothness is mandatory: everything glides with momentum and no hard jumps
- Motion supports clarity rather than overwhelming the user
- The homepage must look premium while keeping service access and contact actions obvious
- Desktop gets the full cinematic treatment; mobile keeps the same mood with reduced animation density and lighter 3D

## Tech Stack
- React for application structure
- GSAP for motion choreography and interactions
- Lenis for momentum-based smooth scrolling
- Three.js via React Three Fiber / Drei for 3D scenes and ambient visual depth
- Vite for bundling and chunk splitting

## Page Structure
1. Loader
2. Hero
3. Services
4. Smart Booking
5. Contact + Map
6. Persistent contact actions

## Loader
The opening experience replaces a normal spinner with multiple realistic 3D metallic gears.

### Loader behavior
- Several gears rotate at different speeds and directions
- Surfaces should look metallic with shadows, reflections, and subtle red/blue glow accents
- Status text reads: `Initializing Garage Systems…`
- Final transition:
  - gears accelerate
  - motion blur increases
  - loader dissolves into homepage

### Loader intent
The loader should establish the brand as a high-tech automotive system before the main content appears.

## Hero
The hero is fullscreen and anchored by a premium 3D 4-wheeler model or equivalent high-fidelity automotive scene.

### Hero content
- Tagline: `Advanced Car Care, One Call Away`
- Primary CTAs:
  - Call Now
  - WhatsApp
  - Book Service
- The navigation stays sticky with blur and glass treatment

### Hero motion
- Car rotates slowly
- Camera drifts subtly for depth
- Lighting and reflections feel cinematic
- Copy and CTA stack reveal with blur-to-clear motion and soft stagger timing
- Background layers use restrained parallax

## Services Section
Services should appear as interactive floating glass cards in a clean grid with depth.

### Services to show
- Car Servicing
- Engine Work
- Suspension
- Diagnostics & Scanning
- PUC & Insurance
- Electrical & Electronics
- Battery & Tyre
- Towing

### Card behavior
- Glass effect surface
- Soft blue/red rim glow on hover
- Slight lift / expand interaction
- Section reveal uses scale + blur reduction + opacity fade
- Cards feel suspended in 3D space instead of popping abruptly

## Smart Booking Section
This section acts like a premium dashboard for user input.

### Inputs
- Car Brand
- Model
- Year
- Service Type

### Actions after input
- Call Now
- WhatsApp Chat
- Submit Request

### Booking behavior
- Inputs animate in cleanly with subtle stagger
- Interactions remain functional and easy to understand
- The section should feel more operational than decorative to keep conversion strong

## Contact System
Contact actions must remain obvious and low-friction.

### Contact elements
- Floating WhatsApp button always visible
- One-tap Call button
- Telegram support option
- Embedded dark-theme map
- Animated contact form with smooth validation transitions

## Motion System
### Global rules
- Use GSAP with ease-in-out custom curves only
- No linear motion for major transitions
- Add motion blur during key transitions where appropriate
- Momentum-based scrolling via Lenis
- No harsh cuts, abrupt jumps, or aggressive animation timing

### Section reveal rules
- Slight scale in
- Blur reduction
- Opacity fade
- Depth-aware parallax layers where useful

## Micro Interactions
These should create premium feel without becoming distracting.

### Required interactions
- Magnetic buttons with cursor attraction
- Cursor glow trail
- Hover delay / hover lag for natural feel
- Ripple click effects
- Subtle icon motion

## Navigation
- Sticky navbar
- Glassmorphism blur background
- Smooth section transitions
- No harsh theme or layout shifts while scrolling

## Performance
- Target smooth 60fps feeling on capable devices
- Lazy load 3D assets and heavy sections where possible
- Split bundles for animation and 3D dependencies
- On mobile:
  - simplify or reduce 3D density
  - reduce animation complexity
  - keep usability and CTA clarity primary

## Avoid
- Static basic HTML look
- Overcrowded copy
- Harsh transitions
- Generic template sections
- Overdesigned motion that hurts readability or performance

## Implementation Notes
- Keep the structure modular and React-based
- Separate scene logic, motion hooks, and UI sections into focused files
- Build the cinematic effect through layering and polish, not by overwhelming the page with too many effects at once
- Ensure WhatsApp, Call, and Book Service remain visible and functional throughout the experience
