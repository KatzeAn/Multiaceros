import { ref, computed, reactive, watch, onMounted } from "vue";
import { ElNotification, type FormInstance } from "element-plus";
import { useEmployeePotentialStore } from "../stores/employeePotential.store";
import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";

export function useEmployeePotentialViewModel() {
  const employeePotentialStore = useEmployeePotentialStore();
  const EmployeePotentialList = ref<EmployeePotential[]>([]);
  const isLoading = computed(() => employeePotentialStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const employeePotentialForm = reactive<EmployeePotential>({
    documentType: 0,
    numberDocument: "",
    firstName: "",
    middleName: "",
    surName: "",
    dateOfBirth: "",
    email: "",
    cellPhone: "",
  });

  const rules = reactive({
    firstName: [
      { required: true, message: "El nombre es obligatorio", trigger: "blur" },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: "Solo letras y espacios",
        trigger: "blur",
      },
    ],
  });

  const filterTableData = computed(() =>
    EmployeePotentialList.value.filter(
      (data) =>
        !search.value ||
        data.firstName
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

  const loadEmployeePotential = async () => {
    EmployeePotentialList.value =
      (await employeePotentialStore.fetchEmployeePotential()) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    try {
      await formEl.validate();

      await employeePotentialStore.createEmployeePotentialRequest(
        employeePotentialForm
      );
      await loadEmployeePotential();

      ElNotification({
        title: "Éxito",
        message: "Candidato referido correctamente",
        type: "success",
      });

      employeePotentialForm.firstName = "";
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
    await loadEmployeePotential();
  });

  return {
    EmployeePotentialList,
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
    employeePotentialForm,
  };
}
