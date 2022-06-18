import { dobe } from "dobe";
import { soke } from "soke";

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
  requestSchema: soke.object({
    name: soke.string().required("需要提供name"),
    age: soke.number("age需要是number").required("需要提供age").min(3),
  }),
  responseSchema: soke.object({
    name: soke.string().required("需要返回name"),
    age: soke.number("age需要是number").required("需要返回age"),
    vip: soke.string().required("需要返回vip"),
  }),
});

export const post_hello = dobe.api<Hello, HelloResp>({
  url: "/v1/hello",
  method: "POST",
  requestSchema: soke.object({
    name: soke.string().required("需要提供name"),
    age: soke.number("age需要是number").required("需要提供age").min(3),
  }),
  responseSchema: soke.object({
    name: soke.string().required("需要返回name"),
    age: soke.number("age需要是number").required("需要返回age"),
    vip: soke.string().required("需要返回vip"),
  }),
});
