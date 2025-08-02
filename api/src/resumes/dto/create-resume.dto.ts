import { ResumeEducation, ResumeExperience, ResumeSkill } from "src/shared/types/request.types";

export class CreateResumeTemplateDto {
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
  Skills: ResumeSkill[];
  Education: ResumeEducation[];
  Experience: ResumeExperience[];
}

export class CreateResumeFromTemplateDto {
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
  Skills: ResumeSkill[];
  Education: ResumeEducation[];
  Experience: ResumeExperience[];
}

export class CreateResumeDto {
  resumeTemplateId: null | number;
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
  Skills: ResumeSkill[];
  Education: ResumeEducation[];
  Experience: ResumeExperience[];
}