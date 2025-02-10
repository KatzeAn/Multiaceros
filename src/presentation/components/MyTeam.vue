<template>
  <div v-loading="loading" class="flex flex-row gap-40">
    <template v-if="employeeList.length > 0">
      <div v-for="teammate in employeeList" class="flex flex-col items-center">
        <el-avatar shape="square" :size="80" :src="userPhoto" />
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
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"] as const,
});

const loading = ref<boolean>(false);
const employeeList = ref<Teammate[]>([]);
const userPhoto = ref<string>(state.squareUrl);

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
