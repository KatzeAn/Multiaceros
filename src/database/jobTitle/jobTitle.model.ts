import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import type { JobTitleRepository } from "@/domain/repository/jobTitle/jobTitle.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class JobTitleModel implements JobTitleRepository {
    getJobTitles(isActive: boolean): Promise<JobTitle[]> {
        return apiRequest<JobTitle[]>("get", `/JobTitle?isActive=${isActive}`);
    }
    createJobTitle(jobTitle: JobTitle): Promise<JobTitle> {
        return apiRequest<JobTitle>("post", "/JobTitle/CreateJobTitle", jobTitle);
    }
    updateJobTitle(id: number, newName: string, modifiedBy: string): Promise<JobTitle> {
        return apiRequest<JobTitle>("put", `/JobTitle/${id}?modifiedBy=${modifiedBy}`, {jobTitleId: id, newName, modifiedBy});
    }
    deleteJobTitle(jobTitleId: number, modifiedBy: string): Promise<JobTitle> {
        return apiRequest<JobTitle>("patch",`/JobTitle/${jobTitleId}/JobTitleDelete?modifiedBy=${modifiedBy}`);
    }
    
    
}