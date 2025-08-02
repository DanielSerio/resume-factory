import { TabsTrigger } from "@/components/ui/tabs";
import { TAB_LINKS } from "./links";

import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";
import type { ResumeSchemaType } from "@/lib/schema";
import { getCountErrors } from "./utilities/count-errors";

export function TabList() {
  const { formState } = useFormContext<ResumeSchemaType>();
  const getErrorCount = useCallback(getCountErrors(formState), [
    formState.errors.PersonalInfo?.summary,
    formState.errors.PersonalInfo,
    formState.errors.Skills,
    formState.errors.Education,
    formState.errors.Experience,
  ]);

  return (
    <>
      {TAB_LINKS.map(({ tab }) => {
        const errorCount = getErrorCount(tab.value);

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
