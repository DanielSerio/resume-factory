import type { ListResponse, PagingRequest } from "../types";
import { APIService } from "./api.service";

type JobPosting = any;

class JobPostingApiService extends APIService {
  constructor(private BASE_ENDPOINT: `/${string}`) {
    super('http://localhost:3002');
  }

  async list(paging: PagingRequest) {
    const searchParams = new URLSearchParams({
      limit: `${~~paging.limit}`,
      offset: `${~~paging.offset}`
    });
    const response = await this.GET(`${this.BASE_ENDPOINT}>${searchParams}`);

    return await response.json() as ListResponse<JobPosting>;
  }

  async item(id: number) {
    const response = await this.GET(`${this.BASE_ENDPOINT}/${id}`);

    return await response.json() as JobPosting | null;
  }
}

export const JobPostingService = new JobPostingApiService('/job-postings');