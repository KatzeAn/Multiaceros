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
          v-model="employeeRequestForm.newBenefit.benefitId"
          placeholder="Seleccione el beneficio"
        >
          <el-option
            v-for="benefit in benefitsOptions"
            :key="benefit.id"
            :label="benefit.name"
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
            {{ benefitsOptions.find((b) => b.id === benefit.benefitId)?.name }}
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
import { onMounted } from "vue";
const { employeeRequestForm } = useEmployeeStore();

const benefitsOptions = [
  { id: 1, name: "Prima de Servicios" },
  { id: 2, name: "Auxilio de Transporte" },
  { id: 3, name: "Bono de Alimentación" },
  { id: 4, name: "Seguro Médico Complementario" },
  { id: 5, name: "Beca de Estudios" },
];

const addBenefit = () => {
  if (
    employeeRequestForm.newBenefit.benefitId &&
    Number(employeeRequestForm.newBenefit.valueBenefits) > 0
  ) {
    employeeRequestForm.benefits.push({
      benefitId: Number(employeeRequestForm.newBenefit.benefitId),
      valueBenefit: Number(employeeRequestForm.newBenefit.valueBenefits),
    });

    // Limpiar los valores después de agregar
    employeeRequestForm.newBenefit.benefitId = "";
    employeeRequestForm.newBenefit.valueBenefits = "";
  } else {
    alert("Seleccione un beneficio y asigne un valor mayor a 0.");
  }
};

const removeBenefit = (index: number) => {
  employeeRequestForm.benefits.splice(index, 1);
};

onMounted(() => {
  removeBenefit(0);
});
</script>
