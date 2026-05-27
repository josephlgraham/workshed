'use client'

import { useState } from 'react'

const MULCH_TYPES = [
  { id: 'cedar',    label: 'Cedar wood chips',       densityNote: 'Light, aromatic',     pestsNote: 'Natural pest deterrent', yearsToBreakdown: '2-3' },
  { id: 'hardwood', label: 'Hardwood bark mulch',    densityNote: 'Medium weight',       pestsNote: 'No pest deterrence',     yearsToBreakdown: '1-2' },
  { id: 'pine',     label: 'Pine bark / pine straw', densityNote: 'Light, acidic lean',  pestsNote: 'Mild deterrent',         yearsToBreakdown: '1-2' },
  { id: 'cypress',  label: 'Cypress mulch',          densityNote: 'Medium, slow decay',  pestsNote: 'Mild deterrent',         yearsToBreakdown: '2-3' },
  { id: 'rubber',   label: 'Rubber mulch',           densityNote: 'Heavy, permanent',    pestsNote: 'No pest deterrence',     yearsToBreakdown: 'Indefinite' },
  { id: 'straw',    label: 'Straw',                  densityNote: 'Very light',          pestsNote: 'No pest deterrence',     yearsToBreakdown: '<1' },
  { id: 'leaves',   label: 'Shredded leaves',        densityNote: 'Very light, free',    pestsNote: 'No pest deterrence',     yearsToBreakdown: '<1' },
]

const BED_PRESETS = [
  { label: '4×4 raised bed',     length: 4,  width: 4 },
  { label: '4×8 raised bed',     length: 4,  width: 8 },
  { label: '4×12 raised bed',    length: 4,  width: 12 },
  { label: '3×6 raised bed',     length: 3,  width: 6 },
  { label: '10×10 garden plot',  length: 10, width: 10 },
  { label: '10×20 garden plot',  length: 10, width: 20 },
]

function calcVolume(sqft: number, depthInches: number) {
  const cubicFeet = sqft * (depthInches / 12)
  return {
    cubicFeet,
    cubicYards: cubicFeet / 27,
    bags2cf: Math.ceil(cubicFeet / 2),
    bags3cf: Math.ceil(cubicFeet / 3),
  }
}

