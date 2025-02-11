<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Beneficios</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="10">
      <el-form-item label="Beneficios" prop="benefits">
        <el-select
          v-model="newBenefit.id"
          placeholder="Seleccione el beneficio"
        >
          <el-option
            v-for="benefit in benefitList"
            :key="benefit.id"
            :label="benefit.nameBenefit"
            :value="benefit.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="10">
      <el-form-item label="Valor" prop="benefits">
        <el-input
          type="number"
          style="width: 100%"
          v-model="newBenefit.valueBenefits"
        />
      </el-form-item>
    </el-col>

    <el-col :span="4">
      <div class="h-full flex items-center justify-start m-1">
        <el-button type="primary" class="w-full" @click="addBenefit">
          Agregar
        </el-button>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="24">
      <ul>
        <li
          v-for="(benefit, index) in reactiveEmployeeRequest.benefits"
          :key="index"
          class="flex justify-between items-center py-2"
        >
          <span>
            {{ benefitList.find((b) => b.id === benefit.id)?.nameBenefit }} -
            {{ benefit.valueBenefit }}
          </span>
          <button
            type="button"
            @click="removeBenefit(index)"
            class="text-red-500"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useBenefitViewModel } from "@/presentation/viewmodels/benefitViewModel";
import { ElNotification } from "element-plus";

import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

const props = defineProps<{ employeeRequestForm: EmployeeRequest }>();

const emit = defineEmits(["updateBenefits"]);

const { benefitList } = useBenefitViewModel();

const reactiveEmployeeRequest = ref<EmployeeRequest>({
  ...props.employeeRequestForm,
});

const newBenefit = ref({
  id: "",
  valueBenefits: "",
});

const addBenefit = () => {
  if (newBenefit.value.id && Number(newBenefit.value.valueBenefits) > 0) {
    reactiveEmployeeRequest.value.benefits.push({
      id: Number(newBenefit.value.id),
      valueBenefit: Number(newBenefit.value.valueBenefits),
    });

    emit("updateBenefits", reactiveEmployeeRequest.value.benefits);

    newBenefit.value.id = "";
    newBenefit.value.valueBenefits = "";
  } else {
    ElNotification({
      title: "Advertencia",
      message: "Seleccione un beneficio y dele un valor mayor a 0",
      type: "warning",
    });
  }
};

const removeBenefit = (index: number) => {
  reactiveEmployeeRequest.value.benefits.splice(index, 1);
  emit("updateBenefits", reactiveEmployeeRequest.value.benefits);
};
</script>
