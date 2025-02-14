import { JobPostingsRepository } from "@/domain/repository/jobPostings/jobPostings.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";

export class JobPostingModel extends JobPostingsRepository {
  async getAllJobPostings(): Promise<JobPosting[]> {
    return apiRequest<JobPosting[]>("get", "/JobPostings/GetAllJobPostings");
  }

  async getAllJobPostingsCopy(): Promise<JobPosting[]> {
    return apiRequest<JobPosting[]>("get", "/JobPostings/GetAllJobPostingsCopy");
  }

  async getJobPostingById(id: number): Promise<JobPosting> {
    return apiRequest<JobPosting>("get", `/JobPostings/${id}`);
  }

  async createJobPosting(job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("post", "/JobPostings/CreateJobPosting", job);
  }

  async updateJobPosting(id: number, job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("put", `/JobPostings/UpdateJobPosting`, job);
  }
}
