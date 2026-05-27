// Time-sliced deterministic weekly rotation. Used by getRotatingRecap.
export function rotateWeekly<T>(pool: T[], offset = 0): T {
  const weekIndex = Math.floor(Date.now() / (86_400_000 * 7))
  return pool[(weekIndex + offset) % pool.length]
}
