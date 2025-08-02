import { Fieldset, FormControl } from "@/components/forms";

import { Textarea } from "@/components/ui/textarea";
import type { ResumeSchemaType } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

export function SummaryTab() {
  const { register } = useFormContext<ResumeSchemaType>();

  return (
    <form>
      <Fieldset
        className="min-w-[calc(100svw-48px)] md:min-w-[664px] max-w-[664px] mx-auto"
        legend="Professional Summary"
        fill
      >
        <FormControl required label="Summary" className="w-full col-span-2">
          <Textarea
            className="min-h-[144px]"
            placeholder="Tip: Tailor your summary to highlight skills and experiences relevant to the target position."
            {...register("PersonalInfo.summary")}
          />
        </FormControl>
      </Fieldset>
    </form>
  );
}
