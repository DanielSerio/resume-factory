import { Fieldset, FormControl } from "@/components/forms";

import { Textarea } from "@/components/ui/textarea";
import type { ResumeSchemaType } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

export function SummaryTab() {
  const { register } = useFormContext<ResumeSchemaType>();

  return (
    <form>
      <Fieldset className="w-full" legend="Professional Summary" fill>
        <FormControl required label="Summary" className="w-full max-w-[100%]">
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
