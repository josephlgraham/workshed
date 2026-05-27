'use client'

import { useState } from 'react'

/* ── BED SHAPES + PRESETS ───────────────────────────────────────────────── */

type Shape = 'rectangle' | 'circle'
const SHAPES: { id: Shape; label: string }[] = [
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle',    label: 'Circle / Tree ring' },
]

const BED_PRESETS: { label: string; length: number; width: number; shape: Shape }[] = [
  { label: '4×4',         length: 4,  width: 4,  shape: 'rectangle' },
  { label: '4×8',         length: 4,  width: 8,  shape: 'rectangle' },
  { label: '4×12',        length: 4,  width: 12, shape: 'rectangle' },
  { label: '3×6',         length: 3,  width: 6,  shape: 'rectangle' },
  { label: '2×8',         length: 2,  width: 8,  shape: 'rectangle' },
  { label: '10×10 plot',  length: 10, width: 10, shape: 'rectangle' },
]

/* ── SOIL RECIPES ────────────────────────────────────────────────────────── */

type Part = { name: string; ratio: number; color: string }
type Recipe = { id: string; label: string; parts: Part[]; notes: string }

const RECIPES: Recipe[] = [
  {
    id: 'mel_mix',
    label: "Mel's Mix (Square Foot Garden)",
    parts: [
      { name: 'Compost (blended sources)', ratio: 1, color: '#6a4a2a' },
      { name: 'Peat moss or coco coir',    ratio: 1, color: '#a17a4a' },
      { name: 'Coarse vermiculite',        ratio: 1, color: '#d4a82e' },
    ],
    notes: "The classic. Equal thirds. Expensive at scale but drains well and holds moisture. Vermiculite is the pricey ingredient.",
  },
  {
    id: 'budget_mix',
    label: 'Topsoil + Compost (budget)',
    parts: [
      { name: 'Screened topsoil', ratio: 3, color: '#7a6a4a' },
      { name: 'Compost',          ratio: 1, color: '#6a4a2a' },
    ],
    notes: 'The bulk-delivery mix. Heavy but cheap. Works well for deep beds where you want weight and structure. Add perlite if drainage is an issue.',
  },
  {
    id: 'raised_premium',
    label: 'Raised bed premium',
    parts: [
      { name: 'Topsoil',                ratio: 2, color: '#7a6a4a' },
      { name: 'Compost',                ratio: 2, color: '#6a4a2a' },
      { name: 'Peat moss or coco coir', ratio: 1, color: '#a17a4a' },
      { name: 'Perlite',                ratio: 1, color: '#c8c0a8' },
    ],
    notes: 'A good all-around raised bed mix. Drains well, holds nutrients, light enough to work easily. The perlite keeps it from compacting over seasons.',
  },
  {
    id: 'container',
    label: 'Container / pot mix',
    parts: [
      { name: 'Peat moss or coco coir', ratio: 2, color: '#a17a4a' },
      { name: 'Perlite',                ratio: 1, color: '#c8c0a8' },
      { name: 'Compost',                ratio: 1, color: '#6a4a2a' },
    ],
    notes: 'Lightweight and fast-draining. Containers dry out faster than beds, so the peat/coir ratio is higher here. Do not use garden soil in pots.',
  },
  {
    id: 'custom',
    label: 'Just give me total volume',
    parts: [],
    notes: 'No recipe. Just the cubic feet and cubic yards for your dimensions.',
  },
]

/* ── AMENDMENTS ──────────────────────────────────────────────────────────── */

type Amendment = { id: string; name: string; rate: string; does: string; caution: string; good_for: string }

