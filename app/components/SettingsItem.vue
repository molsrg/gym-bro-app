<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    :class="props.class"
    class="flex flex-col items-start"
  >
    <h3 class="font-semibold">
      {{ props.title }}
    </h3>
    <USeparator class="mb-2" />
    <slot />
  </div>
</template>
