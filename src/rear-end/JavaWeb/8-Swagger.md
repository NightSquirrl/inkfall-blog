---
title: 😤 8. Swagger的使用
tag:
  - SpringBoot
  - JavaWeb
  - Swagger
recommend: 8
---

## 快速入门的使用

> 文档的地址是service 根路径 swagger-ui.html

### 依赖的引入

```xml
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.9.2</version>
</dependency>
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>2.9.2</version>
</dependency>
```

### Java配置

> 新建文件 config.SwaggerConfig

```java
package com.whattools.usercenter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
  @Bean
  public Docket docket() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.whattools.usercenter.controller"))
      .paths(PathSelectors.any())
      .build().apiInfo(new ApiInfoBuilder().title("用户中心API文档").version("1.0").build());

  }
}

```

> [@Configuration](https://github.com/Configuration)是告诉Spring Boot需要加载这个配置类；
>
> [@EnableSwagger2](https://github.com/EnableSwagger2)是启用Swagger2.

### 高级配置

1. 通过在**控制器类**上添加`@Api`注解，可以给控制器增加描述和标签信息。

```java
@Api(tags = "用户相关接口", description = "提供用户相关的 Rest API")
public class UserController
```

2. 通过在接口方法上添加@ApiOperation注解来展开对接口的描述，当然这个注解还可以指定很多内容，在下面的相关注解说明章节详细说明

```java
@ApiOperation("新增用户接口")
@PostMapping("/add")
public boolean addUser(@RequestBody User user) {
  return false;
}
```

3. 通过在**实体类**上添加[@ApiModel](https://github.com/ApiModel)和[@ApiModelProperty](https://github.com/ApiModelProperty)注解来对我们的API所涉及到的对象做描述。
   1. 也可以用来设置默认值(是文档中的默认值,不是程序执行时候的默认值)

```java
@ApiModel("用户实体")
public class User {
  @ApiModelProperty(value = "密码",required = true,example = "12345678")
  private int id;
}
```

4. 文档信息配置，Swagger还支持设置一些文档的版本号、联系人邮箱、网站、版权、开源协议等等信息，但与上面几条不同的是这些信息不能通过注解配置，而是通过创建一个ApiInfo对象，并且使用appInfo()方法来设置，我们在SwaggerConfig.java类中新增如下内容即可:

```java
@Bean
public Docket api() {
  return new Docket(DocumentationType.SWAGGER_2)
    .select()
    .apis(RequestHandlerSelectors.any())
    .paths(PathSelectors.any())
    .build()
    .apiInfo(apiInfo());
}
private ApiInfo apiInfo() {
  return new ApiInfo(
    "Spring Boot 项目集成 Swagger 实例文档",
    "我的博客网站：https://itweknow.cn，欢迎大家访问。",
    "API V1.0",
    "Terms of service",
    new Contact("名字想好没", "https://itweknow.cn",              "gancy.programmer@gmail.com"),
    "Apache", "http://www.apache.org/", Collections.emptyList());
}
```

### 报错

> 主要问题是 springboot 的版本和 swagger 的版本不兼容导致的
> 这是因为Springfox使用的路径匹配是基于AntPathMatcher的，而Spring Boot 2.6.X使用的是PathPatternMatcher。

```yaml
spring:
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```

