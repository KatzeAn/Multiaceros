import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import { ArlRepository } from "@/domain/repository/arl/arl.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class ArlModel extends ArlRepository {
  getAll(): Promise<Arl[]> {
    return apiRequest<Arl[]>("get", "/Arl");
  }
  create(nameArl: string): Promise<Arl> {
    return apiRequest<Arl>("post", "/Arl", { nameArl });
  }
  update(arl: Arl): Promise<Arl> {
    return apiRequest<Arl>("put", "/Arl", arl);
  }
  delete(arlID: number): Promise<Arl> {
    return apiRequest<Arl>("delete", `/Arl/${arlID}`);
  }
}
