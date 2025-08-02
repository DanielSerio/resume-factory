import { Card, CardContent } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

export function SkillRow({ children }: PropsWithChildren) {
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col sm:flex-row gap-2">
        {children}
      </CardContent>
    </Card>
  );
}
