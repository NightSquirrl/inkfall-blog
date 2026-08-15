---
title: 🧐 4. 数据库进阶
tag:
  - MySql
recommend: 4
---



## 1. 存储引擎

### 1.1 MySQL体系结构

![image-20231116223111923](https://img.picgo.net/2023/11/16/image-20231116223111923d8a0e8f70b3e742a.png)

1. 连接层

最上层是一些客户端和链接服务，包含本地sock 通信和大多数基于客户端/服务端工具实现的类似于TCP/IP的通信。主要完成一些类似于连接处理、授权认证、及相关的安全方案。在该层上引入了线程池的概念，为通过认证安全接入的客户端提供线程。同样在该层上可以实现基于SSL的安全链接。服务器也会为安全接入的每个客户端验证它所具有的操作权限。

2. 服务层

第二层架构主要完成大多数的核心服务功能，如SQL接口，并完成缓存的查询，SQL的分析和优化，部分内置函数的执行。所有跨存储引擎的功能也在这一层实现，如 过程、函数等。在该层，服务器会解析查询并创建相应的内部解析树，并对其完成相应的优化如确定表的查询的顺序，是否利用索引等，最后生成相应的执行操作。如果是select语句，服务器还会查询内部的缓存，如果缓存空间足够大，这样在解决大量读操作的环境中能够很好的提升系统的性能。

3.  引擎层

存储引擎层， 存储引擎真正的负责了MySQL中数据的存储和提取，服务器通过API和存储引擎进行通信。不同的存储引擎具有不同的功能，这样我们可以根据自己的需要，来选取合适的存储引擎。数据库中的索引是在存储引擎层实现的。

4. 存储层

数据存储层， 主要是将数据(如: redolog、undolog、数据、索引、二进制日志、错误日志、查询日志、慢查询日志等)存储在文件系统之上，并完成与存储引擎的交互。

> 和其他数据库相比，MySQL有点与众不同，它的架构可以在多种不同场景中应用并发挥良好作用。主要体现在存储引擎上，插件式的存储引擎架构，将查询处理和其他的系统任务以及数据的存储提取分离。这种架构可以根据业务的需求和实际需要选择合适的存储引擎。

### 1.2 存储引擎的介绍

> 默认引擎  InnoDB

1. 建表时指定存储引擎

```sql
CREATE TABLE 表名( 
  字段1 字段1类型 [ COMMENT 字段1注释 ] , 
  ...... 
  字段n 字段n类型 [COMMENT 字段n注释 ] 
) ENGINE = INNODB [ COMMENT 表注释 ] ;


create table my_myisam( id int, name varchar(10) ) engine = MyISAM ;
```

2. 查询当前数据库支持的存储引擎

```sql
show engines;
```

### 1.3 **存储引擎特点**

重点提到的三种存储引擎 InnoDB、MyISAM、Memory的特点。

#### 1.3.1 **InnoDB**

1). 介绍

InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在 MySQL 5.5 之后，InnoDB是默认的MySQL 存储引擎。

2). 特点

DML操作遵循ACID模型，支持事务；

行级锁，提高并发访问性能；

支持外键FOREIGN KEY约束，保证数据的完整性和正确性；

3). 文件

xxx.ibd：xxx代表的是表名，innoDB引擎的每张表都会对应这样一个表空间文件，存储该表的表结

构（frm-早期的 、sdi-新版的）、数据和索引。

参数：innodb_file_per_table

```sql
show variables like 'innodb_file_per_table';
```

![image-20231116224131064](https://img.picgo.net/2023/11/16/image-2023111622413106456e29c5802b6022b.png)

表空间 : InnoDB存储引擎逻辑结构的最高层，ibd文件其实就是表空间文件，在表空间中可以包含多个Segment段。

段 : 表空间是由各个段组成的， 常见的段有数据段、索引段、回滚段等。InnoDB中对于段的管

理，都是引擎自身完成，不需要人为对其控制，一个段中包含多个区。

区 : 区是表空间的单元结构，每个区的大小为1M。 默认情况下， InnoDB存储引擎页大小为16K， 即一个区中一共有64个连续的页。

页 : 页是组成区的最小单元，**页也是****InnoDB** **存储引擎磁盘管理的最小单元**，每个页的大小默认为 16KB。为了保证页的连续性，InnoDB 存储引擎每次从磁盘申请 4-5 个区。

行 : InnoDB 存储引擎是面向行的，也就是说数据是按行进行存放的，在每一行中除了定义表时所指定的字段以外，还包含两个隐藏字段(后面会详细介绍)。 

#### 1.3.2 **MyISAM**

1). 介绍

