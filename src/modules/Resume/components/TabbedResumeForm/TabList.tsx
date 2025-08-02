import { TabsTrigger } from "@/components/ui/tabs";
import { TAB_LINKS } from "./links";

import { useCallback } from "react";
import type { ResumeFormTabName } from "./types";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";
import type { ResumeSchemaType } from "@/lib/schema";

export function TabList() {
  const { formState } = useFormContext<ResumeSchemaType>();

  const getErrorCount = useCallback(
    (tab: ResumeFormTabName) => {
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

        return experienceList.filter?.((err) => !!err).length ?? 0;
      }

      return 0;
    },
    [
      formState.errors.PersonalInfo?.summary,
      formState.errors.PersonalInfo,
      formState.errors.Skills,
      formState.errors.Education,
    ]
  );

  return (
    <>
      {TAB_LINKS.map(({ tab }) => {
        const errorCount = getErrorCount(tab.value);
        //TODO: border?
        return (
          <TabsTrigger className="relative" key={tab.value} value={tab.value}>
            <div className="flex-1">{tab.title}</div>
            {errorCount > 0 && <Badge>{errorCount}</Badge>}
          </TabsTrigger>
        );
      })}
    </>
  );
}
