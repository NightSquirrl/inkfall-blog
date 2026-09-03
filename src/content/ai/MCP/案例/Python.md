---
title: Python
draft: false
description: 使用 FastMCP 与 Claude API 实现提问、工具调用与最终回答的 MCP 完整闭环示例。
category: MCP
publishedAt: "2026-08-09"
---

一个最小可运行的示例，演示 AI 模型（Claude）如何通过 **MCP（Model Context Protocol）**  调用外部工具，完成"提问 → AI 决定调用工具 → 执行工具 → AI 给出最终回答"的完整闭环。

## 文件说明

|文件|作用|
| ----| ----------------------------------------------------------------------------------------------------------------|
|`server.py`|MCP Server，用`FastMCP`​高层 API 暴露两个工具：`get_weather`​（查天气）、`calculate`（算表达式）|
|`client.py`|MCP Client + Claude API，负责启动 Server、把工具列表交给 Claude、执行 Claude 请求调用的工具、把结果回传给 Claude|
|`requirements.txt`|依赖清单|

## 运行步骤

```bash
# 1. 建议用虚拟环境
python3 -m venv venv
source venv/bin/activate      # Windows 用 venv\Scripts\activate

# 2. 安装依赖
pip install -r requirements.txt

# 3. 设置 Anthropic API Key
export ANTHROPIC_API_KEY=你的key   # Windows 用 set ANTHROPIC_API_KEY=你的key

# 4. 运行客户端（会自动拉起 server.py 子进程）
python client.py
```

正常情况下会看到：

1. 打印出 Server 提供的工具列表
2. Claude 判断需要查天气 + 做计算，依次请求调用 `get_weather`​、`calculate`
3. 每次工具调用的参数和返回结果
4. Claude 综合工具结果给出的最终自然语言回答

## 核心原理

```
┌──────────┐   1.list_tools()   ┌──────────┐
│  Client  │ ─────────────────> │  Server  │
│(client.py)│ <───────────────── │(server.py)│
└────┬─────┘   工具定义(schema)  └──────────┘
     │
     │ 2. 把工具定义 + 用户问题一起发给 Claude
     ▼
┌──────────┐
│  Claude  │  判断是否需要调用工具
└────┬─────┘
     │ 3. 返回 tool_use（工具名 + 参数）
     ▼
┌──────────┐   4.call_tool()    ┌──────────┐
│  Client  │ ─────────────────> │  Server  │  真正执行工具逻辑
│          │ <───────────────── │          │
└────┬─────┘   工具执行结果      └──────────┘
     │
     │ 5. 把结果发回 Claude
     ▼
┌──────────┐
│  Claude  │  生成最终回答
└──────────┘
```

- **Server 端**：只关心"我有哪些工具、怎么执行"，不关心谁来调用、AI 怎么想。
- **Client 端**：是 AI 和 Server 之间的桥梁——把 Server 的工具"翻译"成 Claude 能理解的格式， 并在 Claude 提出调用请求时，真正去执行 MCP 调用、拿到结果、再喂回给 Claude。
- 这种"Server 只管暴露能力、Client 负责接入 AI"的解耦设计，正是 MCP 的核心价值： 同一个 Server 可以被任何支持 MCP 的客户端/AI 复用，不需要为每个 AI 应用重写一遍工具接入代码。

## 关于 mcp SDK 版本的说明

官方 `mcp`​ 包在 2026-06-30 发布了改动很大的 v2 beta（为配合新协议版本， 把 `FastMCP`​ 类整体改名为 `MCPServer`​，导入路径也变了，且目前生态和大多数教程还没跟上）。 本 demo 固定使用 `mcp==1.29.0`（1.x 分支的最后一个稳定版本）以保证可直接运行； 如果你想尝鲜 v2 的新写法，可以参考官方仓库的迁移指南。

## 可以尝试的扩展

- 给 `server.py` 加更多工具，比如读文件、查数据库、调用第三方 API
- 把 `stdio`​ 换成 `sse`​ / `streamable-http` 传输，让 Server 变成一个独立部署的远程服务
- 接入官方现成的 MCP Server（如 GitHub、Slack、文件系统等），而不是自己写

‍

## 详细代码

### client.py

> client不是必须的,可以通过claude code ,opencode使用,让ai讲server.py配置为mcp即可

