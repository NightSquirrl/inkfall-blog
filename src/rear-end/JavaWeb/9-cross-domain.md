---
title:  9.跨域解决
tag:
  - SpringBoot
  - JavaWeb
recommend: 9
---

## NGINX 配置

> 让服务器告诉浏览器：允许跨域（返回 cross-origin-allow 响应头）

```nginx
location ^~ /api/ {
    proxy_pass http://127.0.0.1:8080/api/;
    add_header 'Access-Control-Allow-Origin' $http_origin;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Origin' $http_origin;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }
}
```

## 后端@CrossOrigin 配置



在 controller 中添加注释@CrossOrigin(origin={"xxxx"},allowCredentials="true")

### web全局请求拦截

```java
@Configuration
public class WebMvcConfg implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    //设置允许跨域的路径
    registry.addMapping("/**")
      //设置允许跨域请求的域名
      //当**Credentials为true时，**Origin不能为星号，需为具体的ip地址【如果接口不带cookie,ip无需设成具体ip】
      .allowedOrigins("http://localhost:9527", "http://127.0.0.1:9527", "http://127.0.0.1:8082", "http://127.0.0.1:8083")
      //是否允许证书 不再默认开启
      .allowCredentials(true)
      //设置允许的方法
      .allowedMethods("*")
      //跨域允许时间
      .maxAge(3600);
  }
}
```

