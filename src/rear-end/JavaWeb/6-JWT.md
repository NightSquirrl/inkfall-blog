---
title: 😤 6.JWT-springboot
tag:
  - SpringBoot
  - JavaWeb
  - JWT
recommend: 6
---

> 官网：**https://jwt.io/**



## 1. JWT

### 1. 1 介绍

- 定义了一种简洁的、自包含的格式，用于在通信双方以json数据格式安全的传输信息。由于数字签名的存在，这些信息是可靠的。

JWT的组成： （JWT令牌由三个部分组成，三个部分之间使用英文的点来分割）

- 第一部分：Header(头）， 记录令牌类型、签名算法等。 例如：
  - `{"alg":"HS256","type":"JWT"}`

- 第二部分：Payload(有效载荷），携带一些自定义信息、默认信息等。 例如：
  - `{"id":"1","username":"Tom"}`

- 第三部分：Signature(签名），防止Token被篡改、确保安全性。将header、payload，并加入指定秘钥，通过指定签名算法计算而来。

![image-20231118184734561](https://img.picgo.net/2023/11/18/image-202311181847345619c61d8746ce83a99.png)

> 签名的目的就是为了防jwt令牌被篡改，而正是因为jwt令牌最后一个部分数字签名的存在，所以整个jwt 令牌是非常安全可靠的。一旦jwt令牌当中任何一个部分、任何一个字符被篡改了，整个令牌在校验的时候都会失败，所以它是非常安全可靠的。
>
> 
>
> 其实在生成JWT令牌时，会对JSON格式的数据进行一次编码：进行base64编码Base64：是一种基于64个可打印的字符来表示二进制数据的编码方式。既然能编码，那也就意味着也能解码。所使用的64个字符分别是A到Z、a到z、 0- 9，一个加号，一个斜杠，加起来就是64个字符。任何数据经过base64编码之后，最终就会通过这64个字符来表示。当然还有一个符号，那就是等号。等号它是一个补位的符号需要注意的是Base64是编码方式，而不是加密方式。



在JWT登录认证的场景中我们发现，整个流程当中涉及到两步操作：

1. 在登录成功之后，要生成令牌。

2. 每一次请求当中，要接收令牌并对令牌进行校验。

### 1.2 使用

#### 1.2.1 依赖的引入

```xml
<!-- JWT依赖-->
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.9.1</version>
</dependency>
```

#### 1.2.2 JWT 工具类的封装

> 有限期的单位是毫秒

```java
public class JwtUtils {
  private static String signKey = "itheima";//签名密钥
  private static Long expire = 43200000L; //有效时间
  /**
* 生成JWT令牌
* @param claims JWT第二部分负载 payload 中存储的内容
* @return
*/
  public static String generateJwt(Map<String, Object> claims){
    String jwt = Jwts.builder()
      .addClaims(claims)//自定义信息（有效载荷）
      .signWith(SignatureAlgorithm.HS256, signKey)//签名算
      法（头部）
      .setExpiration(new Date(System.currentTimeMillis() +
                              expire))//过期时间
      .compact();
    return jwt;
  }
  /**
* 解析JWT令牌
* @param jwt JWT令牌
* @return JWT第二部分负载 payload 中存储的内容
*/
  public static Claims parseJWT(String jwt){
    Claims claims = Jwts.parser()
      .setSigningKey(signKey)//指定签名密钥
      .parseClaimsJws(jwt)//指定令牌Token
      .getBody();
    return claims;
  }
}
```

## 2. 过滤器 Filter

### 2.1 认识 Filter

Filter表示过滤器，是 JavaWeb三大组件(Servlet、Filter、Listener)之一。

过滤器可以把对资源的请求拦截下来，从而实现一些特殊的功能使用了过滤器之后，要想访问web服务器上的资源，必须先经过滤器，过滤器处理完毕之后，才可以访问对应的资源。

过滤器一般完成一些通用的操作，比如：登录校验、统一编码处理、敏感字符处理等。

![image-20231118185803051](https://img.picgo.net/2023/11/18/image-202311181858030518b8b3b5278320bd6.png)

### 2.2 定义过滤器

> 定义一个类,实现 Filter 的接口
>
> init方法：过滤器的初始化方法。在web服务器启动的时候会自动的创建Filter过滤器对象，在创建过滤器对象的时候会自动调用init初始化方法，这个方法只会被调用一次
>
> 
>
> doFilter方法：这个方法是在每一次拦截到请求之后都会被调用，所以这个方法是会被调用多次的，每拦截到一次请求就会调用一次doFilter()方法。
>
> 
>
> destroy方法： 是销毁的方法。当我们关闭服务器的时候，它会自动的调用销毁方法destroy，而这个销毁方法也只会被调用一次。
>
> 
>
> 在定义完Filter之后，Filter其实并不会生效，还需要完成Filter的配置，Filter的配置非常简单，只需要在Filter类上添加一个注解：@WebFilter，并指定属性urlPatterns，通过这个属性指定过滤器要拦截哪些请求
>
> 
>
> 当我们在Filter类上面加了@WebFilter注解之后，接下来我们还需要在启动类上面加上一个注@ServletComponentScan，通过这个@ServletComponentScan注解来开启SpringBoot项目对于Servlet组件的支持。

```java
@WebFilter(urlPatterns = "/*") //配置过滤器要拦截的请求路径（ /* 表示拦截浏览器的所有请求 ）
//定义一个类，实现一个标准的Filter过滤器的接口
public class DemoFilter implements Filter {
  @Override //初始化方法, 只调用一次
  public void init(FilterConfig filterConfig) throws
    ServletException {
    System.out.println("init 初始化方法执行了");
  }
  @Override //拦截到请求之后调用, 调用多次
  public void doFilter(ServletRequest request, ServletResponse
                       response, FilterChain chain) throws IOException, ServletException {
    System.out.println("Demo 拦截到了请求...放行前逻辑");
    //放行
    chain.doFilter(request,response);
  }
  @Override //销毁方法, 只调用一次
  public void destroy() {
    System.out.println("destroy 销毁方法执行了");
  }
}
```



在定义完Filter之后，Filter其实并不会生效，还需要完成Filter的配置，Filter的配置非常简单，只需要在Filter类上添加一个注解：@WebFilter，并指定属性urlPatterns，通过这个属性指定过滤器要拦截哪些请求



```java
@ServletComponentScan
@SpringBootApplication
public class TliasWebManagementApplication {
  public static void main(String[] args) {
    SpringApplication.run(TliasWebManagementApplication.class,
                          args);
  }
}
```

![image-20231118191823812](https://img.picgo.net/2023/11/18/image-20231118191823812f7fc0a12868f6739.png)

#### 放行代码

```java
@Override
public void doFilter(ServletRequest servletRequest,
                     ServletResponse servletResponse, FilterChain filterChain) throws
  IOException, ServletException {
  System.out.println("DemoFilter 放行前逻辑.....");
  //放行请求
  filterChain.doFilter(servletRequest,servletResponse);
  System.out.println("DemoFilter 放行后逻辑.....");
}
```

### 2.3  **过滤器链**

比如：在我们web服务器当中，定义了两个过滤器，这两个过滤器就形成了一个过滤器链。而这个链上的过滤器在执行的时候会一个一个的执行，会先执行第一个Filter，放行之后再来执行第二个Filter，如果执行到了最后一个过滤器放行之后，才会访问对应的web资源。访问完web资源之后，按照我们刚才所介绍的过滤器的执行流程，还会回到过滤器当中来执行过滤器放行后的逻辑，而在执行放行后的逻辑的时候，顺序是反着的。先要执行过滤器2放行之后的逻辑，再来执行过滤器1放行之后的逻辑，最后在给浏览器响应数据。

> 其实是和过滤器的类名有关系。以注解方式配置的Filter过滤器，它的执行优先级是按时过滤器类名的自动排序确定的，类名排名越靠前，优先级越高。

## 3. **拦截器**Interceptor

### 3.1 认识拦截器

什么是拦截器？

- 是一种动态拦截方法调用的机制，类似于过滤器。

- 拦截器是Spring框架中提供的，用来动态拦截控制器方法的执行。

拦截器的作用：

- 拦截请求，在指定方法调用前后，根据业务需要执行预先设定代码

### 3.2 使用拦截器

下面我们通过快速入门程序，来学习下拦截器的基本使用。拦截器的使用步骤和过滤器类似，也分为两步：

1. 定义拦截器

2. 注册配置拦截器

#### 3.2.1 定义拦截器

```java
//自定义拦截器
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
  //目标资源方法执行前执行。 返回true：放行 返回false：不放行
  @Override
  public boolean preHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler) throws Exception {
    System.out.println("preHandle .... ");
    return true; //true表示放行
  }
  //目标资源方法执行后执行
  @Override
  public void postHandle(HttpServletRequest request,
                         HttpServletResponse response, Object handler, ModelAndView
                         modelAndView) throws Exception {
    System.out.println("postHandle ... ");
  }
  //视图渲染完毕后执行，最后执行
  @Override
  public void afterCompletion(HttpServletRequest request,
                              HttpServletResponse response, Object handler, Exception ex) throws
    Exception {
    System.out.println("afterCompletion .... ");
  }
}
```

> 注意：
>
> preHandle方法：目标资源方法执行前执行。 返回true：放行 返回false：不放行
>
> postHandle方法：目标资源方法执行后执行
>
> afterCompletion方法：视图渲染完毕后执行，最后执行

#### 3.2.2 **注册配置拦截器**

实现WebMvcConfigurer接口，并重写addInterceptors方法

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
  //自定义的拦截器对象
  @Autowired
  private LoginCheckInterceptor loginCheckInterceptor;
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    //注册自定义拦截器对象
    registry.addInterceptor(loginCheckInterceptor).addPathPatterns("/**
                                                                   ");//设置拦截器拦截的请求路径（ /** 表示拦截所有请求）
                                                                   }
                                                                   }
```

### 3.3 **Interceptor**详解

1. 拦截器的拦截路径配置

2. 拦截器的执行流程

#### 3.3.1拦截路径

首先我们先来看拦截器的拦截路径的配置，在注册配置拦截器的时候，我们要指定拦截器的拦截路径，通过 addPathPatterns("要拦截路径") 方法，就可以指定要拦截哪些资源。在入门程序中我们配置的是 /** ，表示拦截所有资源，而在配置拦截器时，<span style='color:red'>不仅可以指定要拦截哪些资源，还可以指定不拦截哪些资源，</span>只需要调用 excludePathPatterns("不拦截路径") 方法，指定哪些资源不需要拦截。

```java
registry.addInterceptor(loginCheckInterceptor)
  .addPathPatterns("/**")//设置拦截器拦截的请求路径（ /**
  表示拦截所有请求）
  .excludePathPatterns("/login");//设置不拦截的请求路径
```

![image-20231118200722219](https://img.picgo.net/2023/11/18/image-20231118200722219c90ed48c316a8d1f.png)

#### 3.3.2 **执行流程**

![image-20231118200824612](https://img.picgo.net/2023/11/18/image-20231118200824612acc9742ef77fc4e4.png)

- 当我们打开浏览器来访问部署在web服务器当中的web应用时，此时我们所定义的过滤器会拦截到这次请求。拦截到这次请求之后，它会先执行放行前的逻辑，然后再执行放行操作。而由于我们当前是基于springboot开发的，所以放行之后是进入到了spring的环境当中，也就是要来访问我们所定义的controller当中的接口方法。

- Tomcat并不识别所编写的Controller程序，但是它识别Servlet程序，所以在Spring的Web环境中提供了一个非常核心的Servlet：DispatcherServlet（前端控制器），所有请求都会先进行到DispatcherServlet，再将请求转给Controller。

- 当我们定义了拦截器后，会在执行Controller的方法之前，请求被拦截器拦截住。执行preHandle() 方法，这个方法执行完成后需要返回一个布尔类型的值，如果返回true，就表示放行本次操作，才会继续访问controller中的方法；如果返回false，则不会放行（controller中的方法也不会执行）。

- 在controller当中的方法执行完毕之后，再回过来执行 postHandle() 这个方法以及afterCompletion() 方法，然后再返回给DispatcherServlet，最终再来执行过滤器当中放行后的这一部分逻辑的逻辑。执行完毕之后，最终给浏览器响应数据。

## 4. 异常处理-全局的异常拦截

我们该怎么样定义全局异常处理器？

- 定义全局异常处理器非常简单，就是定义一个类，在类上加上一个注解@RestControllerAdvice，加上这个注解就代表我们定义了一个全局异常处理器。

- 在全局异常处理器当中，需要定义一个方法来捕获异常，在这个方法上需要加上注解@ExceptionHandler。通过@ExceptionHandler注解当中的value属性来指定我们要捕获的是哪一类型的异常

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  //处理异常
  @ExceptionHandler(Exception.class) //指定能够处理的异常类型
  public Result ex(Exception e){
    e.printStackTrace();//打印堆栈中的异常信息
    //捕获到异常之后，响应一个标准的Result
    return Result.error("对不起,操作失败,请联系管理员");
  }
}
```

> @RestControllerAdvice = @ControllerAdvice + @ResponseBody
>
> 处理异常的方法返回值会转换为json后再响应给前端
