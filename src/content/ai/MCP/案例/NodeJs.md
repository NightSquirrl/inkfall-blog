---
title: NodeJs
draft: false
description: "基于 @modelcontextprotocol/sdk v1.x 的 Node.js MCP Server 与 Client 实战教程。"
category: MCP
publishedAt: "2026-08-09"
---

‍

> 本教程基于 npm 上当前的 ​ **​**​ **​`@modelcontextprotocol/sdk`​**​**​**​ **v1.30.0**（v1.x 系列，实现的是旧版"有状态" MCP 协议）。所有代码都已在沙箱里实际编译、运行验证过。
>
> ⚠️ 版本提醒：官方在 `2026-07-28`​ 规范发布的同时，**为新协议单独拆出了一套新包**​`@modelcontextprotocol/server`​ / `@modelcontextprotocol/client`​（即 SDK v2），`@modelcontextprotocol/sdk`这个包名会继续维护 v1.x 至少 6 个月（只修 bug，不追新协议特性）。也就是说：
>
> - 你现在 `npm install @modelcontextprotocol/sdk`​ 装到的就是本教程用的 v1.x，生态里绝大多数现存教程、 开源 MCP Server 用的也是这一套 API，​**短期内继续用它完全没问题**。
> - 如果你的目标是面向 `2026-07-28`​ 无状态协议做新项目，包名要换成 `@modelcontextprotocol/server`​， API 也有变化（如 `McpServer`​ 的用法、`serveStdio` 等），本教程末尾单独提一下差异，详细内容建议 到 https://github.com/modelcontextprotocol/typescript-sdk 看 v2 文档。

---

## 1. 安装

```bash
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript tsx @types/node
```

- `zod` 是必需的 peer dependency，用来定义/校验工具、资源、提示词的参数 Schema。
- `tsx`​ 用于开发阶段直接跑 `.ts` 文件，不用每次手动编译。

`tsconfig.json` 参考配置（ESM）：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "outDir": "build",
    "rootDir": "src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"]
}
```

`package.json`​ 里记得加 `"type": "module"`​，SDK 用的是 ESM，import 路径要带 `.js`​ 后缀 （TS 写 `.js` 后缀指向的其实是编译后的产物，这是 TS 处理 ESM 的规定写法，不是笔误）。

---

## 2. 写一个 Server：`src/server.ts`

MCP 三大核心原语——​**Tool（工具）**  ​、​**Resource（资源）**  ​、​**Prompt（提示词模板）**  ​—— 在 SDK 里分别对应 `registerTool`​ / `registerResource`​ / `registerPrompt`。

```ts
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. 创建 Server 实例
const server = new McpServer({
  name: "demo-ts-server",
  version: "1.0.0",
});

// 2. 注册一个 Tool（可执行的动作）
server.registerTool(
  "calculate",
  {
    title: "Calculator",
    description: "计算一个简单的数学表达式，如 (12 + 8) * 3",
    inputSchema: { expression: z.string() },
  },
  async ({ expression }) => {
    try {
      // 仅做演示，生产环境请用安全的表达式解析库替代 Function/eval
      const result = Function(`"use strict"; return (${expression})`)();
      return { content: [{ type: "text", text: `计算结果：${result}` }] };
    } catch (err) {
      return {
        content: [{ type: "text", text: `计算出错：${(err as Error).message}` }],
        isError: true,
      };
    }
  }
);

// 3. 注册一个 Resource（只读上下文数据，用 URI 模板动态取值）
server.registerResource(
  "weather",
  new ResourceTemplate("weather://{city}", { list: undefined }),
  {
    title: "城市天气",
    description: "按城市名查询模拟天气数据",
  },
  async (uri, { city }) => {
    const FAKE_WEATHER: Record<string, string> = {
      北京: "晴，28°C",
      上海: "多云，26°C",
    };
    // 注意：从 URI 模板里取出的参数是 URL 编码过的，中文等非 ASCII 字符要 decode 一下
    const cityName = decodeURIComponent(city as string);
    const text = FAKE_WEATHER[cityName] ?? `暂无「${cityName}」的天气数据`;
    return { contents: [{ uri: uri.href, text }] };
  }
);

