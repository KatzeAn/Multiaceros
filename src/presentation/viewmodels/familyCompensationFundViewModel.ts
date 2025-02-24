import { ref, computed, reactive, watch, onMounted } from "vue";
import { useFamilyCompensationFundStore } from "../stores/familyCompensationFund.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";

export function useFamilyCompensationFundViewModel() {
  const familyCompensationFundStore = useFamilyCompensationFundStore();
  const familyCompensationFundList = ref<FamilyCompesationFunds[]>([]);
  const isLoading = computed(() => familyCompensationFundStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const familyCompensationFundForm = reactive<FamilyCompesationFunds>({
    compensationFundName: "",
  });

  const rules = reactive({
    compensationFundName: [
      { required: true, message: "El nombre es obligatorio", trigger: "blur" },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: "Solo letras y espacios",
        trigger: "blur",
      },
    ],
  });
  const showInactive = ref(false);
  const filterTableData = computed(() =>
    familyCompensationFundList.value.filter(
      (data) =>
        (!search.value ||
        data.compensationFundName
          .toLowerCase()
          .includes(search.value.toLowerCase()))&&
          (showInactive.value || data.isActive) 
    )
  );

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filterTableData.value.slice(start, start + pageSize.value);
  });

  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

  const handleSizeChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
  };

  const loadFamilyCompensationFund = async () => {
    familyCompensationFundList.value =
      (await familyCompensationFundStore.fetchFamilyCompensationFund()) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;
    
    try {
      familyCompensationFundForm.createdBy = "Fe";
      await familyCompensationFundStore.createFamilyCompensationFundRequest(
        familyCompensationFundForm
      );
      await loadFamilyCompensationFund();

      ElNotification({
        title: "Éxito",
        message: "FamilyCompensationFund creado correctamente",
        type: "success",
      });

      familyCompensationFundForm.compensationFundName = "";
    } catch (error) {
      const errorMessage = error as string;
      ElNotification({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
    }
  };

  watch([search, currentPage, pageSize], () => {
    console.log("Filtros actualizados", {
      search: search.value,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });
  });

  onMounted(async () => {
    await loadFamilyCompensationFund();
  });

  return {
    familyCompensationFundList,
    isLoading,
    search,
    currentPage,
    pageSize,
    ruleFormRef,
    rules,
    paginatedData,
    handlePageChange,
    handleSizeChange,
    submitForm,
    familyCompensationFundForm,
    showInactive,
  };
}
