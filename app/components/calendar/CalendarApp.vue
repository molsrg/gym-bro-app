<script lang="ts" setup>
import { CalendarDate } from '@internationalized/date'
import { isDateUnavailable, isNextDateDisabled, monthTranslate } from '~/helpers/calendar.helper'

interface Props {
  selectedDays?: string[]
  scheduleDays?: string[]
  iconName?: string
}

const props = withDefaults(defineProps<Props>(), {
  selectedDays: () => [],
  scheduleDays: () => [],
  iconName: () => 'i-solar-dumbbell-large-minimalistic-broken',
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const selectedDays = computed({
  get: () => props.selectedDays,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <UCalendar
    v-model="selectedDays"
    :min-value="useTgWebAppStore().registrationDate"
    :default-placeholder="new CalendarDate((new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate())"
    :fixed-weeks="false"
    :is-date-disabled="isNextDateDisabled"
    :is-date-unavailable="(date) => isDateUnavailable(date, scheduleDays)"
    :ui="{
      cell: 'p-2',
      cellTrigger: 'size-10 text-xs data-[selected]:text-[var(--ui-primary)] data-[selected]:bg-transparent data-today:not-data-[selected]:text-[var(--ui-info)] hover:data-[selected]:bg-(--ui-primary)/20 data-unavailable:no-underline data-unavailable:text-(--ui-text-primary) data-unavailable:bg-(--ui-info)/20 data-today:data-[selected]:bg-(--ui-success)/20',
    }"
    :week-starts-on="useAppStore().isAppSettings(2) ? 0 : 1"
    :year-controls="false"
    multiple
    size="xl"
    weekday-format="short"
  >
    <template #heading="{ value }">
      {{ monthTranslate(value) }}
    </template>
    <template #week-day="{ day }">
      {{ t(`calendar.day.${day}`) }}
    </template>
    <template #day="{ day }">
      <div class="flex flex-col items-center">
        <p>{{ day.day }}</p>
        <UIcon
          :name="props.iconName"
          class="size-5"
        />
      </div>
    </template>
  </UCalendar>
</template>
