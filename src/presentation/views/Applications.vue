<template>
  <div id="app" class="app flex h-screen bg-cover bg-center relative" style="background-image: url('/src/presentation/assets/historia.png');">
    <!-- Botón de Configuración -->
    <button @click="showSettings = !showSettings" class="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-md">
      <span class="material-symbols-outlined text-3xl">settings</span>
    </button>

    <div v-if="showSettings" class="absolute top-16 right-4   rounded-lg shadow-md">
      <LanguageSwitcher />
    </div>

    <div class="flex-1 flex flex-col justify-center items-center md:items-start bg-gray-900 bg-opacity-70 p-6 md:p-12">
      <div v-if="!currentSection" class="text-left mb-8">
        <p class="text-white text-sm uppercase tracking-widest">Trabajamos duro, jugamos duro</p>
        <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
          Trabaja con <br /> nosotros
        </h1>
      </div>

      <!-- Sección de opciones -->
      <div v-if="!currentSection" class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <!-- Opción "Sobre Nosotros" -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer transition-transform transform hover:scale-105"
             @click="currentSection = 'sobreNosotros'">
          <span class="material-symbols-outlined text-5xl text-gray-700">diversity_3</span>
          <h2 class="text-xl font-semibold mt-2">{{ t('sobreNosotros') }}</h2>
        </div>

        <!-- Opción "Vacantes Disponibles" -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer transition-transform transform hover:scale-105"
             @click="currentSection = 'vacantes'">
          <span class="material-symbols-outlined text-5xl text-gray-700">engineering</span>
          <h2 class="text-xl font-semibold mt-2">{{ t('vacanciesAvailable') }}</h2>
        </div>
      </div>

      <!-- Sección "Sobre Nosotros" -->
      <div v-if="currentSection === 'sobreNosotros'" class="mt-10 w-full ">
        <button @click="currentSection = null" class="text-white underline mb-4">&larr; Volver</button>
        <AboutUs />
      </div>

      <!-- Sección "Vacantes Disponibles" -->
      <div v-if="currentSection === 'vacantes'" class="mt-10 text-center">
        <button @click="currentSection = null" class="text-white underline mb-4">&larr; Volver</button>
        <h1 class="text-3xl font-bold text-white">{{ t('vacanciesAvailable') }}</h1>
        <p class="mt-2 text-gray-300">{{ t('findOpportunity') }}</p>
        <div class="">
          <JobCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import JobCard from '../components/ApplicationsComponents/JobCard.vue';
import AboutUs from '../components/ApplicationsComponents/AboutUs.vue';
import LanguageSwitcher from "@/presentation/components/LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";
import { ref } from 'vue';

const { t } = useI18n();
const currentSection = ref(null);
const showSettings = ref(false);
</script>

<style scoped>
#app {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
