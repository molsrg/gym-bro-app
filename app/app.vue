<script lang="ts" setup>
import { useViewport } from 'vue-tg'

const app = useAppConfig()
onMounted(async () => {
  await useLocaleStore().init()
})

const marginTopCalculate = computed(() => {
  const { contentSafeAreaInset } = useViewport()
  return `${contentSafeAreaInset.value.top * 1.8}px`
})
</script>

<template>
  <div :style="{ marginTop: marginTopCalculate }">
    <UApp :toaster="app.toaster">
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator color="#00d492" />
      <NuxtLayout>
        <div class="mx-auto max-w-[95%] mt-2">
          <NuxtPage />
        </div>
      </NuxtLayout>
    </UApp>
  </div>
</template>
