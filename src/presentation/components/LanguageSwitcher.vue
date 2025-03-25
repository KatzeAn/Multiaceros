<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('lang', lang); // Guardar preferencia
  location.reload(); // Recargar para aplicar el cambio correctamente
};
</script>

<template>
  <select v-model="locale" @change="changeLanguage(locale)">
    <option value="es">Español</option>
    <option value="en">English</option>
    <option value="fr">Français</option>
  </select>
</template>
