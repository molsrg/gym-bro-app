<script lang="ts" setup>
import { muscleGroups } from '~/constants/activity/dayActivity'
import { extractDateComponents } from '~/helpers/calendar.helper'
import { satisfactionColor } from '~/helpers/chart.helper'

const props = defineProps<{
  date: object
  config: object
}>()

const modal = useModal()
const { t } = useI18n()

const isLoadingDelete = ref(false)
const satisfaction = ref(props.config?.rating ?? 8)
const selectedMuscleGroups = ref<number[]>(props.config?.muscleGroups ?? [])
const customActivity = ref(props.config?.customActivity || '')
const commentTraining = ref(props.config?.comment || '')

const filteredMuscleGroups = computed(() => {
  return muscleGroups.filter(group => selectedMuscleGroups.value.includes(group.id))
})

async function deleteActivity() {
  isLoadingDelete.value = true

  const payload = {
    dayData: {
      date: extractDateComponents(props.date),
    },
  }
  try {
    await useActiveStore().deleteCheckIn(payload)
    resetModal()
    await modal.close()
    await useActiveStore().getCheckIns()
  }
  catch (error) {
    console.error('Error submitting form:', error)
  }
  finally {
    isLoadingDelete.value = false
  }
}

function resetModal() {
  satisfaction.value = 8
  selectedMuscleGroups.value = []
}

watch(() => props.config, (newConfig) => {
  if (newConfig) {
    satisfaction.value = newConfig.rating ?? 9
    selectedMuscleGroups.value = newConfig.muscleGroups ?? []
    customActivity.value = newConfig.customActivity || ''
    commentTraining.value = newConfig.comment || ''
  }
})
</script>

<template>
  <UModal
    :description="t('modal.checkActivity.description', { date })"
    :dismissible="false"
    :title="t('modal.checkActivity.title')"
    close
    @update:open="resetModal"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <UAvatar
            :class="satisfactionColor(satisfaction)"
            :text="satisfaction.toString()"
            :ui="{
              fallback: 'text-white',

            }"
            size="md"
          />

          <div class="flex flex-col">
            <h2 class="text-[var(--ui-text-highlighted)] font-semibold">
              {{ t('modal.checkActivity.title') }}
            </h2>
            <p class="text-[var(--ui-text-muted)] text-sm">
              {{ t('modal.checkActivity.description', { date }) }}
            </p>
          </div>
        </div>
        <UButton color="neutral" icon="i-lucide-x" variant="ghost" @click="modal.close()" />
      </div>
    </template>

    <template #body>
      <div class="flex flex-col gap-2">
        <SettingsItem
          v-if="config.muscleGroups.length"
          :title="t('modal.checkActivity.muscleGroup')"
          class="text-sm"
        >
          <div class="flex flex-wrap gap-1 justify-evenly">
            <UButton
              v-for="group in filteredMuscleGroups"
              :key="group.id"
              :color="group.color"
              :icon="group.icon"
              disabled
              variant="subtle"
            >
              {{ t(group.label) }}
            </UButton>
          </div>
        </SettingsItem>

        <SettingsItem
          v-if="customActivity"
          :title="t('modal.checkActivity.activity')"
          class="text-sm "
        >
          <UButton
            :label="customActivity"
            color="success"
            disabled
            icon="i-lucide-biceps-flexed"
            variant="subtle"
          />
        </SettingsItem>

        <SettingsItem
          v-if="config.comment"
          :title="t('modal.checkActivity.comment')"
          class="text-sm "
        >
          <UTextarea v-model="commentTraining" class="w-full" disabled />
        </SettingsItem>
      </div>
    </template>
    <template #footer>
      <UButton
        :label="t('modal.checkActivity.footer.delete')"
        :loading="isLoadingDelete"
        color="error"
        size="xl"
        variant="soft"
        @click="deleteActivity"
      />
    </template>
  </UModal>
</template>
