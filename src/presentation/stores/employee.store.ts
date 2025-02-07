import { EmployeeModel } from "@/database/employee/employee.model";
import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", () => {
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

  return {
    fetchEmployee,
  };
});
