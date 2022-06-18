/* eslint-disable @typescript-eslint/no-explicit-any */
export type Method = "GET" | "POST" | "DELETE" | "PUT";
// 前端用于请求的接口
export type Fetcher = <T, O>(
  api: API<T, O>,
  body: T,
  options?: RequestInit
) => Promise<O>;
// 后端用于声明api的接口
export type Controller = <T, O>(
  api: API<T, O>,
  service: (body: T) => Promise<O>
) => (body: T) => Promise<O>;
// 用于校验和过滤参数的接口
export type DtoValidate = <T, O>(schema: any, body: T) => T;

export interface APIProps {
  requestSchema?: any;
  responseSchema?: any;
  url: string;
  method: Method;
}

// 前后端通用的接口描述
export interface API<T, O> extends APIProps {
  (
    body: T,
    getter?: (body: T, api: API<T, O>, options?: any) => Promise<O>
  ): Promise<O>;
  TypeOfRequest: T;
  TypeOfResponse: O;
}
