import { ApiService } from '~/services/api.service'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gymApiService = new ApiService(config.public.apiUrl)

  return {
    provide: {
      api: gymApiService,
    },
  }
})
