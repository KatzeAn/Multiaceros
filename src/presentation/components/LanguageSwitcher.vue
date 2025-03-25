<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLocale = ref(locale.value); // Inicializar con el valor actual

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
  location.reload();
};
</script>
<template>
  <div class="w-40">
    <el-select v-model="selectedLocale" @change="changeLanguage">
      <el-option value="es">
        <div class="flex items-center">
          <img src="https://flagcdn.com/20x15/es.png" alt="Bandera de España" class="mr-2" />
          <span>Español</span>
        </div>
      </el-option>
      <el-option value="en">
        <div class="flex items-center">
          <img src="https://flagcdn.com/20x15/gb.png" alt="Bandera de Reino Unido" class="mr-2" />
          <span>English</span>
        </div>
      </el-option>
      <el-option value="fr">
        <div class="flex items-center">
          <img src="https://flagcdn.com/20x15/fr.png" alt="Bandera de Francia" class="mr-2" />
          <span>Français</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>