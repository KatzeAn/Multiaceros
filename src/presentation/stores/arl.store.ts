import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { ArlModel } from "@/database/arl/arl.model";
import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import { useUserStore } from "./user.store";

export const useArlStore = defineStore("arl", () => {
  const isLoading = ref(false);

  const fetchArl = async () => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();
      const data = await arlModel.getAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar las ARL",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createArlRequest = async (data: Arl) => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();
      await arlModel.create(data.nameArl);
      await fetchArl(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteArlRequest = async (id: number) => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();

      const userStore = useUserStore();
      const userId = userStore.getUserId; 
      await arlModel.delete(id, userId);

      ElNotification({
        title: "Éxito",
        message: "ARL eliminada con éxito.",
        type: "success",
    });
      await fetchArl(); 
    } catch (error) {
      ElNotification({
          title: "Error",
          message: "No se pudo eliminar la ARL.",
          type: "error",
      });
  } finally {
      isLoading.value = false;
  }
};

  return {
    isLoading,
    fetchArl,
    createArlRequest,
    deleteArlRequest,
  };
});
