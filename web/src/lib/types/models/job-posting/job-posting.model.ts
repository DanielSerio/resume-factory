export interface JobPostingCreate {
  companyName: string;
  jobPosition: string;
  content: string;
}

export interface JobPosting extends JobPostingCreate {
  id: number;
}