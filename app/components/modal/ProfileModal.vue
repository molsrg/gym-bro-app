<script lang="ts" setup>
defineProps<{
  userInfo: object
}>()

defineEmits(['close'])
</script>

<template>
  <UModal>
    <template #header>
      <div class="flex items-start justify-between w-full">
        <div class="flex items-center justify-between gap-3">
          <UAvatar :alt="userInfo.username || ''" :src="userInfo.photo_url || ''" size="xl" />
          <div class="flex flex-col items-start justify-between gap-1">
            <UBadge color="primary" variant="soft">
              @ {{ userInfo.username }}
            </UBadge>
            <UBadge v-if="userInfo.count" color="neutral" variant="outline" trailing-icon="ic:round-star-border">
              {{ userInfo.count }}
            </UBadge>
            <USkeleton v-else class="h-4 w-[200px]" />
          </div>
        </div>

        <UButton color="neutral" icon="i-heroicons-x-mark-20-solid" variant="ghost" @click="$emit('close')" />
      </div>
    </template>
    <template #body>
      <Placeholder class="h-48" />
    </template>
  </UModal>
</template>
