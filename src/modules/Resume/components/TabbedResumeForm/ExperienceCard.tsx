import { Card } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

export function ExperienceCard({ children }: PropsWithChildren) {
  return <Card className="mb-4">{children}</Card>;
}
