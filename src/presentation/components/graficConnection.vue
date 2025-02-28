<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartCanvas = ref(null);

const chartData = {
  labels: [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00", "23:00"
  ],
  datasets: [
    {
      label: "Conexiones por Hora",
      data: [5, 3, 2, 2, 1, 0, 0, 4, 10, 20, 30, 40, 50, 60, 55, 45, 35, 40, 50, 60, 55, 30, 20, 10],
      borderColor: "blue",
      backgroundColor: "rgba(0, 0, 255, 0.2)",
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    x: { title: { display: true, text: "Hora" } },
    y: { title: { display: true, text: "Cantidad de Conexiones" } },
  },
};

onMounted(() => {
  new Chart(chartCanvas.value, {
    type: "line",
    data: chartData,
    options: chartOptions,
  });
});
</script>

<template>
<div style="width: 500px; height: 200px;">
    <canvas ref="chartCanvas"></canvas>
  </div></template>
