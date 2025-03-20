import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: 'Welcome to my app',
    language: 'Language',
  },
  es: {
    welcome: 'Bienvenido a mi aplicación',
    language: 'Idioma',
  },
  fr: {
    welcome: 'Bienvenue dans mon application',
    language: 'Langue',
  },
};

const i18n = createI18n({
  locale: 'es', // Idioma predeterminado
  fallbackLocale: 'en', // Idioma de respaldo
  messages,
});

export default i18n;
