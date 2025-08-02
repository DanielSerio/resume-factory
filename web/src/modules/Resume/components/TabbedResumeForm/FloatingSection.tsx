import { SaveButton } from "@/components/buttons/SaveButton";
import type { ResumeSchemaType } from "@/lib/schema";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { getCountErrors } from "./utilities/count-errors";
import type { ResumeFormTabName } from "./types";

export function FloatingSection() {
  const { formState, getValues } = useFormContext<ResumeSchemaType>();
  const getErrorCount = useCallback(getCountErrors(formState), [
    formState.errors.PersonalInfo?.summary,
    formState.errors.PersonalInfo,
    formState.errors.Skills,
    formState.errors.Education,
    formState.errors.Experience,
  ]);

  const getTotalErrorCount = () => {
    const allTabs: ResumeFormTabName[] = [
      "personal",
      "summary",
      "education",
      "experience",
      "skills",
    ];

    return allTabs
      .map((tab) => getErrorCount(tab))
      .reduce((sum, errCount) => sum + errCount, 0);
  };

  return (
    <div className="fixed bottom-16 right-16 z-50">
      <SaveButton
        disabled={getTotalErrorCount() > 0}
        onClick={() => console.info(getValues())}
      />
    </div>
  );
}