const AMENDMENTS: Amendment[] = [
  { id: 'coffee',        name: 'Coffee grounds',                rate: '10-20% of compost volume',                                does: 'Adds nitrogen (N), slightly acidic, feeds soil microbes',                                                          caution: 'Too much can compact and go anaerobic. Mix into compost, do not apply as a thick layer.',                                                            good_for: 'Blueberries, azaleas, tomatoes, peppers, compost piles' },
  { id: 'wood_ash',      name: 'Wood ash',                      rate: '5 lbs per 100 sq ft, max',                                does: 'Raises pH (alkaline), adds potassium (K) and calcium (Ca)',                                                        caution: 'Do not use around acid-loving plants. Do not mix with nitrogen fertilizers. Use hardwood ash only, never charcoal or treated wood.',                  good_for: 'Potatoes, tomatoes, brassicas, any crop that likes neutral to slightly alkaline soil' },
  { id: 'eggshell',      name: 'Crushed eggshells',             rate: 'Roughly 1 cup per plant hole, crushed fine',              does: 'Adds calcium (Ca) slowly. Very slowly.',                                                                           caution: 'Crush them to powder for any real effect. Whole shells sit in the soil for years without breaking down meaningfully.',                                good_for: 'Tomatoes (blossom end rot prevention), peppers, squash' },
  { id: 'epsom',         name: 'Epsom salt',                    rate: '1 tbsp per gallon of water, or 1 cup per 100 sq ft',      does: 'Adds magnesium (Mg) and sulfur (S)',                                                                               caution: 'Only useful if your soil is actually magnesium-deficient. A soil test will tell you. Random application can cause nutrient imbalances.',              good_for: 'Peppers, tomatoes, roses (only if Mg is low)' },
  { id: 'bone_meal',     name: 'Bone meal',                     rate: '1-2 cups per 10 sq ft, worked into soil',                 does: 'Adds phosphorus (P) and calcium (Ca), slow release',                                                               caution: 'Only helps if phosphorus is actually low. Dogs will dig it up. Attracts raccoons and other scavengers.',                                              good_for: 'Bulbs, root crops, transplants, flowering plants' },
  { id: 'compost_tea',   name: 'Compost tea',                   rate: 'Dilute 1:10 with water, apply as drench or foliar spray', does: 'Introduces and feeds soil microorganisms, mild nutrient boost',                                                    caution: 'Anaerobically brewed tea can harbor pathogens. Use aerated brewing. Use within 24 hours.',                                                            good_for: 'Everything. It is compost in liquid form.' },
  { id: 'worm_castings', name: 'Worm castings',                 rate: '10-20% of total soil mix, or top-dress 1/4" to 1/2"',     does: 'The best slow-release fertilizer that exists. Balanced NPK, humic acids, beneficial microbes.',                    caution: 'Expensive to buy in volume. Consider starting a worm bin.',                                                                                            good_for: 'Everything. Worms already did the work.' },
  { id: 'sulfur',        name: 'Elemental sulfur',              rate: 'Per soil test. Typically 1-2 lbs per 100 sq ft to drop pH by ~1 point.', does: 'Lowers pH (acidifies soil). Slow-acting, takes weeks.',                                       caution: 'Do not over-apply. Takes 3-6 months to fully react. Test first.',                                                                                     good_for: 'Blueberries, azaleas, rhododendrons, any acid-lover' },
  { id: 'lime',          name: 'Garden lime (calcium carbonate)', rate: 'Per soil test. Typically 5 lbs per 100 sq ft to raise pH by ~1 point.', does: 'Raises pH (sweetens soil), adds calcium',                                                  caution: 'Always test before liming. Over-liming locks out micronutrients. Apply in fall for spring effect.',                                                   good_for: 'Lawns, brassicas, beans, most vegetables in acidic soil' },
]

/* ── MATH ────────────────────────────────────────────────────────────────── */

function calcVolume(shape: Shape, length: string, width: string, diameter: string, depthInches: number) {
  const depthFeet = depthInches / 12
  let sqft: number
  if (shape === 'circle') {
    const r = (parseFloat(diameter) || 0) / 2
    sqft = Math.PI * r * r
  } else {
    sqft = (parseFloat(length) || 0) * (parseFloat(width) || 0)
  }
  return { sqft, cubicFeet: sqft * depthFeet }
}

