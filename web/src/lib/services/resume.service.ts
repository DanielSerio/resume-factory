import type { ListResponse, PagingRequest } from "../types";
import { APIService } from "./api.service";

type Resume = any;

class ResumeApiService extends APIService {
  constructor(private BASE_ENDPOINT: `/${string}`) {
    super('http://localhost:3001');
  }

  async list(paging: PagingRequest) {
    const searchParams = new URLSearchParams({
      limit: `${~~paging.limit}`,
      offset: `${~~paging.offset}`
    });
    const response = await this.GET(`${this.BASE_ENDPOINT}>${searchParams}`);

    return await response.json() as ListResponse<Resume>;
  }

  async item(id: number) {
    const response = await this.GET(`${this.BASE_ENDPOINT}/${id}`);

    return await response.json() as Resume | null;
  }
}

export const ResumeService = new ResumeApiService('/resume-sets');