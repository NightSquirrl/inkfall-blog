---
title: 😤 11.Redis
tag:
  - SpringBoot
  - JavaWeb
  - Redis
recommend: 10
---

## Redis 的安装

Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖：

```sh
yum install -y gcc tcl
```

官网下载:https://redis.io/download/

解压:tar -xzf xxxx.tar.gz

进入目录:cd xxx

编译:make && make install

修改配置文件

> 在解压的目录中有一个文件叫 redis.conf

```bash
#备份文件
cp redis.conf  redis.conf.bck

vim redis.conf # 编辑配置文件

# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes 
# 密码，设置后访问Redis必须输入密码
requirepass 123321

# 监听的端口
port 6379
# 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录
dir .
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
databases 1
# 设置redis能够使用的最大内存
maxmemory 512mb
# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```

> 根据配置启动 redis

```bash
# 在刚在的目录中启动,在其他的路径也可以启动,但是需要指定全路径配置文件

redis-server redis.conf

redis-cli # 进入 redis 客户端进行命令操作
```

### 开机自启动

首先，新建一个系统服务文件：

```sh
vi /etc/systemd/system/redis.service
```

内容如下：

```conf
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```



然后重载系统服务：

```sh
systemctl daemon-reload
```

现在，我们可以用下面这组命令来操作redis了：

```sh
# 启动
systemctl start redis
# 停止
systemctl stop redis
# 重启
systemctl restart redis
# 查看状态
systemctl status redis
```

执行下面的命令，可以让redis开机自启：

```sh
systemctl enable redis
```

### Redis 可视化工具

#### 可视化工具下载地址:

macOS:https://github.com/FuckDoctors/rdm-builder/releases

window:https://github.com/lework/RedisDesktopManager-Windows/releases

## Redis 常见命令

Redis是典型的key-value数据库，key一般是字符串，而value包含很多不同的数据类型：

