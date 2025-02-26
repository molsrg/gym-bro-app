<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})
const { t } = useI18n()
</script>

<template>
  <div class="relative">
    <div class="flex flex-col gap-1">
      <h3 class="text-[var(--ui-text-highlighted)] font-semibold">
        {{ label }}
      </h3>
      <slot />
    </div>

    <div
      v-if="disabled"
      class="absolute inset-0 flex items-center justify-center  text-center  font-semibold bg-black opacity-80 text-white"
    >
      {{ t('chart.progress.emptyData') }}
    </div>
  </div>
</template>
