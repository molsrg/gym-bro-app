<script setup lang="ts">
const props = defineProps({
  throttle: {
    type: Number,
    default: 200,
  },
  duration: {
    type: Number,
    default: 2000,
  },
  height: {
    type: Number,
    default: 3,
  },
  color: {
    type: [String, Boolean],
    default: 'repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)',
  },
  errorColor: {
    type: String,
    default: 'repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)',
  },
  estimatedProgress: {
    type: Function,
    required: false,
  },
  style: {
    type: Object,
    default: () => ({}),
  },
})

const { progress, isLoading, error } = useLoadingIndicator({
  duration: props.duration,
  throttle: props.throttle,
  estimatedProgress: props.estimatedProgress,
})
</script>

<template>
  <div
    class="custom-loading-indicator"
    :style="{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      pointerEvents: 'none',
      width: 'auto',
      height: `${height}px`,
      opacity: isLoading ? 1 : 0,
      background: error ? errorColor : color,
      backgroundSize: `${(100 / progress) * 100}% auto`,
      transform: `scaleX(${progress}%)`,
      transformOrigin: 'left',
      transition: 'transform 0.1s, height 0.4s, opacity 0.4s',
      zIndex: 999999,
      ...style,
    }"
  />
</template>
