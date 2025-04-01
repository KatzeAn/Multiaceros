<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import { useCertifiedStore } from "../stores/certified.store";
import { useI18n } from "vue-i18n";
import Card from "../components/Card.vue";
import BirthdayList from "../components/BirthdayList.vue";
import mujer from '@/presentation/assets/hombre2.jpg';

const { t } = useI18n();

const { getUsername, getUserId } = useUserStore();

const certifiedStore = useCertifiedStore();

const { downloadCertificate, error } = certifiedStore;

const download = async () => {
  isLoadingLetterCertfied.value = true;
  try {
    const userId = stringToNumber(getUserId);
    
    if (userId !== null) {  
        await downloadCertificate(userId);
    }  } catch (error) {
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
            <img :src="mujer" alt="Perfil" class="w-[5rem] h-[5rem] rounded-full object-cover" />          </div>
            <div class="self-center">
              <p class="text-xl font-bold">{{ t('greeting') }}, {{ getUsername }}</p>
              <p class="text-base">{{ t('todayIs') }} {{ dayName }}, {{ date }}</p>
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
            {{ t('miPerfil') }}
          </router-link>
          <button
            class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <span class="material-symbols-outlined">settings</span>
            {{ t('settings') }}
          </button>
        </div>
      </div>
    </Card>

    <h2 class="text-2xl font-bold">{{t('portal')}}</h2>
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
                {{t('freeTime')}}
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
                <span class="text-[var(--secondary-color)]">{{t('vacations')}}</span>
              </div>
              <div class="flex flex-col items-center">
                <span
                  class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl"
                >
                  healing
                </span>
                <span class="text-[var(--secondary-color)]">{{t('medicalAppointments')}}</span>
              </div>
            </div>
            <div class="flex flex-row items-center gap-5">
              <router-link
                tag="span"
                class="items-center"
                to="/ausencias/solicitar-ausencia"
                ><el-button
                  class="mt-6"
                  size="small"
                  color="var(--secondary-color)"
                  round
                  >{{t('requestFreeTime')}}</el-button
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
                {{t('certifications')}}</span
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
                <span class="text-[var(--secondary-color)]">{{t('workLetter')}}</span>
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
                  >{{t('personalFile')}}</span
                >
              </div>
            </div>

            <el-button
              class="mt-6"
              size="large"
              color="var(--secondary-color)"
              round
              >{{t('moreCertificates')}}</el-button
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
        {{t('announcementsCommunity')}}
      </span>
    </div>
  </template>

  <div class="flex flex-row gap-6">
    <el-button icon="Plus">{{t('newPublication')}}</el-button>
    <el-select disabled :placeholder="t('allPublications')">
  <el-option />
</el-select>

  </div>

  <el-divider />

  <el-scrollbar height="360px">
    <el-card shadow="hover">
      <div class="flex flex-col gap-4">
        <div
          v-for="(image, index) in state.avatars"
          :key="index"
          class="flex flex-row gap-4 items-start"
        >
          <el-avatar shape="square" :size="50" :src="image" class="flex-shrink-0" />
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
      <!-- <Organigrama /> -->
            <el-card class="col-[1/-1]" style="min-height: 300px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="font-bold text-[var(--secondary-color)]">
              <el-icon>
                <Menu />
              </el-icon>
              {{t('team')}}
            </span>
          </div>
        </template>
         <!-- <MyTeam></MyTeam>--> 
        <!-- <div class="flex flex-row gap-40">
          <div class="flex flex-col items-center">
            <el-avatar shape="square" :size="80" :src="state.squareUrl" />
            <span class="font-semibold text-gray-600 text-sm"
              >Harol Guzman</span
            >
          </div>
          <div class="flex flex-col items-center">
            <el-avatar shape="square" :size="80" :src="state.squareUrl" />
            <span class="font-semibold text-gray-600 text-sm"
              >Wilmar Alfaro</span
            >
          </div>
          <div class="flex flex-col items-center">
            <el-avatar shape="square" :size="80" :src="state.squareUrl" />
            <span class="font-semibold text-gray-600 text-sm"
              >Eduardo Fuentes</span
            >
          </div>
        </div> -->
      </el-card>

      <!-- Card para enlaces c
      <el-card class="col-[1/-1] md:col-span-2 lg:col-span-2" shadow="hover">
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
              {{t('birthdays')}}
            </span>
          </div>
        </template>
        <div class="w-full">
          <el-scrollbar height="295px">
            <BirthdayList></BirthdayList>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
  </main>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import MyTeam from "../components/MyTeam.vue";
import { stringToNumber } from "../common/helper/stringTonumber.helper";
import  Organigrama from "@/presentation/components/organigrama.vue";

const state = reactive({
  avatars: [
    new URL('@/presentation/assets/mujer.jpg', import.meta.url).href,
    new URL('@/presentation/assets/mujer2.jpg', import.meta.url).href,
    new URL('@/presentation/assets/mujer3.jpg', import.meta.url).href,
    new URL('@/presentation/assets/homnre2.jpg', import.meta.url).href,
    new URL('@/presentation/assets/hombre3.jpg', import.meta.url).href,
    new URL('@/presentation/assets/hombre2.jpg', import.meta.url).href,
    new URL('@/presentation/assets/hombre.png', import.meta.url).href,
    new URL('@/presentation/assets/mujer2.jpg', import.meta.url).href,
    new URL('@/presentation/assets/mujer3.jpg', import.meta.url).href,
    new URL('@/presentation/assets/homnre2.jpg', import.meta.url).href,
  ],
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
    const { t, locale } = useI18n();

    const daysOfWeek: Record<string, string> = {
      sunday: "daysOfWeek.sunday",
      monday: "daysOfWeek.monday",
      tuesday: "daysOfWeek.tuesday",
      wednesday: "daysOfWeek.wednesday",
      thursday: "daysOfWeek.thursday",
      friday: "daysOfWeek.friday",
      saturday: "daysOfWeek.saturday",
    };

    const today = new Date();
    const dayKey = Object.keys(daysOfWeek)[today.getDay()];
    
    this.dayName = t(daysOfWeek[dayKey]);
    this.date = today.toLocaleDateString(locale.value, {
      day: "numeric",
      month: "long",
    });
  },
}
</script>
