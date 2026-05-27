'use client'

import { useState } from 'react'

const GREENS = [
  { id: 'trimmings', label: 'Garden trimmings',   cn: 20, hint: 'Fresh stems, deadheading, weekly cutbacks' },
  { id: 'grass',     label: 'Grass clippings',    cn: 17, hint: 'Add fresh, not dried' },
  { id: 'kitchen',   label: 'Kitchen scraps',     cn: 15, hint: 'Fruit and vegetable only' },
  { id: 'coffee',    label: 'Coffee grounds',     cn: 20, hint: 'Grounds and paper filter' },
  { id: 'weeds',     label: 'Fresh weeds',        cn: 19, hint: 'Before they go to seed' },
  { id: 'manure',    label: 'Chicken manure',     cn: 10, hint: 'Hot and nitrogen-dense' },
]

const BROWNS = [
  { id: 'leaves',     label: 'Dried leaves',           cn: 60,  hint: 'Shred if you can' },
  { id: 'straw',      label: 'Straw',                  cn: 80,  hint: 'Not hay (hay has seeds)' },
  { id: 'cardboard',  label: 'Cardboard, torn',        cn: 350, hint: 'Remove tape and glossy coatings' },
  { id: 'woodchips',  label: 'Wood chips',             cn: 400, hint: 'Best aged a few weeks first' },
  { id: 'stalks',     label: 'Dried plant stalks',     cn: 80,  hint: 'Corn, sunflower, dry beans' },
  { id: 'newspaper',  label: 'Shredded newspaper',     cn: 175, hint: 'Soy-based ink is fine' },
]

const TARGET_LOW = 25
const TARGET_HIGH = 35
const TARGET_MID = 30
const AVG_GREEN_CN = 18
const AVG_BROWN_CN = 80

