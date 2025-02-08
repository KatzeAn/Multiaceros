<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Seguridad Social</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="EPS" prop="epsData.epsId">
        <el-select
          v-model="employeeRequestForm.epsData.epsId"
          placeholder="Seleccione la EPS"
        >
          <el-option
            v-for="eps in epsOptions"
            :key="eps.epsId"
            :label="eps.epsName"
            :value="eps.epsId"
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
      <el-form-item label="ARL" prop="arlData.arlId">
        <el-select
          v-model="employeeRequestForm.arlData.arlId"
          placeholder="Seleccione la ARL"
        >
          <el-option
            v-for="arl in arlOptions"
            :key="arl.arlId"
            :label="arl.nameArl"
            :value="arl.arlId"
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
      <el-form-item label="Fondo de pensiones" prop="arlData.arlId">
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.pensionFundId"
          placeholder="Seleccione el fondo"
        >
          <el-option
            v-for="pension in pensionFundOptions"
            :key="pension.pensionFundId"
            :label="pension.pensionFundName"
            :value="pension.pensionFundId"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Tipo de fondo de pensión" prop="arlData.riskId">
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
          placeholder="Seleccione la caja"
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
          <el-option label="Compensar" :value="1" />
          <el-option label="Colsubsidio" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import { useEpsStore } from "@/presentation/stores/eps.store";
import { useArlStore } from "@/presentation/stores/arl.store";
import { usePensionFund } from "@/presentation/stores/pensionFund.store";
import { useFamilyCompensationFund } from "@/presentation/stores/familyCompensationFund.store";
import { onMounted, ref } from "vue";
import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";
import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";

const { employeeRequestForm } = useEmployeeStore();
const { fetchEps } = useEpsStore();
const { fetchArl } = useArlStore();
const { fetchPensionFunds } = usePensionFund();
const { fetchFamilyCompensationFund } = useFamilyCompensationFund();

const loadingEps = ref(false);
const epsOptions = ref<Eps[]>([]);

const loadingArl = ref(false);
const arlOptions = ref<Arl[]>([]);

const loadingPensionFund = ref(false);
const pensionFundOptions = ref<PensionFunds[]>([]);

const loadingFamilyCompensationFund = ref(false);
const pensionFamilyCompensationFundOptions = ref<FamilyCompesationFunds[]>([]);

const loadData = async () => {
  const { loading: isEpsLoading, epsList: epsList } = await fetchEps();
  loadingEps.value = isEpsLoading;
  epsOptions.value = epsList;

  const { loading: isArlLoading, arlList: arlList } = await fetchArl();
  loadingArl.value = isArlLoading;
  arlOptions.value = arlList;

  const { loading: isPensionFundLoading, pensionFundList: pensionFundList } =
    await fetchPensionFunds();
  loadingPensionFund.value = isPensionFundLoading;
  pensionFundOptions.value = pensionFundList;

  const {
    loading: isFamilyCompensationFundLoading,
    familyCompensationFundList: familyCompensationFundList,
  } = await fetchFamilyCompensationFund();
  loadingFamilyCompensationFund.value = isFamilyCompensationFundLoading;
  pensionFamilyCompensationFundOptions.value = familyCompensationFundList;
};

onMounted(() => {
  loadData();
});
</script>
