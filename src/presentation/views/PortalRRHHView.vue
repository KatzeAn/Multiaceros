<template>
    <main>
        <el-col :span="24">
            <span class="text-[var(--secondary-color)] font-bold text-2xl">Portal de Recursos Humanos</span>
            <el-divider style="margin: 0 0 2rem 0;"></el-divider>
        </el-col>

        <el-row :gutter="30">
            <el-col :span="8">
                <el-card shadow="hover">   
                    <div class="justify-self-center">
                        <router-link to="/portal-rrhh/gestionar-empleados" class=" flex flex-row items-center gap-8">
                            <div class="flex flex-col items-center cursor-pointer p-3 rounded-lg hover:bg-[var(--info-alt-color)]">
                                <span class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl">
                                    group
                                </span>
                                <span class="text-[var(--secondary-color)]">Gestionar Empleados</span>
                            </div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">   
                    <div class="justify-self-center">
                        <router-link to="/portal-rrhh/gestionar-cumplimientos" class=" flex flex-row items-center gap-8">
                            <div class="flex flex-col items-center cursor-pointer p-3 rounded-lg hover:bg-[var(--info-alt-color)]">
                                <span class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl">
                                    description
                                </span>
                                <span class="text-[var(--secondary-color)]">Gestionar Certificados de Cumplimiento</span>
                            </div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">   
                    <div class="justify-self-center">
                        <router-link to="/portal-rrhh/gestionar-pausas" class=" flex flex-row items-center gap-8">
                            <div class="flex flex-col items-center cursor-pointer p-3 rounded-lg hover:bg-[var(--info-alt-color)]">
                                <span class="material-symbols-outlined text-[var(--secondary-color)] font-bold text-6xl">
                                    Relax
                                </span>
                                <span class="text-[var(--secondary-color)]">Gestionar Pausas Activas</span>
                            </div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <router-view class="mt-6"></router-view>
    </main>
</template>

<script lang="ts" setup>
</script>