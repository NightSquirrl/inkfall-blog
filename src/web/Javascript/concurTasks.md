---
title: TS 任务并发
---

## 代码案例

```typescript
function concurTasks(tasks: (() => Promise<void>)[], maxNum: number): Promise<any> {
  if (tasks.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    let nextTaskIndex = 0;
    let finishTaskCount = 0;
    const result: any[] = [];

    async function _executeTasks(): Promise<void> {
      if (nextTaskIndex >= tasks.length) {
        return;
      }
      const i = nextTaskIndex;
      const curTask = tasks[nextTaskIndex++];
      const resp = await curTask();
      result[i] = resp;
      finishTaskCount++;
      if (finishTaskCount === tasks.length) {
        resolve(result);
      }
      _executeTasks().catch((err) => {
        reject(err);
      });
    }

    for (let i = 0; i < Math.min(maxNum, tasks.length); i++) {
      _executeTasks().catch((err) => {
        reject(err);
      });
    }
  });
}
```
