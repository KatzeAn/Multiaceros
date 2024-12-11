<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from "../stores/user.store";

const { getUsername } = useUserStore();

</script>

<template>
  <div class="w-full py-2 bg-neutral-50 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">

    <button type="button" class="text-lg text-gray-600 sidebar-toggle">

    </button>

    <ul class="flex items-center text-sm ml-4">
      <li class="mr-2">
        <!-- <a href="#" class="text-gray-400 hover:text-gray-600 font-medium">
          <router-link to="/home">Inicio</router-link>
        </a> -->
        <a href="#" class="text-gray-600 hover:text-gray-600 font-medium">
          <router-link to="" style="margin-left: calc(2rem + 32px);">Inicio</router-link>
        </a>
      </li>
      <!-- <li class="text-gray-600 mr-2 font-medium">/</li>
      <li class="text-gray-600 mr-2 font-medium">Analytics</li> -->
    </ul>
    <ul class="ml-auto flex items-center">
      <li class="mr-1 dropdown">
        <button type="button"
          class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600">
          <i class="ri-search-line">
            <span class="material-symbols-outlined">
              search
            </span>
          </i>
        </button>
      </li>
      <li class="dropdown">
        <button type="button"
          class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600">
          <i class="ri-notification-3-line">
            <span class="material-symbols-outlined">
              notifications
            </span>
          </i>
        </button>
      </li>


      <li class="dropdown ml-3">
        <button type="button" class="dropdown-toggle flex gap-3 items-center">
          <p>{{ getUsername }}</p>
          <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
          <span class="text-gray-400 material-symbols-outlined">
            keyboard_arrow_down
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
header {
  background-color: var(--secondary-alt-color);
}
</style>
