
import { ApproveAbsenceRequestUseCase, GetMonthlyAbsencesUseCase, GetPendingAbsencesUseCase, GetUpcomingAbsencesUseCase } from "@/domain/use-cases/absence.usecase";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";

export const useAbsenceStore = defineStore('absence', () => {
    const fetchMonthlyAbsences = async () => {
        const result = {
            loading: true,
            absenceList: [] as AbsenceList
        };
        
        try {
            result.loading = true;
            const absencesResponse: AbsenceList = await GetMonthlyAbsencesUseCase.execute();
            result.absenceList = absencesResponse;
        } catch (error) {
            console.error('Error fetching monthly absences:', error);
            result.absenceList = []; // En caso de error, lista vacía
        } finally {
            result.loading = false;
        }
        
        return result;
    };

    const fetchPendingAbsences = async () => {
        const result = {
            loading: true,
            absenceList: [] as AbsenceList
        };
        
        try {
            result.loading = true;
            const absencesResponse: AbsenceList = await GetPendingAbsencesUseCase.execute();
            result.absenceList = absencesResponse;
        } catch (error) {
            console.error('Error fetching pending absences:', error);
            result.absenceList = []; // En caso de error, lista vacía
        } finally {
            result.loading = false;
        }
        
        return result;
    };

    const fetchUpcomingAbsences = async () => {
        const result = {
            loading: true,
            absenceList: [] as AbsenceList
        };
        
        try {
            result.loading = true;
            const absencesResponse: AbsenceList = await GetUpcomingAbsencesUseCase.execute();
            result.absenceList = absencesResponse;
        } catch (error) {
            console.error('Error fetching upcoming absences:', error);
            result.absenceList = []; // En caso de error, lista vacía
        } finally {
            result.loading = false;
        }
        
        return result;
    };

    const ApproveAbsence = async (absenceId: number) => {
        const result = {
            loading: true,
        };
        
        try {
            result.loading = true;
            const absenceResponse: Absence = await ApproveAbsenceRequestUseCase.execute(absenceId);

            if(absenceResponse == null) {
                throw new Error("An expected error ocurred")
            }

            ElNotification({
                title: 'Success',
                message: 'The absence was approved successfully',
                type: 'success',
            })

        } catch (error) {
            console.error('Error approving the absence:', error);
            ElNotification({
                title: 'Error',
                message: 'An expected error ocurred',
                type: 'error',
            })

        } finally {
            result.loading = false;
        }
        
        return result;
    };

    return {
        fetchMonthlyAbsences,
        fetchPendingAbsences,
        fetchUpcomingAbsences,
        ApproveAbsence
    }
})