import { ref, computed, reactive, watch, onMounted } from "vue";
import { useArlStore } from "../stores/arl.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import { useI18n } from "vue-i18n";

export function useArlViewModel() {
  const arlStore = useArlStore();
  const arlList = ref<Arl[]>([]);
  const isLoading = computed(() => arlStore.isLoading);
const { t } = useI18n()

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const arlForm = reactive<Arl>({
    nameArl: "",
  });

  const rules = reactive({
    nameArl: [
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
    arlList.value.filter(
      (data) =>
        (!search.value ||
        data.nameArl.toLowerCase().includes(search.value.toLowerCase()))&&
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

  const loadArl = async () => {
    arlList.value = (await arlStore.fetchArl(!showInactive.value)) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;

    try {
      await arlStore.createArlRequest(arlForm);
      await loadArl();


      arlForm.nameArl = "";
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
    loadArl();
  });

  onMounted(async () => {
    await loadArl();
  });

  return {
    arlList,
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
    arlForm,
    showInactive,
    loadArl
  };
}
