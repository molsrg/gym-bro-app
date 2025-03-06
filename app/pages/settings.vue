<script lang="ts" setup>
import { useCloudStorage } from 'vue-tg/latest'

import { TicketsModal } from '~/components/modal'
import { language } from '~/constants/app/language'
import { useQuestions } from '~/constants/app/questions'

const { t, setLocale } = useI18n()
const modal = useOverlay()
// Language
const selectedLanguage = computed({
  get: () => useLocaleStore().locale,
  set: async (newLang) => {
    setLocale(newLang)
    useLocaleStore().setLocale(newLang)
    await useCloudStorage().setItem('locale', newLang)
  },
})

// AppSettings
const appSettingsState = ref([
  {
    id: 1,
    titleKey: 'settings.app.calendarAlert',
    value: useAppStore().isAppSettings(1),
  },
  {
    id: 3,
    titleKey: 'settings.app.chartAlert',
    value: useAppStore().isAppSettings(3),
  },
  {
    id: 2,
    titleKey: 'settings.app.SunIsFirst',
    value: useAppStore().isAppSettings(2),
  },

])

appSettingsState.value.forEach((setting) => {
  watch(
    () => setting.value,
    () => {
      useAppStore().changeAppSettings(setting.id)
    },
  )
})

// Questions
const { questions } = useQuestions()
</script>

<template>
  <div class="flex flex-col gap-2">
    <SettingsItem :title="t('settings.language.title')">
      <URadioGroup
        v-model="selectedLanguage"
        :items="language"
        orientation="horizontal"
      />
    </SettingsItem>

    <SettingsItem :title="t('settings.app.title')">
      <div class="flex flex-col gap-2">
        <USwitch
          v-for="setting in appSettingsState"
          :key="setting.id"
          v-model="setting.value"
          :label="t(setting.titleKey)"
        />
      </div>
    </SettingsItem>
    <SettingsItem :title="t('settings.tickets.title')">
      <UAccordion
        :items="questions"
        class="mt-[-12px]"
      />
    </SettingsItem>
  </div>

  <UButton
    class="fixed bottom-4 right-4 flex items-center justify-center rounded-full"
    color="primary"
    icon="i-heroicons-hand-raised"
    size="xl"
    variant="soft"
    @click="modal.open(TicketsModal)"
  />
</template>
