export interface JobPosting {
  id?: number;
  jobTitleId: number; 
  description: string;
  salaryRange: string;
  experienceLevel: number;
  divisionId: number;
  requirements: string[];
  modality: number;
  contractType: number;
  contractDuration: string;
  publicationDate: string;
  closingDate: string;
  priority: number;
  priorityText: string;
  isActive: boolean;
}
