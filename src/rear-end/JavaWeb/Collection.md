---
title: 😤 Javaweb 收集
sticky: 98
tag:
  - SpringBoot
  - JavaWeb
recommend: 0
---



## 1. 配置

```properties
#环境变量
springprofiles.active = dev


#mysql

#驱动类名称
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#数据库连接的url
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis
#连接数据库的用户名
spring.datasource.username=root
#连接数据库的密码
spring.datasource.password=1234


#mybatis

#指定mybatis输出日志的位置, 输出控制台
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
# 开启 mybatis 的驼峰命名
mybatis.configuration.map-underscore-to-camel-case=true

#mybatis-plus



#配置单个文件最大上传大小
spring.servlet.multipart.max-file-size=10MB
#配置单个请求最大上传大小(一次请求可以上传多个文件)
spring.servlet.multipart.max-request-size=100MB
```



## 2. **lombok**

Lombok是一个实用的Java类库，可以通过简单的注解来简化和消除一些必须有但显得很臃肿的Java代码。

通过注解的形式自动生成构造器、getter/setter、equals、hashcode、toString等方法，并可以自动化生成日志变量，简化java开发、提高效率。

![image-20231117234702377](https://img.picgo.net/2023/11/17/image-202311172347023778abf09bb52abba08.png)

### **使用**

```xml
<!-- 在springboot的父工程中，已经集成了lombok并指定了版本号，故当前引入依赖
时不需要指定version -->
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
```

```java
import lombok.Data;
@Data
public class User {
  private Integer id;
  private String name;
  private Short age;
  private Short gender;
  private String phone;
}
```

## 2. MybatisX

MybatisX是一款基于IDEA的快速开发Mybatis的插件，为效率而生。

MybatisX的安装：

![image-20231118001330426](https://img.picgo.net/2023/11/18/image-2023111800133042623d964eef949c590.png)
