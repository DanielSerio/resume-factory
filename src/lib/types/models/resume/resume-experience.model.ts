import type { ResumeExperiencePoint, ResumeExperiencePointCreate } from "./resume-experience-point.model";

export interface ResumeExperienceCreate {
  resumeId: number;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;

  Points?: ResumeExperiencePointCreate[];
}

export interface ResumeExperience extends ResumeExperienceCreate {
  id: number;

  Points?: ResumeExperiencePoint[];
}