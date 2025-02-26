<script lang="ts" setup>
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <UCard
    :class="[disabled ? 'opacity-45' : '']"
    :ui="{ body: 'flex flex-col gap-2 items-center justify-center p-2 px-4 ' }"
    class="w-[45%]"
  >
    <UIcon
      :name="iconName"
      class="size-20"
    />
    <UBadge
      :ui="{
        base: 'text-center',
      }"
      color="neutral"
      variant="soft"
    >
      {{ $t(name) }}
    </UBadge>
    <UBadge
      :ui="{
        base: 'text-center',
      }"
      color="neutral"
      size="sm"
      variant="outline"
    >
      {{ $t(condition) }}
    </UBadge>
  </UCard>
</template>
