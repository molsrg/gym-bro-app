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
