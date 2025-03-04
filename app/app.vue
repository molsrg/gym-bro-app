<script lang="ts" setup>
import { useViewport } from 'vue-tg'
import { LoadingIndicator } from '~/components/nuxt'

const app = useAppConfig()
onMounted(async () => {
  await useLocaleStore().init()
})

const marginTopCalculate = computed(() => {
  const { contentSafeAreaInset } = useViewport()
  return `${contentSafeAreaInset.value.top * 1.9}px`
})
</script>

<template>
  <div :style="{ paddingTop: marginTopCalculate, paddingBottom: '10px' }">
    <UApp :toaster="app.toaster">
      <NuxtRouteAnnouncer />
      <LoadingIndicator color="#00d492" :style="{ top: marginTopCalculate }" />
      <NuxtLayout>
        <div class="mx-auto max-w-[95%] mt-2">
          <NuxtPage />
        </div>
      </NuxtLayout>
    </UApp>
  </div>
</template>
