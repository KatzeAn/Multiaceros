<template>
    
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Imagen del carrusel" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </template>
  
  <script setup>
  const images = [    
  new URL('@/presentation/assets/centro.jpg', import.meta.url).href,
  new URL('@/presentation/assets/imagen1.jpg', import.meta.url).href,
  new URL('@/presentation/assets/imagen2.jpg', import.meta.url).href,
  new URL('@/presentation/assets/imagen3.jpg', import.meta.url).href,
  new URL('@/presentation/assets/imagen4.jpg', import.meta.url).href,
  new URL('@/presentation/assets/imagen5.jpg', import.meta.url).href,
];

  </script>
  
  <style scoped>
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  
  