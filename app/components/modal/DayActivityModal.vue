<script lang="ts" setup>
import { muscleGroups, satisfactionColor } from '~/constants/activity/dayActivity'
import { extractDateComponents } from '~/helpers/calendar.helper'

const props = defineProps<{
  date: object
}>()

const slideover = useSlideover()
const { t } = useI18n()

const isCustomActivityVisible = ref(false)
const isCommentVisible = ref(false)
const isLoadingSubmit = ref(false)

const satisfaction = ref(8)
const selectedMuscleGroups = ref<number[]>([])
const customActivity = ref('')
const commentTraining = ref('')

const disabledButtonSubmit = computed(() => {
  if (isCustomActivityVisible.value && customActivity.value.length === 0) {
    return true
  }
  if (isCommentVisible.value && commentTraining.value.length === 0) {
    return true
  }
  return selectedMuscleGroups.value.length === 0 && !isCustomActivityVisible.value
})

function toggleMuscleGroup(id: number) {
  selectedMuscleGroups.value = !selectedMuscleGroups.value.includes(id)
    ? [...selectedMuscleGroups.value, id]
    : selectedMuscleGroups.value.filter(groupId => groupId !== id)
}

async function submitForm() {
  isLoadingSubmit.value = true

  const payload = {
    dayData: {
      satisfaction: satisfaction.value,
      date: extractDateComponents(props.date),
      ...(selectedMuscleGroups.value.length > 0 && { muscleGroups: selectedMuscleGroups.value }),
      ...(commentTraining.value && { comment: commentTraining.value }),
      ...(customActivity.value && { customActivity: customActivity.value }),
    },
  }

  try {
    await useActiveStore().createCheckIn(payload)
    resetModal()
    await slideover.close()
    await useActiveStore().getCheckIns()
  }
  catch (error) {
    console.error('Error submitting form:', error)
  }
  finally {
    isLoadingSubmit.value = false
  }
}

function resetModal() {
  isLoadingSubmit.value = false
  isCommentVisible.value = false
  isCustomActivityVisible.value = false
  commentTraining.value = ''
  customActivity.value = ''
  satisfaction.value = 8
  selectedMuscleGroups.value = []
}
</script>

<template>
  <USlideover
    :description="t('modal.mainActive.description', { date })"
    :dismissible="false"
    :title="t('modal.mainActive.title')"
    side="bottom" @update:open="resetModal"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <SettingsItem
          :title="t('modal.mainActive.satisfaction')"
          class="text-sm"
        >
          <USlider
            v-model="satisfaction"
            :max="10"
            :min="1"
          />
        </SettingsItem>
        <UAvatar
          :class="satisfactionColor(satisfaction)"
          :text="satisfaction.toString()"
          :ui="{
            fallback: 'text-white',
            root: 'opacity-80',
          }"
          class="mx-auto"
          size="3xl"
        />
        <SettingsItem
          :title="t('modal.mainActive.muscleGroup')"
          class="text-sm"
        >
          <div class="flex flex-wrap gap-1 justify-evenly">
            <UButton
              v-for="group in muscleGroups"
              :key="group.id"
              :color="group.color"
              :icon="group.icon"
              :variant="selectedMuscleGroups.includes(group.id) ? 'subtle' : 'ghost'"
              @click="toggleMuscleGroup(group.id)"
            >
              {{ t(group.label) }}
            </UButton>
          </div>
        </SettingsItem>

        <USeparator :label="$t('modal.planning.or')" />

        <div class="flex flex-col gap-2">
          <UCollapsible
            :open="isCustomActivityVisible"
            :ui="{ root: 'flex gap-1 flex-col', content: 'flex gap-2 flex-col' }"
            :unmount-on-hide="false"
          >
            <USwitch v-model="isCustomActivityVisible" :label="t('modal.mainActive.customActivity.switch')" />
            <template #content>
              <p
                class="text-justify text-sm text-gray-500 "
                v-html="t('modal.mainActive.customActivity.description')"
              />
              <UInput v-model="customActivity" :placeholder="t('modal.mainActive.customActivity.placeholder')" />
            </template>
          </UCollapsible>

          <UCollapsible
            :open="isCommentVisible"
            :ui="{
              root: 'flex gap-1 flex-col', content: 'mt-2 flex flex-col' }" :unmount-on-hide="false"
          >
            <USwitch v-model="isCommentVisible" :label="t('modal.mainActive.commentTraining.switch')" />

            <template #content>
              <UTextarea
                v-model="commentTraining" :placeholder="t('modal.mainActive.commentTraining.placeholder')"
                autoresize maxrows="10"
              />
            </template>
          </UCollapsible>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 mb-2">
        <UButton
          :disabled="disabledButtonSubmit"
          :label="t('modal.mainActive.footer.submit')"
          :loading="isLoadingSubmit"
          color="success"
          size="xl"
          variant="soft"
          @click="submitForm"
        />
      </div>
    </template>
  </USlideover>
</template>
