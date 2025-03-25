<template>
  <main class="flex flex-col gap-6">
    <div class="bg-[var(--secondary-color)] p-6 rounded-xl text-white">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8" :lg="3">
          <el-avatar shape="square" :size="110" :src="state.squareUrl" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="21">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <span class="text-3xl font-bold">{{ userFullName }}</span>
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
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="t('personalInformation')" name="informacion-personal"></el-tab-pane>
              <el-tab-pane :label="t('professionalInformation')" name="informacion-profesional" disabled></el-tab-pane>
              <el-tab-pane :label="t('salaryInformation')" name="informacion-salarial" disabled></el-tab-pane>
              <el-tab-pane :label="t('freeTime')" name="tiempo-libre" disabled></el-tab-pane>
            </el-tabs>

          </el-tabs>

          <router-view />
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserProfileStore } from "../stores/UserProfile.store";
import { useUserStore } from "../stores/user.store";
import mujer from '@/presentation/assets/hombre2.jpg';
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const userProfileStore = useUserProfileStore();

const state = reactive({
  squareUrl: mujer,
});

onMounted(async () => {
  const userId = userStore.getUserId; 
  if (userId) {
    await userProfileStore.fetchUserProfile(userId);
  }
});

const userFullName = computed(() => {
  if (!userProfileStore.userProfile) return 'Cargando...';

  return `${userProfileStore.userProfile.userFirstName} ${userProfileStore.userProfile.surName.split(' ')[0]}`;
});

watchEffect(() => {
});

// Sincroniza `activeName` con la ruta actual.
const activeName = computed({
  get: () => route.path.split('/').pop() || 'informacion-personal',
  set: (value: string) => {
    router.push(`/perfil/${value}`);
  },
});
</script>
