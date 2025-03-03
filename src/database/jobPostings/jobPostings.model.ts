import { JobPostingsRepository } from "@/domain/repository/jobPostings/jobPostings.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";

export class JobPostingModel extends JobPostingsRepository {

  async getAllJobPostingsCopy(deactivate: boolean): Promise<JobPosting[]> {
    return apiRequest<JobPosting[]>("get", `/JobPosting?deactivate=${deactivate}`);
}

  async getJobPostingById(id: number): Promise<JobPosting> {
    return apiRequest<JobPosting>("get", `/JobPostings/${id}`);
  }

  async createJobPosting(job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("post", "/JobPosting", job);
  }

  updateJobPosting(id: number, job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("put", `/JobPosting/${id}`, job);
}

deleteJobPosting(id: number, modifiedBy: string): Promise<JobPosting> {
  return apiRequest<JobPosting>("patch",`/JobPosting/${id}/delete?modifiedBy=${modifiedBy}`);
  }
}
