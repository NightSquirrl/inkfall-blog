---
title: Model Context Protocol（MCP）接口规范文档
draft: false
description: 基于官方 2026-07-28 规范整理的 MCP 协议接口文档，涵盖协议架构、分层与版本迁移说明。
category: MCP
publishedAt: "2026-08-09"
---

> 基于官方规范 ​**版本** **​**​**​`2026-07-28`​**​**​**（2026年7月28日正式发布，是 MCP 自发布以来最大的一次修订）。 本文整理自 modelcontextprotocol.io 官方文档 / 规范 / changelog，供开发 MCP Server / Client 时查阅。
>
> ⚠️ 重要提醒：`2026-07-28`​ 相比此前版本（`2025-11-25`​、`2025-06-18`​ 等）是​**破坏性修订**​， 核心变化是协议从"有状态双向连接"改为"无状态请求/响应"。目前主流语言 SDK 的**旧版本**（如 Python SDK 1.x）仍实现的是旧版协议；SDK 2.x 起才支持新协议，迁移有成本，详见文末"版本与兼容性"一节。

---

## 目录

1. [协议定位与总体架构](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#1-协议定位与总体架构)
2. [协议分层](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#2-协议分层)
3. [消息格式基础（JSON-RPC 2.0）](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#3-消息格式基础json-rpc-20)
4. [无状态核心与 ](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#4-无状态核心与-_meta-字段)​[`\\\_meta`](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#4-无状态核心与-_meta-字段)​[ 字段](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#4-无状态核心与-_meta-字段)
5. [能力发现：server/discover](#5-能力发现server%20discover)
6. [核心原语（Server 端）](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#6-核心原语server-端)

   - 6.1 [Tools](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#61-tools)
   - 6.2 [Resources](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#62-resources)
   - 6.3 [Prompts](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#63-prompts)
7. [客户端原语与 MRTR 模式](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#7-客户端原语与-mrtr-模式)

   - 7.1 [Elicitation](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#71-elicitation)
   - 7.2 [已废弃：Sampling / Roots / Logging](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#72-已废弃sampling--roots--logging)
8. [通知与订阅：](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#8-通知与订阅subscriptionslisten)​[`subscriptions/listen`](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#8-通知与订阅subscriptionslisten)
9. [传输层](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#9-传输层)

   - 9.1 [stdio](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#91-stdio-transport)
   - 9.2 [Streamable HTTP](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#92-streamable-http-transport)
10. [缓存：](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#10-缓存ttlms--cachescope)​[`ttlMs`](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#10-缓存ttlms--cachescope)​[ / ](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#10-缓存ttlms--cachescope)​[`cacheScope`](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#10-缓存ttlms--cachescope)
11. [鉴权（Authorization）](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#11-鉴权authorization)
12. [扩展框架（Extensions）](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#12-扩展框架extensions)
13. [错误处理](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#13-错误处理)
14. [废弃策略与已废弃特性一览](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#14-废弃策略与已废弃特性一览)
15. [版本协商与新旧版本兼容性](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#15-版本协商与新旧版本兼容性)
16. [方法速查表](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#16-方法速查表)
17. [参考链接](https://claude.ai/chat/d6f659b5-e7f1-4933-b66b-de84bd744cfa#17-参考链接)

---

## 1. 协议定位与总体架构

MCP 是一个开放协议，用来​**在 LLM 应用与外部数据源 / 工具之间标准化上下文交换**。它本身只定义 "客户端与服务端之间怎么交换上下文"，不规定 AI 应用内部如何使用 LLM、如何管理上下文。

### 参与方

MCP 采用客户端-服务端架构，三个角色：

|角色|说明|
| ----| -------------------------------------------------------------------------------------------------------------|
|**MCP Host**|发起并管理一个或多个 MCP Client 的 AI 应用（如 Claude Desktop、Claude Code、IDE 插件）|
|**MCP Client**|维护与某个 MCP Server 的连接、向 Host 提供该 Server 的上下文能力；每连接一个 Server，Host 就实例化一个 Client|
|**MCP Server**|提供上下文（工具 / 资源 / 提示词）的程序，可在本地或远程运行|

- **本地 Server**：通常用 stdio 传输，一般只服务单个 Client（例如 Claude Desktop 拉起的文件系统 Server）。
- **远程 Server**：通常用 Streamable HTTP 传输，可同时服务多个 Client（例如 Sentry 官方 MCP Server）。

---

## 2. 协议分层

MCP 由两层组成：

- **数据层（Data Layer）**  ：基于 JSON-RPC 2.0 的交换协议，定义消息结构和语义，包括能力/版本发现、 核心原语（Tools / Resources / Prompts）、通知等。是内层，与传输方式无关。
- **传输层（Transport Layer）**  ：定义连接建立、消息分帧、鉴权等通信机制的外层。当前定义了两种传输： stdio 和 Streamable HTTP。

数据层的 JSON-RPC 消息格式在两种传输上完全一致，传输层只负责"怎么把消息送过去"。

---

## 3. 消息格式基础（JSON-RPC 2.0）

MCP 使用标准 [JSON-RPC 2.0](https://www.jsonrpc.org/) 作为底层 RPC 格式，三种消息类型：

**请求（Request）**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { "...": "..." }
}
```

**响应（Response）**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { "...": "..." }
}
```

或错误响应：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": { "code": -32602, "message": "Invalid params" }
}
```

**通知（Notification）**  ​：无需响应的消息，不带 `id` 字段：

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed",
  "params": { "...": "..." }
}
```

---

## 4. 无状态核心与 `_meta` 字段

这是 `2026-07-28`​ 版本相对旧版最核心的变化：​**协议从"有状态、双向"改为"无状态、请求/响应"**  。

### 4.1 旧版（≤2025-11-25）做法（已废弃）

旧版要求先完成一次 `initialize`​ / `initialized`​ 握手，服务端用 `Mcp-Session-Id` 响应头维护会话， 后续请求都依附在这个会话上。这带来的问题：连接断开会话就丢；多实例部署时必须做会话粘滞 （sticky session）或共享存储，负载均衡很难做。

### 4.2 新版（`2026-07-28`）做法

- **移除了** **​**​**​`initialize`​**​**​**​  **/**​****​****​**​**​**​`initialized`​**​**​**​ **握手**​，也移除了 `Mcp-Session-Id` 响应头。
- 每个请求都是​**自描述的、独立的**​：协议版本、客户端身份、客户端能力都放在请求的 `_meta` 字段里， 服务端不依赖任何"上一次请求"的信息就能处理当前请求。
- 因此任意请求可以落在一个普通轮询负载均衡器后面的**任意服务端实例**上，不再需要共享存储。

**每个请求**  **​**​ **​`_meta`​**​**​**​ **中的标准字段**：

|字段|说明|
| ----| -----------------------------------|
|`io.modelcontextprotocol/protocolVersion`|本次请求使用的协议版本，如`&#34;2026-07-28&#34;`|
|`io.modelcontextprotocol/clientInfo`|客户端身份信息`{ &#34;name&#34;: &#34;...&#34;, &#34;version&#34;: &#34;...&#34; }`，用于调试/兼容性识别|
|`io.modelcontextprotocol/clientCapabilities`|客户端能力声明，如`{ &#34;elicitation&#34;: {} }`|

### 4.3 应用层状态怎么办？

协议层无状态​**不代表你的业务不能有状态**​。如果 Server 需要跨调用保持状态，推荐做法是：由某个 工具​**显式生成一个 handle（句柄）**  ，返回给模型，模型再把这个 handle 作为参数传给后续工具调用—— 状态对模型是"可见的"，而不是隐藏在传输层的 session 里。

---

## 5. 能力发现：`server/discover`

`server/discover`​ 是一个**可选**的发现请求，每个 Server 都必须实现它，用来一次性获取 Server 支持 的协议版本、能力（capabilities）和身份信息。因为每个请求都自带 `_meta`​，客户端其实可以跳过发现， 直接发业务请求，遇到版本不匹配再重试——但发现请求通常更方便，而且​**响应本身是可缓存的**。

**请求示例**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" },
      "io.modelcontextprotocol/clientCapabilities": { "elicitation": {} }
    }
  }
}
```

**响应示例**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": { "listChanged": true },
      "resources": {}
    },
    "_meta": {
      "io.modelcontextprotocol/serverInfo": { "name": "example-server", "version": "1.0.0" }
    },
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

- `supportedVersions`​：服务端支持的协议版本列表。若客户端声明的版本不被支持，服务端返回`UnsupportedProtocolVersionError` 并列出自己支持的版本，客户端据此用一个双方都支持的版本重试。
- `capabilities`​：服务端支持哪些原语（tools / resources / prompts）、是否支持对应的`listChanged` 变更通知。
- `_meta.io.modelcontextprotocol/serverInfo`：服务端身份信息。
- `ttlMs`​ / `cacheScope`：本响应可以缓存多久、被谁复用（见第 10 节）。

---

## 6. 核心原语（Server 端）

MCP 定义三种 Server 可暴露的核心原语。每种原语一般都有"发现"（`*/list`​）方法，Tools 还有 "执行"（`tools/call`）方法。

### 6.1 Tools

**用途**：AI 应用可调用、会产生副作用/执行动作的可执行函数（文件操作、API 调用、数据库查询……）。

**​**​**​`tools/list`​**​**​** —— 发现工具列表

请求除标准 `_meta`​ 外，还支持可选的 `cursor` 参数用于分页。

```json
{
  "jsonrpc": "2.0", "id": 2, "method": "tools/list",
  "params": { "_meta": { "...": "标准 _meta 字段" } }
}
```

响应：

```json
{
  "jsonrpc": "2.0", "id": 2,
  "result": {
    "resultType": "complete",
    "tools": [
      {
        "name": "calculator_arithmetic",
        "title": "Calculator",
        "description": "执行数学计算，包括基础算术、三角函数、代数运算",
        "inputSchema": {
          "type": "object",
          "properties": {
            "expression": { "type": "string", "description": "如 '2 + 3 * 4'" }
          },
          "required": ["expression"]
        }
      }
    ],
    "ttlMs": 300000,
    "cacheScope": "public"
  }
}
```

字段说明：

|字段|说明|
| ----| ----------------------------------------------------------------------------------------|
|`name`|工具在该 Server 命名空间内的唯一标识，是调用时的主键，建议用有区分度的命名（如`calculator_arithmetic`​而不是`calculate`）|
|`title`|面向用户展示的可读名称|
|`description`|工具功能说明，供 LLM 判断何时该调用|
|`inputSchema`|JSON Schema，定义入参结构，用于类型校验和文档|

**​**​**​`tools/call`​**​**​** —— 执行工具

```json
{
  "jsonrpc": "2.0", "id": 3, "method": "tools/call",
  "params": {
    "name": "weather_current",
    "arguments": { "location": "San Francisco", "units": "imperial" },
    "_meta": { "...": "标准 _meta 字段" }
  }
}
```

响应：

```json
{
  "jsonrpc": "2.0", "id": 3,
  "result": {
    "resultType": "complete",
    "content": [
      { "type": "text", "text": "旧金山当前天气：20°C，多云，西风 8mph，湿度 65%" }
    ]
  }
}
```

- `name`​ 必须与 `tools/list` 中返回的名称完全一致。
- `arguments`​ 是按 `inputSchema` 定义传入的参数。
- 响应的 `content`​ 是一个数组，支持多种内容块类型（`text`​ / `image`​ / `resource` 等）， 可以在一次工具调用中返回富媒体、多段结果。
- `resultType`​ 除 `"complete"`​ 外还可能是 `"input_required"`（见第 7 节 MRTR）。

### 6.2 Resources

**用途**：为 AI 应用提供上下文数据（文件内容、数据库记录、API 响应等），是"只读数据"而非"可执行动作"。

常用方法：`resources/list`​（列出可用资源）、`resources/read`​（读取某个资源内容）。两者的响应 结构与 Tools 类似，都携带 `resultType`​、`ttlMs`​、`cacheScope`​；`resources/list`​ 支持`cursor`​ 分页；`resources/read` 按资源的 URI 读取内容，返回内容块数组。

### 6.3 Prompts

**用途**：可复用的交互模板（系统提示词、few-shot 示例等），帮助结构化与语言模型的交互。

常用方法：`prompts/list`​（列出可用提示词模板）、`prompts/get`（按名称、参数取回一个具体的 提示词内容，通常返回一组可直接拼进对话的 message 列表）。

> 一个典型例子：一个提供数据库上下文的 Server，可以同时暴露"查询数据库"的 Tool、 "数据库 Schema"的 Resource，以及"如何写查询"的 few-shot Prompt。

---

## 7. 客户端原语与 MRTR 模式

除了 Server 暴露的原语，MCP 也定义了 ​**Client 可以向 Server 暴露的原语**​，让 Server 作者能构建 更丰富的交互——最典型的是 ​**Elicitation**（向用户要更多信息）。

### 7.1 Elicitation

**用途**：Server 在处理请求过程中，需要用户提供额外信息或确认某个动作时使用。

⚠️ `2026-07-28`​ 版本​**彻底改变了 Elicitation（以及 Sampling）的传输方式**​：不再是服务端主动 向客户端发起 `elicitation/create`​ 请求（那需要一条常驻打开的双向流），而是改用新的​**Multi Round-Trip Requests（MRTR，多轮往返请求）模式**：

**MRTR 工作流程**：

1. 客户端正常发起 `tools/call`​（或 `prompts/get`​ / `resources/read`）。
2. 服务端发现需要用户输入，**不完成**这次调用，而是返回一个特殊结果：

   ```json
   {  "jsonrpc": "2.0", "id": 3,  "result": {    "resultType": "input_required",    "inputRequests": {      "user_input": {        "type": "elicitation",        "message": "请确认执行该操作",        "requestedSchema": {          "type": "object",          "properties": { "confirm": { "type": "boolean", "description": "确认执行" } }        }      }    },    "requestState": "awaiting-confirmation"  }}
   ```
3. 客户端收集用户的回答，​**重新发起原始调用**​，把答案放进 `inputResponses`​， 并原样带回服务端给的 `requestState`（一个不透明的字符串，Server 用它在多轮往返间 自行关联上下文）：

   ```json
   {  "jsonrpc": "2.0", "id": 4, "method": "tools/call",  "params": {    "name": "delete_records",    "arguments": { "...": "..." },    "inputResponses": { "user_input": { "action": "accept", "content": { "confirm": true } } },    "requestState": "awaiting-confirmation",    "_meta": { "...": "..." }  }}
   ```
4. 服务端拿到答案后继续处理，最终返回 `resultType: "complete"`。

**要点**：

- 服务端只能在**正在处理某个客户端请求的过程中**发起这类"要输入"的请求——用户永远不会 被"平白无故"弹出请求，每一次 elicitation 都能追溯到用户（或其代理）主动发起的动作。
- 单次往返可以有多个并发的 `inputRequests`。
- Elicitation 支持 `form`​（表单）模式和 `url`​（跳转链接）模式；​**规范明确禁止在 form 模式里 收集密码、API Key 等敏感凭证**​，这类信息必须走 `url` 模式。
- 已移除了旧版的 `notifications/elicitation/complete`​ 通知和 URL 模式下的 `elicitationId`字段——因为 MRTR 下，客户端通过"重新发起原始请求"就能知道结果，不再需要额外的完成信号。

### 7.2 已废弃：Sampling / Roots / Logging

`2026-07-28` 版本正式废弃了以下三个原语（仍可用，保证至少 12 个月内继续工作，但新实现不应再采用）：

- **Sampling**​（`sampling/createMessage`​）：让 Server 反过来向 Client 的 LLM 请求补全，用于 保持 Server 与具体模型无关。同样改用 MRTR 传输。​**官方建议新实现直接对接 LLM 提供商 API**， 不再依赖这个原语。
- **Roots**​（`roots/list`）：让客户端告诉服务端它可以访问哪些文件系统"根目录"。
- **Logging**​（`logging/setLevel`​ 等）：服务端向客户端发送日志消息。**官方建议**新实现改为 往 `stderr`（stdio 传输下）输出日志，或接入 OpenTelemetry。

---

## 8. 通知与订阅：`subscriptions/listen`

MCP 支持服务端主动向客户端推送变更通知（例如工具列表变化）。`2026-07-28`​ 版本把订阅机制统一为​**单一的长连接流**：

1. 客户端发送 `subscriptions/listen`​，并在 `notifications` 字段里声明自己关心哪些通知类型：

   ```json
   {  "jsonrpc": "2.0", "id": 4, "method": "subscriptions/listen",  "params": {    "_meta": { "...": "标准 _meta 字段" },    "notifications": { "toolsListChanged": true }  }}
   ```
2. 服务端用 `notifications/subscriptions/acknowledged`​ 确认订阅，`_meta`​ 中带上本次订阅的 ID （即那次 `subscriptions/listen`​ 请求的 `id`​），`notifications` 字段回显服务端实际同意推送 的子集（不支持的类型会被省略）。
3. 之后每条通知都会在 `_meta.io.modelcontextprotocol/subscriptionId` 里带上这个订阅 ID， 方便客户端关联：

   ```json
   {  "jsonrpc": "2.0",  "method": "notifications/tools/list_changed",  "params": { "_meta": { "io.modelcontextprotocol/subscriptionId": 4 } }}
   ```

**要点**：

- 订阅是**按类型 opt-in** 的，且只有服务端在 `server/discover`​ 里声明了对应`listChanged: true` 能力时，才有对应通知可订阅。
- 通知​**不保证必达**（尤其是跨传输重连场景），客户端不应完全依赖通知，仍应结合轮询保证数据新鲜度。
- 请求范围内的通知（如 `notifications/progress`，进度提示）仍走该次请求自己的响应流，无需订阅。
- 旧版的 HTTP GET 端点、`resources/subscribe`​ / `resources/unsubscribe`​均被这个统一的 `subscriptions/listen`​ 取代；SSE 的断线重连机制（`Last-Event-ID`）也一并移除—— 流断开后客户端应该用新的请求 ID 重新发起请求，而不是尝试"续传"。

---

## 9. 传输层

### 9.1 stdio Transport

用标准输入输出流做本地进程间通信，无网络开销，适合"Host 直接拉起本地 Server 子进程"的场景 （例如 Claude Desktop 启动本地文件系统 Server）。JSON-RPC 消息按行分帧写入 stdin/stdout。

### 9.2 Streamable HTTP Transport

用于远程 Server：客户端到服务端用 HTTP POST 发消息，服务端到客户端可选用 Server-Sent Events 做流式响应。

`2026-07-28`​ 版本的新增强制要求——​**Header 路由**​：每个 Streamable HTTP 请求都**必须**带上`Mcp-Method`​ 和 `Mcp-Name` 两个 HTTP 头，网关 / 限流器 / WAF 可以直接基于这两个头做路由和鉴权， 不需要解析 JSON Body：

```http
POST /mcp HTTP/1.1
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: search
Content-Type: application/json

{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"search","arguments":{"q":"otters"},
 "_meta":{"io.modelcontextprotocol/clientInfo":{"name":"my-app","version":"1.0"}}}}
```

> 旧版的 ​**HTTP+SSE 传输**​（`2025-03-26` 之前使用、后被 Streamable HTTP 取代的更早方案） 已被正式标记为废弃，给了一年的下线过渡期。

---

## 10. 缓存：`ttlMs`​ / `cacheScope`

`2026-07-28`​ 新增：`tools/list`​、`prompts/list`​、`resources/list`​、`resources/read` 的响应 都携带以下两个缓存提示字段：

|字段|说明|
| ----| ------------------------------------------------|
|`ttlMs`|新鲜度提示，单位毫秒，表示这个结果可以被缓存多久|
|`cacheScope`|谁可以复用这个缓存的结果，例如`&#34;public&#34;`|

同时，list 类响应现在有​**确定性的顺序**，客户端可以放心缓存工具目录、并在重连后保持上游 prompt 缓存的稳定性（对于大量工具的场景，避免每次重连都让 LLM 的 prompt 缓存失效）。

---

## 11. 鉴权（Authorization）

`2026-07-28` 版本对鉴权做了多项加固，目标是让 MCP 更贴近企业级 OAuth 2.1 / OpenID Connect 部署：

- **​**​**​`iss`​**​**​**​ **参数校验（RFC 9207）**  ​：授权服务器应在响应中返回 `iss`​ 参数，客户端**必须**在兑换 授权码前校验它，堵住"授权服务器混淆攻击"的漏洞。
- **DCR 期间设置** **​**​**​`application_type`​**​**​**​：客户端在动态客户端注册（DCR）阶段应声明`application_type`​，避免授权服务器错误地拒绝桌面 / CLI 应用的 `localhost`​ 回调地址 （这是很多 CLI 客户端 OAuth 流程报 `redirect_uri` 错误的常见原因）。
- **客户端凭证与签发方绑定**：某个授权服务器签发的客户端凭证，不能在另一个授权服务器上复用。
- **DCR 正式废弃，转向 CIMD**​：动态客户端注册（Dynamic Client Registration）被标记为废弃， 官方推荐迁移到 ​**Client ID Metadata Documents（CIMD）**  。DCR 仍可用于向后兼容，但未来版本 会移除。

远程 Server（Streamable HTTP）支持标准的 HTTP 鉴权方式：Bearer Token、API Key、自定义 Header 等，​**官方推荐用 OAuth 获取访问令牌**。

---

## 12. 扩展框架（Extensions）

`2026-07-28`​ 正式确立了 MCP 的​**扩展框架**：新能力可以先作为独立扩展发布、迭代，成熟后 （如果需要）再考虑并入核心规范，核心协议本身可以保持稳定。目前正式的扩展包括：

- **Tasks 扩展**​（`io.modelcontextprotocol/tasks`​）：处理长耗时任务。此前作为实验性特性存在于 核心协议里，本版本正式移出核心、独立成扩展。设计上从"阻塞等待结果"改为​**轮询**​：服务端为 长任务返回一个可持久化的句柄，客户端用新增的 `tasks/get`​ 轮询状态、用 `tasks/update`​更新任务，任务状态变更通知也统一走 `subscriptions/listen` 流，不再用旧的 HTTP GET 端点。
- **MCP Apps**：让 Server 能返回可交互的、服务端渲染的 UI（不只是文本/数据）。
- **Enterprise Managed Authorization（EMA）**  ：面向企业场景的托管鉴权扩展。

> 扩展的意义：像 Tasks、MCP Apps 这类还在快速演进的能力，可以按自己的节奏发版，不必绑定核心 协议的发布周期，也不会让核心协议变得臃肿。

---

## 13. 错误处理

MCP 沿用 JSON-RPC 2.0 的错误响应结构：`{ "code": ..., "message": ..., "data": ... }`​。`2026-07-28` 新增了错误码分段策略：

|范围|含义|
| ----| ---------------------------------------------------------|
|`-32000`\~`-32019`|由具体实现自行定义（已有 SDK 的用法予以保留，不强制迁移）|
|`-32020`\~`-32099`|保留给 MCP 规范本身使用|

常见错误场景：请求了服务端不支持的协议版本时，返回 `UnsupportedProtocolVersionError`并在其中列出服务端实际支持的版本列表，供客户端重试。

---

## 14. 废弃策略与已废弃特性一览

`2026-07-28`​ 首次引入​**正式的废弃政策**​：任何特性被标记废弃后，至少保证 **12 个月**的最短 窗口期才允许被移除，让实现方有时间规划升级，而不是被动应对突发的破坏性变更。

**本版本标记为已废弃的特性**（仍可用，但新实现不应采用）：

|特性|替代方案|
| ---------------------------------| ----------------------------------------|
|`initialize`​/`initialized`​握手、`Mcp-Session-Id`|每请求自带`_meta`​，可选`server/discover`|
|`sampling/createMessage`（Sampling）|直接对接 LLM 提供商 API|
|`roots/list`（Roots）|（无直接替代，按需通过工具参数显式传递）|
|Logging 原语（`logging/setLevel`等）|stdio 下写`stderr`，或接入 OpenTelemetry|
|HTTP+SSE 传输（旧版远程传输方案）|Streamable HTTP|
|动态客户端注册 DCR|Client ID Metadata Documents（CIMD）|
|`ping`​、`notifications/roots/list_changed`|已直接移除|
|`notifications/elicitation/complete`​、URL 模式的`elicitationId`|MRTR 下通过重新发起原始请求获知结果|

---

## 15. 版本协商与新旧版本兼容性

MCP 用形如 `YYYY-MM-DD`​ 的日期字符串标识版本，表示"这个日期是最后一次引入不兼容变更的时间"。 已发布过的主要版本包括 `2024-11-05`​（初版）、`2025-03-26`​（引入 Streamable HTTP）、`2025-06-18`​、`2025-11-25`​（Tasks 首次以实验特性形式进入核心）、以及当前的 `2026-07-28`。

**版本协商方式**​：客户端在请求 `_meta`​ 中声明自己想用的 `protocolVersion`​；服务端如果不支持， 返回错误并列出自己支持的版本列表，客户端换一个双方都支持的版本重试 （或通过 `server/discover`​ 提前拿到 `supportedVersions` 列表，避免这次来回）。

 **⚠️ 对开发者的实际影响**：

- 截至目前，社区里大量现有 Server / Client 代码、教程、以及各语言 SDK 的 ​**1.x 主线**​（例如 Python 官方 SDK 的 `mcp`​ 包 1.x 分支）实现的都是 ​**旧版协议**​（`initialize`​/`initialized`​握手 + `Mcp-Session-Id`​ 会话），并未升级到 `2026-07-28` 的无状态模型。
- 官方 TypeScript / Python / Go / C# 四个 Tier 1 SDK 已在 `2026-07-28`​ 当天发布了支持新协议的​**2.x 版本**​，但升级涉及破坏性 API 变更（如 Python SDK 中 `FastMCP`​ 类整体改名为 `MCPServer`）。
- 如果你的目标是"现在就能跑起来、和现有生态最大兼容"，建议**继续使用各语言 SDK 的 1.x 稳定版**（它实现的是旧版有状态协议）；如果目标是"面向未来、支持无状态部署 / 多实例扩展"，再评估迁移 到 2.x 及 `2026-07-28` 新协议，并预留迁移成本。
- 两个协议版本可以并存：新版 SDK 通常会同时支持"新协议客户端连旧协议 Server"和反过来的场景， 但细节以你所用 SDK 的迁移指南为准。

---

## 16. 方法速查表

|方法|发起方|用途|备注|
| --------------| ----------------| ------------------------| ----------------------|
|`server/discover`|Client → Server|发现协议版本/能力/身份|可选但推荐，响应可缓存|
|`tools/list`|Client → Server|列出可用工具|支持`cursor`分页，响应可缓存|
|`tools/call`|Client → Server|执行工具|可能返回`input_required`（MRTR）|
|`resources/list`|Client → Server|列出可用资源|支持分页，响应可缓存|
|`resources/read`|Client → Server|读取资源内容|响应可缓存|
|`prompts/list`|Client → Server|列出可用提示词模板||
|`prompts/get`|Client → Server|获取具体提示词内容||
|`subscriptions/listen`|Client → Server|订阅通知（长连接）|按类型 opt-in|
|`tasks/get`（Tasks 扩展）|Client → Server|轮询长任务状态||
|`tasks/update`（Tasks 扩展）|Client → Server|更新任务||
|`notifications/tools/list_changed`等|Server → Client|通知客户端某类列表已变化|走订阅流，无需响应|
|`notifications/subscriptions/acknowledged`|Server → Client|确认某次订阅||
|`notifications/progress`|Server → Client|长耗时请求的进度提示|走该请求自身的响应流|

**已废弃方法**​（仍可用，勿用于新实现）：`initialize`​ / `initialized`​、`sampling/createMessage`​、`roots/list`​、`elicitation/create`​（改用 MRTR 的 `input_required`​ / `inputResponses`​ 模式）、`logging/setLevel`​、`ping`​、`resources/subscribe`​ / `resources/unsubscribe`。

---

## 17. 参考链接

- 规范正文：https://modelcontextprotocol.io/specification/2026-07-28
- 完整 Changelog：https://modelcontextprotocol.io/specification/2026-07-28/changelog
- 架构总览文档：https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture
- 发版博客（`2026-07-28`）：https://blog.modelcontextprotocol.io/posts/2026-07-28/
- 官方 SDK 仓库：

  - Python: https://github.com/modelcontextprotocol/python-sdk
  - TypeScript: https://github.com/modelcontextprotocol/typescript-sdk
  - Go: https://github.com/modelcontextprotocol/go-sdk
  - C#: https://github.com/modelcontextprotocol/csharp-sdk
- 官方参考 Server 实现集合：https://github.com/modelcontextprotocol/servers
- MCP Inspector（调试工具）：https://github.com/modelcontextprotocol/inspector
