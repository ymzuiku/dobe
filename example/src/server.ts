import { createFastifyController, dobe } from "dobe";
import fastify from "fastify";
import { api_hello } from "./api";
const app = fastify();
dobe.baseController = createFastifyController(app);

// 会根据 api_hello 的描述绑定路由、解析 query或body，校验入参，如果都通过了，执行第三个参数并且返回
dobe.use(api_hello, async (body) => {
  return { ...body, vip: "Supper" };
});

console.log("listen http//:127.0.0.1:3800");
app.listen({ port: 3800 });