![image-20231122171845585](https://img.picgo.net/2023/11/22/image-20231122171845585eb9cfd7cf33be13e.png)

### Redis通用命令

通用指令是部分数据类型的，都可以使用的指令，常见的有：

- KEYS：查看符合模板的所有key
- DEL：删除一个指定的key
- EXISTS：判断key是否存在
- EXPIRE：给一个key设置有效期，有效期到期时该key会被自动删除
- TTL：查看一个KEY的剩余有效期

通过help [command] 可以查看一个命令的具体用法，例如：

```sh
# 查看keys命令的帮助信息：
127.0.0.1:6379> help keys

KEYS pattern
summary: Find all keys matching the given pattern
since: 1.0.0
group: generic
```

### String类型

String类型，也就是字符串类型，是Redis中最简单的存储类型。

其value是字符串，不过根据字符串的格式不同，又可以分为3类：

- string：普通字符串
- int：整数类型，可以做自增、自减操作
- float：浮点类型，可以做自增、自减操作

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。字符串类型的最大空间不能超过512m.

String的常见命令有：

- SET：添加或者修改已经存在的一个String类型的键值对
  - set age 20
- GET：根据key获取String类型的value
  - get age
- MSET：批量添加多个String类型的键值对
  - Mset age 20 name jack
- MGET：根据多个key获取多个String类型的value
  - mget name age
- INCR：让一个整型的key自增1
  - Incr age
- INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2
  - Incrby age 2
- INCRBYFLOAT：让一个浮点类型的数字自增并指定步长
  - set oldAge 20.2
  - Incrbyfloat oldAge 1.1
- SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行
  - setnx gender 1
- SETEX：添加一个String类型的键值对，并且指定有效期
  - Setex name 20 nance

#### Key结构

> 简单的说根据项目,实体存储数据
>
> 例如商品 id 1,用户 id 1
>
> 不可能全部使用 1 进行储存

Redis的key允许有多个单词形成层级结构，多个单词之间用':'隔开，格式如下：

```
	项目名:业务名:类型:id
```

如果Value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储：

| **KEY**         | **VALUE**                                  |
| --------------- | ------------------------------------------ |
| `heima:user:1`    | `{"id":1,  "name": "Jack", "age": 21} `      |
| `heima:product:1 `| `{"id":1,  "name": "小米11", "price": 4999}` |

并且，在Redis的桌面客户端中，还会以相同前缀作为层级结构，让数据看起来层次分明，关系清晰：

![](https://img.picgo.net/2023/11/22/InWMfeD99221a9cae3bb059.png)

### Hash类型

Hash类型，也叫散列，其value是一个无序字典，类似于Java中的HashMap结构。

String结构是将对象序列化为JSON字符串后存储，当需要修改对象某个字段时很不方便：

![](https://img.picgo.net/2023/11/22/x2zDBjf8261a5a3827b8811.png)



Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD：

![](https://img.picgo.net/2023/11/22/VF2EPt036b0b60ee7ccf9d9.png)

Hash的常见命令有：

- HSET key field value：添加或者修改hash类型key的field的值

- HGET key field：获取一个hash类型key的field的值

- HMSET：批量添加多个hash类型key的field的值

- HMGET：批量获取多个hash类型key的field的值

- HGETALL：获取一个hash类型的key中的所有的field和value
- HKEYS：获取一个hash类型的key中的所有的field
- HINCRBY:让一个hash类型key的字段值自增并指定步长
- HSETNX：添加一个hash类型的key的field值，前提是这个field不存在，否则不执行

### List类型

Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。

特征也与LinkedList类似：

- 有序
- 元素可以重复
- 插入和删除快
- 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。



List的常见命令有：

- LPUSH key element ... ：向列表左侧插入一个或多个元素
- LPOP key：移除并返回列表左侧的第一个元素，没有则返回nil
- RPUSH key element ... ：向列表右侧插入一个或多个元素
- RPOP key：移除并返回列表右侧的第一个元素
- LRANGE key star end：返回一段角标范围内的所有元素
- BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil

### Set类型

Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征：

- 无序

- 元素不可重复

- 查找快

- 支持交集、并集、差集等功能



Set的常见命令有：

- SADD key member ... ：向set中添加一个或多个元素
- SREM key member ... : 移除set中的指定元素
- SCARD key： 返回set中元素的个数
- SISMEMBER key member：判断一个元素是否存在于set中
- SMEMBERS：获取set中的所有元素
- SINTER key1 key2 ... ：求key1与key2的交集



例如两个集合：s1和s2:

![](https://img.picgo.net/2023/11/22/ha8x86R4c88ac7015979dd9.png)

求交集：SINTER s1 s2

求s1与s2的不同：SDIFF s1 s2

![](https://img.picgo.net/2023/11/22/L9vTv2X19b291dbcb904e3b.png)

### SortedSet类型

Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。

SortedSet具备下列特性：

- 可排序
- 元素不重复
- 查询速度快

因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能。



SortedSet的常见命令有：

- ZADD key score member：添加一个或多个元素到sorted set ，如果已经存在则更新其score值
- ZREM key member：删除sorted set中的一个指定元素
- ZSCORE key member : 获取sorted set中的指定元素的score值
- ZRANK key member：获取sorted set 中的指定元素的排名
- ZCARD key：获取sorted set中的元素个数
- ZCOUNT key min max：统计score值在给定范围内的所有元素的个数
- ZINCRBY key increment member：让sorted set中的指定元素自增，步长为指定的increment值
- ZRANGE key min max：按照score排序后，获取指定排名范围内的元素
- ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素
- ZDIFF、ZINTER、ZUNION：求差集、交集、并集

注意：所有的排名默认都是升序，如果要降序则在命令的Z后面添加REV即可，例如：

- **升序**获取sorted set 中的指定元素的排名：ZRANK key member

- **降序**获取sorted set 中的指定元素的排名：ZREVRANK key memeber

## Redis的Java客户端

### jupiter

#### 快速入门

> 线程不安全

##### 1. 引入依赖

```xml
<!--jedis-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.7.0</version>
</dependency>
<!--单元测试-->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
```

##### 2. 建立连接

新建一个单元测试类，内容如下：

```java
private Jedis jedis;

@BeforeEach
void setUp() {
    // 1.建立连接
    // jedis = new Jedis("192.168.150.101", 6379);
    jedis = JedisConnectionFactory.getJedis();
    // 2.设置密码
    jedis.auth("123321");
    // 3.选择库
    jedis.select(0);
}
```

##### 3. 测试

```java
@Test
void testString() {
    // 存入数据
    String result = jedis.set("name", "虎哥");
    System.out.println("result = " + result);
    // 获取数据
    String name = jedis.get("name");
    System.out.println("name = " + name);
}

@Test
void testHash() {
    // 插入hash数据
    jedis.hset("user:1", "name", "Jack");
    jedis.hset("user:1", "age", "21");

    // 获取
    Map<String, String> map = jedis.hgetAll("user:1");
    System.out.println(map);
}
```

##### 4. 释放资源

```java
@AfterEach
void tearDown() {
    if (jedis != null) {
        jedis.close();
    }
}
```

#### 连接池

解决线程不安全的问题

```java
package com.heima.jedis.util;

import redis.clients.jedis.*;

public class JedisConnectionFactory {

    private static JedisPool jedisPool;

    static {
        // 配置连接池
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(8);
        poolConfig.setMaxIdle(8);
        poolConfig.setMinIdle(0);
        poolConfig.setMaxWaitMillis(1000);
        // 创建连接池对象，参数：连接池配置、服务端ip、服务端端口、超时时间、密码
        jedisPool = new JedisPool(poolConfig, "192.168.150.101", 6379, 1000, "123321");
    }

    public static Jedis getJedis(){
        return jedisPool.getResource();
    }
}
```

### SpringDataRedis客户端

- 提供了对不同Redis客户端的整合（Lettuce和Jedis）
- 提供了RedisTemplate统一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDKCollection实现

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：

![](https://img.picgo.net/2023/11/22/UFlNIV055c5faca2f718228.png)

#### 快速入门

##### 1. 引入依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.7</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.heima</groupId>
    <artifactId>redis-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>redis-demo</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <!--redis依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!--common-pool-->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>
        <!--Jackson依赖-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

##### 2. 配置Redis

```yaml
spring:
  redis:
    host: 192.168.150.101
    port: 6379
    password: 123321
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
        max-wait: 100ms
```

##### 3. 注入RedisTemplate - 编写测试

```java
@SpringBootTest
class RedisStringTests {

    @Autowired
    private RedisTemplate edisTemplate;

    @Test
    void testString() {
        // 写入一条String数据
        redisTemplate.opsForValue().set("name", "虎哥");
        // 获取string数据
        Object name = stringRedisTemplate.opsForValue().get("name");
        System.out.println("name = " + name);
    }
}
```

#### 自定义序列化

RedisTemplate可以接收任意Object作为值写入Redis：

![](https://img.picgo.net/2023/11/22/OEMcbuu24b8e05fac151054.png)





只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化，得到的结果是这样的：

![](https://img.picgo.net/2023/11/22/5FjtWk595fa8754d6318639.png)



缺点：

- 可读性差
- 内存占用较大

我们可以自定义RedisTemplate的序列化方式，代码如下：

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){
        // 创建RedisTemplate对象
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // 设置连接工厂
        template.setConnectionFactory(connectionFactory);
        // 创建JSON序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = 
            							new GenericJackson2JsonRedisSerializer();
        // 设置Key的序列化
        template.setKeySerializer(RedisSerializer.string());
        template.setHashKeySerializer(RedisSerializer.string());
        // 设置Value的序列化
        template.setValueSerializer(jsonRedisSerializer);
        template.setHashValueSerializer(jsonRedisSerializer);
        // 返回
        return template;
    }
}
```



这里采用了JSON序列化来代替默认的JDK序列化方式。最终结果如图：

![](https://img.picgo.net/2023/11/24/XOAq3cNebc252f5b7cc4198.png)

整体可读性有了很大提升，并且能将Java对象自动的序列化为JSON字符串，并且查询时能自动把JSON反序列化为Java对象。不过，其中记录了序列化时对应的class名称，目的是为了查询时实现自动反序列化。这会带来额外的内存开销。

#### StringRedisTemplate

为了节省内存空间，我们可以不使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

![](https://img.picgo.net/2023/11/24/Ip9TKSYe419d4221a9d2ca5.png)

因为存入和读取时的序列化及反序列化都是我们自己实现的，SpringDataRedis就不会将class信息写入Redis了。



这种用法比较普遍，因此SpringDataRedis就提供了RedisTemplate的子类：StringRedisTemplate，它的key和value的序列化方式默认就是String方式。





省去了我们自定义RedisTemplate的序列化方式的步骤，而是直接使用：

```java
@Autowired
private StringRedisTemplate stringRedisTemplate;
// JSON序列化工具
private static final ObjectMapper mapper = new ObjectMapper();

@Test
void testSaveUser() throws JsonProcessingException {
    // 创建对象
    User user = new User("虎哥", 21);
    // 手动序列化
    String json = mapper.writeValueAsString(user);
    // 写入数据
    stringRedisTemplate.opsForValue().set("user:200", json);

    // 获取数据
    String jsonUser = stringRedisTemplate.opsForValue().get("user:200");
    // 手动反序列化
    User user1 = mapper.readValue(jsonUser, User.class);
    System.out.println("user1 = " + user1);
}

```

## GeoSpatial数据类型

> Geoadd 添加地理位置
>
> 两级无法添加
>
> 有效的经度从-180度到180度。
>
> 有效的纬度从-85.05112878度到85.05112878度。
>
> geoadd 经度 纬度 名称

```bash
geoadd china:city  39.90  116.40 beijing
```

> geopos china:city beijing
>
> 获取指定的城市的经度和纬度

> Geodist  获取两个城市之间的距离

```bash
Geodist china:city beijing shanghai km
```

> Georadius 已给定的经纬度为中心,找出半径的元素

```bash
gerradius china:city 110 30 1000km
georadius china:city 110 30 500 km withdist(显示到中间的距离) withcoord(显示他人的信息) count 1 # 执行查询的数量
```

> Georadiusbymember  根据元素的名称寻找

```bash
Georadiusbymember china:city beijig 1000 km
```

> geohash china:city beijing chongjing 
>
> 将二维的经纬度转换为一维的字符串

## Hyperloglog-基数

```bash
pfadd name 1 2 34 5 6 7 # 添加元素
pdcount name # 计数
pfadd name2 1 2 34 5 6 7 # 添加元素
#合并
pfmerge name3 name name2
```

## Bitmaps

位图,操作二进制位就只有 0,1 两个状态

```bash
sebit sign 0 1
sebit sign 1 0
sebit sign 2 0
sebit sign 3 0
sebit sign 4 1
sebit sign 5 1

getbit sign 3
...

bitcount sign

```

## 事务

redis 单条命令保存原子性,但是事物没有!

开启事务()

> multi

命令入队()

...

执行事务()

> exec

取消事务()

> discard

## 乐观锁

认为什么时候都不会出问题,所以不会上锁,更新数据的时候去判断,在此期间是否有人修改了数据

```bash
watch key
开始事务执行命令


此时事务没提交但是有其他的线程修改了 key 的数据
exce 提交事务会执行失败

unwatch 解锁
```

## redis.conf 详解

> 快照-持久化

Redis 是内存数据库,断电就会丢失

```bash
save 900 1  900s内进行了一次操作就进行持久化的保存操作

save 300 10

save 60 10000

stop-writes-onbgsave-erros yes # 持久化如果出错了是否继续工作

rdbcompression yes # 是否压缩 rdb 文件
```





## 持久化

### RDB

> 默认的配置就够了

> 触发机制

save 规则满足

执行命令 flushall 命令

退出 redis

> 恢复

将 rdb 文件放在 redis 的启动目录即可

config get dir

优点:

1. 适合大规模的数据恢复
2. 对数据的完整性不够

缺点:

1. 需要一定的时间间隔进程操作
2. fork 进程需要占用一定的内容空间

### AOF

aof

默认是不开启的

appendonly yes 手动开启 --- 需要重启

如果 aof 文件被破坏,redis 是无法启动的

> 修复工具

redis-check-aof --fix appendonly.aof

优点:

1. 每一次修改都会同步
2. 每秒同步一次

缺点:

数据文件大于 rdb,修复速度也比 rdb 慢



## 发布订阅

```bash
#订阅频道
subscribe name
#发布信息
publish name xxxx
```

消息无法持久化

## 消息队列-stream

> *表示自动添加一个消息的 id

```bash
xadd name * course redis
xadd name * course redis
xlen name # 查看消息的数量
xrange name - + # 查看所有的消息
xdel 删除消息

xtrim name maxlen 0 删除所有的消息
xadd name 1-0 course redis # 手动指定 id id 要递增

# 读取消息 读取两条 堵塞 1000ms 从头开始读取
xread count 2 block 1000  streams 消息队列名称 0
xread count 2 block 1000 streams name $ #$表示从现在开始的最新消息
```

> 创建消费者组

```bash
# 消息的名称 租的名称
xgroup create name groupname id
xinfo groups name

#添加消费者
xgroup createconsumer 消息名称 组名称 消费者名称

xreadgroup group 组名称 消费这名称 count 2 block 3000  streams 消息的名称
```

## 主从复制

只有一个主结点

> 命令行修改

```bash
# 查看当前节点的角色
role
# 配置所属节点
slaveof host port # 旧版本
replicaof host port  

```

> 配置文件修改

复制配置文件,可以将原本的文件作为主结点,复制的为子节点

修改子节点配置文件

```bash
prort 6380
pidfile /var/run/redis_6380.pid
dbfilename dump-6380.rdb  #持久化文件的名称
replicaof 127.0.0.1 6379 # 指定主节点
```

## 哨兵模式

添加哨兵配置文件

sentinel.conf

```bash
# 主节点的 ip port 1 -> 表示主需要一个哨兵同意就可以进行故障转移
sentinel monitor master 127.0.0.1 6379 

#启动
redis-sentinel sentinel.conf
```

