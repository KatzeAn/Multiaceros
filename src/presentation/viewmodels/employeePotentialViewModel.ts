import { ref, computed, reactive, watch, onMounted } from "vue";
import { ElNotification, type FormInstance } from "element-plus";
import { useEmployeePotentialStore } from "../stores/employeePotential.store";
import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";

export function useEmployeePotentialViewModel() {
  const employeePotentialStore = useEmployeePotentialStore();
  const employeePotentialList = ref<EmployeePotential[]>([]);
  const employeePotential = ref<EmployeePotential | null>();
  const isLoading = computed(() => employeePotentialStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const employeePotentialForm = reactive<EmployeePotential>({
    documentType: 1,
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
      {
        required: true,
        message: "El primer nombre es obligatorio",
        trigger: "blur",
      },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: "Solo se permiten letras y espacios",
        trigger: "blur",
      },
    ],
    numberDocument: [
      {
        required: true,
        message: "El número de documento es obligatorio",
        trigger: "blur",
      },
      {
        pattern: /^\d{4,11}$/,
        message: "El documento debe tener entre 4 y 11 dígitos numéricos",
        trigger: "blur",
      },
    ],
    surName: [
      {
        required: true,
        message: "El primer apellido es obligatorio",
        trigger: "blur",
      },
    ],
    dateOfBirth: [
      {
        required: true,
        message: "La fecha de nacimiento es obligatoria",
        trigger: "blur",
      },
    ],
    email: [
      { required: true, message: "El correo es obligatorio", trigger: "blur" },
      { type: "email", message: "Formato de correo inválido", trigger: "blur" },
    ],
    cellPhone: [
      { required: true, message: "El celular es obligatorio", trigger: "blur" },
      {
        pattern: /^\+?[0-9]{7,15}$/,
        message:
          "Número inválido. Debe contener entre 7 y 15 dígitos y puede empezar con '+'",
        trigger: "blur",
      },
    ],
    jobPostingId: [
      {
        required: true,
        message: "Debe seleccionar un puesto",
        trigger: "change",
      },
    ],
  });

  const filterTableData = computed(() =>
    employeePotentialList.value.filter(
      (data) =>
        !search.value ||
        data.firstName.toLowerCase().includes(search.value.toLowerCase())
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
    employeePotentialList.value =
      (await employeePotentialStore.fetchEmployeePotential()) || [];
  };

  const loadEmployeePotentialByDocument = async (numberDocument: number) => {
    employeePotential.value =
      await employeePotentialStore.fetchEmployeePotentialByDocument(
        numberDocument
      );
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
    employeePotentialList,
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
    loadEmployeePotentialByDocument,
    employeePotential,
  };
}
