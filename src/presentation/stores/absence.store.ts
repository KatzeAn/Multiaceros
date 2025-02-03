import type { AbsenceRequest } from "@/domain/Interfaces/AbsenceRequest.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useUserStore } from "@/presentation/stores/user.store";
import { AbsenceModel } from "@/database/absence/absences.model";

export const useAbsenceStore = defineStore("absence", () => {
  const absenceRequestForm = reactive<AbsenceRequest>({
    from: "",
    to: "",
    type: "",
    comment: "",
    evidencePath: "c://file.pdf",
    requestedById: "",
  });

  const fetchAbsences = async (type: keyof AbsenceModel) => {
    const result = {
      loading: true,
      absenceList: [] as Absence[],
    };

    try {
      const absenceService = new AbsenceModel();

      // Verifica si el método existe antes de llamarlo
      if (typeof absenceService[type] === "function") {
        const absencesResponse = await (
          absenceService[type] as () => Promise<Absence[]>
        )();
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

  // Métodos específicos reutilizando la función genérica
  const fetchMonthlyAbsences = () => fetchAbsences("getMonthlyAbsences");
  const fetchPendingAbsences = () => fetchAbsences("getPendingAbsences");
  const fetchUpcomingAbsences = () => fetchAbsences("getUpcomingAbsences");

  const approveAbsence = async (absenceId: number) => {
    try {
      const absenceService = new AbsenceModel();
      await absenceService.approveAbsenceRequest(absenceId);

      ElNotification({
        title: "Success",
        message: "The absence was approved successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error approving the absence:", error);
      ElNotification({
        title: "Error",
        message: "An unexpected error occurred",
        type: "error",
      });
    }
  };

  const createAbsenceRequest = async () => {
    try {
      const absenceService = new AbsenceModel();
      const userId = useUserStore().getUserId;

      await absenceService.createAbsenceRequest(
        absenceRequestForm.from,
        absenceRequestForm.to,
        absenceRequestForm.type,
        absenceRequestForm.evidencePath,
        absenceRequestForm.comment,
        userId
      );

      ElNotification({
        title: "Success",
        message: "The data was saved successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error creating absence request:", error);
      ElNotification({
        title: "Error",
        message: "An error occurred while saving the form",
        type: "error",
      });
      throw error;
    }
  };

  return {
    fetchMonthlyAbsences,
    fetchPendingAbsences,
    fetchUpcomingAbsences,
    approveAbsence,
    absenceRequestForm,
    createAbsenceRequest,
  };
});
