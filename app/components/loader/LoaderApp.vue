<template>
  <div class="loader" role="status" aria-live="polite" aria-label="Loading" />
</template>

<style scoped>
.loader {
  width: 68px;
  height: 68px;
  border: 5px solid #fff;
  border-bottom-color: #4ade80;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
