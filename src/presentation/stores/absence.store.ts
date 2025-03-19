import type { AbsenceRequest } from "@/domain/Interfaces/Absence/AbsenceRequest.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useUserStore } from "@/presentation/stores/user.store";
import { AbsenceModel } from "@/database/absence/absences.model";

export const useAbsenceStore = defineStore("absence", () => {
  const errorMessage = ref<string | null | undefined>(null);
  const absenceRequestForm = reactive<AbsenceRequest>({
    StartDate: "",
    EndDate: "",
    AbsenceTypeId: "",
    Comment: "",
    EvidenceFilePath: "c://file.pdf",
    UserId: "",
    name: "",
  });

  const fetchAbsences = async (type: keyof AbsenceModel, isActive?: boolean) => {
    const result = {
      loading: true,
      absenceList: [] as Absence[],
    };
  
    try {
      const absenceService = new AbsenceModel();
  
      if (typeof absenceService[type] === "function") {
        const absencesResponse = isActive !== undefined
          ? await (absenceService[type] as (isActive: boolean) => Promise<Absence[]>)(isActive)
          : await (absenceService[type] as () => Promise<Absence[]>)();
        
        result.absenceList = absencesResponse;
      } else {
        throw new Error(`Method ${type} does not exist on AbsenceModel`);
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      result.loading = false;
    }
  
    return result;
  };
  
  const fetchMonthlyAbsences = () => fetchAbsences("getMonthlyAbsences");
  const fetchPendingAbsences = () => fetchAbsences("getPendingAbsences");
  const fetchUpcomingAbsences = () => fetchAbsences("getUpcomingAbsences");
  const fetchAllAbsences = () => fetchAbsences("getAbsences");
  const fetchApprovedAbsences = () => fetchAbsences("getApprovedAbsences");
  const fetchRejectedAbsences = () => fetchAbsences("getRejectedAbsences");
  const fetchAbsenceTypes = async (isActive: boolean) => {return fetchAbsences("getAbsenceTypes", isActive);};
  
  const approveAbsence = async (absenceId: number) => { 
    try {
      const absenceService = new AbsenceModel();
      await absenceService.approveAbsenceRequest(absenceId); 
      ElNotification({
        title: 'Éxito',
        message: 'La ausencia ha sido aprobada correctamente.',
        type: 'success',
    });
    } catch (error: any) {
        errorMessage.value = error as string;
        ElNotification({
            title: 'Error',
            message: errorMessage.value,
            type: 'error',
        });
    }
};

  const createAbsenceRequest = async () => {
    try {
      const absenceService = new AbsenceModel();
      const userId = useUserStore().getUserId;

      await absenceService.createAbsenceRequest(
        absenceRequestForm.StartDate,
        absenceRequestForm.EndDate,
        absenceRequestForm.AbsenceTypeId,
        absenceRequestForm.EvidenceFilePath,
        absenceRequestForm.Comment,
        userId
      );
      ElNotification({
        title: 'Éxito',
        message: 'La ausencia ha sido creada',
        type: 'success',
    });
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
          title: 'Error',
          message: errorMessage.value,
          type: 'error',
      });
  }
  };
  const updateAbsenceRequest = async (absenceId: number) => {
    try {
      const absenceService = new AbsenceModel();
      const userId = useUserStore().getUserId;
  
      await absenceService.updateAbsenceRequest(
        absenceId,
        absenceRequestForm.StartDate,
        absenceRequestForm.EndDate,
        absenceRequestForm.AbsenceTypeId,
        absenceRequestForm.EvidenceFilePath,
        absenceRequestForm.Comment,
        userId
      );
  
      ElNotification({
        title: "Éxito",
        message: "La ausencia ha sido actualizada",
        type: "success",
      });
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
          title: 'Error',
          message: errorMessage.value,
          type: 'error',
      });
  }
  };
  const deleteAbsenceRequest = async (absenceId: number) => {
    try {
      const absenceService = new AbsenceModel();
      await absenceService.deleteAbsenceRequest(absenceId);
  
      ElNotification({
        title: "Éxito",
        message: "La ausencia ha sido eliminada",
        type: "success",
      });
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
          title: 'Error',
          message: errorMessage.value,
          type: 'error',
      });
  }
  };

  const rejectAbsence = async (absenceId: number) => {
    try {
      const absenceService = new AbsenceModel();
      await absenceService.rejectAbsenceRequest(absenceId);

      ElNotification({
        title: "Éxito",
        message: "La ausencia ha sido rechazada",
        type: "success",
      });
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
    updateAbsenceRequest,
    deleteAbsenceRequest,
    fetchMonthlyAbsences,
    fetchPendingAbsences,
    fetchUpcomingAbsences,
    approveAbsence,
    rejectAbsence,
    absenceRequestForm,
    createAbsenceRequest,
    fetchAllAbsences,
    fetchApprovedAbsences,
    fetchRejectedAbsences,
    fetchAbsenceTypes,
    };
});
