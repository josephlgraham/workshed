'use client'

import { useState } from 'react'

export default function RainwaterCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [rainfall, setRainfall] = useState('')
  const [efficiency, setEfficiency] = useState(85)

  const lenNum = parseFloat(length) || 0
  const widNum = parseFloat(width) || 0
  const rainNum = parseFloat(rainfall) || 0
  const sqft = lenNum * widNum
  const gallons = sqft * rainNum * 0.623 * (efficiency / 100)
  const showResults = sqft > 0 && rainNum > 0

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
          <Field
            label="Catchment length (ft)"
            hint="Footprint, not slope. Measure from directly above."
            value={length}
            onChange={setLength}
            placeholder="e.g. 12"
          />
          <Field
            label="Catchment width (ft)"
            value={width}
            onChange={setWidth}
            placeholder="e.g. 8"
          />
          <Field
            label="Rainfall (inches)"
            value={rainfall}
            onChange={setRainfall}
            placeholder="e.g. 0.5"
          />

          <div>
            <label style={labelStyle}>
              Collection efficiency: <strong>{efficiency}%</strong>
            </label>
            <input
              type="range"
              min={50}
              max={95}
              step={5}
              value={efficiency}
              onChange={(e) => setEfficiency(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--green)' }}
            />
            <p style={hintStyle}>85% is a reasonable default. Metal roofs run higher; leaf-clogged gutters lower.</p>
          </div>
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
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '0.5rem' }}>
                You'd collect about
              </div>
              <div style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', fontFeatureSettings: '"tnum" 1', color: 'var(--green)', marginBottom: '0.25rem' }}>
                {gallons.toFixed(1)}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                gallons
              </div>

              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <ResultRow label="55-gallon barrels" value={(gallons / 55).toFixed(2)} />
                <ResultRow label="5-gallon buckets" value={(gallons / 5).toFixed(1)} />
                <ResultRow label="Catchment area" value={`${sqft.toFixed(0)} sq ft`} />
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              Enter your catchment dimensions and a rainfall amount to see results.
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

function Field({ label, hint, value, onChange, placeholder }: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
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
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: '1px solid var(--rule)',
          borderRadius: 6,
          background: 'var(--paper)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          boxSizing: 'border-box',
        }}
      />
      {hint && <p style={hintStyle}>{hint}</p>}
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8rem',
  fontWeight: 500,
  letterSpacing: '0.05em',
  color: 'var(--ink)',
  marginBottom: '0.375rem',
}

const hintStyle: React.CSSProperties = {
  margin: '0.375rem 0 0',
  fontSize: '0.75rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-serif)',
}
