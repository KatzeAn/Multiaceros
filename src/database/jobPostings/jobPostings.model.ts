import { JobPostingsRepository } from "@/domain/repository/jobPostings/jobPostings.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";

export class JobPostingModel extends JobPostingsRepository {
  async getAllJobPostings(): Promise<JobPosting[]> {
    return apiRequest<JobPosting[]>("get", "/JobPostings/GetAllJobPostings");
  }

  async getJobPostingById(id: number): Promise<JobPosting> {
    return apiRequest<JobPosting>("get", `/api/JobPostings/${id}`);
  }

  async createJobPosting(job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("post", "/api/JobPostings/CreateJobPosting", job);
  }

  async updateJobPosting(id: number, job: JobPosting): Promise<JobPosting> {
    return apiRequest<JobPosting>("put", `/api/JobPostings/UpdateJobPosting`, job);
  }
}
