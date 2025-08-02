import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";
import { InlineError } from "./InlineError";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export interface ExperiencePointListProps {
  register: any;
  formState: any;
  control: any;
  index: number;
}

export function ExperiencePointList({
  register,
  formState,
  control,
  index,
}: ExperiencePointListProps) {
  const {
    fields: pointRows,
    append: addPoint,
    remove: removePoint,
  } = useFieldArray({
    control,
    name: `Experience.${index}.Points`,
  });

  return (
    <>
      {pointRows.map((pointRow, pindex) => {
        const pointErrors =
          formState.errors.Experience?.[index]?.Points?.[pindex];
        return (
          <div className="flex-1 flex gap-x-2" key={pointRow.id}>
            <div className="flex-1">
              <Textarea
                {...register(`Experience.${index}.Points.${pindex}.text`)}
              />
              {pointErrors?.text?.message && (
                <InlineError message={pointErrors?.text?.message} />
              )}
            </div>
            <Button variant="destructive" onClick={() => removePoint(pindex)}>
              <Trash />
            </Button>
          </div>
        );
      })}
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
    </>
  );
}
