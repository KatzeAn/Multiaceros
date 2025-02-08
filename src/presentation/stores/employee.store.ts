import { EmployeeModel } from "@/database/employee/employee.model";
import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";
import {
  ElNotification,
  type FormItemRule,
  type FormRules,
} from "element-plus";
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
      userPhotoUrl:
        "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png",
    },
    bonificationData: {
      bonificationValue: undefined,
      activeBonusDate: "",
      bonusEndDate: "",
    },
    arlData: {
      id: undefined,
      riskId: undefined,
    },
    contractData: {
      contractTypeId: undefined,
      contractStartDate: "",
      contractEndDate: "",
    },
    epsData: {
      id: undefined,
      epsTypeId: undefined,
    },
    pensionFundInfoData: {
      id: undefined,
      pensionFundTypeId: undefined,
    },
    benefits: [
      {
        valueBenefit: undefined,
        id: undefined,
      },
    ],
    newBenefit: {
      id: "", // ID del beneficio seleccionado
      valueBenefits: "", // Valor del beneficio
    },
  });

  const userDataRules: Record<string, Array<FormItemRule>> = {
    numberDocument: [
      {
        required: true,
        message: "El número de documento es obligatorio",
        trigger: "blur",
      },
    ],
    userFirstName: [
      {
        required: true,
        message: "El primer nombre es obligatorio",
        trigger: "blur",
      },
    ],
    surName: [
      {
        required: true,
        message: "El primer apellido es obligatorio",
        trigger: "blur",
      },
    ],
    birthday: [
      {
        required: true,
        message: "La fecha de nacimiento es obligatoria",
        trigger: "blur",
      },
    ],
    cellPhone: [
      { required: true, message: "El celular es obligatorio", trigger: "blur" },
    ],
    address: [
      {
        required: true,
        message: "La dirección es obligatoria",
        trigger: "blur",
      },
    ],
  };

  const epsDataRules: Record<string, Array<FormItemRule>> = {
    epsId: [
      {
        required: true,
        message: "Debe seleccionar una EPS",
        trigger: "change",
      },
    ],
  };

  const arlDataRules: Record<string, Array<FormItemRule>> = {
    arlId: [
      {
        required: true,
        message: "Debe seleccionar una ARL",
        trigger: "change",
      },
    ],
  };

  const rules: FormRules<EmployeeRequest> = reactive({
    salary: {
      required: true,
      message: "El salario es obligatorio",
      trigger: "blur",
    },
    divisionId: [
      {
        required: true,
        message: "Debe seleccionar un departamento",
        trigger: "change",
      },
    ],
    jobTitleId: [
      {
        required: true,
        message: "Debe seleccionar un cargo",
        trigger: "change",
      },
    ],
    bloodTypeId: [
      { required: true, message: "El tipo de sangre es obligatorio" },
    ],
    userData: userDataRules,
    epsData: epsDataRules,
    arlData: arlDataRules,
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
    employeeRequestForm,
    rules,
  };
});
