import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
export abstract class JobPostingsRepository {
  abstract getAllJobPostingsCopy(deactivate?: boolean): Promise<JobPosting[]>;
  abstract getJobPostingById(id: number): Promise<JobPosting>;
    abstract createJobPosting(job: JobPosting): Promise<JobPosting>;
    abstract updateJobPosting(id: number, job: JobPosting): Promise<JobPosting>;
    abstract deleteJobPosting(id: number, modifiedBy: string): Promise<JobPosting>;
  }
  