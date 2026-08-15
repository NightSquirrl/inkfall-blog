---
title: 🧐 3. SQL 语句
tag:
  - MySql
recommend: 3
---

## 1. DDL

Data Definition Language，数据定义语言，用来定义数据库对象(数据库，表，字段) 。

### 1.1 数据库操作

1. 查询所有数据库

```sql
show databases;
```

2. 查询当前数据库

```sql
select database();
```

3. 创建数据库

> 可以通过if not exists 参数来解决这个问题，数据库不存在, 则创建该数据库，如果存在，则不 创建。

```sql
create database [ if not exists ] 数据库名    [ default charset 字符集    ] [ collate 排序规则    ] ;

create database itheima default charset utf8mb4;
```

4. 删除数据库

```sql
drop database [ if exists ] 数据库名;
```

5. 切换数据库

```sql
use 数据库名;
```

### 1.2 表操作

#### 1.2.1 查询创建

1. 查询当前数据库所有表

```sql
show tables;
```

2. 查看指定表结构

```sql
desc 表名;
```

> 通过这条指令，我们可以查看到指定表的字段，字段的类型、是否可以为NULL，是否存在默认值等信息。![Image From MySQL-基础篇](https://img.picgo.net/2023/11/16/Image-From-MySQL-2e44a1e8453df3e5.png)

3.  查询指定表的建表语句

> 通过这条指令，主要是用来查看建表语句的，而有部分参数我们在创建表的时候，并未指定也会查询 到，因为这部分是数据库的默认值，如：存储引擎、字符集等。

```sql
1   show create table 表名;
```

4. 创建表结构

```sql
CREATE TABLE 表名(
字段1 字段1类型 [ COMMENT 字段1注释 ],
字段2  字段2类型    [COMMENT  字段2注释    ],
字段3  字段3类型    [COMMENT  字段3注释    ],
  ...
字段n 字段n类型 [COMMENT 字段n注释 ]
) [ COMMENT  表注释    ] ;
```

> Demo

```sql
create table tb_user(
	id int comment '编号',
	name varchar(50) comment '姓名',
	age int comment '年龄',
	gender varchar(1) comment '性别'
) comment '用户表';
```

#### 1.2.2 数据类型

在上述的建表语句中，我们在指定字段的数据类型时，用到了int ，varchar，那么在MySQL中除了 以上的数据类型，还有哪些常见的数据类型呢？ 接下来,我们就来详细介绍一下MySQL的数据类型。MySQL中的数据类型有很多，主要分为三类：数值类型、字符串类型、日期时间类型。 

##### 数值类型

| 类型        | 大小 | 有符号(SIGNED)范围                                 | 无符号(UNSIGNED)范围                                   | 描述                  |
| ----------- | ---- | -------------------------------------------------- | ------------------------------------------------------ | --------------------- |
| tinyint     | 1    | (-127,127)                                         | (0，255)                                               | 小整 数值             |
| smallint    | 2    | (-32768,32767)                                     | (0，65535)                                             | 大整数值              |
| mediumint   | 3    | (-8388608，8388607)                                | (0，16777215)                                          | 大整数值              |
| int/integer | 4    | (-2147483648,2147483647)                           | (0，4294967295)                                        | 大整数值              |
| bigint      | 8    | (-2^63，2^63-1)                                    | (0，2^64-1)                                            | 极大整数 值           |
| float       | 4    | (-3.402823466 E+38,3.402823466351 E+38)            | 0 和    (1.175494351 E+38，3.402823466 E+38)           | 单精 度浮 点数 值     |
| double      | 8    | (-1.7976931348623157E+308,1.7976931348623157E+308) | 0和(2.2250738585072014 E-308,1.7976931348623157 E+308) | 双精 度浮 点数 值     |
| Decimal     |      | 依赖于M(精度)和D(标度) <br/>的值                   | 依赖于M(精度)和D(标度)的 <br/>值                       | 小数 值(精 确定 点数) |

##### 字符串类型

| 类型       | 大小        | 描述                         |
| ---------- | ----------- | ---------------------------- |
| char       | 0-255 bytes | 定长字符串(需要指定长度)     |
| varchar    |             | 变长字符串(需要指定长度)     |
| tinyblob   |             | 不超过255个字符的二进制数据  |
| blob       |             | 二进制形式的长文本数据       |
| text       |             | 长文本数据                   |
| mediumblob |             | 二进制形式的中等长度文本数据 |
| mediumtext |             | 中等长度文本数据             |
| Longblob   |             | 二进制形式的极大文本数据     |
| Longtext   |             | 极大文本数据                 |
| Tinytext   |             | 短文本字符串                 |

> char 与 varchar 都可以描述字符串，char是定长字符串，指定长度多长，就占用多少个字符，和 
> 字段值的长度无关 。而varchar是变长字符串，指定的长度为最大占用长度 。相对来说，char的性 
> 能会更高些。

##### 日期类型

| 类型      | 大小 | 范围                                       | 格式                | 描述                      |
| --------- | ---- | ------------------------------------------ | ------------------- | ------------------------- |
| date      | 3    | 1000-01-01 至    9999-12-31                | YYYY-MM-DD          | 日期值                    |
| time      | 3    | -838:59:59 至    838:59:59                 | HH:MM:SS            | 时间值或持续 时间         |
| year      | 1    | 1901 至 2155                               | YYYY                | 年份值                    |
| datetime  | 8    | 1000-01-01 00:00:00 至 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时 间值         |
| Timestamp | 4    | 1970-01-01 00:00:01 至 2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS | 混合日期和时 间值，时间戳 |

#### 1.2.3 修改

1. 添加字段

```sql
ALTER TABLE 表名    ADD  字段名         类型    (长度)  [ COMMENT 注释    ]  [ 约束    ];
```

2. 修改数据类型

```sql
ALTER TABLE 表名    MODIFY  字段名         新数据类型    (长度);
```

3. 修改字段名和字段类型

```sql
ALTER TABLE 表名    CHANGE  旧字段名         新字段名         类型    (长度)  [ COMMENT 注释    ]  [ 约束    ];
```

4. 删除字段

```sql
ALTER TABLE 表名    DROP 字段名;
```

5. 修改表名

```sql
ALTER TABLE 表名    RENAME TO  新表名;
```

#### 1.2.4 删除

1. 删除表

```sql
DROP TABLE [ IF  EXISTS ]  表名;
```

> 可选项     IF EXISTS 代表，只有表名存在时才会删除该表，表名不存在，则不执行删除操作(如果不加该参数项，删除一张不存在的表，执行将会报错)。

2. 删除指定表, 并重新创建表 - 初始化表格

```sql
TRUNCATE TABLE 表名;
truncate table xxx;
```

## 2. DML

DML英文全称是Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进 行增、删、改操作。

- 添加数据（INSERT） 

- 修改数据（UPDATE） 

- 删除数据（DELETE）

### 2.1 添加数据

1. 给指定的字段添加数据

```sql
INSERT INTO 表名    (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);
```

> Demo

```sql
insert into employee(id,workno,name,gender,age,idcard,entrydate) values(1,'1','Itcast','男',10,'123456789012345678','2000-01-01');
```

2. 给全字段添加数据

```sql
insert into 表名 values();
```

3. 批量添加数据

```sql
insert into 表名 values(),();
```

### 2.2 修改数据

```sql
UPDATE 表名 SET 字段名1 = 值1 , 字段名2 = 值2 , .... [ WHERE 条件 ] ;
```

> Demo

```sql
-- 修改id为1的数据，将name修改为itheima
update employee set name = 'itheima' where id = 1;
```

> Tips:
>
> ​	修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据。

### 2.3 删除数据

```sql
DELETE FROM 表名 [ WHERE 条件 ] ; 
```

> Demo

```sql
-- 删除gender为女的员工
delete from employee where gender = '女'; 1
```

## 3. DQL

DQL英文全称是Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中表的记录。

查询关键字: SELECT

在一个正常的业务系统中，查询操作的频次是要远高于增删改的，当我们去访问企业官网、电商网站，在这些网站中我们所看到的数据，实际都是需要从数据库中查询并展示的。而且在查询的过程中，可能还会涉及到条件、排序、分页等操作。

> DQL语句的执行顺序为： from ... where ... group by ...
>
> having ... select ... order by ... limit ...

#### 3.1 **基本语法**

```sql
SELECT
	字段列表 
FROM
	表名列表 
WHERE
	条件列表 
GROUP BY 
	分组字段列表 
HAVING
	分组后条件列表 
ORDER BY 
	排序字段列表 
LIMIT
	分页参数
```

- 基本查询（不带任何条件）

- 条件查询（WHERE）

- 聚合函数（count、max、min、avg、sum）

- 分组查询（group by）

- 排序查询（order by）

- 分页查询（limit） 

#### 3.2 **基础查询**

```sql
SELECT 字段1, 字段2, 字段3 ... FROM 表名 ;
SELECT * FROM 表名 ;
* 号代表查询所有字段，在实际开发中尽量少用（不直观、影响效率）。
```

**字段设置别名**

```sql
SELECT 字段1 [ AS 别名1 ] , 字段2 [ AS 别名2 ] ... FROM 表名;
SELECT 字段1 [ 别名1 ] , 字段2 [ 别名2 ] ... FROM 表名;
```

**去除重复记录**

```sql
SELECT DISTINCT 字段列表 FROM 表名;
distinct
```

#### 3.3 **条件查询**

```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表 ;
```

比较运算符

​	>

​	<=

​	<

​	<=

​	=

​	<>   !=  不等于

​	between and

​	in()

​	like   模糊匹配  _ 单个字符 %任意字符

​	is null

逻辑运算符

​	and &&

​	or || 

​	not !

> Demo

```sql
-- 查询身份证号最后一位是X的员工信息
select * from emp where idcard like '%X'; 
select * from emp where idcard like '_________________X';
```

#### 3.4 **聚合函数**

将一列数据作为一个整体，进行纵向计算 。

##### 3.4.1 常见聚合函数

count max min avg sum

```sql
SELECT 聚合函数(字段列表) FROM 表名 ;
```

> Demo
>
> 统计该企业员工的平均年龄

```sql
select avg(age) from emp;
```

#### 3.5 **分组查询**

```sql
SELECT 字段列表 FROM 表名 [ WHERE 条件 ] GROUP BY 分组字段名 [ HAVING 分组 后过滤条件 ];
```

#####  where与having区别

- 执行时机不同：where是分组之前进行过滤，不满足where条件，不参与分组；而having是分组之后对结果进行过滤。

- 判断条件不同：where不能对聚合函数进行判断，而having可以

> Tips:
>
> ​	注意事项:
>
> ​		• 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义。
>
> ​		• 执行顺序: where > 聚合函数 > having 。
>
> ​		• 支持多字段分组, 具体语法为 : group by columnA,columnB

> Demo
>
>  根据性别分组 , 统计男性员工 和 女性员工的数量
>
> 
>
>  统计各个工作地址上班的男性及女性员工的数量
>
> 
>
> 查询年龄小于45的员工 , 并根据工作地址分组 , 获取员工数量大于等于3的工作地址

```sql
select gender, count(*) from emp group by gender ;

select workaddress, gender, count(*) '数量' from emp group by gender , workaddress ;

select workaddress, count(*) address_count from emp where age < 45 group by workaddress having address_count >= 3;
```

#### 3.6 **排序查询**

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1 , 字段2 排序方式2 ;
```

- ASC : 升序(默认值)

- DESC: 降序

> Tips
>
> ​	注意事项：
>
> ​		• 如果是升序, 可以不指定排序方式ASC ;
>
> ​		• 如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序 ;



#### 3.7 **分页查询**

分页操作在业务系统开发时，也是非常常见的一个功能，我们在网站中看到的各种各样的分页条，后台都需要借助于数据库的分页操作。

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数 ;
```

> Tip:
>
> ​	注意事项:
>
> ​		• 起始索引从0开始，起始索引 = （查询页码 - 1）* 每页显示记录数。
>
> ​		• 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是LIMIT。
>
> ​		• 如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 10。

> Demo
>
> 查询第2页员工数据, 每页展示10条记录 --------> (页码-1)*页展示记录数

```sql
select * from emp limit 10,10;
```

## 4. DCL

DCL英文全称是**Data Control Language**(数据控制语言)，用来管理数据库用户、控制数据库的访问权限。

### 4.1 **管理用户**

1.  查询用户

```sql
select * from mysql.user;

-- 其中 Host代表当前用户访问的主机, 如果为localhost, 仅代表只能够在当前本机访问，是不可以远程访问的。 User代表的是访问该数据库的用户名。在MySQL中需要通过Host和User来唯一标识一个用户
```

2.  创建用户

```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
```

3. 修改用户密码

```sql
ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码' ;
```

4.  删除用户

```sql
DROP USER '用户名'@'主机名' ;
```

> Tips:
>
> ​	• 在MySQL中需要通过用户名@主机名的方式，来唯一标识一个用户。
>
> ​	• 主机名可以使用 % 通配。
>
> ​	• 这类SQL开发人员操作的比较少，主要是DBA（Database Administrator 数据库管理员）使用

### 4.2 **权限控制**

| 权限               | 说明               |      |
| ------------------ | ------------------ | ---- |
| all,all privileges | 所有权限           |      |
| select             | 查询数据           |      |
| insert             | 插入数据           |      |
| update             | 修改数据           |      |
| alter              | 修改表             |      |
| drop               | 删除数据库/表/视图 |      |
| Create             | 创建数据库/表      |      |
| 1. 查询权限        |                    |      |

```sql
SHOW GRANTS FOR '用户名'@'主机名' ;
```

2.  授予权限

```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
```

3.  撤销权限

```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

> Tips:
>
> ​	• 多个权限之间，使用逗号分隔
>
> ​	• 授权时， 数据库名和表名可以使用 * 进行通配，代表所有

## 5. 函数

函数 是指一段可以直接被另一段程序调用的程序或代码。 也就意味着，这一段程序或代码在MySQL中已经给我们提供了，我们要做的就是在合适的业务场景调用对应的函数完成对应的业务需求即可。

### 5.1 **字符串函数**

| 函数                     | 功能                                                      |      |
| ------------------------ | --------------------------------------------------------- | ---- |
| concat(s1,s2,s3,...sn)   | 字符串拼接,将s1,s2,s3拼接为一个字符串                     |      |
| lower(str)               | 将字符串 str 全部转换为小写                               |      |
| upper(str)               | 将字符串 srt 全部转换为大写                               |      |
| Lpad(str,n,pad)          | 左填充，用字符串pad对str的左边进行填充，达到n个字符串长度 |      |
| Rpad(str,n,pad)          | 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度 |      |
| trim(str)                | 去掉字符串头部和尾部的空格                                |      |
| Substring(str,start,len) | 返回从字符串str从start位置起的len个长度的字符串           |      |

### 5.2 **数值函数**

| 函数       | 功能                                 |
| ---------- | ------------------------------------ |
| Ceil(x)    | 向上取整                             |
| Floor(x)   | 向下取整                             |
| Mod(x,y)   | 返回 x/y 的模                        |
| Rand()     | 返回 0~1 的随机数                    |
| Round(x,y) | 求参数 x 的四舍五入的值保留 y 位小数 |

### 5.3 **日期函数**

| 函数                             | 功能                                              |
| -------------------------------- | ------------------------------------------------- |
| Curdate()                        | 返回当前的日期                                    |
| Curtime()                        | 返回当前的时间                                    |
| Now()                            | 返回当前的日期和时间                              |
| Year(date)                       | 获取指定 date 的年份                              |
| Month(date)                      | 获取指定 date 的月份                              |
| Day(date)                        | 获取指定date的日期                                |
| Date_add(date,interval exprtype) | 返回一个日期/时间值加上一个时间间隔expr后的时间值 |
| Dateiff(date1,date2)             | 返回起始时间date1 和 结束时间date2之间的天数      |

### 5.4 **流程函数**

| 函数                                                   | 功能                                                |
| ------------------------------------------------------ | --------------------------------------------------- |
| IF(value , t , f)                                      | 如果value为true，则返回t，否则返回f                 |
| IFNULL(value1 , value2)                                | 如果value1不为空，返回value1，否则返回value2        |
| CASE WHEN [ val1 ] THEN [res1] ...ELSE [ default ] END | 如果val1为true，返回res1，... 否则返回default默认值 |
| CASE [ expr ] WHEN [ val1 ] THEN                       | 如果expr的值等于val1，返回                          |

## 6. **约束**

概念：约束是作用于表中字段上的规则，用于限制存储在表中的数据。

目的：保证数据库中数据的正确、有效性和完整性

| 约束                     | 描述                                           | 关键字      |
| ------------------------ | ---------------------------------------------- | ----------- |
| 非空约束                 | 限制该字段的数据不能为null                     | NOT NULL    |
| 唯一约束                 | 保证该字段的所有数据都是唯一、不重复的         | UNIQUE      |
| 主键约束                 | 主键是一行数据的唯一标识，要求非空且唯一       | PRIMARY KEY |
| 默认约束                 | 保存数据时，如果未指定该字段的值，则采用默认值 | DEFAULT     |
| 检查约束(8.0.16版本之后) | 保证字段值满足某一个条件                       | CHECK       |
| 外键约束                 | 用来让两张表的数据之间建立连接，保证数据的一致 | FOREIGN     |

> Demo

![image-20231116210042873](https://img.picgo.net/2023/11/16/image-202311162100428732ad3b0aab4b8c7ab.png)

```sql
CREATE TABLE tb_user( 
  id int AUTO_INCREMENT PRIMARY KEY COMMENT 'ID唯一标识', 
  name varchar(10) NOT NULL UNIQUE COMMENT '姓名' , 
  age int check (age > 0 && age <= 120) COMMENT '年龄' , 
  status char(1) default '1' COMMENT '状态', 
  gender char(1) COMMENT '性别' 
);
```

![image-20231116210118671](https://img.picgo.net/2023/11/16/image-20231116210118671e9b187b03b3347fb.png)

### 6.1 外键约束

外键：用来让两张表的数据之间建立连接，从而保证数据的一致性和完整性。

![image-20231116210218417](https://img.picgo.net/2023/11/16/image-20231116210218417f2a83904abf33f2d.png)

```sql
-- 创建外键
CREATE TABLE 表名( 
  字段名 数据类型, 
  ... 
  [CONSTRAINT] [外键名称] FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名) 
);

