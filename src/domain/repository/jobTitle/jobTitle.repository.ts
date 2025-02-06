import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";

export abstract class JobTitleRepository {
  abstract getJobTitles(): Promise<JobTitle[]>;
  abstract createJobTitle(jobTitle: JobTitle): Promise<JobTitle>;
  abstract updateJobTitle(jobTitleId: number, jobTitle: JobTitle): Promise<JobTitle>;
  abstract softDeleteJobTitle(jobTitleId: number): Promise<boolean>;
}
