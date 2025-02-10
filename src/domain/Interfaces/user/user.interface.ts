export interface User {
  userId?: number;
  numberDocument: string;
  userFirstName: string;
  userMiddleName: string;
  surName: string;
  address: string;
  cellPhone: string;
  userEmail: string;
  modifiedBy?: string;
  createdBy: string,
  modifiedDate?: Date;
  isActive?: true;
  birthday: Date;
  userPhotoUrl?: string;
  cityCountryAndStateInfo?: {
    cityId: number;
    cityName: string;
    stateId: number;
    stateName: string;
    stateIso: string;
    countryId: number;
    countryName: string;
    countryIso: string;
  };
}
