import { usePagination, type UsePaginationParams } from "@/hooks/usePagination";
import { getQueryKeys } from "@/lib/const";
import { ResumeService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export function useResumeList(params?: UsePaginationParams) {
  const queryKeys = getQueryKeys("resume.list");
  const [paging, pagingMethods] = usePagination(params);

  const query = useQuery({
    queryKey: [...queryKeys, paging.limit, paging.offset],
    async queryFn() {
      const response = await ResumeService.list({
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
