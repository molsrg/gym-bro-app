<script lang="ts" setup>
const error = useError()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div
    class="flex justify-center items-center px-6 h-[100vh] w-full bg-cover bg-center bg-no-repeat bg-img"
  >
    <div class="text-center flex flex-col gap-4 items-center">
      <p class="text-[9.5rem] text-info ">
        {{ error.statusCode }}
      </p>
      <p class=" tx-title-1">
        {{ error.message }}
      </p>
      <UButton
        :label="$t('general.error.redirect')"
        class="mt-4"
        color="neutral"
        size="xl"
        variant="solid"
        @click="handleError"
      />
    </div>
  </div>
</template>
