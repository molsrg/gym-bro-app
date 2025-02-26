export const endpoints = {
  auth: {
    session: '/auth/webapp-session',
  },
  app: {
    support: 'user/feedback',
  },
  stats: {
    getCheckIns: '/checkin/records',
    createCheckIn: '/checkin/record',
    createScheduleTraining: '/checkin/schedule',
    deleteCheckIn: '/checkin/record',
    getRecord: '/checkin/record',

    getMonthStat: '/stats/averageTrains',
    getMuscleGroupsStat: '/stats/muscleGroups',
    getAchievements: '/stats/achievements',

    getSatisfactionStat: 'stats/satisfaction',

  },
}
