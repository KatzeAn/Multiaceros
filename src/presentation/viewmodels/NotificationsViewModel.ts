import { ref, computed, reactive, watch, onMounted } from "vue";
import { useNotificationConfigStore } from "@/presentation/stores/Notifications.store";
import { ElNotification, type FormInstance } from "element-plus";
import type { NotificationConfig } from "@/domain/Interfaces/Notifications/Notifications.interface";
import { useUserStore } from "@/presentation/stores/user.store";

export function useNotificationConfigViewModel() {
  const notificationStore = useNotificationConfigStore();
  const notificationConfigs = ref<NotificationConfig[]>([]);
  const isLoading = computed(() => notificationStore.isLoading);
 const userStore = useUserStore(); 
  const userId = userStore.getUserId; 


  const search = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const ruleFormRef = ref<FormInstance>();


 
  const notificationForm = reactive<Partial<NotificationConfig>>({
    id: 0,
    name: "",
    description: "",
    isActive: true,
    modifiedBy: userId, 
  });

  const rules = reactive({
    name: [
      { required: true, message: "El nombre es obligatorio", trigger: "blur" },
    ],
  });

  const showInactive = ref(false);
  
  const filterTableData = computed(() =>
    notificationStore.notificationConfigs.filter(
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

  const loadNotifications = async () => {
    try {
      await notificationStore.fetchNotificationConfigs(!showInactive.value);
    } catch (error) {
      console.error(error);
    }
  };
  

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    
    const isValid = await formEl.validate().then(() => true).catch(() => false);
    if (!isValid) return;

    try {
    notificationForm.modifiedBy = userId;
      await notificationStore.updateNotificationConfigRequest(notificationForm.id!, notificationForm);
      await loadNotifications();
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
    loadNotifications();
  });

  onMounted(async () => {
    await loadNotifications();
  });

  return {
    notificationConfigs,
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
    notificationForm,
    showInactive,
    loadNotifications,
    userId
  };
}
