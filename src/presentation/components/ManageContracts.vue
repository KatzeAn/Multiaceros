<template>
  <div class="p-6">
    <h2 class="text-lg font-semibold mb-4">{{ t("contractManagement") }}</h2>

    <div class="flex gap-4 items-center mb-4">
      <el-input v-model="selectedDays" :placeholder="t('enterDays')" type="number" />
      <el-button type="primary" @click="fetchContracts">{{ t("consult") }}</el-button>
    </div>

    <el-table :data="contracts" style="width: 100%" border stripe>
      <el-table-column :label="t('name')" prop="userFirstName" />
      <el-table-column :label="t('surname')" prop="userSurName" width="100" />
      <el-table-column :label="t('email')" prop="userEmail" width="100" />
      <el-table-column :label="t('contractType')" prop="contractType" width="100" />
      <el-table-column :label="t('contractEndDate')" width="150">
        <template #default="{ row }">{{ new Date(row.contractEndDate).toISOString().split('T')[0] }}</template>
      </el-table-column>
      <el-table-column :label="t('daysRemaining')" prop="daysRemaining" />
      <el-table-column :label="t('actions')" align="center" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="renewContract(row)" :disabled="row.willBeRenewed">
            {{ t("renewSoon") }}
          </el-button>
          <el-button size="small" @click="openExtendDateModal(row)">
            {{ t("extendDate") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showDateModal" :title="t('extendContractDate')">
      <el-date-picker v-model="selectedDate" type="date" :placeholder="t('selectNewDate')" />
      <template #footer>
        <el-button @click="showDateModal = false">{{ t("cancel") }}</el-button>
        <el-button type="primary" @click="extendContractDate">{{ t("save") }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useContractDaysStore } from "@/presentation/stores/contract.store";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const selectedDays = ref(null);
const contracts = ref([]);
const contractDaysStore = useContractDaysStore();
const showDateModal = ref(false);
const selectedContract = ref(null);
const selectedDate = ref(null);

const fetchContracts = async () => {
  if (selectedDays.value) {
    contracts.value = await contractDaysStore.fetchContractsByDaysRemaining(selectedDays.value);
  }
};

const renewContract = async (contract) => {
  if (contract.willBeRenewed) return;

  const updatedContract = {
    contractId: contract.contractId,
    modifiedBy: "Admin",
    willBeRenewed: true
  };
  
  await contractDaysStore.updateContract(contract.contractId, updatedContract);
  fetchContracts();
};

const openExtendDateModal = (contract) => {
  selectedContract.value = contract;
  selectedDate.value = contract.contractEndDate;
  showDateModal.value = true;
};

const extendContractDate = async () => {
  if (!selectedContract.value || !selectedDate.value) return;
  
  const updatedContract = {
    contractId: selectedContract.value.contractId,
    modifiedBy: "Admin",
    contractEndDate: new Date(selectedDate.value).toISOString()
  };
  
  await contractDaysStore.updateContract(selectedContract.value.contractId, updatedContract);
  fetchContracts();
  showDateModal.value = false;
};
</script>

<style scoped>
.p-6 {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