-- 删除外键
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名) ;

constraint references

-- Demo
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id);

-- 删除外键
ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;

-- Demo
alter table emp drop foreign key fk_emp_dept_id; 
```

#### 6.1.1  **删除****/****更新行为**

添加了外键之后，再删除父表数据时产生的约束行为，我们就称为删除/更新行为。具体的删除/更新行

为有以下几种:

| 行为        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| no action   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。 (与 RESTRICT 一致) 默认行为 |
| Restrict    | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。 (与 NO ACTION 一致) 默认行为 |
| cascade     | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录。 |
| set null    | 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（这就要求该外键允许取null）。 |
| set default | 父表有变更时，子表将外键列设置成一个默认的值 (Innodb不支持)  |

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES 主表名 (主表字段名) ON UPDATE CASCADE ON DELETE CASCADE;


-- Demo
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id) on update cascade on delete cascade ;
```

## 7. **多表查询**

> 多表查询就是指从多张表中查询数据。
>
> 原来查询单表数据，执行的SQL形式为：select * from emp;
>
> 那么我们要执行多表查询，就只需要使用逗号分隔多张表即可，如： select * from emp , dept;
>
> 假设 :
>
> 此时,我们看到查询结果中包含了大量的结果集，总共102条记录，而这其实就是员工表emp所有的记录
>
> (17) 与 部门表dept所有记录(6) 的所有组合情况，这种现象称之为笛卡尔积。接下来，就来简单
>
> 介绍下笛卡尔积。笛卡尔积: 笛卡尔乘积是指在数学中，两个集合A集合 和 B集合的所有组合情况。
>
> 
>
> 而在多表查询中，我们是需要消除无效的笛卡尔积的，只保留两张表关联部分的数据。
>
> 
>
> 我们可以给多表查询加上连接查询的条件即可。
>
> select * from emp , dept where emp.dept_id = dept.id;
>
> 而由于id为17的员工，没有dept_id字段值，所以在多表查询时，根据连接查询的条件并没有查询
>
> 到。



