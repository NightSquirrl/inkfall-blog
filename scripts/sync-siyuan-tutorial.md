# 思源笔记自动同步脚本使用教程

将思源笔记内容同步到本博客(`inkfall-blog`)并提交推送到 `astro` 分支。

## 脚本说明

| 脚本 | 作用 | 运行一次后 |
| --- | --- | --- |
| `sync-siyuan.sh` | 执行**单次**同步:同步内容 → 检查变更 → 提交 → 推送 | 立即退出 |
| `sync-siyuan-daemon.sh` | **后台定时器**:立即同步一次,之后每 2 小时(7200 秒)自动重复 | 常驻后台循环运行 |

两个脚本是"定时器"与"执行者"的关系:`sync-siyuan-daemon.sh` 内部循环调用 `sync-siyuan.sh`,日常只需管理 daemon。

## 前置条件

1. 思源笔记处于运行状态(内核 API `http://127.0.0.1:6806`)
2. `siyuan-export-astro/.env` 中已配置 `SIYUAN_TOKEN`(缺 `dist/index.js` 时脚本会自动先执行 `npm run build`)
3. 当前处于 `astro` 分支的 git 仓库(脚本会自动切换)

## 使用教程

### 1. 手动同步一次(立即执行)

```bash
cd /Users/inkfall/Desktop/code/inkfall-blog
./scripts/sync-siyuan.sh
```

- 同步成功且内容有变更 → 自动 `git commit` 并 `git push origin astro`
- 无内容变更 → 打印"无内容变更,跳过提交"
- 思源未运行等失败场景 → 不会产生提交,直接退出(可看日志)

### 2. 后台定时同步(每 2 小时,推荐)

打开 **macOS 自带「终端」App**(不是 IDE 内置终端),执行:

```bash
cd /Users/inkfall/Desktop/code/inkfall-blog
nohup zsh ./scripts/sync-siyuan-daemon.sh  2>&1 &
nohup zsh ./scripts/sync-siyuan-daemon.sh >/dev/null 2>&1 & disown
pgrep -fl sync-siyuan-daemon
```

- 最后一条 `pgrep` 能看到进程号即启动成功,之后可关闭终端窗口
- 首轮立即执行,之后每 2 小时自动运行一轮
- **电脑重启后需重新执行上面的启动命令**(此方案不使用系统级权限,无法开机自启)

> 提示:请在系统「终端」App 中运行,不要在 IDE 内置终端中运行——IDE 关闭终端时会清理进程组,`nohup` 也保不住进程。

### 3. 查看运行状态与日志

```bash
# 进程是否存活
pgrep -fl sync-siyuan-daemon

# 守护循环日志(何时启动、每轮结果)
tail -f ~/Library/Logs/inkfall-siyuan-sync/daemon.log

# 单次同步明细日志(同步数量、提交 hash、推送结果)
tail -f ~/Library/Logs/inkfall-siyuan-sync/sync.log
```

> 脚本日志写入固定路径 `~/Library/Logs/inkfall-siyuan-sync/`,不会输出到终端。用 `nohup ... > daemon.log 2>&1` 重定向出来的 `daemon.log` 为空是正常现象。

### 4. 停止后台同步

```bash
pkill -f sync-siyuan-daemon
```

## 常见问题(FAQ)

**Q1: 每次运行哪些文件会被提交?**
只提交同步产生的内容变更(主要位于 `src/content`、`public` 等)。`siyuan-export-astro` 工具目录未纳入版本控制,会被排除,不会被提交。

**Q2: 为什么日志停在很久以前,没有新记录了?**
先检查进程是否存活(`pgrep -fl sync-siyuan-daemon`)。
若提示 `Operation not permitted`,说明进程无法访问 `~/Desktop` 下项目(macOS 隐私保护),请改为在系统「终端」中启动以继承终端授权。

**Q3: 修改了同步频率怎么做?**
编辑 `sync-siyuan-daemon.sh` 中 `INTERVAL=7200`(单位:秒),保存后重启守护进程即可。

**Q4: 只是想测试同步能不能跑通?**
运行一次 `./scripts/sync-siyuan.sh`,看 `sync.log` 尾部是否出现"已推送 origin/astro"。
