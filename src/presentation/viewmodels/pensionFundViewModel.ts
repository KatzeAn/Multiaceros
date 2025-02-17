import { ref, computed, reactive, watch, onMounted } from "vue";
import { usePensionFundStore } from "../stores/pensionFund.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";

export function usePensionFundViewModel() {
  const pensionFundStore = usePensionFundStore();
  const pensionFundList = ref<PensionFunds[]>([]);
  const isLoading = computed(() => pensionFundStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const pensionFundForm = reactive<PensionFunds>({
    pensionFundName: "",
  });

  const rules = reactive({
    pensionFundName: [
      { required: true, message: "El nombre es obligatorio", trigger: "blur" },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: "Solo letras y espacios",
        trigger: "blur",
      },
    ],
  });

  const filterTableData = computed(() =>
    pensionFundList.value.filter(
      (data) =>
        !search.value ||
        data.pensionFundName.toLowerCase().includes(search.value.toLowerCase())
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

  const loadPensionFund = async () => {
    pensionFundList.value = (await pensionFundStore.fetchPensionFund()) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;

    try {
      pensionFundForm.createdBy = "Fe";
      await pensionFundStore.createPensionFundRequest(pensionFundForm);
      await loadPensionFund();

      ElNotification({
        title: "Éxito",
        message: "Fondo de pensión creado correctamente",
        type: "success",
      });

      pensionFundForm.pensionFundName = "";
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
    await loadPensionFund();
  });

  return {
    pensionFundList,
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
    pensionFundForm,
  };
}