// 4. 注册一个 Prompt（可复用的交互模板）
server.registerPrompt(
  "summarize",
  {
    title: "生成摘要提示词",
    description: "生成一段用于让模型总结文本的提示词",
    argsSchema: { text: z.string() },
  },
  ({ text }) => ({
    messages: [
      {
        role: "user",
        content: { type: "text", text: `请用一句话总结以下内容：\n\n${text}` },
      },
    ],
  })
);

// 5. 用 stdio 传输启动
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("demo-ts-server 已通过 stdio 启动"); // stdio 场景下日志必须写 stderr，不能用 console.log！
}

main().catch((err) => {
  console.error("Server 启动失败：", err);
  process.exit(1);
});
```

**要点**：

- `registerTool`​ / `registerResource`​ / `registerPrompt`​ 是**推荐**用法（比更早的 `.tool()`​ /`.resource()`​ / `.prompt()` API 更明确），旧 API 仍可用于兼容老代码。
- `inputSchema`​ / `argsSchema` 直接传 Zod schema 对象即可，SDK 会自动转换成 JSON Schema 供 客户端 / LLM 使用，并在调用时自动做参数校验。
- **stdio 传输下绝对不能用** **​**​**​`console.log`​**​**​**​——stdout 是 JSON-RPC 消息通道，任何 `console.log`​都会污染协议流导致客户端解析失败；日志一律用 `console.error`（写 stderr）。
- `ResourceTemplate`​ 用类似 URI Template 的语法（`weather://{city}`​）声明一个动态资源族， 客户端可以用具体 URI（如 `weather://北京`）去读取。

---

## 3. 写一个 Client：`src/client.ts`

```ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // 1. 创建 transport：以子进程方式拉起 server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["build/server.js"],
  });

  // 2. 创建 Client 并连接
  const client = new Client({ name: "demo-ts-client", version: "1.0.0" });
  await client.connect(transport);

  // 3. 列出工具 / 资源模板 / 提示词
  const tools = await client.listTools();
  console.log("可用工具：", tools.tools.map((t) => t.name));

  const resourceTemplates = await client.listResourceTemplates();
  console.log("可用资源模板：", resourceTemplates.resourceTemplates.map((r) => r.name));

  const prompts = await client.listPrompts();
  console.log("可用提示词：", prompts.prompts.map((p) => p.name));

  // 4. 调用工具
  const calcResult = await client.callTool({
    name: "calculate",
    arguments: { expression: "(12 + 8) * 3" },
  });
  console.log("calculate 结果：", calcResult.content);

  // 5. 读取资源
  const weatherResult = await client.readResource({ uri: "weather://北京" });
  console.log("weather 资源：", weatherResult.contents);

  // 6. 获取提示词
  const promptResult = await client.getPrompt({
    name: "summarize",
    arguments: { text: "MCP 是一个让 AI 应用标准化接入外部工具和数据的开放协议。" },
  });
  console.log("summarize 提示词：", JSON.stringify(promptResult.messages, null, 2));

  await client.close();
}

main().catch((err) => {
  console.error("Client 执行失败：", err);
  process.exit(1);
});
```

## 4. 编译运行

```bash
npx tsc              # 编译到 build/
node build/client.js # client 会自动把 build/server.js 拉起来作为子进程
```

实际输出（沙箱里跑出来的结果）：

```
demo-ts-server 已通过 stdio 启动
可用工具： [ 'calculate' ]
可用资源模板： [ 'weather' ]
可用提示词： [ 'summarize' ]
calculate 结果： [ { type: 'text', text: '计算结果：60' } ]
weather 资源： [ { uri: 'weather://%E5%8C%97%E4%BA%AC', text: '晴，28°C' } ]
summarize 提示词： [ { "role": "user", "content": { "type": "text", "text": "请用一句话总结..." } } ]
```

