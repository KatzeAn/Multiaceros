import { ref, computed, reactive, watch, onMounted } from "vue";
import { useEpsStore } from "../stores/eps.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";

export function useEpsViewModel() {
  const epsStore = useEpsStore();
  const epsList = ref<Eps[]>([]);
  const isLoading = computed(() => epsStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const epsForm = reactive<Eps>({
    epsName: "",
    epsTypeId: 0,
  });

  const rules = reactive({
    epsName: [
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
    epsList.value.filter(
      (data) =>
        (!search.value ||
        data.epsName.toLowerCase().includes(search.value.toLowerCase()))&&
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

  const loadEps = async () => {
    epsList.value = (await epsStore.fetchEps(!showInactive.value)) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;

    try {
      await epsStore.createEpsRequest(epsForm);
      await loadEps();

      ElNotification({
        title: "Éxito",
        message: "EPS creado correctamente",
        type: "success",
      });

      epsForm.epsName = "";
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

  watch(showInactive, () => {
    loadEps();
  });

  onMounted(async () => {
    await loadEps();
  });

  return {
    epsList,
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
    epsForm,
    showInactive,
    loadEps
  };
}
