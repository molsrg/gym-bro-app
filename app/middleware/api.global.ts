export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/statistic') {
    await useActiveStore().getMonthActivity()
    await useActiveStore().getAchievements()
    await useActiveStore().getMuscleGroupStats()
    await useActiveStore().getSatisfactionStats()
  }
})
