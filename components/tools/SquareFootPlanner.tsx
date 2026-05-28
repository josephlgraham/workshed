'use client'

import { useMemo, useState } from 'react'

/* ── CROP DATA ────────────────────────────────────────────────────────────── */

type Category = 'fruit' | 'legume' | 'leafy' | 'brassica' | 'root' | 'allium' | 'herb' | 'flower' | 'grain'

type Crop = {
  id: string
  name: string
  perSqFt: number
  category: Category
  season: 'warm' | 'cool'
  notes: string
  trellis?: boolean
}

const CROPS: Crop[] = [
  // FRUIT
  { id: 'tomato',         name: 'Tomato',                   perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'Needs cage or stake. One plant fills the square and then some.' },
  { id: 'pepper_sweet',   name: 'Sweet/Bell Pepper',        perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square. Give it full sun and warm soil.' },
  { id: 'pepper_hot',     name: 'Hot Pepper',               perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square. Smaller plants than bells but still need the space for airflow.' },
  { id: 'eggplant',       name: 'Eggplant',                 perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square. Needs consistent heat.' },
  { id: 'cucumber',       name: 'Cucumber',                 perSqFt: 2,  category: 'fruit',    season: 'warm', notes: 'Two per square if trellised vertically. One if sprawling.', trellis: true },
  { id: 'squash',         name: 'Summer Squash',            perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square, minimum. These get big. Consider giving it two squares.' },
  { id: 'zucchini',       name: 'Zucchini',                 perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'Same as summer squash. One plant produces more than you expect.' },
  { id: 'winter_squash',  name: 'Winter Squash / Pumpkin',  perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square. Vines need room to run beyond the bed or a strong trellis.', trellis: true },
  { id: 'okra',           name: 'Okra',                     perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square. Loves heat. In the South, you will be sick of okra by August.' },
  { id: 'watermelon',     name: 'Watermelon',               perSqFt: 1,  category: 'fruit',    season: 'warm', notes: 'One per square. Vines sprawl well beyond the bed. Not ideal for small SFG beds.', trellis: true },
  { id: 'strawberry',     name: 'Strawberry',               perSqFt: 4,  category: 'fruit',    season: 'cool', notes: 'Four per square. Perennial. Produces runners that fill gaps.' },
  { id: 'artichoke',      name: 'Artichoke',                perSqFt: 1,  category: 'fruit',    season: 'cool', notes: 'One per square minimum. Gets very large. Perennial in zones 7-11.' },
  // LEGUMES
  { id: 'bean_pole',      name: 'Pole Beans',               perSqFt: 8,  category: 'legume',   season: 'warm', notes: 'Eight per square on a trellis. Nitrogen fixers.', trellis: true },
  { id: 'bean_bush',      name: 'Bush Beans',               perSqFt: 9,  category: 'legume',   season: 'warm', notes: 'Nine per square (3×3 grid). Succession plant every 2-3 weeks.' },
  { id: 'cowpea',         name: 'Southern Peas / Cowpeas',  perSqFt: 8,  category: 'legume',   season: 'warm', notes: 'Eight per square on a trellis or fence. Wait for real heat. Nitrogen fixers.', trellis: true },
  { id: 'pea',            name: 'Peas',                     perSqFt: 8,  category: 'legume',   season: 'cool', notes: 'Eight per square on a short trellis. Cool-season crop.', trellis: true },
  // LEAFY
  { id: 'lettuce',        name: 'Lettuce',                  perSqFt: 4,  category: 'leafy',    season: 'cool', notes: 'Four per square. Bolts in heat. Shade from taller neighbors helps.' },
  { id: 'spinach',        name: 'Spinach',                  perSqFt: 9,  category: 'leafy',    season: 'cool', notes: 'Nine per square. Even shorter window than lettuce in the South.' },
  { id: 'swiss_chard',    name: 'Swiss Chard',              perSqFt: 4,  category: 'leafy',    season: 'cool', notes: 'Four per square. More heat tolerant than spinach. Cut-and-come-again.' },
  { id: 'collard',        name: 'Collard Greens',           perSqFt: 1,  category: 'leafy',    season: 'cool', notes: 'One per square. Real collards are a fall and winter crop. Frost makes them sweeter.' },
  // BRASSICAS
  { id: 'kale',           name: 'Kale',                     perSqFt: 1,  category: 'brassica', season: 'cool', notes: 'One per square. Gets tall. Sweetens after frost.' },
  { id: 'broccoli',       name: 'Broccoli',                 perSqFt: 1,  category: 'brassica', season: 'cool', notes: 'One per square. Central head first, then side shoots for weeks.' },
  { id: 'cabbage',        name: 'Cabbage',                  perSqFt: 1,  category: 'brassica', season: 'cool', notes: 'One per square. Needs consistent moisture.' },
  { id: 'cauliflower',    name: 'Cauliflower',              perSqFt: 1,  category: 'brassica', season: 'cool', notes: 'One per square. The diva of brassicas. Temperamental.' },
  // ROOT
  { id: 'carrot',         name: 'Carrot',                   perSqFt: 16, category: 'root',     season: 'cool', notes: 'Sixteen per square (4×4 grid). Needs loose, deep soil.' },
  { id: 'radish',         name: 'Radish',                   perSqFt: 16, category: 'root',     season: 'cool', notes: 'Sixteen per square. Ready in 3-4 weeks. Good gap filler.' },
  { id: 'beet',           name: 'Beet',                     perSqFt: 9,  category: 'root',     season: 'cool', notes: 'Nine per square. Eat the greens too.' },
  { id: 'turnip',         name: 'Turnip',                   perSqFt: 9,  category: 'root',     season: 'cool', notes: 'Nine per square. Both root and greens are useful.' },
  { id: 'potato',         name: 'Potato',                   perSqFt: 1,  category: 'root',     season: 'cool', notes: 'One per square. Hill as it grows. Needs depth.' },
  { id: 'sweet_potato',   name: 'Sweet Potato',             perSqFt: 1,  category: 'root',     season: 'warm', notes: 'One per square minimum. Vines sprawl aggressively.' },
  // ALLIUMS
  { id: 'onion',          name: 'Onion',                    perSqFt: 9,  category: 'allium',   season: 'cool', notes: 'Nine per square for bulbing onions. Sixteen for green onions.' },
  { id: 'garlic',         name: 'Garlic',                   perSqFt: 9,  category: 'allium',   season: 'cool', notes: 'Nine per square. Plant in fall for summer harvest.' },
  { id: 'chives',         name: 'Chives',                   perSqFt: 4,  category: 'allium',   season: 'cool', notes: 'Four per square. Perennial. Edible purple flowers attract pollinators.' },
  // HERBS
  { id: 'basil',          name: 'Basil',                    perSqFt: 4,  category: 'herb',     season: 'warm', notes: 'Four per square. Classic tomato companion. Pinch flowers.' },
  { id: 'cilantro',       name: 'Cilantro',                 perSqFt: 4,  category: 'herb',     season: 'cool', notes: 'Four per square. Bolts fast in heat. Let some go to seed for coriander.' },
  { id: 'dill',           name: 'Dill',                     perSqFt: 4,  category: 'herb',     season: 'cool', notes: 'Four per square. Attracts beneficial insects. Reseeds.' },
  { id: 'parsley',        name: 'Parsley',                  perSqFt: 4,  category: 'herb',     season: 'cool', notes: 'Four per square. Biennial. Swallowtail caterpillars love it.' },
  { id: 'oregano',        name: 'Oregano',                  perSqFt: 1,  category: 'herb',     season: 'warm', notes: 'One per square. Perennial. Spreads. Greek oregano is the culinary variety.' },
  { id: 'thyme',          name: 'Thyme',                    perSqFt: 4,  category: 'herb',     season: 'cool', notes: 'Four per square. Perennial. Low-growing, good bed edge plant.' },
  { id: 'rosemary',       name: 'Rosemary',                 perSqFt: 1,  category: 'herb',     season: 'warm', notes: 'One per square. Perennial. Gets woody and large over years. Drought tolerant.' },
  { id: 'sage',           name: 'Sage',                     perSqFt: 1,  category: 'herb',     season: 'cool', notes: 'One per square. Perennial. Attractive to pollinators when flowering.' },
  { id: 'mint',           name: 'Mint',                     perSqFt: 1,  category: 'herb',     season: 'cool', notes: 'One per square, in a container. Will take over the entire bed if not confined.' },
  { id: 'tarragon',       name: 'Mexican Tarragon',         perSqFt: 1,  category: 'herb',     season: 'warm', notes: 'One per square. Anise-flavored. More heat tolerant than French tarragon.' },
  // FLOWERS
  { id: 'marigold',       name: 'Marigold',                 perSqFt: 4,  category: 'flower',   season: 'warm', notes: 'Four per square. Pest deterrent. French marigolds are the studied variety.' },
  { id: 'nasturtium',     name: 'Nasturtium',               perSqFt: 4,  category: 'flower',   season: 'warm', notes: 'Four per square. Trap crop for aphids. Edible flowers and leaves.' },
  { id: 'sunflower',      name: 'Sunflower',                perSqFt: 1,  category: 'flower',   season: 'warm', notes: 'One per square. Attracts pollinators and birds. Plant on north side to avoid shading.' },
  { id: 'echinacea',      name: 'Echinacea',                perSqFt: 1,  category: 'flower',   season: 'warm', notes: 'One per square. Native perennial. Attracts pollinators. Drought tolerant once established.' },
  { id: 'morning_glory',  name: 'Morning Glory',            perSqFt: 2,  category: 'flower',   season: 'warm', notes: 'Two per square on a trellis. Reseeds aggressively. Volunteers next year.', trellis: true },
  { id: 'passionflower',  name: 'Passionflower (Maypop)',   perSqFt: 1,  category: 'flower',   season: 'warm', notes: 'One per square with trellis. Native perennial vine. Host plant for Gulf fritillary butterfly.', trellis: true },
  // GRAIN
  { id: 'corn',           name: 'Corn',                     perSqFt: 4,  category: 'grain',    season: 'warm', notes: 'Four per square in blocks, not rows. Needs multiple squares for pollination.' },
]

/* ── COMPANION MATRIX ────────────────────────────────────────────────────── */

const COMPANIONS: Record<string, 'good' | 'bad'> = {
  // Good
  'basil-pepper_hot': 'good', 'basil-pepper_sweet': 'good', 'basil-tomato': 'good',
  'bean_bush-corn': 'good', 'bean_bush-potato': 'good',
  'bean_pole-corn': 'good', 'bean_pole-squash': 'good',
  'beet-lettuce': 'good', 'beet-onion': 'good',
  'broccoli-onion': 'good',
  'cabbage-dill': 'good', 'cabbage-onion': 'good',
  'carrot-onion': 'good', 'carrot-rosemary': 'good', 'carrot-sage': 'good', 'carrot-tomato': 'good',
  'chives-tomato': 'good',
  'corn-cowpea': 'good', 'corn-squash': 'good',
  'cucumber-nasturtium': 'good', 'cucumber-radish': 'good', 'cucumber-sunflower': 'good',
  'echinacea-tomato': 'good',
  'lettuce-carrot': 'good', 'lettuce-radish': 'good', 'lettuce-strawberry': 'good',
  'marigold-pepper_hot': 'good', 'marigold-pepper_sweet': 'good', 'marigold-tomato': 'good',
  'nasturtium-squash': 'good',
  'oregano-pepper_sweet': 'good',
  'parsley-tomato': 'good',
  'pea-carrot': 'good', 'pea-radish': 'good', 'pea-spinach': 'good',
  'pepper_sweet-carrot': 'good',
  'rosemary-cabbage': 'good',
  'sage-broccoli': 'good',
  'thyme-cabbage': 'good',
  'tomato-nasturtium': 'good',
  // Bad
  'bean_bush-chives': 'bad', 'bean_bush-garlic': 'bad', 'bean_bush-onion': 'bad',
  'bean_pole-chives': 'bad', 'bean_pole-garlic': 'bad', 'bean_pole-onion': 'bad',
  'broccoli-strawberry': 'bad', 'broccoli-tomato': 'bad',
  'cabbage-strawberry': 'bad', 'cabbage-tomato': 'bad',
  'carrot-dill': 'bad',
  'cauliflower-tomato': 'bad',
  'corn-tomato': 'bad',
  'cowpea-garlic': 'bad', 'cowpea-onion': 'bad',
  'cucumber-potato': 'bad',
  'dill-tomato': 'bad',
  'mint-parsley': 'bad',
  'pea-garlic': 'bad', 'pea-onion': 'bad',
  'potato-tomato': 'bad',
  'sage-cucumber': 'bad',
  'squash-potato': 'bad',
}

function getRelationship(a: string, b: string): 'good' | 'bad' | null {
  if (a === b) return null
  return COMPANIONS[[a, b].sort().join('-')] || null
}

/* ── CROP COLORS ─────────────────────────────────────────────────────────── */

const CAT_COLORS: Record<Category, string> = {
  fruit: '#c14a3a',    // tomato-ish
  legume: '#3a7a3e',   // green
  leafy: '#5fa050',    // light green
  brassica: '#4a87a8', // muted sky
  root: '#c47a3a',     // amber
  allium: '#a17ab6',   // muted plum
  herb: '#4f9a76',     // emerald
  flower: '#d99410',   // sunflower
  grain: '#d4a82e',    // mustard
}

const CROP_COLORS: Record<string, string> = {
  tomato: '#c14a3a', pepper_sweet: '#3a8a3e', pepper_hot: '#a82820', eggplant: '#7a4a9a', cucumber: '#4a8a3e',
  squash: '#c89824', zucchini: '#3a6a28', winter_squash: '#a8541c', okra: '#5a7028', watermelon: '#3a7a3a',
  strawberry: '#b8392a', artichoke: '#6d8f3e',
  bean_pole: '#3a7a3e', bean_bush: '#2c5530', cowpea: '#6b4a9a', pea: '#5fa050',
  lettuce: '#7ab85a', spinach: '#2a6028', swiss_chard: '#b8861e', collard: '#1f4f1f',
  kale: '#234a23', broccoli: '#3a7a3e', cabbage: '#6da0b0', cauliflower: '#d0c8a8',
  carrot: '#c47a3a', radish: '#b8392a', beet: '#6f3aa8', turnip: '#c8b890', potato: '#9a8a6a', sweet_potato: '#a8541c',
  onion: '#d4b860', garlic: '#d0c8a8', chives: '#a17ab6',
  basil: '#3a8a3e', cilantro: '#5fa050', dill: '#7ab85a', parsley: '#2a6028',
  oregano: '#234a23', thyme: '#7a8a72', rosemary: '#3a7a72', sage: '#7a8a72', mint: '#4f9a76', tarragon: '#6a8528',
  marigold: '#d99410', nasturtium: '#c8541c', sunflower: '#d4a82e', echinacea: '#a17ab6',
  morning_glory: '#7a7ab6', passionflower: '#7a4a9a',
  corn: '#d4a82e',
}

function getCropColor(crop: Crop): string {
  return CROP_COLORS[crop.id] || CAT_COLORS[crop.category]
}

/* ── DOT GRID ────────────────────────────────────────────────────────────── */

/** Returns [cols, rows] for laying out N plants in an SFG-traditional pattern. */
function layoutFor(count: number): [number, number] {
  if (count <= 1) return [1, 1]
  if (count === 2) return [2, 1]
  if (count === 4) return [2, 2]
  if (count === 8) return [4, 2]
  if (count === 9) return [3, 3]
  if (count === 16) return [4, 4]
  const c = Math.ceil(Math.sqrt(count))
  return [c, c]
}

function DotGrid({ count, color }: { count: number; color: string }) {
  const [cols, rows] = layoutFor(count)
  // Larger dots when there are fewer plants — keeps single tomato readable
  // and 16 carrots still distinguishable.
  const dotPct = count <= 1 ? 70 : count <= 4 ? 75 : count <= 9 ? 80 : 85
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      width: '100%',
      height: '100%',
      placeItems: 'center',
      gap: '6%',
      padding: '4%',
      boxSizing: 'border-box',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: `${dotPct}%`,
          aspectRatio: '1',
          borderRadius: '50%',
          backgroundColor: color,
          opacity: 0.92,
          boxShadow: '0 1px 2px rgba(20,18,12,0.18)',
        }} />
      ))}
    </div>
  )
}

