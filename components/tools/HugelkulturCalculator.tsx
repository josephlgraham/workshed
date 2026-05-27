'use client'

import { useState } from 'react'

// Wood fills most of the bed; compost goes between wood and soil; soil goes on top
// Typical ratios by volume: ~50% wood, ~15% compost/nitrogen layer, ~35% soil fill

export default function HugelkulturCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [totalDepth, setTotalDepth] = useState(18)  // inches
  const [woodDepth, setWoodDepth] = useState(10)    // inches
  const [beds, setBeds] = useState(1)

  const lenNum = parseFloat(length) || 0
  const widNum = parseFloat(width) || 0
  const sqft = lenNum * widNum * beds
  const showResults = sqft > 0

  const totalDepthFt  = totalDepth / 12
  const woodDepthFt   = Math.min(woodDepth, totalDepth - 4) / 12  // at least 4" soil
  const compostDepthFt = 0.5 / 12 * Math.min(woodDepth, totalDepth - 4) / woodDepthFt  // ~2" taper

  // Simple model: wood layer, ~2" nitrogen/compost layer between wood and soil, rest is soil
  const nitrogenDepthFt = Math.min(2 / 12, (totalDepth / 12) - woodDepthFt - (3 / 12))
  const soilDepthFt = Math.max(3 / 12, totalDepthFt - woodDepthFt - Math.max(0, nitrogenDepthFt))

  const woodCF       = sqft * woodDepthFt
  const nitrogenCF   = sqft * Math.max(0, nitrogenDepthFt)
  const soilCF       = sqft * soilDepthFt
  const totalCF      = sqft * totalDepthFt

  const toCY = (cf: number) => cf / 27

  const settlingNote = Math.round((woodCF / totalCF) * 100)

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <Field label="Length (ft)" value={length} onChange={setLength} placeholder="e.g. 8" />
            <Field label="Width (ft)"  value={width}  onChange={setWidth}  placeholder="e.g. 4" />
          </div>

          <div>
            <label style={labelStyle}>
              Total bed depth: <strong>{totalDepth}&Prime;</strong>{' '}
              <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({(totalDepth / 12).toFixed(1)} ft)</span>
            </label>
            <input
              type="range"
              min={12}
              max={48}
              step={2}
              value={totalDepth}
              onChange={(e) => {
                const v = parseInt(e.target.value)
                setTotalDepth(v)
                if (woodDepth >= v - 4) setWoodDepth(Math.max(6, v - 6))
              }}
              style={{ width: '100%', accentColor: 'var(--green)' }}
            />
            <div style={rangeAxisStyle}>
              <span>12&Prime;</span>
              <span>24&Prime; deep</span>
              <span>48&Prime;</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Wood layer depth: <strong>{Math.min(woodDepth, totalDepth - 6)}&Prime;</strong>{' '}
              <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>
                (soil above: {Math.max(4, totalDepth - Math.min(woodDepth, totalDepth - 6) - 2)}&Prime;)
              </span>
            </label>
            <input
              type="range"
              min={6}
              max={Math.max(6, totalDepth - 6)}
              step={2}
              value={Math.min(woodDepth, totalDepth - 6)}
              onChange={(e) => setWoodDepth(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--sunflower)' }}
            />
            <div style={rangeAxisStyle}>
              <span>6&Prime;</span>
              <span style={{ color: 'var(--sunflower)' }}>wood layer</span>
              <span>{Math.max(6, totalDepth - 6)}&Prime;</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Identical beds</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              value={beds}
              onChange={(e) => setBeds(Math.max(1, parseInt(e.target.value) || 1))}
              style={inputStyle}
            />
          </div>

          {/* Layer stack visual */}
          {showResults && (
            <div>
              <div style={miniHeadStyle}>Layer breakdown</div>
              <LayerBar woodPct={woodCF / totalCF} nitroPct={nitrogenCF / totalCF} soilPct={soilCF / totalCF} />
            </div>
          )}
        </div>

        {/* Results */}
        <div style={{
          borderLeft: '1px solid var(--rule)',
          paddingLeft: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }} className="ws-calc-results">
          {showResults ? (
            <div>
              <div style={kickerStyle}>Total fill needed</div>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                lineHeight: 1,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                fontFeatureSettings: '"tnum" 1',
                color: 'var(--green)',
                marginBottom: '0.15rem',
              }}>
                {toCY(totalCF) < 1 ? totalCF.toFixed(1) : toCY(totalCF).toFixed(2)}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                {toCY(totalCF) < 1 ? 'cubic feet' : 'cubic yards'} total
              </div>

              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <MaterialRow
                  label="Wood"
                  cf={woodCF}
                  cy={toCY(woodCF)}
                  color="#6a4a2a"
                  note="Logs, branches, large sticks"
                />
                {nitrogenCF > 0.1 && (
                  <MaterialRow
                    label="Nitrogen layer"
                    cf={nitrogenCF}
                    cy={toCY(nitrogenCF)}
                    color="#3a7a3a"
                    note="Compost, manure, or fresh clippings"
                  />
                )}
                <MaterialRow
                  label="Soil fill"
                  cf={soilCF}
                  cy={toCY(soilCF)}
                  color="#7a6a4a"
                  note="Your soil mix goes on top"
                />
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                border: '1px solid var(--rule)',
                background: 'var(--paper-tint)',
                fontSize: '0.8rem',
                lineHeight: 1.55,
                fontFamily: 'var(--font-serif)',
                color: 'var(--ink-muted)',
              }}>
                Wood is ~{settlingNote}% of this bed's volume. Plan for 20–30% settling in the first season as it absorbs moisture and begins to compress.
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              Enter your bed dimensions to see the material breakdown.
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

function LayerBar({ woodPct, nitroPct, soilPct }: { woodPct: number; nitroPct: number; soilPct: number }) {
  return (
    <div>
      <div style={{ display: 'flex', height: 20, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--rule)' }}>
        <div style={{ width: `${woodPct * 100}%`, background: '#6a4a2a', transition: 'width 0.3s' }} title="Wood" />
        <div style={{ width: `${nitroPct * 100}%`, background: '#3a7a3a', transition: 'width 0.3s' }} title="Nitrogen layer" />
        <div style={{ width: `${soilPct * 100}%`, background: '#7a6a4a', transition: 'width 0.3s' }} title="Soil" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Wood',     color: '#6a4a2a', pct: woodPct  },
          { label: 'N layer',  color: '#3a7a3a', pct: nitroPct },
          { label: 'Soil',     color: '#7a6a4a', pct: soilPct  },
        ].map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontFamily: 'var(--font-sans)', color: 'var(--ink-muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: l.color, flexShrink: 0 }} />
            {l.label} {Math.round(l.pct * 100)}%
          </div>
        ))}
      </div>
    </div>
  )
}

function MaterialRow({ label, cf, cy, color, note }: {
  label: string; cf: number; cy: number; color: string; note: string
}) {
  return (
    <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-serif)', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--ink)', fontSize: '0.875rem', fontFeatureSettings: '"tnum" 1' }}>
          {cy < 1 ? `${cf.toFixed(1)} cf` : `${cy.toFixed(2)} cy`}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', paddingLeft: '1rem' }}>{note}</p>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type="number"
        inputMode="decimal"
        step="any"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
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

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: '0.375rem',
}

const miniHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: '0.5rem',
}

const rangeAxisStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.66rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-sans)',
  marginTop: '0.25rem',
}
