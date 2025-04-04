import { ref, computed, reactive, watch, onMounted } from "vue";
import { useSeveranceFundStore } from "../stores/severanceFund.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import { useI18n } from "vue-i18n";

export function useSeveranceFundViewModel() {
  const severanceFundStore = useSeveranceFundStore();
  const severanceFundList = ref<SeveranceFund[]>([]);
  const isLoading = computed(() => severanceFundStore.isLoading);
  const { t } = useI18n()

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const severanceFundForm = reactive<SeveranceFund>({
    severanceFundName: "",
  });

  const rules = reactive({
    severanceFundName: [
      { required: true, message: t("name_required"), trigger: "blur" },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: t("name_pattern"),
        trigger: "blur",
      },
    ],
  });
  const showInactive = ref(false);
  const filterTableData = computed(() =>
    severanceFundList.value.filter(
      (data) =>
        (!search.value ||
        data.severanceFundName
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

  const loadSeveranceFund = async () => {
    severanceFundList.value =
      (await severanceFundStore.fetchSeveranceFund(!showInactive.value)) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;

    try {
      severanceFundForm.createdBy = "Fe";
      await severanceFundStore.createSeveranceFundRequest(severanceFundForm);
      await loadSeveranceFund();


      severanceFundForm.severanceFundName = "";
    } catch (error) {
    }
  };

  watch([search, currentPage, pageSize], () => {
    console.log("Filtros actualizados", {
      search: search.value,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });
  });
  watch(showInactive, () => {
    loadSeveranceFund();
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
    showInactive,
    loadSeveranceFund
  };
}
