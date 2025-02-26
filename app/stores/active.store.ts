import { CalendarDate } from '@internationalized/date'
import { endpoints } from '~/constants/api/endpoints'

export const useActiveStore = defineStore('activeStore', {
  state: () => ({
    isLoadingCalendar: false,
    activeDaysTraining: [],
    scheduleDaysTraining: [],

    achievements: {},
    monthlyActivity: {},
    muscleGroupsStat: {},
    satisfactionStats: {},

  }),
  actions: {
    toggleLoadingCalendar() {
      this.isLoadingCalendar = !this.isLoadingCalendar
    },

    async createCheckIn(payload: object) {
      const { $api } = useNuxtApp()
      await $api.post(endpoints.stats.createCheckIn, payload)
    },

    async getCheckIns() {
      const { $api } = useNuxtApp()
      const { activeDays, scheduleDays } = await $api.get(endpoints.stats.getCheckIns)
      this.activeDaysTraining = activeDays.map(item => new CalendarDate(item.year, item.month, item.day))
      this.scheduleDaysTraining = scheduleDays.map(item => new CalendarDate(item.year, item.month, item.day))
    },

    async deleteCheckIn(payload: object) {
      const { $api } = useNuxtApp()
      await $api.delete(endpoints.stats.deleteCheckIn, payload)
    },

    async createScheduleTraining(payload: object) {
      const { $api } = useNuxtApp()
      await $api.post(endpoints.stats.createScheduleTraining, payload)
    },

    async getDayActivity(date: object) {
      const { $api } = useNuxtApp()
      return await $api.get(endpoints.stats.getRecord, date)
    },

    async getMonthActivity() {
      const { $api } = useNuxtApp()
      this.monthlyActivity = await $api.get(endpoints.stats.getMonthStat)
    },

    async getMuscleGroupStats() {
      const { $api } = useNuxtApp()
      this.muscleGroupsStat = await $api.get(endpoints.stats.getMuscleGroupsStat)
    },

    async getSatisfactionStats() {
      const { $api } = useNuxtApp()
      this.satisfactionStats = await $api.get(endpoints.stats.getSatisfactionStat)
    },

    async getAchievements() {
      const { $api } = useNuxtApp()
      this.achievements = await $api.get(endpoints.stats.getAchievements)
    },
  },
})