MyISAM是MySQL早期的默认存储引擎。

2). 特点

不支持事务，不支持外键

支持表锁，不支持行锁

访问速度快

3). 文件

xxx.sdi：存储表结构信息

xxx.MYD: 存储数据

xxx.MYI: 存储索引

#### 1.3.3 **Memory**

1). 介绍

Memory引擎的表数据时存储在内存中的，由于受到硬件问题、或断电问题的影响，只能将这些表作为

临时表或缓存使用。

2). 特点

内存存放

 hash索引（默认）

3).文件

xxx.sdi：存储表结构信息

#### 1.3.4 **区别及特点**

| 特点         | InnoDB   | MyISAM | Memory |
| ------------ | -------- | ------ | ------ |
| 存储限制     | 64TB     | 有     | 有     |
| 事务安全     | 支持     | -      | -      |
| 锁机制       | 行锁表锁 | 表锁   | 表锁   |
| B+tree索引   | 支持     | 支持   | 支持   |
| Hash索引     | -        | -      | 支持   |
| 全文索引     | 支持     | 支持   | -      |
| 空间使用     | 高       | 低     | N/A    |
| 内存使用     | 高       | 低     | 中等   |
| 批量插入速度 | 低       | 高     | 高     |
| 支持外键     | 支持     | -      | -      |

> 面试题:
>
> ​	InnoDB引擎与MyISAM引擎的区别 ? 
>
> ​	①. InnoDB引擎, 支持事务, 而MyISAM不支持。
>
> ​	②. InnoDB引擎, 支持行锁和表锁, 而MyISAM仅支持表锁, 不支持行锁。
>
> ​	③. InnoDB引擎, 支持外键, 而MyISAM是不支持的。
>
> ​	主要是上述三点区别，当然也可以从索引结构、存储限制等方面，更加深入的回答，具体参考如下官方文档：

### 1.4 **存储引擎选择**

在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据

实际情况选择多种存储引擎进行组合。

​	InnoDB: 是Mysql的默认存储引擎，支持事务、外键。如果应用对事务的完整性有比较高的要求，在并发条件下要求数据的一致性，数据操作除了插入和查询之外，还包含很多的更新、删除操作，那么InnoDB存储引擎是比较合适的选择。

​	MyISAM ： 如果应用是以读操作和插入操作为主，只有很少的更新和删除操作，并且对事务的完整性、并发性要求不是很高，那么选择这个存储引擎是非常合适的。

​	MEMORY：将所有数据保存在内存中，访问速度快，通常用于临时表及缓存。MEMORY的缺陷就是对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性。

## 2. **索引**

索引（index）是帮助MySQL高效获取数据的数据结构(有序)。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据， 这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。

