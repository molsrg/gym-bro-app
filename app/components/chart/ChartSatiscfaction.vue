<script setup>
import Chart from 'primevue/chart'

const props = defineProps({
  datasets: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Activity Data',
      data: [],
      fill: true,
      tension: 0.4,
      borderColor: '#00d492',
      backgroundColor: 'rgba(0, 212, 146, 0.2)',
      pointBackgroundColor: '#00d492',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00d492',
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(150, 150, 150, 0.2)',
      },
      ticks: {
        color: 'rgba(150, 150, 150, 0.8)',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
})

watchEffect(() => {
  if (props.datasets) {
    chartData.value.labels = Array.from({ length: props.datasets.length }, (_, i) => `Day ${i + 1}`)
    chartData.value.datasets[0].data = props.datasets
  }
})
</script>

<template>
  <Chart
    :data="chartData"
    :options="chartOptions"
    class="h-[35vh]" type="line"
  />
</template>
