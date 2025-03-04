export function satisfactionColor(satisfaction) {
  if (satisfaction >= 1 && satisfaction <= 4)
    return 'bg-[var(--ui-error)]'
  if (satisfaction >= 5 && satisfaction <= 7)
    return 'bg-[var(--ui-warning)]'
  if (satisfaction >= 8 && satisfaction <= 10)
    return 'bg-[var(--ui-success)]'
  return 'bg-[var(--ui-bg-elevated)]'
}
