import type { ResumeSchemaType } from "@/lib/schema";
import { useFieldArray, useFormContext } from "react-hook-form";

export function useResumeFormFieldArray<
  Name extends Parameters<typeof useFieldArray<ResumeSchemaType>>[0]["name"],
>(name: Name) {
  const { control, ...formMethods } = useFormContext<ResumeSchemaType>();
  const fieldArray = useFieldArray({
    control,
    name,
  });

  return {
    form: {
      control,
      ...formMethods,
    },
    fieldArray,
  };
}
