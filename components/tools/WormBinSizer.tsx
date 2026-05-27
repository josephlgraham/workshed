'use client'

import { useState } from 'react'

const SCRAPS_PER_PERSON = 1.5  // lbs/week, composting portion of kitchen waste
const SQFT_PER_LB = 1          // 1 sq ft surface area per lb/week of food waste
const WORMS_PER_SQFT = 1       // 1 lb of worms per sq ft
const BEDDING_GAL_PER_SQFT = 5 // 8" depth ≈ 5 gal per sq ft of surface area

const BIN_DIMENSIONS: { maxSqft: number; label: string; note: string }[] = [
  { maxSqft: 2,  label: '2 × 1 ft',  note: 'A 14-gallon Rubbermaid tote works.' },
  { maxSqft: 4,  label: '2 × 2 ft',  note: 'Most common starter bin. Easy to manage.' },
  { maxSqft: 6,  label: '2 × 3 ft',  note: 'A large storage tote or a built wooden box.' },
  { maxSqft: 8,  label: '2 × 4 ft',  note: 'Two stacked commercial bins, or a built box.' },
  { maxSqft: 12, label: '2 × 6 ft',  note: 'Multiple bins easier than one large one at this scale.' },
  { maxSqft: 999, label: '2 × 6 ft+', note: 'Consider multiple bins rather than one large one.' },
]

function recommendedBin(sqft: number) {
  return BIN_DIMENSIONS.find((b) => sqft <= b.maxSqft) ?? BIN_DIMENSIONS[BIN_DIMENSIONS.length - 1]
}

export default function WormBinSizer() {
  const [people, setPeople] = useState(2)
  const [scrapsOverride, setScrapsOverride] = useState('')

  const autoScraps = +(people * SCRAPS_PER_PERSON).toFixed(1)
  const scraps = scrapsOverride !== '' ? Math.max(0.5, parseFloat(scrapsOverride) || autoScraps) : autoScraps

  const surfaceArea = Math.max(2, Math.ceil(scraps * SQFT_PER_LB))
  const wormLbs = Math.ceil(surfaceArea * WORMS_PER_SQFT)
  const beddingGal = Math.round(surfaceArea * BEDDING_GAL_PER_SQFT)
  const feedingLbs = +(scraps / 2).toFixed(1)
  const bin = recommendedBin(surfaceArea)
  const wormCount = `${(wormLbs * 500).toLocaleString()}–${(wormLbs * 1000).toLocaleString()}`

  return (
    <div style={{
      border: '1px solid var(--rule)',
      borderRadius: 'var(--radius-md, 12px)',
      padding: '2rem',
      background: 'var(--card)',
      marginBottom: '3rem',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="ws-calc-grid">

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>
              Household size: <strong>{people} {people === 1 ? 'person' : 'people'}</strong>
            </label>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={people}
              onChange={(e) => { setPeople(parseInt(e.target.value)); setScrapsOverride('') }}
              style={{ width: '100%', accentColor: 'var(--green)' }}
            />
            <div style={rangeAxisStyle}>
              <span>1</span>
              <span>4</span>
              <span>8</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Weekly food scraps (lbs)</label>
            <input
              type="number"
              inputMode="decimal"
              step="0.5"
              min="0.5"
              placeholder={String(autoScraps)}
              value={scrapsOverride}
              onChange={(e) => setScrapsOverride(e.target.value)}
              style={inputStyle}
            />
            <p style={hintStyle}>
              Estimated {autoScraps} lbs/week for {people} {people === 1 ? 'person' : 'people'}. Override if you know your kitchen better.
            </p>
          </div>

          <div style={{
            padding: '0.875rem 1rem',
            border: '1px solid var(--rule)',
            background: 'var(--paper-tint)',
            fontSize: '0.82rem',
            lineHeight: 1.6,
            fontFamily: 'var(--font-serif)',
            color: 'var(--ink-soft)',
          }}>
            <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '0.25rem', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Recommended bin</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: '0.25rem' }}>{bin.label}</div>
            <div>{bin.note}</div>
          </div>
        </div>

        {/* Results */}
        <div style={{
          borderLeft: '1px solid var(--rule)',
          paddingLeft: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          justifyContent: 'center',
        }} className="ws-calc-results">

          <div>
            <div style={kickerStyle}>Bin surface area</div>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              fontFeatureSettings: '"tnum" 1',
              color: 'var(--green)',
              marginBottom: '0.1rem',
            }}>{surfaceArea} sq ft</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
              minimum surface area for {scraps} lbs/week
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <ResultRow label="Worms to buy" value={`${wormLbs} lb${wormLbs !== 1 ? 's' : ''}`} />
            <div style={{ paddingLeft: 0 }}>
              <p style={{ ...hintStyle, marginTop: '-0.25rem', marginBottom: '0.5rem' }}>
                {wormCount} red wigglers (Eisenia fetida)
              </p>
            </div>
            <ResultRow label="Starting bedding" value={`${beddingGal} gal`} />
            <div>
              <p style={{ ...hintStyle, marginTop: '-0.25rem', marginBottom: '0.5rem' }}>
                Shredded paper or coir, moistened. 1 compressed coir brick &#8776; 15 gal expanded.
              </p>
            </div>
            <ResultRow label="Feed every 3&#8211;4 days" value={`${feedingLbs} lbs`} />
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            border: '1px solid var(--rule)',
            background: 'var(--paper-tint)',
            fontSize: '0.8rem',
            lineHeight: 1.55,
            fontFamily: 'var(--font-serif)',
            color: 'var(--ink-muted)',
          }}>
            Keep the bin between 55 and 77&deg;F. Below 50, activity stalls. Above 85, worms try to leave.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ws-calc-grid { grid-template-columns: 1fr !important; }
          .ws-calc-results { border-left: none !important; border-top: 1px solid var(--rule); padding-left: 0 !important; padding-top: 1.5rem !important; margin-top: 0.5rem; }
        }
      `}</style>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
      <span style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-serif)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8rem',
  fontWeight: 500,
  letterSpacing: '0.05em',
  color: 'var(--ink)',
  marginBottom: '0.375rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--rule)',
  borderRadius: 6,
  background: 'var(--paper)',
  color: 'var(--ink)',
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  boxSizing: 'border-box',
}

const hintStyle: React.CSSProperties = {
  margin: '0.375rem 0 0',
  fontSize: '0.75rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-serif)',
}

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: '0.375rem',
}

const rangeAxisStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.7rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-sans)',
  marginTop: '0.25rem',
}
