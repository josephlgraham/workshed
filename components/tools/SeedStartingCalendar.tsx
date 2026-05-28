'use client'

import { useState, useEffect, useMemo } from 'react'

/* ── CROP DATA ────────────────────────────────────────────────────────────── */

type SowStrategy = 'preferred' | 'acceptable' | 'optional' | 'required' | 'not_recommended'
type Crop = {
  name: string
  variety: string | null
  joeGrows: boolean
  season: 'warm' | 'cool'
  directSow:   { strategy: SowStrategy; weeks: number | null }
  indoorStart: { strategy: SowStrategy; weeks: number | null }
  transplant:  { weeks: number | null }
  days: string
  notes: string
}

const CROPS: Crop[] = [
  // WARM SEASON
  { name: 'Tomato', variety: 'San Marzano', joeGrows: true, season: 'warm',
    directSow: { strategy: 'not_recommended', weeks: null }, indoorStart: { strategy: 'required', weeks: -7 }, transplant: { weeks: 1 },
    days: '75-85 from transplant',
    notes: 'Heavy feeders. Cage or stake at planting. San Marzanos are paste tomatoes, denser and less juicy, made for sauce. Wait for soil consistently above 60°F.' },
  { name: 'Pepper (sweet/bell)', variety: null, joeGrows: true, season: 'warm',
    directSow: { strategy: 'not_recommended', weeks: null }, indoorStart: { strategy: 'required', weeks: -9 }, transplant: { weeks: 2 },
    days: '70-85 from transplant',
    notes: 'Slow to germinate. Bottom heat helps. Do not rush transplant. Peppers sulk in cold soil. Wait until nights are consistently above 55°F.' },
  { name: 'Eggplant', variety: 'Ichiban', joeGrows: true, season: 'warm',
    directSow: { strategy: 'not_recommended', weeks: null }, indoorStart: { strategy: 'required', weeks: -9 }, transplant: { weeks: 2 },
    days: '60-70 from transplant',
    notes: 'Loves heat. Like peppers, hates cold soil. Ichiban means "first" or "number one" in Japanese, bred for early bearing.' },
  { name: 'Basil', variety: 'purple and green', joeGrows: true, season: 'warm',
    directSow: { strategy: 'acceptable', weeks: 2 }, indoorStart: { strategy: 'optional', weeks: -6 }, transplant: { weeks: 2 },
    days: '60-90',
    notes: 'Extremely cold sensitive. One cold night can take it out. Harden off carefully if started indoors. Pinch flowers to keep leaves sweet.' },
  { name: 'Cucumber', variety: 'Straight Eight', joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'optional', weeks: -3 }, transplant: { weeks: 1 },
    days: '55-65',
    notes: 'Hates root disturbance. Direct sow strongly preferred. If starting indoors, use peat or paper pots that go in the ground intact.' },
  { name: 'Summer Squash', variety: '49er hybrid', joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'optional', weeks: -3 }, transplant: { weeks: 1 },
    days: '50-60',
    notes: 'Direct sow whenever possible. Watch for squash bugs and vine borers. Both arrive on schedule in the South.' },
  { name: 'Zucchini', variety: 'Black Beauty', joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'optional', weeks: -3 }, transplant: { weeks: 1 },
    days: '50-60',
    notes: 'Same rules as summer squash. Black Beauty is an heirloom, open-pollinated, seed-saveable.' },
  { name: 'Sweet Corn', variety: 'Peaches and Cream', joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '75-85',
    notes: 'Plant in blocks of at least 4x4 for pollination, not single rows. Soil temp matters more than calendar. Wait for 60°F+.' },
  { name: 'Pole Beans', variety: 'Rattlesnake', joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '60-75',
    notes: 'Beans hate cold soil and resent transplant. Direct sow only. Rattlesnake is a Southern heirloom, purple streaks fade when cooked.' },
  { name: 'Bush Beans', variety: null, joeGrows: false, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '50-60',
    notes: 'Succession plant every 2-3 weeks for continuous harvest.' },
  { name: 'Southern Peas (Cowpeas)', variety: 'Purple Hull', joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 4 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '60-90',
    notes: 'Wait for real heat. They are nitrogen fixers, paying rent to the soil. Do not plant in cold ground.' },
  { name: 'Lima Beans / Butter Beans', variety: null, joeGrows: false, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 3 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '65-90',
    notes: 'Heat lovers. Wait for warm soil. Pole types yield longer than bush.' },
  { name: 'Okra', variety: null, joeGrows: false, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 3 }, indoorStart: { strategy: 'optional', weeks: -4 }, transplant: { weeks: 3 },
    days: '55-65',
    notes: 'Loves heat. Soak seeds overnight before sowing. Does not transplant well, direct sow preferred. In the South, you will be sick of okra by August.' },
  { name: 'Watermelon', variety: null, joeGrows: false, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 2 }, indoorStart: { strategy: 'optional', weeks: -4 }, transplant: { weeks: 2 },
    days: '75-95',
    notes: 'Needs space and heat. Hates root disturbance, peat pots if starting indoors.' },
  { name: 'Cantaloupe / Muskmelon', variety: null, joeGrows: false, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 2 }, indoorStart: { strategy: 'optional', weeks: -4 }, transplant: { weeks: 2 },
    days: '75-90',
    notes: 'Same rules as watermelon. Do not water once fruit is sizing up. Flavor concentrates with stress.' },
  { name: 'Winter Squash / Pumpkin', variety: null, joeGrows: false, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'optional', weeks: -3 }, transplant: { weeks: 1 },
    days: '85-120',
    notes: 'For Halloween pumpkins in zone 8a, plant in early July. Long-season varieties need to go in early.' },
  { name: 'Morning Glory', variety: null, joeGrows: true, season: 'warm',
    directSow: { strategy: 'preferred', weeks: 1 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '55-70 to bloom',
    notes: 'Soak or scarify seeds before sowing. Reseeds aggressively, you will have volunteers next year.' },

  // COOL SEASON
  { name: 'Lettuce', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -5 }, indoorStart: { strategy: 'optional', weeks: -7 }, transplant: { weeks: -3 },
    days: '45-60',
    notes: 'Bolts and turns bitter in heat. Spring window is short in 8a. Fall planting is more forgiving. Loose-leaf types are most heat tolerant.' },
  { name: 'Spinach', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -5 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '40-50',
    notes: 'Bolts faster than lettuce. Better as a fall crop in the Deep South. Does not transplant well.' },
  { name: 'Kale', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -4 }, indoorStart: { strategy: 'optional', weeks: -7 }, transplant: { weeks: -3 },
    days: '55-75',
    notes: 'Sweetens after frost. Fall and winter crop in the South. Survives single digits with row cover.' },
  { name: 'Collard Greens', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -4 }, indoorStart: { strategy: 'optional', weeks: -7 }, transplant: { weeks: -3 },
    days: '60-75',
    notes: 'Real collards are a fall and winter crop. Spring planting gets bitter once heat arrives. Frost makes them sweeter.' },
  { name: 'Mustard Greens', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -4 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '30-45',
    notes: 'Fast crop. Bolts quickly in heat. Better in fall.' },
  { name: 'Turnips', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -4 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '40-60',
    notes: 'Roots and greens both edible. Classic Southern fall crop.' },
  { name: 'Swiss Chard', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -3 }, indoorStart: { strategy: 'optional', weeks: -6 }, transplant: { weeks: -2 },
    days: '50-60',
    notes: 'More heat tolerant than spinach. Cut-and-come-again. Keeps producing all season.' },
  { name: 'Broccoli', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'acceptable', weeks: -4 }, indoorStart: { strategy: 'optional', weeks: -8 }, transplant: { weeks: -3 },
    days: '60-80',
    notes: 'Spring planting is a race against heat in 8a. Fall planting is more reliable. Watch for cabbage worms.' },
  { name: 'Cabbage', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'acceptable', weeks: -4 }, indoorStart: { strategy: 'optional', weeks: -8 }, transplant: { weeks: -3 },
    days: '70-90',
    notes: 'Same heat-race issue as broccoli. Fall is the better crop in the Deep South.' },
  { name: 'Cauliflower', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'not_recommended', weeks: null }, indoorStart: { strategy: 'required', weeks: -8 }, transplant: { weeks: -3 },
    days: '65-85',
    notes: 'Fussier than broccoli. Does not tolerate heat or cold extremes well. Fall crop is more forgiving.' },
  { name: 'Brussels Sprouts', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'not_recommended', weeks: null }, indoorStart: { strategy: 'required', weeks: -10 }, transplant: { weeks: -4 },
    days: '85-110',
    notes: 'Long season. Fall-only crop in zone 8a, needs frost to taste right. Plant in summer for winter harvest.' },
  { name: 'Carrots', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -4 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '60-80',
    notes: 'Taproots resent disturbance, direct sow only. Slow to germinate. Keep soil moist for the first 2 weeks.' },
  { name: 'Radish', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -5 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '25-35',
    notes: 'Fastest crop in the garden. Succession plant every 2 weeks. Bolts in heat, spring window closes fast.' },
  { name: 'Beets', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -4 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '50-70',
    notes: 'Greens edible too. Each "seed" is actually a cluster, thin seedlings to one per spot.' },
  { name: 'Peas (English / Snap / Snow)', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'preferred', weeks: -7 }, indoorStart: { strategy: 'not_recommended', weeks: null }, transplant: { weeks: null },
    days: '55-70',
    notes: 'Cold tolerant, plant earlier than people think. February in zone 8a. They quit when heat arrives.' },
  { name: 'Onions (from seed)', variety: null, joeGrows: false, season: 'cool',
    directSow: { strategy: 'acceptable', weeks: -6 }, indoorStart: { strategy: 'optional', weeks: -12 }, transplant: { weeks: -4 },
    days: '100-130',
    notes: 'Choose short-day or intermediate-day varieties for the South. Long-day varieties will not bulb. Sets are easier than seeds for most gardeners.' },
  { name: 'Artichoke', variety: 'from seed', joeGrows: true, season: 'cool',
    directSow: { strategy: 'not_recommended', weeks: null }, indoorStart: { strategy: 'required', weeks: -12 }, transplant: { weeks: -2 },
    days: 'Tricky. Year one rarely produces.',
    notes: 'Tricky from seed in 8a. Needs vernalization (cold treatment) to bud reliably. Our winters either do not chill enough or chill too hard at the wrong moment. Best odds are treating them as a perennial and hoping for year-two buds. Worth trying anyway. Every season is more data.' },
]

