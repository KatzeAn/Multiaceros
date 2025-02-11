import { ref, computed, reactive, watch, onMounted } from "vue";
import { useEmployeeStore } from "../stores/employee.store";
import {
  ElNotification,
  type FormInstance,
  type FormItemRule,
  type FormRules,
} from "element-plus";
import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

export function useEmployeeViewModel() {
  const employeeStore = useEmployeeStore();
  const employeeList = ref<BasicEmployee[]>([]);
  const isLoading = computed(() => employeeStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const employeeRequestForm = ref<EmployeeRequest>({
    createdBy: "Admin",
    salary: undefined,
    divisionId: undefined,
    jobTitleId: undefined,
    bloodTypeId: undefined,
    severanceFundId: undefined,
    familyCompensationFundId: undefined,
    userData: {
      numberDocument: "",
      userFirstName: "",
      userMiddleName: "",
      surName: "",
      address: "",
      cellPhone: "",
      userEmail: "",
      birthday: undefined,
      userPhotoUrl:
        "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png",
    },
    bonificationData: {
      bonificationValue: undefined,
      activeBonusDate: "",
      bonusEndDate: "",
    },
    arlData: {
      id: undefined,
      riskId: undefined,
    },
    contractData: {
      contractTypeId: undefined,
      contractStartDate: "",
      contractEndDate: "",
    },
    epsData: {
      id: undefined,
      epsTypeId: undefined,
    },
    pensionFundInfoData: {
      id: undefined,
      pensionFundTypeId: undefined,
    },
    benefits: [
      {
        valueBenefit: undefined,
        id: undefined,
      },
    ],
    newBenefit: {
      id: "", // ID del beneficio seleccionado
      valueBenefits: "", // Valor del beneficio
    },
  });

  const userDataRules: Record<string, Array<FormItemRule>> = {
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
    userFirstName: [
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
    userMiddleName: [
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]*$/,
        message: "Solo se permiten letras y espacios",
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
    address: [
      {
        required: true,
        message: "La dirección es obligatoria",
        trigger: "blur",
      },
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
    userEmail: [
      { required: true, message: "El correo es obligatorio", trigger: "blur" },
      { type: "email", message: "Formato de correo inválido", trigger: "blur" },
    ],
    birthday: [
      {
        required: true,
        message: "La fecha de nacimiento es obligatoria",
        trigger: "blur",
      },
    ],
  };

  const epsDataRules: Record<string, Array<FormItemRule>> = {
    id: [
      {
        required: true,
        message: "Debe seleccionar una EPS",
        trigger: "change",
      },
    ],
    epsTypeId: [
      {
        required: true,
        message: "Debe seleccionar un tipo de EPS",
        trigger: "change",
      },
    ],
  };

  const arlDataRules: Record<string, Array<FormItemRule>> = {
    id: [
      {
        required: true,
        message: "Debe seleccionar una ARL",
        trigger: "change",
      },
    ],
    riskId: [
      {
        required: true,
        message: "Debe seleccionar un nivel de riesgo",
        trigger: "change",
      },
    ],
  };

  const contractDataRules: Record<string, Array<FormItemRule>> = {
    contractTypeId: [
      {
        required: true,
        message: "Debe seleccionar un tipo de contrato",
        trigger: "change",
      },
    ],
    contractStartDate: [
      {
        required: true,
        message: "Debe seleccionar una fecha de inicio",
        trigger: "blur",
      },
    ],
    contractEndDate: [
      {
        type: "date",
        message: "La fecha de finalización debe ser válida",
        trigger: "blur",
      },
    ],
  };

  const bonificationDataRules: Record<string, Array<FormItemRule>> = {
    bonificationValue: [
      {
        required: true,
        message: "Debe ingresar un valor de bonificación",
        trigger: "blur",
      },
      {
        type: "number",
        min: 0.01,
        max: 1000000000,
        message: "Debe estar entre 0.01 y 1,000,000,000",
        trigger: "blur",
      },
    ],
    activeBonusDate: [
      {
        required: true,
        message: "Debe ingresar la fecha de inicio de la bonificación",
        trigger: "blur",
      },
    ],
    bonusEndDate: [
      {
        required: true,
        message: "Debe ingresar la fecha de fin de la bonificación",
        trigger: "blur",
      },
    ],
  };

  // const benefitsRules: Record<string, Array<FormItemRule>> = {
  //   benefitId: [
  //     {
  //       required: true,
  //       message: "Debe seleccionar un beneficio",
  //       trigger: "change",
  //     },
  //   ],
  //   valueBenefits: [
  //     {
  //       type: "number",
  //       min: 0.01,
  //       max: 1000000000,
  //       message: "Debe estar entre 0.01 y 1,000,000,000",
  //       trigger: "blur",
  //     },
  //   ],
  // };

  const pensionFundInfoRules: Record<string, Array<FormItemRule>> = {
    id: [
      {
        required: true,
        message: "Debe seleccionar un fondo de pensiones",
        trigger: "change",
      },
    ],
    pensionFundTypeId: [
      {
        required: true,
        message: "Debe seleccionar un tipo de fondo de pensiones",
        trigger: "change",
      },
    ],
  };

  const rules = reactive({
    salary: [
      { required: true, message: "El salario es obligatorio", trigger: "blur" },
      {
        type: "number",
        min: 0,
        max: 1000000000,
        message: "El salario debe estar entre 0 y 1,000,000,000",
        trigger: "blur",
      },
    ],
    divisionId: [
      {
        required: true,
        message: "Debe seleccionar un departamento",
        trigger: "change",
      },
    ],
    jobTitleId: [
      {
        required: true,
        message: "Debe seleccionar un cargo",
        trigger: "change",
      },
    ],
    bloodTypeId: [
      {
        required: true,
        message: "El tipo de sangre es obligatorio",
        trigger: "change",
      },
    ],
    severanceFundId: [
      {
        required: true,
        message: "Debe seleccionar un fondo de cesantías",
        trigger: "change",
      },
    ],
    familyCompensationFundId: [
      {
        required: true,
        message: "Debe seleccionar una caja de compensación",
        trigger: "change",
      },
    ],
    userData: userDataRules,
    epsData: epsDataRules,
    arlData: arlDataRules,
    contractData: contractDataRules,
    bonificationData: bonificationDataRules,
    pensionFundInfoData: pensionFundInfoRules,
  });

  const filterTableData = computed(() =>
    employeeList.value.filter(
      (data) =>
        !search.value ||
        data.fullName.toLowerCase().includes(search.value.toLowerCase())
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

  const loadEmployee = async () => {
    employeeList.value = (await employeeStore.fetchEmployee()) || [];
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    try {
      await formEl.validate();
      await employeeStore.createEmployeeRequest(employeeRequestForm.value);
      await loadEmployee();
      resetForm(ruleFormRef.value);
      ElNotification({
        title: "Éxito",
        message: "Empleado creado correctamente",
        type: "success",
      });
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "Error al crear el empleado",
        type: "error",
      });
    }
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  watch([search, currentPage, pageSize], () => {
    console.log("Filtros actualizados", {
      search: search.value,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });
  });

  onMounted(async () => {
    await loadEmployee();
  });

  return {
    employeeList,
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
    employeeRequestForm,
  };
}
