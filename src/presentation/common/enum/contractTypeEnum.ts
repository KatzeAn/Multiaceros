export enum ContractTypeEnum {
  FixedTermContract = 1,
  IndefiniteTermContract = 2,
  WorkOrLaborContract = 3,
  CivilContractForTheProvisionOfServices = 4,
  InternshipContract = 5,
  OccasionalEmploymentContract = 6,
}

export const ContractTypeDescriptions: Record<ContractTypeEnum, string> = {
  [ContractTypeEnum.FixedTermContract]: "Contrato a término fijo",
  [ContractTypeEnum.IndefiniteTermContract]: "Contrato a término indefinido",
  [ContractTypeEnum.WorkOrLaborContract]: "Contrato De Obra O Labor",
  [ContractTypeEnum.CivilContractForTheProvisionOfServices]:
    "Contrato Civil Por Prestacion De Servicios",
  [ContractTypeEnum.InternshipContract]: "Contrato De Pasantia",
  [ContractTypeEnum.OccasionalEmploymentContract]:
    "Contrato Ocasional De Trabajo",
};
