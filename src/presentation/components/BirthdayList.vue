<template>
  <div v-loading="loading">
    <template v-if="userBirthdaysList.length > 0">
      <div>
        <div v-for="user in userBirthdaysList" :key="user.id" class="flex flex-row gap-4">
          <el-avatar shape="square" :size="50" :src="state.squareUrl" />
          <div class="flex flex-col">
            <span class="font-medium">{{ user.fullName }}</span>
            <span class="text-sm text-gray-400">{{ new Date(user.birthday).toLocaleString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'}) }} - ¡Feliz cumpleaños!</span>

          </div>
        </div>
        <el-divider style="margin: 10px 0;" />
      </div>
    </template>
    <template v-else>
      <el-empty description="No birthdays found" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '../stores/user.store';

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const loading = ref<boolean>(false);
const userBirthdaysList = ref<UserBirthdayList>([]);

const loadData = async () => {
  const { loading: isLoading, userBirthdaysList: birthdays } = await useUserStore().fetchBirthdaysOfMonth();
  loading.value = isLoading;
  userBirthdaysList.value = birthdays;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>

</style>
