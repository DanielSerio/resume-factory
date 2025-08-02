import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeFormFieldArray } from "@/modules/Resume/hooks/useResumeFormFieldArray";
import { SkillCategorySelect } from "../SkillCategorySelect";
import { SkillRow } from "../SkillRow";
import { Trash } from "lucide-react";
import { InlineError } from "../InlineError";

export function SkillsTab() {
  const {
    form: { register, formState },
    fieldArray: { fields: rows, remove, append },
  } = useResumeFormFieldArray("Skills");

  return (
    <div className="min-w-[calc(100svw-48px)] md:min-w-[664px] max-w-[664px] mx-auto">
      {rows.length > 0 &&
        rows.map((row, index) => {
          const errors = formState.errors.Skills?.[index];

          return (
            <SkillRow key={row.id}>
              <div className="flex flex-col w-full ">
                <SkillCategorySelect
                  row={{ category: row.category }}
                  {...register(`Skills.${index}.category` as const)}
                />
                {errors?.category?.message && (
                  <InlineError message={errors.category.message} />
                )}
              </div>
              <div className="flex flex-col w-full">
                <Input
                  placeholder="Subcategory"
                  {...register(`Skills.${index}.subcategory` as const)}
                />
                {errors?.subcategory?.message && (
                  <InlineError message={errors.subcategory.message} />
                )}
              </div>
              <div className="flex flex-col w-full">
                <Input
                  placeholder="Name"
                  {...register(`Skills.${index}.name` as const)}
                />
                {errors?.name?.message && (
                  <InlineError message={errors.name.message} />
                )}
              </div>
              <Button
                variant="destructive"
                className="mt-4 sm:mt-0"
                onClick={() => remove(index)}
              >
                <Trash />
              </Button>
            </SkillRow>
          );
        })}

      <Button
        className="w-full"
        variant="secondary"
        onClick={() =>
          append({
            category: "Frontend",
            subcategory: "",
            name: "",
          })
        }
      >
        Add Skill
      </Button>
    </div>
  );
}
