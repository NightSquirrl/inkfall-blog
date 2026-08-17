---
title: 7.springboot-AOP
description: 7.springboot-AOP
publishedAt: 2026-08-16
category: JavaWeb
tags:
  - SpringBoot
  - JavaWeb
draft: false
---

## 1. 事务管理



事务的操作主要有三步：

1. 开启事务（一组操作开始前，开启事务）：start transaction / begin ;

2. 提交事务（这组操作全部成功后，提交事务）：commit ;

3. 回滚事务（中间任何一个操作出现异常，回滚事务）：rollback ;

### 1.1 **Spring**事务管理

#### **Transactional**注解

> @Transactional作用：就是在当前这个方法执行开始之前来开启事务，方法执行完毕之后提交事务。如果在这个方法执行的过程当中出现了异常，就会进行事务的回滚操作。
>
> @Transactional注解：我们一般会在业务层当中来控制事务，因为在业务层当中，一个业务功能可能会包含多个数据访问的操作。在业务层来控制事务，我们就可以将多个数据访问操作控制在一个事务范围内。

@Transactional注解书写位置：

- 方法
  - 当前方法交给spring进行事务管理

- 类
  - 当前类中所有的方法都交由spring进行事务管理

- 接口
  - 接口下所有的实现类当中所有的方法都交给spring 进行事务管理

> Demo

```java
@Slf4j
@Service
public class DeptServiceImpl implements DeptService {
  @Autowired
  private DeptMapper deptMapper;
  @Autowired
  private EmpMapper empMapper;
  @Override
  @Transactional //当前方法添加了事务管理
  public void delete(Integer id){
    //根据部门id删除部门信息
    deptMapper.deleteById(id);
    //模拟：异常发生
    int i = 1/0;
    //删除部门下的所有员工信息
    empMapper.deleteByDeptId(id); 
  }
}
```

#### 事物进阶

前面我们通过spring事务管理注解@Transactional已经控制了业务层方法的事务。接下来我们要来详细的介绍一下@Transactional事务管理注解的使用细节。我们这里主要介绍@Transactional注解当中的两个常见的属性：

1. 异常回滚的属性：rollbackFor

2. 事务传播行为：propagation

##### rollbackFor

> 需要注意的是
>
> 只有有出现RuntimeException(运行时异常)才会回滚事务。
>
> 通过配置 `@Transactional(rollbackFor=Exception.class)` 实现所有异常的回滚

##### propagation

> 当 A 方法和 B 方法他们自身都有自己的事物的时候,当 A 方法调用 B方法的时候,A 方法出现失误的回滚如何控制这两个事物呢

![image-20231118202721928](https://img.picgo.net/2023/11/18/image-202311182027219288e094ed7b6dbaf97.png)

required:

将两个事物合并为一个事物,当其中的一个发生了事物的回滚行为,会同时进行回滚

`Propagation.REQUIRES_NEW ：`不论是否有事务，都创建新事务 ，运行在一个独立的事

务中。

>` @Transactional(propagation = Propagation.REQUIRES_NEW)//事务传播行为：不论是否有事务，都新建事务`

## 2. AOP

### **2.1 AOP**概述

什么是AOP？

​	AOP英文全称：Aspect Oriented Programming（面向切面编程、面向方面编程），其实说白了，面向切面编程就是面向特定方法编程。

AOP的作用：在程序运行期间在不修改源代码的基础上对已有方法进行增强（无侵入性: 解耦）

> 简单的说就是方法的代理

> AOP的优势：
>
> 1. 减少重复代码
>
> 2. 提高开发效率
>
> 3. 维护方便

### **2.2 AOP**快速入门**实现步骤：**

1. 导入依赖：在pom.xml中导入AOP的依赖

2. 编写AOP程序：针对于特定方法根据业务需要进行编程

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```



> Demo

#### AOP程序：TimeAspect

```java
@Component
@Aspect //当前类为切面类
@Slf4j
public class TimeAspect {
  @Around("execution(* com.itheima.service.*.*(..))")
  public Object recordTime(ProceedingJoinPoint pjp) throws
    Throwable {
    //记录方法执行开始时间
    long begin = System.currentTimeMillis();
    //执行原始方法
    Object result = pjp.proceed();
    //记录方法执行结束时间
    long end = System.currentTimeMillis();
    //计算方法执行耗时
    log.info(pjp.getSignature()+"执行耗时: {}毫秒",end-begin);
    return result;
  }
}
```

### 2.3 AOP核心概念

#### 连接点：JoinPoint，

可以被AOP控制的方法（暗含方法执行时的相关信息）

连接点指的是可以被aop控制的方法。例如：入门程序当中所有的业务方法都是可以被aop控制的

方法。

#### 通知：Advice，指哪些重复的逻辑，也就是共性功能（最终体现为一个方法）

在入门程序中是需要统计各个业务方法的执行耗时的，此时我们就需要在这些业务方法运行开始之前，先记录这个方法运行的开始时间，在每一个业务方法运行结束的时候，再来记录这个方法运行的结束时间。

但是在AOP面向切面编程当中，我们只需要将这部分重复的代码逻辑抽取出来单独定义。抽取出来的这一部分重复的逻辑，也就是共性的功能。

####  **切入点：**PointCut，匹配连接点的条件，通知仅会在切入点方法执行时被应用

在通知当中，我们所定义的共性功能到底要应用在哪些方法上？此时就涉及到了切入点pointcut概念。切入点指的是匹配连接点的条件。通知仅会在切入点方法运行时才会被应用。在aop的开发当中，我们通常会通过一个切入点表达式来描述切入点(后面会有详解)。

####  **切面：**Aspect，描述通知与切入点的对应关系（通知+切入点）

当通知和切入点结合在一起，就形成了一个切面。通过切面就能够描述当前aop程序需要针对于哪个原始方法，在什么时候执行什么样的操作。

####  **目标对象：**Target，通知所应用的对象

目标对象指的就是通知所应用的对象，我们就称之为目标对象。



## 3. 事物进阶

AOP的基础知识学习完之后，下面我们对AOP当中的各个细节进行详细的学习。主要分为4个部分：

1. 通知类型

2. 通知顺序

3. 切入点表达式

4. 连接点

### 3.1 通知类型

 @Around：环绕通知，此注解标注的通知方法在目标方法前、后都被执行

@Before：前置通知，此注解标注的通知方法在目标方法前被执行

@After ：后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行

@AfterReturning ： 返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行

@AfterThrowing ： 异常后通知，此注解标注的通知方法发生异常后执行



```java
@Slf4j
@Component
@Aspect
public class MyAspect1 {
  //前置通知
  @Before("execution(* com.itheima.service.*.*(..))")
  public void before(JoinPoint joinPoint){
    log.info("before ...");
  }
  //环绕通知
  @Around("execution(* com.itheima.service.*.*(..))")
  public Object around(ProceedingJoinPoint proceedingJoinPoint)
    throws Throwable {
    log.info("around before ...");
    //调用目标对象的原始方法执行
    Object result = proceedingJoinPoint.proceed();
    //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了
    log.info("around after ...");
    return result;
  }
  //后置通知
  @After("execution(* com.itheima.service.*.*(..))")
  public void after(JoinPoint joinPoint){
    log.info("after ...");
  }
  //返回后通知（程序在正常执行的情况下，会执行的后置通知）
  @AfterReturning("execution(* com.itheima.service.*.*(..))")
  public void afterReturning(JoinPoint joinPoint){
    log.info("afterReturning ...");
  }
  //异常通知（程序在出现异常的情况下，执行的后置通知）
  @AfterThrowing("execution(* com.itheima.service.*.*(..))")
  public void afterThrowing(JoinPoint joinPoint){
    log.info("afterThrowing ...");
  }
}
```

### 3.2 抽取切入点表达式

```java
//切入点方法（公共的切入点表达式）
@Pointcut("execution(* com.itheima.service.*.*(..))")
private void pt(){}

// 调用

@Before("pt()")
```

### 3.3 **通知顺序**

默认按照切面类的类名字母排序：

​	目标方法前的通知方法：字母排名靠前的先执行

​	目标方法后的通知方法：字母排名靠前的后执行

如何控制顺序:

1. 修改切面类的类名（这种方式非常繁琐、而且不便管理）

2. 使用Spring提供的@Order注解

```java
@Slf4j
@Component
@Aspect
@Order(2) //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小
越后执行）
  public class MyAspect2 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
      log.info("MyAspect2 -> before ...");
    }
    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
      log.info("MyAspect2 -> after ...");
    }
  }
