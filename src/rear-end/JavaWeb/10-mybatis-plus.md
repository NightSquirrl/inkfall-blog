---
title: 😤 10.Mybatis-plus
tag:
  - SpringBoot
  - JavaWeb
  - Mybatis-plus
recommend: 9
---

## 1. 入门

### 1.1 引入MybatisPlus的起步依赖

```xml
<!--MybatisPlus--><dependency>    <groupId>com.baomidou</groupId>    <artifactId>mybatis-plus-boot-starter</artifactId>    <version>3.5.3.1</version></dependency>

```

### 1.2 定义Mapper

```java
public interface UserMapper extends BaseMapper<User> {}

```

### 1.3 常见注释

MybatisPlus中比较常用的几个注解如下：

@TableName：用来指定表名

@TableId：用来指定表中的主键字段信息

@TableField：用来指定表中的普通字段信息

> IdType枚举：
>
> ​	AUTO：数据库自增长
>
> ​	INPUT：通过set方法自行输入
>
> ​	ASSIGN_ID：分配 ID，接口IdentifierGenerator的方法nextId来生成id，默认实现类为DefaultIdentifierGenerator雪花算法
>
> 使用@TableField的常见场景：
>
> ​	成员变量名与数据库字段名不一致
>
> ​	成员变量名以is开头，且是布尔值
>
> ​	成员变量名与数据库关键字冲突
>
> ​	成员变量不是数据库字段
>
> 



![image-20231121171939190](https://img.picgo.net/2023/11/21/image-2023112117193919037ca944e29689139.png)

### 1.4 常见配置

```properties
mybatis-plus:
  type-aliases-package: com.itheima.mp.domain.po # 别名扫描包
  mapper-locations: "classpath*:/mapper/**/*.xml" # Mapper.xml文件地址，默认值
  configuration:
      # 这个配置会将执行的sql打印出来，在开发或测试的时候可以用
     log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
      map-underscore-to-camel-case: true # 是否开启下划线和驼峰的映射 默认是开启的
      cache-enabled: false # 是否开启二级缓存
  global-config:
      db-config:
        id-type: assign_id # id为雪花算法生成
        update-strategy: not_null # 更新策略：只更新非空字段
        logic-delete-field: isDelete # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
        logic-delete-value: 1 # 逻辑已删除值(默认为 1)
        logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

## 2. 核心

### 2.1 条件构造器

![image-20231121173009354](https://img.picgo.net/2023/11/21/image-20231121173009354456ab5bd720f571b.png)

```java
QueryWrapper<User> wrapper = new QueryWrapper<User>()
  	.select("id","username")
  .like("username","o")
  .ge("balance",10000)
```

### 2.2 自定义 sql

> 将id在指定范围的用户（例如1、2、4 ）的余额扣减指定值

1. 基于 Wrapper构建 where 条件

```java
List<Long> ids = List.of(1L, 2L, 4L);
int amount = 200;
// 1.构建条件
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>().in(User::getId, ids);
// 2.自定义SQL方法调用
userMapper.updateBalanceByIds(wrapper, amount);
```

2. 在mapper方法参数中用Param注解声明wrapper变量名称，必须是ew

```java
void updateBalanceByIds(@Param("ew") LambdaQueryWrapper<User> wrapper, @Param("amount") int amount);

```

3. 自定义SQL，并使用Wrapper条件

   ```xml
   <update id="updateBalanceByIds">
     UPDATE tb_user SET balance = balance - #{amount} ${ew.customSqlSegment}
   </update>
   
   ```

   

### 2.3 IService

> 保存
>
> save()
>
> 删除
>
> remove()
>
> 更新
>
> update()
>
> 查
>
> 一个
>
> get()
>
> 多个
>
> list
>
> 数量
>
> count
>
> 分页 page
>
> lambda

使用

```java
//接口
public interface IUserService extends IService<User> {

}

// 实现类
public class UserServiceImpl extends ServiceImpl<UserMappler,User> implements IUserService {}
```



### 2.4 自动重填

> 实现时间的自动更新:
>
> @TableField(fill = FieldFill.INSERT)
>
> createTime
>
> @TableField(fill = FieldFill.insert_update)
>
> updateTime

```java
@Component
public class MyMeteObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }
}

```

### 2.5 乐观锁

乐观锁的实现方式:

- 取出记录的时候获取当前的 version
- 更新的时候,带上这个version
- 执行更新时,set version = new version where version = oldversion
- 如果 version 不对,就会更新失败

#### 实现步骤

1. 给数据库添加version 字段,默认值为 1
2. 实体类加对应的字段

```java
@Version
private Integer version
```

3. 配置类

   1. ```java
      @Configuration
      @EnableTransactionManagement
      @MapperScan(basePackages = "com.whattools.usercenter.mapper")
      public class MyBatisPlusConfig {
      //    注册乐观锁插件
      //    @Bean
          public OptimisticLockerInterceptor optimisticLockerInterceptor() {
              return new OptimisticLockerInterceptor();
          }
      }
      ```

   2. 

### 2.6 分页插件

#### 添加配置项

```java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
      // 完整版本
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));//如果配置多个插件,切记分页最后添加
        //interceptor.addInnerInterceptor(new PaginationInnerInterceptor()); 如果有多数据源可以不配具体类型 否则都建议配上具体的DbType
        return interceptor;
      
      
      // 简化版本
       return new MybatisPlusInterceptor();
    }
}
```

#### 使用

```java
Page<User> page = new Page(1,5);
userMapper.selectPage(page,null);
page.getRecords().forEach()
```

### 2.7 逻辑删除

```java
@TableLogic
private Integer deleted;
```



#### 配置

```java
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
        
        
或者
        
@Bean
public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
      }
```



### 2.8 性能分析插件

#### 配置

```java
@Bean
@Profile({"test","dev"})
public PerformanceInterceptor performanceInterceptor() {
  
}
```





