import { JobPostingsRepository } from "@/domain/repository/jobPostings/jobPostings.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";

export class JobPostingModel extends JobPostingsRepository {

  async getAllJobPostingsCopy(): Promise<JobPosting[]> {
    return apiRequest<JobPosting[]>("get", "/JobPosting");
  }

  async getJobPostingById(id: number): Promise<JobPosting> {
    return apiRequest<JobPosting>("get", `/JobPostings/${id}`);
  }

  async createJobPosting(job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("post", "/JobPosting", job);
  }

  updateJobPosting(id: number, job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("put", `/JobPostings/UpdateJobPosting?id=${id}`, job);
}

  deleteJobPosting(id: number, modifiedBy: string): Promise<JobPosting> {
    return apiRequest<JobPosting>("patch", `/JobPostings/SoftDeleteJobPosting?id=${id}&modifiedBy=${modifiedBy}`);
  }
}
