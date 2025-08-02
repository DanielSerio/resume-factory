import type { ResumeExperiencePoint, ResumeExperiencePointCreate } from "./resume-experience-point.model";

export interface ResumeExperienceCreate {
  resumeId?: number | null;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  Points?: ResumeExperiencePointCreate[];
}

export interface ResumeExperience extends ResumeExperienceCreate {
  id: number;

  Points?: ResumeExperiencePoint[];
}