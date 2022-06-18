import { dobe } from "dobe";
import * as yup from "yup";

interface Hello {
  name: string;
  age: number;
}

interface HelloResp {
  name: string;
  age: number;
  vip: string;
}

// 描述了请求体类型、响应类型、url、校验
export const get_hello = dobe.api<Hello, HelloResp>({
  url: "/v1/hello",
  method: "GET",
  requestSchema: yup.object({
    name: yup.string().required("需要提供name"),
    age: yup.number().required("需要提供age").min(3, "太小"),
  }),
  responseSchema: yup.object({
    name: yup.string().required("需要返回name"),
    age: yup.number().required("需要返回age"),
    vip: yup.string().required("需要返回vip"),
  }),
});

export const post_hello = dobe.api<Hello, HelloResp>({
  url: "/v1/hello",
  method: "POST",
  requestSchema: yup.object({
    name: yup.string().required("需要提供name"),
    age: yup.number().required("需要提供age"),
  }),
  responseSchema: yup.object({
    name: yup.string().required("需要返回name"),
    age: yup.number().required("需要返回age"),
    vip: yup.string().required("需要返回vip"),
  }),
});
