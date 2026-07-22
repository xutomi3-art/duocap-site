import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuBar from './components/MenuBar'
import AppMockup from './components/AppMockup'
import FeatureTriage from './components/FeatureTriage'
import LogoCloud from './components/LogoCloud'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import CinematicIntro from './components/CinematicIntro'
import FilmOverlay from './components/FilmOverlay'
import CinematicSection from './components/CinematicSection'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* Global background video — slightly scaled so grain/vignette have a soft frame */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none scale-[1.04]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Cinematic grade over the footage: cooler shadows, gentle top-to-bottom fall-off.
            Top lightened /40 → /15 — with the letterbox on top it drowned the navbar. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/15 via-transparent to-[#0c0c0c]/80" />
      </div>

      {/* Vertical guide lines at the 36rem container edges */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* Root grain filter for the shiny headline (multiply blend) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
          />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <MenuBar />
        <CinematicSection><AppMockup /></CinematicSection>
        <CinematicSection><FeatureTriage /></CinematicSection>
        <CinematicSection><LogoCloud /></CinematicSection>
        <CinematicSection><Testimonials /></CinematicSection>
        <CinematicSection><Pricing /></CinematicSection>
        <CinematicSection><FinalCTA /></CinematicSection>

        <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-10 text-center text-xs text-white/30">
          © 2026 Duocap. All rights reserved.
        </footer>
      </div>

      {/* Ambient projector light-sweep, above content but below the letterbox */}
      <div className="film-flicker" aria-hidden="true" />

      {/* Persistent cinematic overlays (letterbox + vignette + grain) */}
      <FilmOverlay />

      {/* Opening title sequence — once per session */}
      <CinematicIntro />
    </div>
  )
}
