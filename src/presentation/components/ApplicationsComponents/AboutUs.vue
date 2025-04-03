<template>
  <div class="demo-collapse p-6 rounded-lg shadow-lg w-full">
    <el-collapse v-model="activeNames" @change="handleChange" class="space-y-4">
      <el-collapse-item
        v-for="(item, index) in collapseItems"
        :key="index"
        :title="t(item.title)"
        :name="String(index + 1)"
        class="collapse-item"
      >
        <div class="collapse-content">
          {{ t(item.text) }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

  <footer class="footer py-6 mt-10">
    <div class="container mx-auto text-center">
      <div class="social-icons flex justify-center space-x-6">
        <a v-for="(icon, index) in socialLinks" :key="index" :href="icon.url" target="_blank">
          <i :class="icon.class"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { CollapseModelValue } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const activeNames = ref(["1"]);

const handleChange = (val: CollapseModelValue) => console.log(val);

const collapseItems = [
  { title: "conoceHicody", text: "descripcionHicody" },
  { title: "porqueTrabajar", text: "porqueTrabajarTexto" },
  { title: "mision", text: "misionTexto" },
  { title: "vision", text: "visionTexto" },
];

const socialLinks = [
  { class: "fab fa-facebook-f", url: "https://www.facebook.com/profile.php?id=61563324682049" },
  { class: "fab fa-instagram", url: "https://www.instagram.com/hicodyus?igsh=cjRhdzM4Y2ZxZGkw" },
];
</script>

<style scoped>
.demo-collapse {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.collapse-item {
  background-color: #f8fafc; /* Blanco con un leve tono gris */
  color: #1f2937; /* Texto oscuro */
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}

.collapse-item:hover {
  transform: translateY(-3px);
}

.collapse-content {
  background-color: white;
  padding: 15px;
  border-radius: 6px;
  color: #4b5563;
}

.footer a {
  text-decoration: none;
  color: gray;
  transition: color 0.3s;
}

.footer a:hover {
  color: #2a303a;
}

.footer .social-icons i {
  font-size: 20px;
  transition: transform 0.3s;
}

.footer .social-icons i:hover {
  transform: scale(1.2);
}
</style>
