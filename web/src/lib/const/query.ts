import type { DotNotationPath } from "../types";

export const QUERY_KEYS = {
  'resume': {
    list: true,
    item: true
  },
  'job-posting': {
    list: true,
    item: true
  }
};

// helpers

export function getQueryKeys(keys: DotNotationPath<typeof QUERY_KEYS>) {
  return keys.split(/[\.]/g);
}