```python
"""
MCP Client 示例
================
这个脚本演示了 AI 模型（这里用 Claude）如何通过 MCP 协议
调用 server.py 中暴露的工具，完成"感知外部世界 -> 决策 -> 调用工具 -> 得到结果"的闭环。

整体流程：
1. 用子进程方式启动 server.py，建立 stdio 连接
2. 从 server 拿到工具列表（list_tools）
3. 把工具列表转换成 Claude API 需要的格式，一起发给 Claude
4. 如果 Claude 决定调用某个工具（返回 tool_use），
   就通过 MCP session 去真正调用 server 里的工具（call_tool）
5. 把工具执行结果再发回给 Claude，让它生成最终的自然语言回答

运行方式：
    export ANTHROPIC_API_KEY=你的key
    python client.py
"""

import asyncio
import os

from anthropic import Anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

MODEL_NAME = "claude-sonnet-5"  # 可替换为你账号下可用的模型，例如 claude-opus-4-8

async def run():
    anthropic_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

    # 1. 通过 stdio 方式，用子进程启动 server.py
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )

    async with stdio_client(server_params) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            # 建立会话（MCP 协议握手）
            await session.initialize()

            # 2. 拿到 server 暴露的所有工具
            tools_result = await session.list_tools()
            print("=== Server 提供的工具 ===")
            for t in tools_result.tools:
                print(f"- {t.name}: {t.description}")
            print()

            # 3. 把 MCP 的 Tool 定义转换成 Claude API 需要的 tools 格式
            claude_tools = [
                {
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.inputSchema,
                }
                for t in tools_result.tools
            ]

            user_question = "帮我查一下北京的天气，另外顺便算一下 (12 + 8) * 3 等于多少"
            print(f"用户提问：{user_question}\n")

            messages = [{"role": "user", "content": user_question}]

            # 4. 第一次调用 Claude，把工具定义一起传过去，
            #    让 Claude 自己判断要不要调用工具、调用哪个
            response = anthropic_client.messages.create(
                model=MODEL_NAME,
                max_tokens=1024,
                tools=claude_tools,
                messages=messages,
            )

            # Claude 可能一次返回多个 block：文字 + 若干个 tool_use
            messages.append({"role": "assistant", "content": response.content})

            # 只要 Claude 还在请求调用工具，就循环处理，直到它给出最终回答
            while response.stop_reason == "tool_use":
                tool_results = []

                for block in response.content:
                    if block.type == "tool_use":
                        print(f"[Claude 请求调用工具] {block.name}，参数：{block.input}")

                        # 5. 真正通过 MCP session 调用 server 里的工具
                        result = await session.call_tool(block.name, block.input)
                        result_text = "".join(
                            item.text for item in result.content if item.type == "text"
                        )
                        print(f"[工具返回结果] {result_text}\n")

                        tool_results.append(
                            {
                                "type": "tool_result",
                                "tool_use_id": block.id,
                                "content": result_text,
                            }
                        )

                # 把工具执行结果发回给 Claude，让它继续生成回答
                messages.append({"role": "user", "content": tool_results})
                response = anthropic_client.messages.create(
                    model=MODEL_NAME,
                    max_tokens=1024,
                    tools=claude_tools,
                    messages=messages,
                )
                messages.append({"role": "assistant", "content": response.content})

            # 打印 Claude 最终的自然语言回答
            final_text = "".join(
                block.text for block in response.content if block.type == "text"
            )
            print("=== Claude 最终回答 ===")
            print(final_text)

if __name__ == "__main__":
    asyncio.run(run())
```

### server.py

```python
"""
MCP Server 示例
================
基于 MCP 官方 Python SDK 的 FastMCP 高层 API 实现，
通过 stdio 传输协议与客户端通信，暴露两个工具（Tool）给 AI 模型调用：

1. get_weather(city: str)     -> 查询城市天气（示例用模拟数据）
2. calculate(expression: str) -> 计算数学表达式

一般不需要手动运行本文件，而是由 client.py 以子进程方式启动它。
（手动运行： python server.py，会以 stdio 方式阻塞等待客户端连接）
"""

import math

from mcp.server.fastmcp import FastMCP

# 创建一个 MCP Server 实例
mcp = FastMCP("demo-mcp-server")

# 模拟的天气数据库
FAKE_WEATHER_DB = {
    "北京": "晴，28°C",
    "上海": "多云，26°C",
    "深圳": "雷阵雨，31°C",
    "广州": "阵雨，30°C",
}

@mcp.tool()
def get_weather(city: str) -> str:
    """查询指定城市当前的天气情况。

    Args:
        city: 城市名称，例如：北京、上海
    """
    return FAKE_WEATHER_DB.get(city, f"暂无「{city}」的天气数据")

@mcp.tool()
def calculate(expression: str) -> str:
    """计算一个数学表达式的结果，例如 '3 * (4 + 5)'。

    Args:
        expression: 合法的数学表达式字符串
    """
    try:
        # 仅暴露 math 模块里的函数给 eval，避免任意代码执行
        allowed_names = {k: v for k, v in math.__dict__.items() if not k.startswith("__")}
        result = eval(expression, {"__builtins__": {}}, allowed_names)
        return str(result)
    except Exception as e:
        return f"计算出错：{e}"

if __name__ == "__main__":
    # 以 stdio 方式运行（也支持 mcp.run(transport="sse") 等其他方式）
    mcp.run(transport="stdio")
```

### requirements.txt

```python
# 说明：官方 mcp SDK 在 2026-06-30 发布了破坏性极大的 v2 beta（FastMCP 重命名为 MCPServer 等），
# 目前生态和教程大多仍基于 1.x，故此处固定在 1.x 最后一个稳定版本，避免踩坑。
mcp==1.29.0
anthropic>=0.40.0
```

### 测试server

`npx @modelcontextprotocol/inspector python server.py`
