<template>
    <!-- <el-row :gutter="16">
      <el-col :span="12">
        <div class="statistic-card bg-[var(--gray-color)]">
          <el-statistic :value="0">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Ausencias Mensuales
                <el-tooltip
                  effect="dark"
                  content="Numero de ausencias que se han creado durante el mes"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="statistic-card bg-[var(--gray-color)]">
          <el-statistic :value="0">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Total de Ausencias
                <el-tooltip
                  effect="dark"
                  content="Historico de ausencias que se han creado"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-divider class="p-0 m-0"></el-divider>
    </el-row> -->

    <el-row class="" :gutter="16" >
    <el-col :span="24">
      <span class="font-bold text-2xl ">Estadística mensual</span>
    </el-col>
    <el-col 
    :xs="24" 
    :sm="12" 
    :md="8" 
    :lg="8"
    class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--success-alt-color)]">
        <el-statistic :value="0">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Ausencias Aprobadas
              <el-tooltip
                effect="dark"
                content="Número de ausencias aprobadas este mes"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col 
    :xs="24" 
    :sm="12" 
    :md="8" 
    :lg="8"
    class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--primary-alt-color)]">
        <el-statistic :value="0">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Ausencias Rechazadas
              <el-tooltip
                effect="dark"
                content="Número de ausencias rechazadas este mes"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col 
    :xs="24" 
    :sm="12" 
    :md="8" 
    :lg="8"
    class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--info-alt-color)]">
        <el-statistic :value="0">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Total de Ausencias
              <el-tooltip
                effect="dark"
                content="Total de ausencias creadas este mes"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>
  </template>
  
  <script lang="ts" setup>


  </script>
  
  <style scoped>
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
  
  .statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
  }
  </style>
  