![image-20231116225110136](https://img.picgo.net/2023/11/16/image-20231116225110136764d503c8aeb6add.png)

```sql
select * from user where age = 45;
```

无索引的情况

- 在无索引情况下，就需要从第一行开始扫描，一直扫描到最后一行，我们称之为 全表扫描，性能很

  低。

 有索引情况

- 如果我们针对于这张表建立了索引，假设索引结构就是二叉树，那么也就意味着，会对age这个字段建

  立一个二叉树的索引结构。

![image-20231116225242533](https://img.picgo.net/2023/11/16/image-2023111622524253349907fb1de6a0c72.png)

此时我们在进行查询时，只需要扫描三次就可以找到数据了，极大的提高的查询的效率。

> 备注： 这里我们只是假设索引的结构是二叉树，介绍一下索引的大概原理，只是一个示意图，并不是索引的真实结构，索引的真实结构，后面会详细介绍。

### 特点

![image-20231116225314755](https://img.picgo.net/2023/11/16/image-202311162253147551232b966afa5ed32.png)

### 2.1  **索引结构**

MySQL的索引是在存储引擎层实现的，不同的存储引擎有不同的索引结构，主要包含以下几种

![image-20231116225458160](https://img.picgo.net/2023/11/16/image-202311162254581600d190ed5850326cf.png)

上述是MySQL中所支持的所有的索引结构，接下来，我们再来看看不同的存储引擎对于索引结构的支持\情况。

![image-20231116225556834](https://img.picgo.net/2023/11/16/image-202311162255568343ceffb5873d8aa0d.png)

> 注意： 我们平常所说的索引，如果没有特别指明，都是指B+树结构组织的索引。

### 2.2 索引分类

#### 2.2.1 索引分类

在MySQL数据库，将索引的具体类型主要分为以下几类：主键索引、唯一索引、常规索引、全文索引

![image-20231116225823731](https://img.picgo.net/2023/11/16/image-20231116225823731744121265c521ebd.png)

#### 2.2.2 **聚集索引**&二级索引

而在在InnoDB存储引擎中，根据索引的存储形式，又可以分为以下两种：

![image-20231116225920010](https://img.picgo.net/2023/11/16/image-202311162259200108922b9e4ef17491b.png)

聚集索引选取规则:

- 如果存在主键，主键索引就是聚集索引。
- 如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引。
- 如果表没有主键，或没有合适的唯一索引，则InnoDB会自动生成一个rowid作为隐藏的聚集索引。![Image From MySQL-进阶篇](https://img.picgo.net/2023/11/16/Image-From-MySQL-dab813ba2ce4b113.png)

- 聚集索引的叶子节点下挂的是这一行的数据 。

- 二级索引的叶子节点下挂的是该字段值对应的主键值。

> ⚠️
>
> 回表查询： 这种先到二级索引中查找数据，找到主键值，然后再到聚集索引中根据主键值，获取数据的方式，就称之为回表查询。
>
> 
>
> 思考题：
>
> 以下两条SQL语句，那个执行效率高? 为什么?
>
> A. select * from user where id = 10 ;
>
> B. select * from user where name = 'Arm' ;
>
> 备注: id为主键，name字段创建的有索引；
>
> 解答：
>
> A 语句的执行性能要高于B 语句。
>
> 因为A语句直接走聚集索引，直接返回数据。 而B语句需要先查询name字段的二级索引，然
>
> 后再查询聚集索引，也就是需要进行回表查询。
>
> 
>
> 思考题：
>
> InnoDB主键索引的B+tree高度为多高呢?
>
> 假设:
>
> 一行数据大小为1k，一页中可以存储16行这样的数据。InnoDB的指针占用6个字节的空
>
> 间，主键即使为bigint，占用字节数为8。
>
> 高度为2：
>
> n * 8 + (n + 1) * 6 = 16*1024 , 算出n约为 1170
>
> 1171* 16 = 18736
>
> 也就是说，如果树的高度为2，则可以存储 18000 多条记录。
>
> 高度为3：
>
> 1171 * 1171 * 16 = 21939856
>
> 也就是说，如果树的高度为3，则可以存储 2200w 左右的记录。

#### 2.3.3 **索引语法**

1. 创建索引

```sql
CREATE [ UNIQUE | FULLTEXT ] INDEX index_name ON table_name ( index_col_name,... ) ;
```

2. 查看索引

```sql
SHOW INDEX FROM table_name ;
```

3. 删除索引

```sql
DROP INDEX index_name ON table_name ;
```

> Demo
>
> A. name字段为姓名字段，该字段的值可能会重复，为该字段创建索引。

```sql
CREATE INDEX idx_user_name ON tb_user(name);
```

> B. phone手机号字段的值，是非空，且唯一的，为该字段创建唯一索引。

```sql
CREATE UNIQUE INDEX idx_user_phone ON tb_user(phone);
```

> 为profession、age、status创建联合索引。

```sql
CREATE INDEX idx_user_pro_age_sta ON tb_user(profession,age,status);
```

### 2.3 SQL 性能分析

#### 2.3.1  **SQL**执行频率

MySQL 客户端连接成功后，通过 show [session|global] status 命令可以提供服务器状态信息。通过如下指令，可以查看当前数据库的INSERT、UPDATE、DELETE、SELECT的访问频次：

```sql
-- session 是查看当前会话 ; 
-- global 是查询全局数据 ; 
SHOW GLOBAL STATUS LIKE 'Com_______';
```

> Com_delete: 删除次数
>
> Com_insert: 插入次数
>
> Com_select: 查询次数
>
> Com_update: 更新次数

> Tips:
>
> ​	通过上述指令，我们可以查看到当前数据库到底是以查询为主，还是以增删改为主，从而为数据库优化提供参考依据。 如果是以增删改为主，我们可以考虑不对其进行索引的优化。 如果是以查询为主，那么就要考虑对数据库的索引进行优化了。

#### 2.3.2 **慢查询日志**

慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志。

MySQL的慢查询日志默认没有开启，我们可以查看一下系统变量 slow_query_log。

如果要开启慢查询日志，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息

```sql
# 开启MySQL慢日志查询开关 
slow_query_log=1 
# 设置慢日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志 
long_query_time=2
```

配置完毕之后，通过以下指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息

/var/lib/mysql/localhost-slow.log

```shell
systemctl restart mysqld
```

#### 2.3.3 **profile**详情

show profiles 能够在做SQL优化时帮助我们了解时间都耗费到哪里去了。通过have_profiling参数，能够看到当前MySQL是否支持profile操作：

```sql
SELECT @@have_profiling ; 

select @@profiling

SET profiling = 1;
```

可以看到，当前MySQL是支持 profile操作的，但是开关是关闭的。可以通过set语句在session/global级别开启profiling：



当我们执行了一系列 SQL 语句之后,通过指定查询指令执行的耗时



```sql
-- 查看每一条SQL的耗时基本情况 
show profiles; 
-- 查看指定query_id的SQL语句各个阶段的耗时情况 
show profile for query query_id; 

show profile for query 16; -- 16 是 show profiles;  执行之后表格的 id

-- 查看指定query_id的SQL语句CPU的使用情况
show profile cpu for query query_id;
```

#### 2.3.4 **explain**

EXPLAIN 或者 DESC命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。

```sql
-- 直接在select语句之前加上关键字 
explain / desc EXPLAIN SELECT 字段列表 FROM 表名 WHERE 条件 ;
```

![image-20231116231855313](https://img.picgo.net/2023/11/16/image-20231116231855313431b06c5bdfac10f.png)

Explain 执行计划中各个字段的含义: 

![image-20231116231911640](https://img.picgo.net/2023/11/16/image-20231116231911640596803c3d6f9a338.png)

### 2.4 **索引使用** 

#### 2.4.1 **验证索引效率**

在讲解索引的使用原则之前，先通过一个简单的案例，来验证一下索引，看看是否能够通过索引来提升数据查询性能。在演示的时候，我们还是使用之前准备的一张表 tb_sku , 在这张表中准备了1000w的记录。

这张表中id为主键，有主键索引，而其他字段是没有建立索引的。 我们先来查询其中的一条记录，看看里面的字段情况，执行如下SQL： 

```sql
select * from tb_sku where id = 1\G; -- G 将行展示 修改为列展示
```

![Image From MySQL-进阶篇](https://img.picgo.net/2023/11/16/Image-From-MySQL-5f82172b02dd912c.png)

可以看到即使有1000w的数据,根据id进行数据查询,性能依然很快，因为主键id是有索引的。 那么接下来，我们再来根据 sn 字段进行查询，执行如下SQL：

```sql
SELECT * FROM tb_sku WHERE sn = '100000003145001';
```

我们可以看到根据sn字段进行查询，查询返回了一条数据，结果耗时 20.78sec，就是因为sn没有索引，而造成查询效率很低。

那么我们可以针对于sn字段，建立一个索引，建立了索引之后，我们再次根据sn进行查询，再来看一下查询耗时情况。

创建索引：

```sql
create index idx_sku_sn on tb_sku(sn) ;
```

然后再次执行相同的SQL语句，再次查看SQL的耗时。

```sql
SELECT * FROM tb_sku WHERE sn = '100000003145001'; 
```

![Image From MySQL-进阶篇](https://img.picgo.net/2023/11/16/Image-From-MySQL-4f1cfb21eff4aeae.png)

我们明显会看到，sn字段建立了索引之后，查询性能大大提升。建立索引前后，查询耗时都不是一个数量级的。

#### 2.4.2 **最左前缀法则**

如果索引了多列（联合索引），要遵守最左前缀法则。最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。如果跳跃某一列，索引将会部分失效(后面的字段索引失效)。 

以 tb_user 表为例，我们先来查看一下之前 tb_user 表所创建的索引。![Image From MySQL-进阶篇](https://img.picgo.net/2023/11/16/Image-From-MySQL-cfc692f75ff2976c.png)

在 tb_user 表中，有一个联合索引，这个联合索引涉及到三个字段，顺序分别为：profession，age，status。

<span style="color:green">对于最左前缀法则指的是，查询时，最左变的列，也就是profession必须存在，否则索引全部失效。而且中间不能跳过某一列，否则该列后面的字段索引将失效。 接下来，我们来演示几组案例，看一下具体的执行计划：</span>

```sql
explain select * from tb_user where profession = '软件工程' and age = 31 and status = '0';
```

```sql
explain select * from tb_user where profession = '软件工程' and age = 31;
```

```sql
explain select * from tb_user where profession = '软件工程';
```

<span style="color:green">以上的这三组测试中，我们发现只要联合索引最左边的字段 profession存在，索引就会生效，只不过索引的长度不同。 而且由以上三组测试，我们也可以推测出profession字段索引长度为47、age字段索引长度为2、status字段索引长度为5。</span>

#### 2.4.3 **范围查询**

联合索引中，出现范围查询(>,<)，范围查询右侧的列索引失效。

```sql
explain select * from tb_user where profession = '软件工程' and age > 30 and status = '0';
```

![Image From MySQL-进阶篇](https://img.picgo.net/2023/11/16/Image-From-MySQL-67ac6d0d3fd6ea84.png)

当范围查询使用>= 或 <= 时，走联合索引了，但是索引的长度为54，就说明所有的字段都是走索引的。所以，在业务允许的情况下，尽可能的使用类似于 >= 或 <= 这类的范围查询，而避免使用 > 或 < 。 

#### 2.4.5 **索引失效情况**

##### 2.4.5.1 **索引列运算**

不要在索引列上进行运算操作， 索引将失效

在tb_user表中，除了前面介绍的联合索引之外，还有一个索引，是phone字段的单列索引

> Demo
>
> A. 当根据phone字段进行等值匹配查询时, 索引生效

```sql
explain select * from tb_user where phone = '17799990015'; -- ok
```

> Demo
>
> B. 当根据phone字段进行函数运算操作之后，索引失效。

```sql
explain select * from tb_user where substring(phone,10,2) = '15'; -- no
```

##### 2.4.5.2  **字符串不加引号**

字符串类型字段使用时，不加引号，索引将失效。

接下来，我们通过两组示例，来看看对于字符串类型的字段，加单引号与不加单引号的区别：

```sql
explain select * from tb_user where profession = '软件工程' and age = 31 and status = '0';-- ok 

explain select * from tb_user where profession = '软件工程' and age = 31 and status = 0; -- no
```

##### 2.4.5.4 **模糊查询**

如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。

```sql
explain select * from tb_user where profession like '软件%';  -- ok
explain select * from tb_user where profession like '%工程'; -- no
explain select * from tb_user where profession like '%工%'; -- no
```

##### 2.4.5.5  **or**连接条件

用or分割开的条件， 如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到

```sql
explain select * from tb_user where id = 10 or age = 23; 
explain select * from tb_user where phone = '17799990017' or age = 23;
```

由于age没有索引，所以即使id、phone有索引，索引也会失效。所以需要针对于age也要建立索引.

然后，我们可以对age字段建立索引

```sql
create index idx_user_age on tb_user(age); 1
```

##### 2.4.5.6 **数据分布影响**

如果MySQL评估使用索引比全表更慢，则不使用索引。

```sql
select * from tb_user where phone >= '17799990005'; 

select * from tb_user where phone >= '17799990015';
```

经过测试我们发现，相同的SQL语句，只是传入的字段值不同，最终的执行计划也完全不一样，这是为什么呢？

就是因为MySQL在查询时，会评估使用索引的效率与走全表扫描的效率，如果走全表扫描更快，则放弃索引，走全表扫描。 因为索引是用来索引少量数据的，如果通过索引查询返回大批量的数据，则还不如走全表扫描来的快，此时索引就会失效。

```sql
explain select * from tb_user where profession is null; 
explain select * from tb_user where profession is not null;
```

接下来，我们做一个操作将profession字段值全部更新为null。

然后，再次执行上述的两条SQL，查看SQL语句的执行计划。

最终我们看到，一模一样的SQL语句，先后执行了两次，结果查询计划是不一样的，为什么会出现这种现象，这是和数据库的数据分布有关系。查询时MySQL会评估，走索引快，还是全表扫描快，如果全表扫描更快，则放弃索引走全表扫描。 因此，is null 、is not null是否走索引，得具体情况具体分析，并不是固定的。

#### 2.4.6 指定索引

当前的情况是:

某一个字段存在联合索引,同时也存在一个单列索引,此时MySQL会自动选择

建议指定索引 use

​	至于用不用 Mysql 说了算

```sql
explain select * from tb_user use index(idx_user_pro) where profession = '软件工 程';
```

忽略指定索引 ignore

```sql
explain select * from tb_user ignore index(idx_user_pro) where profession = '软件工 程';
```

强制指定 force

```sql
explain select * from tb_user force index(idx_user_pro) where profession = '软件工 程';
```

#### 2.4.7 **覆盖索引**

尽量使用覆盖索引，减少select *。 那么什么是覆盖索引呢？ 覆盖索引是指 查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到 。 

```sql
explain select id, profession from tb_user where profession = '软件工程' and age = 31 and status = '0' ; 

explain select id,profession,age, status from tb_user where profession = '软件工程' and age = 31 and status = '0' ; 

explain select id,profession,age, status, name from tb_user where profession = '软 件工程' and age = 31 and status = '0' ; 

explain select * from tb_user where profession = '软件工程' and age = 31 and status = '0';
```

![Image From MySQL-进阶篇](https://img.picgo.net/2023/11/17/Image-From-MySQL-8fbe35a19a4a9f3e.png)

从上述的执行计划我们可以看到，这四条SQL语句的执行计划前面所有的指标都是一样的，看不出来差异。但是此时，我们主要关注的是后面的Extra，前面两天SQL的结果为 Using where; UsingIndex ; 而后面两条SQL的结果为: Using index condition 。

![image-20231117000058199](https://img.picgo.net/2023/11/17/image-202311170000581995671b51c2bffe35c.png)

因为，在tb_user表中有一个联合索引 idx_user_pro_age_sta，该索引关联了三个字段profession、age、status，而这个索引也是一个二级索引，所以叶子节点下面挂的是这一行的主键id。 所以当我们查询返回的数据在 id、profession、age、status 之中，则直接走二级索引直接返回数据了。 如果超出这个范围，就需要拿到主键id，再去扫描聚集索引，再获取额外的数据了，这个过程就是回表。 而我们如果一直使用select * 查询返回所有字段值，很容易就会造成<span style="color:red">回表查询</span>（除非是根据主键查询，此时只会扫描聚集索引）

> 简单的说,回表查询是因为,B+的索引叶子结点没有本次查询的数据,需要查询聚集索引
>
> 而覆盖的索意思是不需要回表,本次所查询的数据都在改二级索引里面的叶子结点中

#### 2.4.8 **前缀索引**

当字段类型为字符串（varchar，text，longtext等）时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO， 影响查询效率。此时可以只将字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

````sql
create index idx_xxxx on table_name(column(n)) ;


create index idx_email_5 on tb_user(email(5)); -- 对 email 字段的 前 5 个字符建立索引
````

#####  前缀长度

可以根据索引的选择性来决定，而选择性是指不重复的索引值（基数）和数据表的记录总数的比值，索引选择性越高则查询效率越高， 唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。

```sql
select count(distinct email) / count(*) from tb_user ; 
select count(distinct substring(email,1,5)) / count(*) from tb_user ;
```

#### 2.4.9 **单列索引与联合索引**

单列索引：即一个索引只包含单个列。

联合索引：即一个索引包含了多个列。

> 在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。

### 2.5 **索引设计原则**

1). 针对于数据量较大，且查询比较频繁的表建立索引。

2). 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。

3). 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。

4). 如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。

5). 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率。

6). 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改的效率。

7). 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询。

## 3.  **SQL**优化

### 3.1 **插入数据**

如果我们需要一次性往数据库表中插入多条记录，可以从以下三个方面进行优化。

```sql
insert into tb_test values(1,'tom'); 
insert into tb_test values(2,'cat'); 
insert into tb_test values(3,'jerry');
```

1. 优化方案

批量插入数据

```sql
Insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry');
```

2) 优化方案二

手动控制事务

```sql
start transaction; 
insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry'); 
insert into tb_test values(4,'Tom'),(5,'Cat'),(6,'Jerry'); 
insert into tb_test values(7,'Tom'),(8,'Cat'),(9,'Jerry'); 
commit;
```

3. 优化方案三

主键顺序插入，性能要高于乱序插入。

```sql
主键乱序插入 : 8 1 9 21 88 2 4 15 89 5 7 3 
主键顺序插入 : 1 2 3 4 5 7 8 9 15 21 88 89
```

#### 3.1.1 **大批量插入数据**

如果一次性需要插入大批量数据(比如: 几百万的记录)，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的load指令进行插入。操作如下：

![image-20231117002245661](https://img.picgo.net/2023/11/17/image-20231117002245661e7394e274c173ebe.png)

可以执行如下指令，将数据脚本文件中的数据加载到表结构中：

主键顺序插入性能高于乱序插入

```sql
-- 客户端连接服务端时，加上参数 -–local-infile 
mysql –-local-infile -u root -p 
-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关 
set global local_infile = 1; 
-- 执行load指令将准备好的数据，加载到表结构中 
load data local infile '/root/sql1.log' into table tb_user fields terminated by ',' lines terminated by '\n' ;
```

### 3.2 **主键优化**

**索引设计原则**

- 满足业务需求的情况下，尽量降低主键的长度。

- 插入数据时，尽量选择顺序插入，选择使用AUTO_INCREMENT自增主键。
- 尽量不要使用UUID做主键或者是其他自然主键，如身份证号。
- 业务操作时，避免对主键的修改。

### 3.3 **order by**优化

MySQL的排序，有两种方式：

Using filesort : 通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区sort buffer中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序。

Using index : 通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高。

对于以上的两种排序方式，Using index的性能高，而Using filesort的性能低，我们在优化排序操作时，尽量要优化为 Using index。



当排序的时候会出现

Extra中出现了 Backward index scan，这个代表反向扫描索引，因为在MySQL中我们创建的索引，默认索引的叶子节点是从小到大排序的，而此时我们查询排序时，是从大到小，所以，在扫描时，就是反向扫描，就会出现 Backward index scan。 在MySQL8版本中，支持降序索引，我们也可以创建降序索引。



排序时,也需要满足最左前缀法则,否则也会出现 filesort。因为在创建索引的时候， age是第一个字段，phone是第二个字段，所以排序时，也就该按照这个顺序来，否则就会出现 Usingfilesort。

#### 创建索引指定 索引的顺序

```sql
create index idx_user_age_phone_ad on tb_user(age asc ,phone desc);
```

A. 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则。

B. 尽量使用覆盖索引。

C. 多字段排序, 一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）。

D. 如果不可避免的出现filesort，大数据量排序时，可以适当增大排序缓冲区大小sort_buffer_size(默认256k)。 

### 3.4 **group by**优化

在分组操作中，我们需要通过以下两点进行优化，以提升性能：

A. 在分组操作时，可以通过索引来提高效率。

B. 分组操作时，索引的使用也是满足最左前缀法则的。

### 3.5 **limit**优化

在数据量比较大时，如果进行limit分页查询，在查询时，越往后，分页查询效率越低。

优化思路: 一般分页查询时，通过创建 覆盖索引 能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化

### 3.6 **count**优化

- MyISAM 引擎把一个表的总行数存在了磁盘上，因此执行 count(*) 的时候会直接返回这个数，效率很高； 但是如果是带条件的count，MyISAM也慢。

- InnoDB 引擎就麻烦了，它执行 count(*) 的时候，需要把数据一行一行地从引擎里面读出来，然后累积计数。

如果说要大幅度提升InnoDB表的count效率，主要的优化思路：自己计数(可以借助于redis这样的数据库进行,但是如果是带条件的count又比较麻烦了)。

![image-20231117003705078](https://img.picgo.net/2023/11/17/image-2023111700370507855ddee070614e0eb.png)

> 按照效率排序的话，count(字段) < count(主键 id) < count(1) ≈ count(*)，所以尽量使用 count(*)。

### 3.7 **update**优化

当我们开启多个事务，在执行上述的SQL时，我们发现行锁升级为了表锁。 导致该update语句的性能大大降低
