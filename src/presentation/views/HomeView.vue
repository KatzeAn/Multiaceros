<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import { useCertifiedStore } from "../stores/certified.store";

import Card from "../components/Card.vue";
import BirthdayList from "../components/BirthdayList.vue";

const { getUsername, getUserId } = useUserStore();

const certifiedStore = useCertifiedStore();

const { downloadCertificate, error } = certifiedStore;

const download = async () => {
  isLoadingLetterCertfied.value = true;
  try {
    await downloadCertificate(getUserId);
  } catch (error) {
  } finally {
    isLoadingLetterCertfied.value = false;
  }
};
</script>

<template>
  <main class="flex flex-col">
    <Card class="my-5" color="blue" width="100%" :show-footer="false">
      <div class="flex flex-wrap flex-col sm:flex-row">
        <div class="flex flex-wrap gap-6 content-center w-full sm:w-1/2">
          <div>
            <img
              src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
              alt="Logo"
              class="w-[5rem]"
            />
          </div>
          <div class="self-center">
            <p class="text-xl font-bold">Hola, {{ getUsername }}</p>
            <p class="text-base">Hoy es {{ dayName }}, {{ date }}</p>
          </div>
        </div>
        <div
          class="self-center flex flex-col sm:flex-row justify-end sm:w-1/2 gap-6 mt-4 sm:mt-0"
        >
        <router-link
      to="/perfil"
      class="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
    >
      <span class="material-symbols-outlined">person</span>
      Mi perfil
    </router-link>
    <button
      class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
    >
      <span class="material-symbols-outlined">settings</span>
      Configuraciones
    </button>
        </div>
      </div>
    </Card>

    <h2 class="text-2xl font-bold">Portal</h2>
    <el-divider />

    <div class="grid grid-cols-3 gap-6">
      <div class="col-[1/-1] lg:col-span-1">
        <!-- Card para Tiempo libre -->
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]"
                ><el-icon>
                  <Calendar />
                </el-icon>
                Tiempo Libre
              </span>
            </div>
          </template>
          <div class="flex flex-col items-center">
            <div class="flex flex-row items-center gap-8">
              <div class="flex flex-col items-center">
                <span
                  class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl"
                >
                  beach_access
                </span>
                <span class="text-[var(--secondary-color)]">Vacaciones</span>
              </div>
              <div class="flex flex-col items-center">
                <span
                  class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl"
                >
                  healing
                </span>
                <span class="text-[var(--secondary-color)]">Citas médicas</span>
              </div>
            </div>
            <div class="flex flex-row items-center gap-5">
              <router-link
                tag="span"
                class="items-center"
                to="/solicitar-ausencia"
                ><el-button
                  class="mt-6"
                  size="small"
                  color="var(--secondary-color)"
                  round
                  >Solicitar Tiempo Libre</el-button
                ></router-link
              >
              <router-link
                tag="span"
                class="items-center"
                to="/gestionar-ausencias"
                ><el-button
                  icon="setting"
                  class="mt-6"
                  size="small"
                  color="var(--secondary-color)"
                  round
                  >Gestionar Ausencias</el-button
                ></router-link
              >
            </div>
          </div>
        </el-card>

        <!-- Card para certificaciones -->
        <el-card class="mt-6" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="font-bold text-[var(--secondary-color)]"
                ><el-icon>
                  <Document />
                </el-icon>
                Certificaciones</span
              >
            </div>
          </template>
          <div class="flex flex-col items-center">
            <div class="flex flex-row items-center gap-8">
              <div
                v-loading="isLoadingLetterCertfied"
                @click="download()"
                class="p-3 flex flex-col items-center cursor-pointer rounded-lg hover:bg-[var(--info-alt-color)]"
              >
                <span
                  class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl"
                >
                  docs
                </span>
                <span class="text-[var(--secondary-color)]">Carta Laboral</span>
              </div>
              <div
                class="flex flex-col items-center cursor-pointer p-3 rounded-lg hover:bg-[var(--info-alt-color)]"
              >
                <span
                  class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl"
                >
                  shield_person
                </span>
                <span class="text-[var(--secondary-color)]"
                  >Ficha Personal</span
                >
              </div>
            </div>

            <el-button
              class="mt-6"
              size="large"
              color="var(--secondary-color)"
              round
              >Más Certificados</el-button
            >
          </div>
        </el-card>
      </div>

      <!-- Card para anuncios - comunidad -->
      <el-card class="col-[1/-1] md:col-span-3 lg:col-span-2" shadow="hover">
  <template #header>
    <div class="card-header">
      <span class="font-bold text-[var(--secondary-color)]">
        <el-icon>
          <Comment />
        </el-icon>
        Anuncios - Comunidad
      </span>
    </div>
  </template>
  <div class="flex flex-row gap-6">
    <el-button icon="Plus">Nueva Publicación</el-button>
    <el-select disabled placeholder="Todas las publicaciones">
      <el-option />
    </el-select>
  </div>
  <el-divider />

  <el-scrollbar height="360px">
    <el-card shadow="hover">
      <div class="flex flex-col gap-4">
        <div
          v-for="index in 10"
          :key="index"
          class="flex flex-row gap-4 items-start"
        >
          <el-avatar
            shape="square"
            :size="50"
            :src="state.squareUrl"
            class="flex-shrink-0"
          /> 
          <div class="flex-1">
            <p class="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              ullamcorper malesuada turpis sed imperdiet. Cras quis euismod
              augue. Pellentesque placerat vel mauris at auctor.
            </p>
            <el-divider style="margin: 10px 0" />
          </div>
        </div>
      </div>
    </el-card>
  </el-scrollbar>
