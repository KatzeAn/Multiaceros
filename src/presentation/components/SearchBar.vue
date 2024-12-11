<template>
  <div class="search-bar">
    <!-- Aquí puedes agregar el ícono de la lupa -->
    <input type="text" v-model="query" placeholder="Buscar certificado..." @input="onSearch" />
    <span class="material-symbols-outlined">
      search
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "SearchBar",
  data() {
    return {
      query: "", // Estado para almacenar la entrada del usuario
    };
  },
  methods: {
    onSearch() {
      // Emitimos un evento para el componente padre con el término de búsqueda
      this.$emit('search', this.query);
    },
  },
};
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.search-icon {
  margin-right: 10px;
  color: #888;
}

input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
}
</style>
