<template>
  <form class="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100" @submit.prevent="login()">
    <h1 class="text-5xl font-semibold">Portal HiCody</h1>
    <p class="font-medium text-lg text-gray-500 mt-4">!Bienvenido de vuelta! Por favor ingresa tus credenciales.</p>
    <div class="mt-8">
      <div>
        <label class="text-lg font-medium" for="form-email">Email</label>
        <input v-model="loginForm.email" type="email" id="form-email"
          class="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingresa tu email"
          required />
      </div>
      <div>
        <label class="text-lg font-medium" for="form-password">Contraseña</label>
        <input v-model="loginForm.password" type="password" id="form-password"
          class="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingresa tu contraseña"
          required />
      </div>
      <div class="mt-8 flex justify-between items-center">
        <div>
          <input type="checkbox" id="remember">
          <label class="ml-2 font-medium text-base" for="remember">Recuerdame por 30 dias</label>
        </div>
        <a class="font-medium text-base text-primary cursor-pointer" @click="dialogFormVisible = true">Olvidé mí contraseña</a>
      </div>
      <div class="mt-8 flex flex-col gap-y-4">
        <button v-loading="isLoading" type="submit"
          class="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-primary text-white text-lg font-bold">Iniciar
          Sesión</button>
      </div>
    </div>
    <p class="work-with-us">
      ¿Quieres trabajar con nosotros? 
      <router-link to="/applications">Haz clic aquí</router-link>
    </p>
  </form>
  <el-dialog v-model="dialogFormVisible" title="Restablecer contraseña" width="500">
    <el-form :model="form">
      <el-form-item label="Correo electrónico" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirmar
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from "vue-router";
  import { ElNotification } from 'element-plus'

  import { useAuthStore } from '../stores/auth.store';
  const { LoginWithEmailAndPassword, loginForm, resetForm } = useAuthStore();

  const router = useRouter();
  const isLoading = ref(false);
  const dialogFormVisible = ref(false)

  const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

  const login = async () => {
    isLoading.value = true; // Activar estado de carga
    try {
      const user = await LoginWithEmailAndPassword();
      if (user) {
        router.replace({ name: "home" });
      }
    } catch (error) {
      ElNotification({
      title: 'Error',
      message: ''+error,
      type: 'error',
    })
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    resetForm();
  })
</script>

<style></style>