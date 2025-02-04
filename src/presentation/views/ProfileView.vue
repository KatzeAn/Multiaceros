<template>
  <main class="flex flex-col gap-6">
    <div class="bg-[var(--secondary-color)] p-6 rounded-xl text-white">
      <el-row :gutter="30">
        <el-col :span="3">
          <el-avatar shape="square" :size="110" :src="state.squareUrl" />
        </el-col>
        <el-col :span="21">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <span class="text-3xl font-bold">{{ getUsername }}</span>
              <span class="my-2 font-light">Backend Developer</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="30">
      <!-- <el-col :span="3">
        <el-card>
          dick
        </el-card>
      </el-col> -->

      <el-col :span="24">
        <el-card body-style="background-color: var(--gray-color)">
          <el-tabs v-model="activeName">
            <el-tab-pane label="Información Personal" name="informacion-personal"></el-tab-pane>
            <el-tab-pane label="Información Profesional" name="informacion-profesional"></el-tab-pane>
            <el-tab-pane label="Información Salarial" name="informacion-salarial"></el-tab-pane>
            <el-tab-pane label="Tiempo Libre" name="tiempo-libre"></el-tab-pane>
          </el-tabs>
          
          <router-view />
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>
  
  <script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from "../stores/user.store";
  
  const route = useRoute();
  const router = useRouter();
  const { getUsername, getUserId } = useUserStore();
  
  const state = reactive({
    circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    squareUrl:
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  });
  
  // Sincroniza `activeName` con la ruta actual.
  const activeName = computed({
    get: () => route.path.split('/').pop() || 'informacion-personal',
    set: (value: string) => {
      router.push(`/perfil/${value}`);
    },
  });
  </script>
  