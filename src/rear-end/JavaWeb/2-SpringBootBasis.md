---
title: 😤 2.SpringBoot基础
tag:
  - SpringBoot
  - JavaWeb
recommend: 2
---

> 😉网站
>
> Spring官网:https://spring.io

![Image From day04-SpringBootWeb入门](https://img.picgo.net/2023/11/17/Image-From-day04-SpringBootWeb3f4d3174641f5cbc.png)

Spring发展到今天已经形成了一种开发生态圈，Spring提供了若干个子项目，每个项目用于完成特定的功能。而我们在项目开发时，一般会偏向于选择这一套spring家族的技术，来解决对应领域的问题，那我们称这一套技术为**spring**全家桶。而Spring家族旗下这么多的技术，最基础、最核心的是 SpringFramework。其他的spring家族的技术，都是基于SpringFramework的，SpringFramework中提供很多实用功能，如：依赖注入、事务管理、web开发支持、数据访问、消息服务等等。

![image-20231117212758464](https://img.picgo.net/2023/11/17/image-202311172127584643b1b3e40a83d1a98.png)

而如果我们在项目中，直接基于SpringFramework进行开发，存在两个问题：配置繁琐、入门难度大。

![image-20231117212820022](https://img.picgo.net/2023/11/17/image-20231117212820022c674935f190c643e.png)

所以基于此呢，spring官方推荐我们从另外一个项目开始学习，那就是目前最火爆的SpringBoot。通过springboot就可以快速的帮我们构建应用程序，所以springboot呢，最大的特点有两个 ：

- 简化配置

- 快速开发

**Spring Boot** **可以帮助我们非常快速的构建应用程序、简化开发、提高效率 。**

## 1. **SpringBootWeb**快速入门

创建SpringBoot工程项目

基于Spring官方骨架，创建SpringBoot工程。

![image-20231117212959823](https://img.picgo.net/2023/11/17/image-20231117212959823d3b58f69f155ac42.png)

![image-20231117213021151](https://img.picgo.net/2023/11/17/image-202311172130211518028b4d4be3bbaad.png)

1. 在com.itheima这个包下创建一个子包controller

![image-20231117213122375](https://img.picgo.net/2023/11/17/image-202311172131223753d62e05775aea042.png)

```java
package com.itheima.controller;
import org.springframework.web.bind.annotation.*;
@RestController
public class HelloController {
  @RequestMapping("/hello") 
  public String hello(){
    System.out.println("Hello World ~");
    return "Hello World ~";
  }
}
```



> 运行测试



![image-20231117213230149](https://img.picgo.net/2023/11/17/image-20231117213230149fef10713f9eaa96f.png)

打开浏览器，输入` http://localhost:8080/hello`

## 2. HTTP 协议

### 2.1 概述

#### 2.1.1 介绍

![image-20231117213424103](https://img.picgo.net/2023/11/17/image-202311172134241031e4e0d3d28e5a222.png)

HTTP：Hyper Text Transfer Protocol(超文本传输协议)，规定了浏览器与服务器之间数据传输

的规则。

- http是互联网上应用最为广泛的一种网络协议

- http协议要求：浏览器在向服务器发送请求数据时，或是服务器在向浏览器发送响应数据时，都必须按照固定的格式进行数据传输

如果想知道http协议的数据传输格式有哪些，可以打开浏览器，点击 F12 打开开发者工具，点击Network 来查看

浏览器向服务器进行请求时：

- 服务器按照固定的格式进行解析

![image-20231117215625548](https://img.picgo.net/2023/11/17/image-2023111721562554808bc9a29523e86e0.png)

服务器向浏览器进行响应时：

- 浏览器按照固定的格式进行解析

![image-20231117215650516](https://img.picgo.net/2023/11/17/image-20231117215650516974ece2246a67f52.png)

#### 2.1.2 特点

- **基于**TCP**协议**: 面向连接，安全

- > TCP是一种面向连接的(建立连接之前是需要经过三次握手)、可靠的、基于字节流的传输层
  >
  > 通信协议，在数据传输方面更安全

- **基于请求响应模型**: 一次请求对应一次响应（先请求后响应）

> 请求和响应是一一对应关系，没有请求，就没有响应

- **HTTP**协议是无状态协议**:** 对于数据没有记忆能力。每次请求-响应都是独立的

> 无状态指的是客户端发送HTTP请求给服务端之后，服务端根据请求响应数据，响应完后，不会记录任何信息。
>
> - 缺点: 多次请求间不能共享数据
>
> - 优点: 速度快
>
> 请求之间无法共享数据会引发的问题：
>
> - 如：京东购物。加入购物车和去购物车结算是两次请求
> - 由于HTTP协议的无状态特性，加入购物车请求响应结束后，并未记录加入购物车是何商品
>
> - 发起去购物车结算的请求后，因为无法获取哪些商品加入了购物车，会导致此次请求无法正确展示数据
>
> 具体使用的时候，我们发现京东是可以正常展示数据的，原因是Java早已考虑到这个问题，并提出了使用会话技术(Cookie、Session)来解决这个问题。具体如何来做，我们后面课程中会讲到。

### 2.2 **HTTP-**请求协议

浏览器和服务器是按照HTTP协议进行数据通信的。

HTTP协议又分为：请求协议和响应协议 

- 请求协议：浏览器将数据以请求格式发送到服务器
  - 包括：**请求行**、**请求头** 、请求体
- 响应协议：服务器将数据以响应格式返回给浏览
  - 包括：**响应行** 、**响应头** 、**响应体**

在HTTP1.1版本中，浏览器访问服务器的几种方式： 

![image-20231117220120197](https://img.picgo.net/2023/11/17/image-20231117220120197f68d499493fe6885.png)

在我们实际应用中常用的也就是 ：**GET**  POST

#### **GET**方式的请求协议：

![image-20231117220400200](https://img.picgo.net/2023/11/17/image-20231117220400200836d346bde7fafdc.png)

- 请求行 ：HTTP请求中的第一行数据。由： 请求方式 、 资源路径 、 协议/版本 组成（之间使用空格分隔）

  - 请求方式：GET 
  - 资源路径：/brand/findAll?name=OPPO&status=1
    - 请求路径：/brand/findAll
    - 请求参数：name=OPPO&status=1
      - 请求参数是以key=value形式出现
      - 多个请求参数之间使用 & 连接
    - 请求路径和请求参数之间使用 ? 连接
  - 协议/版本：HTTP/1.1 

- 请求头 ：第二行开始，上图黄色部分内容就是请求头。格式为key: value形式

  - http是个无状态的协议，所以在请求头设置浏览器的一些自身信息和想要响应的形式。这样服务器在收到信息后，就可以知道是谁，想干什么了

  常见的HTTP请求头有

```tex
Host: 表示请求的主机名
User-Agent: 浏览器版本。 例如：Chrome浏览器的标识类似Mozilla/5.0
...Chrome/79 ，IE浏览器的标识类似Mozilla/5.0 (Windows NT ...)like
Gecko
Accept：表示浏览器能接收的资源类型，如text/*，image/*或者*/*表示所有；
Accept-Language：表示浏览器偏好的语言，服务器可以据此返回不同语言的网
页；
Accept-Encoding：表示浏览器可以支持的压缩类型，例如gzip, deflate等。
Content-Type：请求主体的数据类型
Content-Length：数据主体的大小（单位：字节）
```

> 举例说明：服务端可以根据请求头中的内容来获取客户端的相关信息，有了这些信息服务端就可以处理不同的业务需求。
>
> 比如:
>
> - 不同浏览器解析HTML和CSS标签的结果会有不一致，所以就会导致相同的代码在不同的浏览器会出现不同的效果
>
> - 服务端根据客户端请求头中的数据获取到客户端的浏览器类型，就可以根据不同的浏览器设置不同的代码来达到一致的效果（这就是我们常说的浏览器兼容问题）

- 请求体 ：存储请求参数
  - GET请求的请求参数在请求行中，故不需要设置请求体

#### **POST**方式的请求协议：

![image-20231117221056297](https://img.picgo.net/2023/11/17/image-2023111722105629766ba2f32d8b14afe.png)

- 请求行(以上图中红色部分)：包含请求方式、资源路径、协议/版本
  - 请求方式：POST
  - 资源路径：/brand
  - 协议/版本：HTTP/1.1

- 请求头(以上图中黄色部分) 

- 请求体(以上图中绿色部分) ：存储请求参数
  - 请求体和请求头之间是有一个空行隔开（作用：用于标记请求头结束）

#### GET请求和POST请求的区别：

![image-20231117221156320](https://img.picgo.net/2023/11/17/image-20231117221156320f725453c8dde2cea.png)

### 2.3 **HTTP-**响应协议

#### **2.3.1** **格式介绍**

与HTTP的请求一样，HTTP响应的数据也分为3部分：**响应行**、**响应头** 、**响应体**

![image-20231117221403107](https://img.picgo.net/2023/11/17/image-20231117221403107669d3376698d65df.png)

- 响应行(以上图中红色部分)：响应数据的第一行。响应行由 协议及版本 、 响应状态码 、 状态码描述 组成

  - 协议/版本：HTTP/1.1

  - 响应状态码：200

  - 状态码描述：OK

- 响应头(以上图中黄色部分)：响应数据的第二行开始。格式为key：value形式

- http是个无状态的协议，所以可以在请求头和响应头中设置一些信息和想要执行的动作，这样，对方在收到信息后，就可以知道你是谁，你想干什么

常见的HTTP响应头有:

> Content-Type：表示该响应内容的类型，例如text/html，image/jpeg ；
>
> Content-Length：表示该响应内容的长度（字节数）；
>
> Content-Encoding：表示该响应压缩算法，例如gzip ；
>
> Cache-Control：指示客户端应如何缓存，例如max-age=300表示可以最多缓存
>
> 300秒 ;
>
> Set-Cookie: 告诉浏览器为当前页面所在的域设置cookie ;

- 响应体(以上图中绿色部分)： 响应数据的最后一部分。存储响应的数据
  - 响应体和响应头之间有一个空行隔开（作用：用于标记响应头结束）

#### **2.3.2** **响应状态码**

![](https://img.picgo.net/2023/11/17/image-202311172215325245cdefa15be83561d.png)

关于响应状态码，我们先主要认识三个状态码，其余的等后期用到了再去掌握：

- 200 ok 客户端请求成功

- 404 Not Found 请求资源不存在

- 500 Internal Server Error 服务端发生不可预期的错误





















































































































































































































































































































































































