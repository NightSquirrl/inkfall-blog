---
sticky: 98
title: 🧐 1. MySql 的安装
tag:
  - Java
top: 4
recommend: 1
---

## 1. MacOS 版本的安装

### 1.1 下载地址

> 选择对应的版本下载即可

[MacOS 下载地址](https://dev.mysql.com/downloads/mysql/)

### 1.2 解决无法启动MySQL问题

1. 打开设置中的mysql图标，发现红点，点击"Start MySQL Server"后，变绿后秒变红，无法启动。
2. ![image-20231111030503079](/Users/zeroeldath/Library/Application Support/typora-user-images/image-20231111030503079.png)

2. 进入configuration，找到Error log的位置，尝试打开。

4. 报错：无法打开data文件夹，权限不够。重新授权：

```shell
sudo chown -R mysql /usr/local/mysql/data
```

5. 打开error文件，报错为：`Could not create unix socket lock file /usr/local/mysql/mysql.sock.lock.`

```shell
mkdir -p /usr/local/mysql/ 
```

6. 然后可以设置目录权限

```shell
sudo chown -R mysql:mysql /usr/local/mysql/
```

### 1.3配置MySQL环境变量

如果需要在终端里面输入Mysql命令，那么就需要进行如下的配置。

1. 打开文件：`open ~/.bash_profile`
2. 加入语句：`PATH=$PATH:/usr/local/mysql/bin`
3. 使配置的语句生效：`source ~/.bash_profile`
4. 如果配置成功，那么输入命令：`mysql -uroot -p` 输入密码后成功登录



## 2. Window 版本的安装

[下载地址](https://dev.mysql.com/downloads/mysql/)

> 此处以下载压缩版本为例

### 配置环境变量

将加压之后的文件 bin 目录的路径添加到 path 环境变量中

### 配置 my.ini

在加压的根目录中新建文件夹 my.ini

```ini
[mysqld]
; 设置3306端口
port=3306
; 设置mysql的安装目录
basedir=C:\\gl\\SQL\\mysql-8.0.18-winx64
; 设置mysql数据库的数据的存放目录
datadir=C:\\gl\\SQL\\mysql-data
; 允许最大连接数
max_connections=200
; 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
; 服务端使用的字符集默认为UTF8
character-set-server=utf8
; 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
; 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
; 设置mysql客户端默认字符集
default-character-set=utf8
[client]
; 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8

```

> 注意：basedir 和 datadir 要改成你自己的目录。
>
> ==陷阱:==
>
> `default_authentication_plugin=mysql_native_password` 这一句必须要加上，否则可能导致 root 的初始密码无法登陆。

### 初始化数据库

**以管理员身份** 运行 **cmd**，切换至安装目录的 **bin** 目录下，输入如下命令：

```bash
mysqld --initialize --console

```

默认的服务名就是 `mysql`，也可以指定服务名

```bash
mysqld --initialize --console 服务名

```

==执行成功后，会显示 `root` 的初始密码，如下图，这个密码需要保存下来。==

!!!!!

### 安装服务

```bash
mysqld -install

```

### 启动服务

```bash
net start mysql

```

### 登录数据库

```bash
mysql -u root -p
```

### 修改密码

执行以下语句，即可将密码改为 **root**。

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

```

