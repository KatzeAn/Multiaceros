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
  update(id: number, nameArl: string, modifiedBy: string): Promise<Arl> {
    return apiRequest<Arl>("put", `/Arl/${id}`, { arlID: id, nameArl, modifiedBy });
  }
  delete(arlID: number, modifiedBy: string): Promise<Arl> {
    return apiRequest<Arl>("delete", `/Arl/${arlID}?modifiedBy=${modifiedBy}`);
  }
}
