import { ref, computed, reactive, watch, onMounted } from "vue";
import { useSeveranceFundStore } from "../stores/severanceFund.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";

export function useSeveranceFundViewModel() {
  const severanceFundStore = useSeveranceFundStore();
  const severanceFundList = ref<SeveranceFund[]>([]);
  const isLoading = computed(() => severanceFundStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const severanceFundForm = reactive<SeveranceFund>({
    severanceFundName: "",
  });

  const rules = reactive({
    severanceFundName: [
      { required: true, message: "El nombre es obligatorio", trigger: "blur" },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: "Solo letras y espacios",
        trigger: "blur",
      },
    ],
  });

  const filterTableData = computed(() =>
    severanceFundList.value.filter(
      (data) =>
        !search.value ||
        data.severanceFundName
          .toLowerCase()
          .includes(search.value.toLowerCase())
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

  const loadSeveranceFund = async () => {
    severanceFundList.value =
      (await severanceFundStore.fetchSeveranceFund()) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    try {
      await formEl.validate();

      await severanceFundStore.createSeveranceFundRequest(severanceFundForm);
      await loadSeveranceFund();

      ElNotification({
        title: "Éxito",
        message: "Fondo de cesantías creado correctamente",
        type: "success",
      });

      severanceFundForm.severanceFundName = "";
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
    await loadSeveranceFund();
  });

  return {
    severanceFundList,
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
    severanceFundForm,
  };
}