type SpecialCase = {
  name: string
  joeGrows: boolean
  category: string
  when: string
  notes: string
}

const SPECIAL_CASES: SpecialCase[] = [
  { name: 'Garlic',                 joeGrows: true,  category: 'Fall planted',         when: 'October or November',           notes: 'Plant cloves in fall for harvest the following June or July. Garlic needs cold to remember it is garlic. It will not produce on a spring schedule.' },
  { name: 'Sweet Potatoes',         joeGrows: true,  category: 'Slips, not seeds',     when: '2-3 weeks after last frost',    notes: 'Grown from slips (rooted shoots), not seeds. Plant when soil is warm. Order slips from a Southern grower for varieties suited to long, hot summers.' },
  { name: 'Potatoes',               joeGrows: true,  category: 'Seed potatoes',        when: '2-3 weeks before last frost',   notes: 'Grown from seed potatoes (cut tubers with eyes), not seeds. Old Southern rule: plant by St. Patrick\'s Day.' },
  { name: 'Onions (from sets)',     joeGrows: false, category: 'Sets, not seeds',     when: '4-6 weeks before last frost',   notes: 'Sets are baby onions, the easiest path. Pick short-day or intermediate-day varieties for the South. Long-day varieties will not bulb here.' },
  { name: 'Strawberries',           joeGrows: false, category: 'Bare-root crowns',    when: 'Late winter to early spring',   notes: 'Plant bare-root crowns when dormant. Pick June-bearers for the South. They ripen before the worst heat. Pinch first-year flowers off to build stronger plants for year two.' },
  { name: 'Ginger',                 joeGrows: true,  category: 'Rhizomes',            when: '3-4 weeks after last frost',    notes: 'Plant rhizomes (a chunk of grocery-store ginger works) after soil warms. Loves heat and humidity. Southern summers suit it. Dies back with frost. Mulch heavy or dig and store the rhizomes for replanting.' },
  { name: 'Chives',                 joeGrows: true,  category: 'Perennial herb',      when: 'Plant once',                    notes: 'Perennial in zone 8a. Divide every few years.' },
  { name: 'English Thyme',          joeGrows: true,  category: 'Perennial herb',      when: 'Plant once',                    notes: 'Perennial in zone 8a. Doing fine. Always doing fine.' },
  { name: 'Greek Oregano',          joeGrows: true,  category: 'Perennial herb',      when: 'Plant once',                    notes: 'Perennial in zone 8a. Spreads. Plant once and contain.' },
  { name: 'Mexican Tarragon',       joeGrows: true,  category: 'Tender perennial',    when: 'Plant once',                    notes: 'Tender perennial. Usually overwinters in zone 8a if mulched. Replace if winter is hard.' },
  { name: 'Maypop Passionflower',   joeGrows: true,  category: 'Perennial',           when: 'Plant once',                    notes: 'Native perennial. Dies back every winter, returns from roots.' },
  { name: 'Echinacea',              joeGrows: true,  category: 'Perennial',           when: 'Plant once',                    notes: 'Prairie perennial. Plant from started plants or sow in fall for spring germination.' },
]

