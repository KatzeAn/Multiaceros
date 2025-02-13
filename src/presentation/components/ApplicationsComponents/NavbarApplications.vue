<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1" @click="navigateTo('inicio')">Inicio</el-menu-item>
    <el-menu-item index="2" @click="navigateTo('vacantes')"
      >Vacantes</el-menu-item
    >
    <el-menu-item index="3" @click="navigateTo('sobreNosotros')"
      >Sobre Nosotros</el-menu-item
    >
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'; 
const activeIndex = ref("1");
const emit = defineEmits(["navigate"]);

const navigateTo = (section) => {
  emit("navigate", section);
};
</script>

<style scoped>
.el-menu-demo {
  background-color: #a7c7e7;
  color: #4c6b8a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  padding: 0 20px;
  justify-content: space-evenly;
}

.el-menu-item {
  color: #4c6b8a;
  font-size: 16px;
}

.el-menu-item:hover {
  background-color: #bcd9f1;
}

.el-menu-item.is-active {
  background-color: #a2c9e7;
}

.el-menu-demo {
  display: flex;
  width: 100%;
}

@media (max-width: 768px) {
  .el-menu-demo {
    justify-content: space-between;
  }
}
</style>
