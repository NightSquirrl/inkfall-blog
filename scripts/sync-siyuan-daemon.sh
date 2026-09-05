#!/bin/zsh
# ============================================================
# 思源笔记同步后台守护脚本
# 立即执行一次同步,之后每 2 小时(7200 秒)循环执行一次
#
# 后台启动(关闭终端后仍运行):
#   nohup zsh /Users/inkfall/Desktop/code/inkfall-blog/scripts/sync-siyuan-daemon.sh \
#     >> ~/Library/Logs/inkfall-siyuan-sync/daemon.log 2>&1 &
#
# 查看运行状态:
#   pgrep -fl sync-siyuan-daemon
# 停止后台运行:
#   pkill -f sync-siyuan-daemon
# ============================================================

set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# LOG_DIR="$HOME/Library/Logs/inkfall-siyuan-sync"
LOG_DIR="./"
INTERVAL=7200   # 每 2 小时

mkdir -p "$LOG_DIR"

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >> "$LOG_DIR/daemon.log"; }

log "========== 同步守护启动(PID $$) =========="

while true; do
  log "开始执行同步..."
  "$SCRIPT_DIR/sync-siyuan.sh"
  code=$?
  log "本轮同步退出码=$code,${INTERVAL} 秒后执行下一轮"
  sleep "$INTERVAL"
done
