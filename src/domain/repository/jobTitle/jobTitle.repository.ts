import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";

export abstract class JobTitleRepository {
  abstract getJobTitles(isActive?: boolean): Promise<JobTitle[]>;
  abstract createJobTitle(jobTitle: JobTitle): Promise<JobTitle>;
  abstract updateJobTitle(id: number, newName: string, modifiedBy: string): Promise<JobTitle>;
  abstract deleteJobTitle(jobTitleId: number, modifiedBy: string): Promise<JobTitle>;
}
