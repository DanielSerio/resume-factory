import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";
import Header from "./Header";

export interface LayoutProps extends AreaHTMLAttributes<HTMLDivElement> {}

export function Layout({ children, className, ...props }: LayoutProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen pt-[48px] max-w-[100svw]",
        className
      )}
      {...props}
    >
      <Header />
      {children}
    </div>
  );
}
