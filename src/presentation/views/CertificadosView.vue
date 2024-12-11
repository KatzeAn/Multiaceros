<script setup lang="ts">
import { useAuthStore } from "../stores/auth.store";
import Card from '../components/Card.vue'
import SearchBar from '../components/SearchBar.vue'

const { getUsername } = useAuthStore();

</script>

<template>
  <main class="flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-bold">Certificados</h2>
      <div class="border-t border-gray-300 my-4"></div>
    </div>

    <card width="100%">
      <SearchBar></SearchBar>

      <div class="flex flex-row gap-6 flex-wrap mt-10">
        <card color="gray" width="auto">
          <div class="flex flex-row gap-6">
            <div class="flex flex-row gap-5">
              <span class="text-2xl self-center material-symbols-outlined">
                developer_guide
              </span>
              <h3 class="self-center text-lg font-medium">Carta Laboral</h3>
            </div>

            <div class="ml-auto">
              <button class="bg-[var(--info-color)] px-6 py-2 flex rounded">
                <span class="material-symbols-outlined text-white">
                  download
                </span>
              </button>
            </div>
          </div>
        </card>

        <card color="gray" width="auto">
          <div class="flex flex-row gap-6">
            <div class="flex flex-row gap-5">
              <span class="text-2xl self-center material-symbols-outlined">
                <span class="material-symbols-outlined">
                  loyalty
                </span>
              </span>
              <h3 class="self-center text-lg font-medium">Beneficios legales</h3>
            </div>

            <div class="ml-auto">
              <button class="bg-[var(--info-color)] px-6 py-2 flex rounded">
                <span class="material-symbols-outlined text-white">
                  download
                </span>
              </button>
            </div>
          </div>
        </card>

        <card color="gray" width="auto">
          <div class="flex flex-row gap-6">
            <div class="flex flex-row gap-5">
              <span class="text-2xl self-center material-symbols-outlined">
                contract
              </span>
              <h3 class="self-center text-lg font-medium">Tipo de contrato</h3>
            </div>

            <div class="ml-auto">
              <button class="bg-[var(--info-color)] px-6 py-2 flex rounded">
                <span class="material-symbols-outlined text-white">
                  download
                </span>
              </button>
            </div>
          </div>
        </card>
      </div>
    </card>
  </main>
</template>

<script lang="ts">

export default {
  components: { Card },

};

</script>

<style scoped>



</style>