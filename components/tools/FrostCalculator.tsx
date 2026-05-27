'use client'

import { useState, useMemo } from 'react'

/* ── COVER TYPES ─────────────────────────────────────────────────────────── */

type Cover = {
  id: string
  label: string
  degrees: number
  light: number
  note: string
}

const COVER_TYPES: Cover[] = [
  { id: 'none',     label: 'No protection',                       degrees: 0, light: 100, note: 'The plant is on its own.' },
  { id: 'bedsheet', label: 'Old bedsheet or tarp',                degrees: 2, light: 0,   note: 'Remove at sunrise. Not breathable. Traps no light.' },
  { id: 'light',    label: 'Lightweight row cover (0.5 oz)',      degrees: 2, light: 85,  note: 'Better for insects than frost. Thin fabric, thin margin.' },
  { id: 'medium',   label: 'Medium row cover (1.0 oz)',           degrees: 4, light: 70,  note: 'The standard choice. Good for light frosts, useless against a hard freeze.' },
  { id: 'heavy',    label: 'Heavy frost blanket (1.5 oz)',        degrees: 6, light: 50,  note: 'Real protection, but blocks half the sun. Short-term rescue, not a lifestyle.' },
  { id: 'double',   label: 'Double layer or heavy + plastic',     degrees: 8, light: 30,  note: 'The nuclear option. Will overheat in sun. Remove early or cook the patient.' },
]

/* ── PLANT COLD TOLERANCE ────────────────────────────────────────────────── */

type PlantCategory = 'tender' | 'semi-hardy' | 'hardy'
type Plant = {
  name: string
  killTemp: number
  category: PlantCategory
  note: string
}

const PLANTS: Plant[] = [
  // Tender
  { name: 'Basil',                killTemp: 35, category: 'tender',      note: 'Leaves blacken in the low 40s. The most frost-sensitive plant in most gardens. Does not recover.' },
  { name: 'Tomato',               killTemp: 32, category: 'tender',      note: 'Vine and fruit damage at 32°F. Green fruit can handle a brief dip; ripe fruit turns to mush.' },
  { name: 'Pepper',               killTemp: 32, category: 'tender',      note: 'Foliage dies at 32°F. Fruit can survive a light frost if still on the plant, but quality drops fast.' },
  { name: 'Eggplant',             killTemp: 32, category: 'tender',      note: 'Very frost-sensitive. Even cold rain in the 40s can stunt growth.' },
  { name: 'Cucumber',             killTemp: 32, category: 'tender',      note: 'Dead at first frost. Vines collapse overnight.' },
  { name: 'Squash (summer)',      killTemp: 32, category: 'tender',      note: 'Zucchini, yellow squash. Killed by any frost. Large leaves wilt first.' },
  { name: 'Melon',                killTemp: 32, category: 'tender',      note: 'Watermelon, cantaloupe. Zero frost tolerance. Fruit quality degrades in cold nights.' },
  { name: 'Okra',                 killTemp: 32, category: 'tender',      note: 'Tropical origin. Stops growing below 60°F, killed at 32°F.' },
  { name: 'Sweet potato',         killTemp: 32, category: 'tender',      note: 'Vine dies at frost. Tubers survive briefly underground if harvested soon after.' },
  { name: 'Corn',                 killTemp: 32, category: 'tender',      note: 'Seedlings killed at 28°F. Mature ears survive a light frost but quality drops.' },
  { name: 'Bean (snap/pole)',     killTemp: 31, category: 'tender',      note: 'Killed by light frost. Pods on the plant may survive a degree or two below 32°F briefly.' },
  { name: 'Cowpea / Southern pea',killTemp: 32, category: 'tender',      note: 'Tropical legume. No frost tolerance. Harvest before the first freeze.' },
  // Semi-hardy
  { name: 'Lettuce',              killTemp: 25, category: 'semi-hardy',  note: 'Outer leaves burn at 28°F but hearts often survive to 22°F. Variety matters enormously.' },
  { name: 'Chard',                killTemp: 22, category: 'semi-hardy',  note: 'Handles light frost well. Killed around 22°F. Stalks freeze before leaves.' },
  { name: 'Pea',                  killTemp: 28, category: 'semi-hardy',  note: 'Cool-season crop that tolerates light frost but not a hard freeze. Flowers are more sensitive than foliage.' },
  { name: 'Beet',                 killTemp: 20, category: 'semi-hardy',  note: 'Tops damaged at 28°F, roots survive much colder in the ground. Mulch extends the harvest.' },
  { name: 'Carrot',               killTemp: 18, category: 'semi-hardy',  note: 'Tops die at 28°F. Roots sweeten in cold soil and can overwinter under heavy mulch.' },
  { name: 'Cauliflower',          killTemp: 25, category: 'semi-hardy',  note: 'Curds damaged around 25°F. More cold-sensitive than other brassicas.' },
  { name: 'Celery',               killTemp: 28, category: 'semi-hardy',  note: 'Handles light frost. Hard freeze kills it. Blanching stalks makes them more tender but also more vulnerable.' },
  { name: 'Radish',               killTemp: 25, category: 'semi-hardy',  note: 'Fast crop, moderate frost tolerance. Roots crack in hard freezes.' },
  { name: 'Turnip',               killTemp: 20, category: 'semi-hardy',  note: 'Greens tolerate light frost. Roots survive to 20°F in the ground.' },
  { name: 'Artichoke',            killTemp: 28, category: 'semi-hardy',  note: 'Crowns survive to about 20°F with mulch in zone 8a. Tops die back at 28°F.' },
  // Hardy
  { name: 'Kale',                 killTemp: 10, category: 'hardy',       note: 'One of the hardiest. Flavor improves after frost. Some varieties survive single digits.' },
  { name: 'Collard greens',       killTemp: 15, category: 'hardy',       note: 'Southern staple. Survives hard freezes. Georgia collards can overwinter in zone 7+.' },
  { name: 'Spinach',              killTemp: 10, category: 'hardy',       note: 'Extremely cold-hardy once established. Overwinters under row cover in many zones.' },
  { name: 'Brussels sprouts',     killTemp: 10, category: 'hardy',       note: 'Flavor dramatically improves after frost. Stalks survive into the teens.' },
  { name: 'Cabbage',              killTemp: 20, category: 'hardy',       note: 'Outer leaves sacrifice themselves. Inner head survives much colder than outer leaves suggest.' },
  { name: 'Broccoli',             killTemp: 20, category: 'hardy',       note: 'Heads tolerate down to 20°F, maybe 15°F. Side shoots keep producing after main head is cut.' },
  { name: 'Parsley',              killTemp: 15, category: 'hardy',       note: 'Biennial. Much hardier than people expect. Flat-leaf and curly both overwinter in mild climates.' },
  { name: 'Garlic',               killTemp: -10, category: 'hardy',      note: 'Planted in fall, overwinters underground. Essentially unkillable in most garden zones.' },
  { name: 'Onion',                killTemp: 20, category: 'hardy',       note: 'Green tops damaged at 28°F. Bulbs survive in the ground to 20°F or below with mulch.' },
  { name: 'Leek',                 killTemp: 10, category: 'hardy',       note: 'Very hardy. Can be harvested through winter in many zones. Flavor holds.' },
]

