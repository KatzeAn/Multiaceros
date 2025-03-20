import { ref, computed, reactive, watch, onMounted } from "vue";
import { ElNotification, type FormInstance } from "element-plus";
import { useBenefitStore } from "../stores/benefit.store";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";

export function useBenefitViewModel() {
  const benefitStore = useBenefitStore();
  const benefitList = ref<Benefits[]>([]);
  const isLoading = computed(() => benefitStore.isLoading);

  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();

  const benefitForm = reactive<Benefits>({
    nameBenefit: "",
  });

  const rules = reactive({
    nameBenefit: [
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
    benefitList.value.filter(
      (data) =>
        (!search.value ||
        data.nameBenefit.toLowerCase().includes(search.value.toLowerCase()))&&
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

  const loadBenefit = async () => {
    benefitList.value = (await benefitStore.fetchBenefit(!showInactive.value)) || [];
  };
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    const isValid = await formEl
      .validate()
      .then(() => true)
      .catch(() => false);
    if (!isValid) return;

    try {
      benefitForm.createdBy = "Fe";
      await benefitStore.createBenefitRequest(benefitForm);
      await loadBenefit();
      benefitForm.nameBenefit = "";
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

  onMounted(async () => {
    await loadBenefit();
  });

  return {
    benefitList,
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
    benefitForm,
    showInactive,
  };
}
