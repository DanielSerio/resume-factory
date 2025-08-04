import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useResumeList } from "@/modules/Resume/queries/useResumeList";

import { Link } from "@tanstack/react-router";
import { RecentResumesTable } from "./RecentResumesTable";

export function ResumesCard() {
  const [{ query: resumeListQuery }] = useResumeList({
    params: {
      defaultLimit: 5,
      defaultSorting: {
        createdAt: "desc",
      },
    },
    cache: true,
  });

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <h1 className="text-2xl">Recent Resume's</h1>
      </CardHeader>

      <CardContent>
        <RecentResumesTable query={resumeListQuery} />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 lg:flex-row">
        <Link to="/resumes" className="w-full">
          <Button variant="secondary" className="w-full">
            View Resumes
          </Button>
        </Link>
        <Link to="/resumes/create" className="w-full">
          <Button className="w-full">Create a new Resume</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
