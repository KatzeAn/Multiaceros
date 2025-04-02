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
import { useI18n } from "vue-i18n";

export function useEmployeeViewModel() {
  const employeeStore = useEmployeeStore();
  const employeeList = ref<BasicEmployee[]>([]);
  const isLoading = computed(() => employeeStore.isLoading);
  const { t } = useI18n()

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
        message: t("doc_required"),
        trigger: "blur",
      },
      {
        pattern: /^\d{4,11}$/,
        message: t("doc_pattern"),
        trigger: "blur",
      },
    ],
    userFirstName: [
      {
        required: true,
        message:  t("lastName_required"),
        trigger: "blur",
      },
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
        message:  t("name_pattern"),
        trigger: "blur",
      },
    ],
    userMiddleName: [
      {
        pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]*$/,
        message:  t("name_pattern"),
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
    address: [
      {
        required: true,
        message: t("address_required"),
        trigger: "blur",
      },
    ],
    cellPhone: [
      { required: true, message: t("phone_required"), trigger: "blur" },
      {
        pattern: /^\+?[0-9]{7,15}$/,
        message:
        t("phone_pattern"),
        trigger: "blur",
      },
    ],
    userEmail: [
      { required: true, message: t("email_required"), trigger: "blur" },
      { type: "email", message: t("email_pattern"), trigger: "blur" },
    ],
    birthday: [
      {
        required: true,
        message: t("dob_required"),
        trigger: "blur",
      },
      {
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(t("dob_required")));
          }

          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          // Verificar si ya cumplió años este año
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }

          if (age < 18) {
            return callback(new Error(t("must_be_adult")));
          } else {
            return callback();
          }
        },
        trigger: "blur",
      },
    ],
  };

  const epsDataRules: Record<string, Array<FormItemRule>> = {
    id: [
      {
        required: true,
        message: t("select_eps"),
        trigger: "change",
      },
    ],
    epsTypeId: [
      {
        required: true,
        message: t("select_eps_type"),
        trigger: "change",
      },
    ],
  };
  
  const arlDataRules: Record<string, Array<FormItemRule>> = {
    id: [
      {
        required: true,
        message: t("select_arl"),
        trigger: "change",
      },
    ],
    riskId: [
      {
        required: true,
        message: t("select_risk_level"),
        trigger: "change",
      },
    ],
  };
  
  const contractDataRules: Record<string, Array<FormItemRule>> = {
    contractTypeId: [
      {
        required: true,
        message: t("select_contract_type"),
        trigger: "change",
      },
    ],
    contractStartDate: [
      {
        required: true,
        message: t("select_start_date"),
        trigger: "blur",
      },
    ],
    contractEndDate: [
      {
        type: "date",
        message: t("valid_end_date"),
        trigger: "blur",
      },
    ],
  };
  
  const bonificationDataRules: Record<string, Array<FormItemRule>> = {
    bonificationValue: [
      {
        required: true,
        message: t("enter_bonus_value"),
        trigger: "blur",
      },
      {
        type: "number",
        min: 0.01,
        max: 1000000000,
        message: t("bonus_value_range"),
        trigger: "blur",
      },
    ],
    activeBonusDate: [
      {
        required: true,
        message: t("enter_bonus_start_date"),
        trigger: "blur",
      },
    ],
    bonusEndDate: [
      {
        required: true,
        message: t("enter_bonus_end_date"),
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
        message: t("select_pension_fund"),
        trigger: "change",
      },
    ],
    pensionFundTypeId: [
      {
        required: true,
        message: t("select_pension_fund_type"),
        trigger: "change",
      },
    ],
  };
  
  const rules = reactive({
    salary: [
      { required: true, message: t("salary_required"), trigger: "blur" },
      {
        type: "number",
        min: 0,
        max: 1000000000,
        message: t("salary_range"),
        trigger: "blur",
      },
    ],
    divisionId: [
      {
        required: true,
        message: t("select_department"),
        trigger: "change",
      },
    ],
    jobTitleId: [
      {
        required: true,
        message: t("select_job_title"),
        trigger: "change",
      },
    ],
    bloodTypeId: [
      {
        required: true,
        message: t("blood_type_required"),
        trigger: "change",
      },
    ],
    severanceFundId: [
      {
        required: true,
        message: t("select_severance_fund"),
        trigger: "change",
      },
    ],
    familyCompensationFundId: [
      {
        required: true,
        message: t("select_compensation_fund"),
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

const showInactive = ref(false);
const filterTableData = computed(() =>
  employeeList.value.filter(
    (data) =>
      (!search.value || data.fullName.toLowerCase().includes(search.value.toLowerCase())) &&
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

  const loadEmployee = async () => {
    employeeList.value = (await employeeStore.fetchEmployee()) || [];
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
      await employeeStore.createEmployeeRequest(employeeRequestForm.value);
      resetForm(ruleFormRef.value);
      emit("employee-saved");
    } catch (error) {
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
    loadEmployee,
    showInactive,
  };
}
