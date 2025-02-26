<script lang="ts" setup>
import { CheckDayActivity, DayActivityModal, ScheduleTrainingModal } from '~/components/modal'

import {
  extractDateComponents,
  findDateDifference,
  isNextDateDisabled,
  isObjectInArray,
} from '~/helpers/calendar.helper'

const slideover = useSlideover()
const modal = useModal()
// TODO: remove this when the API is ready
onMounted(async () => {
  useActiveStore().toggleLoadingCalendar()
  await useActiveStore().getCheckIns()
  useActiveStore().toggleLoadingCalendar()
})

// Find day & send request by info Day
async function changeDayActivity(days) {
  const mainActive = useActiveStore().activeDaysTraining
  if (!days) {
    if (mainActive.length)
      await openDayActivityModal(mainActive[0])
    return
  }

  const date = findDateDifference(mainActive, days) || findDateDifference(days, mainActive)

  if (isObjectInArray(mainActive, date))
    await openDayActivityModal(date)
  else
    slideover.open(DayActivityModal, { date })
}

async function openDayActivityModal(date) {
  const config = await useActiveStore().getDayActivity(extractDateComponents(date))
  modal.open(CheckDayActivity, { date, config })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3.5">
    <UAlert
      v-if="useAppStore().isAppSettings(1)"
      :title="$t('alert.calendarAlert')"
      close
      color="neutral"
      variant="subtle"
      @update:open="useAppStore().changeAppSettings(1)"
    />
    <div v-if="useActiveStore().isLoadingCalendar" class="fixed inset-0 flex items-center justify-center">
      <LoaderApp />
    </div>

    <div v-if="!useActiveStore().isLoadingCalendar" class="flex flex-col items-center justify-center gap-3">
      <CalendarApp
        :date-disabled="isNextDateDisabled"
        :schedule-days="useActiveStore().scheduleDaysTraining"
        :selected-days="useActiveStore().activeDaysTraining"
        icon-name="i-solar-dumbbell-large-minimalistic-broken"
        ndar-app
        @update:model-value="changeDayActivity"
      />
      <USeparator :label="$t('modal.planning.or')" />
      <UButton
        :label="$t('modal.planning.button.open')"
        size="lg"
        @click="modal.open(ScheduleTrainingModal, { scheduleDays: useActiveStore().scheduleDaysTraining })"
      />
    </div>
  </div>
</template>
