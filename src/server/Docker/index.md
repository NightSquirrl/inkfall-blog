---
title: Docker
---

## 	Linux 安装 docker CentOS

### 卸载旧版本

```shell
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

### 配置Docker的yum库

```shell
yum install -y yum-utils
```

安装成功后，执行命令，配置Docker的yum源：

```Bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### 安装 docker

```Bash
yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 启动和校验

```Bash
# 启动Docker
systemctl start docker

# 停止Docker
systemctl stop docker

# 重启
systemctl restart docker

# 设置开机自启
systemctl enable docker

# 执行docker ps命令，如果不报错，说明安装启动成功
docker ps
```

### 配置镜像加速

#### 注册阿里云账号

https://www.aliyun.com/

#### 开通镜像服务

在首页的产品中，找到阿里云的**容器镜像服务**

点击后进入控制台：

#### 配置镜像加速

找到**镜像工具**下的**镜像**加速器：

![4d97fa93-c21b-40f8-8c02-dff9903cc924](https://img.picgo.net/2023/11/22/4d97fa93-c21b-40f8-8c02-dff9903cc924c68d94394b3bc676.png)

```Bash
# 创建目录
mkdir -p /etc/docker

# 复制内容，注意把其中的镜像加速地址改成你自己的
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxx.mirror.aliyuncs.com"]
}
EOF

# 重新加载配置
systemctl daemon-reload

# 重启Docker
systemctl restart docker
```

## 快速入门

### 第一条命令

```PowerShell
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql
```

- `docker run -d` ：创建并运行一个容器，`-d`则是让容器以后台进程运行
- `--name mysql ` : 给容器起个名字叫`mysql`，你可以叫别的
- `-p 3306:3306` : 设置端口映射。
  - **容器是隔离环境**，外界不可访问。但是可以**将****宿主机****端口****映射容器内到端口**，当访问宿主机指定端口时，就是在访问容器内的端口了。
  - 容器内端口往往是由容器内的进程决定，例如MySQL进程默认端口是3306，因此容器内端口一定是3306；而宿主机端口则可以任意指定，一般与容器内保持一致。
  - 格式： `-p 宿主机端口:容器内端口`，示例中就是将宿主机的3306映射到容器内的3306端口
- `-e TZ=Asia/Shanghai` : 配置容器内进程运行时的一些参数
  - 格式：`-e KEY=VALUE`，KEY和VALUE都由容器内进程决定
  - 案例中，`TZ=Asia/Shanghai`是设置时区；`MYSQL_ROOT_PASSWORD=123`是设置MySQL默认密码
- `mysql` : 设置**镜像**名称，Docker会根据这个名字搜索并下载镜像
  - 格式：`REPOSITORY:TAG`，例如`mysql:8.0`，其中`REPOSITORY`可以理解为镜像名，`TAG`是版本号
  - 在未指定`TAG`的情况下，默认是最新版本，也就是`mysql:latest`

## 命令整理

| **命令**              | **说明**                         | **文档地址**                                                 |
| :-------------------- | :------------------------------- | :----------------------------------------------------------- |
| docker pull           | 拉取镜像                         | [docker pull](https://docs.docker.com/engine/reference/commandline/pull/) |
| docker push           | 推送镜像到DockerRegistry         | [docker push](https://docs.docker.com/engine/reference/commandline/push/) |
| docker images         | 查看本地镜像                     | [docker images](https://docs.docker.com/engine/reference/commandline/images/) |
| docker rmi            | 删除本地镜像                     | [docker rmi](https://docs.docker.com/engine/reference/commandline/rmi/) |
| docker run            | 创建并运行容器（不能重复创建）   | [docker run](https://docs.docker.com/engine/reference/commandline/run/) |
| docker stop           | 停止指定容器                     | [docker stop](https://docs.docker.com/engine/reference/commandline/stop/) |
| docker start          | 启动指定容器                     | [docker start](https://docs.docker.com/engine/reference/commandline/start/) |
| docker restart        | 重新启动容器                     | [docker restart](https://docs.docker.com/engine/reference/commandline/restart/) |
| docker rm             | 删除指定容器                     | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/rm/) |
| docker ps             | 查看容器                         | [docker ps](https://docs.docker.com/engine/reference/commandline/ps/) |
| docker ps -a          | 查看所有的容器包括已经停止的容器 |                                                              |
| docker logs           | 查看容器运行日志                 | [docker logs](https://docs.docker.com/engine/reference/commandline/logs/) |
| docker exec           | 进入容器                         | [docker exec](https://docs.docker.com/engine/reference/commandline/exec/) |
| docker save           | 保存镜像到本地压缩文件           | [docker save](https://docs.docker.com/engine/reference/commandline/save/) |
| docker load           | 加载本地压缩文件到镜像           | [docker load](https://docs.docker.com/engine/reference/commandline/load/) |
| docker inspect        | 查看容器详细信息                 | [docker inspect](https://docs.docker.com/engine/reference/commandline/inspect/) |
| --name                | 指定容器的名字                   |                                                              |
| -d                    | 后台运行                         |                                                              |
| -p                    | 端口映射                         |                                                              |
| -e                    | 设置容器环境变量查看官网配置     |                                                              |
| -it                   | 交互式进入容器                   |                                                              |
| bash                  |                                  |                                                              |
| docker volume create  | 创建数据卷                       | [docker volume create](https://docs.docker.com/engine/reference/commandline/volume_create/) |
| docker volume ls      | 查看所有数据卷                   | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_ls/) |
| docker volume rm      | 删除指定数据卷                   | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_prune/) |
| docker volume inspect | 查看某个数据卷的详情             | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_inspect/) |
| docker volume prune   | 清除数据卷                       | [docker volume prune](https://docs.docker.com/engine/reference/commandline/volume_prune/) |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |
|                       |                                  |                                                              |

### 格式化访问的命令

格式化方式访问，格式会更加清爽 

```bash
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"
```

### 数据卷

**数据卷（volume）**是一个虚拟目录，是**容器内目录**与**宿主机****目录**之间映射的桥梁。

以Nginx为例，我们知道Nginx中有两个关键的目录：

- `html`：放置一些静态资源
- `conf`：放置配置文件

如果我们要让Nginx代理我们的静态资源，最好是放到`html`目录；如果我们要修改Nginx的配置，最好是找到`conf`下的`nginx.conf`文件。

但遗憾的是，容器运行的Nginx所有的文件都在容器内部。所以我们必须利用数据卷将两个目录与宿主机目录关联，方便我们操作。如图：![whiteboard_exported_image](https://img.picgo.net/2023/11/22/whiteboard_exported_image385f09e5cfe86808.png)

#### 数据卷命令

| **命令**              | **说明**             | **文档地址**                                                 |
| :-------------------- | :------------------- | :----------------------------------------------------------- |
| docker volume create  | 创建数据卷           | [docker volume create](https://docs.docker.com/engine/reference/commandline/volume_create/) |
| docker volume ls      | 查看所有数据卷       | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_ls/) |
| docker volume rm      | 删除指定数据卷       | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_prune/) |
| docker volume inspect | 查看某个数据卷的详情 | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/volume_inspect/) |
| docker volume prune   | 清除数据卷           | [docker volume prune](https://docs.docker.com/engine/reference/commandline/volume_prune/) |

#### 案例

```bash
docker run -d --name nginx -p 80:80 -v html:/usr/share/ng
inx/html nginx