export default function MulchCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState(3)
  const [mulchType, setMulchType] = useState('cedar')
  const [beds, setBeds] = useState(1)
  const [extraPercent, setExtraPercent] = useState(10)

  const lenNum = parseFloat(length) || 0
  const widNum = parseFloat(width) || 0
  const sqft = lenNum * widNum * beds
  const showResults = sqft > 0 && depth > 0

  const raw = calcVolume(sqft, depth)
  const mult = 1 + extraPercent / 100
  const vol = {
    cubicFeet: raw.cubicFeet * mult,
    cubicYards: raw.cubicYards * mult,
    bags2cf: Math.ceil(raw.bags2cf * mult),
    bags3cf: Math.ceil(raw.bags3cf * mult),
  }

  const selectedMulch = MULCH_TYPES.find((m) => m.id === mulchType)
  const depthHint =
    depth <= 2 ? 'thin' : depth <= 3 ? 'standard' : depth <= 4 ? 'thick' : 'very thick'

  function applyPreset(p: { length: number; width: number }) {
    setLength(String(p.length))
    setWidth(String(p.width))
  }

  return (
    <div style={{
      border: '1px solid var(--rule)',
      borderRadius: 'var(--radius-md, 12px)',
      padding: '2rem',
      background: 'var(--card)',
      marginBottom: '3rem',
    }}>

      {/* Presets */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={presetHeadStyle}>Quick fill · common bed sizes</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {BED_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p)}
              style={presetBtnStyle}
              className="ws-mulch-preset"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="ws-calc-grid">

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <Field label="Length (ft)" value={length} onChange={setLength} placeholder="e.g. 8" />
            <Field label="Width (ft)"  value={width}  onChange={setWidth}  placeholder="e.g. 4" />
          </div>

          <div>
            <label style={labelStyle}>
              Depth: <strong>{depth}&Prime;</strong>{' '}
              <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({depthHint})</span>
            </label>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={depth}
              onChange={(e) => setDepth(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--green)' }}
            />
            <div style={rangeAxisStyle}>
              <span>1&Prime;</span>
              <span>3&Prime; standard</span>
              <span>6&Prime;</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <div>
              <label style={labelStyle}>Mulch type</label>
              <select
                value={mulchType}
                onChange={(e) => setMulchType(e.target.value)}
                style={inputStyle}
              >
                {MULCH_TYPES.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Identical beds</label>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={50}
                value={beds}
                onChange={(e) => setBeds(Math.max(1, parseInt(e.target.value) || 1))}
                style={inputStyle}
              />
              <p style={hintStyle}>Same size? Multiply.</p>
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Extra: <strong>+{extraPercent}%</strong>
            </label>
            <input
              type="range"
              min={0}
              max={25}
              step={5}
              value={extraPercent}
              onChange={(e) => setExtraPercent(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--sunflower)' }}
            />
            <p style={hintStyle}>10% is sensible. Edges, dips, and settling eat more than you think.</p>
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
              <div style={kickerStyle}>You need about</div>
              <div style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', fontFeatureSettings: '"tnum" 1', color: 'var(--green)', marginBottom: '0.25rem' }}>
                {vol.cubicYards < 1 ? vol.cubicFeet.toFixed(1) : vol.cubicYards.toFixed(2)}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                {vol.cubicYards < 1 ? 'cubic feet' : 'cubic yards'}
              </div>

              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <ResultRow label="Cubic feet"   value={vol.cubicFeet.toFixed(1)} />
                <ResultRow label="Cubic yards"  value={vol.cubicYards.toFixed(2)} />
                <ResultRow label="2 cu ft bags" value={String(vol.bags2cf)} />
                <ResultRow label="3 cu ft bags" value={String(vol.bags3cf)} />
                <ResultRow label="Total area"   value={`${sqft.toFixed(0)} sq ft`} />
                {beds > 1 && (
                  <ResultRow label="Beds" value={`${beds} × ${(lenNum * widNum).toFixed(0)} sq ft`} />
                )}
              </div>

              {selectedMulch && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.875rem 1rem',
                  border: '1px solid var(--rule)',
                  background: 'var(--paper-tint)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--ink-soft)',
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '0.25rem' }}>{selectedMulch.label}</div>
                  <div>{selectedMulch.densityNote}. {selectedMulch.pestsNote}.</div>
                  <div>Lasts roughly {selectedMulch.yearsToBreakdown} years before needing a refresh.</div>
                </div>
              )}

              {vol.cubicYards >= 2 && (
                <p style={{
                  marginTop: '1rem',
                  fontSize: '0.8rem',
                  lineHeight: 1.55,
                  color: 'var(--ink-muted)',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                }}>
                  At {vol.cubicYards.toFixed(1)} yards, bulk delivery is almost certainly cheaper than bags. Call a local landscape supply yard.
                </p>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              Enter your bed dimensions and pick a depth to see how much you need.
            </p>
          )}
        </div>
      </div>

      <style>{`
        .ws-mulch-preset:hover { border-color: var(--green) !important; color: var(--ink) !important; }
        @media (max-width: 640px) {
          .ws-calc-grid { grid-template-columns: 1fr !important; }
          .ws-calc-results { border-left: none !important; border-top: 1px solid var(--rule); padding-left: 0 !important; padding-top: 1.5rem !important; margin-top: 0.5rem; }
        }
      `}</style>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string
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
        style={inputStyle}
      />
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
  marginBottom: '0.5rem',
}

const presetHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: '0.625rem',
}

const presetBtnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  letterSpacing: '0.05em',
  color: 'var(--ink-soft)',
  background: 'var(--paper)',
  border: '1px solid var(--rule)',
  borderRadius: 999,
  padding: '0.35rem 0.7rem',
  cursor: 'pointer',
  transition: 'all 0.15s',
}

const rangeAxisStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.7rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-sans)',
  marginTop: '0.25rem',
}