/* ── FROST DATES BY ZIP PREFIX ───────────────────────────────────────────── */
/* NOAA 30-year normals (1991-2020) aggregated by 3-digit zip prefix. */

type FrostEntry = { lastSpring: [number, number]; firstFall: [number, number]; zone: string; region: string }

const FROST_DATES: Record<string, FrostEntry> = {
  '010': { lastSpring: [5,5],  firstFall: [9,28],  zone: '5b',  region: 'Springfield, MA' },
  '021': { lastSpring: [4,8],  firstFall: [10,25], zone: '7a',  region: 'Boston, MA' },
  '028': { lastSpring: [4,15], firstFall: [10,18], zone: '6b',  region: 'Providence, RI' },
  '030': { lastSpring: [5,15], firstFall: [9,18],  zone: '5a',  region: 'Manchester, NH' },
  '040': { lastSpring: [5,10], firstFall: [9,25],  zone: '5b',  region: 'Portland, ME' },
  '044': { lastSpring: [5,15], firstFall: [9,18],  zone: '5a',  region: 'Bangor, ME' },
  '054': { lastSpring: [5,15], firstFall: [9,18],  zone: '4b',  region: 'Burlington, VT' },
  '060': { lastSpring: [4,25], firstFall: [10,10], zone: '6b',  region: 'Hartford, CT' },
  '062': { lastSpring: [4,20], firstFall: [10,12], zone: '7a',  region: 'New Haven, CT' },
  '070': { lastSpring: [4,15], firstFall: [10,18], zone: '6b',  region: 'Newark, NJ' },
  '080': { lastSpring: [4,12], firstFall: [10,20], zone: '7a',  region: 'Cherry Hill, NJ' },
  '100': { lastSpring: [4,5],  firstFall: [11,1],  zone: '7b',  region: 'New York City, NY' },
  '120': { lastSpring: [5,1],  firstFall: [10,2],  zone: '5b',  region: 'Albany, NY' },
  '130': { lastSpring: [5,5],  firstFall: [9,28],  zone: '5a',  region: 'Syracuse, NY' },
  '140': { lastSpring: [5,5],  firstFall: [9,28],  zone: '6a',  region: 'Buffalo, NY' },
  '144': { lastSpring: [5,5],  firstFall: [9,28],  zone: '6a',  region: 'Rochester, NY' },
  '150': { lastSpring: [4,28], firstFall: [10,8],  zone: '6a',  region: 'Pittsburgh, PA' },
  '170': { lastSpring: [4,25], firstFall: [10,10], zone: '6b',  region: 'Harrisburg, PA' },
  '190': { lastSpring: [4,10], firstFall: [10,22], zone: '7a',  region: 'Philadelphia, PA' },
  '197': { lastSpring: [4,15], firstFall: [10,20], zone: '7a',  region: 'Wilmington, DE' },
  '200': { lastSpring: [4,5],  firstFall: [10,28], zone: '7b',  region: 'Washington, DC' },
  '210': { lastSpring: [4,10], firstFall: [10,22], zone: '7a',  region: 'Baltimore, MD' },
  '220': { lastSpring: [4,10], firstFall: [10,22], zone: '7a',  region: 'Fairfax, VA' },
  '230': { lastSpring: [4,5],  firstFall: [10,28], zone: '7b',  region: 'Richmond, VA' },
  '233': { lastSpring: [3,28], firstFall: [11,5],  zone: '8a',  region: 'Norfolk, VA' },
  '240': { lastSpring: [4,15], firstFall: [10,18], zone: '7a',  region: 'Roanoke, VA' },
  '250': { lastSpring: [4,20], firstFall: [10,12], zone: '6b',  region: 'Charleston, WV' },
  '262': { lastSpring: [4,25], firstFall: [10,8],  zone: '5b',  region: 'Morgantown, WV' },
  '275': { lastSpring: [3,28], firstFall: [11,5],  zone: '7b',  region: 'Raleigh, NC' },
  '280': { lastSpring: [3,25], firstFall: [11,8],  zone: '7b',  region: 'Charlotte, NC' },
  '284': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'Wilmington, NC' },
  '287': { lastSpring: [4,20], firstFall: [10,12], zone: '6b',  region: 'Asheville, NC' },
  '290': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'Columbia, SC' },
  '294': { lastSpring: [3,5],  firstFall: [11,20], zone: '8b',  region: 'Charleston, SC' },
  '296': { lastSpring: [4,1],  firstFall: [11,1],  zone: '7b',  region: 'Greenville, SC' },
  '300': { lastSpring: [3,25], firstFall: [11,8],  zone: '7b',  region: 'Atlanta, GA' },
  '310': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'Macon, GA' },
  '313': { lastSpring: [3,5],  firstFall: [11,20], zone: '8b',  region: 'Savannah, GA' },
  '320': { lastSpring: [2,15], firstFall: [12,5],  zone: '9a',  region: 'Jacksonville, FL' },
  '323': { lastSpring: [2,5],  firstFall: [12,15], zone: '9a',  region: 'Tallahassee, FL' },
  '327': { lastSpring: [1,28], firstFall: [12,20], zone: '9b',  region: 'Orlando, FL' },
  '330': { lastSpring: [1,10], firstFall: [12,30], zone: '10b', region: 'Miami, FL' },
  '335': { lastSpring: [1,20], firstFall: [12,22], zone: '10a', region: 'Tampa, FL' },
  '350': { lastSpring: [3,20], firstFall: [11,10], zone: '8a',  region: 'Birmingham, AL' },
  '355': { lastSpring: [4,10], firstFall: [10,25], zone: '7a',  region: 'Huntsville, AL' },
  '360': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'Montgomery, AL' },
  '365': { lastSpring: [2,25], firstFall: [11,25], zone: '9a',  region: 'Mobile, AL' },
  '370': { lastSpring: [3,28], firstFall: [11,2],  zone: '7b',  region: 'Nashville, TN' },
  '377': { lastSpring: [4,8],  firstFall: [10,25], zone: '7a',  region: 'Knoxville, TN' },
  '380': { lastSpring: [3,20], firstFall: [11,10], zone: '7b',  region: 'Memphis, TN' },
  '390': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'Jackson, MS' },
  '395': { lastSpring: [3,5],  firstFall: [11,22], zone: '8b',  region: 'Gulfport, MS' },
  '400': { lastSpring: [4,15], firstFall: [10,18], zone: '6b',  region: 'Louisville, KY' },
  '403': { lastSpring: [4,18], firstFall: [10,15], zone: '6a',  region: 'Lexington, KY' },
  '430': { lastSpring: [4,28], firstFall: [10,8],  zone: '5b',  region: 'Columbus, OH' },
  '440': { lastSpring: [4,28], firstFall: [10,8],  zone: '6a',  region: 'Cleveland, OH' },
  '450': { lastSpring: [4,20], firstFall: [10,15], zone: '6a',  region: 'Cincinnati, OH' },
  '460': { lastSpring: [4,20], firstFall: [10,15], zone: '5b',  region: 'Indianapolis, IN' },
  '467': { lastSpring: [4,25], firstFall: [10,8],  zone: '5b',  region: 'Fort Wayne, IN' },
  '476': { lastSpring: [4,15], firstFall: [10,18], zone: '6a',  region: 'Evansville, IN' },
  '480': { lastSpring: [5,5],  firstFall: [10,2],  zone: '6a',  region: 'Detroit, MI' },
  '493': { lastSpring: [5,8],  firstFall: [9,28],  zone: '5b',  region: 'Grand Rapids, MI' },
  '496': { lastSpring: [5,15], firstFall: [9,18],  zone: '5a',  region: 'Traverse City, MI' },
  '500': { lastSpring: [4,25], firstFall: [10,5],  zone: '5b',  region: 'Des Moines, IA' },
  '522': { lastSpring: [4,25], firstFall: [10,5],  zone: '5b',  region: 'Cedar Rapids, IA' },
  '530': { lastSpring: [5,5],  firstFall: [9,28],  zone: '5a',  region: 'Milwaukee, WI' },
  '535': { lastSpring: [5,1],  firstFall: [10,2],  zone: '5b',  region: 'Madison, WI' },
  '541': { lastSpring: [5,10], firstFall: [9,22],  zone: '4b',  region: 'Green Bay, WI' },
  '550': { lastSpring: [5,5],  firstFall: [9,28],  zone: '4b',  region: 'Minneapolis, MN' },
  '556': { lastSpring: [5,10], firstFall: [9,22],  zone: '4a',  region: 'Duluth, MN' },
  '559': { lastSpring: [5,8],  firstFall: [9,25],  zone: '4a',  region: 'Rochester, MN' },
  '570': { lastSpring: [5,8],  firstFall: [9,25],  zone: '5a',  region: 'Sioux Falls, SD' },
  '577': { lastSpring: [5,10], firstFall: [9,22],  zone: '5a',  region: 'Rapid City, SD' },
  '580': { lastSpring: [5,15], firstFall: [9,18],  zone: '4a',  region: 'Fargo, ND' },
  '585': { lastSpring: [5,15], firstFall: [9,18],  zone: '4a',  region: 'Bismarck, ND' },
  '590': { lastSpring: [5,18], firstFall: [9,15],  zone: '4b',  region: 'Billings, MT' },
  '598': { lastSpring: [5,15], firstFall: [9,18],  zone: '5a',  region: 'Missoula, MT' },
  '606': { lastSpring: [4,18], firstFall: [10,18], zone: '6a',  region: 'Chicago, IL' },
  '615': { lastSpring: [4,18], firstFall: [10,15], zone: '5b',  region: 'Peoria, IL' },
  '622': { lastSpring: [4,12], firstFall: [10,20], zone: '6a',  region: 'Springfield, IL' },
  '629': { lastSpring: [4,2],  firstFall: [10,28], zone: '7a',  region: 'Carbondale, IL' },
  '630': { lastSpring: [4,8],  firstFall: [10,22], zone: '6b',  region: 'St Louis, MO' },
  '637': { lastSpring: [4,8],  firstFall: [10,22], zone: '6b',  region: 'Springfield, MO' },
  '640': { lastSpring: [4,12], firstFall: [10,18], zone: '6a',  region: 'Kansas City, MO' },
  '660': { lastSpring: [4,12], firstFall: [10,18], zone: '6a',  region: 'Kansas City, KS' },
  '670': { lastSpring: [4,15], firstFall: [10,15], zone: '6b',  region: 'Wichita, KS' },
  '680': { lastSpring: [4,20], firstFall: [10,10], zone: '5b',  region: 'Omaha, NE' },
  '683': { lastSpring: [4,22], firstFall: [10,8],  zone: '5b',  region: 'Lincoln, NE' },
  '700': { lastSpring: [2,15], firstFall: [11,30], zone: '9a',  region: 'New Orleans, LA' },
  '707': { lastSpring: [3,1],  firstFall: [11,15], zone: '8b',  region: 'Baton Rouge, LA' },
  '710': { lastSpring: [3,10], firstFall: [11,10], zone: '8b',  region: 'Shreveport, LA' },
  '720': { lastSpring: [3,30], firstFall: [10,30], zone: '7b',  region: 'Little Rock, AR' },
  '722': { lastSpring: [4,5],  firstFall: [10,25], zone: '7a',  region: 'Fayetteville, AR' },
  '730': { lastSpring: [3,28], firstFall: [11,2],  zone: '7b',  region: 'Oklahoma City, OK' },
  '740': { lastSpring: [3,28], firstFall: [11,2],  zone: '7a',  region: 'Tulsa, OK' },
  '750': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'Dallas, TX' },
  '770': { lastSpring: [2,15], firstFall: [12,5],  zone: '9a',  region: 'Houston, TX' },
  '780': { lastSpring: [2,20], firstFall: [11,28], zone: '8b',  region: 'San Antonio, TX' },
  '783': { lastSpring: [2,5],  firstFall: [12,10], zone: '9b',  region: 'Corpus Christi, TX' },
  '785': { lastSpring: [2,1],  firstFall: [12,15], zone: '9b',  region: 'McAllen, TX' },
  '786': { lastSpring: [3,1],  firstFall: [11,25], zone: '8b',  region: 'Austin, TX' },
  '790': { lastSpring: [4,5],  firstFall: [10,28], zone: '7b',  region: 'Amarillo, TX' },
  '798': { lastSpring: [3,15], firstFall: [11,15], zone: '8a',  region: 'El Paso, TX' },
  '800': { lastSpring: [5,5],  firstFall: [10,5],  zone: '5b',  region: 'Denver, CO' },
  '806': { lastSpring: [5,10], firstFall: [9,25],  zone: '5a',  region: 'Colorado Springs, CO' },
  '809': { lastSpring: [5,25], firstFall: [9,10],  zone: '4a',  region: 'Alamosa, CO' },
  '813': { lastSpring: [5,20], firstFall: [9,15],  zone: '4b',  region: 'Durango, CO' },
  '820': { lastSpring: [5,25], firstFall: [9,8],   zone: '4a',  region: 'Cheyenne, WY' },
  '826': { lastSpring: [5,20], firstFall: [9,12],  zone: '4b',  region: 'Casper, WY' },
  '836': { lastSpring: [5,10], firstFall: [9,22],  zone: '5b',  region: 'Boise, ID' },
  '840': { lastSpring: [4,28], firstFall: [10,8],  zone: '7a',  region: 'Salt Lake City, UT' },
  '845': { lastSpring: [5,5],  firstFall: [9,28],  zone: '6a',  region: 'Provo, UT' },
  '850': { lastSpring: [2,5],  firstFall: [12,5],  zone: '9b',  region: 'Phoenix, AZ' },
  '855': { lastSpring: [4,15], firstFall: [10,15], zone: '7a',  region: 'Flagstaff, AZ' },
  '856': { lastSpring: [3,15], firstFall: [11,1],  zone: '8b',  region: 'Tucson, AZ' },
  '870': { lastSpring: [4,15], firstFall: [10,18], zone: '7a',  region: 'Albuquerque, NM' },
  '875': { lastSpring: [4,25], firstFall: [10,5],  zone: '5b',  region: 'Santa Fe, NM' },
  '880': { lastSpring: [3,28], firstFall: [11,1],  zone: '8a',  region: 'Las Cruces, NM' },
  '889': { lastSpring: [3,10], firstFall: [11,10], zone: '9a',  region: 'Las Vegas, NV' },
  '894': { lastSpring: [5,10], firstFall: [9,25],  zone: '6b',  region: 'Reno, NV' },
  '900': { lastSpring: [1,15], firstFall: [12,15], zone: '10a', region: 'Los Angeles, CA' },
  '920': { lastSpring: [1,20], firstFall: [12,15], zone: '10a', region: 'San Diego, CA' },
  '936': { lastSpring: [3,10], firstFall: [11,10], zone: '9a',  region: 'Fresno, CA' },
  '940': { lastSpring: [2,1],  firstFall: [12,10], zone: '10a', region: 'San Francisco, CA' },
  '942': { lastSpring: [2,1],  firstFall: [12,10], zone: '10a', region: 'Sacramento, CA' },
  '950': { lastSpring: [2,20], firstFall: [11,25], zone: '9b',  region: 'San Jose, CA' },
  '960': { lastSpring: [4,20], firstFall: [10,10], zone: '7a',  region: 'Redding, CA' },
  '967': { lastSpring: [1,1],  firstFall: [12,31], zone: '11b', region: 'Honolulu, HI' },
  '970': { lastSpring: [4,15], firstFall: [10,15], zone: '8b',  region: 'Portland, OR' },
  '975': { lastSpring: [4,10], firstFall: [10,22], zone: '8b',  region: 'Medford, OR' },
  '979': { lastSpring: [5,10], firstFall: [9,22],  zone: '6b',  region: 'Bend, OR' },
  '980': { lastSpring: [3,15], firstFall: [11,15], zone: '8b',  region: 'Seattle, WA' },
  '989': { lastSpring: [5,5],  firstFall: [9,28],  zone: '6a',  region: 'Yakima, WA' },
  '990': { lastSpring: [5,5],  firstFall: [9,28],  zone: '6b',  region: 'Spokane, WA' },
  '995': { lastSpring: [5,15], firstFall: [9,10],  zone: '4b',  region: 'Anchorage, AK' },
  '997': { lastSpring: [5,20], firstFall: [8,28],  zone: '2b',  region: 'Fairbanks, AK' },
}

