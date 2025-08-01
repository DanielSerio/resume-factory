import { useReducer } from "react";

export interface UsePaginationParams {
  defaultLimit?: number;
  defaultOffset?: number;
  total?: number;
}

interface PaginationState {
  limit: number;
  offset: number;
  total: number | null;
}

type PaginationActionName =
  | "set-total"
  | "first-page"
  | "prev-page"
  | "next-page"
  | "last-page";

interface BaseAction {
  name: PaginationActionName;
  payload: number | null;
}

interface SetTotalAction extends BaseAction {
  name: "set-total";
  payload: number;
}
interface FirstPageAction extends BaseAction {
  name: "first-page";
  payload: null;
}
interface FirstPageAction extends BaseAction {
  name: "first-page";
  payload: null;
}
interface PrevPageAction extends BaseAction {
  name: "prev-page";
  payload: null;
}
interface NextPageAction extends BaseAction {
  name: "next-page";
  payload: null;
}
interface LastPageAction extends BaseAction {
  name: "last-page";
  payload: null;
}

type PaginationAction =
  | SetTotalAction
  | FirstPageAction
  | PrevPageAction
  | NextPageAction
  | LastPageAction;

function getPaginationReducer(params?: UsePaginationParams) {
  return function paginationReducer(
    state: PaginationState,
    action: PaginationAction
  ) {
    switch (action.name) {
      default:
        return state;
    }
  };
}

export function usePagination(params?: UsePaginationParams) {
  const defaultPagination = {
    limit: params?.defaultLimit ?? 25,
    offset: params?.defaultOffset ?? 0,
    total: params?.total ?? null,
  };

  const [state, dispatch] = useReducer(
    getPaginationReducer(params),
    defaultPagination
  );

  const methods = {
    setTotal: (n: number) => dispatch({ name: "set-total", payload: ~~n }),
    goToFirstPage: () => dispatch({ name: "first-page", payload: null }),
    goToPrevPage: () => dispatch({ name: "prev-page", payload: null }),
    goToNextPage: () => dispatch({ name: "next-page", payload: null }),
    goToLastPage: () => dispatch({ name: "last-page", payload: null }),
  };

  return [state, methods] as const;
}
