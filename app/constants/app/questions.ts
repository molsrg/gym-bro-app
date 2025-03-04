export function useQuestions() {
  const { t } = useI18n()

  const questions = computed(() => [
    {
      icon: 'i-lucide-calendar-x',
      label: t('questions.1.title'),
      content: t('questions.1.content'),
    },
    {
      icon: 'i-lucide-chart-column-increasing',
      label: t('questions.2.title'),
      content: t('questions.2.content'),
    },
    {
      icon: 'i-lucide-coffee',
      label: t('questions.3.title'),
      content: t('questions.3.content'),
    },
  ])

  return {
    questions,
  }
}

export function useTrainingInfo() {
  const { t } = useI18n()

  const typesTraining = computed(() => [
    {
      label: t('alert.typesTrainingOnCalendar.today'),
      icon: 'i-solar-dumbbell-large-minimalistic-broken',
      color: 'text-[var(--ui-secondary)]',
    },
    {
      label: t('alert.typesTrainingOnCalendar.rest'),
      icon: 'i-solar-dumbbell-large-minimalistic-broken',
    },
    {
      label: t('alert.typesTrainingOnCalendar.unavailable'),
      icon: 'i-solar-dumbbell-large-minimalistic-broken',
      color: 'text-[var(--ui-text-muted)]',
    },
    {
      label: t('alert.typesTrainingOnCalendar.train'),
      icon: 'i-solar-dumbbell-large-minimalistic-broken',
      color: 'text-[var(--ui-primary)]',
    },
    {
      label: t('alert.typesTrainingOnCalendar.planned'),
      icon: 'i-solar-dumbbell-large-minimalistic-broken',
      slot: 'planning',
    },
  ])

  return {
    typesTraining,
  }
}