/* ── HELPERS ─────────────────────────────────────────────────────────────── */

function lookupFrostByZip(zip: string): FrostEntry | null {
  const clean = zip.replace(/\D/g, '').slice(0, 5)
  if (clean.length < 3) return null
  return FROST_DATES[clean.slice(0, 3)] || null
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function fmtFrostDate(md: [number, number]): string {
  return `${MONTHS[md[0] - 1]} ${md[1]}`
}
function daysInSeason(spring: [number, number], fall: [number, number]): number {
  const a = new Date(2026, spring[0] - 1, spring[1])
  const b = new Date(2026, fall[0] - 1, fall[1])
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

type Status = 'unknown' | 'safe' | 'risk' | 'danger'

/* ── COMPONENT ──────────────────────────────────────────────────────────── */

export default function FrostCalculator() {
  const [zipCode, setZipCode] = useState('')
  const [frostResult, setFrostResult] = useState<FrostEntry | null>(null)
  const [zipLookedUp, setZipLookedUp] = useState(false)
  const [forecastLow, setForecastLow] = useState('')
  const [coverType, setCoverType] = useState('none')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'killTemp' | 'name' | 'category'>('killTemp')
  const [expandedPlant, setExpandedPlant] = useState<string | null>(null)

  const forecastNum = parseFloat(forecastLow)
  const hasForecast = !isNaN(forecastNum)
  const cover = COVER_TYPES.find((c) => c.id === coverType)!
  const effectiveTemp = hasForecast ? forecastNum + cover.degrees : null

  function handleZipLookup() {
    setFrostResult(lookupFrostByZip(zipCode))
    setZipLookedUp(true)
  }

  function plantStatus(p: Plant): Status {
    if (!hasForecast || effectiveTemp === null) return 'unknown'
    if (effectiveTemp > p.killTemp + 5) return 'safe'
    if (effectiveTemp > p.killTemp) return 'risk'
    return 'danger'
  }

  const filteredPlants = useMemo(() => {
    let list = [...PLANTS]
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.note.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'killTemp') list.sort((a, b) => b.killTemp - a.killTemp)
    else if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    else {
      const order: Record<PlantCategory, number> = { tender: 0, 'semi-hardy': 1, hardy: 2 }
      list.sort((a, b) => order[a.category] - order[b.category])
    }
    return list
  }, [searchTerm, sortBy])

  const summary = useMemo(() => {
    if (!hasForecast) return null
    const safe = PLANTS.filter((p) => plantStatus(p) === 'safe').length
    const risk = PLANTS.filter((p) => plantStatus(p) === 'risk').length
    const danger = PLANTS.filter((p) => plantStatus(p) === 'danger').length
    return { safe, risk, danger }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecastNum, coverType])

  return (
    <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ZIP lookup */}
      <section style={cardStyle}>
        <h2 style={cardHeadStyle}>Find your frost dates</h2>
        <p style={cardSubStyle}>Enter a US ZIP code. The lookup uses NOAA 30-year averages by 3-digit prefix.</p>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap', marginTop: '1rem' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={labelStyle}>ZIP code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={zipCode}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 5)
                setZipCode(v)
                if (v.length < 3) { setFrostResult(null); setZipLookedUp(false) }
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleZipLookup()}
              placeholder="e.g. 35071"
              style={{ ...inputStyle, fontSize: '1.05rem' }}
            />
          </div>
          <button
            type="button"
            onClick={handleZipLookup}
            disabled={zipCode.length < 3}
            style={{ ...primaryBtnStyle, opacity: zipCode.length < 3 ? 0.4 : 1, cursor: zipCode.length < 3 ? 'default' : 'pointer' }}
            className="ws-frost-lookup"
          >
            Look up
          </button>
        </div>

        {frostResult && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--rule)' }}>
            <div style={{ ...mutedSmallStyle, marginBottom: '0.75rem' }}>
              {frostResult.region} · Zone {frostResult.zone}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }} className="ws-frost-results-grid">
              <ResultBox label="Avg last spring frost" value={fmtFrostDate(frostResult.lastSpring)} accent="var(--green)" hint="Safe to plant warm crops after this" />
              <ResultBox label="Avg first fall frost"  value={fmtFrostDate(frostResult.firstFall)}  accent="var(--sunflower)" hint="Protect or harvest tender crops before this" />
              <ResultBox label="Growing season"         value={`${daysInSeason(frostResult.lastSpring, frostResult.firstFall)} days`} accent="var(--ink)" hint="Between last spring and first fall frost" />
            </div>
            <p style={{ ...italicMutedStyle, marginTop: '1rem' }}>
              These are 30-year averages by ZIP prefix. Your holler, hilltop, or valley may be a week off in either direction. Track your own frost dates over a few years and adjust. The average knows the region. You know the garden.
            </p>
          </div>
        )}

        {frostResult === null && zipLookedUp && (
          <p style={{ ...italicMutedStyle, marginTop: '1rem' }}>
            No data for that ZIP prefix. Try a nearby one.
          </p>
        )}
      </section>

      {/* Forecast + cover */}
      <section style={cardStyle}>
        <h2 style={cardHeadStyle}>Tonight&rsquo;s forecast</h2>
        <p style={cardSubStyle}>Enter the forecast low and pick a cover. See which plants survive.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1rem' }} className="ws-frost-input-grid">
          <div>
            <label style={labelStyle}>Forecast low tonight (°F)</label>
            <input
              type="number"
              inputMode="decimal"
              step="1"
              value={forecastLow}
              onChange={(e) => setForecastLow(e.target.value)}
              placeholder="e.g. 28"
              style={inputStyle}
            />
            <p style={hintStyle}>Use ground-level temperature if you can. Official forecasts measure at 4 feet. Your garden is colder.</p>
          </div>

          <div>
            <label style={labelStyle}>What are you covering with?</label>
            <select
              value={coverType}
              onChange={(e) => setCoverType(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {COVER_TYPES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} (+{c.degrees}°F)
                </option>
              ))}
            </select>
            <p style={{ ...hintStyle, fontStyle: 'italic' }}>{cover.note}</p>
          </div>
        </div>

        {hasForecast && effectiveTemp !== null && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--rule)' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }} className="ws-frost-result-row">
              <div style={{ flex: 1 }}>
                <div style={kickerStyle}>Your plants will experience approximately</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontFeatureSettings: '"tnum" 1',
                  lineHeight: 1,
                  color: effectiveTemp <= 28 ? 'var(--eggplant)' : effectiveTemp <= 32 ? 'var(--sunflower)' : 'var(--green)',
                  marginTop: '0.25rem',
                }}>
                  {effectiveTemp}°F
                </div>
                <div style={{ ...mutedSmallStyle, marginTop: '0.4rem' }}>
                  {forecastNum}° forecast + {cover.degrees}° from {cover.label.toLowerCase()}
                </div>
              </div>
              {summary && (
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <SummaryBox count={summary.safe}    label="safe"      color="var(--green)" />
                  <SummaryBox count={summary.risk}    label="at risk"   color="var(--sunflower)" />
                  <SummaryBox count={summary.danger}  label="doomed"    color="var(--eggplant)" />
                </div>
              )}
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <a
                href="#plant-tolerance"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  borderBottom: '2px solid var(--sunflower)',
                  paddingBottom: '0.2rem',
                }}
                className="ws-frost-jump"
              >
                See kill temps for all 32 plants →
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Frost cloth comparison */}
      <section style={cardStyle}>
        <h2 style={cardHeadStyle}>What frost cloth actually does</h2>
        <p style={cardSubStyle}>And what it doesn&rsquo;t.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          {COVER_TYPES.map((c) => {
            const active = c.id === coverType
            return (
              <div key={c.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.75rem 0.9rem',
                background: active ? 'var(--paper-tint)' : 'var(--paper)',
                border: `1px solid ${active ? 'var(--green)' : 'var(--rule)'}`,
                borderLeft: active ? `3px solid var(--green)` : `1px solid var(--rule)`,
                transition: 'all 0.15s',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>{c.label}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.45, marginTop: '0.15rem' }}>{c.note}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: 'var(--green)', fontSize: '0.95rem' }}>+{c.degrees}°F</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--ink-muted)' }}>{c.light}% light</div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          marginTop: '1.25rem',
          padding: '0.9rem 1rem',
          background: 'rgba(119,76,134,0.08)',
          border: '1px solid rgba(119,76,134,0.35)',
          borderLeft: '3px solid var(--eggplant)',
          fontFamily: 'var(--font-serif)',
          fontSize: '0.9rem',
          lineHeight: 1.55,
          color: 'var(--ink)',
        }}>
          <strong style={{ color: 'var(--eggplant)' }}>The hard limit.</strong>{' '}
          No consumer frost cloth protects beyond about 8°F above ambient. If the forecast is 20°F, your best covering brings your plants to 28°F. That saves your broccoli. It does not save your tomato. The tomato was already dead at 32.
        </div>
      </section>

      {/* Plant table */}
      <section style={{ ...cardStyle, scrollMarginTop: '1rem' }} id="plant-tolerance">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 style={cardHeadStyle}>Plant cold tolerance</h2>
              <p style={cardSubStyle}>{filteredPlants.length} plants. Every one has a number.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              <SortPill active={sortBy === 'killTemp'} onClick={() => setSortBy('killTemp')}>By temp</SortPill>
              <SortPill active={sortBy === 'name'}     onClick={() => setSortBy('name')}>A-Z</SortPill>
              <SortPill active={sortBy === 'category'} onClick={() => setSortBy('category')}>By group</SortPill>
            </div>
          </div>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search plants..."
          style={{ ...inputStyle, marginBottom: '1rem' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredPlants.map((plant) => {
            const status = plantStatus(plant)
            const isExpanded = expandedPlant === plant.name
            const catColor =
              plant.category === 'tender' ? 'var(--eggplant)' :
              plant.category === 'semi-hardy' ? 'var(--sunflower)' : 'var(--green)'
            return (
              <button
                type="button"
                key={plant.name}
                onClick={() => setExpandedPlant(isExpanded ? null : plant.name)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 0.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--rule)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
                className="ws-frost-plant-row"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: catColor,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: 'var(--ink)' }}>
                    {plant.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.05em', color: 'var(--ink-muted)' }}>
                    ({plant.category})
                  </span>
                  <span style={{ flex: 1 }} />
                  {status !== 'unknown' && <StatusBadge status={status} />}
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>
                    {plant.killTemp}°F
                  </span>
                </div>
                {isExpanded && (
                  <div style={{
                    paddingLeft: '1.125rem',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    color: 'var(--ink-soft)',
                  }}>
                    <p>{plant.note}</p>
                    {hasForecast && effectiveTemp !== null && (
                      <p style={{ marginTop: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                        At {effectiveTemp}°F effective, this plant is{' '}
                        {effectiveTemp > plant.killTemp
                          ? `${effectiveTemp - plant.killTemp}° above its kill temperature.`
                          : `${plant.killTemp - effectiveTemp}° below its kill temperature. Cover will not save it tonight.`}
                      </p>
                    )}
                  </div>
                )}
              </button>
            )
          })}
          {filteredPlants.length === 0 && (
            <p style={{ ...italicMutedStyle, padding: '1.5rem 0', textAlign: 'center' }}>
              No plants match that search. The frost does not care about spelling either.
            </p>
          )}
        </div>
      </section>

      <style>{`
        .ws-frost-lookup:not(:disabled):hover { background: var(--green) !important; border-color: var(--green) !important; color: var(--paper) !important; }
        .ws-frost-plant-row:hover { background: var(--paper-tint) !important; }
        @media (max-width: 640px) {
          .ws-frost-results-grid { grid-template-columns: 1fr !important; }
          .ws-frost-input-grid   { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 640px) {
          .ws-frost-result-row { flex-direction: row !important; align-items: center !important; }
        }
      `}</style>
    </div>
  )
}

