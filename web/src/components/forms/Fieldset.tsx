import type { FieldsetHTMLAttributes, ReactNode } from "react";

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: ReactNode;
  fill?: boolean;
}
export function Fieldset({ legend, children, fill, ...props }: FieldsetProps) {
  return (
    <fieldset className="w-full sm:w-[fit-content] mx-auto mb-4" {...props}>
      <legend className="font-semibold text-sm p-2">{legend}</legend>
      <div className={`flex flex-col  sm:grid grid-cols-2 gap-4`}>
        {children}
      </div>
    </fieldset>
  );
}
