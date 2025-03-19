import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { FamilyCompesationFundsModel } from "@/database/familyCompesationFunds/familyCompesationFunds.model";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";
import { useUserStore } from "./user.store";

export const useFamilyCompensationFundStore = defineStore(
  "familyCompensationFund",
  () => {
    
    const familyCompensationFunds = ref<FamilyCompensationFunds[]>([]);
    const isLoading = ref(false);
    const errorMessage = ref<string | null | undefined>(null);
    

    const fetchFamilyCompensationFund = async (isActive: boolean = false) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        const data = await familyCompensationFundModel.getFamilyCompesationFunds(isActive);
        familyCompensationFunds.value = Array.isArray(data) ? [...data] : [];
        return familyCompensationFunds.value;
      } catch (error) {
        console.error(error);
        familyCompensationFunds.value = [];
        ElNotification({
          title: "Error",
          message: "No se pudieron cargar los fondos de compensación familiar",
          type: "error",
        });
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    const createFamilyCompensationFundRequest = async (
      data: FamilyCompesationFunds
    ) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        await familyCompensationFundModel.createFamilyCompesationFunds(data);
        await fetchFamilyCompensationFund(); // Recargar lista después de crear
        ElNotification({
          title: "Éxito",
          message: "Fondo de compensación creado con éxito.",
          type: "success",
        })
      } catch (error: any) {
              errorMessage.value = error as string;
              ElNotification({
                  title: 'Error',
                  message: errorMessage.value,
                  type: 'error',
              });
          }
    };

    const deleteFamilyCompesationRequest = async (compesationfundsID: number) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();

        const userStore = useUserStore();
        const userId = userStore.getUserId;
        await familyCompensationFundModel.deleteFamilyCompesationFunds(compesationfundsID, userId );
        
        ElNotification ({
          title: "Exito",
          message: "Fondo de compensación familiar eliminado con éxito",
          type: "success",
          });

          await fetchFamilyCompensationFund();
          } catch (error: any) {
                  errorMessage.value = error as string;
                  ElNotification({
                      title: 'Error',
                      message: errorMessage.value,
                      type: 'error',
                  });
              }
        
        }
        const updateFamilyCompensationFundsRequest = async (id: number, compensationFundName: string) => {
          try {
            isLoading.value = true;
            const familyCompensationModel = new FamilyCompesationFundsModel();
            const userStore = useUserStore();
            const userId = userStore.getUserId;
        
            await familyCompensationModel.updateFamilyCompensationFunds(id, compensationFundName, userId);
        
            ElNotification({
              title: "Éxito",
              message: "Fondo de compensación actualizado con éxito.",
              type: "success",
            });
        
            await fetchFamilyCompensationFund();
          } catch (error: any) {
            errorMessage.value = error as string;
            ElNotification({
                title: 'Error',
                message: errorMessage.value,
                type: 'error',
            });
        }
        };
        




    return {
      isLoading,
      fetchFamilyCompensationFund,
      createFamilyCompensationFundRequest,
      deleteFamilyCompesationRequest,
      updateFamilyCompensationFundsRequest,
    };
  }
);
