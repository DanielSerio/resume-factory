import type { FieldsetHTMLAttributes, ReactNode } from "react";

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: ReactNode;
}
export function Fieldset({ legend, children, ...props }: FieldsetProps) {
  return (
    <fieldset className="w-[fit-content] mx-auto mb-4" {...props}>
      <legend className="font-semibold text-sm p-2">{legend}</legend>
      <div className="flex flex-wrap gap-2 p-[6px] max-w-[664px] pt-0">
        {children}
      </div>
    </fieldset>
  );
}
