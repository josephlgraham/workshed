import type { WeeklyRecap } from '@/lib/types'

// Past Tuesday recaps in rotation. dayLabel always reads "Tuesday's recap."
export const recapArchive: WeeklyRecap[] = [
  {
    headline: "It's been a still week.",
    body: `Wind hasn't bothered to show up since Sunday. The soil is <em>holding</em> on what fell last Wednesday, but it won't last past the weekend if the sky keeps acting smug. The basil is up in the brick circle. The artichokes are reluctant. Three peppers have tiny flowers, which is either a brag or a threat.`,
    days: 7,
    rainInches: 0.4,
    avgTempF: 71,
    dayLabel: "Tuesday's recap",
  },
  {
    headline: "The squash has made a decision.",
    body: `It expanded into the third bed over the weekend and is showing no signs of negotiating. The tomatoes on the south trellis set fruit on four more vines. The cucumber I planted late is catching up fast, possibly embarrassed by the gap. Soil held moisture well after Monday's rain. No complaints from the peppers, which is suspicious.`,
    days: 7,
    rainInches: 1.1,
    avgTempF: 74,
    dayLabel: "Tuesday's recap",
  },
  {
    headline: "Heat took most of the week.",
    body: `Four days above ninety. The basil thrived. The lettuce did not survive and has been removed from official records. Watered twice daily from Thursday on. The San Marzanos are ripening faster than expected, which is the first time this season anything has been faster than expected. I am suspicious of fast things.`,
    days: 7,
    rainInches: 0.0,
    avgTempF: 88,
    dayLabel: "Tuesday's recap",
  },
  {
    headline: "A good week. Quiet.",
    body: `Rain on Sunday, mild temps the rest. The peppers have been adding flowers steadily. The garlic is curing in the shed and will be ready by the end of the month. The compost bin is full, which means it's time to start another one. The morning glories on the back fence have reached the top and are reviewing their options.`,
    days: 7,
    rainInches: 0.8,
    avgTempF: 67,
    dayLabel: "Tuesday's recap",
  },
  {
    headline: "First frost warning of the season.",
    body: `It didn't come. The forecast was wrong. The basil stayed out overnight and is <em>fine</em>, which I do not trust. The kale responded to the cold snap by becoming noticeably better. Pulled the last of the summer squash. The beds on the north end are ready for garlic. The tomatoes on the south trellis are finished but still hanging on, which is a mood.`,
    days: 7,
    rainInches: 0.2,
    avgTempF: 52,
    dayLabel: "Tuesday's recap",
  },
]