开发阶段不想每次手动编译，可以直接用 `tsx` 跑 TS 源码：

```bash
npx tsx src/server.ts
```

## 5. 接入 LLM（比如接 Claude API）

Client 拿到的 `tools.tools`​ 数组，结构上跟 Anthropic Messages API 的 `tools`​ 参数长得很像 （`name`​ / `description`​ / `inputSchema`），实际接入时一般这样做：

```ts
const claudeTools = tools.tools.map((t) => ({
  name: t.name,
  description: t.description,
  input_schema: t.inputSchema,
}));
// 把 claudeTools 传给 anthropic.messages.create({ tools: claudeTools, ... })
// 拿到 Claude 返回的 tool_use 之后，用 client.callTool({ name, arguments }) 真正执行
// 再把结果作为 tool_result 发回给 Claude
```

这跟之前给你的 Python demo 是同一套模式，只是换成了 TS 的 SDK 调用方式。

## 6. 换成 Streamable HTTP（部署为远程 Server）

如果不想用 stdio（本地子进程），想把 Server 部署成一个远程 HTTP 服务，把`StdioServerTransport`​ 换成 `StreamableHTTPServerTransport`​，配合 Express/Hono/Fastify 之类 框架监听端口即可；Client 侧对应换成 `StreamableHTTPClientTransport`，传入 Server 的 URL。 这块因为涉及框架选型、CORS、鉴权等细节较多，建议连上你打算用的框架后我再针对性给你写。

## 7. 用 Inspector 调试

跟之前提到的一样：

```bash
npx @modelcontextprotocol/inspector node build/server.js
# 或不编译，直接跑 TS 源码
npx @modelcontextprotocol/inspector npx tsx src/server.ts
```

## 8. 关于 v1 → v2（`2026-07-28` 新协议）的迁移提示

如果之后要迁移到面向 `2026-07-28` 无状态协议的 v2：

- 包名变化：`@modelcontextprotocol/sdk`​ → `@modelcontextprotocol/server`​（服务端）/`@modelcontextprotocol/client`（客户端），另有 Node/Express/Hono/Fastify 的适配包。
- `McpServer`​ 的注册 API 基本延续（`registerTool`​ 等），但启动方式变了：长连接场景推荐用`serveStdio(() => server)`​ 这种"工厂函数"写法，让同一个 Server 工厂能同时服务旧版握手协议 和新版 `server/discover` 协议（双协议兼容）。
- 依赖的 zod 版本从 `zod/v4`​ 起步（也保留对 `zod` v3.25+ 的兼容）。

短期内如果不追新协议特性，继续用本教程里的 v1.x 写法完全没问题，等你的项目有明确的无状态部署 需求时再评估迁移。

## 测试server

**1. 先编译成 JS 再跑（最常见，生产环境也这么用）**

```bash
# 假设 tsconfig 输出到 build/ 或 dist/
npx tsc
npx @modelcontextprotocol/inspector node build/index.js
```

**2. 不编译，直接用 tsx / ts-node 跑 TS 源码（开发调试更快）**

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
# 或
npx @modelcontextprotocol/inspector npx ts-node src/index
```

**3. 需要传参数/环境变量给 server**

bash

```bash
npx @modelcontextprotocol/inspector -e API_KEY=test-key -- node build/index.js --verbose
```

（用 `--` 把 inspector 自己的参数和传给 server 的参数分开）

**4. 用 mcp.json 配置文件启动（多个 server 时更方便）**

json

```json
{
  "mcpServers": {
    "my-ts-server": {
      "command": "node",
      "args": ["build/index.js"]
    }
  }
}
```

bash

```bash
npx @modelcontextprotocol/inspector --config mcp.json --server my-ts-server
```

**5. 如果你的 TS server 是走 Streamable HTTP（远程/部署好的服务），不是 stdio**

不需要用命令拉子进程，直接：

bash

```bash
npx @modelcontextprotocol/inspector
```
