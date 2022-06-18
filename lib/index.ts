/* eslint-disable @typescript-eslint/no-explicit-any */
export type Method = "GET" | "POST" | "DELETE" | "PUT";
// 前端用于请求的接口
export type Fetcher = <T, O>(
  api: API<T, O>,
  body: T,
  request?: RequestInit
) => Promise<O>;
// 后端用于声明api的接口
export type Controller = <T, O>(
  api: API<T, O>,
  service: (body: T) => Promise<O>
) => (body: T) => Promise<O>;
// 用于校验和过滤参数的接口
export type DtoValidate = <T, O>(schema: any, body: T) => T;

interface APIProps {
  requestSchema?: any;
  responseSchema?: any;
  url: string;
  method: Method;
  fetchInit?: (() => RequestInit) | RequestInit;
}

// 前后端通用的接口描述
export interface API<T, O> extends APIProps {
  (
    body: T,
    getter?: (body: T) => Promise<O>,
    fetchInit?: RequestInit
  ): Promise<O>;
  TypeOfRequest: T;
  TypeOfResponse: O;
}

// 创建前后端公用接口类型
const api = <T, O>({
  method,
  requestSchema,
  responseSchema,
  url,
  fetchInit,
}: APIProps): API<T, O> => {
  const api = async (body: any, getter?: any, init?: any) => {
    getter = getter || dobe.baseFetcher;
    if (!getter) {
      throw new Error("Not found fetcher: " + api.url);
    }
    const res = await (requestSchema
      ? getter(api, dobe.baseDtoValidate!(requestSchema, body), init)
      : getter(api, body, init));
    if (responseSchema) {
      return dobe.baseDtoValidate!(responseSchema, res);
    }
    return res;
  };
  api.requestSchema = requestSchema;
  api.responseSchema = responseSchema;
  api.url = url;
  api.method = method;
  api.fetchInit = fetchInit;
  api.TypeOfRequest = {} as T;
  api.TypeOfResponse = {} as O;
  return api;
};

// 后端接口的绑定方法
const use = <T, O>(
  api: API<T, O>,
  service: (body: T) => Promise<O>,
  controller?: Controller
) => {
  controller = controller || dobe.baseController;
  if (!controller) {
    throw new Error("Not found controller: " + api.url);
  }
  return controller(api, service);
};

function fetchResponse(v: any) {
  const code = v.status;
  if (code >= 200 && code <= 299) {
    return v.json();
  }
  return v.json().then((err: any) => {
    if (typeof err === "object") {
      if (err.message) {
        throw new Error(err.message);
      }
      throw err;
    }
    throw new Error(err);
  });
}

// 前端请求服务端的绑定方法
export const fetcher = <T, O>(
  api: API<T, O>,
  body: T,
  fetchInit?: RequestInit
): Promise<O> => {
  if (api.fetchInit) {
    if (typeof api.fetchInit === "function") {
      fetchInit = Object.assign(api.fetchInit(), fetchInit);
    } else {
      fetchInit = Object.assign(api.fetchInit, fetchInit);
    }
  }
  const opt = {
    method: api.method,
    ...fetchInit,
  };
  if (api.method === "GET") {
    const query = new URLSearchParams(body as never).toString();
    return fetch(fetcher.baseURL + api.url + query, opt).then(fetchResponse);
  }

  return fetch(fetcher.baseURL + api.url, {
    ...opt,
    body: JSON.stringify(body),
  }).then(fetchResponse);
};

fetcher.baseURL = "";

export const createFastifyController = <T, O>(app: any) => {
  return <T, O>(api: API<T, O>, service: (body: T) => Promise<O>) => {
    if (api.method === "GET") {
      app.get(api.url, (req: { query: T }) => {
        return api(req.query, service);
      });
    } else {
      app[api.method.toLocaleLowerCase()](api.url, (req: { body: T }) => {
        return api(JSON.parse(req.body as never), service);
      });
    }
    return service;
  };
};

export const sokeDtoValidate = <T, O>(schema: any, body: T): T => {
  return schema.dto(body);
};

export const dobe = {
  api,
  fetch: fetcher,
  use,
  baseDtoValidate: sokeDtoValidate,
  baseFetcher: fetcher,
  baseController: undefined as Controller | undefined,
};
