---
title: 5.Mybatis 使用
description: 5.Mybatis 使用
publishedAt: 2026-08-16
category: JavaWeb
tags:
  - SpringBoot
  - JavaWeb
  - Mybatis
draft: false
---

## 1. 使用案例

### 1. 接收简单参数

```java
@Mapper
public interface EmpMapper {
  // 删除语句
  @Delete("delete from emp where id = #{id}")//使用#{key}方式获取方法中的参数值
}
```

>sql 的语句中要添加传递过来的参数 使用 #{} ?的形式 ${}

> **预编译**SQL
>
> 1. 性能更高
>
> 2. 更安全(防止SQL注入)
>
> 性能更高：预编译SQL，编译一次之后会将编译后的SQL语句缓存起来，后面再次执行这条语句时，不会再次编译。（只是输入的参数不同）
>
> 更安全(防止SQL注入)：将敏感字进行转义，保障SQL的安全性。

### 3. 接收实体参数

```java
@Mapper
public interface EmpMapper {
  @Insert("insert into emp(username, name, gender, image, job,entrydate, dept_id, create_time, update_time) values (#{username}, #{name}, #{gender}, #{image}, #{job}, #{entrydate}, #{deptId}, #{createTime}, #{updateTime})")
    public void insert(Emp emp);
}
```

> 说明：#{...} 里面写的名称是对象的属性名

### 4. **主键返回**

概念：在数据添加成功后，需要获取插入数据库数据的主键。

默认情况下，执行插入操作时，是不会主键值返回的。如果我们想要拿到主键值，需要在Mapper接口中的方法上添加一个Options注解，并在注解中指定属性useGeneratedKeys=true和keyProperty="实体类属性名"

主键返回代码实现：

```java
@Mapper
public interface EmpMapper {
//会自动将生成的主键值，赋值给emp对象的id属性
@Options(useGeneratedKeys = true,keyProperty = "id")
@Insert("insert into emp(username, name, gender, image, job,
entrydate, dept_id, create_time, update_time) values (#{username}, #
{name}, #{gender}, #{image}, #{job}, #{entrydate}, #{deptId}, #
{createTime}, #{updateTime})")
public void insert(Emp emp);
}
```

### 5. 数据封装

比如数据库中的字段名字是 tb_update_time 而 接收的时候的数据是 updateTime



实体类属性名和数据库表查询返回的字段名一致，mybatis会自动封装。

如果实体类属性名和数据库表查询返回的字段名不一致，不能自动封装。

解决方案：

1. 起别名

2. 结果映射

   1. ```java
      @Results({@Result(column = "dept_id", property = "deptId"),
      @Result(column = "create_time", property = "createTime"),
      @Result(column = "update_time", property = "updateTime")})
      @Select("select id, username, password, name, gender, image, job,
      entrydate, dept_id, create_time, update_time from emp where id=#{id}")
      public Emp getById(Integer id);
      ```

   2. 

3. 开启驼峰命名

   1. ```tex
      # 在application.properties中添加：
      mybatis.configuration.map-underscore-to-camel-case=true
      ```

### 6. **Mybatis**的XML配置文件

在Mybatis中使用XML映射文件方式开发，需要符合一定的规范：

1. XML映射文件的名称与Mapper接口名称一致，并且将XML映射文件和Mapper接口放置在相同包下（同包同名）

2. XML映射文件的namespace属性为Mapper接口全限定名一致

3. XML映射文件中sql语句的id与Mapper接口中的方法名一致，并保持返回类型一致。

#### 文件的创建

需要和 Mapper 的文件创建相同的文件名

例如:com.dome.mapper.EmpMapper.xml

