import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";
import type { EpsRepository } from "@/domain/repository/eps/eps.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EpsModel implements EpsRepository {
    getEps(): Promise<Eps[]> {
        return apiRequest<Eps[]>("get", "/EPS");
    }
    getEpsById(id: number): Promise<Eps> {
        return apiRequest<Eps>("get", `/EPS/${id}`);
    }
    createEps(data: Eps): Promise<Eps> {
        return apiRequest<Eps>("post", "/EPS", data);
    }
    updateEps(id: number, data: Eps): Promise<Eps> {
        return apiRequest<Eps>("put", `/EPS${id}`, data);
    }
    deleteEps(id: number): Promise<Eps> {
        return apiRequest<Eps>("delete", `/EPS${id}`);
    }
}