import type { Pretty } from "./utility";

interface BasePaging {
  limit: number;
  offset: number;
}

interface PagingTotals {
  records: number;
  pages: number;
}

export interface PagingRequest extends BasePaging {
  [k: string]: number;
}

export interface PagingResponse extends BasePaging {
  [k: string]: number | PagingTotals;
  totals: PagingTotals;
}
export type SortDirection = 'asc' | 'desc';
export interface Sorting {
  [k: string]: SortDirection;
}

export type ListResponse<RecordType extends object> = Pretty<{
  paging: PagingResponse;
  sorting: Sorting | null;
  records: RecordType[];
}>;