> XML 前置文件
>
> `<?xml version="1.0" encoding="UTF-8" ?>`
>
>` <!DOCTYPE mapper`
>
> `PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"`
>
> `"https://mybatis.org/dtd/mybatis-3-mapper.dtd">`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.itheima.mapper.EmpMapper">
  <!--查询操作-->
  <select id="list" resultType="com.itheima.pojo.Emp">
    select * from emp
    where name like concat('%',#{name},'%')
    and gender = #{gender}
    and entrydate between #{begin} and #{end}
    order by update_time desc
  </select>
  <!--动态 sql-->
  <select id="list" resultType="com.itheima.pojo.Emp">
    select * from emp
    <where>
      <!-- if做为where标签的子元素 -->
      <if test="name != null">
        and name like concat('%',#{name},'%')
      </if>
      <if test="gender != null">
        and gender = #{gender}
      </if>
      <if test="begin != null and end != null">
        and entrydate between #{begin} and #{end}
      </if>
    </where>
    order by update_time desc
  </select>

  <!-- 更新 set -->
  <update id="update">
    update emp
    <!-- 使用set标签，代替update语句中的set关键字 -->
    <set>
      <if test="username != null">
        username=#{username},
      </if>
      <if test="name != null">
        name=#{name},
      </if>
      <if test="gender != null">
        gender=#{gender},
      </if>
      <if test="image != null">
        image=#{image},
      </if>
      <if test="job != null">
        job=#{job},
      </if>
      <if test="entrydate != null">
        entrydate=#{entrydate},
      </if>
      <if test="deptId != null">
        dept_id=#{deptId},
      </if>
      <if test="updateTime != null">
        update_time=#{updateTime}
      </if>
    </set>
    where id=#{id}
  </update>
</mapper>
```



mapper 标签 namespace 对应文件的全类名

select  id 方法名 resultType内部单个值的返回值的全类名

if 解决多条件的动态选择匹配

Where 标签 解决 if 条件都不成立的时候,单独出现一个 where 的语句

set ：动态的在SQL语句中插入set关键字，并会删掉额外的逗号。（用于update语句中）

#### **动态**SQL-foreach

> delete from emp where id in (1,2,3); 

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.itheima.mapper.EmpMapper">
  <!--删除操作-->
  <delete id="deleteByIds">
    delete from emp where id in
    <foreach collection="ids" item="id" separator="," open="("
             close=")">
      #{id}
    </foreach>
  </delete>
</mapper>
```

#### **动态**SQL-sql&include

- 在xml映射文件中配置的SQL，有时可能会存在很多重复的片段，此时就会存在很多冗余的代码
  ![image-20231118002117847](https://img.picgo.net/2023/11/18/image-20231118002117847dc45ceb5ec2c5054.png)

我们可以对重复的代码片段进行抽取，将其通过 `<sql>` `标签封装到一个SQL片段，然后再通过

`<include>` 标签进行引用。

- `<sql>` ：定义可重用的SQL片段

- `<include>` ：通过属性refid，指定包含的SQL片段

> Demo

```xml
<sql id="commonSelect">
  select id, username, password, name, gender, image, job,
  entrydate, dept_id, create_time, update_time from emp
</sql>

<select id="list" resultType="com.itheima.pojo.Emp">
  <include refid="commonSelect"/>
  <where>
    <if test="name != null">
      name like concat('%',#{name},'%')
    </if>
    <if test="gender != null">
      and gender = #{gender}
    </if>
    <if test="begin != null and end != null">
      and entrydate between #{begin} and #{end}
    </if>
  </where>
  order by update_time desc
</select>
```

### 7. 分页插件

当使用了PageHelper分页插件进行分页，就无需再Mapper中进行手动分页了。 在Mapper中我们只需要进行正常的列表查询即可。在Service层中，调用Mapper的方法之前设置分页参数，在调用Mapper方法执行查询之后，解析分页结果，并将结果封装到PageBean对象中返回

1. 在pom.xml引入依赖

```xml
<dependency>
  <groupId>com.github.pagehelper</groupId>
  <artifactId>pagehelper-spring-boot-starter</artifactId>
  <version>1.4.2</version>
</dependency>
```

2. EmpMapper

```java
@Mapper
public interface EmpMapper {
  //获取当前页的结果列表
  @Select("select * from emp")
  public List<Emp> page(Integer start, Integer pageSize);
}
```

3. EmpServiceImpl

```java
@Override
public PageBean page(Integer page, Integer pageSize) {
  // 设置分页参数
  PageHelper.startPage(page, pageSize);
  // 执行分页查询
  List<Emp> empList = empMapper.list(name,gender,begin,end);
  // 获取分页结果
  Page<Emp> p = (Page<Emp>) empList; 
  //封装PageBean
  PageBean pageBean = new PageBean(p.getTotal(), p.getResult());
  return pageBean;
}
```

### 8. 文件的上传-本地

#### 8.1 前端的代码

主要是要设置请求头Content-Type:  multipart/form-data 默认是application/javascript

```html
<form action="/upload" method="post" enctype="multipart/form-data">
 姓名: <input type="text" name="username"><br>
 年龄: <input type="text" name="age"><br>
 头像: <input type="file" name="image"><br>
<input type="submit" value="提交">
</form>
```

#### 8.2 后端

> 配置文件的大小限制
>
> \#配置单个文件最大上传大小
>
> spring.servlet.multipart.max-file-size=10MB
>
> \#配置单个请求最大上传大小(一次请求可以上传多个文件)
>
> spring.servlet.multipart.max-request-size=100MB

```java
@Slf4j
@RestController
public class UploadController {
  @PostMapping("/upload")
  public Result upload(String username, Integer age, MultipartFile
                       image) throws IOException {
    log.info("文件上传：{},{},{}",username,age,image);
    //获取原始文件名
    String originalFilename = image.getOriginalFilename();
    //构建新的文件名
    String extname =
      originalFilename.substring(originalFilename.lastIndexOf("."));//文件
    扩展名
      String newFileName = UUID.randomUUID().toString()+extname;//
    随机名+文件扩展名
      //将文件存储在服务器的磁盘目录
      image.transferTo(new File("E:/images/"+newFileName));
    return Result.success();
  }
}
```

### 9. 文件上传阿里 OSS

> 文件上传代码封装

```java
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
@Component
public class AliOSSUtils {
  private String endpoint = "https://oss-cnshanghai.aliyuncs.com";
  private String accessKeyId = "";
  private String accessKeySecret =
    "";
  private String bucketName = "web-framework01";
  /**
* 实现上传图片到OSS
*/
  public String upload(MultipartFile multipartFile) throws
    IOException {
    // 获取上传的文件的输入流
    InputStream inputStream = multipartFile.getInputStream();
    // 避免文件覆盖
    String originalFilename =
      multipartFile.getOriginalFilename();
    String fileName = UUID.randomUUID().toString() +
      originalFilename.substring(originalFilename.lastIndexOf("."));
    //上传文件到 OSS
    OSS ossClient = new OSSClientBuilder().build(endpoint,
                                                 accessKeyId, accessKeySecret);
    ossClient.putObject(bucketName, fileName, inputStream);
    //文件访问路径
    String url = endpoint.split("//")[0] + "//" + bucketName +
      "." + endpoint.split("//")[1] + "/" + fileName;
    // 关闭ossClient
    ossClient.shutdown();
    return url;// 把上传到oss的路径返回
  }
}
```

>  调用文件的上传

```java
@Slf4j
@RestController
public class UploadController {
  @Autowired
  private AliOSSUtils aliOSSUtils;
  @PostMapping("/upload")
  public Result upload(MultipartFile image) throws IOException {
    //调用阿里云OSS工具类，将上传上来的文件存入阿里云
    String url = aliOSSUtils.upload(image);
    //将图片上传完成后的url返回，用于浏览器回显展示
    return Result.success(url);
  }
}
```

## 2. 配置文件

> Demo 
>
> 自定义配置文件

```properties
#自定义的阿里云OSS配置信息
aliyun.oss.endpoint=https://oss-cn-hangzhou.aliyuncs.com
aliyun.oss.accessKeyId=LTAI4GCH1vX6DKqJWxd6nEuW
aliyun.oss.accessKeySecret=yBshYweHOpqDuhCArrVHwIiBKpyqSL
aliyun.oss.bucketName=web-tlias
```

> 使用@Value

```java
@Value("${aliyun.oss.endpoint}")
private String endpoint;
@Value("${aliyun.oss.accessKeyId}")
private String accessKeyId;
@Value("${aliyun.oss.accessKeySecret}")
private String accessKeySecret;
@Value("${aliyun.oss.bucketName}")
private String bucketName;
```

> **@ConfigurationProperties**

```java
@ConfigurationProperties(prefix = "aliyun.oss")
public class AliOSSProperties {
  //区域
  private String endpoint;
  //身份ID
  private String accessKeyId ;
  //身份密钥
  private String accessKeySecret ;
  //存储空间
  private String bucketName;
}
```





























































































































