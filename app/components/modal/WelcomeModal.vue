<script lang="ts" setup>
import { useCloudStorage } from 'vue-tg/latest'
import { language } from '~/constants/app/language'

defineProps<{
  user: object
}>()

const { t, setLocale } = useI18n()
const modal = useModal()

// Language
const selectedLanguage = computed({
  get: () => useLocaleStore().locale,
  set: async (newLang) => {
    setLocale(newLang)
    useLocaleStore().setLocale(newLang)
    await useCloudStorage().setItem('locale', newLang)
  },
})
</script>

<template>
  <UModal
    :title="t('modal.welcome.title', { name: user.first_name })"
    :ui="{
      footer: 'justify-center',
    }"
  >
    <template #body>
      <div class="flex flex-col gap-1">
        <h3 class="mb-2">
          {{ t('modal.welcome.body.title') }}
        </h3>
        <ul class="space-y-1 ml-3">
          <li class="flex items-center space-x-2">
            <span>📈</span>
            <span>{{ t('modal.welcome.body.list.1') }}</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>🤝</span>
            <span>{{ t('modal.welcome.body.list.3') }}</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>📊</span>
            <span>{{ t('modal.welcome.body.list.2') }}</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>💪</span>
            <span>{{ t('modal.welcome.body.list.4') }}</span>
          </li>
        </ul>
      </div>

      <SettingsItem :title="t('settings.language.title')" class="m-3">
        <URadioGroup
          v-model="selectedLanguage"
          :items="language"
          orientation="horizontal"
        />
      </SettingsItem>
    </template>

    <template #footer>
      <UButton
        :label="t('modal.welcome.footer.submit')"
        size="xl"
        variant="subtle"
        @click="modal.close()"
      />
    </template>
  </UModal>
</template>
