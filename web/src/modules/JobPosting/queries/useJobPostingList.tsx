import { usePagination, type UsePaginationParams } from "@/hooks/usePagination";
import { getQueryKeys } from "@/lib/const";
import { JobPostingService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export function useJobPostingList(params?: UsePaginationParams) {
  const queryKeys = getQueryKeys("job-posting.list");
  const [paging, pagingMethods] = usePagination(params);

  const query = useQuery({
    queryKey: [...queryKeys, paging.limit, paging.offset],
    async queryFn() {
      const response = await JobPostingService.list({
        limit: paging.limit,
        offset: paging.offset,
      });

      pagingMethods.setTotal(response.paging.totals.records);

      return response;
    },
  });

  const state = {
    query,
    paging,
  };
  const methods = {
    ...pagingMethods,
  };

  return [state, methods] as const;
}
