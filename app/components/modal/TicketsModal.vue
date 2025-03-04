<script lang="ts" setup>
import { ticketsTopic } from '~/constants/app/settings'

const modal = useModal()
const { t } = useI18n()

const selectedTopic = ref(ticketsTopic[0])
const topicContent = ref('')

const isLoadingButton = ref(false)
const isDisabledButton = computed(() => {
  return !selectedTopic.value || !topicContent.value.trim()
})

async function submit() {
  isLoadingButton.value = true
  const supportTicketData = {
    topic: selectedTopic.value.value,
    content: topicContent.value,
    systemInfo: {
      tgVersion: useTgWebAppStore().webAppData.version,
      language: useLocaleStore().locale,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localeTime: new Date().toLocaleString(),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      currentPage: window.location.pathname,
    },
  }
  await useAppStore().sendSupportTicket(supportTicketData)
  await modal.close()
  reset()
}

function reset() {
  isLoadingButton.value = false
  selectedTopic.value = ticketsTopic[0]
  topicContent.value = ''
}
</script>

<template>
  <UModal
    :description="t('modal.support.description')"
    :title="t('modal.support.title')"
  >
    <template #body>
      <div class="mb-3 flex flex-col gap-1">
        <p class="text-sm font-semibold dark:text-white">
          {{ t('modal.support.topic.label') }}
        </p>

        <USelectMenu
          v-model="selectedTopic"
          :items="ticketsTopic"
          :search-input="false"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
        >
          <template #leading="{ ui }">
            <UChip
              v-if="selectedTopic"
              :class="ui.itemLeadingChip()"
              :size="ui.itemLeadingChipSize()"
              inset
              standalone
              v-bind="selectedTopic.chip"
            />
          </template>
          <template #item-label="{ item }">
            {{ t(item.label) }}
          </template>
          <template #default="{ modelValue }">
            {{ t(modelValue.label) }}
          </template>
        </USelectMenu>
      </div>

      <UTextarea
        v-model="topicContent"
        :placeholder="t('modal.support.textarea.placeholder')"
        class="mb-3 w-full"
        variant="outline"
      />
    </template>
    <template #footer>
      <UButton
        :disabled="isDisabledButton"
        :label="t('modal.support.button.submit')"
        :loading="isLoadingButton"
        color="success"
        size="md"
        variant="soft"
        @click="submit"
      />
    </template>
  </UModal>
</template>
