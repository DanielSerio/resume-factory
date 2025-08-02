import type { ResumeExperiencePoint, ResumeExperiencePointCreate } from "./resume-experience-point.model";

export interface ResumeExperienceCreate {
  company: string;
  tagline: string;
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