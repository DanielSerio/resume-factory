import { ResumeEducation, ResumeExperience, ResumeSkill } from "src/shared/types/request.types";
import { Education } from "./entities/education.entity";
import { Skill } from "./entities/skill.entity";
import { Experience } from "./entities/experience.entity";

export class ResumeTypeGuardHelpers {
  static isSkills(items: unknown[]): items is Array<Skill | ResumeSkill> {
    if (!items.length) {
      return false;
    }

    const first = items[0];

    return !!(first as ResumeSkill).name && !!(first as ResumeSkill).subcategory && !!(first as ResumeSkill).category;
  }

  static isEducation(items: unknown[]): items is Array<Education | ResumeEducation> {
    if (!items.length) {
      return false;
    }

    const first = items[0];

    return !!(first as ResumeEducation).school && !!(first as ResumeEducation).degree && !!(first as ResumeEducation).fieldOfStudy;
  }

  static isExperience(items: unknown[]): items is Array<Experience | ResumeExperience> {
    if (!items.length) {
      return false;
    }

    const first = items[0];

    return !!(first as ResumeExperience).company && !!(first as ResumeExperience).tagline && !!(first as ResumeExperience).position;
  }
}