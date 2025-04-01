import type { AbsenceRequest } from "@/domain/Interfaces/Absence/AbsenceRequest.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useUserStore } from "@/presentation/stores/user.store";
import { AbsenceModel } from "@/database/absence/absences.model";
import { useI18n } from "vue-i18n";

export const useAbsenceStore = defineStore("absence", () => {
  const { t } = useI18n();
  const errorMessage = ref<string | null | undefined>(null);
  const absenceRequestForm = reactive<AbsenceRequest>({
    StartDate: "",
    EndDate: "",
    AbsenceTypeId: "",
    Comment: "",
    EvidenceFilePath: "c://file.pdf",
    UserId: "",
    name: "",
    isActive: true,
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
  
  const notifySuccess = (messageKey: string) => {
    ElNotification({
      title: t("notifications.success.title"),
      message: t(messageKey),
      type: "success",
    });
  };

  const notifyError = (error: any) => {
    errorMessage.value = error as string;
    ElNotification({
      title: t("notifications.error.title"),
      message: errorMessage.value,
      type: "error",
    });
  };

  const approveAbsence = async (absenceId: number) => { 
    try {
      const absenceService = new AbsenceModel();
      await absenceService.approveAbsenceRequest(absenceId); 
      notifySuccess("notifications.success.approve");
    } catch (error: any) {
      notifyError(error);
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
      notifySuccess("notifications.success.create");
    } catch (error: any) {
      notifyError(error);
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
      notifySuccess("notifications.success.update");
    } catch (error: any) {
      notifyError(error);
    }
  };

  const deleteAbsenceRequest = async (absenceId: number) => {
    try {
      const absenceService = new AbsenceModel();
      await absenceService.deleteAbsenceRequest(absenceId);
      notifySuccess("notifications.success.delete");
    } catch (error: any) {
      notifyError(error);
    }
  };

  const rejectAbsence = async (absenceId: number) => {
    try {
      const absenceService = new AbsenceModel();
      await absenceService.rejectAbsenceRequest(absenceId);
      notifySuccess("notifications.success.reject");
    } catch (error: any) {
      notifyError(error);
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