### 7.1 **多表关系**

项目开发中，在进行数据库表结构设计时，会根据业务需求及业务模块之间的关系，分析并设计表结

构，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本上分为三种：

- 一对多(多对一)

- 多对多

- 一对一

#### 7.1.1 **一对多**

- 案例: 部门 与 员工的关系

- 关系: 一个部门对应多个员工，一个员工对应一个部门

- 实现: 在多的一方建立外键，指向一的一方的主键

![image-20231116211831727](https://img.picgo.net/2023/11/16/image-20231116211831727be871df607835d30.png)

#### 7.1.2 **多对多**

- 案例: 学生 与 课程的关系

- 关系: 一个学生可以选修多门课程，一门课程也可以供多个学生选择

- 实现: 建立第三张中间表，中间表至少包含两个外键，分别关联两方主键

![image-20231116211916447](https://img.picgo.net/2023/11/16/image-20231116211916447392fc6f7515e831f.png)

#### 7.1.3  **一对一**

- 案例: 用户 与 用户详情的关系

- 关系: 一对一关系，多用于单表拆分，将一张表的基础字段放在一张表中，其他详情字段放在另一张表中，以提升操作效率

- 实现: 在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(UNIQUE)

![image-20231116212244498](https://img.picgo.net/2023/11/16/image-202311162122444980a4b496f258eee5d.png)

#### 7.1.4 多表查询的分类

- 连接查询
  - 内连接：相当于查询A、B交集部分数据
  - 外连接：
  - 左外连接：查询左表所有数据，以及两张表交集部分数据
  - 右外连接：查询右表所有数据，以及两张表交集部分数据
  - 自连接：当前表与自身的连接查询，自连接必须使用表别名

### 7.2 **内连接**

内连接的语法分为两种: 隐式内连接、显式内连接。先来学习一下具体的语法结构。

1.  隐式内连接

```sql
SELECT 字段列表 FROM 表1 , 表2 WHERE 条件 ... ;
```

2. 显式内连接

```sql
SELECT 字段列表 FROM 表1 [ INNER ] JOIN 表2 ON 连接条件 ... ;
```

> Demo
>
>  查询每一个员工的姓名 , 及关联的部门的名称 (隐式内连接实现)
>
>  表结构: emp , dept
>
>  连接条件: emp.dept_id = dept.id

```sql
select emp.name , dept.name from emp , dept where emp.dept_id = dept.id ; 
-- 为每一张表起别名,简化SQL编写 
select e.name,d.name from emp e , dept d where e.dept_id = d.id;
```

> Demo
>
>  查询每一个员工的姓名 , 及关联的部门的名称 (显式内连接实现) --- INNER JOIN ...
>
> ON ...
>
>  表结构: emp , dept
>
>  连接条件: emp.dept_id = dept.id

```sql
select e.name, d.name from emp e inner join dept d on e.dept_id = d.id; 
-- 为每一张表起别名,简化SQL编写 
select e.name, d.name from emp e join dept d on e.dept_id = d.id;
```

### 7.3 **外连接**

#### 7.3.1 左外连接

```sql
SELECT 字段列表 FROM 表1 LEFT [ OUTER ] JOIN 表2 ON 条件 ... ;
```

左外连接相当于查询表1(左表)的所有数据，当然也包含表1和表2交集部分的数据。

#### 7.3.2 右外连接

```sql
SELECT 字段列表 FROM 表1 RIGHT [ OUTER ] JOIN 表2 ON 条件 ... ;
```

右外连接相当于查询表2(右表)的所有数据，当然也包含表1和表2交集部分的数据。

> Demo
>
> 查询emp表的所有数据, 和对应的部门信息
>
>  由于需求中提到，要查询emp的所有数据，所以是不能内连接查询的，需要考虑使用外连接查询。
>
>  表结构: emp, dept
>
>  连接条件: emp.dept_id = dept.id

```sql
select e.*, d.name from emp e left outer join dept d on e.dept_id = d.id; 
select e.*, d.name from emp e left join dept d on e.dept_id = d.id;
```

> 查询dept表的所有数据, 和对应的员工信息(右外连接)
>
> 由于需求中提到，要查询dept表的所有数据，所以是不能内连接查询的，需要考虑使用外连接查询。
>
>  表结构: emp, dept
>
>  连接条件: emp.dept_id = dept.id

```sql
select d.*, e.* from emp e right outer join dept d on e.dept_id = d.id; 
select d.*, e.* from dept d left outer join emp e on e.dept_id = d.id;
```

> Tips
>
> ​	注意事项：
>
> ​		左外连接和右外连接是可以相互替换的，只需要调整在连接查询时SQL中，表结构的先后顺序就可以了。而我们在日常开发使用时，更偏向于左外连接。

### 7.4  **自连接** 

#### 7.4.1 自连接查询

```sql
SELECT 字段列表 FROM 表A 别名A JOIN 表A 别名B ON 条件 ... ;
```

> Demo
>
>  查询员工 及其 所属领导的名字
>
>  表结构: emp

```sql
select a.name , b.name from emp a , emp b where a.managerid = b.id;
```

> Demo
>
> 查询所有员工 emp 及其领导的名字 emp , 如果员工没有领导, 也需要查询出来
>
>  表结构: emp a , emp b 

```sql
select a.name '员工', b.name '领导' from emp a left join emp b on a.managerid = b.id;
```

> Tips:
>
> ​	在自连接查询中，必须要为表起别名，要不然我们不清楚所指定的条件、返回的字段，到底是哪一张表的字段



#### 7.4.2 **联合查询**

对于union查询，就是把多次查询的结果合并起来，形成一个新的查询结果集。

```sql
SELECT 字段列表 FROM 表A ... 
UNION [ ALL ] 
SELECT 字段列表 FROM 表B ....;
```

- 对于联合查询的多张表的列数必须保持一致，字段类型也需要保持一致。

- union all 会将全部的数据直接合并在一起，union 会对合并之后的数据去重。

> Demo
>
>  将薪资低于 5000 的员工 , 和 年龄大于 50 岁的员工全部查询出来.
>
> 当前对于这个需求，我们可以直接使用多条件查询，使用逻辑运算符 or 连接即可。 那这里呢，我们
>
> 也可以通过union/union all来联合查询. 

```sql
select * from emp where salary < 5000 
union all 
select * from emp where age > 50;


-- 去重

select * from emp where salary < 5000 
union 
select * from emp where age > 50;
```

### 7.5 子查询

SQL语句中嵌套SELECT语句，称为嵌套查询，又称子查询。

```sql
SELECT * FROM t1 WHERE column1 = ( SELECT column1 FROM t2 );
```

子查询外部的语句可以是INSERT / UPDATE / DELETE / SELECT 的任何一个。

#### 7.5.1  分类

根据子查询结果不同，分为：

A. 标量子查询（子查询结果为单个值）

B. 列子查询(子查询结果为一列)

C. 行子查询(子查询结果为一行)

D. 表子查询(子查询结果为多行多列)



根据子查询位置，分为：

A. WHERE之后

B. FROM之后

C. SELECT之后

#### 7.5.2 **标量子查询**

子查询返回的结果是单个值（数字、字符串、日期等），最简单的形式，这种子查询称为标量子查询。

常用的操作符：= <> > >= < <= 

> 查询 "销售部" 的所有员工信息
>
> 完成这个需求时，我们可以将需求分解为两步：
>
> ①. 查询 "销售部" 部门ID
>
> ②. 根据 "销售部" 部门ID, 查询员工信息

```sql
select * from emp where dept_id = (select id from dept where name = '销售部');
```

#### 7.5.3 **列子查询**

子查询返回的结果是一列（可以是多行），这种子查询称为列子查询。

常用的操作符：IN 、NOT IN 、 ANY 、SOME 、 ALL

| 操作符 | 描述                                   |
| ------ | -------------------------------------- |
| in     | 在指定的集合范围之内，多选一           |
| not in | 不在指定的集合范围之内                 |
| any    | 子查询返回列表中，有任意一个满足即可   |
| some   | 与ANY等同，使用SOME的地方都可以使用ANY |
| All    | 子查询返回列表的所有值都必须满足       |

> Demo
>
>  查询 "销售部" 和 "市场部" 的所有员工信息
>
> 分解为以下两步: 
>
> ①. 查询 "销售部" 和 "市场部" 的部门ID
>
> ②. 根据部门ID, 查询员工信息

```sql
select id from dept where name = '销售部' or name = '市场部';

select * from emp where dept_id in (select id from dept where name = '销售部' or name = '市场部');
```

#### 7.5.4 **行子查询**

子查询返回的结果是一行（可以是多列），这种子查询称为行子查询。

常用的操作符：= 、<> 、IN 、NOT IN

> Demo
>
> 案例:
>
> A. 查询与 "张无忌" 的薪资及直属领导相同的员工信息 ;
>
> 这个需求同样可以拆解为两步进行: 
>
> ①. 查询 "张无忌" 的薪资及直属领导
>
> ②. 查询与 "张无忌" 的薪资及直属领导相同的员工信息 ;

```sql
select salary, managerid from emp where name = '张无忌'; 


select * from emp where (salary,managerid) = (select salary, managerid from emp where name = '张无忌');
```

#### 7.5.5 表子查询

子查询返回的结果是多行多列，这种子查询称为表子查询。

常用的操作符：IN

> Demo
>
>  查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息
>
> 分解为两步执行: 
>
> ①. 查询 "鹿杖客" , "宋远桥" 的职位和薪资
>
> ②. 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息

```sql
select job, salary from emp where name = '鹿杖客' or name = '宋远桥';
```

## 8. 事务

事务 是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系

统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

就比如: 张三给李四转账1000块钱，张三银行账户的钱减少1000，而李四银行账户的钱要增加

1000。 这一组操作就必须在一个事务的范围内，要么都成功，要么都失败。



正常情况: 转账这个操作, 需要分为以下这么三步来完成 , 三步完成之后, 张三减少1000, 而李四

增加1000, 转账成功 : 



异常情况: 转账这个操作, 也是分为以下这么三步来完成 , 在执行第三步是报错了, 这样就导致张

三减少1000块钱, 而李四的金额没变, 这样就造成了数据的不一致, 就出现问题了



为了解决上述的问题，就需要通过数据的事务来完成，我们只需要在业务逻辑执行之前开启事务，执行

完毕后提交事务。如果执行过程中报错，则回滚事务，把数据恢复到事务开始之前的状态。



> Tips:
>
> ​	注意： 默认MySQL的事务是自动提交的，也就是说，当执行完一条DML语句时，MySQL会立即隐式的提交事务

### 事务常用的命令

```sql
-- 查看/设置事务提交方式
SELECT @@autocommit ; 
SET @@autocommit = 0 ;

--  提交事务
COMMIT;

--  回滚事务
ROLLBACK;

-- 开启事务
START TRANSACTION 或 BEGIN ;
```





> Demo
>
> 转账案例

```sql
-- 开启事务 
start transaction 
-- 1. 查询张三余额 
select * from account where name = '张三'; 
-- 2. 张三的余额减少1000 
update account set money = money - 1000 where name = '张三'; 
-- 3. 李四的余额增加1000 
update account set money = money + 1000 where name = '李四'; 
-- 如果正常执行完毕, 则提交事务 
commit; 
-- 如果执行过程中报错, 则回滚事务 
-- rollback;
```

### **事务四大特性**

原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。

一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态。

隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立

环境下运行。

持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

上述就是事务的四大特性，简称ACID

### **并发事务问题**

1. 赃读：一个事务读到另外一个事务还没有提交的数据

![image-20231116222144321](https://img.picgo.net/2023/11/16/image-2023111622214432186cf564a75d3364c.png)

2.  不可重复读：一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读。

![image-20231116222219627](https://img.picgo.net/2023/11/16/image-20231116222219627d9c84f3040bf353a.png)

事务A两次读取同一条记录，但是读取到的数据却是不一样的。

3.  幻读：一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据

   已经存在，好像出现了 "幻影"。

![image-20231116222300541](https://img.picgo.net/2023/11/16/image-20231116222300541c831b7bd33509a12.png)

#### **事务隔离级别**

| 隔离级别                          | 脏读 | 不可重复读 | 幻读 |
| --------------------------------- | ---- | ---------- | ---- |
| **Read uncommitted**              | ✅    | ✅          | ✅    |
| **Read committed**                | ❌    | ✅          | ✅    |
| **Repeatable Read(****默认****)** | ❌    | ❌          | ✅    |
| **Serializable**                  | ❌    | ❌          | ❌    |



#### 事物隔离SQL

注意：事务隔离级别越高，数据越安全，但是性能越低。

```sql
--  查看事务隔离级别
SELECT @@TRANSACTION_ISOLATION;
select @@transaction_isolation;

-- 设置事务隔离级别

SET [ SESSION | GLOBAL ] TRANSACTION ISOLATION LEVEL { READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE }

set [session | global] transaction isolatio level {read uncommitted | read committed | repeatable read | serializable }
```

































