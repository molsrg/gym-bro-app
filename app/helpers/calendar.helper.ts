import { CalendarDate } from '@internationalized/date'

export function isNextDateDisabled(date: CalendarDate) {
  return date.compare(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())) > 0
}

export function isPastOrTodayDateDisabled(date: CalendarDate) {
  return date.compare(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())) <= 0
}

export function isDateDisabledAfterNDays(date: CalendarDate, nDays = 29) {
  const today = new Date()
  today.setDate(today.getDate() + nDays)
  return date.compare(new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())) > 0
}

export function extractDateComponents(date: CalendarDate) {
  return {
    year: date.year,
    month: date.month,
    day: date.day,
  }
}

export function monthTranslate(value: string) {
  const { t } = useI18n()
  const [month, rest] = value.split(' ')
  return `${t(`calendar.month.${month}`)} ${rest}`
}

export function isDateUnavailable(date: CalendarDate, selectedDays: CalendarDate[]) {
  return selectedDays.some(selectedDate => selectedDate.compare(date) === 0)
}

export function formatDateToISO(dateObj: any): string {
  const { year, month, day } = dateObj
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.toISOString()
}

export function findDateDifference(source, target) {
  return source.find(item => !target.some(t => compareDates(item, t)))
}

export function compareDates(a, b) {
  return a.year === b.year
    && a.month === b.month
    && a.day === b.day
    && a.calendar.identifier === b.calendar.identifier
    && a.era === b.era
}

export function isObjectInArray(sourceArray: any[], targetObj: any): boolean {
  return sourceArray.some(sourceObj => compareDates(sourceObj, targetObj))
}
