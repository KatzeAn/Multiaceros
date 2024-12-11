<template>
    <div :class="['card', colorClass]" :style="{ width: width, height: height }">
      <div class="card-header flex justify-center">
        <slot name="header"></slot>
      </div>
      <div class="card-content">
        <slot></slot>
      </div>
      <div class="card-footer" v-if="showFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      color: {
        type: String,
        default: 'white', // Color de fondo predeterminado
      },
      width: {
        type: String,
        default: '300px', // Ancho por defecto
      },
      height: {
        type: String,
        default: 'auto', // Altura por defecto
      },
      showFooter: {
        type: Boolean,
        default: false, // Para mostrar u ocultar el pie de la card
      },
    },
    computed: {
      colorClass() {
        return `bg-${this.color}`; // Asignar la clase de color
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--color);
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card-header {
    font-weight: bold;
    margin-bottom: 8px;
    
  }
  
  .card-content {
    flex-grow: 1;
  }
  
  .card-footer {
    margin-top: 8px;
    text-align: right;
    font-size: 0.9em;
    color: gray;
  }
  
  /* Ejemplo de colores personalizados */
  .bg-white {
    background-color: white;
  }
  
  .bg-blue {
    background-color: var(--info-alt-color);
  }
  
  .bg-gray {
    background-color: #dddddd;
  }
  </style>