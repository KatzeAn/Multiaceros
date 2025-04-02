import { ref, computed, reactive, watch, onMounted } from "vue";
import { type FormInstance } from "element-plus";
import { useEmployeePotentialStore } from "../stores/employeePotential.store";
import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";
import { useI18n } from "vue-i18n";

export function useEmployeePotentialViewModel() {
  const employeePotentialStore = useEmployeePotentialStore();
  const employeePotentialList = ref<EmployeePotential[]>([]);
  const employeePotential = ref<EmployeePotential | null>();
  const isLoading = computed(() => employeePotentialStore.isLoading);
  const { t } = useI18n()

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();
  const uploadedFile = ref<File | null>(null);

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
        message: t("firstName_required"),
        trigger: "blur",
      },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message: t("firstName_pattern"),
        trigger: "blur",
      },
    ],
    numberDocument: [
      {
        required: true,
        message: t("doc_required"),
        trigger: "blur",
      },
      {
        pattern: /^\d{4,11}$/,
        message: t("doc_pattern"),
        trigger: "blur",
      },
    ],
    surName: [
      {
        required: true,
        message: t("lastName_required"),
        trigger: "blur",
      },
    ],
    dateOfBirth: [
      {
        required: true,
        message: t("dob_required"),
        trigger: "blur",
      },
    ],
    email: [
      { required: true, message: t("email_required"), trigger: "blur" },
      { type: "email", message: t("email_pattern"), trigger: "blur" },
    ],
    cellPhone: [
      { required: true, message: t("phone_required"), trigger: "blur" },
      {
        pattern: /^\+?[0-9]{7,15}$/,
        message: t("phone_pattern"),
        trigger: "blur",
      },
    ],
    jobPostingId: [
      {
        required: true,
        message: t("job_required"),
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

  const submitForm = async (
    formEl: FormInstance | undefined,
    emit: (event: "employee-saved") => void
  ) => {
    if (!formEl) return;
  
    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;
    try {
      const formattedDate = employeePotentialForm.dateOfBirth
      ? new Date(employeePotentialForm.dateOfBirth).toISOString().split("T")[0]
      : "";
      const employeeData = {
        ...employeePotentialForm,
        dateOfBirth: formattedDate,
      };
      await employeePotentialStore.createEmployeePotentialRequest(
        employeeData,
        uploadedFile.value ?? new File([], "") 
      );      
      emit("employee-saved");
      resetForm();
    } catch (error) {
    }
  };
  

  const resetForm = () => {
    employeePotentialForm.documentType = 1;
    employeePotentialForm.numberDocument = "";
    employeePotentialForm.firstName = "";
    employeePotentialForm.middleName = "";
    employeePotentialForm.surName = "";
    employeePotentialForm.dateOfBirth = "";
    employeePotentialForm.email = "";
    employeePotentialForm.cellPhone = "";
    employeePotentialForm.jobPostingId = undefined;
    uploadedFile.value = null;
  };

  watch([search, currentPage, pageSize], () => {
    console.log("Filtros actualizados", {
      search: search.value,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });
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
    uploadedFile,
    loadEmployeePotentialByDocument,
    employeePotential,
    loadEmployeePotential,
  };
}
