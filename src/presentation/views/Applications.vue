<template>
    <div id="app" class="app flex">
      <SidebarApplications class="w-64" />
      <div class="flex-1">
        <NavbarApplications @navigate="setCurrentSection" />
        <WhatsappIcon />
  
        <div v-if="currentSection === 'inicio'" id="inicio" class="inicio-section mt-10 bg-gray-100 p-6 rounded-lg shadow">
          <h1 class="text-center text-4xl font-bold text-blue-600 font-source">
            Bienvenido a Nuestra Página
          </h1>
          <p class="text-center mt-4 text-gray-700 text-lg font-source">
            Explora nuestras oportunidades laborales y únete a nuestro equipo de trabajo.
          </p>
  
          <div class="mt-10">
             <div class="carousel-wrapper" style="width: 100%; height: 60vh;">
              <Carousel v-if="currentSection === 'inicio'" :key="currentSection" /></div>
          </div>
        </div>
  
        <div v-show="currentSection === 'vacantes'" id="vacantes" class="vacantes-section mt-10">
          <h1 class="text-center text-3xl font-bold">Vacantes Disponibles</h1>
          <p class="text-center mt-2 text-gray-600">
            Encuentra la oportunidad ideal para unirte a nuestro equipo.
          </p>
          <div class="job-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <JobCard/>

          </div>
        </div>
        <div v-if="currentSection === 'sobreNosotros'" id="sobre-nosotros" class="sobre-nosotros-section mt-10 ml-4">
          <AboutUs />
        </div>
        </div>
    </div>
  </template>
  
  <script setup>
import SidebarApplications from "../components/ApplicationsComponents/SidebarApplications.vue";
import NavbarApplications from '../components/ApplicationsComponents/NavbarApplications.vue';
  import Carousel from '../components/ApplicationsComponents/Carousel.vue';
  import JobCard from '../components/ApplicationsComponents/JobCard.vue';
  import WhatsappIcon from '../components/ApplicationsComponents/WhatsappIcon.vue';
  import { ref } from 'vue';
  import AboutUs from '../components/ApplicationsComponents/AboutUs.vue';
  
  const currentSection = ref('inicio');
  
  const setCurrentSection = (section) => {
    currentSection.value = section;
  };
  
 
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');
  
  .font-source {
    font-family: 'Source Code Pro', monospace;
  }
  
  .inicio-section h1 {
    font-size: 3rem; 
    font-weight: 600; 
    color: #1e40af; 
  }
  
  .inicio-section p {
    font-size: 1.25rem; 
    color: #4b5563; 
    line-height: 1.75; 
  }

  .carousel-wrapper {
  height: 400px; /* Ajusta la altura según sea necesario */
  width: 100%;
}
  </style>
  