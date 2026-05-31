# Tool Roadmap

The catalog (`content/tools.ts`) holds two kinds of tools:

- **Live** — built, has a page under `app/tools/<slug>/`, links from the cards.
- **Planned (kept on the site)** — not built yet, but has a photo, so it shows as a grayed-out "on the way" card below the live tools on its bucket page. These earn their spot because the photo makes the card real.

Everything below is **back burner**: removed from `content/tools.ts` so it no longer renders anywhere, parked here until it earns a build (and, for most, a photo). Re-add a block to the catalog when you're ready to surface it again — the fields below are ready to paste back.

## Currently kept on the site as "on the way" (planned + photo)

Not back-burnered — listed here for reference. These render dimmed below the live tools:

- **Sun Calculator** (plan) — sunflower.jpg
- **Seed Spacing & Yield** (plan) — yield.jpg
- **Moon Phase Planting** (plan) — moon.png
- **Companion Planting Matrix** (plan) — companion-planting.jpg
- **Pest ID & Response** (grow) — sick-cucumber.jpg
- **Trellis Selector** (build) — trellis.jpg
- **Drip Irrigation Planner** (build) — drip_irrigation.jpg — *next to finish*

## Back burner (removed from the catalog)

Reason they're parked: no photo attached yet (except Greenhouse Heating Load, parked by choice). Give one a photo + a build and move it back into `content/tools.ts`.

| Tool | Bucket | Was status | Blurb | Note |
|------|--------|-----------|-------|------|
| Soil Recipes | grow | soon | Seed-starting mix, potting mix, raised-bed fill. Ratios scaled to volume. | needs photo |
| Solar Panel Sizer | build | soon | Greenhouse, shed, chicken coop. Panels for what you actually run. | needs photo |
| Crop Rotation Planner | plan | horizon | Three- or four-year rotation by plant family. | needs photo |
| Cover Crop Selector | grow | horizon | By goal: nitrogen-fixing, weed suppression, compaction. | needs photo |
| Greenhouse Heating Load | build | horizon | Square footage, target temp, climate input. BTUs out. | parked by choice; photo `greenhouse_stage1.jpg` exists |
| Chicken Coop Sizer | build | horizon | Birds per square foot, indoor versus run. | needs photo |
| Winter Sowing Calendar | plan | horizon | Milk jug method, by zone. | needs photo |
| Path & Paver Estimator | build | horizon | For brick circles, walkways, and edging. | needs photo |

### Catalog blocks (paste-ready)

```ts
{
  slug: 'soil-recipes', href: '/tools/soil-recipes', label: 'Soil Recipes',
  blurb: 'Seed-starting mix, potting mix, raised-bed fill. Ratios scaled to volume.',
  category: 'soil', bucket: 'grow', status: 'soon', num: 'Coming Soon', gradient: 'soil',
  intents: ['mix my own soil', 'potting mix', 'seed starting mix'],
},
{
  slug: 'solar-sizer', href: '/tools/solar-sizer', label: 'Solar Panel Sizer',
  blurb: 'Greenhouse, shed, chicken coop. Panels for what you actually run.',
  category: 'structure', bucket: 'build', status: 'soon', num: 'Coming Soon', gradient: 'planning',
  intents: ['go off grid', 'solar power', 'size solar panels', 'power my shed'],
},
{
  slug: 'crop-rotation', href: '/tools/crop-rotation', label: 'Crop Rotation Planner',
  blurb: 'Three- or four-year rotation by plant family.',
  category: 'planning', bucket: 'plan', status: 'horizon', num: 'Planned', gradient: 'planning',
  intents: ['rotate my crops', 'crop rotation', 'plant families'],
},
{
  slug: 'cover-crop', href: '/tools/cover-crop', label: 'Cover Crop Selector',
  blurb: 'By goal: nitrogen-fixing, weed suppression, compaction.',
  category: 'planting', bucket: 'grow', status: 'horizon', num: 'Planned', gradient: 'planning',
  intents: ['cover crop', 'fix nitrogen', 'rest a bed', 'green manure'],
},
{
  slug: 'greenhouse-heat', href: '/tools/greenhouse-heat', label: 'Greenhouse Heating Load',
  blurb: 'Square footage, target temp, climate input. BTUs out.',
  category: 'structure', bucket: 'build', status: 'horizon', num: 'Planned',
  photo: '/photos/greenhouse_stage1.jpg', gradient: 'planning',
  intents: ['heat a greenhouse', 'greenhouse', 'extend the season'],
},
{
  slug: 'coop-sizer', href: '/tools/coop-sizer', label: 'Chicken Coop Sizer',
  blurb: 'Birds per square foot, indoor versus run.',
  category: 'structure', bucket: 'build', status: 'horizon', num: 'Planned', gradient: 'planning',
  intents: ['raise chickens', 'build a coop', 'how big a coop'],
},
{
  slug: 'winter-sowing', href: '/tools/winter-sowing', label: 'Winter Sowing Calendar',
  blurb: 'Milk jug method, by zone.',
  category: 'planting', bucket: 'plan', status: 'horizon', num: 'Planned', gradient: 'timing',
  intents: ['winter sowing', 'milk jug method', 'sow in winter'],
},
{
  slug: 'paver', href: '/tools/paver', label: 'Path & Paver Estimator',
  blurb: 'For brick circles, walkways, and edging.',
  category: 'structure', bucket: 'build', status: 'horizon', num: 'Planned', gradient: 'planning',
  intents: ['lay a path', 'build a walkway', 'pavers', 'patio'],
},
```
