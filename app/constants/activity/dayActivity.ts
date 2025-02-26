export const muscleGroups = [

  { id: 1, label: ('modal.mainActive.muscleOptions.legs'), icon: 'i-game-icons-hieroglyph-legs', color: 'info' },
  { id: 2, label: ('modal.mainActive.muscleOptions.back'), icon: 'i-healthicons-spine-24px', color: 'warning' },

  {
    id: 7,
    label: ('modal.mainActive.muscleOptions.breast'),
    icon: 'i-hugeicons-equipment-bench-press',
    color: 'primary',
  },
  { id: 4, label: ('modal.mainActive.muscleOptions.shoulders'), icon: 'i-iconoir-gym', color: 'lime' },

  {
    id: 6,
    label: ('modal.mainActive.muscleOptions.cardio'),
    icon: 'i-material-symbols-ecg-heart-outline',
    color: 'error',
  },
  { id: 5, label: ('modal.mainActive.muscleOptions.circuit'), icon: 'i-lucide-repeat', color: 'neutral' },
  {
    id: 9,
    label: ('modal.mainActive.muscleOptions.triceps'),
    icon: 'i-game-icons-biceps',
    color: 'orange',
  },
  { id: 3, label: ('modal.mainActive.muscleOptions.biceps'), icon: 'i-lucide-biceps-flexed', color: 'success' },

  {
    id: 8,
    label: ('modal.mainActive.muscleOptions.press'),
    icon: 'i-gravity-ui-cubes-3',
    color: 'gray',
  },
  {
    id: 10,
    label: ('modal.mainActive.muscleOptions.stretching'),
    icon: 'i-solar-stretching-linear',
    color: 'rose',
  },
]

export function satisfactionColor(satisfaction) {
  if (satisfaction >= 1 && satisfaction <= 4)
    return 'bg-[var(--ui-error)]'
  if (satisfaction >= 5 && satisfaction <= 7)
    return 'bg-[var(--ui-warning)]'
  if (satisfaction >= 8 && satisfaction <= 10)
    return 'bg-[var(--ui-success)]'
  return 'bg-[var(--ui-bg-elevated)]'
}
