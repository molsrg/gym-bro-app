<script setup>
import Chart from 'primevue/chart'

const props = defineProps({
  datasets: {
    type: Object,
    required: false,
    default: () => ({}),
  },

})

const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: 'rgba(0, 212, 146, 0.6)',
      borderColor: '#00d492',
      borderWidth: 2,
      pointBackgroundColor: '#00d492',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00d492',
    },
  ],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    r: {
      angleLines: {
        color: 'gray',
      },
      grid: {
        color: 'gray',
      },
      pointLabels: {
        color: 'white',
        font: {
          size: 13,
        },
      },
      ticks: {
        display: false,
      },
    },
  },
}

watchEffect(() => {
  if (props.datasets) {
    chartData.value.labels = Object.keys(props.datasets)
    chartData.value.datasets[0].data = Object.values(props.datasets)
  }
})
</script>

<template>
  <Chart
    :data="chartData"
    :options="chartOptions"
    class="h-[45vh]"
    type="radar"
  />
</template>
