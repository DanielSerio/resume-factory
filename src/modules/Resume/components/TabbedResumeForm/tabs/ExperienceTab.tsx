import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResumeFormFieldArray } from "@/modules/Resume/hooks/useResumeFormFieldArray";
import { InlineError } from "../InlineError";
import { FormControl } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ExperienceCard } from "../ExperienceCard";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";

export function ExperienceTab() {
  const {
    form: { control, register, formState },
    fieldArray: { fields: rows, remove, append },
  } = useResumeFormFieldArray("Experience");

  return (
    <div className="min-w-[calc(100svw-48px)] md:min-w-[664px] max-w-[664px] mx-auto">
      {rows.length > 0 &&
        rows.map((row, index) => {
          const errors = formState.errors.Experience?.[index];
          const {
            fields: pointRows,
            append: addPoint,
            remove: removePoint,
          } = useFieldArray({
            control,
            name: `Experience.${index}.Points`,
          });

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
                <div className="flex w-full col-span-2">
                  {pointRows.map((pointRow, pindex) => {
                    const pointErrors =
                      formState.errors.Experience?.[index]?.Points?.[pindex];
                    return (
                      <div className="flex-1 flex gap-x-2" key={pointRow.id}>
                        <div className="flex-1">
                          <Textarea
                            {...register(
                              `Experience.${index}.Points.${pindex}.text`
                            )}
                          />
                          {pointErrors?.text?.message && (
                            <InlineError message={pointErrors?.text?.message} />
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => removePoint(pindex)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    );
                  })}
                </div>
                <Button
                  className="w-full col-span-2 mt-3"
                  onClick={() => {
                    addPoint({
                      text: "",
                    });
                  }}
                >
                  Add Bullet
                </Button>
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
