import type { User } from "../user/user.interface";
import type { Arl } from "../Arl/Arl.interface";
import type { Contract } from "../Contract/contract.interface";
import type { Eps } from "../Eps/eps.interface";
import type { Benefits } from "../Benefits/Benefits.interface";
import type { PensionFunds } from "../PensionFunds/pensionFunds.interface";

export interface EmployeeRequest {
  createdBy: string;
  salary: number | undefined;
  divisionId: number | undefined;
  jobTitleId: number | undefined;
  bloodTypeId: number | undefined;
  severanceFundId: number | undefined;
  familyCompensationFundId: number | undefined;
  userData: Partial<User>;
  arlData: Partial<Arl>;
  contractData: Partial<Contract>;
  epsData: Partial<Eps>;
  bonificationData: {
    bonificationValue: number | undefined;
    activeBonusDate: string;
    bonusEndDate: string;
  };
  benefits: Partial<Benefits>[];
  pensionFundInfoData: Partial<PensionFunds>;
  newBenefit: {
    id: "", // ID del beneficio seleccionado
    valueBenefits: "", // Valor del beneficio
  },
}
