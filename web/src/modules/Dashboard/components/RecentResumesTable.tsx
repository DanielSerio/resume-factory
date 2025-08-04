import type { useResumeList } from "@/modules/Resume/queries/useResumeList";

export interface RecentResumesTableProps {
  query: ReturnType<typeof useResumeList>[0]["query"];
}
export function RecentResumesTable({ query }: RecentResumesTableProps) {
  return (
    <div className="flex flex-col">
      {!query.data && query.isLoading && <p>Loading...</p>}
      {query.data?.records.length === 0 ? (
        <p>No records found</p>
      ) : (
        <div>RecentResumesTable</div>
      )}
    </div>
  );
}
