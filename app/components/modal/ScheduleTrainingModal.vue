<script lang="ts" setup>
import {
  formatDateToISO,
  isDateDisabledAfterNDays,
  isDateUnavailable,
  isPastOrTodayDateDisabled,
  monthTranslate,
} from '~/helpers/calendar.helper'

defineProps<{
  scheduleDays: object
}>()

const modal = useOverlay()
const { t } = useI18n()

const isLoadingButton = ref(false)
const trainingDay = ref(null)

async function submit() {
  isLoadingButton.value = true

  const payload = {
    date: formatDateToISO(trainingDay.value),
    timezone: Number(new Date().getTimezoneOffset()),
  }
  try {
    await useActiveStore().createScheduleTraining(payload)
    await modal.close()
    await useActiveStore().getCheckIns()
    reset()
  }
  catch (error) {
    console.error('Error submitting form:', error)
  }
  finally {
    isLoadingButton.value = false
  }
}

function reset() {
  isLoadingButton.value = false
  trainingDay.value = null
}
</script>

<template>
  <UModal
    :description="t('modal.planning.description')"
  >
    <template #body>
      <UCalendar
        v-model="trainingDay"
        :is-date-disabled="(date) => isPastOrTodayDateDisabled(date) || isDateDisabledAfterNDays(date)"
        :is-date-unavailable="(date) => isDateUnavailable(date, scheduleDays)"
        :ui="{
          cellTrigger: 'data-unavailable:no-underline data-unavailable:text-(--ui-text-primary) data-unavailable:bg-(--ui-info)/20',
        }"
        :week-starts-on="useAppStore().isAppSettings(2) ? 0 : 1"
        :year-controls="false"
        size="lg"
        weekday-format="short"
      >
        <template #heading="{ value }">
          {{ monthTranslate(value) }}
        </template>
        <template #week-day="{ day }">
          {{ t(`calendar.day.${day}`) }}
        </template>
      </UCalendar>
    </template>
    <template #footer>
      <UButton
        :disabled="!trainingDay"
        :label="t('modal.planning.button.submit')"
        :loading="isLoadingButton"
        color="success"
        size="md"
        variant="soft"
        @click="submit"
      />
    </template>
  </UModal>
</template>
