import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResumeFormFieldArray } from "@/modules/Resume/hooks/useResumeFormFieldArray";
import { InlineError } from "../InlineError";
import { FormControl } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ExperienceCard } from "../ExperienceCard";
import { Textarea } from "@/components/ui/textarea";

export function ExperienceTab() {
  const {
    form: { register, formState },
    fieldArray: { fields: rows, remove, append },
  } = useResumeFormFieldArray("Experience");

  return (
    <div className="min-w-[calc(100svw-48px)] md:min-w-[664px] max-w-[664px] mx-auto">
      {rows.length > 0 &&
        rows.map((row, index) => {
          const errors = formState.errors.Experience?.[index];

          return (
            <ExperienceCard key={row.id}>
              <CardContent className="gap-2 grid grid-cols-2">
                <div className="flex flex-col w-full col-span-2">
                  <Input
                    placeholder="Company"
                    {...register(`Experience.${index}.company` as const)}
                  />
                  {errors?.company?.message && (
                    <InlineError message={errors.company.message} />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    placeholder="Position"
                    {...register(`Experience.${index}.position` as const)}
                  />
                  {errors?.position?.message && (
                    <InlineError message={errors.position.message} />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    placeholder="Location"
                    {...register(`Experience.${index}.location` as const)}
                  />
                  {errors?.location?.message && (
                    <InlineError message={errors.location.message} />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <FormControl
                    label="Start Date"
                    className="min-w-full"
                    error={errors?.startDate?.message}
                  >
                    <Input
                      type="month"
                      {...register(`Experience.${index}.startDate` as const)}
                    />
                  </FormControl>
                </div>
                <div className="flex w-full">
                  <FormControl
                    label="End Date"
                    className="min-w-[100px] flex-1"
                    error={errors?.endDate?.message}
                  >
                    <div className="flex gap-4">
                      <Input
                        type="month"
                        {...register(`Experience.${index}.endDate` as const)}
                      />
                    </div>
                  </FormControl>
                </div>
                <div className="flex w-full">
                  <p>Add experience "points" here</p>
                </div>
                <Button
                  className="w-full col-span-2 mt-3"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </CardContent>
            </ExperienceCard>
          );
        })}

      <Button
        className="w-full"
        variant="secondary"
        onClick={() =>
          append({
            company: "",
            startDate: new Date(),
            endDate: new Date(),
            location: "",
            position: "",
            Points: [],
          })
        }
      >
        Add Experience
      </Button>
    </div>
  );
}
