export interface ResumeEducationCreate {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
}

export interface ResumeEducation extends ResumeEducationCreate {
  id: number;
}