---
title: 😤 3.SpringBootWeb 请求响应
tag:
  - SpringBoot
  - JavaWeb
recommend: 3
---

> @RestController
>
> @RequestMapping("/simpleParam")
>
> @RequestParam("name") 
>
> ​	@RequestParam(name = "name", required =false,defaultValue = "1") String username
>
> @DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") LocalDateTime updateTime
>
> @RequestBody
>
> @PathVariable Integer id

## 1. 请求

### 1.1 简单的参数

在Springboot的环境中，对原始的API进行了封装，接收参数的形式更加简单。 如果是简单参数，参数名与形参变量名相同，定义同名的形参即可接收参数。

```java
@RestController
public class RequestController {
  // http://localhost:8080/simpleParam?name=Tom&age=10
  // 第1个请求参数： name=Tom 参数名:name，参数值:Tom
  // 第2个请求参数： age=10 参数名:age , 参数值:10
  //springboot方式
  @RequestMapping("/simpleParam")
  public String simpleParam(String name , Integer age ){//形参名和
    请求参数名保持一致
      System.out.println(name+" : "+age);
    return "OK";
  }
}
```

GET 参数

> `http://localhost:8080/simpleParam?name=Tom&age=10`

POST 参数

> X-www-form-urlencoded

<span style="color:red">**结论：不论是GET请求还是POS请求，对于简单参数来讲，只要保证 请求参数名和Controller方法中的形参名保持一致 **，就可以获取到请求参数中的数据值。</span>

