import { createFastifyController } from "./createFastifyController";
import { fetcher } from "./fetcher";
import { API, APIProps, Controller } from "./types";

export { fetcher, createFastifyController };

/* eslint-disable @typescript-eslint/no-explicit-any */

// 创建前后端公用接口类型
const api = <T, O>({
  method,
  requestSchema,
  responseSchema,
  url,
}: APIProps): API<T, O> => {
  const api = async (body: any, getter?: any, options?: any) => {
    getter = getter || dobe.baseFetcher;
    if (!getter) {
      throw new Error("Not found fetcher: " + api.url);
    }
    if (requestSchema) {
      body = dobe.baseDtoValidate!(requestSchema, body);
    }
    const res = await getter(body, api, options);
    if (responseSchema) {
      return dobe.baseDtoValidate!(responseSchema, res);
    }
    return res;
  };
  api.requestSchema = requestSchema;
  api.responseSchema = responseSchema;
  api.url = url;
  api.method = method;
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

export const sokeDtoValidate = <T, O>(schema: any, body: T): T => {
  return schema.dto(body);
};

export const dobe = {
  api,
  use,
  baseDtoValidate: sokeDtoValidate,
  baseFetcher: fetcher,
  baseController: undefined as Controller | undefined,
};
