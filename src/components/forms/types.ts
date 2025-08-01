import type { LabelHTMLAttributes, ReactNode } from "react";

export type Renderable = (() => ReactNode) | ReactNode;

export interface FormControlProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  error?: Renderable | null;
  required?: boolean;
  optional?: boolean;
  label: Renderable;
  helper?: Renderable;
}

