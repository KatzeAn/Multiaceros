import { defineStore } from "pinia";
import { useUserStore } from "./user.store";
import { DivisionModel } from "@/database/division/division.model";
import type { Teammate } from "@/domain/Interfaces/Division/teammate.interface";
import { stringToNumber } from "../common/helper/stringTonumber.helper";
import type { Division } from "@/domain/Interfaces/Division/division.interface";
import { reactive } from "vue";
import { ElNotification } from "element-plus";

export const useDivisionStore = defineStore("division", () => {
  const divisionForm = reactive<Partial<Division>>({
    name: "",
  });

  const createDivisionRequest = async () => {
    try {
      const divisionModel = new DivisionModel();
      divisionModel.createDivision(
        divisionForm.name ? divisionForm.name : "",
        "FE"
      );

      ElNotification({
        title: "Success",
        message: "The data was saved successfully",
        type: "success",
      });
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "An error occurred while saving the form",
        type: "error",
      });
    }
  };

  const fetchDivisions = async () => {
    const result = {
      loading: true,
      divisionList: [] as Division[],
    };

    try {
      result.loading = true;
      const divisionModel = new DivisionModel();
      const response: Division[] = await divisionModel.getDivisions();
      result.divisionList = response;
    } catch (error) {
      console.error("Error fetching division:", error);
      result.divisionList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  const fetchMyTeammate = async () => {
    const userId = stringToNumber(useUserStore().getUserId);

    if (userId === null) {
      throw new Error("An unexpected error");
    }

    const result = {
      loading: true,
      teammateList: [] as Teammate[],
    };

    try {
      result.loading = true;
      const divisionService = new DivisionModel();
      const response: Teammate[] = await divisionService.getTeammates(userId);
      result.teammateList = response;
    } catch (error) {
      console.error("Error fetching teammates:", error);
      result.teammateList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    createDivisionRequest,
    fetchMyTeammate,
    fetchDivisions,
    divisionForm,
  };
});