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
          v-model="employeeRequestForm.newBenefit.id"
          placeholder="Seleccione el beneficio"
        >
          <el-option
            v-for="benefit in benefitsOptions"
            :key="benefit.id"
            :label="benefit.nameBenefit"
            :value="benefit.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="10">
      <el-form-item label="Valor" prop="benefits">
        <el-input-number
          style="width: 100%"
          :min="0"
          v-model="employeeRequestForm.newBenefit.valueBenefits"
          :step="1"
        />
      </el-form-item>
    </el-col>

    <el-col :span="4">
      <div class="h-full flex items-center justify-start m-1">
        <el-button type="primary" class="w-full" @click="addBenefit"
          >Agregar</el-button
        >
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="24">
      <ul>
        <li
          v-for="(benefit, index) in employeeRequestForm.benefits"
          :key="index"
          class="flex justify-between items-center py-2"
        >
          <span>
            {{ benefitsOptions.find((b) => b.id === benefit.id)?.nameBenefit }}
            -
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
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import { useBenefitStore } from "@/presentation/stores/benefit.store";
import { onMounted, ref } from "vue";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import { ElNotification } from "element-plus";

const { fetchBenefit } = useBenefitStore();
const { employeeRequestForm } = useEmployeeStore();

const benefitsOptions = ref<Benefits[]>([]);
const isLoading = ref(false);

const addBenefit = () => {
  if (
    employeeRequestForm.newBenefit.id &&
    Number(employeeRequestForm.newBenefit.valueBenefits) > 0
  ) {
    employeeRequestForm.benefits.push({
      id: Number(employeeRequestForm.newBenefit.id),
      valueBenefit: Number(employeeRequestForm.newBenefit.valueBenefits),
    });

    // Limpiar los valores después de agregar
    employeeRequestForm.newBenefit.id = "";
    employeeRequestForm.newBenefit.valueBenefits = "";
  } else {
    ElNotification({
      title: "Advertencia",
      message: "Seleccione un beneficio y dele un valor mayor a 0",
      type: "warning",
    });
  }
};

const removeBenefit = (index: number) => {
  employeeRequestForm.benefits.splice(index, 1);
};

const loadData = async () => {
  const { loading, benefitList } = await fetchBenefit();
  isLoading.value = loading;
  benefitsOptions.value = benefitList;
};

onMounted(() => {
  removeBenefit(0);
  loadData();
});
</script>
