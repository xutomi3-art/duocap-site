import { useState } from 'react'

const check = (
  <span className="c3-check">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  const plans = [
    {
      tier: 'Free',
      price: 'Free',
      desc: 'For trying real-time translated captions on your Mac.',
      features: [
        '10 listening minutes included',
        '15 minutes per session',
        '60+ languages auto-detected',
        'AI error correction',
        'Minutes synced to Apple Notes',
      ],
      pro: false,
    },
    {
      tier: 'Pro',
      price: yearly ? '$71.99/y' : '$9.99/m',
      desc: 'For professionals who live in cross-language meetings every day.',
      features: [
        '2,000 listening minutes per month',
        '3-hour sessions',
        'AI-corrected bilingual captions',
        'One-click meeting minutes',
        'Priority support',
      ],
      pro: true,
    },
    {
      tier: 'Booster',
      price: '$4.99',
      desc: 'Top up when a launch week runs long. One-time pack, valid 12 months.',
      features: [
        '300 extra listening minutes',
        'Valid for 12 months',
        'Stacks with Pro',
        'No subscription required',
        'Same AI pipeline',
      ],
      pro: false,
    },
  ]

  return (
    <section className="c3-pricing-section" id="pricing">
      {/* Pricing noise filter (overlay blend) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Any language.</span>
          <span className="c3-watermark-line-2">Instantly yours.</span>
        </div>
      </div>

      <div className="c3-grid">
        {plans.map((plan) => (
          <div key={plan.tier} className={`c3-card ${plan.pro ? 'c3-card-pro' : ''}`}>
            <div className="c3-tier-small">{plan.tier}</div>
            <div className="c3-tier-large">{plan.price}</div>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((f) => (
                <li key={f}>
                  {check}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="c3-btn">Choose Plan</button>
          </div>
        ))}
      </div>

      <div className="c3-toggle-wrap">
        <span className="text-sm text-white/70">Yearly</span>
        <button
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          onClick={() => setYearly(!yearly)}
          aria-pressed={yearly}
          aria-label="Toggle yearly pricing"
        >
          <span className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  )
}
