<script lang="ts" setup>
definePageMeta({
  middleware() {
    useRouter().replace('/')
  },
})
</script>

<template>
  <slot />
</template>
