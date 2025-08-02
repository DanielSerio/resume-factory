import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useDashboardContext } from "../hooks";

export function JobPostingsCard() {
  const [{ jobPostingListQuery }] = useDashboardContext();

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <div>JobPostingsCard</div>
      </CardHeader>

      <CardFooter>
        <Button>Create a new job posting</Button>
      </CardFooter>
    </Card>
  );
}
