import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { ResumeSchemaType } from "@/lib/schema";
import { SelectValue } from "@radix-ui/react-select";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

export function SkillsTab() {
  const { control, register } = useFormContext<ResumeSchemaType>();
  const {
    fields: rows,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "Skills",
  });

  return (
    <>
      {rows.length > 0 &&
        rows.map((row, index) => {
          return (
            <Fragment key={row.id}>
              <Select {...register(`Skills.${index}.category` as const)}>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={row.category}
                    placeholder={row.category}
                  />
                  <SelectContent>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Project Management">
                      Project Management
                    </SelectItem>
                    <SelectItem value="Methodology">Methodology</SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select>
              <Input {...register(`Skills.${index}.subcategory` as const)} />
              <Input {...register(`Skills.${index}.name` as const)} />
              <Button onClick={() => remove(index)}>*</Button>
            </Fragment>
          );
        })}

      <Button
        onClick={() =>
          append({
            category: "Backend",
            subcategory: "",
            name: "",
          })
        }
      >
        Add Skill
      </Button>
    </>
  );
}
