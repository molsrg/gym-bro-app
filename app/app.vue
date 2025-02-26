<script lang="ts" setup>
const app = useAppConfig()
onMounted(async () => {
  await useLocaleStore().init()
})
</script>

<template>
  <UApp :toaster="app.toaster">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#00d492" />
    <NuxtLayout>
      <div class="mx-auto max-w-[95%] mt-2">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </UApp>
</template>
