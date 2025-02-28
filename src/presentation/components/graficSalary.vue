<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartCanvas = ref(null);

const chartData = {
  labels: ["$1M-$2M", "$2M-$3M", "$3M-$4M", "$4M-$5M", "$5M+"],
  datasets: [
    {
      label: "Número de empleados",
      data: [10, 15, 8, 5, 2],
      backgroundColor: ["red", "blue", "green", "purple", "orange"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
};

onMounted(() => {
  new Chart(chartCanvas.value, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
});
</script>

<template>
  <canvas ref="chartCanvas"></canvas>
</template>
