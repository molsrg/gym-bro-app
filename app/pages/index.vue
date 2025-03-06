<script lang="ts" setup>
import { CheckDayActivity, DayActivityModal, ScheduleTrainingModal } from '~/components/modal'

import { useTrainingInfo } from '~/constants/app/questions'
import {
  extractDateComponents,
  findDateDifference,
  isNextDateDisabled,
  isObjectInArray,
} from '~/helpers/calendar.helper'

const slideover = useOverlay()
const modal = useOverlay()
const { typesTraining } = useTrainingInfo()
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
  <div class="flex flex-col items-center justify-center gap-2">
    <UCollapsible
      v-if="useAppStore().isAppSettings(1)" class="flex flex-col w-full gap-0.5"
    >
      <UButton
        class="group"
        :label="$t('alert.calendarAlert')"
        color="neutral"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
        :ui="{
          base: ' py-4',
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        block
      />

      <template #content>
        <UAccordion
          :items="typesTraining" trailing-icon="ddd" disabled :ui="{
            trigger: 'opacity-100 py-2.5',
            root: 'px-2',
          }"
        >
          <template #leading="{ item }">
            <UIcon v-if="!item.slot" :name="item.icon" class="size-5" :class="item.color" />
            <UAvatar v-if="item.slot" :class="item.color" icon="i-solar-dumbbell-large-minimalistic-broken" size="lg" />
          </template>
        </UAccordion>
      </template>
    </UCollapsible>

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
