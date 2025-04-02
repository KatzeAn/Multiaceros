<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo w-full shadow-md"
    mode="horizontal"
    background-color="white"
    text-color="#2A3D66"
    active-text-color="#2A3D66"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="logo">
      <img :src="logo" alt="Logo" class="logo-img" />
    </el-menu-item>

    <el-menu-item index="1" @click="navigateTo('vacantes')">
      <el-icon><Briefcase /></el-icon> {{ t('vacantes') }}
    </el-menu-item>

    <el-menu-item index="2" @click="navigateTo('sobreNosotros')">
      <el-icon><InfoFilled /></el-icon> {{ t('sobreNosotros') }}
    </el-menu-item>

    <div class="ml-auto flex items-center gap-4">
      <LanguageSwitcher />
    </div>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { Briefcase, InfoFilled } from "@element-plus/icons-vue";
import logo from "@/presentation/assets/vertical.png";
import LanguageSwitcher from "@/presentation/components/LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const activeIndex = ref("1");
const emit = defineEmits(["navigate"]);

const navigateTo = (section) => {
  emit("navigate", section);
};

const handleSelect = (key) => {
  activeIndex.value = key;
};
</script>

<style scoped>
.el-menu-demo {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  gap: 1rem;
  flex-wrap: wrap; /* Permite que los elementos se acomoden en varias líneas si es necesario */
}


.logo {
  padding: 0 15px;
  cursor: pointer;
}

.logo-img {
  height: 40px;
}

.el-menu-item:hover,
.el-sub-menu__title:hover {
  background-color: #3C4E80;
}
</style>
