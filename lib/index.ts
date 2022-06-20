import { createFastifyController } from "./createFastifyController";
import { fetcher } from "./fetcher";
import { API, APIProps, Controller } from "./types";
import { yupDtoValidate } from "./yupDtoValidate";

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
      try {
        body = await Promise.resolve(
          dobe.baseDtoValidate!(requestSchema, body)
        );
      } catch (err) {
        dobe.onRequireError && dobe.onRequireError(err);
        throw err;
      }
    }
    const res = await getter(body, api, options);
    if (responseSchema) {
      try {
        return dobe.baseDtoValidate!(responseSchema, res);
      } catch (err) {
        dobe.onResponseError && dobe.onResponseError(err);
        throw err;
      }
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

export const dobe = {
  api,
  use,
  baseDtoValidate: yupDtoValidate,
  baseFetcher: fetcher as Function,
  onRequireError: undefined as unknown as Function,
  baseController: undefined as Controller | undefined,
};
