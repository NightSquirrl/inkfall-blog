---
title: 🥹 git 收集
tag:
  - git
star: true
---

## git 无法检测到 文件夹命名大小写的变化如何解决

```bash
git config core.ignorecase # 查看本地仓库git忽略大小写是打开还是关闭
git config core.ignorecase false # 关闭忽略大小写
```

## 修改上次提交

```bash
git commit --amend -branch_name '新的描述' # 修改上次提交

# 如果上次的commit还没有推送到远程仓库
git push origin branch_name # 推送到远程仓库
# 如果上次的commit已经推送到远程仓库
git push -f origin branch_name # 强制推送到远程仓库
```

## 撤销提交

### `git reset`

`git reset`,可以改变`GIT`历史记录,主要作用将指针(HEAD和分支)移动到指定的提交位置,并根据选项改变工作区域和暂存的状态.

使用场景

- 撤销最近的或特定的提交（不保留提交历史）。
- 修改提交历史（通常用于本地开发，不推荐用于已推送的提交）。

#### 模式

`--soft`:该命令表示撤销代码到暂存区之后，`commit`之前，代码在本地不会改变。[保留修改的代码并执行了`git add`]
`--mixed`:该命令表示撤销代码到暂存区和`commit`之前，代码在本地不会改变。[正常的编辑状态]
`--hard`:该命令表示回退代码到某个版本下，代码在本地会改变到指定版本下，谨慎操作。[直接舍弃掉所有,只前往你想去的地方]

#### 指针HEAD的方式

```javascript
git reset --soft HEAD^
```
HEAD^表示撤销到上一个版本号，其中一个^表示上一次，^^表示上上次，以此类推。另外，需要注意，非windows系统下正常输入git reset --soft HEAD^，即可将代码撤销到git add .之后的状态（暂存区状态）。但是windows系统下需要输入git reset --soft HEAD^^才可以。

这是因为在windows系统下cmd控制台中换行符默认是^，而不是\ ，如果输入少了，会提示more？，意思是问你下一行是否需要再输入，而^符号就被当做换行符而被git命令忽略掉了。

因此，如果在windows下是撤销2次commit,需要输入4个^才可以


```javascirpt
git reset --soft HEAD~1
```
此命令不分windows系统和非windows的问题，可以优先使用这个。

#### 指定id `git reset --mode <commit>`

`git log`查看git 日志

假设有如下的记录

```javascript
commit ccxxx
Merge: ead79dc 4395577
Author: xxxx
Date:   Mon Jan 20 19:11:16 2025 +0800

1
    merge master into master   

...

commit 439xx
Author: xxx
Date:   Mon Jan 20 17:34:36 2025 +0800

2
...

commit eadxxx
Merge: 4adc307 ef24d77
Author: xxx
Date:   Mon Jan 20 16:20:41 2025 +0800

3
...
```

想要回滚到3的位置

```javascript
git reset --soft eadxxx
```

> 详细说明
> 指定到3的位置,那么3之前的commit的修改的记录会回到你的本次代码中根据你的模式来判断是否暂存,还是丢弃


### `git revert`

`git revert` 用于 撤销指定提交，通过创建新的提交来保留完整的提交历史。

使用场景

- 撤销某次提交的改动（保留历史记录）。
- 用于修复错误提交，特别是在代码已推送到远程仓库时。

#### 撤销单个提交

```javascript
git revert <commit>
```
> 创建一个新的提交，用于撤销` <commit>` 所作的改动。

#### 撤销多个提交

```javascript
git revert <start-commit>..<end-commit>
```

> 撤销从`<start-commit>` 到 `<end-commit>`（不包括 `<end-commit>`）之间的提交。

#### 特点

- 非破坏性操作，保留提交历史。
- 创建一个新提交，因此在协作开发中更安全。
- 适合在已经推送到远程仓库的情况下使用。


### 总结命令

#### 已提交但是没有push
```bash
# 已提交但是没有push
git reset --soft HEAD^ # 撤销提交
git reset --mixed HEAD^ # 撤销提交并保留修改也就是撤销commit add
```

#### 已提交并且已经push

```bash
git reset --hard HEAD^ # 撤销提交并删除修改 会丢掉所有的代码包括git commit的记录
git revert HEAD^ # 撤销提交并保留修改
```



