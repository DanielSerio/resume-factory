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
  startDate: Date;
  endDate: Date | null;
  location: string;
  position: string;
  Points: ResumeExperiencePoint[];
}

export type ResumeExperience = Pretty<ResumeExperienceObject>;

interface ResumeExperiencePointObject {
  id?: number | null;
  text: string;
}

export type ResumeExperiencePoint = Pretty<ResumeExperiencePointObject>;

interface ResumeEducationObject {
  id?: number | null;
  school: string;
  startDate: Date;
  endDate: Date | null;
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


export interface Paging {
  limit: number;
  offset: number;
}

export interface PagingRequest extends Paging {
  [k: string]: number;
}
export type SortDirection = 'asc' | 'desc';
export type Sorting<Type> = Partial<Record<keyof Type, SortDirection>>;

export interface ListRequest<Type> {
  paging?: Partial<PagingRequest>;
  sorting?: Sorting<Type> | null;
}