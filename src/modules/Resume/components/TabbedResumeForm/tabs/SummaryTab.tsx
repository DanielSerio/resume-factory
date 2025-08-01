import { Fieldset } from "@/components/forms";

import { Textarea } from "@/components/ui/textarea";
import type { ResumeSchemaType } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

export function SummaryTab() {
  const { register } = useFormContext<ResumeSchemaType>();

  return (
    <form>
      <Fieldset legend="Summary">
        <span />
        <Textarea {...register("PersonalInfo.summary")} />
      </Fieldset>
    </form>
  );
}
