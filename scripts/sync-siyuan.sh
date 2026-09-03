#!/bin/zsh
# ============================================================
# 从思源笔记同步内容到 Astro 博客(inkfall-blog)并提交到 astro 分支
# 供 launchd 每 2 小时调用(com.inkfall.siyuan-sync),也可手动执行
#
# 流程:sync:force 同步 -> 检测内容变更 -> add(排除 siyuan-export-astro)
#       -> commit -> push origin astro;失败均记录日志且不做提交
# 日志:~/Library/Logs/inkfall-siyuan-sync/sync.log
# ============================================================

set -u

REPO="/Users/inkfall/Desktop/code/inkfall-blog"
SYNC_DIR="$REPO/siyuan-export-astro"
LOG_DIR="$HOME/Library/Logs/inkfall-siyuan-sync"
LOGFILE="$LOG_DIR/sync.log"
LOCK_DIR="/tmp/inkfall-siyuan-sync.lock"

# launchd 环境 PATH 精简,补齐 node(nvmd)/npm/常见路径
export PATH="$HOME/.nvmd/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

mkdir -p "$LOG_DIR"
log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >> "$LOGFILE"; }

# 并发锁,避免重叠执行
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  log "已有同步任务在运行,本次跳过"
  exit 0
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null' EXIT

log "================== 同步开始 =================="

cd "$REPO" || { log "无法进入仓库 $REPO,中止"; exit 1; }

# 1) 确保在 astro 分支
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [[ "$branch" != "astro" ]]; then
  if git checkout astro >/dev/null 2>&1; then
    log "已从分支 $branch 切换到 astro"
  else
    log "切换到 astro 分支失败(当前分支可能未提交的改动),中止"
    exit 1
  fi
fi

# 2) 执行强制全量同步
cd "$SYNC_DIR" || { log "无法进入 $SYNC_DIR,中止"; exit 1; }
if [[ ! -f "dist/index.js" ]]; then
  log "dist/index.js 不存在,先执行 npm run build"
  if ! npm run build >>"$LOGFILE" 2>&1; then
    log "npm run build 失败,中止"
    exit 1
  fi
fi
if ! npm run sync:force >>"$LOGFILE" 2>&1; then
  log "sync:force 执行失败(思源笔记是否已运行?),中止,不做提交"
  exit 1
fi
log "sync:force 执行完成"

cd "$REPO" || exit 1

# 3) 检测内容变更(忽略未纳入版本控制的 siyuan-export-astro 工具目录)
changes=$(git status --porcelain | grep -v '^?? siyuan-export-astro/$' || true)
if [[ -z "$changes" ]]; then
  log "无内容变更,跳过提交"
  exit 0
fi
log "检测到内容变更:"
printf '%s\n' "$changes" | sed 's/^/    /' >>"$LOGFILE"

# 4) 暂存同步输出内容(排除工具目录)
git add . ':(exclude)siyuan-export-astro'
staged=$(git diff --cached --name-only | grep 'siyuan-export-astro' || true)
if [[ -n "$staged" ]]; then
  log "暂存区意外包含 siyuan-export-astro,已重置并中止"
  git reset -q
  exit 1
fi

# 5) 提交
if ! git commit -q -m "chore: sync content from siyuan ($(date '+%Y-%m-%d %H:%M'))"; then
  log "git commit 失败,中止"
  exit 1
fi
log "已提交:$(git log -1 --format=%h)"

# 6) 推送(不做强制推送)
if ! git push origin astro >>"$LOGFILE" 2>&1; then
  log "git push 失败(请检查网络/远程状态,未强制推送),中止"
  exit 1
fi
log "已推送 origin/astro"
log "================== 同步结束 =================="
exit 0
