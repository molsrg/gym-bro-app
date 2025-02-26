export const useTokenStore = defineStore('tokenStore', {
  state: () => ({
    token: '',
    loggedIn: false,
  }),
  getters: {
    getToken: (state): string => state.token,
    getStatus: (state): boolean => state.loggedIn,
  },
  actions: {
    async setToken(token: string): void {
      this.token = token
      this.loggedIn = true
    },
    async updateToken(): Promise<void> {
      await useTgWebAppStore().setInitData()
    },
  },
})
