<script lang="ts" setup>
interface Props {
  datasets?: object
}

const props = withDefaults(defineProps<Props>(), {
  datasets: () => ({}),
})

const { t } = useI18n()
const chartData = computed(() => ({
  labels: props.datasets?.months?.map(month => t(`calendar.month.${month}`)) || [],
  datasets: [
    {
      label: t('chart.progress.label.myProgress'),
      data: props.datasets?.userAverages || [],
      backgroundColor: 'rgba(0, 212, 146, 0.2)',
      borderColor: '#00d492',
      borderWidth: 1,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#00d492',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00d492',
    },
    {
      label: t('chart.progress.label.otherProgress'),
      data: props.datasets?.totalAverages || [],
      backgroundColor: 'rgba(96, 152, 207, 0.6)',
      borderColor: 'rgb(96, 152, 207)',
      borderWidth: 1,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(96, 152, 207)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(96, 152, 207)',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'gray',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      type: 'category',
      ticks: {
        color: 'gray',
        font: {
          weight: 900,
        },
      },
    },
    y: {
      type: 'linear',
      ticks: {
        color: 'gray',
        font: {
          weight: 900,
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
  },
  animation: {
    duration: 1200,
    easing: 'easeInOutQuad',
  },
  interaction: {
    intersect: false,
  },
}
</script>

<template>
  <Chart
    :data="chartData"
    :options="chartOptions"
    class="h-[45vh]"
    type="bar"
  />
</template>
