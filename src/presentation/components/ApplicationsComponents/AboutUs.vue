<template>
    <div class="demo-collapse p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <el-collapse v-model="activeNames" @change="handleChange" class="space-y-4">
        <el-collapse-item 
          title="Conoce Hicody" 
          name="1" 
          class="bg-blue-100 text-blue-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div class="text-gray-700 p-4">
            En Hicody, somos un equipo apasionado por crear soluciones innovadoras en el mundo del desarrollo de software. Nos dedicamos a construir proyectos que marcan la diferencia.
          </div>
        </el-collapse-item>
        <el-collapse-item 
          title="¿Por Qué Trabajar en Hicody?" 
          name="2" 
          class="bg-green-100 text-green-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div class="text-gray-700 p-4">
            En Hicody ofrecemos un ambiente de trabajo dinámico donde puedes crecer profesionalmente mientras participas en proyectos desafiantes e innovadores. Valoramos la flexibilidad laboral y brindamos atractivos beneficios para garantizar que nuestros colaboradores se sientan motivados y respaldados.
          </div>
        </el-collapse-item>
        <el-collapse-item 
          title="Misión" 
          name="3" 
          class="bg-yellow-100 text-yellow-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div class="text-gray-700 p-4">
            En Hicody, nuestra misión es transformar ideas innovadoras en soluciones tecnológicas que impacten positivamente a empresas y personas, promoviendo la excelencia, la colaboración y el crecimiento profesional dentro de un entorno creativo y flexible.
          </div>
        </el-collapse-item>
        <el-collapse-item 
          title="Visión" 
          name="4" 
          class="bg-purple-100 text-purple-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div class="text-gray-700 p-4">
            Ser líderes en tecnología, ofreciendo soluciones disruptivas y un entorno de trabajo inclusivo que fomente el aprendizaje continuo, el crecimiento profesional y el compromiso con la calidad, impulsando la innovación y creando relaciones duraderas con clientes y colaboradores.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
     <footer class="footer bg-black text-white py-6 mt-10">
        <div class="container mx-auto text-center">
          <div class="social-icons flex justify-center space-x-6 mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=61563324682049"
              target="_blank"
              class="hover:text-blue-500"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/hicodyus?igsh=cjRhdzM4Y2ZxZGkw"
              target="_blank"
              class="hover:text-pink-500"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.twitter.com/tuempresa"
              target="_blank"
              class="hover:text-blue-400"
            >
              <i class="fab fa-twitter"></i>
            </a>
             <a
                href="contact@redhatsolutions.com"
                target="_blank"
                class="hover:text-red-500"
              >
                <i class="fas fa-envelope"></i>
              </a>
  
            <a
              href="https://www.youtube.com/tuempresa"
              target="_blank"
              class="hover:text-red-600"
            >
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
  </template>
  
  <script lang="ts" setup>
  
  
  import { ref } from 'vue'
  import type { CollapseModelValue } from 'element-plus'
  
  const activeNames = ref(['1'])
  const handleChange = (val: CollapseModelValue) => {
    console.log(val)
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #ebebeb;
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
    background-color: #fff; 
    padding: 15px;
    border-radius: 8px;
  }
  
  .el-collapse-item .el-collapse-item__content > div {
    font-size: 16px;
    line-height: 1.6;
    color: #4b5563;
  }
  </style>
  