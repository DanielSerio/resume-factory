import { useJobPostingList } from "@/modules/JobPosting/queries/useJobPostingList";
import { useResumeList } from "@/modules/JobPosting/queries/useResumeList";
import { createContext, useContext, type PropsWithChildren } from "react";

function useDashboardState() {
  const [
    { query: jobPostingListQuery, paging: jobPostingPaging },
    jobPostingListMethods,
  ] = useJobPostingList({
    defaultLimit: 5,
  });

  const [{ query: resumeListQuery, paging: resumePaging }, resumeListMethods] =
    useResumeList({
      defaultLimit: 5,
    });

  const state = {
    jobPostingListQuery,
    resumeListQuery,
    jobPostingPaging,
    resumePaging,
  };

  const methods = {
    jobPostingList: jobPostingListMethods,
    resumeSetList: resumeListMethods,
  };

  return [state, methods] as const;
}

type DashboardStateAndMethods = ReturnType<typeof useDashboardState>;

const DashboardContext = createContext<DashboardStateAndMethods | null>(null);

export function DashboardProvider({ children }: PropsWithChildren) {
  const state = useDashboardState();

  return (
    <DashboardContext.Provider value={state}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  if (DashboardContext === null) {
    throw new Error(
      "useDashboardContext must be calld within a DashboardProvider"
    );
  }

  return useContext(DashboardContext)!;
}
