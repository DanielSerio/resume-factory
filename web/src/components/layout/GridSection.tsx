import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export interface GridSectionProps extends PropsWithChildren {
  className?: string;
  element?: keyof HTMLElementTagNameMap;
  spacing?: number | string;
  gap?: number | string;
}

export function GridSection({
  element: elm,
  spacing,
  gap: gp,
  className,
  children,
}: GridSectionProps) {
  const Element = elm ?? "section";
  const padding = spacing ?? 2;
  const gap = gp ?? spacing ?? 2;

  return (
    <Element
      className={cn(`grid grid-cols-12 p-${padding} gap-${gap}`, className)}
    >
      {children}
    </Element>
  );
}
