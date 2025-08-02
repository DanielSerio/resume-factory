import type { ResumeSchemaType } from "@/lib/schema";
import type { ResumeFormTabName } from "../types";
import type { useFormContext } from "react-hook-form";

export function getCountErrors(
  formState: ReturnType<typeof useFormContext<ResumeSchemaType>>["formState"]
) {
  return function countErrors(tab: ResumeFormTabName) {
    if (tab === "personal" || tab === "summary") {
      if (!formState.errors.PersonalInfo) {
        return 0;
      }
      const { summary, ...personalInfo } = formState.errors.PersonalInfo;
      if (tab === "summary" && !!summary?.message) {
        return 1;
      } else if (tab === "summary" && !summary?.message) {
        return 0;
      }

      return Object.values(personalInfo).length;
    } else if (tab === "skills") {
      const skillList = formState.errors.Skills;

      if (!skillList) {
        return 0;
      }

      return skillList.filter?.((err) => !!err).length ?? 0;
    } else if (tab === "education") {
      const educationList = formState.errors.Education;

      if (!educationList) {
        return 0;
      }

      return educationList.filter?.((err) => !!err).length ?? 0;
    } else if (tab === "experience") {
      const experienceList = formState.errors.Experience;

      if (!experienceList) {
        return 0;
      }
      const pointErrorList = formState.errors.Experience ?? [];
      const pointErrors =
        pointErrorList
          .flatMap?.((errs) => errs?.Points?.length)
          .reduce((sum, errCount) => (sum ?? 0) + (errCount ?? 0), 0) ?? 0;
      const expErrors = experienceList.filter?.((err) => !!err).length ?? 0;

      return pointErrors + expErrors;
    }

    return 0;
  };
}
