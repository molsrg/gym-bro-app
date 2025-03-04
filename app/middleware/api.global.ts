export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/statistic') {
    await Promise.all([
      useActiveStore().getMonthActivity(),
      useActiveStore().getAchievements(),
      useActiveStore().getMuscleGroupStats(),
      useActiveStore().getSatisfactionStats(),
    ])
  }
})