</el-card>

      <!-- Card para equipo -->
      <el-card class="col-[1/-1]" style="min-height: 300px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="font-bold text-[var(--secondary-color)]">
              <el-icon>
                <Menu />
              </el-icon>
              Equipo
            </span>
          </div>
        </template>
        <div class="justify-self-center">
          <el-empty description="No content available" />
        </div>
      </el-card>

      <!-- Card para enlaces -->
      <el-card class="col-[1/-1] md:col-span-1 lg:col-span-1" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="font-bold text-[var(--secondary-color)]"
              >Enlaces de la Empresa</span
            >
          </div>
        </template>
        <div class="justify-self-center">
          <el-empty description="No content available" />
        </div>
      </el-card>

      <!-- Card para cumpleaños -->
      <el-card class="col-[1/-1] md:col-span-2 lg:col-span-1" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="font-bold text-[var(--secondary-color)]">
              <el-icon>
                <Bell />
              </el-icon>
              Cumpleaños
            </span>
          </div>
        </template>
        <div class="w-full">
          <el-scrollbar height="295px">
            <BirthdayList></BirthdayList>
          </el-scrollbar>
        </div>
      </el-card>

      <!-- Card para bienvenidas -->
      <el-card class="col-[1/-1] lg:col-span-1" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="font-bold text-[var(--secondary-color)]">
              <el-icon>
                <Menu />
              </el-icon>
              Bienvenido a HiCody!
            </span>
          </div>
        </template>
        <div class="flex flex-col w-full gap-10">
          <div class="self-center">
            <span class="text-[90px] material-symbols-outlined">
              waving_hand
            </span>
          </div>
          <div class="self-center">
            <div class="flex flex-col">
              <span class="text-2xl"
                >Bienvenido <span class="font-medium">Oscar Fuentes</span>, al
                equipo HiCody!</span
              >
              <span class="text-lg text-center"
                >Inició el lunes, 4 de Diciembre</span
              >
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </main>
</template>

<script lang="ts">
import { reactive, ref } from "vue";

const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"] as const,
});

const isLoadingLetterCertfied = ref(false);

export default {
  data() {
    return {
      dayName: "",
      date: "",
    };
  },
  mounted() {
    const daysOfWeek = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const today = new Date();
    this.dayName = daysOfWeek[today.getDay()];
    this.date = today.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
  },
};
</script>