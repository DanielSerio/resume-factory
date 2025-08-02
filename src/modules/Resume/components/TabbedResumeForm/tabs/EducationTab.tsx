import { Button } from "@/components/ui/button";
import { useResumeFormFieldArray } from "@/modules/Resume/hooks/useResumeFormFieldArray";
import { Trash } from "lucide-react";
import { EducationCard } from "../EducationCard";
import { Input } from "@/components/ui/input";
import { InlineError } from "../InlineError";
import { CardContent } from "@/components/ui/card";
import { FormControl } from "@/components/forms";

export function EducationTab() {
  const {
    form: { register, formState },
    fieldArray: { fields: rows, remove, append },
  } = useResumeFormFieldArray("Education");

  return (
    <div className="min-w-[calc(100svw-48px)] md:min-w-[664px] max-w-[664px] mx-auto">
      {rows.length > 0 &&
        rows.map((row, index) => {
          const errors = formState.errors.Education?.[index];

          return (
            <EducationCard key={row.id}>
              <CardContent className="gap-2 grid grid-cols-2">
                <div className="flex flex-col w-full col-span-2">
                  <Input
                    placeholder="School"
                    {...register(`Education.${index}.school` as const)}
                  />
                  {errors?.school?.message && (
                    <InlineError message={errors.school.message} />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    placeholder="Degree"
                    {...register(`Education.${index}.degree` as const)}
                  />
                  {errors?.degree?.message && (
                    <InlineError message={errors.degree.message} />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    placeholder="Field of Study"
                    {...register(`Education.${index}.fieldOfStudy` as const)}
                  />
                  {errors?.fieldOfStudy?.message && (
                    <InlineError message={errors.fieldOfStudy.message} />
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
                      {...register(`Education.${index}.startDate` as const)}
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
                        {...register(`Education.${index}.endDate` as const)}
                      />
                    </div>
                  </FormControl>
                </div>
                <Button
                  className="w-full col-span-2 mt-3"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </CardContent>
            </EducationCard>
          );
        })}

      <Button
        className="w-full"
        variant="secondary"
        onClick={() =>
          append({
            school: "",
            startDate: new Date(),
            endDate: new Date(),
            fieldOfStudy: "",
            degree: "",
            description: "",
          })
        }
      >
        Add Education
      </Button>
    </div>
  );
}
