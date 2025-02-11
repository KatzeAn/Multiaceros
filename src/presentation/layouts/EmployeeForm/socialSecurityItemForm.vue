<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Seguridad Social</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="EPS" prop="epsData.id">
        <el-select
          v-model="employeeRequestForm.epsData.id"
          placeholder="Seleccione la EPS"
        >
          <el-option
            v-for="eps in epsOptions"
            :key="eps.id"
            :label="eps.epsName"
            :value="eps.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Tipo de EPS" prop="epsData.epsTypeId">
        <el-select
          v-model="employeeRequestForm.epsData.epsTypeId"
          placeholder="Seleccione el tipo"
        >
          <el-option label="Contributivo" :value="1" />
          <el-option label="Subsidiado" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="ARL" prop="arlData.id">
        <el-select
          v-model="employeeRequestForm.arlData.id"
          placeholder="Seleccione la ARL"
        >
          <el-option
            v-for="arl in arlOptions"
            :key="arl.id"
            :label="arl.nameArl"
            :value="arl.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Riesgo" prop="arlData.riskId">
        <el-input-number
          style="width: 100%"
          :min="0"
          :max="5"
          v-model="employeeRequestForm.arlData.riskId"
          :step="1"
        ></el-input-number>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="Fondo de pensiones" prop="pensionFundInfoData.id">
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.id"
          placeholder="Seleccione el fondo de pensiones"
        >
          <el-option
            v-for="pension in pensionFundOptions"
            :key="pension.id"
            :label="pension.pensionFundName"
            :value="pension.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item
        label="Tipo de fondo de pensión"
        prop="pensionFundInfoData.pensionFundTypeId"
      >
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.pensionFundTypeId"
          placeholder="Seleccione el tipo"
        >
          <el-option label="Contributivo" :value="1" />
          <el-option label="Subsidiado" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item
        label="Caja de compensación"
        prop="familyCompensationFundId"
      >
        <el-select
          v-model="employeeRequestForm.familyCompensationFundId"
          placeholder="Seleccione la caja de compensación"
        >
          <el-option
            v-for="familyCompensation in pensionFamilyCompensationFundOptions"
            :key="familyCompensation.id"
            :label="familyCompensation.compensationFundName"
            :value="familyCompensation.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Fondo de cesantías" prop="severanceFundId">
        <el-select
          v-model="employeeRequestForm.severanceFundId"
          placeholder="Seleccione el fondo"
        >
          <el-option
            v-for="severanceFund in severanceFundOptions"
            :key="severanceFund.id"
            :label="severanceFund.severanceFundName"
            :value="severanceFund.id"
          />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import { useEpsStore } from "@/presentation/stores/eps.store";
import { useArlStore } from "@/presentation/stores/arl.store";
import { usePensionFundStore } from "@/presentation/stores/pensionFund.store";
import { useFamilyCompensationFundStore } from "@/presentation/stores/familyCompensationFund.store";
import { useSeveranceFundStore } from "@/presentation/stores/severanceFund.store";
import { onMounted, ref } from "vue";
import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";
import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";

const { employeeRequestForm } = useEmployeeStore();
const { fetchEps } = useEpsStore();
const { fetchArl } = useArlStore();
const { fetchPensionFund } = usePensionFundStore();
const { fetchFamilyCompensationFund } = useFamilyCompensationFundStore();
const { fetchSeveranceFund } = useSeveranceFundStore();

const epsOptions = ref<Eps[]>([]);
const arlOptions = ref<Arl[]>([]);
const pensionFundOptions = ref<PensionFunds[]>([]);
const pensionFamilyCompensationFundOptions = ref<FamilyCompesationFunds[]>([]);
const severanceFundOptions = ref<SeveranceFund[]>([]);

const loading = ref(false);

const loadData = async () => {
  loading.value = true;

  const [
    { epsList },
    { arlList },
    { pensionFundList },
    { familyCompensationFundList },
    { severanceFundList },
  ] = await Promise.all([
    fetchEps(),
    fetchArl(),
    fetchPensionFund(),
    fetchFamilyCompensationFund(),
    fetchSeveranceFund(),
  ]);

  epsOptions.value = epsList;
  arlOptions.value = arlList;
  pensionFundOptions.value = pensionFundList;
  pensionFamilyCompensationFundOptions.value = familyCompensationFundList;
  severanceFundOptions.value = severanceFundList;

  loading.value = false;
};

onMounted(() => {
  loadData();
});
</script>
