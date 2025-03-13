<template>
  <div id="app" class="app flex h-screen">  
    <SidebarApplications class="w-64" />
    <div class="flex-1 flex flex-col"> 
      <NavbarApplications @navigate="setCurrentSection" />
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
import JobCard from '../components/ApplicationsComponents/JobCard.vue';
import { ref } from 'vue';
import AboutUs from '../components/ApplicationsComponents/AboutUs.vue';

const currentSection = ref('vacantes');

const setCurrentSection = (section) => {
currentSection.value = section;
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

.font-source {
font-family: 'Source Code Pro', monospace;
}
</style>