> 如果请求的参数和方法的形参不同 @RequestParam("name") 
>
> (@RequestParam("name") String username, Integer age 
>
> @RequestParam中的required属性默认为true（默认值也是true），代表该请求参数必须传递，如果不传递将报错
>
> 如果该参数是可选的，可以将required属性设置为false
>
> @RequestParam(name = "name", required =false) String username, Integer age

### 1.2 实体参数

简单的说就是将简单的单个参数使用对象来接收

```java
public class User {
private String name;
private Integer age;
//  get/setter/toString
}
```

### 1.3 **数组集合参数**

> Demo
>
> GET 方法传递了多个参数
>
> Htttp://localhost:8080/arrayParam?hobby=game&hobby=java
>
> 
>
> or
>
> Htttp://localhost:8080/arrayParam?hobby=game,java

#### 1.3.1 **数组**

> 定义数组接收 String[] hobby

```java
@RestController
public class RequestController {
  //数组集合参数
  @RequestMapping("/arrayParam")
  public String arrayParam(String[] hobby){
    System.out.println(Arrays.toString(hobby));
    return "OK";
  }
}
```

#### 1.3.2 **集合**

> 默认情况下，请求中参数名相同的多个值，是封装到数组。如果要封装到集合，要使用
>
> @RequestParam绑定参数关系

```java
@RestController
public class RequestController {
  //数组集合参数
  @RequestMapping("/listParam")
  public String listParam(@RequestParam List<String> hobby){
    System.out.println(hobby);
    return "OK";
  }
}
```

### 1.4 **日期参数**

因为日期的格式多种多样（如：2022-12-12 10:05:45 、2022/12/12 10:05:45），那么对于日期类型的参数在进行封装的时候，需要通过@DateTimeFormat注解，以及其pattern属性来设置日期的格式。

- @DateTimeFormat注解的pattern属性中指定了哪种日期格式，前端的日期参数就必须按照指定的格式传递。

- 后端controller方法中，需要使用Date类型或LocalDateTime类型，来封装传递的参数。

```java
@RestController
public class RequestController {
  //日期时间参数
  @RequestMapping("/dateParam")
  public String dateParam(@DateTimeFormat(pattern = "yyyy-MM-dd
                                          HH:mm:ss") LocalDateTime updateTime){
                                          System.out.println(updateTime);
                                          return "OK";
	}
}
```

### 1.5 JSON参数

> @RequestBody注解：将JSON数据映射到形参的实体类对象中（JSON中的key和实体类中的属性
>
> 名保持一致）

```java
@RestController
public class RequestController {
  //JSON参数
  @RequestMapping("/jsonParam")
  public String jsonParam(@RequestBody User user){
    System.out.println(user);
    return "OK";
  }
}
```

### 1.6 **路径参数**

> 类似
>
>` http://localhost:8080/user/1 `

```java
@RestController
public class RequestController {
  //路径参数
  @RequestMapping("/path/{id}")
  public String pathParam(@PathVariable Integer id){
    System.out.println(id);
    return "OK";
  }
}
```

#### **传递多个路径参数：**

> `http://localhost:880/user/1/0`

```java
@RestController
public class RequestController {
  //路径参数
  @RequestMapping("/path/{id}/{name}")
  public String pathParam2(@PathVariable Integer id, @PathVariable
                           String name){
    System.out.println(id+ " : " +name);
    return "OK";
  }
}
```

## 2. **响应**

在 Demo 的请求中方法体的 return 就是相应体,会什么 return 就可以呢,具体原因是注解@RequsetMapping,但是我们并没有添加@RequsetMappping,原因是 @RestController = @Controller + @ResponseBody

### 2.1 统一响应的结果

> 前端：只需要按照统一格式的返回结果进行解析(仅一种解析方案)，就可以拿到数据。

统一的返回结果使用类来描述，在这个结果中包含：

- 响应状态码：当前请求是成功，还是失败

- 状态码信息：给页面的提示信息

- 返回的数据：给前端响应的数据（字符串、对象、集合）

> 统一响应结果的代码 Result.java

```java
public class Result {
  private Integer code;//响应码，1 代表成功; 0 代表失败
  private String msg; //响应码 描述字符串
  private Object data; //返回的数据
  public Result() { }
  public Result(Integer code, String msg, Object data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
  public Integer getCode() {
    return code;
  }
  public void setCode(Integer code) {
    this.code = code;
  }
  public String getMsg() {
    return msg;
  }
  public void setMsg(String msg) {
    this.msg = msg;
  }
  public Object getData() {
    return data;
  }
  public void setData(Object data) {
    this.data = data;
  }
  //增删改 成功响应(不需要给前端返回数据)
  public static Result success(){
    return new Result(1,"success",null);
  }
  //查询 成功响应(把查询结果做为返回数据响应给前端)
  public static Result success(Object data){
    return new Result(1,"success",data);
  }
  //失败响应
  public static Result error(String msg){
    return new Result(0,msg,null);
  }
}
```

## 3. 分层解耦

### **3.1** **三层架构**

#### **3.1.1** **介绍**

在我们进行程序设计以及程序开发时，尽可能让每一个接口、类、方法的职责更单一些（单一职责原则）。

> 单一职责原则：一个类或一个方法，就只做一件事情，只管一块功能。
>
> 这样就可以让类、接口、方法的复杂度更低，可读性更强，扩展性更好，也更利用后期的维护。

- 数据访问：负责业务数据的维护操作，包括增、删、改、查等操作。

- 逻辑处理：负责业务逻辑处理的代码。

- 请求处理、响应数据：负责，接收页面的请求，给页面响应数据。

![image-20231117230734760](https://img.picgo.net/2023/11/17/image-2023111723073476021137dd993aa1da6.png)

- Controller：控制层。接收前端发送的请求，对请求进行处理，并响应数据。

- Service：业务逻辑层。处理具体的业务逻辑。

- Dao：数据访问层(Data Access Object)，也称为持久层。负责数据访问操作，包括数据的增、删、改、查。

执行流程

- 前端发起的请求，由Controller层接收（Controller响应数据给前端）
- Controller层调用Service层来进行逻辑处理（Service层处理完后，把处理结果返回给Controller层）

- Serivce层调用Dao层（逻辑处理过程中需要用到的一些数据要从Dao层获取）

- Dao层操作文件中的数据（Dao拿到的数据会返回给Service层）

#### 3.1.2 三层架构的好处：

1. 复用性强

2. 便于维护

3. 利用扩展

### **3.2** **分层解耦**

#### **3.2.1** **耦合问题**

首先需要了解软件开发涉及到的两个概念：内聚和耦合。

​	内聚：软件中各个功能模块内部的功能联系。

​	耦合：衡量软件中各个层/模块之间的依赖、关联的程度。

**软件设计原则：高内聚低耦合。**

> 高内聚指的是：一个模块中各个元素之间的联系的紧密程度，如果各个元素(语句、程序段)之间的联系程度越高，则内聚性越高，即 "高内聚"。
>
> 低耦合指的是：软件中各个层、模块之间的依赖关联程序越低越好。



<span style="color:red">为了解决耦合的关系,因为上述三层建构之间的调用关系每一次都需要进行 new,引入 控制反转 IOC和依赖注入 DI</span>

**控制反转：** Inversion Of Control，简称IOC。对象的创建控制权由程序自身转移到外部（容器），这种思想称为控制反转。

> 对象的创建权由程序员主动创建转移到容器(由容器创建、管理对象)。这个容器称为：IOC容器或Spring容器

**依赖注入：** Dependency Injection，简称DI。容器为应用程序提供运行时，所依赖的资源，称之为依赖注入。

> 程序运行时需要某个资源，此时容器就为其提供这个资源。
>
> 例：EmpController程序运行时需要EmpService对象，Spring容器就为其提供并注入EmpService对象

<span style="color:red">IOC容器中创建、管理的对象，称之为：bean对象</span>



### 3.3 IOC& DI

> @Autowired //运行时,从IOC容器中获取该类型对象,赋值给该变量
>
> @Component //将当前对象交给IOC容器管理,成为IOC容器的bean

- **Controller**层：

```java
@RestController
public class EmpController {
  @Autowired //运行时,从IOC容器中获取该类型对象,赋值给该变量
  private EmpService empService ;
  @RequestMapping("/listEmp")
  public Result list(){
    //1. 调用service, 获取数据
    List<Emp> empList = empService.listEmp();
    //3. 响应数据
    return Result.success(empList);
  }
}
```

- **Service**层：

```java
@Component //将当前对象交给IOC容器管理,成为IOC容器的bean
public class EmpServiceA implements EmpService {
  @Autowired //运行时,从IOC容器中获取该类型对象,赋值给该变量
  private EmpDao empDao ;
  @Override
  public List<Emp> listEmp() {
    //1. 调用dao, 获取数据
    List<Emp> empList = empDao.listEmp();
    //2. 对数据进行转换处理 - gender, job
    empList.stream().forEach(emp -> {
      //处理 gender 1: 男, 2: 女
      String gender = emp.getGender();
      if("1".equals(gender)){
        emp.setGender("男");
      }else if("2".equals(gender)){
        emp.setGender("女");
      }
      //处理job - 1: 讲师, 2: 班主任 , 3: 就业指导
      String job = emp.getJob();
      if("1".equals(job)){
        emp.setJob("讲师");
      }else if("2".equals(job)){
        emp.setJob("班主任");
      }else if("3".equals(job)){
        emp.setJob("就业指导");
      }
    });
    return empList;
  }
}
```

- **Dao**层：

```java
@Component //将当前对象交给IOC容器管理,成为IOC容器的bean
public class EmpDaoA implements EmpDao {
  @Override
  public List<Emp> listEmp() {
    //1. 加载并解析emp.xml
    String file =
      this.getClass().getClassLoader().getResource("emp.xml").getFile();
    System.out.println(file);
    List<Emp> empList = XmlParserUtils.parse(file, Emp.class);
    return empList;
  }
}
```

#### 3.3.1 **IOC**详解

##### **3.3.1.1 bean**的声明

前面我们提到IOC控制反转，就是将对象的控制权交给Spring的IOC容器，由IOC容器创建及管理对象。IOC容器创建的对象称为bean对象。

在之前的入门案例中，要把某个对象交给IOC容器管理，需要在类上添加一个注解：@Component而Spring框架为了更好的标识web应用程序开发当中，bean对象到底归属于哪一层，又提供了@Component的衍生注解：





@Controller （标注在控制层类上）

@Service （标注在业务层类上）

@Repository （标注在数据访问层类上）

![image-20231117231740718](https://img.picgo.net/2023/11/17/image-2023111723174071843db52cc18de243b.png)

> 注意事项:
>
> - 声明bean的时候，可以通过value属性指定bean的名字，如果没有指定，默认为类名首字母小写。
>
> - 使用以上四个注解都可以声明bean，但是在springboot集成web开发中，声明控制器bean只能用@Controller。



##### **3.3.2.2** **组件扫描**

使用四大注解声明的bean，要想生效，还需要被组件扫描注解@ComponentScan扫描

> @ComponentScan注解虽然没有显式配置，但是实际上已经包含在了引导类声明注解
>
> @SpringBootApplication 中， **默认扫描的范围是****SpringBoot****启动类所在包及其子包** 。

解决方案：手动添加@ComponentScan注解，指定要扫描的包 （ 仅做了解，不推荐 ）

![image-20231117231959720](https://img.picgo.net/2023/11/17/image-20231117231959720784424fa802f0d10.png)

#### 3.3.2 DI 详解

依赖注入，是指IOC容器要为应用程序去提供运行时所依赖的资源，而资源指的就是对象。

在入门程序案例中，我们使用了@Autowired这个注解，完成了依赖注入的操作，而这个Autowired翻译过来叫：自动装配。

@Autowired注解，默认是按照**类型**进行自动装配的（去IOC容器中找某个类型的对象，然后完成注入

操作）

那如果在IOC容器中，存在多个相同类型的bean对象，会出现什么情况呢？

​	报错

如何解决上述问题呢？Spring提供了以下几种解决方案：

- @Primary

- @Qualifier

- @Resource

使用@Primary注解：当存在多个相同类型的Bean注入时，加上@Primary注解，来确定默认的实现。

![image-20231117232333452](https://img.picgo.net/2023/11/17/image-20231117232333452b2e5991573d54ff2.png)

使用@Qualifier注解：指定当前要注入的bean对象。 在@Qualifier的value属性中，指定注入的bean的名称。

- @Qualifier注解不能单独使用，必须配合@Autowired使用

![image-20231117232654036](https://img.picgo.net/2023/11/17/image-2023111723265403697c5fbb43d8dbda6.png)

使用@Resource注解：是按照bean的名称进行注入。通过name属性指定要注入的bean的名称

![image-20231117232738597](https://img.picgo.net/2023/11/17/image-20231117232738597f45b80ed53600828.png)

面试题 ： @Autowird 与 @Resource的区别

- @Autowired 是spring框架提供的注解，而@Resource是JDK提供的注解

- @Autowired 默认是按照类型注入，而@Resource是按照名称注入





































