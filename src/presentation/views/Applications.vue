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
          <Carousel />
          </div>
        </div>
  
        <div v-if="currentSection === 'vacantes'" id="vacantes" class="vacantes-section mt-10">
          <h1 class="text-center text-3xl font-bold">Vacantes Disponibles</h1>
          <p class="text-center mt-2 text-gray-600">
            Encuentra la oportunidad ideal para unirte a nuestro equipo.
          </p>
          <div class="job-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <JobCard
              v-for="(job, index) in jobs"
              :key="index"
              :jobTitle="job.title"
              :companyName="job.company"
              :location="job.location"
              :jobType="job.type"
              :description="job.description"
            />
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
  
  const jobs = [
    {
      title: 'Desarrollador Frontend',
      company: 'Hicody',
      location: 'Remoto',
      type: 'Tiempo parcial',
      description:'Trabaja en proyectos enfoncandose en la parte del cliente, interfaz de usuario y experiencia del usuario.',
    },
    {
      title: 'Desarrollador Backend',
      company: 'Hicody',
      location: 'presencial',
      type: 'Jornada completa',
      description: 'Trabaja enfocandose en la parte de el servidor, base de datos y lógica de negocio.',
    },
    {
      title: 'Desarrollador Fullstack',
      company: 'Hicody',
      location: 'presencial',
      type: 'Jornada completa',
      description: 'Combina habilidades de Backend y de Frontend para desarrollar aplicaciones completas.',
    },
    {
      title: 'Desarrolador de inteligencia artificial',
      company: 'Hicody',
      location: 'Remoto',
      type: 'Tiempo parcial',
      description: 'Trabaja en la creación de modelos de aprendizaje automático .',
    },
    {
      title: 'Diseñador UX/UI',
      company: 'Hicody',
      location: 'presencial',
      type: 'Jornada completa',
      description: 'Trabaja diseñando y desarrollando experiencias de usuario intuitivas.',
    },
    {
      title: 'Gerente de proyectos',
      company: 'Hicody',
      location: 'Remoto',
      type: 'Jornada completa',
      description: 'Planifica, organiza y supervisa proyectos para asegurarse de que se completen a tiempo y dentro del presupuesto.',
    },
  ];
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
  </style>
  