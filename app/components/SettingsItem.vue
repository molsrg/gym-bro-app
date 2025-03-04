<script lang="ts" setup>
interface Props {
  title: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  class: '',
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
