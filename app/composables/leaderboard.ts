export function useLeaderBoardHelper() {
  const { t } = useI18n()

  function lastActivityColor(days: number): string {
    if (days < 3)
      return 'success'
    if (days < 7)
      return 'warning'
    return days >= 7 ? 'error' : 'neutral'
  }

  function formatLastActivity(days: number): string {
    if (days === 0)
      return t('general.date.today')
    if (days === 1)
      return t('general.date.yesterday')
    if (days >= 2 && days <= 4)
      return `${days} ${t('general.date.day_ago_2')}`
    if (days >= 5 && days <= 20)
      return `${days} ${t('general.date.day_ago_5')}`
    if (days >= 21 && days < 30) {
      const lastDigit = days % 10
      if (lastDigit === 1 && days !== 11)
        return `${days} день назад`
      return `${days} ${t('general.date.day_ago_5')}`
    }
    if (days >= 30)
      return t('general.date.more_month_ago')
    return 'unknown'
  }

  return {
    lastActivityColor,
    formatLastActivity,
  }
}
