<script lang="ts" setup>
import AchievementCard from '~/components/card/AchievementCard.vue'

import { achievementsList } from '~/constants/activity/achievements'
import { chartTabs } from '~/constants/activity/chart'

const { t } = useI18n()

const achievements = computed(() => {
  return achievementsList.map((achievement) => {
    const status = useActiveStore().achievements.find(status => status.id === achievement.id)?.status ?? false
    return { ...achievement, status }
  })
})

const muscleGroups = computed(() => {
  const stats = useActiveStore().muscleGroupsStat
  const translatedStats = {}

  for (const key in stats) {
    if (Object.prototype.hasOwnProperty.call(stats, key)) {
      const translatedKey = t(`modal.mainActive.muscleOptions.${key}`)
      translatedStats[translatedKey] = stats[key]
    }
  }

  return translatedStats
})
</script>

<template>
  <main class="flex flex-col gap-3">
    <UAlert
      v-if="useAppStore().isAppSettings(3)"
      :title="t('alert.chartAlert')"
      close
      color="neutral"
      variant="subtle"
      @update:open="useAppStore().changeAppSettings(3)"
    />
    <UTabs
      default-value="1"
      :items="chartTabs" :ui="{ trigger: 'flex-1', list: 'px-0' }" size="sm"
      variant="link"
    >
      <template #default="{ item }">
        {{ t(item.label) }}
      </template>
      <template #count>
        <ChartContainer :disabled="useActiveStore().monthlyActivity === null">
          <ChartComparison
            :datasets="useActiveStore().monthlyActivity"
          />
        </ChartContainer>
      </template>

      <template #muscleGroup>
        <ChartContainer :disabled="useActiveStore().muscleGroupsStat === null">
          <ChartTypeTraining
            :datasets="muscleGroups"
          />
        </ChartContainer>
      </template>

      <template #satisfaction>
        <ChartContainer :disabled="useActiveStore().satisfactionStats === null">
          <ChartSatiscfaction
            :datasets="useActiveStore().satisfactionStats"
          />
        </ChartContainer>
      </template>
    </UTabs>

    <UAlert
      :title="t('alert.achievementsAlert')"
      color="neutral"
      variant="subtle"
    />

    <div class="flex gap-3 flex-wrap justify-center ">
      <AchievementCard
        v-for="achievement in achievements"
        :key="achievement.id"
        :condition="achievement.condition"
        :disabled="!achievement.status"
        :icon-name="achievement.icon"
        :name="achievement.name"
      />
    </div>
  </main>
</template>
