import { usePagination, type UsePaginationParams } from "@/hooks/usePagination";
import { getQueryKeys } from "@/lib/const";
import { ResumeService } from "@/lib/services";
import type { Sorting } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export interface UseResumeListParams {
  params?: UsePaginationParams;
  cache?: true;
}
const queryKeys = getQueryKeys("resume.list");

const createSortingQuery = (sorting: Sorting) => {
  const sorts: string[] = [];

  for (const key in sorting) {
    sorts.push(`${key},${sorting[key]}`);
  }

  return sorts.join(";");
};

export function useResumeList({
  cache,
  params,
}: Pick<UseResumeListParams, "cache"> & {
  params?: Omit<UsePaginationParams, "total">;
}) {
  const [total, setTotal] = useState<null | number>(null);
  const [paging, pagingMethods] = usePagination({
    ...params,
    total,
  });
  const [sorting, setSorting] = useState<Sorting | null>(
    params?.defaultSorting ?? null
  );

  const queryFn = useCallback(async () => {
    const response = await ResumeService.list({
      limit: paging.limit,
      offset: paging.offset,
      sortQuery: sorting ? createSortingQuery(sorting) : undefined,
    });

    setTotal(response.paging.totals.records);

    return response;
  }, [setTotal, sorting]);

  console.info([...queryKeys, paging.limit, paging.offset, sorting]);

  const query = useQuery({
    enabled: total === null,
    queryKey: [...queryKeys, paging.limit, paging.offset, sorting],
    queryFn,
    staleTime: cache ? Infinity : 5 * 1000 * 60,
    gcTime: cache ? 1000 * 60 : Infinity,
  });

  const state = {
    query,
    paging,
  };
  const methods = {
    ...pagingMethods,
    setSorting,
  };

  return [state, methods] as const;
}
