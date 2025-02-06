import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import type { JobTitleRepository } from "@/domain/repository/jobTitle/jobTitle.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class JobTitleModel implements JobTitleRepository {
    getJobTitles(): Promise<JobTitle[]> {
        return apiRequest<JobTitle[]>("get", "/JobTitle/GetAllJobTitles");
    }
    createJobTitle(jobTitle: JobTitle): Promise<JobTitle> {
        return apiRequest<JobTitle>("post", "/JobTitle/CreateJobTitle", jobTitle);
    }
    updateJobTitle(jobTitleId: number, jobTitle: JobTitle): Promise<JobTitle> {
        return apiRequest<JobTitle>("put", `/JobTitle/${jobTitleId}`, jobTitle);
    }
    softDeleteJobTitle(jobTitleId: number): Promise<boolean> {
        return apiRequest<boolean>("patch", `/JobTitle/${jobTitleId}/JobTitleDelete`);
    }
    
}