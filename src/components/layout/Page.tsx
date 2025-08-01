import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";

export interface PageProps extends AreaHTMLAttributes<HTMLAreaElement> {}

export function Page({ className, children, ...props }: PageProps) {
  return (
    <main id="page" className={cn("page", className)} {...props}>
      {children}
    </main>
  );
}
