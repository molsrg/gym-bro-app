import { useCloudStorage } from 'vue-tg/latest'
import { endpoints } from '~/constants/api/endpoints'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    appSettings: {
      1: true,
      2: false,
      3: false,
    },
  }),
  getters: {
    isAppSettings: state => (id: number) => {
      return state.appSettings[id] || false
    },
  },
  actions: {
    async init() {
      const res = await useCloudStorage().getItem('appSettings')
      if (res !== '') {
        this.appSettings = JSON.parse(res)
      }
    },

    async changeAppSettings(id: number) {
      this.appSettings[id] = !this.appSettings[id]
      await useCloudStorage().setItem('appSettings', JSON.stringify(this.appSettings))
    },

    async sendSupportTicket(payload: object): Promise<void> {
      const { $api } = useNuxtApp()
      await $api.post(endpoints.app.support, { ...payload })
    },
  },
})
