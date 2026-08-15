---
sticky: 96
title: 🧐 服务器的初始化使用
tag:
  - 服务器
top: 6
recommend: 1
---

## 连接命令

```shell
ssh root@ip
# 然后会让你输入密码
xxxxx  
# 成功进入
```

> 细节
>
> ​	如果此时你已经连接过了,然后你又重装了服务器的系统
>
> ​	当你再次连接的时候是无法连接上的
>
> ​	基本的错误如下

```shell
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:h5Yb3lGyD8c4tOpZQsw0hyq2bAELOG17aAczQ1CrTgc.
Please contact your system administrator.
Add correct host key in /Users/zeroeldath/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/zeroeldath/.ssh/known_hosts:3
Host key for 1.94.2.139 has changed and you have requested strict checking.
Host key verification failed.
```

> 解释:
>
> ​	这个警告消息表明指定IP地址（1.94.2.139）的主机密钥自上次保存在你的`known_hosts`文件之后已经更改。这可能是一个合法的变化，比如服务器的升级或配置更改.
>
> ​	当你第一次连接的时候,你的电脑会记录服务器的信息,但是当你重新安装系统之后信息发生了变化,导致本地认为不安全所以无法连接.
>
> 解决:
>
> ​	打开 /Users/zeroeldath/.ssh/known_hosts  该文件(将路径中 zeroeldath 替换为你的 mac 名称)
>
> ​	将与服务器相关的信息全部删除  本次案例为 1.94.2.139 (2023 年 11 月 11 日 03:30 华为云服务器)



> 上述连接的方式每次都需要输入密码而且不安全,可以使用暴力密码破解掉

## 2. SSH 秘钥连接

### 2.1 制作密钥对

```shell
[root@host ~]$ ssh-keygen  <== 建立密钥对
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): <== 按 Enter
Created directory '/root/.ssh'.
Enter passphrase (empty for no passphrase): <== 输入密钥锁码，或直接按 Enter 留空
Enter same passphrase again: <== 再输入一遍密钥锁码
Your identification has been saved in /root/.ssh/id_rsa. <== 私钥
Your public key has been saved in /root/.ssh/id_rsa.pub. <== 公钥
The key fingerprint is:
0f:d3:e7:1a:1c:bd:5c:03:f1:19:f1:22:df:9b:cc:08 root@host
```

### 2.2 在服务器上安装公钥

```shell
[root@host ~]$ cd .ssh
[root@host .ssh]$ cat id_rsa.pub >> authorized_keys
```

> 授权

```shell
[root@host .ssh]$ chmod 600 authorized_keys
[root@host .ssh]$ chmod 700 ~/.ssh
```

### 2.3. 设置 SSH，打开密钥登录功能

编辑 /etc/ssh/sshd_config 文件，进行如下设置： 

> 如果没有权限就修改 include 中的 conf

```shell
RSAAuthentication yes
PubkeyAuthentication yes
```

另外，请留意 root 用户能否通过 SSH 登录：

```shell
PermitRootLogin yes
```

当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：

```
PasswordAuthentication no
```

最后，重启 SSH 服务：

```shell
[root@host .ssh]$ service sshd restart
```

### 2.4 本地秘钥配置

#### 生成秘钥

- 基于`ED25519`算法，生成密钥对命令如下：

```shell
ssh-keygen -t ed25519 -C "<注释内容>"
```

- 基于RSA算法，生成密钥对命令如下：

```shell
ssh-keygen -t rsa -C "<注释内容>"
```

#### 复制

Windows（在WSL或Git Bash下）:

##### window

```shell
cat ~/.ssh/id_ed25519.pub | clip
```

##### mac

```shell
tr -d '\n' < ~/.ssh/id_ed25519.pub | pbcopy
```

##### GNU/Linux (requires xclip):

```shell
xclip -sel clip < ~/.ssh/id_ed25519.pub
```



### 2.5 上传自己的秘钥

> 将 2.5 复制的秘钥粘贴到 ~/.ssh/authorized_keys 服务器的文件夹中
