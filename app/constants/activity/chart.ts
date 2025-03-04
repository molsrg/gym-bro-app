interface ChartTab {
  label: string
  icon: string
  slot: string
}

export const chartTabs: ChartTab[] = [
  {
    label: 'chart.tabs.comparison',
    icon: 'i-uil-comparison',
    slot: 'count',
  },
  {
    label: 'chart.tabs.muscle',
    icon: 'i-hugeicons-body-part-muscle',
    slot: 'muscleGroup',
  },
  {
    label: 'chart.tabs.satisfaction',
    icon: 'i-lucide-smile-plus',
    slot: 'satisfaction',
  },
]
