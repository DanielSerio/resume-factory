import type { Pretty } from "../../utility";
import type { ResumeEducation } from "./resume-education.model";
import type { ResumeExperience } from "./resume-experience.model";
import type { ResumeSkill } from "./resume-skill.model";


export interface ResumeTemplateCreate {
  resumeTemplateId: null;
  targetPosition: string;
  targetCompany: null | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  codepen: string;
  summary: string;
  Education?: ResumeEducation[];
  Experience?: ResumeExperience[];
  Skills?: ResumeSkill[];
}

export interface ResumeCreate {
  resumeTemplateId: number;
  targetPosition: string;
  targetCompany: null | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  codepen: string;
  summary: string;
  Education?: ResumeEducation[];
  Experience?: ResumeExperience[];
  Skills?: ResumeSkill[];
}

export type ResumeTemplate = Pretty<ResumeTemplateCreate & {
  id: number;
  Education?: ResumeEducation[];
  Experience?: ResumeExperience[];
  Skills?: ResumeSkill[];
}>;

export type Resume = Pretty<ResumeCreate & {
  id: number;
  Education?: ResumeEducation[];
  Experience?: ResumeExperience[];
  Skills?: ResumeSkill[];
}>;