import { EmployeeModel } from "@/database/employee/employee.model";
import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useEmployeeStore = defineStore("employee", () => {
  const employeeRequestForm = reactive<EmployeeRequest>({
    createdBy: "Admin",
    salary: undefined,
    divisionId: undefined,
    jobTitleId: undefined,
    bloodTypeId: undefined,
    severanceFundId: undefined,
    familyCompensationFundId: undefined,
    userData: {
      numberDocument: "",
      userFirstName: "",
      userMiddleName: "",
      surName: "",
      address: "",
      cellPhone: "",
      userEmail: "",
      birthday: undefined,
      userPhotoUrl: "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png",
    },
    bonificationData: {
      bonificationValue: undefined,
      activeBonusDate: "",
      bonusEndDate: "",
    },
    arlData: {
      arlId: undefined,
      riskId: undefined,
    },
    contractData: {
      contractTypeId: undefined,
      contractStartDate: "",
      contractEndDate: "",
    },
    epsData: {
      epsId: undefined,
      epsTypeId: undefined,
    },
    pensionFundInfoData: {
      pensionFundId: undefined,
      pensionFundTypeId: undefined,
    },
    benefits: [
      {
        valueBenefit: undefined,
        benefitId: undefined
      }
    ],
    newBenefit: {
      benefitId: "", // ID del beneficio seleccionado
      valueBenefits: "", // Valor del beneficio
    },
  });

  const fetchEmployee = async () => {
    const result = {
      loading: true,
      employeeList: [] as BasicEmployee[],
    };

    try {
      result.loading = true;
      const employeeModel = new EmployeeModel();
      const employeeResponse: BasicEmployee[] =
        await employeeModel.getEmployees();
      result.employeeList = employeeResponse;
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      result.employeeList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  const createEmployeeRequest = async () => {
    try {
      const employeeService = new EmployeeModel();
      await employeeService.createEmployee(employeeRequestForm);

      ElNotification({
        title: "Success",
        message: "The data was saved successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error creating employee request:", error);
      ElNotification({
        title: "Error",
        message: "An error occurred while saving the form",
        type: "error",
      });
      throw error;
    }
  };

  return {
    fetchEmployee,
    createEmployeeRequest,
    employeeRequestForm
  };
});
