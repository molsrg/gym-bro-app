import { useCloudStorage } from 'vue-tg/latest'

export const useLocaleStore = defineStore('localeStore', {
  persist: true,
  state: () => ({
    locale: 'ru',
  }),
  actions: {
    async init() {
      const { setLocale } = useI18n()
      const locale = await useCloudStorage().getItem('locale') || this.locale
      setLocale(locale)
      this.locale = locale
    },

    setLocale(locale: string) {
      this.locale = locale
    },
  },
})