export default function CompostRatioCalculator() {
  const [greens, setGreens] = useState<Record<string, number>>(
    Object.fromEntries(GREENS.map((m) => [m.id, 0]))
  )
  const [browns, setBrowns] = useState<Record<string, number>>(
    Object.fromEntries(BROWNS.map((m) => [m.id, 0]))
  )

  const totalGreenParts = GREENS.reduce((s, m) => s + (greens[m.id] || 0), 0)
  const totalBrownParts = BROWNS.reduce((s, m) => s + (browns[m.id] || 0), 0)
  const totalParts = totalGreenParts + totalBrownParts

  const weightedCNSum =
    GREENS.reduce((s, m) => s + m.cn * (greens[m.id] || 0), 0) +
    BROWNS.reduce((s, m) => s + m.cn * (browns[m.id] || 0), 0)

  const weightedCN = totalParts > 0 ? weightedCNSum / totalParts : null

  let status: 'hot' | 'too_carbon' | 'too_nitrogen' | null = null
  let recommendation = ''
  let addParts = 0

  if (weightedCN !== null) {
    if (weightedCN >= TARGET_LOW && weightedCN <= TARGET_HIGH) {
      status = 'hot'
      recommendation = 'This pile should heat up. Turn it every few days to keep oxygen moving through.'
    } else if (weightedCN > TARGET_HIGH) {
      status = 'too_carbon'
      const G = totalParts * (weightedCN - TARGET_MID) / (TARGET_MID - AVG_GREEN_CN)
      addParts = Math.max(1, Math.ceil(G))
      recommendation = `Add about ${addParts} more part${addParts !== 1 ? 's' : ''} of greens to bring the ratio into range.`
    } else {
      status = 'too_nitrogen'
      const B = totalParts * (TARGET_MID - weightedCN) / (AVG_BROWN_CN - TARGET_MID)
      addParts = Math.max(1, Math.ceil(B))
      recommendation = `Add about ${addParts} more part${addParts !== 1 ? 's' : ''} of browns to bring the ratio into range.`
    }
  }

  const statusColor =
    status === 'hot' ? 'var(--green)'
    : status === 'too_carbon' ? 'var(--ink-muted)'
    : status === 'too_nitrogen' ? 'var(--sunflower)'
    : 'var(--ink-muted)'

  const statusLabel =
    status === 'hot' ? 'Hot pile range'
    : status === 'too_carbon' ? 'Too much carbon'
    : status === 'too_nitrogen' ? 'Too much nitrogen'
    : ''

  function setGreen(id: string, val: number) {
    setGreens((prev) => ({ ...prev, [id]: Math.max(0, val) }))
  }
  function setBrown(id: string, val: number) {
    setBrowns((prev) => ({ ...prev, [id]: Math.max(0, val) }))
  }

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
        <div>
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={sectionHeadStyle}>
              <span style={{ color: 'var(--green)' }}>Greens</span>
              <span style={{ fontWeight: 400, color: 'var(--ink-muted)' }}> (nitrogen-rich)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {GREENS.map((m) => (
                <MaterialRow
                  key={m.id}
                  label={m.label}
                  hint={m.hint}
                  value={greens[m.id] || 0}
                  onChange={(v) => setGreen(m.id, v)}
                  accentColor="var(--green)"
                />
              ))}
            </div>
          </div>

          <div>
            <div style={sectionHeadStyle}>
              <span style={{ color: 'var(--sunflower)' }}>Browns</span>
              <span style={{ fontWeight: 400, color: 'var(--ink-muted)' }}> (carbon-rich)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {BROWNS.map((m) => (
                <MaterialRow
                  key={m.id}
                  label={m.label}
                  hint={m.hint}
                  value={browns[m.id] || 0}
                  onChange={(v) => setBrown(m.id, v)}
                  accentColor="var(--sunflower)"
                />
              ))}
            </div>
          </div>

          <p style={{ marginTop: '0.875rem', fontSize: '0.75rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            1 part = 1 bucket, 1 wheelbarrow, any consistent unit. The ratio is what matters.
          </p>
        </div>

        {/* Results */}
        <div style={{
          borderLeft: '1px solid var(--rule)',
          paddingLeft: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }} className="ws-calc-results">
          {weightedCN !== null ? (
            <div>
              <div style={kickerStyle}>Estimated C:N ratio</div>
              <div style={{
                fontSize: '4rem',
                fontWeight: 800,
                lineHeight: 1,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                fontFeatureSettings: '"tnum" 1',
                color: statusColor,
                marginBottom: '0.25rem',
              }}>
                {weightedCN.toFixed(0)}:1
              </div>

              <RangeBar value={weightedCN} low={TARGET_LOW} high={TARGET_HIGH} />

              {statusLabel && (
                <div style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.6rem',
                  border: `1px solid ${statusColor}`,
                  borderRadius: 999,
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: statusColor,
                  marginBottom: '1rem',
                }}>{statusLabel}</div>
              )}

              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <ResultRow label="Greens" value={`${totalGreenParts} part${totalGreenParts !== 1 ? 's' : ''}`} />
                <ResultRow label="Browns" value={`${totalBrownParts} part${totalBrownParts !== 1 ? 's' : ''}`} />
                <ResultRow
                  label="Volume ratio (B:G)"
                  value={totalGreenParts > 0 ? `${(totalBrownParts / totalGreenParts).toFixed(1)}:1` : '—'}
                />
              </div>

              {recommendation && (
                <div style={{
                  padding: '0.875rem 1rem',
                  border: `1px solid ${statusColor}`,
                  background: 'var(--paper-tint)',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--ink-soft)',
                }}>
                  {recommendation}
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              Add materials above to see your ratio and whether the pile will heat.
            </p>
          )}
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

function MaterialRow({
  label, hint, value, onChange, accentColor,
}: {
  label: string
  hint: string
  value: number
  onChange: (v: number) => void
  accentColor: string
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '0.75rem',
      alignItems: 'center',
      padding: '0.45rem 0.625rem',
      border: '1px solid var(--rule)',
      borderRadius: 6,
      background: value > 0 ? 'var(--paper-tint)' : 'var(--paper)',
      transition: 'background 0.15s',
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '0.1rem' }}>{hint}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= 0}
          style={{
            width: 24, height: 24,
            border: '1px solid var(--rule)',
            borderRadius: 4,
            background: 'var(--paper)',
            color: value > 0 ? 'var(--ink)' : 'var(--ink-muted)',
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            cursor: value > 0 ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
        >&#8722;</button>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: value > 0 ? accentColor : 'var(--ink-muted)',
          minWidth: 20,
          textAlign: 'center',
          fontFeatureSettings: '"tnum" 1',
        }}>{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          style={{
            width: 24, height: 24,
            border: '1px solid var(--rule)',
            borderRadius: 4,
            background: 'var(--paper)',
            color: 'var(--ink)',
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
        >+</button>
      </div>
    </div>
  )
}

function RangeBar({ value, low, high }: { value: number; low: number; high: number }) {
  const min = 5
  const max = 120
  const clamp = (v: number) => Math.min(Math.max(v, min), max)
  const pct = (v: number) => ((clamp(v) - min) / (max - min)) * 100

  const dotColor =
    value >= low && value <= high ? 'var(--green)'
    : value > high ? 'var(--ink-muted)'
    : 'var(--sunflower)'

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ position: 'relative', height: 6, background: 'var(--rule)', borderRadius: 3, margin: '0.5rem 0 0' }}>
        <div style={{
          position: 'absolute',
          left: `${pct(low)}%`,
          width: `${pct(high) - pct(low)}%`,
          height: '100%',
          background: 'var(--green)',
          opacity: 0.3,
          borderRadius: 3,
        }} />
        <div style={{
          position: 'absolute',
          left: `${pct(value)}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: dotColor,
          border: '2px solid var(--paper)',
          boxShadow: '0 0 0 1px var(--rule)',
          transition: 'left 0.2s, background 0.2s',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.65rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-sans)' }}>
        <span>5:1</span>
        <span style={{ color: 'var(--green)', fontWeight: 600 }}>{low}&ndash;{high}:1 ideal</span>
        <span>120:1+</span>
      </div>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
      <span style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-serif)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}

const sectionHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  marginBottom: '0.625rem',
}

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: '0.5rem',
}
