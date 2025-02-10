import { ref, computed, reactive, watch, onMounted } from "vue";
import { useJobTitleStore } from "../stores/jobTitle.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";

export function useJobTitleViewModel() {
  const jobTitleStore = useJobTitleStore();
  const jobTitles = ref<JobTitle[]>([]);
  const isLoading = computed(() => jobTitleStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const jobTitleForm = reactive<JobTitle>({
    id: 0,
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

  const filterTableData = computed(() =>
    jobTitles.value.filter(
      (data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
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

  const loadJobTitles = async () => {
    jobTitles.value = (await jobTitleStore.fetchJobTitles()) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    try {
      await formEl.validate();
      jobTitleForm.createdBy = "Fe";
      await jobTitleStore.createJobTitleRequest(jobTitleForm);
      await loadJobTitles();

      ElNotification({
        title: "Éxito",
        message: "Cargo creado correctamente",
        type: "success",
      });

      jobTitleForm.name = "";
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

  return {
    jobTitles,
    isLoading,
    search,
    currentPage,
    pageSize,
    ruleFormRef,
    rules,
    paginatedData,
    handlePageChange,
    handleSizeChange,
    loadJobTitles,
    submitForm,
    jobTitleForm,
  };
}
