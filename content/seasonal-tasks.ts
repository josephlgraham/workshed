/**
 * "What I'm doing now" content for the Garden page.
 *
 * Keyed by season ID from lib/seasons. The page picks the active entry via
 * getActiveTheme().id. Each task is a short line, a few words to a sentence.
 * Voice: first person, useful, slightly dry. No exclamations, no em dashes,
 * no AI tics. Aim for 5-8 tasks so the list has weight without sprawl.
 */

export type SeasonId =
  | 'deep-winter'
  | 'late-winter'
  | 'spring-equinox'
  | 'late-spring'
  | 'high-summer'
  | 'dog-days'
  | 'first-frost'
  | 'hollow-season'
  | 'late-fall'
  | 'winter-solstice'

export type SeasonalTasksEntry = {
  /** Short imperative line. Shows up as a bullet. */
  task: string
  /** Optional one-sentence context. Plain prose. */
  note?: string
}

export type SeasonalBucket = {
  id: SeasonId
  /** Short label shown above the list, e.g. "Late Spring". */
  label: string
  /** One-sentence opening that sets the season's mood/state. Optional. */
  intro?: string
  tasks: SeasonalTasksEntry[]
}

export const seasonalTasks: Record<SeasonId, SeasonalBucket> = {

  'deep-winter': {
    id: 'deep-winter',
    label: 'Deep Winter',
    intro: 'The garden is quiet. The work moves indoors and onto paper.',
    tasks: [
      {
        task: 'Order seeds for the year.',
        note: 'Pick suppliers early. The good Southern varieties sell out by February.',
      },
      {
        task: 'Prune fruit trees while they are dormant.',
        note: 'Open the center, remove crossing branches, cut last year\'s growth back by a third.',
      },
      {
        task: 'Start onion and leek seeds indoors.',
        note: 'They need 10-12 weeks before transplanting. January is the window in most of the South.',
      },
      {
        task: 'Sharpen and oil tools.',
        note: 'A pruner that bruises stems is worse than no pruner. Clean the sap off, hone the bevel, oil the spring.',
      },
      {
        task: 'Sketch the year\'s bed layout.',
        note: 'Rotate brassicas, legumes, nightshades, and roots through the beds. Use the Square Foot Planner if it helps.',
      },
      {
        task: 'Mulch heavily on any beds holding overwintering crops.',
        note: 'Garlic and shallots want a thick blanket if a hard freeze is coming.',
      },
      {
        task: 'Read.',
        note: 'Old extension manuals and out-of-print books on small-farm practice are better than most YouTube channels.',
      },
    ],
  },

  'late-winter': {
    id: 'late-winter',
    label: 'Late Winter',
    intro: 'Something is stirring. Not time to plant outside, but the seeds are going in indoors.',
    tasks: [
      {
        task: 'Start pepper and eggplant seeds indoors.',
        note: 'They are slow. Eight to ten weeks before last frost is not too early.',
      },
      {
        task: 'Start brassica seeds indoors if not already done.',
        note: 'Broccoli, cabbage, collards, kale. Six to eight weeks before transplanting date.',
      },
      {
        task: 'Check stored garlic and onions.',
        note: 'Pull anything going soft before it spreads. Soft garlic still cooks fine.',
      },
      {
        task: 'Rake back mulch on the earliest beds when soil starts to warm.',
        note: 'Let the surface dry out and the soil temperature rise before direct sowing.',
      },
      {
        task: 'Direct sow spinach under row cover if the ground is workable.',
        note: 'Spinach germinates in cold soil and does not mind a light frost once up.',
      },
      {
        task: 'Top-dress open beds with compost.',
        note: 'The microbes will work it in before planting season. A light dressing is enough.',
      },
    ],
  },

  'spring-equinox': {
    id: 'spring-equinox',
    label: 'Spring Equinox',
    intro: 'The frost is not done with us yet. Plant what can take a hit and protect the rest.',
    tasks: [
      {
        task: 'Direct sow peas, lettuce, spinach, radishes, beets, and carrots.',
        note: 'They all want cool soil. The window closes faster than you think in the South.',
      },
      {
        task: 'Harden off indoor-started brassicas and begin transplanting.',
        note: 'Seven to ten days of gradual outdoor exposure. Wind matters as much as temperature.',
      },
      {
        task: 'Transplant onion seedlings as soon as the ground is workable.',
        note: 'They handle frost fine once in the ground. Get them in early for good bulb development.',
      },
      {
        task: 'Set up trellises before the climbers need them.',
        note: 'Peas, morning glories, and early pole beans all benefit from structure already in place.',
      },
      {
        task: 'Keep row cover nearby through the end of the month.',
        note: 'One late frost can wipe out what you just planted. The forecast is a guide, not a promise.',
      },
      {
        task: 'Start succession sowings of radishes and lettuce every two to three weeks.',
        note: 'A small sowing every few weeks beats one big planting that all matures at once.',
      },
    ],
  },

  'late-spring': {
    id: 'late-spring',
    label: 'Late Spring',
    intro: 'Planting season. The window is open.',
    tasks: [
      {
        task: 'Transplant tomatoes, peppers, and eggplant after the soil holds 60 degrees.',
        note: 'Soil thermometer, not calendar. Cold soil stunts nightshades for weeks even if the air is warm.',
      },
      {
        task: 'Direct sow beans, cucumbers, squash, and corn after last frost.',
        note: 'Warm-season crops go in fast once the risk is gone. They grow quickly in warm soil.',
      },
      {
        task: 'Side-dress heavy feeders with compost.',
        note: 'Tomatoes, peppers, corn, and squash all benefit from a ring of compost worked in lightly around the base.',
      },
      {
        task: 'Watch for flea beetles on eggplant and brassicas.',
        note: 'Small round holes in the leaves. Row cover handles it, or a light dusting of diatomaceous earth.',
      },
      {
        task: 'Keep up with succession sowings of fast crops.',
        note: 'Radishes, bush beans, and lettuce all do well with a new sowing every two to three weeks.',
      },
      {
        task: 'Thin direct-sown crops before they crowd each other.',
        note: 'Thinning carrots and beets is tedious but necessary. Crowded roots fork and stay small.',
      },
    ],
  },

  'high-summer': {
    id: 'high-summer',
    label: 'High Summer',
    intro: 'Everything is happening at once. Keep up with the harvest or it will get away from you.',
    tasks: [
      {
        task: 'Water deep and infrequent.',
        note: 'A long soak twice a week beats a daily sprinkle. Roots follow the water down.',
      },
      {
        task: 'Mulch anywhere bare soil is still showing.',
        note: 'Three inches. Cedar if you can get it, hardwood if you cannot.',
      },
      {
        task: 'Harvest cucumbers, zucchini, and beans before they overmature.',
        note: 'These crops quit producing if any fruit is left to fully size. Pick young and often.',
      },
      {
        task: 'Walk the beds daily.',
        note: 'Squash vine borers, hornworms, and aphids show up overnight. The first signs are easy to miss.',
      },
      {
        task: 'Stake and prune tomatoes as they grow.',
        note: 'Suckers left to grow make the plant bushy, hard to manage, and late to ripen.',
      },
      {
        task: 'Start fall brassica seeds indoors in late July.',
        note: 'Broccoli, cabbage, kale, and collards want to go in the ground in late August. Start them now.',
      },
    ],
  },

  'dog-days': {
    id: 'dog-days',
    label: 'Dog Days',
    intro: 'The heat has opinions. Work early in the morning and let the afternoon go.',
    tasks: [
      {
        task: 'Transplant fall brassica starts into cleared beds.',
        note: 'They want to be in the ground by late August so they mature in cool weather.',
      },
      {
        task: 'Direct sow fall turnips, mustard greens, and radishes.',
        note: 'Fast crops that will be ready before first frost. Sow now and succession-sow every two weeks.',
      },
      {
        task: 'Pull exhausted summer crops as they finish.',
        note: 'Do not leave spent plants standing. They harbor pests and disease and take up bed space.',
      },
      {
        task: 'Water in the morning.',
        note: 'Evening watering on hot soil raises fungal pressure. Early is better for the plants and for you.',
      },
      {
        task: 'Sow cover crops on beds that are going to rest.',
        note: 'Cowpeas work well in the August heat. Crimson clover and winter rye go in September.',
      },
      {
        task: 'Harvest dry beans and storage onions if they are ready.',
        note: 'Dry beans need to be fully dry on the vine. Onions are ready when the tops fall over on their own.',
      },
    ],
  },

  'first-frost': {
    id: 'first-frost',
    label: 'First Frost',
    intro: 'The second spring. Cooler nights, gentler sun, and most of the pests have gone home.',
    tasks: [
      {
        task: 'Plant fall greens in earnest.',
        note: 'Lettuce, spinach, kale, collards, and mustard all prefer fall to spring in the South. This is their season.',
      },
      {
        task: 'Direct sow cilantro, dill, and parsley.',
        note: 'These bolt fast in spring heat. Fall-sown plants live longer and taste better.',
      },
      {
        task: 'Watch the 10-day forecast for first frost.',
        note: 'Have row cover ready for tender crops still producing. Tomatoes and peppers can keep going with cover.',
      },
      {
        task: 'Harvest hard-shell winter squash before a hard freeze.',
        note: 'Butternut, acorn, and spaghetti squash need to cure for a week or two in a dry spot before storing.',
      },
      {
        task: 'Pull green tomatoes before frost and ripen them indoors.',
        note: 'A green tomato on the counter is better than a frozen one on the vine. They come in slowly over a week.',
      },
      {
        task: 'Continue fall greens succession sowings every two weeks.',
        note: 'A small sowing every few weeks extends the harvest deep into winter in most of the South.',
      },
    ],
  },

  'hollow-season': {
    id: 'hollow-season',
    label: 'Hollow Season',
    intro: 'The garden remembers things it should not. Plant the garlic and keep moving.',
    tasks: [
      {
        task: 'Plant garlic.',
        note: 'Pointed end up, two inches deep, six inches apart. Harvest the following June.',
      },
      {
        task: 'Plant multiplying onions and shallots.',
        note: 'They go in at the same time as garlic and overwinter the same way.',
      },
      {
        task: 'Pull finished summer plants and compost them.',
        note: 'Do not compost diseased tissue or anything with vine borers. That goes in the trash.',
      },
      {
        task: 'Sow cover crops on resting beds.',
        note: 'Crimson clover, winter rye, hairy vetch. The soil keeps working even when you stop.',
      },
      {
        task: 'Top-dress open beds with compost before cover crops or mulch go down.',
        note: 'Same logic as spring. The microbes have all winter to work it in.',
      },
      {
        task: 'Clean and sharpen tools before putting them away.',
        note: 'A coat of oil on the metal, a check of the wooden handles. Things last when you bother.',
      },
    ],
  },

  'late-fall': {
    id: 'late-fall',
    label: 'Late Fall',
    intro: 'The bare branches are honest about it. Wind down slowly.',
    tasks: [
      {
        task: 'Mulch garlic and overwintering crops heavily before hard freezes.',
        note: 'Four to six inches of straw or shredded leaves over the garlic bed before temperatures stay below freezing.',
      },
      {
        task: 'Harvest Brussels sprouts after frost.',
        note: 'Cold improves the flavor. Pick from the bottom of the stalk up as they size.',
      },
      {
        task: 'Bring tender perennials indoors.',
        note: 'Rosemary in marginal zones, citrus, anything that has not earned its hardiness rating in your specific spot.',
      },
      {
        task: 'Take notes on the season while it is still fresh.',
        note: 'What worked, what failed, what needs to move. January-you will not remember the details.',
      },
      {
        task: 'Pull stakes, coil hoses, and clean up the paths.',
        note: 'A bed that is left organized in fall is easier to work in spring.',
      },
      {
        task: 'Start browsing seed catalogs.',
        note: 'The good varieties sell out. Better to want things now than scramble in January.',
      },
    ],
  },

  'winter-solstice': {
    id: 'winter-solstice',
    label: 'Winter Solstice',
    intro: 'The longest dark, then less of it.',
    tasks: [
      {
        task: 'Let the garden rest.',
        note: 'Not everything needs to be done before the year turns over. Some things wait fine.',
      },
      {
        task: 'Test germination on saved seeds older than three years.',
        note: 'Fold ten seeds in a damp paper towel, seal in a bag, set somewhere warm. Check in a week.',
      },
      {
        task: 'Write up the year\'s notes into something usable.',
        note: 'Planting dates, yields, what went wrong. A few paragraphs now saves a lot of guessing next year.',
      },
      {
        task: 'Build the seed order list.',
        note: 'The best Southern varieties go fast. Have the order ready before January is out.',
      },
      {
        task: 'Check stored root crops and winter squash for rot.',
        note: 'One bad potato or soft squash can ruin the ones around it. Pull anything that is going.',
      },
    ],
  },

}