```

> 通知的执行顺序大家主要知道两点即可：
>
> 1. 不同的切面类当中，默认情况下通知的执行顺序是与切面类的类名字母排序是有关系的
>
> 2. 可以在切面类上面加上@Order注解，来控制不同的切面类通知的执行顺序

### 3.4 **切入点表达式**

#### 3.4.1 **execution**

execution主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

> execution(访问修饰符? 返回值 包名.类名.?方法名(方法参数) throws 异常?) 

其中带 ? 的表示可以省略的部分

- 访问修饰符：可省略（比如: public、protected）

- 包名.类名： 可省略

- throws 异常：可省略（注意是方法上声明抛出的异常，不是实际抛出的异常）

可以使用通配符描述切入点

\* ：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分

.. ：多个连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数



##### 省略方法的修饰符号

> `execution(voidcom.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))`

##### 使用 * 代替返回值类型

> `execution(*com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))`

##### 使用 * 代替包名（一层包使用一个 * ）

> `execution(*com.itheima.*.*.DeptServiceImpl.delete(java.lang.Integer))`

##### 使用 .. 省略包名

> `execution(* com..DeptServiceImpl.delete(java.lang.Integer))`

##### 使用 * 代替类名

> `execution(* com..*.delete(java.lang.Integer)) `

##### 使用 * 代替方法名

> `execution(* com..*.*(java.lang.Integer)) `

##### 使用 * 代替参数

> `execution(* com.itheima.service.impl.DeptServiceImpl.delete(*)) `

##### 使用 .. 省略参数

> `execution(* com..*.*(..)) `

注意事项：

根据业务需要，可以使用 且（&&）、或（||）、非（!） 来组合比较复杂的切入点表达式。

> `execution(* com.itheima.service.DeptService.list(..)) ||`
>
> `execution(* com.itheima.service.DeptService.delete(..))`

#### 3.4.2 **@annotation**

1. 编写自定义注解

2. 在业务类要做为连接点的方法上添加自定义注解

##### **自定义注解**：MyLog

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyLog {
}
```

##### **业务类**：DeptServiceImpl 

```java
@MyLog //自定义注解（表示：当前方法属于目标方法）
public List<Dept> list() {
  List<Dept> deptList = deptMapper.list();
  //模拟异常
  //int num = 10/0;
  return deptList;
}
```

##### **切面类**

```java
//前置通知
@Before("@annotation(com.itheima.anno.MyLog)")
```

#### 3.4.3  **连接点**

在Spring中用JoinPoint抽象了连接点，用它可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等。

- 对于@Around通知，获取连接点信息只能使用ProceedingJoinPoint类型

- 对于其他四种通知，获取连接点信息只能使用JoinPoint，它是ProceedingJoinPoint的父类型

































