import type {
  GardenConditions,
  WeeklyRecap,
  Tool,
  ToolStatus,
} from '@/lib/types'
import data from '@/content/data'
import { tools as toolCatalog } from '@/content/tools'
import { recapArchive } from '@/content/recaps/archive'
import { seasonalTasks, type SeasonalBucket } from '@/content/seasonal-tasks'
import { getActiveTheme } from '@/lib/seasons'
import { rotateWeekly } from '@/lib/rotate'

// Phase 1: static data fallbacks. Phase 2: swap individual functions to
// fetch from Ambient Weather API / Supabase. Components never import from
// content/data.ts directly — always through here.

export function getCurrentConditions(): GardenConditions {
  return data.conditions
}

export function getToolsByStatus(status: ToolStatus): Tool[] {
  return toolCatalog.filter((t) => t.status === status)
}

export function getFeaturedTool(): Tool | undefined {
  return toolCatalog.find((t) => t.featured)
}

/** Weekly recap from the archive — rotates weekly (offset 3 for drift). */
export function getRotatingRecap(): WeeklyRecap {
  return rotateWeekly(recapArchive, 3)
}

// Alias so /garden page can keep calling getRecentRecap().
export const getRecentRecap = getRotatingRecap

/** "What I'm doing now" tasks for the current season. */
export function getSeasonalTasks(now = new Date()): SeasonalBucket {
  const theme = getActiveTheme(now)
  return seasonalTasks[theme.id as keyof typeof seasonalTasks]
}
