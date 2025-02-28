export interface JobPosting {
  id?: number;
  title: string;
  description: string;
  salaryRange: string;
  experienceLevel: number;
  area: string;
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
