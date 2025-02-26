export default defineNuxtPlugin(async () => {
  // await useLocaleStore().init()
  await useTgWebAppStore().init()
  await useAppStore().init()
})