/* ── SUB-COMPONENTS ──────────────────────────────────────────────────────── */

function ResultBox({ label, value, accent, hint }: {
  label: string; value: string; accent: string; hint: string
}) {
  return (
    <div style={{
      padding: '0.875rem 1rem',
      background: 'var(--paper)',
      border: '1px solid var(--rule)',
      borderLeft: `3px solid ${accent}`,
    }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '0.35rem' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>
        {hint}
      </div>
    </div>
  )
}

function SummaryBox({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.65rem', lineHeight: 1, color, fontFeatureSettings: '"tnum" 1' }}>{count}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: '0.3rem' }}>{label}</div>
    </div>
  )
}

function SortPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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
        padding: '0.3rem 0.7rem',
        background: active ? 'var(--ink)' : 'var(--paper)',
        color: active ? 'var(--paper)' : 'var(--ink-soft)',
        border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
        cursor: 'pointer',
        borderRadius: 999,
        transition: 'all 0.15s',
      }}
      className={active ? '' : 'ws-frost-sort-pill'}
    >
      {children}
    </button>
  )
}

function StatusBadge({ status }: { status: Status }) {
  if (status === 'unknown') return null
  const { label, color, bg, bd } =
    status === 'safe'   ? { label: 'Likely fine',       color: 'var(--green)',    bg: 'rgba(44,85,48,0.1)',   bd: 'rgba(44,85,48,0.3)' } :
    status === 'risk'   ? { label: 'At risk',           color: 'var(--sunflower)', bg: 'rgba(217,148,16,0.1)', bd: 'rgba(217,148,16,0.3)' } :
                          { label: 'Will not survive',  color: 'var(--eggplant)',    bg: 'rgba(119,76,134,0.1)',  bd: 'rgba(119,76,134,0.3)' }
  return (
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '0.62rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color,
      background: bg,
      border: `1px solid ${bd}`,
      padding: '0.18rem 0.5rem',
      borderRadius: 999,
    }}>{label}</span>
  )
}

/* ── STYLES ──────────────────────────────────────────────────────────────── */

const cardStyle: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--rule)',
  padding: '1.5rem',
}

const cardHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 600,
  fontSize: '1.2rem',
  letterSpacing: '-0.01em',
  color: 'var(--ink)',
  marginBottom: '0.25rem',
}

const cardSubStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '0.95rem',
  lineHeight: 1.5,
  color: 'var(--ink-soft)',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.78rem',
  fontWeight: 500,
  letterSpacing: '0.04em',
  color: 'var(--ink)',
  marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.8rem',
  border: '1px solid var(--rule)',
  borderRadius: 6,
  background: 'var(--paper)',
  color: 'var(--ink)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  boxSizing: 'border-box',
}

const hintStyle: React.CSSProperties = {
  margin: '0.4rem 0 0',
  fontSize: '0.78rem',
  color: 'var(--ink-muted)',
  fontFamily: 'var(--font-serif)',
  lineHeight: 1.45,
}

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
}

const mutedSmallStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.78rem',
  color: 'var(--ink-muted)',
}

const italicMutedStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontStyle: 'italic',
  fontSize: '0.88rem',
  color: 'var(--ink-muted)',
  lineHeight: 1.5,
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
