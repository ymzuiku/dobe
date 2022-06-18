import { API } from "./types";

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