docker volume ls

docker volume inspect html
```



## DockerFile

### 常用指令

| **指令**       | **说明**                                     | **示例**                     |
| :------------- | :------------------------------------------- | :--------------------------- |
| **FROM**       | 指定基础镜像                                 | `FROM centos:6`              |
| **ENV**        | 设置环境变量，可在后面指令使用               | `ENV key value`              |
| **COPY**       | 拷贝本地文件到镜像的指定目录                 | `COPY ./xx.jar /tmp/app.jar` |
| **RUN**        | 执行Linux的shell命令，一般是安装过程的命令   | `RUN yum install gcc`        |
| **EXPOSE**     | 指定容器运行时监听的端口，是给镜像使用者看的 | EXPOSE 8080                  |
| **ENTRYPOINT** | 镜像中应用的启动命令，容器运行时调用         | ENTRYPOINT java -jar xx.jar  |

### 案例

```Dockerfile
# 基础镜像
FROM openjdk:11.0-jre-buster
# 设定时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 拷贝jar包
COPY docker-demo.jar /app.jar
# 入口
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### 构建镜像

```bash
docker build -t docker-demo:1.0 .
```

- `docker build `: 就是构建一个docker镜像
- `-t docker-demo:1.0` ：`-t`参数是指定镜像的名称（`repository`和`tag`）
- `.` : 最后的点是指构建时Dockerfile所在路径，由于我们进入了demo目录，所以指定的是`.`代表当前目录，也可以直接指定Dockerfile目录：

## 网络

| **命令**                  | **说明**                 | **文档地址**                                                 |
| :------------------------ | :----------------------- | :----------------------------------------------------------- |
| docker network create     | 创建一个网络             | [docker network create](https://docs.docker.com/engine/reference/commandline/network_create/) |
| docker network ls         | 查看所有网络             | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/network_ls/) |
| docker network rm         | 删除指定网络             | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/network_rm/) |
| docker network prune      | 清除未使用的网络         | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/network_prune/) |
| docker network connect    | 使指定容器连接加入某网络 | [docs.docker.com](https://docs.docker.com/engine/reference/commandline/network_connect/) |
| docker network disconnect | 使指定容器连接离开某网络 | [docker network disconnect](https://docs.docker.com/engine/reference/commandline/network_disconnect/) |
| docker network inspect    | 查看网络详细信息         | [docker network inspect](https://docs.docker.com/engine/reference/commandline/network_inspect/) |

```Bash
# 1.首先通过命令创建一个网络
docker network create hmall

# 2.然后查看网络
docker network ls
# 结果：
NETWORK ID     NAME      DRIVER    SCOPE
639bc44d0a87   bridge    bridge    local
403f16ec62a2   hmall     bridge    local
0dc0f72a0fbb   host      host      local
cd8d3e8df47b   none      null      local
# 其中，除了hmall以外，其它都是默认的网络

# 3.让dd和mysql都加入该网络，注意，在加入网络时可以通过--alias给容器起别名
# 这样该网络内的其它容器可以用别名互相访问！
# 3.1.mysql容器，指定别名为db，另外每一个容器都有一个别名是容器名
docker network connect hmall mysql --alias db
# 3.2.db容器，也就是我们的java项目
docker network connect hmall dd

# 4.进入dd容器，尝试利用别名访问db
# 4.1.进入容器
docker exec -it dd bash
# 4.2.用db别名访问
ping db
# 结果
PING db (172.18.0.2) 56(84) bytes of data.
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=1 ttl=64 time=0.070 ms
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=2 ttl=64 time=0.056 ms
# 4.3.用容器名访问
ping mysql
# 结果：
PING mysql (172.18.0.2) 56(84) bytes of data.
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=1 ttl=64 time=0.044 ms
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=2 ttl=64 time=0.054 ms
```