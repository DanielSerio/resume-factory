import { Pretty } from "./utility.types";

interface CreateResumeRequestObject {
  PersonalInfo: ResumePersonalInfo;
  Education: ResumeEducation[];
  Experience: ResumeExperience[];
  Skills: ResumeSkill[];
}

export type CreateResumeRequest = Pretty<CreateResumeRequestObject>;

interface ResumeSkillObject {
  id?: number | null;
  category: string;
  subcategory: string;
  name: string;
}

export type ResumeSkill = Pretty<ResumeSkillObject>;

interface ResumeExperienceObject {
  id?: number | null;
  company: string;
  tagline: string;
  startDate: string;
  endDate: string;
  location: string;
  position: string;
  Points: ResumeExperiencePoint[];
}

export type ResumeExperience = Pretty<ResumeExperienceObject>;

interface ResumeExperiencePointObject {
  resumeExperienceId?: number | null;
  id?: number | null;
  text: string;
}

export type ResumeExperiencePoint = Pretty<ResumeExperiencePointObject>;

interface ResumeEducationObject {
  id?: number | null;
  school: string;
  startDate: string;
  endDate: string;
  fieldOfStudy: string;
  degree: string;
  description: string;
}

export type ResumeEducation = Pretty<ResumeEducationObject>;

interface ResumePersonalInfoObject {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  codepen: string;
  summary: string;
  targetCompany: string;
  targetPosition: string;
}

export type ResumePersonalInfo = Pretty<ResumePersonalInfoObject>;