
type RequestOptions = Omit<Exclude<RequestInfo, 'string'>, 'method'>;
type MutationRequestOptions = Omit<Exclude<RequestInfo, 'string'>, 'method' | 'body'>;

export type MethodName = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface BaseOptionsParams<Body extends object> {
  method: MethodName;
  options?: Partial<RequestOptions | MutationRequestOptions>;
  body?: Body;
}

interface MutationOptionsParams<Body extends object> extends BaseOptionsParams<Body> {
  method: Exclude<MethodName, 'GET' | 'DELETE'>;
  options?: Partial<MutationRequestOptions>;
  body: Body;
}

interface GetOptionsParams extends BaseOptionsParams<object> {
  method: Exclude<MethodName, 'POST' | 'PUT' | 'PATCH'>;
  options?: Partial<RequestOptions>;
  body?: never;
}

export type OptionsParams<Body extends object> = GetOptionsParams | MutationOptionsParams<Body>;

export abstract class APIService {
  constructor(protected BASE_URL: string) { }

  private getOptions = <Body extends object>({ method, options, body }: OptionsParams<Body>) => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    if (!!body && !['GET', 'DELETE'].includes(method)) {
      return {
        method,
        headers,
        ...options,
        body: JSON.stringify(body) as BodyInit
      };
    }

    return {
      method,
      headers,
      ...options,
    } satisfies Partial<RequestInfo>;
  };

  protected GET = (relativeUrl: string, options?: Partial<RequestOptions>) => {
    return fetch(`${this.BASE_URL}${relativeUrl}`, this.getOptions({
      method: 'GET',
      options
    }));
  };

  protected POST = <Body extends object>(relativeUrl: string, body: Body, options?: Partial<MutationRequestOptions>) => {
    return fetch(`${this.BASE_URL}${relativeUrl}`, this.getOptions<Body>({
      method: 'POST',
      options,
      body
    }));
  };
  protected PUT = <Body extends object>(relativeUrl: string, body: Body, options?: Partial<MutationRequestOptions>) => {
    return fetch(`${this.BASE_URL}${relativeUrl}`, this.getOptions<Body>({
      method: 'PUT',
      options,
      body
    }));
  };
  protected PATCH = <Body extends object>(relativeUrl: string, body: Body, options?: Partial<MutationRequestOptions>) => {
    return fetch(`${this.BASE_URL}${relativeUrl}`, this.getOptions<Body>({
      method: 'PATCH',
      options,
      body
    }));
  };

  protected DELETE = (relativeUrl: string, options?: Partial<RequestOptions>) => {
    return fetch(`${this.BASE_URL}${relativeUrl}`, this.getOptions({
      method: 'DELETE',
      options
    }));
  };
}