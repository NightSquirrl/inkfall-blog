---
title:  git 常用命令
tag:
  - git
star: true
---


## 分支相关
> 查看本地和远程所有分支
```bash
git br -a 
```

> 查看本地所有分支

```bash
git branch 
```

> 切换本地指定分支

```bash
git checkout xxx
```

> 新建分支

```bash
git checkout -b new-branch
```

> 删除本地分支

```bash
git branch -d branch-name
```

## 提交代码

> 将本地 a 的代码提交到远程 b 分支

```bash
git push origin a:b
```



## 代码回退

> 回退到上一个提交

```bash
#保留工作目录中的更改
git reset HEAD^
#丢弃所有未提交的更改
git reset --hard HEAD^
```

> 回退到指定的提交

```bash
git reset <commit-hash>

# <commit-hash> 替换为你想要回退到的提交的哈希值
git reset --hard <commit-hash>
# 获取 hash
git log
```



## 代码合并

> 分支合并

```bash
# git checkout 命令切换到目标分支
git merge <branch-name> 命令，将指定分支的更改合并到当前分支。
```

> commit id 合并

```bash
# 查看提交日志：使用 命令查看提交的日志，找到想要合并的那个 commit 的 ID（简略 ID，即前8位数）。
git log 
# 切换分支：使用<> 命令切换到你想要合并到的目标分支。
git checkout 
# 应用 commit：使用 git cherry-pick 命令加上之前复制的 commit ID，将该 commit 应用到当前分支。
git cherry-pick
推送更改：如果需要将更改推送到远程仓库，可以使用 git push 命令。
```





## 其他

> 查看本地提交log

```bash
git reflog master
```

> 添加远程仓库地址

```bash
git remote add origin git@e.coding.net:xxx/xxx.git
```

> 查看远程的仓库地址

```bash
git remote -v
```

> **git stash**

临时保存工作目录中已跟踪文件和暂存区的修改，不受分支限制。后续可切换回当前分支继续使用 - git stash save "本次暂存tag"        储藏工作目录中已跟踪文件和暂存区的修改 - git stash list  查看临时保存记录 - git stash pop 恢复最近一次的临时保存

1. **git stash**: 将修改保存到一个新的stash中，并清空工作目录和暂存区。
2. **git stash save "message"**: 创建一个新的stash，并添加描述信息，便于之后查找对应的stash。
3. **git stash list**: 列出所有已经保存的stash，可以查看每个stash的描述信息和ID。
4. **git stash apply stash@{id}**: 应用特定ID的stash到工作目录，但不从列表中移除它。
5. **git stash pop**: 应用最近创建的stash到工作目录，并从列表中移除它。
6. **git stash show stash@{id}**: 显示特定ID的stash做出的更改，方便查看保存了哪些改动。
7. **git stash drop stash@{id}**: 删除特定ID的stash，从列表中移除。
8. **git stash branch** : 基于最新的stash创建一个新的分支，并切换到该分支开始工作。
9. **git stash clear**: 删除所有的stash，清空列表。