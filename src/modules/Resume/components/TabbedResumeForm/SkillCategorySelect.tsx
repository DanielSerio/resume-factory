import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ResumeSkill } from "@/lib/types/models/resume/resume-skill.model";
import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";

export interface CategorySelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  row: Pick<ResumeSkill, "category">;
}

function SkillCategorySelectComponent(
  { row }: CategorySelectProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <Select>
      <SelectTrigger className="min-w-[180px] w-full">
        <SelectValue
          ref={ref}
          defaultValue={row.category}
          placeholder={row.category}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Backend">Backend</SelectItem>
        <SelectItem value="Frontend">Frontend</SelectItem>
        <SelectItem value="Project Management">Project Management</SelectItem>
        <SelectItem value="Methodology">Methodology</SelectItem>
      </SelectContent>
    </Select>
  );
}

export const SkillCategorySelect = forwardRef(SkillCategorySelectComponent);
