import { API } from "./types";

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
  body: T,
  api: API<T, O>,
  fetchInit?: RequestInit
): Promise<O> => {
  const opt = {
    method: api.method,
    ...fetchInit,
  };
  if (api.method === "GET") {
    const query = new URLSearchParams(body as never).toString();
    return fetch(fetcher.baseURL + api.url + "?" + query, opt).then(
      fetchResponse
    );
  }

  return fetch(fetcher.baseURL + api.url, {
    ...opt,
    body: JSON.stringify(body),
  }).then(fetchResponse);
};

fetcher.baseURL = "";