/* ── HELPERS ──────────────────────────────────────────────────────────────── */

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + weeks * 7)
  return d
}
function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function fmtDateLong(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
function parseInputDate(s: string): Date {
  return new Date(s + 'T00:00:00')
}
function defaultFrostDate(): string {
  const year = new Date().getFullYear()
  return `${year}-04-01`
}

/* ── COMPONENT ────────────────────────────────────────────────────────────── */

type TimelineAction = {
  date: Date
  crop: Crop
  action: string
  badge: 'preferred' | 'needed' | 'optional' | null
  actionType: 'direct' | 'indoor' | 'transplant'
}

export default function SeedStartingCalendar() {
  const [frostDate, setFrostDate] = useState(defaultFrostDate())
  const [view, setView] = useState<'timeline' | 'crops'>('timeline')
  const [showOptionalIndoor, setShowOptionalIndoor] = useState(false)
  const [expandedCrop, setExpandedCrop] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(() => new Set(CROPS.map((c) => c.name)))

  function toggleCrop(name: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }
  function selectAll() { setSelected(new Set(CROPS.map((c) => c.name))) }
  function selectNone() { setSelected(new Set()) }
  function selectMine() { setSelected(new Set(CROPS.filter((c) => c.joeGrows).map((c) => c.name))) }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const fd = params.get('frostDate')
    if (fd && /^\d{4}-\d{2}-\d{2}$/.test(fd)) {
      setFrostDate(fd)
    }
  }, [])

  const frost = useMemo(() => parseInputDate(frostDate), [frostDate])

  const timeline = useMemo<TimelineAction[]>(() => {
    const actions: TimelineAction[] = []
    CROPS.forEach((crop) => {
      if (!selected.has(crop.name)) return
      const indoorRequired = crop.indoorStart.strategy === 'required'
      const indoorOptional = crop.indoorStart.strategy === 'optional'
      const showIndoor = indoorRequired || (indoorOptional && showOptionalIndoor)

      if (showIndoor && crop.indoorStart.weeks !== null) {
        actions.push({
          date: addWeeks(frost, crop.indoorStart.weeks),
          crop,
          action: 'Start indoors',
          badge: indoorRequired ? 'needed' : 'optional',
          actionType: 'indoor',
        })
      }
      if (showIndoor && crop.transplant.weeks !== null) {
        actions.push({
          date: addWeeks(frost, crop.transplant.weeks),
          crop,
          action: 'Transplant outdoors',
          badge: null,
          actionType: 'transplant',
        })
      }
      if (crop.directSow.weeks !== null) {
        const preferred = crop.directSow.strategy === 'preferred'
        actions.push({
          date: addWeeks(frost, crop.directSow.weeks),
          crop,
          action: 'Direct sow',
          badge: preferred ? 'preferred' : null,
          actionType: 'direct',
        })
      }
    })
    actions.sort((a, b) => a.date.getTime() - b.date.getTime())
    return actions
  }, [frost, showOptionalIndoor, selected])

  const timelineByMonth = useMemo(() => {
    const groups: { month: string; actions: TimelineAction[] }[] = []
    let currentKey: string | null = null
    timeline.forEach((action) => {
      const key = action.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      if (key !== currentKey) {
        groups.push({ month: key, actions: [] })
        currentKey = key
      }
      groups[groups.length - 1].actions.push(action)
    })
    return groups
  }, [timeline])

  function handleCopyLink() {
    if (typeof window === 'undefined') return
    const url = `${window.location.origin}${window.location.pathname}?frostDate=${frostDate}`
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Frost date input */}
      <section style={cardStyle}>
        <label style={{ display: 'block' }}>
          <span style={labelStyle}>Your last frost date</span>
          <input
            type="date"
            value={frostDate}
            onChange={(e) => setFrostDate(e.target.value)}
            style={{
              ...inputStyle,
              width: 'auto',
              maxWidth: '100%',
            }}
          />
        </label>
        <p style={hintStyle}>
          Don&rsquo;t know yours?{' '}
          <a href="/tools/frost-dates" style={{ color: 'var(--green)', textDecoration: 'underline' }}>
            Find it with the frost date planner.
          </a>
        </p>
      </section>

      {/* View controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginTop: '1.5rem',
        marginBottom: '1rem',
      }} className="ws-seed-controls">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'var(--ink-muted)',
            letterSpacing: '0.02em',
          }}>
            Schedule for last frost:{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{fmtDateLong(frost)}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <ViewToggle active={view === 'timeline'} onClick={() => setView('timeline')}>Timeline</ViewToggle>
            <ViewToggle active={view === 'crops'} onClick={() => setView('crops')}>By crop</ViewToggle>
          </div>
        </div>

        <label style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          color: 'var(--ink-muted)',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={showOptionalIndoor}
            onChange={(e) => setShowOptionalIndoor(e.target.checked)}
            style={{ accentColor: 'var(--green)' }}
          />
          <span>Include optional indoor starts (for crops where direct sow already wins)</span>
        </label>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--rule)',
        }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'var(--ink-muted)',
          }}>
            Showing{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{selected.size}</span>
            {' '}of {CROPS.length} crops
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <ChipButton onClick={selectAll}>Select all</ChipButton>
            <ChipButton onClick={selectNone}>Clear</ChipButton>
            <ChipButton onClick={selectMine}>What I grow</ChipButton>
          </div>
        </div>
      </div>

      {/* Schedule */}
      {view === 'timeline'
        ? <TimelineView groups={timelineByMonth} />
        : <CropsList frost={frost} showOptionalIndoor={showOptionalIndoor} expandedCrop={expandedCrop} setExpandedCrop={setExpandedCrop} selected={selected} toggleCrop={toggleCrop} />}

      {/* Actions */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.625rem',
        marginTop: '1.5rem',
      }}>
        <button
          type="button"
          onClick={() => typeof window !== 'undefined' && window.print()}
          style={primaryBtnStyle}
          className="ws-seed-print"
        >
          Print or save as PDF
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          style={secondaryBtnStyle}
          className="ws-seed-copy"
        >
          {copied ? 'Link copied' : 'Copy link to this schedule'}
        </button>
      </div>

      <style>{`
        .ws-seed-print:hover { background: var(--green) !important; border-color: var(--green) !important; color: var(--paper) !important; }
        .ws-seed-copy:hover { border-color: var(--green) !important; color: var(--ink) !important; }
        .ws-chip-btn:hover { border-color: var(--green) !important; color: var(--ink) !important; }
        @media print {
          .ws-seed-controls, .ws-seed-print, .ws-seed-copy { display: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ── SUB-COMPONENTS ──────────────────────────────────────────────────────── */

function ViewToggle({ active, onClick, children }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '0.45rem 0.85rem',
        background: active ? 'var(--ink)' : 'var(--paper)',
        color: active ? 'var(--paper)' : 'var(--ink-soft)',
        border: '1px solid ' + (active ? 'var(--ink)' : 'var(--rule)'),
        cursor: 'pointer',
        transition: 'all 0.15s',
        borderRadius: 999,
      }}
    >
      {children}
    </button>
  )
}

function ChipButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '0.35rem 0.7rem',
        background: 'var(--paper)',
        color: 'var(--ink-soft)',
        border: '1px solid var(--rule)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        borderRadius: 999,
      }}
      className="ws-chip-btn"
    >
      {children}
    </button>
  )
}

function TimelineView({ groups }: { groups: { month: string; actions: TimelineAction[] }[] }) {
  if (groups.length === 0) {
    return (
      <div style={{ ...cardStyle, color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
        No actions for this date.
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {groups.map((g) => (
        <div key={g.month}>
          <h3 style={monthHeadStyle}>{g.month}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {g.actions.map((a, i) => (
              <ActionRow key={`${g.month}-${i}`} action={a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ActionRow({ action }: { action: TimelineAction }) {
  const { date, crop, action: actionLabel, badge, actionType } = action
  const actionColor =
    actionType === 'direct'    ? 'var(--green)' :
    actionType === 'indoor'    ? 'var(--rust)' :
                                 'var(--sunflower)'
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '0.875rem 1rem',
      background: 'var(--card)',
      border: '1px solid var(--rule)',
    }}>
      <div style={{ minWidth: '3rem', flexShrink: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1, color: 'var(--ink)', fontFeatureSettings: '"tnum" 1' }}>
          {date.getDate()}
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>
          {date.toLocaleDateString('en-US', { month: 'short' })}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>
            {crop.name}
          </span>
          {crop.variety && (
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
              ({crop.variety})
            </span>
          )}
          {crop.joeGrows && <JoeGrowsPip />}
        </div>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: actionColor,
          marginTop: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}>
          <span>{actionLabel}</span>
          {badge && <Badge kind={badge} />}
        </div>
      </div>
    </div>
  )
}

function Badge({ kind }: { kind: 'preferred' | 'needed' | 'optional' }) {
  const label = kind === 'preferred' ? 'recommended' : kind === 'needed' ? 'required' : 'optional'
  const color =
    kind === 'preferred' ? { fg: 'var(--green)',     bg: 'rgba(44,85,48,0.1)',    bd: 'rgba(44,85,48,0.25)' } :
    kind === 'needed'    ? { fg: 'var(--rust)',        bg: 'rgba(181,71,14,0.1)',    bd: 'rgba(181,71,14,0.25)' } :
                           { fg: 'var(--ink-muted)', bg: 'transparent',           bd: 'var(--rule)' }
  return (
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '0.62rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: color.fg,
      background: color.bg,
      border: `1px solid ${color.bd}`,
      padding: '0.15rem 0.45rem',
      borderRadius: 999,
    }}>{label}</span>
  )
}

function JoeGrowsPip() {
  return (
    <span
      title="In my garden"
      aria-label="In my garden"
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--green)',
        flexShrink: 0,
      }}
    />
  )
}

function CropsList({ frost, showOptionalIndoor, expandedCrop, setExpandedCrop, selected, toggleCrop }: {
  frost: Date
  showOptionalIndoor: boolean
  expandedCrop: string | null
  setExpandedCrop: (s: string | null) => void
  selected: Set<string>
  toggleCrop: (name: string) => void
}) {
  const warm = CROPS.filter((c) => c.season === 'warm')
  const cool = CROPS.filter((c) => c.season === 'cool')
  const sharedProps = { frost, showOptionalIndoor, expandedCrop, setExpandedCrop, selected, toggleCrop }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      <CropSection title="Warm season" crops={warm} {...sharedProps} />
      <CropSection title="Cool season" crops={cool} {...sharedProps} />
      <style>{`
        .ws-crop-row {
          display: grid;
          grid-template-columns: 28px minmax(0, 2.2fr) minmax(0, 1.1fr) minmax(0, 1.3fr) minmax(0, 1.1fr) minmax(0, 0.85fr) 28px;
          gap: 0.75rem;
          padding: 0.65rem 0.5rem;
          align-items: center;
          border-bottom: 1px solid var(--rule);
          font-family: var(--font-sans);
          font-size: 0.85rem;
        }
        .ws-crop-row.ws-crop-head {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-muted);
          background: var(--paper-tint);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-top: 1px solid var(--rule);
        }
        .ws-crop-row .ws-mob-label { display: none; }
        @media (max-width: 760px) {
          .ws-crop-row { grid-template-columns: 28px 1fr 28px; gap: 0.4rem 0.75rem; padding: 0.85rem 0.5rem; }
          .ws-crop-row.ws-crop-head { display: none; }
          .ws-crop-row .ws-cell-name { grid-column: 2; }
          .ws-crop-row .ws-cell-direct,
          .ws-crop-row .ws-cell-indoor,
          .ws-crop-row .ws-cell-transplant,
          .ws-crop-row .ws-cell-days { grid-column: 2; }
          .ws-crop-row .ws-mob-label { display: inline; color: var(--ink-muted); font-size: 0.7rem; margin-right: 0.4rem; }
        }
      `}</style>
    </div>
  )
}

function CropSection({ title, crops, frost, showOptionalIndoor, expandedCrop, setExpandedCrop, selected, toggleCrop }: {
  title: string
  crops: Crop[]
  frost: Date
  showOptionalIndoor: boolean
  expandedCrop: string | null
  setExpandedCrop: (s: string | null) => void
  selected: Set<string>
  toggleCrop: (name: string) => void
}) {
  return (
    <div>
      <h3 style={monthHeadStyle}>{title}</h3>
      <div className="ws-crop-row ws-crop-head" role="row">
        <span />
        <span>Crop</span>
        <span>Direct sow</span>
        <span>Start indoors</span>
        <span>Transplant</span>
        <span>Days</span>
        <span />
      </div>
      <div>
        {crops.map((crop) => (
          <CropRow
            key={crop.name}
            crop={crop}
            frost={frost}
            showOptionalIndoor={showOptionalIndoor}
            expanded={expandedCrop === crop.name}
            onToggleExpand={() => setExpandedCrop(expandedCrop === crop.name ? null : crop.name)}
            checked={selected.has(crop.name)}
            onToggleCheck={() => toggleCrop(crop.name)}
          />
        ))}
      </div>
    </div>
  )
}

function CropRow({ crop, frost, showOptionalIndoor, expanded, onToggleExpand, checked, onToggleCheck }: {
  crop: Crop
  frost: Date
  showOptionalIndoor: boolean
  expanded: boolean
  onToggleExpand: () => void
  checked: boolean
  onToggleCheck: () => void
}) {
  const indoorRequired = crop.indoorStart.strategy === 'required'
  const indoorOptional = crop.indoorStart.strategy === 'optional'
  const showIndoor = indoorRequired || (indoorOptional && showOptionalIndoor)

  const directDate = crop.directSow.weeks !== null ? addWeeks(frost, crop.directSow.weeks) : null
  const indoorDate = showIndoor && crop.indoorStart.weeks !== null ? addWeeks(frost, crop.indoorStart.weeks) : null
  const transplantDate = showIndoor && crop.transplant.weeks !== null ? addWeeks(frost, crop.transplant.weeks) : null

  return (
    <>
      <div
        className="ws-crop-row"
        role="row"
        style={{
          opacity: checked ? 1 : 0.55,
          background: checked ? 'transparent' : 'var(--paper-tint)',
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggleCheck}
          style={{ accentColor: 'var(--green)', cursor: 'pointer', width: 16, height: 16 }}
          aria-label={`Select ${crop.name}`}
        />
        <div className="ws-cell-name" style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>
              {crop.name}
            </span>
            {crop.joeGrows && <JoeGrowsPip />}
          </div>
          {crop.variety && (
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--ink-muted)' }}>
              {crop.variety}
            </div>
          )}
        </div>
        <DateCell
          className="ws-cell-direct"
          mobLabel="Direct sow"
          date={directDate}
          color="var(--green)"
          badge={crop.directSow.strategy === 'preferred' ? 'preferred' : null}
        />
        <DateCell
          className="ws-cell-indoor"
          mobLabel="Start indoors"
          date={indoorDate}
          color="var(--rust)"
          badge={indoorDate ? (indoorRequired ? 'needed' : 'optional') : null}
          fallback={crop.directSow.strategy === 'not_recommended' && !showIndoor && indoorOptional ? 'toggle optional' : '—'}
        />
        <DateCell
          className="ws-cell-transplant"
          mobLabel="Transplant"
          date={transplantDate}
          color="var(--sunflower)"
          badge={null}
        />
        <div className="ws-cell-days" style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.78rem',
          color: 'var(--ink-soft)',
        }}>
          <span className="ws-mob-label">Days</span>
          {crop.days}
        </div>
        <button
          type="button"
          onClick={onToggleExpand}
          aria-label={expanded ? 'Hide notes' : 'Show notes'}
          aria-expanded={expanded}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--ink-muted)',
            fontSize: '0.9rem',
            justifySelf: 'end',
          }}
        >
          {expanded ? '▾' : '▸'}
        </button>
      </div>
      {expanded && (
        <div style={{
          padding: '0.625rem 0.5rem 1rem 2.6rem',
          borderBottom: '1px solid var(--rule)',
          fontFamily: 'var(--font-serif)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
        }}>
          {crop.notes}
        </div>
      )}
    </>
  )
}

function DateCell({ className, mobLabel, date, color, badge, fallback }: {
  className: string
  mobLabel: string
  date: Date | null
  color: string
  badge: 'preferred' | 'needed' | 'optional' | null
  fallback?: string
}) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
      <span className="ws-mob-label">{mobLabel}</span>
      {date ? (
        <>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', color }}>
            {fmtDate(date)}
          </span>
          {badge && <Badge kind={badge} />}
        </>
      ) : (
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          color: 'var(--ink-muted)',
          fontStyle: fallback && fallback !== '—' ? 'italic' : 'normal',
        }}>
          {fallback ?? '—'}
        </span>
      )}
    </div>
  )
}

/* Special cases is exported so the page can render it as a styled section too. */
export function SpecialCasesGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem',
    }} className="ws-special-grid">
      {SPECIAL_CASES.map((sc) => (
        <div key={sc.name} style={{
          background: 'var(--card)',
          border: '1px solid var(--rule)',
          padding: '1rem 1.1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: '1.05rem',
              color: 'var(--ink)',
            }}>{sc.name}</h4>
            {sc.joeGrows && <JoeGrowsPip />}
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            margin: '0.35rem 0 0.5rem',
          }}>
            {sc.category} · {sc.when}
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
          }}>{sc.notes}</p>
        </div>
      ))}
      <style>{`@media (max-width: 640px) { .ws-special-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

/* ── STYLES ──────────────────────────────────────────────────────────────── */

const cardStyle: React.CSSProperties = {
  border: '1px solid var(--rule)',
  borderRadius: 'var(--radius-md, 12px)',
  padding: '1.5rem',
  background: 'var(--card)',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8rem',
  fontWeight: 500,
  letterSpacing: '0.05em',
  color: 'var(--ink)',
  marginBottom: '0.5rem',
}

const inputStyle: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  border: '1px solid var(--rule)',
  borderRadius: 6,
  background: 'var(--paper)',
  color: 'var(--ink)',
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  boxSizing: 'border-box',
}

const hintStyle: React.CSSProperties = {
  margin: '0.625rem 0 0',
  fontSize: '0.78rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-serif)',
}

const monthHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--ink-soft)',
  marginBottom: '0.75rem',
  paddingBottom: '0.4rem',
  borderBottom: '1px solid var(--rule)',
}

const primaryBtnStyle: React.CSSProperties = {
  padding: '0.6rem 1.1rem',
  background: 'var(--ink)',
  color: 'var(--paper)',
  border: '1px solid var(--ink)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  borderRadius: 2,
  transition: 'all 0.15s',
}

const secondaryBtnStyle: React.CSSProperties = {
  padding: '0.6rem 1.1rem',
  background: 'transparent',
  color: 'var(--ink-soft)',
  border: '1px solid var(--rule)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  borderRadius: 2,
  transition: 'all 0.15s',
}