/* ── MAIN COMPONENT ──────────────────────────────────────────────────────── */

const BED_SIZES = ['3x3', '4x4', '4x8', '2x8', '3x6', '2x12'] as const
type BedSize = typeof BED_SIZES[number]

type TrellisEdge = 'none' | 'N' | 'S' | 'E' | 'W'
const TRELLIS_EDGES: { id: TrellisEdge; label: string }[] = [
  { id: 'none', label: 'No trellis' },
  { id: 'N',    label: 'North' },
  { id: 'S',    label: 'South' },
  { id: 'E',    label: 'East' },
  { id: 'W',    label: 'West' },
]

const CATEGORY_FILTERS: Array<'all' | Category> = ['all', 'fruit', 'leafy', 'root', 'brassica', 'legume', 'allium', 'herb', 'flower', 'grain']

export default function SquareFootPlanner() {
  const [bedSize, setBedSize] = useState<BedSize>('4x4')
  const [grid, setGrid] = useState<(string | null)[]>(() => Array(16).fill(null))
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<'all' | Category>('all')
  const [showCompanionPanel, setShowCompanionPanel] = useState(false)
  const [inspectCrop, setInspectCrop] = useState<string | null>(null)
  const [trellisEdge, setTrellisEdge] = useState<TrellisEdge>('none')

  // Always render the larger dimension horizontally so the bed reads landscape
  const _dims = bedSize.split('x').map(Number)
  const cols = Math.max(_dims[0], _dims[1])
  const rows = Math.min(_dims[0], _dims[1])
  const totalSquares = cols * rows

  function changeBedSize(s: BedSize) {
    const [a, b] = s.split('x').map(Number)
    setBedSize(s)
    setGrid(Array(a * b).fill(null))
  }

  function placeOrRemove(index: number) {
    setGrid((prev) => {
      const next = [...prev]
      if (next[index] === selectedCrop) next[index] = null
      else if (selectedCrop) next[index] = selectedCrop
      return next
    })
  }

  function clearGrid() {
    setGrid(Array(totalSquares).fill(null))
  }

  const placedCrops = useMemo(() => [...new Set(grid.filter(Boolean) as string[])], [grid])
  const cropCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    grid.forEach((id) => { if (id) counts[id] = (counts[id] || 0) + 1 })
    return counts
  }, [grid])

  const alerts = useMemo(() => {
    const results: { type: 'good' | 'bad'; a: Crop; b: Crop }[] = []
    const checked = new Set<string>()
    for (let i = 0; i < grid.length; i++) {
      const id = grid[i]
      if (!id) continue
      const row = Math.floor(i / cols)
      const col = i % cols
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = row + dr
          const nc = col + dc
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
          const nid = grid[nr * cols + nc]
          if (!nid || nid === id) continue
          const pairKey = [id, nid].sort().join('-')
          if (checked.has(pairKey)) continue
          checked.add(pairKey)
          const rel = getRelationship(id, nid)
          if (rel) {
            const a = CROPS.find((c) => c.id === id)!
            const b = CROPS.find((c) => c.id === nid)!
            results.push({ type: rel, a, b })
          }
        }
      }
    }
    return results
  }, [grid, cols, rows])

  const filteredCrops = filterCategory === 'all' ? CROPS : CROPS.filter((c) => c.category === filterCategory)

  const inspectRelationships = useMemo(() => {
    if (!inspectCrop) return { good: [] as Crop[], bad: [] as Crop[] }
    const good: Crop[] = []
    const bad: Crop[] = []
    CROPS.forEach((other) => {
      const rel = getRelationship(inspectCrop, other.id)
      if (rel === 'good') good.push(other)
      if (rel === 'bad') bad.push(other)
    })
    return { good, bad }
  }, [inspectCrop])

  return (
    <div style={{ marginBottom: '3rem' }}>

      {/* Main tool area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
        gap: '1.5rem',
        marginBottom: '1.5rem',
      }} className="ws-sfg-layout">

        {/* Left: bed size + filter + crop list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={miniHeadStyle}>Bed size</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {BED_SIZES.map((s) => (
                <Pill key={s} active={bedSize === s} onClick={() => changeBedSize(s)}>{s.replace('x', '×')} ft</Pill>
              ))}
            </div>
          </div>

          <div>
            <div style={miniHeadStyle}>Trellis edge</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {TRELLIS_EDGES.map((t) => (
                <Pill key={t.id} active={trellisEdge === t.id} onClick={() => setTrellisEdge(t.id)} size="sm">
                  {t.label}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <div style={miniHeadStyle}>Filter</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {CATEGORY_FILTERS.map((cat) => (
                <Pill key={cat} active={filterCategory === cat} onClick={() => setFilterCategory(cat)} size="sm">
                  {cat === 'all' ? 'All' : cat[0].toUpperCase() + cat.slice(1)}
                </Pill>
              ))}
            </div>
          </div>

          <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {filteredCrops.map((crop) => {
              const active = selectedCrop === crop.id
              return (
                <div key={crop.id} style={{ display: 'flex', gap: '0.25rem', alignItems: 'stretch' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedCrop(active ? null : crop.id)}
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      padding: '0.5rem 0.7rem',
                      borderRadius: 6,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      background: active ? 'var(--ink)' : 'var(--card)',
                      color: active ? 'var(--paper)' : 'var(--ink)',
                      border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
                      transition: 'all 0.15s',
                    }}
                    className={active ? '' : 'ws-sfg-crop-btn'}
                  >
                    <span style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      flexShrink: 0,
                      backgroundColor: getCropColor(crop),
                    }} />
                    <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {crop.name}
                      {crop.trellis && (
                        <span
                          title="Trellis-friendly"
                          aria-label="Trellis-friendly"
                          style={{
                            display: 'inline-block',
                            marginLeft: '0.35rem',
                            color: active ? 'var(--paper)' : 'var(--green)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            opacity: active ? 0.8 : 1,
                          }}
                        >↑</span>
                      )}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: active ? 'var(--paper)' : 'var(--ink-muted)',
                      opacity: active ? 0.75 : 1,
                    }}>{crop.perSqFt}/sq ft</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setInspectCrop(crop.id); setShowCompanionPanel(true) }}
                    title={`Companions for ${crop.name}`}
                    aria-label={`Companions for ${crop.name}`}
                    style={{
                      padding: '0.4rem 0.55rem',
                      borderRadius: 6,
                      background: 'var(--card)',
                      border: '1px solid var(--rule)',
                      cursor: 'pointer',
                      color: 'var(--ink-muted)',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      transition: 'all 0.15s',
                    }}
                    className="ws-sfg-info-btn"
                  >
                    ?
                  </button>
                </div>
              )
            })}
          </div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '0.78rem',
            color: 'var(--ink-muted)',
            lineHeight: 1.5,
          }}>
            Pick a crop, click squares to place it. Click an occupied square with the same crop to remove it. Tap <strong>?</strong> for companion info. The <span style={{ color: 'var(--green)', fontWeight: 700 }}>↑</span> marks crops that climb a trellis.
          </p>
        </div>

        {/* Right: grid + alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--rule)',
            padding: '1.25rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
            }}>
              <div>
                <strong style={{ color: 'var(--ink)' }}>{bedSize.replace('x', '×')} ft bed</strong>
                <span style={{ color: 'var(--ink-muted)', marginLeft: '0.5rem' }}>({totalSquares} squares)</span>
              </div>
              <button
                type="button"
                onClick={clearGrid}
                style={{
                  padding: '0.35rem 0.7rem',
                  background: 'transparent',
                  border: '1px solid var(--rule)',
                  color: 'var(--ink-soft)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: 999,
                  transition: 'all 0.15s',
                }}
                className="ws-sfg-clear-btn"
              >
                Clear bed
              </button>
            </div>

            <div style={{
              position: 'relative',
              paddingTop: trellisEdge === 'N' ? '0.85rem' : 0,
              paddingBottom: trellisEdge === 'S' ? '0.85rem' : 0,
              paddingLeft: trellisEdge === 'W' ? '0.85rem' : 0,
              paddingRight: trellisEdge === 'E' ? '0.85rem' : 0,
              transition: 'padding 0.2s',
            }}>
              {trellisEdge !== 'none' && <TrellisMarker edge={trellisEdge} />}

            <div style={{
              display: 'grid',
              gap: '0.4rem',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
            }}>
              {grid.slice(0, totalSquares).map((cropId, i) => {
                const crop = cropId ? CROPS.find((c) => c.id === cropId) : null
                let hasBad = false, hasGood = false
                if (cropId) {
                  const row = Math.floor(i / cols)
                  const col = i % cols
                  for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                      if (dr === 0 && dc === 0) continue
                      const nr = row + dr
                      const nc = col + dc
                      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
                      const nid = grid[nr * cols + nc]
                      if (!nid || nid === cropId) continue
                      const rel = getRelationship(cropId, nid)
                      if (rel === 'bad') hasBad = true
                      else if (rel === 'good') hasGood = true
                    }
                  }
                }
                const borderColor = hasBad ? 'var(--rust)' : hasGood ? 'var(--green)' : (crop ? 'var(--ink-soft)' : 'var(--rule)')
                const bgColor = hasBad ? 'rgba(181,71,14,0.08)' : hasGood ? 'rgba(44,85,48,0.08)' : (crop ? 'var(--paper-tint)' : 'var(--paper)')
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => placeOrRemove(i)}
                    aria-label={crop ? `${crop.name} (click to remove)` : `Empty square (click to place ${selectedCrop ? CROPS.find(c => c.id === selectedCrop)?.name : 'crop'})`}
                    style={{
                      aspectRatio: '1',
                      borderRadius: 6,
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 0,
                      overflow: 'hidden',
                      transition: 'all 0.15s',
                      fontFamily: 'var(--font-sans)',
                    }}
                    className="ws-sfg-sq"
                  >
                    {crop ? (
                      <>
                        <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
                          <DotGrid count={crop.perSqFt} color={getCropColor(crop)} />
                        </div>
                        <span style={{
                          flexShrink: 0,
                          padding: '3px 4px 4px',
                          fontSize: '0.58rem',
                          color: 'var(--ink-muted)',
                          textAlign: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.1,
                          borderTop: '1px solid var(--rule)',
                          background: 'var(--card)',
                          pointerEvents: 'none',
                        }}>{crop.name}</span>
                      </>
                    ) : (
                      <span style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--ink-muted)',
                        opacity: 0.4,
                        fontSize: '1.1rem',
                      }}>+</span>
                    )}
                  </button>
                )
              })}
            </div>
            </div>
          </div>

          {placedCrops.length > 0 && (
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--rule)',
              padding: '1rem 1.25rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
            }}>
              <div style={{
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: '0.6rem',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>Planting summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {placedCrops.map((id) => {
                  const crop = CROPS.find((c) => c.id === id)!
                  const count = cropCounts[id] || 0
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, backgroundColor: getCropColor(crop) }} />
                        <span>{crop.name}</span>
                      </span>
                      <span style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.78rem' }}>
                        {count} {count === 1 ? 'square' : 'squares'} · ~{count * crop.perSqFt} plants
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {alerts.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {alerts.filter((a) => a.type === 'bad').map((a, i) => (
                <Alert key={`bad-${i}`} kind="bad" a={a.a} b={a.b}>are antagonists. Consider separating them.</Alert>
              ))}
              {alerts.filter((a) => a.type === 'good').map((a, i) => (
                <Alert key={`good-${i}`} kind="good" a={a.a} b={a.b}>are companions. Good pairing.</Alert>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Companion lookup panel */}
      <section style={{ marginBottom: '0' }}>
        <button
          type="button"
          onClick={() => setShowCompanionPanel((v) => !v)}
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
          className="ws-sfg-companion-head"
        >
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: '1.2rem',
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginBottom: '0.2rem',
            }}>Companion planting reference</h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.45,
            }}>Look up which crops help or hurt each other. Research-backed pairings, not Pinterest folklore.</p>
          </div>
          <span style={{ fontSize: '1.2rem', color: 'var(--ink-muted)' }}>{showCompanionPanel ? '▾' : '▸'}</span>
        </button>

        {showCompanionPanel && (
          <div style={{
            marginTop: '0.75rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--card)',
            border: '1px solid var(--rule)',
          }}>
            <label style={{ display: 'block', marginBottom: '1rem' }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: '0.4rem',
              }}>Select a crop to see its relationships</span>
              <select
                value={inspectCrop || ''}
                onChange={(e) => setInspectCrop(e.target.value || null)}
                style={{
                  width: '100%',
                  maxWidth: 280,
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--rule)',
                  borderRadius: 6,
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                }}
              >
                <option value="">Choose a crop...</option>
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>

            {inspectCrop && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="ws-sfg-inspect-grid">
                <div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                    marginBottom: '0.6rem',
                  }}>Good companions</div>
                  {inspectRelationships.good.length === 0 ? (
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: 'var(--ink-muted)',
                    }}>No documented companions in the data.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {inspectRelationships.good.map((c) => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink)' }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, backgroundColor: getCropColor(c) }} />
                          {c.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--rust)',
                    marginBottom: '0.6rem',
                  }}>Keep apart</div>
                  {inspectRelationships.bad.length === 0 ? (
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: 'var(--ink-muted)',
                    }}>No documented antagonists in the data.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {inspectRelationships.bad.map((c) => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink)' }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, backgroundColor: getCropColor(c) }} />
                          {c.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <style>{`
        .ws-sfg-crop-btn:hover { border-color: var(--green) !important; background: var(--paper-tint) !important; }
        .ws-sfg-info-btn:hover { border-color: var(--green) !important; color: var(--ink) !important; }
        .ws-sfg-clear-btn:hover { border-color: var(--rust) !important; color: var(--rust) !important; }
        .ws-sfg-companion-head:hover { border-color: var(--green) !important; }
        .ws-sfg-sq:hover { transform: scale(1.03); }
        @media (max-width: 760px) {
          .ws-sfg-layout { grid-template-columns: 1fr !important; }
          .ws-sfg-inspect-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ── HELPERS ──────────────────────────────────────────────────────────── */

function TrellisMarker({ edge }: { edge: TrellisEdge }) {
  if (edge === 'none') return null
  const isHorizontal = edge === 'N' || edge === 'S'
  const labelChar = edge === 'N' ? 'N' : edge === 'S' ? 'S' : edge === 'E' ? 'E' : 'W'
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    background: 'repeating-linear-gradient(' +
      (isHorizontal ? '90deg' : '0deg') +
      ', var(--green), var(--green) 6px, transparent 6px, transparent 12px)',
    opacity: 0.85,
    pointerEvents: 'none',
  }
  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.58rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--green)',
    background: 'var(--card)',
    padding: '0 0.3rem',
    pointerEvents: 'none',
  }
  if (edge === 'N') {
    return (
      <>
        <div style={{ ...baseStyle, top: '0.25rem', left: 0, right: 0, height: 3 }} />
        <div style={{ ...labelStyle, top: '-0.35rem', left: '50%', transform: 'translateX(-50%)' }}>{labelChar} · Trellis</div>
      </>
    )
  }
  if (edge === 'S') {
    return (
      <>
        <div style={{ ...baseStyle, bottom: '0.25rem', left: 0, right: 0, height: 3 }} />
        <div style={{ ...labelStyle, bottom: '-0.35rem', left: '50%', transform: 'translateX(-50%)' }}>{labelChar} · Trellis</div>
      </>
    )
  }
  if (edge === 'W') {
    return (
      <>
        <div style={{ ...baseStyle, left: '0.25rem', top: 0, bottom: 0, width: 3 }} />
        <div style={{ ...labelStyle, left: '-0.35rem', top: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', transformOrigin: 'center' }}>{labelChar} · Trellis</div>
      </>
    )
  }
  return (
    <>
      <div style={{ ...baseStyle, right: '0.25rem', top: 0, bottom: 0, width: 3 }} />
      <div style={{ ...labelStyle, right: '-0.35rem', top: '50%', transform: 'translate(50%, -50%) rotate(90deg)', transformOrigin: 'center' }}>{labelChar} · Trellis</div>
    </>
  )
}

function Pill({ active, onClick, children, size = 'md' }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  size?: 'sm' | 'md'
}) {
  const fontSize = size === 'sm' ? '0.68rem' : '0.72rem'
  const padding = size === 'sm' ? '0.3rem 0.6rem' : '0.4rem 0.8rem'
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize,
        fontWeight: 600,
        letterSpacing: '0.08em',
        padding,
        background: active ? 'var(--ink)' : 'var(--paper)',
        color: active ? 'var(--paper)' : 'var(--ink-soft)',
        border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
        cursor: 'pointer',
        borderRadius: 999,
        transition: 'all 0.15s',
      }}
      className={active ? '' : 'ws-sfg-pill'}
    >
      {children}
    </button>
  )
}

function Alert({ kind, a, b, children }: {
  kind: 'good' | 'bad'
  a: Crop
  b: Crop
  children: React.ReactNode
}) {
  const colors = kind === 'bad'
    ? { fg: 'var(--rust)',  bg: 'rgba(181,71,14,0.08)', bd: 'rgba(181,71,14,0.35)' }
    : { fg: 'var(--green)', bg: 'rgba(44,85,48,0.08)',  bd: 'rgba(44,85,48,0.35)' }
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.6rem',
      padding: '0.75rem 1rem',
      background: colors.bg,
      border: `1px solid ${colors.bd}`,
      borderLeft: `3px solid ${colors.fg}`,
      fontFamily: 'var(--font-serif)',
      fontSize: '0.9rem',
      lineHeight: 1.5,
    }}>
      <span style={{ flex: 1 }}>
        <span style={{ color: colors.fg, fontWeight: 600 }}>
          <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', backgroundColor: getCropColor(a), marginRight: 4, verticalAlign: 'middle' }} />
          {a.name}
          {' + '}
          <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', backgroundColor: getCropColor(b), marginRight: 4, verticalAlign: 'middle' }} />
          {b.name}
        </span>
        <span style={{ color: 'var(--ink-soft)', marginLeft: '0.4rem' }}>{children}</span>
      </span>
    </div>
  )
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
