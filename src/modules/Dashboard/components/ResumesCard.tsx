import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useDashboardContext } from "../hooks";
import { Link } from "@tanstack/react-router";

export function ResumesCard() {
  const [{ resumeListQuery }] = useDashboardContext();

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <div>ResumeCard</div>
      </CardHeader>

      <CardFooter>
        <Link to="/resumes/create">
          <Button>Create a new resume </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
