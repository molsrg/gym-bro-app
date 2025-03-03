import { useWebAppTheme } from 'vue-tg'
import { useCloudStorage, useMiniApp } from 'vue-tg/latest'
import WelcomeModal from '~/components/modal/WelcomeModal.vue'
import { endpoints } from '~/constants/api/endpoints'

export const useTgWebAppStore = defineStore('tgWebAppStore', {
  state: () => ({
    webAppData: null,
    initDataUnsafe: null,
    initData: null,

    isMobile: false,
  }),

  actions: {
    async init() {
      this.setWebAppData()
      if (['ios', 'android'].includes(this.webAppData.platform)) {
        Telegram.WebApp.requestFullscreen()
        this.isMobile = true
      }
      Telegram.WebApp.disableVerticalSwipes()

      if (this.webAppData.version > '6.0') {
        Telegram.WebApp.lockOrientation('portrait')
        useWebAppTheme().setBackgroundColor('#121212')
        useWebAppTheme().setHeaderColor('#151719')
        await this.setInitData()
      }
    },

    setWebAppData() {
      this.webAppData = useMiniApp()
    },

    async setInitData() {
      const modal = useModal()
      const initData = useMiniApp().initData
      const initDataUnsafe = useMiniApp().initDataUnsafe.user

      if (initData !== 'user') {
        await useCloudStorage().setItem('initData', initData)
        await useCloudStorage().setItem('initDataUnsafe', JSON.stringify(initDataUnsafe))
      }

      this.initDataUnsafe = initDataUnsafe === null ? JSON.parse(await useCloudStorage().getItem('initDataUnsafe')) : initDataUnsafe
      this.initData = initData === 'user' ? await useCloudStorage().getItem('initData') : initData

      const { $api } = useNuxtApp()
      const { accessToken, isRegistered } = await $api.post(endpoints.auth.session, {
        queryString: this.initData,
      })

      if (!isRegistered)
        modal.open(WelcomeModal, { user: this.initDataUnsafe })

      useTokenStore().setToken(accessToken)
    },
  },
})
