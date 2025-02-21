<template>
  <div v-loading="loading" class="flex flex-row gap-40">
    <template v-if="employeeList.length > 0">
      <div v-for="(teammate, index) in employeeList" :key="teammate.id" class="flex flex-col items-center">
        <el-avatar shape="square" :size="80" :src="state.avatars[index % state.avatars.length]" />
        <span class="font-semibold text-gray-600 text-sm">{{
          teammate.fullName
        }}</span>
      </div>
    </template>
    <template v-else>
      <div class="w-full">
        <el-empty description="No teammates found" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useDivisionStore } from "../stores/division.store";
import type { Teammate } from "@/domain/Interfaces/Division/teammate.interface";

const state = reactive({
  avatars: [
    new URL('@/presentation/assets/mujer.jpg', import.meta.url).href,
    new URL('@/presentation/assets/mujer2.jpg', import.meta.url).href,
    new URL('@/presentation/assets/mujer3.jpg', import.meta.url).href,
    new URL('@/presentation/assets/hombre2.jpg', import.meta.url).href,
    new URL('@/presentation/assets/hombre3.jpg', import.meta.url).href,
  ],
});
const loading = ref<boolean>(false);
const employeeList = ref<Teammate[]>([]);
const loadData = async () => {
  const { loading: isLoading, teammateList: userTeammateList } =
    await useDivisionStore().fetchMyTeammate();
  loading.value = isLoading;
  employeeList.value = userTeammateList;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
