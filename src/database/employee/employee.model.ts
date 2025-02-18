import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import type { Employee } from "@/domain/Interfaces/Employee/employee.interface";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";
import type { EmployeeRepository } from "@/domain/repository/employee/employee.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EmployeeModel implements EmployeeRepository {
  getEmploymentCertificate(userId: number): Promise<Blob> {
    return apiRequest<Blob>(
      "get",
      `Employee/${userId}/employment-certificate`,
      undefined,
      { responseType: "blob" }
    );
  }
  getActiveEmployees(): Promise<Employee[]> {
    return apiRequest<Employee[]>("get", "Employee/employeeactivate");
  }
  getEmployees(): Promise<BasicEmployee[]> {
    return apiRequest<BasicEmployee[]>("get", "Employee/All");
  }
  createEmployee(employee: EmployeeRequest): Promise<EmployeeRequest> {
    return apiRequest<EmployeeRequest>("post", "Employee/", {
      createdBy: employee.createdBy,
      salary: employee.salary,
      divisionId: employee.divisionId,
      jobTitleId: employee.jobTitleId,
      bloodTypeId: employee.bloodTypeId,
      severanceFundId: employee.severanceFundId,
      familyCompensationFundId: employee.familyCompensationFundId,
      UserData: {
        numberDocument: employee.userData.numberDocument,
        userFirstName: employee.userData.userFirstName,
        userMiddleName: employee.userData.userMiddleName,
        surName: employee.userData.surName,
        address: employee.userData.address,
        cellPhone: employee.userData.cellPhone,
        userEmail: employee.userData.userEmail,
        birthday: employee.userData.birthday ? new Date(employee.userData.birthday) : undefined,
        userPhotoUrl: employee.userData.userPhotoUrl,
      },
      ArlData: {
        arlId: employee.arlData.id,
        riskId: employee.arlData.riskId,
      },
      ContractData: {
        contractTypeId: employee.contractData.contractTypeId,
        contractStartDate: employee.contractData.contractStartDate ? new Date(employee.contractData.contractStartDate) : undefined,
        contractEndDate: employee.contractData.contractEndDate ? new Date(employee.contractData.contractEndDate) : undefined,
      },
      EpsData: {
        epsId: employee.epsData.id,
        epsTypeId: employee.epsData.epsTypeId,
      },
      BonificationData: {
        bonificationValue: employee.bonificationData.bonificationValue,
        activeBonusDate: employee.bonificationData.activeBonusDate ? new Date(employee.bonificationData.activeBonusDate) : undefined,
        bonusEndDate: employee.bonificationData.bonusEndDate ? new Date(employee.bonificationData.bonusEndDate) : undefined,
      },
      Benefits: employee.benefits.map(benefit => ({
        benefitId: benefit.id,
        valueBenefits: benefit.valueBenefit,
        activeBenefitDate: benefit.activeBenefitDate,
        benefitEndDate: benefit.benefitEndDate,
      })),
      PensionFundInfoData: {
        pensionFundId: employee.pensionFundInfoData.id,
        pensionFundTypeId: employee.pensionFundInfoData.pensionFundTypeId,
      },
    });
  }
  updateEmployee(employee: Employee): Promise<Employee> {
    return apiRequest<Employee>("put", "Employee/updateemployees", employee);
  }
  deleteEmployee(id: number, modifiedBy: string): Promise<Employee> {
    return apiRequest<Employee>("patch", `Employee/${id}/deactivate?modifiedBy=${modifiedBy}`);
  }
  SearchEmployeeByDocument(numberDocument: number): Promise<Employee[]> {
    return apiRequest<Employee[]>("get", `Employee/search/${numberDocument}`);
  }
}
