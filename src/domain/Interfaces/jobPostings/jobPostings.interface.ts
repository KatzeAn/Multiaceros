export interface JobPosting {
  id?: number;
  jobTitleId: string; 
  description: string;
  salaryRange: string;
  experienceLevel: number;
  divisionId: string;
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
