---
title: 🪤 NGINX 使用教程
tag:
  - NGINX
  - 封装
---
![NGINX](https://www.nginx.com/wp-content/uploads/2021/08/NGINX-Part-of-F5-horiz-black-type-1.svg)

# NGINX

## 下载安装
移centos 为例
1. 更新系统软件包列表：
```shell
yum update
```
2. 安装NGINX软件包：
```shell
yum install nginx
```
3. 启动NGINX服务：
```shell
systemctl start nginx
```
4. 配置NGINX服务开机自启动：
```shell
systemctl enable nginx
```
5. 验证NGINX服务是否启动成功：
```shell
systemctl status nginx
```
6. 配置防火墙，允许HTTP和HTTPS流量：
```shell
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```
7. 配置SELinux，允许NGINX服务网络连接：
```shell
setsebool -P httpd_can_network_connect 1
```
## 常见配置用例
```shell
# React app configuration
server {
    listen 80;
    server_name example.com;  # 设置为您的域名或服务器IP

    # 配置静态资源请求
    location / {
        root /var/www/html;  # 指向React应用的目录
        try_files $uri /index.html; # 重点 适用于单页面应用,简单的意思是找到对应的返回值之后,不再继续往下找,直接返回
    }

    # 配置后端API请求
    location /api/ {
        proxy_pass http://localhost:8000;  # 后端API的地址和端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 可选配置，用于处理WebSocket连接
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

这个配置将监听80端口，并配置了两个 `location` 块：

- 第一个 `location /` 块用于处理React应用的静态资源请求。如果NGINX找不到对应的文件，则返回主页 `index.html`，以保证单页面应用的正常工作。
- 第二个 `location /api/` 块用于向后端API发送请求，反向代理到本地的 `http://localhost:8000`。通过这个配置，可以将React前端与后端API整合在一起。

## NGINX 配置文件实例

```shell
#定义 nginx 运行的用户和用户组
user www www;

#nginx 进程数，建议设置为等于 CPU 总核心数。
worker_processes 8;

#nginx 默认没有开启利用多核 CPU, 通过增加 worker_cpu_affinity 配置参数来充分利用多核 CPU 以下是 8 核的配置参数
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;

#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
error_log /var/log/nginx/error.log info;

#进程文件
pid /var/run/nginx.pid;

#一个 nginx 进程打开的最多文件描述符数目，理论值应该是最多打开文件数（系统的值 ulimit -n）与 nginx 进程数相除，但是 nginx 分配请求并不均匀，所以建议与 ulimit -n 的值保持一致。
worker_rlimit_nofile 65535;

#工作模式与连接数上限
events
{
    #参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll 模型是 Linux 2.6 以上版本内核中的高性能网络 I/O 模型，如果跑在 FreeBSD 上面，就用 kqueue 模型。
    #epoll 是多路复用 IO(I/O Multiplexing) 中的一种方式，但是仅用于 linux2.6 以上内核，可以大大提高 nginx 的性能
    use epoll;

    ############################################################################
    #单个后台 worker process 进程的最大并发链接数
    #事件模块指令，定义 nginx 每个进程最大连接数，默认 1024。最大客户连接数由 worker_processes 和 worker_connections 决定
    #即 max_client=worker_processes*worker_connections, 在作为反向代理时：max_client=worker_processes*worker_connections / 4
    worker_connections 65535;
    ############################################################################
}

#设定 http 服务器
http {
    include mime.types; #文件扩展名与文件类型映射表
    default_type application/octet-stream; #默认文件类型
    #charset utf-8; #默认编码

    server_names_hash_bucket_size 128; #服务器名字的 hash 表大小
    client_header_buffer_size 32k; #上传文件大小限制
    large_client_header_buffers 4 64k; #设定请求缓
    client_max_body_size 8m; #设定请求缓
    sendfile on; #开启高效文件传输模式，sendfile 指令指定 nginx 是否调用 sendfile 函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘 IO 重负载应用，可设置为 off，以平衡磁盘与网络 I/O 处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成 off。
    autoindex on; #开启目录列表访问，合适下载服务器，默认关闭。
    tcp_nopush on; #防止网络阻塞
    tcp_nodelay on; #防止网络阻塞

    ##连接客户端超时时间各种参数设置##
    keepalive_timeout  120;          #单位是秒，客户端连接时时间，超时之后服务器端自动关闭该连接 如果 nginx 守护进程在这个等待的时间里，一直没有收到浏览发过来 http 请求，则关闭这个 http 连接
    client_header_timeout 10;        #客户端请求头的超时时间
    client_body_timeout 10;          #客户端请求主体超时时间
    reset_timedout_connection on;    #告诉 nginx 关闭不响应的客户端连接。这将会释放那个客户端所占有的内存空间
    send_timeout 10;                 #客户端响应超时时间，在两次客户端读取操作之间。如果在这段时间内，客户端没有读取任何数据，nginx 就会关闭连接
    ################################

    #FastCGI 相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;

    ###作为代理缓存服务器设置#######
    ###先写到 temp 再移动到 cache
    #proxy_cache_path /var/tmp/nginx/proxy_cache levels=1:2 keys_zone=cache_one:512m inactive=10m max_size=64m;
    ###以上 proxy_temp 和 proxy_cache 需要在同一个分区中
    ###levels=1:2 表示缓存级别，表示缓存目录的第一级目录是 1 个字符，第二级目录是 2 个字符 keys_zone=cache_one:128m 缓存空间起名为 cache_one 大小为 512m
    ###max_size=64m 表示单个文件超过 128m 就不缓存了  inactive=10m 表示缓存的数据，10 分钟内没有被访问过就删除
    #########end####################

    #####对传输文件压缩###########
    #gzip 模块设置
    gzip on; #开启 gzip 压缩输出
    gzip_min_length 1k; #最小压缩文件大小
    gzip_buffers 4 16k; #压缩缓冲区
    gzip_http_version 1.0; #压缩版本（默认 1.1，前端如果是 squid2.5 请使用 1.0）
    gzip_comp_level 2; #压缩等级，gzip 压缩比，1 为最小，处理最快；9 为压缩比最大，处理最慢，传输速度最快，也最消耗 CPU；
    gzip_types text/plain application/x-javascript text/css application/xml;
    #压缩类型，默认就已经包含 text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个 warn。
    gzip_vary on;
    ##############################

    #limit_zone crawler $binary_remote_addr 10m; #开启限制 IP 连接数的时候需要使用

    upstream blog.ha97.com {
        #upstream 的负载均衡，weight 是权重，可以根据机器配置定义权重。weigth 参数表示权值，权值越高被分配到的几率越大。
        server 192.168.80.121:80 weight=3;
        server 192.168.80.122:80 weight=2;
        server 192.168.80.123:80 weight=3;
    }

    #虚拟主机的配置
    server {
        #监听端口
        listen 80;

        #############https##################
        #listen 443 ssl;
        #ssl_certificate /opt/https/xxxxxx.crt;
        #ssl_certificate_key /opt/https/xxxxxx.key;
        #ssl_protocols SSLv3 TLSv1;
        #ssl_ciphers HIGH:!ADH:!EXPORT57:RC4+RSA:+MEDIUM;
        #ssl_prefer_server_ciphers on;
        #ssl_session_cache shared:SSL:2m;
        #ssl_session_timeout 5m;
        ####################################end

        #域名可以有多个，用空格隔开
        server_name www.ha97.com ha97.com;
        index index.html index.htm index.php;
        root /data/www/ha97;
        location ~ .*.(php|php5)?$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi.conf;
        }

        #图片缓存时间设置
        location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$ {
            expires 10d;
        }

        #JS 和 CSS 缓存时间设置
        location ~ .*.(js|css)?$ {
            expires 1h;
        }

        #日志格式设定
        log_format access '$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" $http_x_forwarded_for';

        #定义本虚拟主机的访问日志
        access_log /var/log/nginx/ha97access.log access;

        #对 "/" 启用反向代理
        location / {
            proxy_pass http://127.0.0.1:88;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            #后端的 Web 服务器可以通过 X-Forwarded-For 获取用户真实 IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            #以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;
            client_max_body_size 10m; #允许客户端请求的最大单文件字节数
            client_body_buffer_size 128k; #缓冲区代理缓冲用户端请求的最大字节数，

            ##代理设置 以下设置是 nginx 和后端服务器之间通讯的设置##
            proxy_connect_timeout 90; #nginx 跟后端服务器连接超时时间（代理连接超时）
            proxy_send_timeout 90; #后端服务器数据回传时间（代理发送超时）
            proxy_read_timeout 90; #连接成功后，后端服务器响应时间（代理接收超时）
            proxy_buffering on;    #该指令开启从后端被代理服务器的响应内容缓冲 此参数开启后 proxy_buffers 和 proxy_busy_buffers_size 参数才会起作用
            proxy_buffer_size 4k;  #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k;   #proxy_buffers 缓冲区，网页平均在 32k 以下的设置
            proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）
            proxy_max_temp_file_size 2048m; #默认 1024m, 该指令用于设置当网页内容大于 proxy_buffers 时，临时文件大小的最大值。如果文件大于这个值，它将从 upstream 服务器同步地传递请求，而不是缓冲到磁盘
            proxy_temp_file_write_size 512k; 这是当被代理服务器的响应过大时 nginx 一次性写入临时文件的数据量。
            proxy_temp_path  /var/tmp/nginx/proxy_temp;    ##定义缓冲存储目录，之前必须要先手动创建此目录
            proxy_headers_hash_max_size 51200;
            proxy_headers_hash_bucket_size 6400;
            #######################################################
        }

        #设定查看 nginx 状态的地址
        location /nginxStatus {
            stub_status on;
            access_log on;
            auth_basic "nginxStatus";
            auth_basic_user_file conf/htpasswd;
            #htpasswd 文件的内容可以用 apache 提供的 htpasswd 工具来产生。
        }

        #本地动静分离反向代理配置
        #所有 jsp 的页面均交由 tomcat 或 resin 处理
        location ~ .(jsp|jspx|do)?$ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:8080;
        }

        #所有静态文件由 nginx 直接读取不经过 tomcat 或 resin
        location ~ .*.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$
        { expires 15d; }

        location ~ .*.(js|css)?$
        { expires 1h; }
    }
}

```

