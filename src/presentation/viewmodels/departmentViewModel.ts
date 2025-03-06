import { ref, computed, reactive, watch, onMounted } from "vue";
import { useDivisionStore } from "../stores/division.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { Division } from "@/domain/Interfaces/Division/division.interface";

export function useDepartmentViewModel() {
  const divisionStore = useDivisionStore();
  const divisionList = ref<Division[]>([]);
  const isLoading = computed(() => divisionStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const divisionForm = reactive<Division>({
    name: "",
  });

  const rules = reactive({
    name: [
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
  divisionList.value.filter(
    (data) =>
      (!search.value || data.name.toLowerCase().includes(search.value.toLowerCase())) &&
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

  const loadDivision = async () => {
    divisionList.value = (await divisionStore.fetchDivision(!showInactive.value)) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;

    try {
      await divisionStore.createDivisionRequest(divisionForm);
      await loadDivision();

      ElNotification({
        title: "Éxito",
        message: "EPS creado correctamente",
        type: "success",
      });

      divisionForm.name = "";
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
    loadDivision();
  });
  
  onMounted(async () => {
    await loadDivision();
  });

  return {
    divisionList,
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
    divisionForm,
    showInactive,
    loadDivision
  };
}
