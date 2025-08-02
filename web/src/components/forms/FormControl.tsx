import { forwardRef, type ForwardedRef } from "react";
import type { FormControlProps, Renderable } from "./types";
import { cn } from "@/lib/utils";

function Renderer({ renderable }: { renderable: Renderable }) {
  if (typeof renderable === "function") {
    return renderable();
  }

  return renderable;
}

function FormControlComponent(
  {
    children,
    label,
    helper,
    error,
    required,
    optional,
    className,
  }: FormControlProps,
  ref?: ForwardedRef<HTMLLabelElement>
) {
  const shouldRenderBottomLabel = !!error || !!helper;
  const classNames = cn("form-control flex flex-col min-w-xs mt-2", className);

  return (
    <label className={classNames} ref={ref}>
      <div className="labels top text-sm font-regular mb-1">
        <span
          className={`label${required ? " required" : optional ? ` optional` : ""}`}
        >
          <span className="label-text text-zinc-800">
            <Renderer renderable={label} />
          </span>
        </span>
      </div>
      {children}
      {!!shouldRenderBottomLabel && (
        <div className="labels bottom">
          {!!helper && <Renderer renderable={helper} />}
          {!!error && <Renderer renderable={error} />}
        </div>
      )}
    </label>
  );
}

export const FormControl = forwardRef(FormControlComponent);
