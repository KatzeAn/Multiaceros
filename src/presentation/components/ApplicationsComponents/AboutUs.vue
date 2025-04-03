<template>
  <div class="demo-collapse p-6 bg-gray-500 rounded-lg shadow-lg w-full">
    <el-collapse v-model="activeNames" @change="handleChange" class="space-y-4">
      <el-collapse-item 
        :title="t('conoceHicody')" 
        name="1" 
        class="bg-blue-100 text-blue-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div class="text-gray-700 p-4">
          {{ t('descripcionHicody') }}
        </div>
      </el-collapse-item>
      <el-collapse-item 
        :title="t('porqueTrabajar')" 
        name="2">
        <div class="text-gray-700 p-4">
          {{ t('porqueTrabajarTexto') }}
        </div>
      </el-collapse-item>
      <el-collapse-item 
        :title="t('mision')" 
        name="3">
        <div class="text-gray-700 p-4">
          {{ t('misionTexto') }}
        </div>
      </el-collapse-item>
      <el-collapse-item 
        :title="t('vision')" 
        name="4">
        <div class="text-gray-700 p-4">
          {{ t('visionTexto') }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
   <footer class="footer text-white py-6 mt-10">
      <div class="container mx-auto text-center">
        <div class="social-icons flex justify-center space-x-6 mb-4">
          <a
            href="https://www.facebook.com/profile.php?id=61563324682049"
            target="_blank"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/hicodyus?igsh=cjRhdzM4Y2ZxZGkw"
            target="_blank"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
</template>
  
  <script lang="ts" setup>
  
  
  import { ref } from 'vue'
  import type { CollapseModelValue } from 'element-plus'
  import { useI18n } from "vue-i18n";

  const { t } = useI18n()
  
  const activeNames = ref(['1'])
  const handleChange = (val: CollapseModelValue) => {
    console.log(val)
  }
  </script>
  
  <style scoped>
  .footer {
    color: gray;
  }
  .footer a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s;
  }
  .footer a:hover {
    color: #1e90ff;
  }
  .footer .social-icons i {
    font-size: 20px;
    transition: transform 0.3s;
  }
  .footer .social-icons i:hover {
    transform: scale(1.2);
  }
  .demo-collapse {
    background-color: #f9fafb; 
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .el-collapse-item {
    transition: all 0.3s ease-in-out; 
  }
  
  .el-collapse-item:hover {
    transform: translateY(-5px); 
  }
  
  .el-collapse-item .el-collapse-item__header {
    font-weight: bold; 
  }
  
  .el-collapse-item .el-collapse-item__content {
    background-color: gray; 
    padding: 15px;
    border-radius: 8px;
  }
  
  .el-collapse-item .el-collapse-item__content > div {
    font-size: 16px;
    line-height: 1.6;
    color: #4b5563;
  }
  </style>
  