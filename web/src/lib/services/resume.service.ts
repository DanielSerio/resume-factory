import type { ListResponse } from "../types";
import { APIService } from "./api.service";

type Resume = any;

interface ListRequestParams {
  limit: number;
  offset: number;
  sortQuery?: string;
}

class ResumeApiService extends APIService {
  constructor(private BASE_ENDPOINT: `/${string}`) {
    super('http://localhost:3002');
  }

  async list(options: ListRequestParams) {
    const searchParams = new URLSearchParams({
      limit: `${~~options.limit}`,
      offset: `${~~options.offset}`,
    });

    if (options.sortQuery) {
      searchParams.append('sort', options.sortQuery);
    }

    const response = await this.GET(`${this.BASE_ENDPOINT}?${searchParams}`);

    return await response.json() as ListResponse<Resume>;
  }

  async item(id: number) {
    const response = await this.GET(`${this.BASE_ENDPOINT}/${id}`);

    return await response.json() as Resume | null;
  }
}

export const ResumeService = new ResumeApiService('/resumes');