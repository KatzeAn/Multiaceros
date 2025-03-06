import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { EpsModel } from "@/database/eps/eps.model";
import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";
import { ref } from "vue";
import { useUserStore } from "./user.store";

export const useEpsStore = defineStore("eps", () => {
  const epsList = ref<Eps[]>([]);
  const isLoading = ref(false);

  const fetchEps = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const epsModel = new EpsModel();
      const data = await epsModel.getEps(isActive);
      epsList.value = Array.isArray(data) ? [...data] : [];
      return epsList.value;
    } catch (error) {
      console.error(error);
      epsList.value = [];
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los EPS",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createEpsRequest = async (eps: Eps) => {
    try {
      isLoading.value = true;
      const epsModel = new EpsModel();
      await epsModel.createEps(eps);
      await fetchEps(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteEpsRequest = async (id: number) => {
    try {
        isLoading.value = true;
        const epsModel = new EpsModel();

        const userStore = useUserStore();
        const userId = userStore.getUserId; 
        await epsModel.deleteEps(id, userId);

        ElNotification({
            title: "Éxito",
            message: "EPS eliminada con éxito.",
            type: "success",
        });

        await fetchEps();
    } catch (error) {
        ElNotification({
            title: "Error",
            message: "No se pudo eliminar la EPS.",
            type: "error",
        });
    } finally {
        isLoading.value = false;
    }
};
 const updateEpsRequest = async (id: number, epsName: string) => {
  try {
    isLoading.value = true;
    const epsModel = new EpsModel();
    await epsModel.updateEps(id, epsName);

    ElNotification({
      title: "Éxito",
      message: "EPS actualizada con éxito.",
      type: "success",
    });
    await fetchEps();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo actualizar la EPS.",
        type: "error",
        });
        } finally {
          isLoading.value = false;
          }
          };


  return {
    isLoading,
    fetchEps,
    createEpsRequest,
    deleteEpsRequest,
    updateEpsRequest,
  };
});