function recipeBreakdown(recipe: Recipe, totalCF: number) {
  if (!recipe || recipe.parts.length === 0) return []
  const total = recipe.parts.reduce((s, p) => s + p.ratio, 0)
  return recipe.parts.map((p) => {
    const cubicFeet = (p.ratio / total) * totalCF
    return {
      ...p,
      cubicFeet,
      cubicYards: cubicFeet / 27,
      percent: Math.round((p.ratio / total) * 100),
    }
  })
}

/* ── COMPONENT ──────────────────────────────────────────────────────────── */

export default function SoilVolumeCalculator() {
  const [shape, setShape] = useState<Shape>('rectangle')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [diameter, setDiameter] = useState('')
  const [depth, setDepth] = useState(12)
  const [beds, setBeds] = useState(1)
  const [extraPercent, setExtraPercent] = useState(10)
  const [recipeId, setRecipeId] = useState('raised_premium')
  const [showAmendments, setShowAmendments] = useState(false)
  const [hugel, setHugel] = useState(false)
  const [woodDepth, setWoodDepth] = useState(8)

  const validWoodMax = Math.max(4, depth - 4)
  const clampedWoodDepth = Math.min(woodDepth, validWoodMax)
  const soilDepth = hugel ? depth - clampedWoodDepth : depth

  const vol = calcVolume(shape, length, width, diameter, depth)
  const soilVol = hugel ? calcVolume(shape, length, width, diameter, soilDepth) : vol
  const totalSqft = vol.sqft * beds
  const totalCF = soilVol.cubicFeet * beds * (1 + extraPercent / 100)
  const totalCY = totalCF / 27
  const woodCF = hugel ? vol.sqft * beds * (clampedWoodDepth / 12) : 0
  const woodCY = woodCF / 27
  const showResults = vol.sqft > 0 && depth > 0
  const recipe = RECIPES.find((r) => r.id === recipeId)!
  const breakdown = recipeBreakdown(recipe, totalCF)

  function applyPreset(p: typeof BED_PRESETS[number]) {
    setShape(p.shape)
    setLength(String(p.length))
    setWidth(String(p.width))
  }

  return (
    <div style={{ marginBottom: '3rem' }}>

      <section style={cardStyle}>

        {/* Quick fill */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={miniHeadStyle}>Quick fill · common bed sizes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {BED_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                style={pillStyle}
                className="ws-soil-preset"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="ws-soil-grid">

          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div>
              <div style={miniHeadStyle}>Bed shape</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id)}
                    style={{
                      ...pillStyle,
                      background: shape === s.id ? 'var(--ink)' : 'var(--paper)',
                      color:      shape === s.id ? 'var(--paper)' : 'var(--ink-soft)',
                      borderColor: shape === s.id ? 'var(--ink)' : 'var(--rule)',
                    }}
                    className={shape === s.id ? '' : 'ws-soil-preset'}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {shape === 'rectangle' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                <Field label="Length (ft)" value={length} onChange={setLength} placeholder="e.g. 8" />
                <Field label="Width (ft)"  value={width}  onChange={setWidth}  placeholder="e.g. 4" />
              </div>
            ) : (
              <Field label="Diameter (ft)" value={diameter} onChange={setDiameter} placeholder="e.g. 6" />
            )}

            <div>
              <label style={labelStyle}>
                Depth: <strong>{depth}&Prime;</strong>{' '}
                <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>
                  ({(depth / 12).toFixed(1)} ft)
                </span>
              </label>
              <input
                type="range"
                min={4}
                max={36}
                step={1}
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--green)' }}
              />
              <div style={rangeAxisStyle}>
                <span>4&Prime; shallow</span>
                <span>12&Prime; standard</span>
                <span>24&Prime; deep</span>
                <span>36&Prime;</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
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
              </div>
              <div>
                <label style={labelStyle}>Extra: <strong>+{extraPercent}%</strong></label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={5}
                  value={extraPercent}
                  onChange={(e) => setExtraPercent(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--sunflower)' }}
                />
                <p style={hintStyle}>{hugel ? 'Hugel beds settle 20–30% as wood decomposes. Consider 20%+.' : 'Settling takes 10–15% in the first season.'}</p>
              </div>
            </div>

            {/* Hugelkultur toggle */}
            <div>
              <div style={miniHeadStyle}>Hugelkultur</div>
              <button
                type="button"
                onClick={() => setHugel((v) => !v)}
                style={{
                  ...pillStyle,
                  background:  hugel ? 'var(--ink)' : 'var(--paper)',
                  color:       hugel ? 'var(--paper)' : 'var(--ink-soft)',
                  borderColor: hugel ? 'var(--ink)' : 'var(--rule)',
                  marginBottom: hugel ? '1rem' : 0,
                }}
              >
                {hugel ? 'On, wood layer at bottom' : 'Off, standard fill'}
              </button>

              {hugel && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Wood layer: <strong>{clampedWoodDepth}&Prime;</strong>{' '}
                      <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>
                        (soil fill: {soilDepth}&Prime;)
                      </span>
                    </label>
                    <input
                      type="range"
                      min={4}
                      max={validWoodMax}
                      step={2}
                      value={clampedWoodDepth}
                      onChange={(e) => setWoodDepth(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--sunflower)' }}
                    />
                    <div style={rangeAxisStyle}>
                      <span>4&Prime; shallow</span>
                      <span style={{ color: 'var(--sunflower)' }}>wood layer</span>
                      <span>{validWoodMax}&Prime;</span>
                    </div>
                  </div>
                  {soilDepth < 4 && (
                    <p style={{ ...hintStyle, color: 'var(--tomato, #c0392b)' }}>
                      Increase total bed depth for a meaningful soil layer above the wood.
                    </p>
                  )}
                  <a
                    href="/tools/hugelkultur"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.82rem',
                      color: 'var(--green)',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--rule)',
                      textDecorationThickness: '1px',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    About the hugelkultur method and wood ratios &rarr;
                  </a>
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>Soil recipe</label>
              <select
                value={recipeId}
                onChange={(e) => setRecipeId(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {RECIPES.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
              {recipe.notes && <p style={hintStyle}>{recipe.notes}</p>}
            </div>

          </div>

          {/* Results */}
          <div style={{
            borderLeft: '1px solid var(--rule)',
            paddingLeft: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }} className="ws-soil-results">
            {showResults ? (
              <div>
                <div style={kickerStyle}>{hugel ? 'Soil fill needed (above wood)' : 'Total soil needed'}</div>
                <div style={{
                  fontSize: '4rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  fontFeatureSettings: '"tnum" 1',
                  color: 'var(--green)',
                  marginTop: '0.25rem',
                }}>
                  {totalCY < 1 ? totalCF.toFixed(1) : totalCY.toFixed(2)}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                  {totalCY < 1 ? 'cubic feet' : 'cubic yards'}
                </div>

                <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <ResultRow label="Cubic feet"  value={totalCF.toFixed(1)} />
                  <ResultRow label="Cubic yards" value={totalCY.toFixed(2)} />
                  <ResultRow label="Total area"  value={`${totalSqft.toFixed(0)} sq ft`} />
                  {beds > 1 && (
                    <ResultRow label="Beds" value={`${beds} × ${vol.sqft.toFixed(0)} sq ft`} />
                  )}
                  {hugel && woodCF > 0 && (
                    <ResultRow
                      label="Wood layer volume"
                      value={woodCY < 1 ? `${woodCF.toFixed(1)} cf` : `${woodCY.toFixed(2)} cy`}
                    />
                  )}
                </div>

                {breakdown.length > 0 && (
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--rule)' }}>
                    <div style={{ ...miniHeadStyle, marginBottom: '0.625rem' }}>Recipe breakdown</div>

                    {/* Visual ratio bar */}
                    <div style={{
                      display: 'flex',
                      height: 14,
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid var(--rule)',
                      marginBottom: '0.75rem',
                    }}>
                      {breakdown.map((b, i) => (
                        <div
                          key={i}
                          style={{ width: `${b.percent}%`, backgroundColor: b.color, transition: 'all 0.3s' }}
                          title={`${b.name}: ${b.percent}%`}
                        />
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {breakdown.map((b, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: b.color, flexShrink: 0 }} />
                            <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-soft)' }}>{b.name}</span>
                          </span>
                          <span style={{ flexShrink: 0, marginLeft: '0.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--ink)', fontFeatureSettings: '"tnum" 1' }}>
                              {b.cubicYards < 1 ? `${b.cubicFeet.toFixed(1)} cf` : `${b.cubicYards.toFixed(2)} cy`}
                            </span>
                            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-muted)', marginLeft: '0.35rem', fontSize: '0.72rem' }}>
                              ({b.percent}%)
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {totalCY >= 2 && (
                  <p style={{
                    marginTop: '1rem',
                    fontSize: '0.8rem',
                    lineHeight: 1.55,
                    color: 'var(--ink-muted)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                  }}>
                    At {totalCY.toFixed(1)} yards, call a landscape supply yard for bulk pricing. Bags at a hardware store will cost roughly double.
                  </p>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                Enter your bed dimensions to see the volume.
              </p>
            )}
          </div>

        </div>

        <style>{`
          .ws-soil-preset:hover { border-color: var(--green) !important; background: var(--paper-tint) !important; }
          @media (max-width: 700px) {
            .ws-soil-grid { grid-template-columns: 1fr !important; }
            .ws-soil-results { border-left: none !important; border-top: 1px solid var(--rule); padding-left: 0 !important; padding-top: 1.25rem !important; margin-top: 0.5rem; }
          }
        `}</style>
      </section>

      {/* Amendments — expandable */}
      <section style={{ marginTop: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setShowAmendments((v) => !v)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '1.25rem 1.5rem',
            background: 'var(--paper-tint)',
            border: '1px solid var(--rule)',
            borderLeft: '3px solid var(--green)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
          className="ws-soil-amend-head"
        >
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: '1.2rem',
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginBottom: '0.2rem',
            }}>Soil amendments reference</h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.45,
            }}>Coffee grounds, wood ash, worm castings, and more. What they do, how much to use, and when to skip them.</p>
          </div>
          <span style={{ fontSize: '1.2rem', color: 'var(--ink-muted)' }}>{showAmendments ? '▾' : '▸'}</span>
        </button>

        {showAmendments && (
          <div style={{
            marginTop: '0.75rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
          }} className="ws-soil-amend-grid">
            {AMENDMENTS.map((a) => (
              <div key={a.id} style={{
                background: 'var(--card)',
                border: '1px solid var(--rule)',
                padding: '1rem 1.1rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                }}>{a.name}</h3>
                <AmendmentField label="Rate"        color="var(--green)"     text={a.rate} />
                <AmendmentField label="What it does" color="var(--ink-soft)" text={a.does} />
                <AmendmentField label="Watch out"   color="var(--eggplant)"    text={a.caution} />
                <AmendmentField label="Good for"    color="var(--ink-muted)" text={a.good_for} />
              </div>
            ))}
            <style>{`@media (max-width: 700px) { .ws-soil-amend-grid { grid-template-columns: 1fr !important; } }`}</style>
          </div>
        )}
      </section>

      <style>{`
        .ws-soil-amend-head:hover { border-color: var(--green) !important; }
      `}</style>
    </div>
  )
}

/* ── SUB-COMPONENTS ──────────────────────────────────────────────────────── */

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
      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--ink)', fontFeatureSettings: '"tnum" 1' }}>{value}</span>
    </div>
  )
}

function AmendmentField({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.62rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        marginBottom: '0.15rem',
      }}>{label}</div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '0.88rem',
        lineHeight: 1.5,
        color: 'var(--ink-soft)',
      }}>{text}</p>
    </div>
  )
}

/* ── STYLES ──────────────────────────────────────────────────────────────── */

const cardStyle: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--rule)',
  borderRadius: 'var(--radius-md, 12px)',
  padding: '2rem',
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
  lineHeight: 1.45,
}

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
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

const pillStyle: React.CSSProperties = {
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
  fontSize: '0.66rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-sans)',
  marginTop: '0.25rem',
}
