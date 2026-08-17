---
title: Java 总结
description: Java 总结
publishedAt: 2026-08-16
category: Java
tags:
  - Java
draft: false
---

## 1. Java 的三大平台

​	JavaSE、JavaME、JavaEE

​	JavaSE、JavaME、JavaEE

### 1.1 JavaSE

​	是其他两个版本的基础。

### 1.2 JavaME

​	Java语言的小型版，用于嵌入式消费类电子设备或者小型移动设备的开发。

​	其中最为主要的还是小型移动设备的开发（手机）。渐渐的没落了，已经被安卓和IOS给替代了。

​	但是，安卓也是可以用Java来开发的。

### 1.3 JavaEE

​	用于Web方向的网站开发。（主要从事后台服务器的开发）

## 2. Java的主要特性

- 面向对象
- 安全性
- 多线程
- 简单易用
- 开源
- 跨平台

## 3. JRE和JDK

JVM（Java Virtual Machine），Java虚拟机

JRE（Java Runtime Environment），Java运行环境，包含了JVM和Java的核心类库（Java API）

JDK（Java Development Kit）称为Java开发工具，包含了JRE和开发工具

总结：我们只需安装JDK即可，它包含了java的运行环境和虚拟机。

## 4.数据类型

> - 基本数据类型
> - 引用数据类型

### 4.1 基本数据类型的四类八种

| 数据类型 | 关键字  | 内存占用 |                 取值范围                  |
| :------: | :-----: | :------: | :---------------------------------------: |
|   整数   |  byte   |    1     |    负的2的7次方 ~ 2的7次方-1(-128~127)    |
|          |  short  |    2     | 负的2的15次方 ~ 2的15次方-1(-32768~32767) |
|          |   int   |    4     |        负的2的31次方 ~ 2的31次方-1        |
|          |  long   |    8     |        负的2的63次方 ~ 2的63次方-1        |
|  浮点数  |  float  |    4     |        1.401298e-45 ~ 3.402823e+38        |
|          | double  |    8     |      4.9000000e-324 ~ 1.797693e+308       |
|   字符   |  char   |    2     |                  0-65535                  |
|   布尔   | boolean |    1     |                true，false                |

>  数据类型的定义Demo 
>
> Tip:
>
> ​	L F

```java
public class VariableDemo3{
    public static void main(String[] args){
        //1.定义byte类型的变量
        //数据类型 变量名 = 数据值;
        byte a = 10;
        System.out.println(a);

        //2.定义short类型的变量
        short b = 20;
        System.out.println(b);

        //3.定义int类型的变量
        int c = 30;
        System.out.println(c);

        //4.定义long类型的变量
        long d = 123456789123456789L;
        System.out.println(d);

        //5.定义float类型的变量
        float e = 10.1F;
        System.out.println(e);

        //6.定义double类型的变量
        double f = 20.3;
        System.out.println(f);

        //7.定义char类型的变量
        char g = 'a';
        System.out.println(g);

        //8.定义boolean类型的变量
        boolean h = true;
        System.out.println(h);

    }
}
```

### 4.2 引用数据类型

#### 4.2.1 类(Class)

> 类是面向对象编程的基本单位,用于封装属性和行为。类包含成员变量(属性)和方法(行为)。类需要实例化以创建对象,对象才能访问类中的属性和方法。例如:

```java
public class Person {
  private String name;
  private int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age; 
  }

  public void incrementAge() {
    age++;
  }
}
```

#### 4.2.2 接口(Interface)

> 接口用于定义类需要实现的方法签名,是一种<span style="color:red">抽象类型</span>。接口中只包含常量和方法签名。接口需要由类来实现接口定义的方法。例如:

```java
public interface Animal {
  void makeSound();
}

public class Dog implements Animal {
  public void makeSound() {
    System.out.println("Woof"); 
  }
}
```

#### 4.2.3 数组(Array)

> 不要同 Javascript 混淆

数组用于存储同一类型的数据的集合,<span style="color:red">数组的长度是固定的</span>。数组可以是一维和多维的。例如:

##### 数组初始化

1. 静态初始化:在定义数组时就直接指定数组元素的值,形式如下:

```java
int[] arr = {1, 2, 3};
String[] names = {"John", "Mary", "Tom"};
```

2. 动态初始化:在定义数组时只指定数组长度,而在后续代码中再逐个赋值,形式如下:

```java
int[] arr = new int[3];
arr[0] = 1; 
arr[1] = 2;
arr[2] = 3;
```

3. 默认初始化:定义数组时不立即赋值,数组元素会有一个默认初始值,例如数值类型数组元素默认为0,布尔类型默认为false。

```java
int[] arr = new int[3]; //数组元素默认为0
boolean[] flags = new boolean[2]; //数组元素默认为false
```

4. 使用Arrays.fill()方法进行初始化:

```java
int[] arr = new int[3];
Arrays.fill(arr, 1); //数组元素全部初始化为1
```

##### 数组的遍历

```java
for(int i = 0; i < arr.length; i++){
    //在循环的过程中，i依次表示数组中的每一个索引
    sout(arr[i]);//就可以把数组里面的每一个元素都获取出来，并打印在控制台上了。
}
```





#### 4.2.4 String

> String不是基本类型,是不可变的对象,用于存储文本数据。String有很多实用的方法用于字符串操作。String对象一旦创建就不能更改。

- length():返回字符串长度
- charAt():返回指定索引处的字符
- substring():返回子字符串
- contains():判断是否包含子字符串
- indexOf():返回子字符串的索引
- replace():替换子字符串
- equals():判断字符串相等性
- split():分割字符串
- toUpperCase()/toLowerCase():转换大小写
- trim():去除两端空格

##### StringBuilder

> 字符串拼接
>
> 使用String进行字符串拼接会产生大量临时对象,效率低下。StringBuilder可以提高字符串拼接的效率。

- append():追加字符串
- insert():在指定索引插入字符串
- delete():删除字符串区间
- reverse():反转字符串
- capacity():返回当前容量
- ensureCapacity():确保最小容量
- replace():替换字符串区间
- toString():转换为String

## 5. 键盘录入

```java
//导包，其实就是先找到Scanner这个类在哪
import java.util.Scanner;
public class ScannerDemo1{
	public static void main(String[] args){
		//2.创建对象，其实就是申明一下，我准备开始用Scanner这个类了。
		Scanner sc = new Scanner(System.in);
		//3.接收数据
		//当程序运行之后，我们在键盘输入的数据就会被变量i给接收了
		System.out.println("请输入一个数字");
		int i = sc.nextInt();
		System.out.println(i);
	}
}
```

### next()\nextLine()

- next()读取遇到空格或换行才停止,nextLine()读取整行直到遇到换行符
- next()不会读取换行符,nextLine()会读取换行符

### nextInt()

只能接受整数。

比如：键盘录入123，那么会把123当做int类型的整数返回。

​	键盘录入小数或者其他字母，就会报错。

### nextDouble()

能接收整数和小数，但是都会看做小数返回。

录入字母会报错。

## 6. 面相对象

### 6.1 封装

1. 使用 `private` 关键字来修饰成员变量。

2. 使用`public`修饰getter和setter方法。

> Demo

```java
public class Student {
    private String name;
    private int age;

  
  
  
   /*
   *
   *--------------------
   *
   */
    public void setName(String n) {
      	name = n;
    }

    public String getName() {
      	return name;
    }

    public void setAge(int a) {
        if (a > 0 && a <200) {
            age = a;
        } else {
            System.out.println("年龄非法！");
        }
    }

    public int getAge() {
      	return age;
    }
}
```

### 6.2 构造方法

在创建对象的时候，给成员变量进行初始化。

初始化即赋值的意思。

> Demo

```java
public class Student {
    // 1.成员变量
    public String name;
    public int age;

    // 2.构造方法 --- 无参构造器
    public Student() {
		System.out.println("无参数构造方法被调用")；
    }
}
```

### 6.3 static 关键字

被static修饰的成员是**属于类**的是放在静态区中，没有static修饰的成员变量和方法则是**属于对象**的。

> Demo

```java
// 声明定义
public static String schoolName = "传智播客"； // 属于类，只有一份。
// 只有一份的意思是,同一个对象 new 多次,但是 static 的变量依旧之后一个,所有相同的对象的 static 是共享的
    
// 访问
//类名.静态方法
  Student.schoolName;
```

### 6.4 继承

就是子类继承父类的**属性**和**行为**，使得子类对象可以直接具有与父类相同的属性、相同的行为。子类可以直接访问父类中的<span style="color:red">**非私有**</span>的属性和行为。

**需要注意：Java是单继承的，一个类只能继承一个直接父类，跟现实世界很像，但是Java中的子类是更加强大的。**

#### 6.4.1 子类不能继承的内容

子类不能继承父类的构造方法。

**值得注意的是子类可以继承父类的私有成员（成员变量，方法），只是子类无法直接访问而已，可以通过getter/setter方法访问父类的private成员变量。**

#### 6.4.2 继承的特点

* <span style="color:red">继承后子类构方法器特点:子类所有构造方法的第一行都会默认先调用父类的无参构造方法</span>

* 成员变量不重名
  * 子类会优先访问自己对象中的成员变量。如果此时想访问父类成员变量如何解决呢？我们可以使用super关键字。
* super访问父类成员变量
* 成员方法不重名

#### 6.4.3 方法重写

**方法重写** ：子类中出现与父类一模一样的方法时（返回值类型，方法名和参数列表都相同），会出现覆盖效果，也称为重写或者复写。**声明不变，重新实现**。

### 6.5 多态

1. 有继承或者实现关系
2. 方法的重写【意义体现：不重写，无意义】
3. 父类引用指向子类对象【格式体现】

**多态是出现在继承或者实现关系中的**。

多态的格式:

```java
父类类型 变量名 = new 子类/实现类构造器;
变量名.方法名();
```

> 调用成员变量时：编译看左边，运行看左边
>
> 调用成员方法时：编译看左边，运行看右边

```java
Fu f = new Zi()；
//编译看左边的父类中有没有name这个属性，没有就报错
//在实际运行的时候，把父类name属性的值打印出来
System.out.println(f.name);
//编译看左边的父类中有没有show这个方法，没有就报错
//在实际运行的时候，运行的是子类中的show方法
f.show();
```

#### 6.5.1 <span style="color:red">**要注意的是：**</span>

* 当一个方法的形参是一个类，我们可以传递这个类所有的子类对象。
* 当一个方法的形参是一个接口，我们可以传递这个接口所有的实现类对象（后面会学）。
* 而且多态还可以根据传递的不同对象来调用不同类中的方法。

#### 6.5.2 弊端

> 我们已经知道多态编译阶段是看左边父类类型的，如果子类有些独有的功能，此时**多态的写法就无法访问子类独有功能了**。

#### 6.5.3 引用类型转换

##### 向上转型（自动转换）

* **向上转型**：多态本身是子类类型向父类类型向上转换（自动转换）的过程，这个过程是默认的。
  当父类引用指向一个子类对象时，便是向上转型。
  使用格式：

##### 向下转型（强制转换）

- **向下转型**：父类类型向子类类型向下转换的过程，这个过程是强制的。
  一个已经向上转型的子类对象，将父类引用转为子类引用，可以使用强制类型转换的格式，便是向下转型。

- ```java
  子类类型 变量名 = (子类类型) 父类变量名;
  如:Aniaml a = new Cat();
     Cat c =(Cat) a;  
  ```

### 6.6 权限修饰符

|                  | public | protected | 默认 | private |
| ---------------- | ------ | --------- | ---- | ------- |
| 同一类中         | √      | √         | √    | √       |
| 同一包中的类     | √      | √         | √    |         |
| 不同包的子类     | √      | √         |      |         |
| 不同包中的无关类 | √      |           |      |         |

### 6.7 final关键字

**final**：  不可改变，最终的含义。可以用于修饰类、方法和变量。

- 类：被修饰的类，不能被继承。
- 方法：被修饰的方法，不能被重写。
- 变量：被修饰的变量，有且仅能被赋值一次。

### 6.8 抽象类

> **我们把没有方法体的方法称为抽象方法。Java语法规定，包含抽象方法的类就是抽象类**。

- **抽象方法** ： 没有方法体的方法。
- **抽象类**：包含抽象方法的类。

> Demo

```java
public abstract class Animal {
    public abstract void run()；
}
```

#### 特点

抽象类的特征总结起来可以说是 **有得有失**

**有得：抽象类得到了拥有抽象方法的能力。**

**有失：抽象类失去了创建对象的能力。**

其他成员（构造方法，实例方法，静态方法等）抽象类都是具备的。

#### 意义

​	抽象类存在的意义是为了被子类继承，否则抽象类将毫无意义。抽象类可以强制让子类，一定要按照规定的格式进行重写。

### 6.9 接口

> 在JDK7，包括JDK7之前，接口中的**只有**包含：抽象方法和常量

抽象类中可以用抽象方法，也可以有普通方法，构造方法，成员变量等。那么什么是接口呢？**接口是更加彻底的抽象，JDK7之前，包括JDK7，接口中全部是抽象方法。接口同样是不能创建对象的**。

```tex
//接口的定义格式：
interface 接口名称{
    // 抽象方法
}

// 接口的声明：interface
// 接口名称：首字母大写，满足“驼峰模式”
```

> Demo

```java
public interface InterF {
    // 抽象方法！
    //    public abstract void run();
    void run();

    //    public abstract String getName();
    String getName();

    //    public abstract int add(int a , int b);
    int add(int a , int b);


    // 它的最终写法是：
    // public static final int AGE = 12 ;
    int AGE  = 12; //常量
    String SCHOOL_NAME = "黑马程序员";

}
```

> 实现接口的格式

```java
/**接口的实现：
    在Java中接口是被实现的，实现接口的类称为实现类。
    实现类的格式:*/
class 类名 implements 接口1,接口2,接口3...{

}
```

#### 6.9.1 接口与接口的多继承

接口与接口之间是可以多继承的：也就是一个接口可以同时继承多个接口。大家一定要注意：

**类与接口是实现关系**

**接口与接口是继承关系**

> Demo

```java
public interface Abc {
    void go();
    void test();
}

/** 法律规范：接口*/
public interface Law {
    void rule();
    void test();
}

 *
 *  总结：
 *     接口与类之间是多实现的。
 *     接口与接口之间是多继承的。
 * */
public interface SportMan extends Law , Abc {
    void run();
}
```

### <span style="color:red">6.10 内部类</span>

将一个类A定义在另一个类B里面，里面的那个类A就称为**内部类**，B则称为**外部类**。可以把内部类理解成寄生，外部类理解成宿主。

#### 6.10.1 什么时候使用内部类

一个事物内部还有一个独立的事物，内部的事物脱离外部的事物无法独立使用

1. 人里面有一颗心脏。
2. 汽车内部有一个发动机。
3. 为了实现更好的封装性。

#### 6.10.2  内部类的分类

按定义的位置来分

1. **成员内部内**，类定义在了成员位置 (类中方法外称为成员位置，无static修饰的内部类)
2. **静态内部类**，类定义在了成员位置 (类中方法外称为成员位置，有static修饰的内部类)
3. **局部内部类**，类定义在方法内
4. **匿名内部类**，没有名字的内部类，可以在方法中，也可以在类中方法外。

#### 6.10.3 使用

##### 成员内部类

> 在成员内部类里面，JDK16之前不能定义静态变量，JDK16开始才可以定义静态变量。
>
> <span style="color:red">创建内部类对象时，对象中有一个隐含的Outer.this记录外部类对象的地址值。</span>

```java
public class Test {
    public static void main(String[] args) {
        //  宿主：外部类对象。
       // Outer out = new Outer();
        // 创建内部类对象。
        Outer.Inner oi = new Outer().new Inner();
        oi.method();
    }
}

class Outer {
    // 成员内部类，属于外部类对象的。
    // 拓展：成员内部类不能定义静态成员。
    public class Inner{
        // 这里面的东西与类是完全一样的。
        public void method(){
            System.out.println("内部类中的方法被调用了");
        }
    }
}

```

##### 静态内部类

###### 特点:

* 静态内部类是一种特殊的成员内部类。

- 有static修饰，属于外部类本身的。
- 总结：静态内部类与其他类的用法完全一样。只是访问的时候需要加上外部类.内部类。
- **拓展1**:静态内部类可以直接访问外部类的静态成员。
- **拓展2**:静态内部类不可以直接访问外部类的非静态成员，如果要访问需要创建外部类的对象。
- **拓展3**:静态内部类中没有银行的Outer.this。

**内部类的使用格式**：

```
外部类.内部类。
```

**静态内部类对象的创建格式**：

```java
外部类.内部类  变量 = new  外部类.内部类构造器;
```

> Demo

```java
// 外部类：Outer01
class Outer01{
    private static  String sc_name = "黑马程序";
    // 内部类: Inner01
    public static class Inner01{
        // 这里面的东西与类是完全一样的。
        private String name;
        public Inner01(String name) {
            this.name = name;
        }
        public void showName(){
            System.out.println(this.name);
            // 拓展:静态内部类可以直接访问外部类的静态成员。
            System.out.println(sc_name);
        }
    }
}

public class InnerClassDemo01 {
    public static void main(String[] args) {
        // 创建静态内部类对象。
        // 外部类.内部类  变量 = new  外部类.内部类构造器;
      // 注意这个位置  new Outer01.Inner01("张三"); Outer01 后面是没有()
        Outer01.Inner01 in  = new Outer01.Inner01("张三");
        in.showName();
    }
}
```

##### 匿名内部类【重点】

**匿名内部类** ：是内部类的简化写法。他是一个隐含了名字的内部类。开发中，最常用到的内部类就是匿名内部类了。

```java
new 类名或者接口名() {
     重写方法;
};
```

包含了：

* 继承或者实现关系

* 方法重写
* 创建对象

所以从语法上来讲，这个整体其实是匿名内部类对象

###### 匿名内部类前提和格式

匿名内部类必须**继承一个父类**或者**实现一个父接口**。

**匿名内部类格式**

```java
new 父类名或者接口名(){
    // 方法重写
    @Override 
    public void method() {
        // 执行语句
    }
};
```

> Demo

```java
interface Swim {
    public abstract void swimming();
}

public class Demo07 {
    public static void main(String[] args) {
        // 使用匿名内部类
		new Swim() {
			@Override
			public void swimming() {
				System.out.println("自由泳...");
			}
		}.swimming();

        // 接口 变量 = new 实现类(); // 多态,走子类的重写方法
        Swim s2 = new Swim() {
            @Override
            public void swimming() {
                System.out.println("蛙泳...");
            }
        };

        s2.swimming();
        s2.swimming();
    }
}
```

## 7. 常用 API

### 7.1 Math

> 返回参数的绝对值

```java
Math.abs(-2)
```

> 返回大于或等于参数的最小整数
>
> 向上取整

```java
Math.ceil(23.45)
```

> 返回小于或等于参数的最大整数
>
> 向下取整

```java
Math.floor(23.45)
```

> 按照四舍五入返回最接近参数的int类型的值

```java
Math.round(float a)
```

> 获取两个int值中的较大值

```java
Math.max(int a,int b)	
```

> 获取两个int值中的较小值

```java
Math.min(int a,int b)		
```

> 计算a的b次幂的值

```java
Math.pow (double a,double b)
```

> 返回一个[0.0,1.0)的随机值

```java
Math.random()	
```

### 7.2 System

> 获取当前时间所对应的毫秒值（当前时间为0时区所对应的时间即就是英国格林尼治天文台旧址所在位置）

```java
System.currentTimeMillis()
```

> 终止当前正在运行的Java虚拟机，0表示正常退出，非零表示异常退出

```java
System.exit(0);
```

> 进行数值元素copy

```java
System.arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length)
  
// src: 	 源数组
// srcPos：  源数值的开始位置
// dest：    目标数组
// destPos： 目标数组开始位置
// length:   要复制的元素个数
public static native void arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length); 


 // 定义源数组
        int[] srcArray = {23 , 45 , 67 , 89 , 14 , 56 } ;

        // 定义目标数组
        int[] desArray = new int[10] ;

        // 进行数组元素的copy: 把srcArray数组中从0索引开始的3个元素，从desArray数组中的1索引开始复制过去
        System.arraycopy(srcArray , 0 , desArray , 1 , 3);
```

### 7.3 Runtime

Runtime表示Java中运行时对象，可以获取到程序运行时设计到的一些信息

> 当前系统的运行环境对象

```java
Runtime r1 =Runtime.getRuntime();
```

> 停止虚拟机

```java
Runtime.getRuntime().exit(0);
```

> 获得CPU的线程数

```java
Runtime.getRuntime().availableProcessors()
```

> JVM能从系统中获取总内存大小（单位byte）

```java
Runtime.getRuntime().maxMemory() / 1024 / 1024
```

> JVM已经从系统中获取总内存大小（单位byte）

```java
Runtime.getRuntime().totalMemory() / 1024 / 1024
```

> JVM剩余内存大小（单位byte）

```java
Runtime.getRuntime().freeMemory() / 1024 / 1024
```

> 运行cmd命令

```java
//shutdown :关机
//加上参数才能执行
//-s :默认在1分钟之后关机
//-s -t 指定时间 : 指定关机时间
//-a :取消关机操作
//-r: 关机并重启
        Runtime.getRuntime().exec("shutdown -s -t 3600");
```

### 7.4 Object

> 返回该对象的字符串表示形式(可以看做是对象的内存地址值)

```java
// 创建学生对象
Student s1 = new Student("itheima" , "14") ;

// 调用toString方法获取s1对象的字符串表现形式
String result1 = s1.toString();
```

> 比较两个对象地址值是否相等；true表示相同，false表示不相同

```java
// 创建两个学生对象
Student s1 = new Student("itheima" , "14") ;
Student s2 = new Student("itheima" , "14") ;

// 比较两个对象是否相等
System.out.println(s1 == s2);
```

通过源码我们可以发现默认情况下equals方法比较的也是对象的地址值。比较内存地址值一般情况下是没有意义的，我们希望比较的是对象的属性，如果两个对象的属性相同，我们认为就是同一个对象；

那么要比较对象的属性，我们就需要在Student类中重写Object类中的equals方法。equals方法的重写，我们也可以使用idea开发工具完成，具体的操作如下所示：

1. 在空白处使用快捷键：alt + insert。此时会弹出如下的对话框

![image-20231106183047003](https://img.picgo.net/2023/11/06/image-202311061830470032d1236d3939f9049.png)

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Student student = (Student) o;
    return Objects.equals(name, student.name) && Objects.equals(age, student.age);	// 比较的是对象的name属性值和age属性值
}

@Override
public int hashCode() {
    return 0;
}
```



> 对象克隆

​	把A对象的属性值完全拷贝给B对象，也叫对象拷贝,对象复制

**对象克隆的分类：**

>深克隆和浅克隆

**浅克隆：**

​	不管对象内部的属性是基本数据类型还是引用数据类型，都完全拷贝过来 

​	基本数据类型拷贝过来的是具体的数据，引用数据类型拷贝过来的是地址值。

​	Object类默认的是浅克隆

![image-20231106183211708](https://img.picgo.net/2023/11/06/image-20231106183211708adb8b764302385a2.png)

**深克隆：**

​	基本数据类型拷贝过来，字符串复用，引用数据类型会重新创建新的

![image-20231106183233016](https://img.picgo.net/2023/11/06/image-20231106183233016e6156b76fe1919f7.png)

代码实现：

> 浅拷贝

```java
// 要想使用 clone()方法
1. 类要实现 Cloneable 接口
2. 重写 clone()方法
  @Override
    protected Object clone() throws CloneNotSupportedException {
  return super.clone();
}
```

> 深拷贝
>
> 1. 重写clone()方法来实现深拷贝,在克隆对象时,递归复制原有对象包含的所有子对象。
> 2. 通过对象序列化和反序列化来实现深拷贝,需要让对象所含的子对象也实现序列化接口。
> 3. 直接创建一个新对象,并逐个复制原对象属性值过来,以及递归复制其包含的子对象。

```java
// 浅拷贝 - 克隆对象
class Object implements Cloneable {
  @Override
  protected Object clone() throws CloneNotSupportedException {
    return super.clone(); 
  }
}

// 深拷贝 - 重写clone() 
class DeepObject implements Cloneable {  
  private SubObject sub; //子对象
    
  @Override
  protected DeepObject clone() throws CloneNotSupportedException {
    DeepObject obj = (DeepObject)super.clone();
    obj.sub = (SubObject)sub.clone(); //递归拷贝子对象
    return obj;
  }
}
```

### 7.5 Date

> 创建日期对象，把当前的时间

```java
new Date()
```

> 创建日期对象，把当前的毫秒值转成日期对象

```java
new Date(0L)
```

> 把日期对象转换成对应的时间毫秒值

```java
//创建日期对象
Date d = new Date();
//public long getTime():获取的是日期对象从1970年1月1日 00:00:00到现在的毫秒值
System.out.println(d.getTime() * 1.0 / 1000 / 60 / 60 / 24 / 365 + "年");
```

> 把方法参数给定的毫秒值设置给日期对象

```java
//创建日期对象
Date d = new Date();
long time = System.currentTimeMillis();
d.setTime(time);

```

### 7.6 SimpleDateFormat

日期/时间格式化类

> 格式规则
>
> - `public String format(Date date)`：将Date对象格式化为字符串。
>
> - `public Date parse(String source)`：将字符串解析为Date对象。

| 标识字母（区分大小写） | 含义 |
| ---------------------- | ---- |
| y                      | 年   |
| M                      | 月   |
| d                      | 日   |
| H                      | 时   |
| m                      | 分   |
| s                      | 秒   |

> Demo

> 将列出的格式的时间,转换为 Java 内部的 Date 对象

```java
//1.定义一个字符串表示时间
String str = "2023-11-11 11:11:11";
//2.利用空参构造创建simpleDateFormat对象
// 细节:
//创建对象的格式要跟字符串的格式完全一致
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = sdf.parse(str);
//3.打印结果
        System.out.println(date.getTime());//1699672271000
```

> 使用 format 格式化时间

```java
 //1.利用空参构造创建simpleDateFormat对象，默认格式
SimpleDateFormat sdf1 = new SimpleDateFormat();
Date d1 = new Date(0L); // 获取 1090 年 1 月 1 号 上午 8 点的时间 --- 时间戳
String str1 = sdf1.format(d1); // 使用格式化
System.out.println(str1);//1970/1/1 上午8:00



//2.利用带参构造创建simpleDateFormat对象，指定格式
SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日HH:mm:ss");
String str2 = sdf2.format(d1);
System.out.println(str2);//1970年01月01日 08:00:00
```

> 案例 Demo

```java
/*假设，你初恋的出生年月日为:2000-11-11
     请用字符串表示这个数据，并将其转换为:2000年11月11日
     创建一个Date对象表示2000年11月11日
     创建一个SimpleDateFormat对象，并定义格式为年月日把时间变成:2000年11月11日
*/

//1.可以通过2000-11-11进行解析，解析成一个Date对象
String str = "2000-11-11";
//2.解析
SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
Date date = sdf1.parse(str);
//3.格式化
SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日");
String result = sdf2.format(date);
System.out.println(result);
```

### 7.7 Calendar

| 方法名                                  | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| `public static Calendar getInstance()`  | 获取一个它的子类GregorianCalendar对象。                      |
| `public int get(int field)`             | 获取某个字段的值。field参数表示获取哪个字段的值，<br />可以使用Calender中定义的常量来表示：<br />Calendar.YEAR : 年<br />Calendar.MONTH ：月<br />Calendar.DAY_OF_MONTH：月中的日期<br />Calendar.HOUR：小时<br />Calendar.MINUTE：分钟<br />Calendar.SECOND：秒<br />Calendar.DAY_OF_WEEK：星期 |
| `public void set(int field,int value)`  | 设置某个字段的值                                             |
| `public void add(int field,int amount)` | 为某个字段增加/减少指定的值                                  |





> Demo get

```java
// 获取到当前的时间包括所有的时间
Calendar instance = Calendar.getInstance();

int year = instance.get(Calendar.YEAR);
//Calendar的月份值是0-11
int month = instance.get(Calendar.MONTH) + 1;
int day = instance.get(Calendar.DAY_OF_MONTH);
int hour = instance.get(Calendar.HOUR);
int minute = instance.get(Calendar.MINUTE);
int second = instance.get(Calendar.SECOND);
int week = instance.get(Calendar.DAY_OF_WEEK);//返回值范围：1--7，分别表示："星期日","星期一","星期二",...,"星期六"
```

> Demo set

```java
//设置属性——set(int field,int value):
Calendar c1 = Calendar.getInstance();//获取当前日期

//计算班长出生那天是星期几(假如班长出生日期为：1998年3月18日)
c1.set(Calendar.YEAR, 1998);
c1.set(Calendar.MONTH, 3 - 1);//转换为Calendar内部的月份值
c1.set(Calendar.DAY_OF_MONTH, 18);

int w = c1.get(Calendar.DAY_OF_WEEK);
System.out.println("班长出生那天是：" + getWeek(w));
```

> Demo add

```java
//计算200天以后是哪年哪月哪日，星期几？
Calendar c2 = Calendar.getInstance();//获取当前日期
c2.add(Calendar.DAY_OF_MONTH, 200);//日期加200

int y = c2.get(Calendar.YEAR);
int m = c2.get(Calendar.MONTH) + 1;//转换为实际的月份
int d = c2.get(Calendar.DAY_OF_MONTH);

int wk = c2.get(Calendar.DAY_OF_WEEK);
System.out.println("200天后是：" + y + "年" + m + "月" + d + "日" + getWeek(wk));
```

### 7.8  JDK8时间相关

| JDK8时间类类名    | 作用                   |
| ----------------- | ---------------------- |
| ZoneId            | 时区                   |
| Instant           | 时间戳                 |
| ZoneDateTime      | 带时区的时间           |
| DateTimeFormatter | 用于时间的格式化和解析 |
| LocalDate         | 年、月、日             |
| LocalTime         | 时、分、秒             |
| LocalDateTime     | 年、月、日、时、分、秒 |
| Duration          | 时间间隔（秒，纳，秒） |
| Period            | 时间间隔（年，月，日） |
| ChronoUnit        | 时间间隔（所有单位）   |

## 

#### 7.8.1  ZoneId 时区

```java
Set<String> zoneIds = ZoneId.getAvailableZoneIds();
System.out.println(zoneIds.size());//603 Java 所支持的所有的时区个数
System.out.println(zoneIds);// 以数组的形式打印出所有的时区


//获取当前系统的默认时区
ZoneId zoneId = ZoneId.systemDefault();
System.out.println(zoneId);//Asia/Shanghai

//获取指定的时区
ZoneId zoneId1 = ZoneId.of("Asia/Pontianak");
System.out.println(zoneId1);//Asia/Pontianak
```

#### 7.8.2  Instant 时间戳

```java
//获取当前时间的Instant对象(标准时间)
Instant now = Instant.now();
System.out.println(now);

//根据(秒/毫秒/纳秒)获取Instant对象 
//单位是秒
Instant instant1 = Instant.ofEpochMilli(0L);
System.out.println(instant1);//1970-01-01T00:00:00z

//单位是毫秒
Instant instant2 = Instant.ofEpochSecond(1L);
System.out.println(instant2);//1970-01-01T00:00:01Z

//单位是纳秒
Instant instant3 = Instant.ofEpochSecond(1L, 1000000000L);
System.out.println(instant3);

//用于时间的判断
Instant instant4=Instant.ofEpochMilli(0L);
Instant instant5 =Instant.ofEpochMilli(1000L);


//isBefore:判断调用者代表的时间是否在参数表示时间的前面
boolean result1=instant4.isBefore(instant5);
System.out.println(result1);//true

//isAfter:判断调用者代表的时间是否在参数表示时间的后面
boolean result2 = instant4.isAfter(instant5);
System.out.println(result2);//false

//Instant minusXxx(long millisToSubtract) 减少时间系列的方法
Instant instant6 =Instant.ofEpochMilli(3000L);
System.out.println(instant6);//1970-01-01T00:00:03Z

Instant instant7 =instant6.minusSeconds(1);
System.out.println(instant7);//1970-01-01T00:00:02Z
```

### 7.9 包装类

Java提供了两个类型系统，基本类型与引用类型，使用基本类型在于效率，然而很多情况，会创建对象使用，因为对象可以做更多的功能，如果想要我们的基本类型像对象一样操作，就可以使用基本类型对应的包装类，如下：

| 基本类型 | 对应的包装类（位于java.lang包中） |
| -------- | --------------------------------- |
| byte     | Byte                              |
| short    | Short                             |
| int      | **Integer**                       |
| long     | Long                              |
| float    | Float                             |
| double   | Double                            |
| char     | **Character**                     |
| boolean  | Boolean                           |

```java
//public static Integer valueOf(int i)：返回表示指定的 int 值的 Integer 实例
Integer i3 = Integer.valueOf(100);
System.out.println(i3);

//public static Integer valueOf(String s)：返回保存指定String值的Integer对象 
Integer i4 = Integer.valueOf("100");
System.out.println(i4);

//1.把整数转成二进制，十六进制
String str1 = Integer.toBinaryString(100);
System.out.println(str1);//1100100

//2.把整数转成八进制
String str2 = Integer.toOctalString(100);
System.out.println(str2);//144

//3.把整数转成十六进制
String str3 = Integer.toHexString(100);
System.out.println(str3);//64

//将字符串类型的整数转成int类型的整数
//强类型语言:每种数据在java中都有各自的数据类型
//在计算的时候，如果不是同一种数据类型，是无法直接计算的。
int i = Integer.parseInt("123");
System.out.println(i);
System.out.println(i + 1);//124

//8种包装类当中，除了Character都有对应的parseXxx的方法，进行类型转换
String str = "true";
boolean b = Boolean.parseBoolean(str);
System.out.println(b);
```

#### 装箱与拆箱

```java
//基本数值---->包装对象
Integer i = new Integer(4);//使用构造函数函数
Integer iii = Integer.valueOf(4);//使用包装类中的valueOf方法

//包装对象---->基本数值
int num = i.intValue();


//自动拆箱装箱
Integer i = 4;//自动装箱。相当于Integer i = Integer.valueOf(4);
i = i + 5;//等号右边：将i对象转成基本数值(自动拆箱) i.intValue() + 5;
//加法运算完成后，再次装箱，把基本数值转成对象。
```

#### 基本类型转换为String

- 方式一：直接在数字后加一个空字符串
- 方式二：通过String类静态方法valueOf()

#### String转换成基本类型 

```java
//String --- int
String s = "100";
//方式1：String --- Integer --- int
Integer i = Integer.valueOf(s);
//public int intValue()
int x = i.intValue();
System.out.println(x);
//方式2
//public static int parseInt(String s)
int y = Integer.parseInt(s);
System.out.println(y);
```



## 8.正则表达式

### 8.1 正则表达式-字符类

1. \[abc\]：代表a或者b，或者c字符中的一个。
2. \[^abc\]：代表除a,b,c以外的任何字符。
3. [a-z]：代表a-z的所有小写字符中的一个。
4. [A-Z]：代表A-Z的所有大写字符中的一个。
5. [0-9]：代表0-9之间的某一个数字字符。
6. [a-zA-Z0-9]：代表a-z或者A-Z或者0-9之间的任意一个字符。
7. [a-dm-p]：a 到 d 或 m 到 p之间的任意一个字符。 

> "a".matches("[abc]")

### 8.2 正则表达式-逻辑运算符

语法示例：

1. &&：并且
2. |    ：或者
3. \  ：转义字符

```java
   System.out.println("\"");
```

### 8.3 正则表达式-预定义字符

语法示例：

1. "." ： 匹配任何字符。
2. "\d"：任何数字[0-9]的简写；
3. "\D"：任何非数字\[^0-9\]的简写；
4. "\s"： 空白字符：[ \t\n\x0B\f\r] 的简写
5. "\S"： 非空白字符：\[^\s\] 的简写
6. "\w"：单词字符：[a-zA-Z_0-9]的简写
7. "\W"：非单词字符：\[^\w\]

> 必须是数字 字母 下划线 至少 6位

```java
"2442fsfsf".matches("\\w{6,}")
```

### 8.4 正则表达式-数量词

语法示例：

1. X? : 0次或1次 ?
2. X* : 0次到多次*
3. X+ : 1次或多次+
4. X{n} : 恰好n次
5. X{n,} : 至少n次
6. X{n,m}: n到m次(n和m都是包含的)

## 9.集合-常用

![01_集合类体系结构图](https://img.picgo.net/2023/11/06/01_b2049fb450de998e.png)

### 9.1 Collection

> Tip:
>
> ​	Iterator是集合的顶层接口
>
> ​	需要注意的是 Collection 是接口并没有方法体属于单列集合的顶层接口

| 方法名                     | 说明                               |
| :------------------------- | :--------------------------------- |
| boolean add(E e)           | 添加元素                           |
| boolean remove(Object o)   | 从集合中移除指定的元素             |
| boolean removeIf(Object o) | 根据条件进行移除                   |
| void   clear()             | 清空集合中的元素                   |
| boolean contains(Object o) | 判断集合中是否存在指定的元素       |
| boolean isEmpty()          | 判断集合是否为空                   |
| int   size()               | 集合的长度，也就是集合中元素的个数 |

### 9.2 遍历

#### 9.2.1 迭代器遍历

```java
 //创建集合对象
Collection<String> c = new ArrayList<>();

//添加元素
c.add("hello");
c.add("world");
c.add("java");
c.add("javaee");

// 通过集合的.iterator()方法获取 Iterator 对象
Iterator<String> it = c.iterator();

//用while循环改进元素的判断和获取
while (it.hasNext()) {
  String s = it.next();
  System.out.println(s);
}
```

> Tip: 
>
> 删除方法:要使用迭代器自己的 remove()方法
>
> ```java
> //用while循环改进元素的判断和获取
> while (it.hasNext()) {
>   String s = it.next();
>    if("b".equals(s)){
>      //指向谁,那么此时就删除谁.
>      it.remove();
>    }
>   System.out.println(s);
> }
> ```

#### 9.2.2 增强 for

```java
ArrayList<String> list =  new ArrayList<>();
list.add("a");
list.add("b");
list.add("c");
list.add("d");
list.add("e");
list.add("f");

for(String str : list){
  System.out.println(str);
}
```

#### 9.2.3  lambda表达式

```java
Collection<String> coll = new ArrayList<>();

coll.add("zhangsan");
coll.add("lisi");
coll.add("wangwu");

coll.forEach(new Consumer<String>() {
  @Override
  public void accept(String s) {
    System.out.println(s);
  }
});

//lambda表达式
coll.forEach(s -> System.out.println(s));
```

### 9.3 List集合



List集合的特点

- 存取有序

- 可以重复

- 有索引

- ArrayList集合

  ​	底层是数组结构实现，查询快、增删慢

- LinkedList集合

  ​	底层是链表结构实现，查询慢、增删快

新增的方法:

因为有序的原因,所以 List 可以指定 Index索引增删改查



| 方法名                          | 描述                                   |
| ------------------------------- | -------------------------------------- |
| void add(int index,E   element) | 在此集合中的指定位置插入指定的元素     |
| E remove(int   index)           | 删除指定索引处的元素，返回被删除的元素 |
| E set(int index,E   element)    | 修改指定索引处的元素，返回被修改的元素 |
| E get(int   index)              | 返回指定索引处的元素                   |

1. 迭代器
2. 增强for
3. Lambda表达式
4. 普通for循环

```java
for (int i = 0; i < list.size(); i++) {
  //i:依次表示集合中的每一个索引
  String s = list.get(i);
  System.out.println(s);
}
```

5. 列表迭代器

```java
// 使用的方法基本上和迭代器相同iterator
ListIterator<String> it = list.listIterator();
while(it.hasNext()){
    String str = it.next();
    if("bbb".equals(str)){
        //qqq
        it.add("qqq");
    }
}
```

### 9.4 LinkedList集合的特有功能

> Link 使用的是链表结构



| 方法名                    | 说明                             |
| ------------------------- | -------------------------------- |
| public void addFirst(E e) | 在该列表开头插入指定的元素       |
| public void addLast(E e)  | 将指定的元素追加到此列表的末尾   |
| public E getFirst()       | 返回此列表中的第一个元素         |
| public   E getLast()      | 返回此列表中的最后一个元素       |
| public E removeFirst()    | 从此列表中删除并返回第一个元素   |
| public   E removeLast()   | 从此列表中删除并返回最后一个元素 |

### 9.5 Set集合

#### 9.5.1 特点

+ 不可以存储重复元素
+ 没有索引,不能使用普通for循环遍历

### 9.6 TreeSet集合

#### 9.6.1 特点

> 底层是红黑树

+ 不可以存储重复元素
+ 没有索引
+ 可以将元素按照规则进行排序
  + TreeSet()：根据其元素的自然排序进行排序
  + TreeSet(Comparator comparator) ：根据指定的比较器进行排序

#### 9.6.2 排序

> 如果想要修改 TreeSet 中的排序方法,需要Comparable

方法一:

1. 对象需要 implements Comparable
2. Override compareTo

方法二:

在声明的时候重写 Comparator

> Demo

```java
TreeSet<Teacher> ts = new TreeSet<>(new Comparator<Teacher>() {
  @Override
  public int compare(Teacher o1, Teacher o2) {
    //o1表示现在要存入的那个元素
    //o2表示已经存入到集合中的元素

    //主要条件
    int result = o1.getAge() - o2.getAge();
    //次要条件
    result = result == 0 ? o1.getName().compareTo(o2.getName()) : result;
    return result;
  }
});
```

### 9.7 HashSet集合

#### 9.7.1 特点

- 底层数据结构是哈希表
- 存取无序
- 不可以存储重复元素
- 没有索引,不能使用普通for循环遍历

### 9.8 Map集合

#### 9.8.1 特点

- 双列集合,一个键对应一个值
- 键不可以重复,值可以重复



| 方法名                                | 说明                                 |
| ------------------------------------- | ------------------------------------ |
| `V   put(K key,V   value)    `        | 添加元素                             |
| `V   remove(Object key) `             | 根据键删除键值对元素                 |
| `void   clear()   `                   | 移除所有的键值对元素                 |
| `boolean containsKey(Object key)    ` | 判断集合是否包含指定的键             |
| `boolean containsValue(Object value)` | 判断集合是否包含指定的值             |
| `boolean isEmpty()         `          | 判断集合是否为空                     |
| `int size()    `                      | 集合的长度，也就是集合中键值对的个数 |

#### 9.8.2 Map集合的获取功能

| 方法名                             | 说明                     |
| ---------------------------------- | ------------------------ |
| ` V   get(Object key) `            | 根据键获取值             |
| `Set<K>   keySet()`                | 获取所有键的集合         |
| `Collection<V>   values() `        | 获取所有值的集合         |
| `Set<Map.Entry<K,V>>   entrySet()` | 获取所有键值对对象的集合 |

#### 9.8.3 遍历

##### KeySet()

```java
Map<String,String> hp = new HashMap<>();
hp.put("12312","123");
hp.put("1213122312","123");
hp.put("123123412","123");

Set<String> strings = hp.keySet();
for (String string : strings) {
  System.out.println( hp.get(string));
}
```

##### entrySet()

```java
//创建集合对象
Map<String, String> map = new HashMap<String, String>();

//添加元素
map.put("张无忌", "赵敏");
map.put("郭靖", "黄蓉");
map.put("杨过", "小龙女");

//获取所有键值对对象的集合
Set<Map.Entry<String, String>> entrySet = map.entrySet();
//遍历键值对对象的集合，得到每一个键值对对象
for (Map.Entry<String, String> me : entrySet) {
  //根据键值对对象获取键和值
  String key = me.getKey();
  String value = me.getValue();
  System.out.println(key + "," + value);
}
```

### 9.9 HashMap

#### 特点

+ HashMap底层是哈希表结构的
+ 依赖hashCode方法和equals方法保证键的唯一
+ 如果键要存储的是自定义对象，需要重写hashCode和equals方法

### 9.10 TreeMap

+ TreeMap底层是红黑树结构
+ 依赖自然排序或者比较器排序,对键进行排序
+ 如果键存储的是自定义对象,需要实现Comparable接口或者在创建TreeMap对象时候给出比较器排序规则

#### 9.10.1 比较方法的重写

```java
public class Student implements Comparable<Student>{
    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public int compareTo(Student o) {
        //按照年龄进行排序
        int result = o.getAge() - this.getAge();
        //次要条件，按照姓名排序。
        result = result == 0 ? o.getName().compareTo(this.getName()) : result;
        return result;
    }
}
```

## 10 可变参数

**注意：**

​	1.一个方法只能有一个可变参数

​	2.如果方法中有多个参数，可变参数要放到最后。

```java
public class ChangeArgs {
  public static void main(String[] args) {
    int sum = getSum(6, 7, 2, 12, 2121);
    System.out.println(sum);
  }

  public static int getSum(int... arr) {
    int sum = 0;
    for (int a : arr) {
      sum += a;
    }
    return sum;
  }
}
```

## 11 Collections

```java
ArrayList<Integer> list = new ArrayList<Integer>();
//原来写法
//list.add(12);
//list.add(14);
//list.add(15);
//list.add(1000);


//采用工具类 完成 往集合中添加元素  
Collections.addAll(list, 5, 222, 1，2);

//排序方法 
Collections.sort(list);

//打乱集合顺序
Collections.shuffle(list);
```

### 11.1 自定义 sort

```java
// 创建四个学生对象 存储到集合中
ArrayList<Student> list = new ArrayList<Student>();

list.add(new Student("rose",18));
list.add(new Student("jack",16));
list.add(new Student("abc",20));
Collections.sort(list, new Comparator<Student>() {
  @Override
  public int compare(Student o1, Student o2) {
    return o1.getAge()-o2.getAge();//以学生的年龄升序
  }
});


for (Student student : list) {
  System.out.println(student);
}
```

## 12 不可变集合

```java
//不可变的list集合
List<String> list = List.of("张三", "李四", "王五", "赵六");

//不可变的Set集合
Set<String> set = Set.of("张三", "张三", "李四", "王五", "赵六");

//不可变的Map集合
//键值对个数小于等于10
  Map<String, String> map = Map.of("张三", "南京", "张三", "北京", "王五", "上海", "赵六", "广州", "孙七", "深圳", "周八", "杭州","吴九", "宁波", "郑十", "苏州", "刘一", "无锡", "陈二", "嘉兴");

//键值对个数大于10

HashMap<String, String> hm = new HashMap<>();
hm.put("张三", "南京");
hm.put("李四", "北京");
hm.put("王五", "上海");
hm.put("赵六", "北京");
hm.put("孙七", "深圳");
hm.put("周八", "杭州");
hm.put("吴九", "宁波");
hm.put("郑十", "苏州");
hm.put("刘一", "无锡");
hm.put("陈二", "嘉兴");
hm.put("aaa", "111");

方法一:
//获取到所有的键值对对象（Entry对象）
Set<Map.Entry<String, String>> entries = hm.entrySet();
//把entries变成一个数组
Map.Entry[] arr1 = new Map.Entry[0];
//toArray方法在底层会比较集合的长度跟数组的长度两者的大小
//如果集合的长度 > 数组的长度 ：数据在数组中放不下，此时会根据实际数据的个数，重新创建数组
//如果集合的长度 <= 数组的长度：数据在数组中放的下，此时不会创建新的数组，而是直接用
Map.Entry[] arr2 = entries.toArray(arr1);
//不可变的map集合
Map map = Map.ofEntries(arr2);
map.put("bbb","222");

方法二:
Map<String, String> map = Map.copyOf(hm);
map.put("bbb","222");	
```

## 13 Stream流

Stream流的三类方法

- 获取Stream流
  - 创建一条流水线,并把数据放到流水线上准备进行操作
- 中间方法
  - 流水线上的操作
  - 一次操作完毕之后,还可以继续进行其他操作
- 终结方法
  - 一个Stream流只能有一个终结方法
  - 是流水线上的最后一个操作



生成Stream流的方式

- Collection体系集合

  `使用默认方法stream()生成流， default Stream<E> stream()`

- Map体系集合

  把Map转成Set集合，间接的生成流

- 数组

  通过Arrays中的静态方法stream生成流

- 同种数据类型的多个数据

  `通过Stream接口的静态方法of(T... values)生成流`



> Collection体系的集合可以使用默认方法stream()生成流

```java
List<String> list = new ArrayList<String>();
Stream<String> listStream = list.stream();

Set<String> set = new HashSet<String>();
Stream<String> setStream = set.stream();
```



> Map体系的集合间接的生成流

```java
Map<String,Integer> map = new HashMap<String, Integer>();
Stream<String> keyStream = map.keySet().stream();
Stream<Integer> valueStream = map.values().stream();
Stream<Map.Entry<String, Integer>> entryStream = map.entrySet().stream();
```

> 数组可以通过Arrays中的静态方法stream生成流

```java
String[] strArray = {"hello","world","java"};
Stream<String> strArrayStream = Arrays.stream(strArray);
```

> 同种数据类型的多个数据可以通过Stream接口的静态方法of(T... values)生成流

```java
Stream<String> strArrayStream2 = Stream.of("hello", "world", "java");
Stream<Integer> intStream = Stream.of(10, 20, 30);
```

### 13.1 Stream流中间操作方法



| 方法名                                              | 说明                                                       |
| --------------------------------------------------- | ---------------------------------------------------------- |
| ` Stream<T> filter(Predicate predicate)   `         | 用于对流中的数据进行过滤                                   |
| ` Stream<T> limit(long maxSize)     `               | 返回此流中的元素组成的流，截取前指定参数个数的数据         |
| `Stream<T> skip(long n)   `                         | 跳过指定参数个数的数据，返回由该流的剩余元素组成的流       |
| ` static <T> Stream<T> concat(Stream a, Stream b) ` | 合并a和b两个流为一个流                                     |
| `Stream<T> distinct()    `                          | 返回由该流的不同元素（根据Object.equals(Object) ）组成的流 |

> distinct()方法的作用可以理解为去重

### 13.2 Stream流终结操作方法

| 方法名                           | 说明                     |
| -------------------------------- | ------------------------ |
| `void forEach(Consumer action) ` | 对此流的每个元素执行操作 |
| `long count() `                  | 返回此流中的元素数       |

### 13.3 Stream流的收集操作

- 常用方法

  | 方法名                           | 说明               |
  | -------------------------------- | ------------------ |
  | `R collect(Collector collector)` | 把结果收集到集合中 |

- 工具类Collectors提供了具体的收集方式

  | 方法名                                                       | 说明                   |
  | ------------------------------------------------------------ | ---------------------- |
  | `public static <T> Collector toList() `                      | 把元素收集到List集合中 |
  | ` public static <T> Collector toSet()  `                     | 把元素收集到Set集合中  |
  | `public static  Collector toMap(Function keyMapper,Function valueMapper) ` | 把元素收集到Map集合中  |

> toList() toSet()

```java
//filter负责过滤数据的.
//collect负责收集数据.
//获取流中剩余的数据,但是他不负责创建容器,也不负责把数据添加到容器中.
//Collectors.toList() : 在底层会创建一个List集合.并把所有的数据添加到List集合中.
List<Integer> list = list1.stream().filter(number -> number % 2 == 0)
  .collect(Collectors.toList());

System.out.println(list);

Set<Integer> set = list1.stream().filter(number -> number % 2 == 0)
  .collect(Collectors.toSet());
System.out.println(set);
```

> toMap()

```java
ArrayList<String> list = new ArrayList<>();
list.add("zhangsan,23");
list.add("lisi,24");
list.add("wangwu,25");

Map<String, Integer> map = list.stream().filter(
  s -> {
    String[] split = s.split(",");
    int age = Integer.parseInt(split[1]);
    return age >= 24;
  }

  //   collect方法只能获取到流中剩余的每一个数据.
  //在底层不能创建容器,也不能把数据添加到容器当中

  //Collectors.toMap 创建一个map集合并将数据添加到集合当中

  // s 依次表示流中的每一个数据

  //第一个lambda表达式就是如何获取到Map中的键
  //第二个lambda表达式就是如何获取Map中的值
).collect(Collectors.toMap(
  s -> s.split(",")[0],
  s -> Integer.parseInt(s.split(",")[1])));

System.out.println(map);
```

## 14 I/O

| **InputStream**         | OutputStream                |
| ----------------------- | --------------------------- |
| **Reader**              | **Writer**                  |
|                         |                             |
| **FileInputStream**     | **FileOutputStream**        |
| **FileReader**          | **FileWriter**              |
|                         |                             |
| **BufferedInputStream** | **`BufferedOutputStream` ** |
| **BufferedReader**      | **BufferedWriter**          |
|                         |                             |
| **InputStreamReader**   | **OutputStreamWriter**      |
|                         |                             |
| **ObjectInputStream**   | **ObjectOutputStream**      |
|                         |                             |
|                         | **PrintStream**             |
|                         |                             |
| **ZipInputStream**      | **ZipOutputStream**         |
|                         |                             |



### 14.1 顶级父类们

|            |           **输入流**            |              输出流              |
| :--------: | :-----------------------------: | :------------------------------: |
| **字节流** | 字节输入流<br />**InputStream** | 字节输出流<br />**OutputStream** |
| **字符流** |   字符输入流<br />**Reader**    |    字符输出流<br />**Writer**    |

### 14.2 字节输出流【OutputStream】



* `public void close()` ：关闭此输出流并释放与此流相关联的任何系统资源。  
* `public void flush() ` ：刷新此输出流并强制任何缓冲的输出字节被写出。  
* `public void write(byte[] b)`：将 b.length字节从指定的字节数组写入此输出流。  
* `public void write(byte[] b, int off, int len)` ：从指定的字节数组写入 len字节，从偏移量 off开始输出到此输出流。  
* `public abstract void write(int b)` ：将指定的字节输出流。

> 小贴士：
>
> close方法，当完成流的操作时，必须调用此方法，释放系统资源。

### 14.3 FileOutputStream类

```java
// 使用File对象创建流对象
File file = new File("a.txt");
FileOutputStream fos = new FileOutputStream(file);

// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("b.txt");

// 写出数据
fos.write(97); // 写出第1个字节
fos.write(98); // 写出第2个字节
fos.write(99); // 写出第3个字节
fos.write("sadasd".getBytes());
fos.write(b,2,2); // 写出指定长度字节数组write(byte[] b, int off, int len) ,
// 关闭资源
fos.close();
```

数据追加续写

```java
// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("fos.txt"，true);     
```

* 回车符`\r`和换行符`\n` ：
  * 回车符：回到一行的开头（return）。
  * 换行符：下一行（newline）。
* 系统中的换行：
  * Windows系统里，每行结尾是 `回车+换行` ，即`\r\n`；
  * Unix系统里，每行结尾只有 `换行` ，即`\n`；
  * Mac系统里，每行结尾是 `回车` ，即`\r`。从 Mac OS X开始与Linux统一。

### 14.4 字节输入流【InputStream】

- `public void close()` ：关闭此输入流并释放与此流相关联的任何系统资源。    
- `public abstract int read()`： 从输入流读取数据的下一个字节。 
- `public int read(byte[] b)`： 从输入流中读取一些字节数，并将它们存储到字节数组 b中 。

### 14.5 FileInputStream类

```java
// 使用File对象创建流对象
File file = new File("a.txt");
FileInputStream fos = new FileInputStream(file);

// 使用文件名称创建流对象
FileInputStream fos = new FileInputStream("b.txt");
```

#### 读取

```java
// 使用文件名称创建流对象
FileInputStream fis = new FileInputStream("read.txt");
// 读取数据，返回一个字节
int read = fis.read();
System.out.println((char) read);
read = fis.read();
System.out.println((char) read);
read = fis.read();
System.out.println((char) read);
read = fis.read();
System.out.println((char) read);
read = fis.read();
System.out.println((char) read);
// 读取到末尾,返回-1
read = fis.read();
System.out.println( read);



// 循环读取
while ((b = fis.read())!=-1) {
  System.out.println((char)b);
}


// 关闭资源
fis.close();


//数组读取

// 使用文件名称创建流对象.
FileInputStream fis = new FileInputStream("read.txt"); // 文件中为abcde
// 定义变量，作为有效个数
int len ；
// 定义字节数组，作为装字节数据的容器   
byte[] b = new byte[2];
// 循环读取
while (( len= fis.read(b))!=-1) {
  // 每次读取后,把数组变成字符串打印
  System.out.println(new String(b));
  
  System.out.println(new String(b，0，len));//  len 每次读取的有效字节个数
}
// 关闭资源
fis.close();
```

### 14.5 图片复制

```java
public class Copy {
  public static void main(String[] args) throws IOException {
    // 1.创建流对象
    // 1.1 指定数据源
    FileInputStream fis = new FileInputStream("D:\\test.jpg");
    // 1.2 指定目的地
    FileOutputStream fos = new FileOutputStream("test_copy.jpg");

    // 2.读写数据
    // 2.1 定义数组
    byte[] b = new byte[1024];
    // 2.2 定义长度
    int len;
    // 2.3 循环读取
    while ((len = fis.read(b))!=-1) {
      // 2.4 写出数据
      fos.write(b, 0 , len);
    }

    // 3.关闭资源
    fos.close();
    fis.close();
  }
}
```

> 流的关闭原则：先开后关，后开先关。

### 14.6 字符流

当使用字节流读取文本文件时，可能会有一个小问题。就是遇到中文字符时，可能不会显示完整的字符，那是因为一个中文字符可能占用多个字节存储。所以Java提供一些字符流类，以字符为单位读写数据，专门用于处理文本文件。

### 14.7 字符输入流【Reader】

- `public void close()` ：关闭此流并释放与此流相关联的任何系统资源。    
- `public int read()`： 从输入流读取一个字符。 
- `public int read(char[] cbuf)`： 从输入流中读取一些字符，并将它们存储到字符数组 cbuf中 。

### 14.8  FileReader类  

```java
// 使用文件名称创建流对象
FileReader fr = new FileReader("read.txt");
// 定义变量，保存数据
int b ；
  // 循环读取
  while ((b = fr.read())!=-1) {
    System.out.println((char)b);
  }
// 关闭资源
fr.close();


//数组读取
// 使用文件名称创建流对象
FileReader fr = new FileReader("read.txt");
// 定义变量，保存有效字符个数
int len ；
  // 定义字符数组，作为装字符数据的容器
  char[] cbuf = new char[2];
// 循环读取
while ((len = fr.read(cbuf))!=-1) {
  System.out.println(new String(cbuf,0,len));
}
// 关闭资源
fr.close();
```

### 14.9 字符输出流【Writer】

- `void write(int c)` 写入单个字符。
- `void write(char[] cbuf) `写入字符数组。 
- `abstract  void write(char[] cbuf, int off, int len) `写入字符数组的某一部分,off数组的开始索引,len写的字符个数。 
- `void write(String str) `写入字符串。 
- `void write(String str, int off, int len)` 写入字符串的某一部分,off字符串的开始索引,len写的字符个数。
- `void flush() `刷新该流的缓冲。  
- `void close()` 关闭此流，但要先刷新它。 

### 14.10 FileWriter类

```java
//基本的数据写出
// 使用文件名称创建流对象
FileWriter fw = new FileWriter("fw.txt");     
// 写出数据
fw.write(97); // 写出第1个字符
fw.write('b'); // 写出第2个字符
fw.write('C'); // 写出第3个字符
fw.write(30000); // 写出第4个字符，中文编码表中30000对应一个汉字。

/*
        【注意】关闭资源时,与FileOutputStream不同。
      	 如果不关闭,数据只是保存到缓冲区，并未保存到文件。
        */
fw.close();



//数组写出
// 使用文件名称创建流对象
FileWriter fw = new FileWriter("fw.txt");     
// 字符串转换为字节数组
char[] chars = "黑马程序员".toCharArray();

// 写出字符数组
fw.write(chars); // 黑马程序员

// 写出从索引2开始，2个字节。索引2是'程'，两个字节，也就是'程序'。
fw.write(b,2,2); // 程序

// 关闭资源
fos.close();


//字符串写出
// 使用文件名称创建流对象
FileWriter fw = new FileWriter("fw.txt");     
// 字符串
String msg = "黑马程序员";

// 写出字符数组
fw.write(msg); //黑马程序员

// 写出从索引2开始，2个字节。索引2是'程'，两个字节，也就是'程序'。
fw.write(msg,2,2);	// 程序

// 关闭资源
fos.close();
```

> 续写

```java
// 使用文件名称创建流对象，可以续写数据
FileWriter fw = new FileWriter("fw.txt"，true);     
```

> 文件加密
>
> 使用异或

```java
while ((b = fis.read()) != -1) {
  fos.write(b ^ 2);
}
```

### 14.11 缓冲流

#### 字节流

* `public BufferedInputStream(InputStream in)` ：创建一个 新的缓冲输入流。 
* `public BufferedOutputStream(OutputStream out)`： 创建一个新的缓冲输出流。

#### 字符流

* `public BufferedReader(Reader in)` ：创建一个 新的缓冲输入流。 
* `public BufferedWriter(Writer out)`： 创建一个新的缓冲输出流。

缓冲流的基本原理，是在创建流对象时，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减少系统IO次数，从而提高读写的效率。

> 创建

```java
// 创建字节缓冲输入流
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("bis.txt"));
// 创建字节缓冲输出流
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("bos.txt"));
```

> 字符流 特有方法
>
> BufferedReader：`public String readLine()`: 读一行文字。 
>
> BufferedWriter：`public void newLine()`: 写一行行分隔符,由系统属性定义符号。 

```java

// 创建流对象
BufferedReader br = new BufferedReader(new FileReader("in.txt"));
// 定义字符串,保存读取的一行文字
String line  = null;
// 循环读取,读取到最后返回null
while ((line = br.readLine())!=null) {
  System.out.print(line);
  System.out.println("------");
}
// 释放资源
br.close();

```

### 14.12 转换流

* `InputStreamReader(InputStream in)`: 创建一个使用默认字符集的字符流。 
* `InputStreamReader(InputStream in, String charsetName)`: 创建一个指定字符集的字符流。

- `OutputStreamWriter(OutputStream in)`: 创建一个使用默认字符集的字符流。 
- `OutputStreamWriter(OutputStream in, String charsetName)`: 创建一个指定字符集的字符流。

> 创建

```java
// 创建流对象,指定GBK编码
InputStreamReader isr2 = new InputStreamReader(new FileInputStream(FileName) , "GBK");

OutputStreamWriter isr2 = new OutputStreamWriter(new FileOutputStream("out.txt") , "GBK");
```

> Demo

```java

// 1.定义文件路径
String srcFile = "file_gbk.txt";
String destFile = "file_utf8.txt";
// 2.创建流对象
// 2.1 转换输入流,指定GBK编码
InputStreamReader isr = new InputStreamReader(new FileInputStream(srcFile) , "GBK");
// 2.2 转换输出流,默认utf8编码
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(destFile));
// 3.读写数据
// 3.1 定义数组
char[] cbuf = new char[1024];
// 3.2 定义长度
int len;
// 3.3 循环读取
while ((len = isr.read(cbuf))!=-1) {
  // 循环写出
  osw.write(cbuf,0,len);
}
// 4.释放资源
osw.close();
isr.close();

```

### 14.13 序列化与反序列化

#### 序列化-ObjectOutputStream

将Java对象的原始数据类型写出到文件,实现对象的持久存储。

- `public ObjectOutputStream(OutputStream out) `： 创建一个指定OutputStream的ObjectOutputStream。

```java
FileOutputStream fileOut = new FileOutputStream("employee.txt");
ObjectOutputStream out = new ObjectOutputStream(fileOut);
```

实现步骤

* 该类必须实现`java.io.Serializable ` 接口，`Serializable` 是一个标记接口，不实现此接口的类将不会使任何状态序列化或反序列化，会抛出`NotSerializableException` 。
* 该类的所有属性必须是可序列化的。如果有一个属性不需要可序列化的，则该属性必须注明是瞬态的，使用`transient` 关键字修饰。

```java
public class Employee implements java.io.Serializable {
  public String name;
  public String address;
  public transient int age; // transient瞬态修饰成员,不会被序列化
  public void addressCheck() {
    System.out.println("Address  check : " + name + " -- " + address);
  }
}
```

写出对象方法

- `public final void writeObject (Object obj)` : 将指定的对象写出。

```java
Employee e = new Employee();
e.name = "zhangsan";
e.address = "beiqinglu";
e.age = 20; 
try {
  // 创建序列化流对象
  ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("employee.txt"));
  // 写出对象
  out.writeObject(e);
  // 释放资源
  out.close();
  fileOut.close();
  System.out.println("Serialized data is saved"); // 姓名，地址被序列化，年龄没有被序列化。
} catch(IOException i)   {
  i.printStackTrace();
}
```

#### 反序列化-ObjectInputStream类

ObjectInputStream反序列化流，将之前使用ObjectOutputStream序列化的原始数据恢复为对象。 

- `public ObjectInputStream(InputStream in) `： 创建一个指定InputStream的ObjectInputStream。

> Demo

```java
Employee e = null;
try {		
  // 创建反序列化流
  FileInputStream fileIn = new FileInputStream("employee.txt");
  ObjectInputStream in = new ObjectInputStream(fileIn);
  // 读取一个对象
  e = (Employee) in.readObject();
  // 释放资源
  in.close();
  fileIn.close();
}catch(IOException i) {
  // 捕获其他异常
  i.printStackTrace();
  return;
}catch(ClassNotFoundException c)  {
  // 捕获类找不到异常
  System.out.println("Employee class not found");
  c.printStackTrace();
  return;
}
// 无异常,直接打印输出
System.out.println("Name: " + e.name);	// zhangsan
System.out.println("Address: " + e.address); // beiqinglu
System.out.println("age: " + e.age); // 0
```

> 注意:
>
> ​	序列化之后如果修改了 class 文件,则反序列化就会失败
>
> ​	使用版本号
>
> ​	`Serializable` 接口给需要序列化的类，提供了一个序列版本号。`serialVersionUID` 该版本号的目的在于验证序列化的对象和对应类是否版本匹配。

```java
public class Employee implements java.io.Serializable {
  // 加入序列版本号
  private static final long serialVersionUID = 1L;
  public String name;
  public String address;
  // 添加新的属性 ,重新编译, 可以反序列化,该属性赋为默认值.
  public int eid; 

  public void addressCheck() {
    System.out.println("Address  check : " + name + " -- " + address);
  }
}
```

### 14.14 打印流

平时我们在控制台打印输出，是调用`print`方法和`println`方法完成的，这两个方法都来自于`java.io.PrintStream`类，该类能够方便地打印各种数据类型的值，是一种便捷的输出方式。



- `public PrintStream(String fileName)  `： 使用指定的文件名创建一个新的打印流。

> PrintStream ps = new PrintStream("ps.txt")；



#### 改变打印流向

```java
// 调用系统的打印流,控制台直接输出97
System.out.println(97);

// 创建打印流,指定文件的名称
PrintStream ps = new PrintStream("ps.txt");

// 设置系统的打印流流向,输出到ps.txt
System.setOut(ps);
// 调用系统的打印流,ps.txt中输出97
System.out.println(97);
```

### 14.15 压缩流和解压缩流

- ZipInputStream
  - getNextEntry
  - entry.toString
  - mkdirs
- ZipOutputStream

#### 解压流

```java
//1.创建一个File表示要解压的压缩包
File src = new File("D:\\aaa.zip");
//2.创建一个File表示解压的目的地
File dest = new File("D:\\");

//解压的本质：把压缩包里面的每一个文件或者文件夹读取出来，

//创建一个解压缩流用来读取压缩包中的数据
ZipInputStream zip = new ZipInputStream(new FileInputStream(src));

//要先获取到压缩包里面的每一个zipentry对象
//表示当前在压缩包中获取到的文件或者文件夹
ZipEntry entry;


while((entry = zip.getNextEntry()) != null){
  System.out.println(entry);
  if(entry.isDirectory()){
    //文件夹：需要在目的地dest处创建一个同样的文件夹
    File file = new File(dest,entry.toString());
    file.mkdirs();
  }else{
    //文件：需要读取到压缩包中的文件，并把他存放到目的地dest文件夹中（按照层级目录进行存放）
    FileOutputStream fos = new FileOutputStream(new File(dest,entry.toString()));
    int b;
    while((b = zip.read()) != -1){
      //写到目的地
      fos.write(b);
    }
    fos.close();
    //表示在压缩包中的一个文件处理完毕了。
    zip.closeEntry();
  }
}
zip.close();
```

#### 压缩流

##### 压缩文件

```java
/*
         *   压缩流
         *      需求：
         *          把D:\\a.txt打包成一个压缩包
         * */
//1.创建File对象表示要压缩的文件
File src = new File("D:\\a.txt");
//2.创建File对象表示压缩包的位置
File dest = new File("D:\\");


//1.创建压缩流关联压缩包
ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(new File(dest,"a.zip")));
//2.创建ZipEntry对象，表示压缩包里面的每一个文件和文件夹
//参数：压缩包里面的路径
ZipEntry entry = new ZipEntry("aaa\\bbb\\a.txt");
//3.把ZipEntry对象放到压缩包当中
zos.putNextEntry(entry);
//4.把src文件中的数据写到压缩包当中
FileInputStream fis = new FileInputStream(src);
int b;
while((b = fis.read()) != -1){
  zos.write(b);
}
zos.closeEntry();
zos.close();
```

#### 压缩文件夹

获取文件夹中的所有文件 listFiles

```java
/*
         *   压缩流
         *      需求：
         *          把D:\\aaa文件夹压缩成一个压缩包
         * */
//1.创建File对象表示要压缩的文件夹
File src = new File("D:\\aaa");
//2.创建File对象表示压缩包放在哪里（压缩包的父级路径）
File destParent = src.getParentFile();//D:\\
//3.创建File对象表示压缩包的路径
File dest = new File(destParent,src.getName() + ".zip");
//4.创建压缩流关联压缩包
ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(dest));
//5.获取src里面的每一个文件，变成ZipEntry对象，放入到压缩包当中




//1.进入src文件夹
File[] files = src.listFiles();
//2.遍历数组
for (File file : files) {
  if(file.isFile()){
    //3.判断-文件，变成ZipEntry对象，放入到压缩包当中
    ZipEntry entry = new ZipEntry(name + "\\" + file.getName());//aaa\\no1\\a.txt
    zos.putNextEntry(entry);
    //读取文件中的数据，写到压缩包
    FileInputStream fis = new FileInputStream(file);
    int b;
    while((b = fis.read()) != -1){
      zos.write(b);
    }
    fis.close();
    zos.closeEntry();
  }else{
    //4.判断-文件夹，递归
    toZip(file,zos,name + "\\" + file.getName());
    //     no1            aaa   \\   no1
  }
}
}
```

## 15 多线程

### 15.1方式一继承Thread类

方法介绍

| 方法名          | 说明                                        |
| --------------- | ------------------------------------------- |
| `void run() `   | 在线程开启后，此方法将被调用执行            |
| `void start() ` | 使此线程开始执行，Java虚拟机会调用run方法() |

- 实现步骤

  - 定义一个类MyThread继承Thread类
  - `在MyThread类中重写run()方法`
  - 创建MyThread类的对象
  - 启动线程

- 代码

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for(int i=0; i<100; i++) {
            System.out.println(i);
        }
    }
}
public class MyThreadDemo {
    public static void main(String[] args) {
        MyThread my1 = new MyThread();
        MyThread my2 = new MyThread();

//        my1.run();
//        my2.run();

        //void start() 导致此线程开始执行; Java虚拟机调用此线程的run方法
        my1.start();
        my2.start();
    }
}
```

### 15.2 方式二：实现Runnable接口



| 方法名                                 | 说明                   |
| -------------------------------------- | ---------------------- |
| `Thread(Runnable target)  `            | 分配一个新的Thread对象 |
| `Thread(Runnable target, String name)` | 分配一个新的Thread对象 |

实现步骤

- 定义一个类MyRunnable实现Runnable接口
- 在MyRunnable类中重写run()方法
- 创建MyRunnable类的对象
- 创建Thread类的对象，把MyRunnable对象作为构造方法的参数
- 启动线程

```java
public class MyRunnable implements Runnable {
  @Override
  public void run() {
    for(int i=0; i<100; i++) {
      System.out.println(Thread.currentThread().getName()+":"+i);
    }
  }
}
public class MyRunnableDemo {
  public static void main(String[] args) {
    //创建MyRunnable类的对象
    MyRunnable my = new MyRunnable();

    //创建Thread类的对象，把MyRunnable对象作为构造方法的参数
    //Thread(Runnable target)
    //        Thread t1 = new Thread(my);
    //        Thread t2 = new Thread(my);
    //Thread(Runnable target, String name)
    Thread t1 = new Thread(my,"坦克");
    Thread t2 = new Thread(my,"飞机");

    //启动线程
    t1.start();
    t2.start();
  }
}
```

### 15.3 式三: 实现Callable接口

方法介绍

| 方法名                              | 说明                                               |
| ----------------------------------- | -------------------------------------------------- |
| `V call()   `                       | 计算结果，如果无法计算结果，则抛出一个异常         |
| `FutureTask(Callable<V> callable) ` | 创建一个 FutureTask，一旦运行就执行给定的 Callable |
| `V get()                   `        | 如有必要，等待计算完成，然后获取其结果             |

实现步骤

+ 定义一个类MyCallable实现Callable接口
+ `在MyCallable类中重写call()方法`
+ 创建MyCallable类的对象
+ 创建Future的实现类FutureTask对象，把MyCallable对象作为构造方法的参数
+ 创建Thread类的对象，把FutureTask对象作为构造方法的参数
+ 启动线程
+ 再调用get方法，就可以获取线程结束之后的结果。

```java
public class MyCallable implements Callable<String> {
  @Override
  public String call() throws Exception {
    for (int i = 0; i < 100; i++) {
      System.out.println("跟女孩表白" + i);
    }
    //返回值就表示线程运行完毕之后的结果
    return "答应";
  }
}
public class Demo {
  public static void main(String[] args) throws ExecutionException, InterruptedException {
    //线程开启之后需要执行里面的call方法
    MyCallable mc = new MyCallable();

    //Thread t1 = new Thread(mc);

    //可以获取线程执行完毕之后的结果.也可以作为参数传递给Thread对象
    FutureTask<String> ft = new FutureTask<>(mc);

    //创建线程对象
    Thread t1 = new Thread(ft);

    String s = ft.get();
    //开启线程
    t1.start();

    //String s = ft.get();
    System.out.println(s);
  }
}
```

### 15.4三种方法的比较

三种实现方式的对比

+ 实现Runnable、Callable接口
  + 好处: 扩展性强，实现该接口的同时还可以继承其他的类
  + 缺点: 编程相对复杂，不能直接使用Thread类中的方法
+ 继承Thread类
  + 好处: 编程比较简单，可以直接使用Thread类中的方法
  + 缺点: 可以扩展性较差，不能再继承其他的类

### 15.6设置和获取线程名称

方法介绍

| 方法名                       | 说明                               |
| ---------------------------- | ---------------------------------- |
| `void  setName(String name)` | 将此线程的名称更改为等于参数name   |
| `String  getName()   `       | 返回此线程的名称                   |
| `Thread  currentThread() `   | 返回对当前正在执行的线程对象的引用 |

```java
public class MyThread extends Thread {
  public MyThread() {}
  public MyThread(String name) {
    super(name);
  }

  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      System.out.println(getName()+":"+i);
    }
  }
}
public class MyThreadDemo {
  public static void main(String[] args) {
    MyThread my1 = new MyThread();
    MyThread my2 = new MyThread();

    //void setName(String name)：将此线程的名称更改为等于参数 name
    my1.setName("高铁");
    my2.setName("飞机");

    //Thread(String name)
    MyThread my1 = new MyThread("高铁");
    MyThread my2 = new MyThread("飞机");

    my1.start();
    my2.start();

    //static Thread currentThread() 返回对当前正在执行的线程对象的引用
    System.out.println(Thread.currentThread().getName());
  }
}
```

### 15.7 线程休眠

相关方法

| 方法名                           | 说明                                             |
| -------------------------------- | ------------------------------------------------ |
| `static void sleep(long millis)` | 使当前正在执行的线程停留（暂停执行）指定的毫秒数 |

### 15.8 线程优先级

优先级相关方法

| 方法名                                      | 说明                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| `final int getPriority()     `              | 返回此线程的优先级                                           |
| ` final void setPriority(int newPriority) ` | 更改此线程的优先级线程默认优先级是5；线程优先级的范围是：1-10 |

```java
public class MyCallable implements Callable<String> {
  @Override
  public String call() throws Exception {
    for (int i = 0; i < 100; i++) {
      System.out.println(Thread.currentThread().getName() + "---" + i);
    }
    return "线程执行完毕了";
  }
}
public class Demo {
  public static void main(String[] args) {
    //优先级: 1 - 10 默认值:5
    MyCallable mc = new MyCallable();

    FutureTask<String> ft = new FutureTask<>(mc);

    Thread t1 = new Thread(ft);
    t1.setName("飞机");
    t1.setPriority(10);
    //System.out.println(t1.getPriority());//5
    t1.start();

    MyCallable mc2 = new MyCallable();

    FutureTask<String> ft2 = new FutureTask<>(mc2);

    Thread t2 = new Thread(ft2);
    t2.setName("坦克");
    t2.setPriority(1);
    //System.out.println(t2.getPriority());//5
    t2.start();
  }
}
```

### 15.9 守护线程

相关方法

| 方法名                       | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `void setDaemon(boolean on)` | 将此线程标记为守护线程，当运行的线程都是守护线程时，Java虚拟机将退出 |

```java
public class MyThread1 extends Thread {
  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      System.out.println(getName() + "---" + i);
    }
  }
}
public class MyThread2 extends Thread {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      System.out.println(getName() + "---" + i);
    }
  }
}
public class Demo {
  public static void main(String[] args) {
    MyThread1 t1 = new MyThread1();
    MyThread2 t2 = new MyThread2();

    t1.setName("女神");
    t2.setName("备胎");

    //把第二个线程设置为守护线程
    //当普通线程执行完之后,那么守护线程也没有继续运行下去的必要了.
    t2.setDaemon(true);

    t1.start();
    t2.start();
  }
}
```

### 15.10 线程同步

- 代码格式

```java
synchronized(任意对象) { 
	多条语句操作共享数据的代码 
}
```

synchronized(任意对象)：就相当于给代码加锁了，任意对象就可以看成是一把锁

同步的好处和弊端  

- 好处：解决了多线程的数据安全问题

- 弊端：当线程很多时，因为每个线程都会去判断同步上的锁，这是很耗费资源的，无形中会降低程序的运行效率

```java
public class SellTicket implements Runnable {
  private int tickets = 100;
  private Object obj = new Object();

  @Override
  public void run() {
    while (true) {
      synchronized (obj) { // 对可能有安全问题的代码加锁,多个线程必须使用同一把锁
        //t1进来后，就会把这段代码给锁起来
        if (tickets > 0) {
          try {
            Thread.sleep(100);
            //t1休息100毫秒
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
          //窗口1正在出售第100张票
          System.out.println(Thread.currentThread().getName() + "正在出售第" + tickets + "张票");
          tickets--; //tickets = 99;
        }
      }
      //t1出来了，这段代码的锁就被释放了
    }
  }
}

public class SellTicketDemo {
  public static void main(String[] args) {
    SellTicket st = new SellTicket();

    Thread t1 = new Thread(st, "窗口1");
    Thread t2 = new Thread(st, "窗口2");
    Thread t3 = new Thread(st, "窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}
```

#### 应用

- 同步方法的格式

  同步方法：就是把synchronized关键字加到方法上

  ```java
  修饰符 synchronized 返回值类型 方法名(方法参数) { 
  	方法体；
  }
  ```

  同步方法的锁对象是什么呢?

  ​	this

- 静态同步方法

  同步静态方法：就是把synchronized关键字加到静态方法上

  ```java
  修饰符 static synchronized 返回值类型 方法名(方法参数) { 
  	方法体；
  }
  ```

  同步静态方法的锁对象是什么呢?

  ​	类名.class

- 代码演示

```java
public class MyRunnable implements Runnable {
  private static int ticketCount = 100;

  @Override
  public void run() {
    while(true){
      if("窗口一".equals(Thread.currentThread().getName())){
        //同步方法
        boolean result = synchronizedMthod();
        if(result){
          break;
        }
      }

      if("窗口二".equals(Thread.currentThread().getName())){
        //同步代码块
        synchronized (MyRunnable.class){
          if(ticketCount == 0){
            break;
          }else{
            try {
              Thread.sleep(10);
            } catch (InterruptedException e) {
              e.printStackTrace();
            }
            ticketCount--;
            System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticketCount + "张票");
          }
        }
      }

    }
  }

  private static synchronized boolean synchronizedMthod() {
    if(ticketCount == 0){
      return true;
    }else{
      try {
        Thread.sleep(10);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      ticketCount--;
      System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticketCount + "张票");
      return false;
    }
  }
}
```

### 15.11 Lock

Lock是接口不能直接实例化，这里采用它的实现类ReentrantLock来实例化

- ReentrantLock构造方法

  | 方法名          | 说明                        |
  | --------------- | --------------------------- |
  | ReentrantLock() | 创建一个ReentrantLock的实例 |

- 加锁解锁方法

  | 方法名        | 说明   |
  | ------------- | ------ |
  | void lock()   | 获得锁 |
  | void unlock() | 释放锁 |

- 代码演示

  ```java
  public class Ticket implements Runnable {
    //票的数量
    private int ticket = 100;
    private Object obj = new Object();
    private ReentrantLock lock = new ReentrantLock();
  
    @Override
    public void run() {
      while (true) {
        //synchronized (obj){//多个线程必须使用同一把锁.
        try {
          lock.lock();
          if (ticket <= 0) {
            //卖完了
            break;
          } else {
            Thread.sleep(100);
            ticket--;
            System.out.println(Thread.currentThread().getName() + "在卖票,还剩下" + ticket + "张票");
          }
        } catch (InterruptedException e) {
          e.printStackTrace();
        } finally {
          lock.unlock();
        }
        // }
      }
    }
  }
  
  public class Demo {
    public static void main(String[] args) {
      Ticket ticket = new Ticket();
  
      Thread t1 = new Thread(ticket);
      Thread t2 = new Thread(ticket);
      Thread t3 = new Thread(ticket);
  
      t1.setName("窗口一");
      t2.setName("窗口二");
      t3.setName("窗口三");
  
      t1.start();
      t2.start();
      t3.start();
    }
  }

### 15.12 生产者消费者

- Object类的等待和唤醒方法

  | 方法名              | 说明                                                         |
  | ------------------- | ------------------------------------------------------------ |
  | `void wait()  `     | 导致当前线程等待，直到另一个线程调用该对象的 notify()方法或 notifyAll()方法 |
  | `void notify()  `   | 唤醒正在等待对象监视器的单个线程                             |
  | `void notifyAll() ` | 唤醒正在等待对象监视器的所有线程                             |

> 创建锁对象

```java
private final Object lock = new Object();
```

> 唤醒消费者

```java
desk.getLock().notifyAll();
```

> 等待线程

```java
 desk.getLock().wait();
```

### 15.13 阻塞队列

+ 阻塞队列继承结构

![image-20231106195411939](https://img.picgo.net/2023/11/06/image-20231106195411939d1907dbb12798cb0.png)

- 常见BlockingQueue:

  ArrayBlockingQueue: 底层是数组,有界

  LinkedBlockingQueue: 底层是链表,无界.但不是真正的无界,最大为int的最大值

- BlockingQueue的核心方法:

  `put(anObject): 将参数放入队列,如果放不进去会阻塞`

  `take(): 取出第一个数据,取不到会阻塞`

```java
public class Demo02 {
  public static void main(String[] args) throws Exception {
    // 创建阻塞队列的对象,容量为 1
    ArrayBlockingQueue<String> arrayBlockingQueue = new ArrayBlockingQueue<>(1);

    // 存储元素
    arrayBlockingQueue.put("汉堡包");

    // 取元素
    System.out.println(arrayBlockingQueue.take());
    System.out.println(arrayBlockingQueue.take()); // 取不到会阻塞

    System.out.println("程序结束了");
  }
}
public class Demo02 {
  public static void main(String[] args) throws Exception {
    // 创建阻塞队列的对象,容量为 1
    ArrayBlockingQueue<String> arrayBlockingQueue = new ArrayBlockingQueue<>(1);

    // 存储元素
    arrayBlockingQueue.put("汉堡包");

    // 取元素
    System.out.println(arrayBlockingQueue.take());
    System.out.println(arrayBlockingQueue.take()); // 取不到会阻塞

    System.out.println("程序结束了");
  }
}
```

#### 15.13.1 阻塞队列实现等待唤醒机制

```java
public class Cooker extends Thread {

  private ArrayBlockingQueue<String> bd;

  public Cooker(ArrayBlockingQueue<String> bd) {
    this.bd = bd;
  }
  //    生产者步骤：
  //            1，判断桌子上是否有汉堡包
  //    如果有就等待，如果没有才生产。
  //            2，把汉堡包放在桌子上。
  //            3，叫醒等待的消费者开吃。

  @Override
  public void run() {
    while (true) {
      try {
        bd.put("汉堡包");
        System.out.println("厨师放入一个汉堡包");
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }
}

public class Foodie extends Thread {
  private ArrayBlockingQueue<String> bd;

  public Foodie(ArrayBlockingQueue<String> bd) {
    this.bd = bd;
  }

  @Override
  public void run() {
    //        1，判断桌子上是否有汉堡包。
    //        2，如果没有就等待。
    //        3，如果有就开吃
    //        4，吃完之后，桌子上的汉堡包就没有了
    //                叫醒等待的生产者继续生产
    //        汉堡包的总数量减一

    //套路:
    //1. while(true)死循环
    //2. synchronized 锁,锁对象要唯一
    //3. 判断,共享数据是否结束. 结束
    //4. 判断,共享数据是否结束. 没有结束
    while (true) {
      try {
        String take = bd.take();
        System.out.println("吃货将" + take + "拿出来吃了");
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }

  }
}

public class Demo {
  public static void main(String[] args) {
    ArrayBlockingQueue<String> bd = new ArrayBlockingQueue<>(1);

    Foodie f = new Foodie(bd);
    Cooker c = new Cooker(bd);

    f.start();
    c.start();
  }
}
```

### 15.14 线程池

#### 15.14.1 线程的状态

```java
public class Thread {

  public enum State {

    /* 新建 */
    NEW , 

    /* 可运行状态 */
    RUNNABLE , 

    /* 阻塞状态 */
    BLOCKED , 

    /* 无限等待状态 */
    WAITING , 

    /* 计时等待 */
    TIMED_WAITING , 

    /* 终止 */
    TERMINATED;

  }

  // 获取当前线程的状态
  public State getState() {
    return jdk.internal.misc.VM.toThreadState(threadStatus);
  }

}
```

| 线程状态      | 具体含义                                                     |
| ------------- | ------------------------------------------------------------ |
| NEW           | 一个尚未启动的线程的状态。也称之为初始状态、开始状态。线程刚被创建，但是并未启动。还没调用start方法。MyThread t = new MyThread()只有线程象，没有线程特征。 |
| RUNNABLE      | 当我们调用线程对象的start方法，那么此时线程对象进入了RUNNABLE状态。那么此时才是真正的在JVM进程中创建了一个线程，线程一经启动并不是立即得到执行，线程的运行与否要听令与CPU的调度，那么我们把这个中间状态称之为可执行状态(RUNNABLE)也就是说它具备执行的资格，但是并没有真正的执行起来而是在等待CPU的度。 |
| BLOCKED       | 当一个线程试图获取一个对象锁，而该对象锁被其他的线程持有，则该线程进入Blocked状态；当该线程持有锁时，该线程将变成Runnable状态。 |
| WAITING       | 一个正在等待的线程的状态。也称之为等待状态。造成线程等待的原因有两种，分别是调用Object.wait()、join()方法。处于等待状态的线程，正在等待其他线程去执行一个特定的操作。例如：因为wait()而等待的线程正在等待另一个线程去调用notify()或notifyAll()；一个因为join()而等待的线程正在等待另一个线程结束。 |
| TIMED_WAITING | 一个在限定时间内等待的线程的状态。也称之为限时等待状态。造成线程限时等待状态的原因有三种，分别是：Thread.sleep(long)，Object.wait(long)、join(long)。 |
| TERMINATED    | 一个完全运行完成的线程的状态。也称之为终止状态、结束状态     |

#### 15.14.2 线程池

- static ExecutorService newCachedThreadPool()   创建一个默认的线程池
- static newFixedThreadPool(int nThreads)	    创建一个指定最多线程数量的线程池

```java
package com.itheima.mythreadpool;


//static ExecutorService newCachedThreadPool()   创建一个默认的线程池
//static newFixedThreadPool(int nThreads)	    创建一个指定最多线程数量的线程池

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MyThreadPoolDemo {
  public static void main(String[] args) throws InterruptedException {

    //1,创建一个默认的线程池对象.池子中默认是空的.默认最多可以容纳int类型的最大值.
    ExecutorService executorService = Executors.newCachedThreadPool();
    //Executors --- 可以帮助我们创建线程池对象
    //ExecutorService --- 可以帮助我们控制线程池

    executorService.submit(()->{
      System.out.println(Thread.currentThread().getName() + "在执行了");
    });

    //Thread.sleep(2000);

    executorService.submit(()->{
      System.out.println(Thread.currentThread().getName() + "在执行了");
    });

    executorService.shutdown();
  }
}

```

##### 指定线程上限

```java
package com.itheima.mythreadpool;

//static ExecutorService newFixedThreadPool(int nThreads)
//创建一个指定最多线程数量的线程池

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class MyThreadPoolDemo2 {
  public static void main(String[] args) {
    //参数不是初始值而是最大值
    ExecutorService executorService = Executors.newFixedThreadPool(10);

    ThreadPoolExecutor pool = (ThreadPoolExecutor) executorService;
    System.out.println(pool.getPoolSize());//0

    executorService.submit(()->{
      System.out.println(Thread.currentThread().getName() + "在执行了");
    });

    executorService.submit(()->{
      System.out.println(Thread.currentThread().getName() + "在执行了");
    });

    System.out.println(pool.getPoolSize());//2
    //        executorService.shutdown();
  }
}

```

#### 15.14.3 线程池-ThreadPoolExecutor

**创建线程池对象 :** 

ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(核心线程数量,最大线程数量,空闲线程最大存活时间,任务队列,创建线程工厂,任务的拒绝策略);

```java
package com.itheima.mythreadpool;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MyThreadPoolDemo3 {
  //    参数一：核心线程数量
  //    参数二：最大线程数
  //    参数三：空闲线程最大存活时间
  //    参数四：时间单位
  //    参数五：任务队列
  //    参数六：创建线程工厂
  //    参数七：任务的拒绝策略
  public static void main(String[] args) {
    ThreadPoolExecutor pool = new ThreadPoolExecutor(2,5,2,TimeUnit.SECONDS,new ArrayBlockingQueue<>(10), Executors.defaultThreadFactory(),new ThreadPoolExecutor.AbortPolicy());
    pool.submit(new MyRunnable());
    pool.submit(new MyRunnable());

    pool.shutdown();
  }
}
```

![image-20231106195633410](https://img.picgo.net/2023/11/06/image-202311061956334100e42528840fea0dc.png)

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler)

  corePoolSize：   核心线程的最大值，不能小于0
  maximumPoolSize：最大线程数，不能小于等于0，maximumPoolSize >= corePoolSize
  keepAliveTime：  空闲线程最大存活时间,不能小于0
  unit：           时间单位
  workQueue：      任务队列，不能为null
  threadFactory：  创建线程工厂,不能为null      
  handler：        任务的拒绝策略,不能为null  
```

#### 15.14.5 线程池-非默认任务拒绝策略

```java
ThreadPoolExecutor.AbortPolicy: 		    丢弃任务并抛出RejectedExecutionException异常。是默认的策略。
ThreadPoolExecutor.DiscardPolicy： 		   丢弃任务，但是不抛出异常 这是不推荐的做法。
ThreadPoolExecutor.DiscardOldestPolicy：    抛弃队列中等待最久的任务 然后把当前任务加入队列中。
ThreadPoolExecutor.CallerRunsPolicy:        调用任务的run()方法绕过线程池直接执行。
```

## 16 网络编程

### 16.1 IP

InetAddress：此类表示Internet协议（IP）地址

- 相关方法

  | 方法名                                    | 说明                                                         |
  | ----------------------------------------- | ------------------------------------------------------------ |
  | static InetAddress getByName(String host) | 确定主机名称的IP地址。主机名称可以是机器名称，也可以是IP地址 |
  | String getHostName()                      | 获取此IP地址的主机名                                         |
  | String getHostAddress()                   | 返回文本显示中的IP地址字符串                                 |

```java
public class InetAddressDemo {
  public static void main(String[] args) throws UnknownHostException {
    //InetAddress address = InetAddress.getByName("itheima");
    InetAddress address = InetAddress.getByName("192.168.1.66");

    //public String getHostName()：获取此IP地址的主机名
    String name = address.getHostName();
    //public String getHostAddress()：返回文本显示中的IP地址字符串
    String ip = address.getHostAddress();

    System.out.println("主机名：" + name);
    System.out.println("IP地址：" + ip);
  }
}
```

### 16.2 UDP通信程序

#### 16.2.1发送信息

- 构造方法

  | 方法名                                                      | 说明                                                 |
  | ----------------------------------------------------------- | ---------------------------------------------------- |
  | DatagramSocket()                                            | 创建数据报套接字并将其绑定到本机地址上的任何可用端口 |
  | DatagramPacket(byte[] buf,int len,InetAddress add,int port) | 创建数据包,发送长度为len的数据包到指定主机的指定端口 |

- 相关方法

  | 方法名                         | 说明                   |
  | ------------------------------ | ---------------------- |
  | void send(DatagramPacket p)    | 发送数据报包           |
  | void close()                   | 关闭数据报套接字       |
  | void receive(DatagramPacket p) | 从此套接字接受数据报包 |

- 发送数据的步骤

  - 创建发送端的Socket对象(DatagramSocket)
  - 创建数据，并把数据打包
  - 调用DatagramSocket对象的方法发送数据
  - 关闭发送端

  #### 

```java
public class SendDemo {
  public static void main(String[] args) throws IOException {
    //创建发送端的Socket对象(DatagramSocket)
    // DatagramSocket() 构造数据报套接字并将其绑定到本地主机上的任何可用端口
    DatagramSocket ds = new DatagramSocket();

    //创建数据，并把数据打包
    //DatagramPacket(byte[] buf, int length, InetAddress address, int port)
    //构造一个数据包，发送长度为 length的数据包到指定主机上的指定端口号。
    byte[] bys = "hello,udp,我来了".getBytes();

    DatagramPacket dp = new DatagramPacket(bys,bys.length,InetAddress.getByName("127.0.0.1"),10086);

    //调用DatagramSocket对象的方法发送数据
    //void send(DatagramPacket p) 从此套接字发送数据报包
    ds.send(dp);

    //关闭发送端
    //void close() 关闭此数据报套接字
    ds.close();
  }
}
```

#### 16.2.2 接收信息

- 接收数据的步骤

  - 创建接收端的Socket对象(DatagramSocket)
  - 创建一个数据包，用于接收数据
  - 调用DatagramSocket对象的方法接收数据
  - 解析数据包，并把数据在控制台显示
  - 关闭接收端

- 构造方法

  | 方法名                              | 说明                                            |
  | ----------------------------------- | ----------------------------------------------- |
  | DatagramPacket(byte[] buf, int len) | 创建一个DatagramPacket用于接收长度为len的数据包 |

- 相关方法

  | 方法名            | 说明                                     |
  | ----------------- | ---------------------------------------- |
  | byte[]  getData() | 返回数据缓冲区                           |
  | int  getLength()  | 返回要发送的数据的长度或接收的数据的长度 |

- 示例代码

```java
public class ReceiveDemo {
  public static void main(String[] args) throws IOException {
    //创建接收端的Socket对象(DatagramSocket)
    DatagramSocket ds = new DatagramSocket(12345);

    //创建一个数据包，用于接收数据
    byte[] bys = new byte[1024];
    DatagramPacket dp = new DatagramPacket(bys, bys.length);

    //调用DatagramSocket对象的方法接收数据
    ds.receive(dp);

    //解析数据包，并把数据在控制台显示
    System.out.println("数据是：" + new String(dp.getData(), 0,                                             dp.getLength()));
  }
}
}
```

#### 16.2.3 UDP三种通讯方式

- 单播

  单播用于两个主机之间的端对端通信

- 组播

  组播用于对一组特定的主机进行通信

- 广播

  广播用于一个主机对整个局域网上所有主机上的数据通信

#### 16.2.4 组播实现

实现步骤

- 发送端
  1. 创建发送端的Socket对象(DatagramSocket)
  2. 创建数据，并把数据打包(DatagramPacket)
  3. 调用DatagramSocket对象的方法发送数据(在单播中,这里是发给指定IP的电脑但是在组播当中,这里是发给组播地址)
  4. 释放资源
- 接收端
  1. 创建接收端Socket对象(MulticastSocket)
  2. 创建一个箱子,用于接收数据
  3. 把当前计算机绑定一个组播地址
  4. 将数据接收到箱子中
  5. 解析数据包,并打印数据
  6. 释放资源

```java
// 发送端
public class ClinetDemo {
  public static void main(String[] args) throws IOException {
    // 1. 创建发送端的Socket对象(DatagramSocket)
    DatagramSocket ds = new DatagramSocket();
    String s = "hello 组播";
    byte[] bytes = s.getBytes();
    InetAddress address = InetAddress.getByName("224.0.1.0");
    int port = 10000;
    // 2. 创建数据，并把数据打包(DatagramPacket)
    DatagramPacket dp = new DatagramPacket(bytes,bytes.length,address,port);
    // 3. 调用DatagramSocket对象的方法发送数据(在单播中,这里是发给指定IP的电脑但是在组播当中,这里是发给组播地址)
    ds.send(dp);
    // 4. 释放资源
    ds.close();
  }
}
// 接收端
public class ServerDemo {
  public static void main(String[] args) throws IOException {
    // 1. 创建接收端Socket对象(MulticastSocket)
    MulticastSocket ms = new MulticastSocket(10000);
    // 2. 创建一个箱子,用于接收数据
    DatagramPacket dp = new DatagramPacket(new byte[1024],1024);
    // 3. 把当前计算机绑定一个组播地址,表示添加到这一组中.
    ms.joinGroup(InetAddress.getByName("224.0.1.0"));
    // 4. 将数据接收到箱子中
    ms.receive(dp);
    // 5. 解析数据包,并打印数据
    byte[] data = dp.getData();
    int length = dp.getLength();
    System.out.println(new String(data,0,length));
    // 6. 释放资源
    ms.close();
  }
}
```

#### 16.2.5 UDP广播实现

- 实现步骤

  - 发送端
    1. 创建发送端Socket对象(DatagramSocket)
    2. 创建存储数据的箱子,将广播地址封装进去
    3. 发送数据
    4. 释放资源
  - 接收端
    1. 创建接收端的Socket对象(DatagramSocket)
    2. 创建一个数据包，用于接收数据
    3. 调用DatagramSocket对象的方法接收数据
    4. 解析数据包，并把数据在控制台显示
    5. 关闭接收端

- 代码实现

```java
// 发送端
public class ClientDemo {
  public static void main(String[] args) throws IOException {
    // 1. 创建发送端Socket对象(DatagramSocket)
    DatagramSocket ds = new DatagramSocket();
    // 2. 创建存储数据的箱子,将广播地址封装进去
    String s = "广播 hello";
    byte[] bytes = s.getBytes();
    InetAddress address = InetAddress.getByName("255.255.255.255");
    int port = 10000;
    DatagramPacket dp = new DatagramPacket(bytes,bytes.length,address,port);
    // 3. 发送数据
    ds.send(dp);
    // 4. 释放资源
    ds.close();
  }
}

// 接收端
public class ServerDemo {
  public static void main(String[] args) throws IOException {
    // 1. 创建接收端的Socket对象(DatagramSocket)
    DatagramSocket ds = new DatagramSocket(10000);
    // 2. 创建一个数据包，用于接收数据
    DatagramPacket dp = new DatagramPacket(new byte[1024],1024);
    // 3. 调用DatagramSocket对象的方法接收数据
    ds.receive(dp);
    // 4. 解析数据包，并把数据在控制台显示
    byte[] data = dp.getData();
    int length = dp.getLength();
    System.out.println(new String(data,0,length));
    // 5. 关闭接收端
    ds.close();
  }
}
```

### 16.3 TCP发送数据

#### 16.3.1 发送数据

- 构造方法

  | 方法名                               | 说明                                           |
  | ------------------------------------ | ---------------------------------------------- |
  | Socket(InetAddress address,int port) | 创建流套接字并将其连接到指定IP指定端口号       |
  | Socket(String host, int port)        | 创建流套接字并将其连接到指定主机上的指定端口号 |

- 相关方法

  | 方法名                         | 说明                 |
  | ------------------------------ | -------------------- |
  | InputStream  getInputStream()  | 返回此套接字的输入流 |
  | OutputStream getOutputStream() | 返回此套接字的输出流 |

- 示例代码

```java
public class Client {
  public static void main(String[] args) throws IOException {
    //TCP协议，发送数据

    //1.创建Socket对象
    //细节：在创建对象的同时会连接服务端
    //      如果连接不上，代码会报错
    Socket socket = new Socket("127.0.0.1",10000);

    //2.可以从连接通道中获取输出流
    OutputStream os = socket.getOutputStream();
    //写出数据
    os.write("aaa".getBytes());

    //3.释放资源
    os.close();
    socket.close();
  }
}
```

#### 16.3.2 TCP接收数据

- 构造方法

  | 方法名                  | 说明                             |
  | ----------------------- | -------------------------------- |
  | ServletSocket(int port) | 创建绑定到指定端口的服务器套接字 |

- 相关方法

  | 方法名          | 说明                           |
  | --------------- | ------------------------------ |
  | Socket accept() | 监听要连接到此的套接字并接受它 |

- 注意事项

  1. accept方法是阻塞的,作用就是等待客户端连接
  2. 客户端创建对象并连接服务器,此时是通过三次握手协议,保证跟服务器之间的连接
  3. 针对客户端来讲,是往外写的,所以是输出流
     针对服务器来讲,是往里读的,所以是输入流
  4. read方法也是阻塞的
  5. 客户端在关流的时候,还多了一个往服务器写结束标记的动作
  6. 最后一步断开连接,通过四次挥手协议保证连接终止

- 三次握手和四次挥手

  - ![07_TCP三次握手](https://img.picgo.net/2023/11/06/07_TCPe1d432c6585012c9.png)


- 四次挥手
  - ![image-20231106200054397](https://img.picgo.net/2023/11/06/image-20231106200054397dc5c73343393cbcb.png)

```java
public class Server {
  public static void main(String[] args) throws IOException {
    //TCP协议，接收数据

    //1.创建对象ServerSocker
    ServerSocket ss = new ServerSocket(10000);

    //2.监听客户端的链接
    Socket socket = ss.accept();

    //3.从连接通道中获取输入流读取数据
    InputStream is = socket.getInputStream();
    int b;
    while ((b = is.read()) != -1){
      System.out.println((char) b);
    }

    //4.释放资源
    socket.close();
    ss.close();
  }
}
```

## 17 反射

### 17.1 获取字节码文件对象的三种方式

* Class这个类里面的静态方法forName（“全类名”）**（最常用）**
* 通过class属性获取  
* 通过对象获取字节码文件对象

```java
//1.Class这个类里面的静态方法forName
//Class.forName("类的全类名")： 全类名 = 包名 + 类名
Class clazz1 = Class.forName("com.itheima.reflectdemo.Student");
//源代码阶段获取 --- 先把Student加载到内存中，再获取字节码文件的对象
//clazz 就表示Student这个类的字节码文件对象。
//就是当Student.class这个文件加载到内存之后，产生的字节码文件对象


//2.通过class属性获取
//类名.class
Class clazz2 = Student.class;

//因为class文件在硬盘中是唯一的，所以，当这个文件加载到内存之后产生的对象也是唯一的
System.out.println(clazz1 == clazz2);//true


//3.通过Student对象获取字节码文件对象
Student s = new Student();
Class clazz3 = s.getClass();
System.out.println(clazz1 == clazz2);//true
System.out.println(clazz2 == clazz3);//true
```

### 17.2 获取构造方法

规则：

​	get表示获取

​	Declared表示私有

​	最后的s表示所有，复数形式

​	如果当前获取到的是私有的，必须要临时修改访问权限，否则无法使用

| 方法名                                                       | 说明                              |
| ------------------------------------------------------------ | --------------------------------- |
| ` Constructor<?>[] getConstructors() `                       | 获得所有的构造（只能public修饰）  |
| `Constructor<?>[] getDeclaredConstructors()    `             | 获得所有的构造（包含private修饰） |
| `Constructor<T> getConstructor(Class<?>... parameterTypes)  ` | 获取指定构造（只能public修饰）    |
| `Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)` |                                   |

```java
public class ReflectDemo2 {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {
    //1.获得整体（class字节码文件对象）
    Class clazz = Class.forName("com.itheima.reflectdemo.Student");


    //2.获取构造方法对象
    //获取所有构造方法（public）
    Constructor[] constructors1 = clazz.getConstructors();
    for (Constructor constructor : constructors1) {
      System.out.println(constructor);
    }

    System.out.println("=======================");

    //获取所有构造（带私有的）
    Constructor[] constructors2 = clazz.getDeclaredConstructors();

    for (Constructor constructor : constructors2) {
      System.out.println(constructor);
    }
    System.out.println("=======================");

    //获取指定的空参构造
    Constructor con1 = clazz.getConstructor();
    System.out.println(con1);

    Constructor con2 = clazz.getConstructor(String.class,int.class);
    System.out.println(con2);

    System.out.println("=======================");
    //获取指定的构造(所有构造都可以获取到，包括public包括private)
    Constructor con3 = clazz.getDeclaredConstructor();
    System.out.println(con3);
    //了解 System.out.println(con3 == con1);
    //每一次获取构造方法对象的时候，都会新new一个。

    Constructor con4 = clazz.getDeclaredConstructor(String.class);
    System.out.println(con4);
  }
}
```

### 17.3 暴力反射

```java
Class clazz = Class.forName("com.itheima.a02reflectdemo1.Student");
//2.获取有参构造方法
Constructor con = clazz.getDeclaredConstructor(String.class, int.class);
//3.临时修改构造方法的访问权限（暴力反射）
con.setAccessible(true);
//4.直接创建对象
Student stu = (Student) con.newInstance("zhangsan", 23);
```

### 17.4 获取成员变量

规则：

​	get表示获取

​	Declared表示私有

​	最后的s表示所有，复数形式

​	如果当前获取到的是私有的，必须要临时修改访问权限，否则无法使用

方法名：

| 方法名                                  | 说明                                         |
| --------------------------------------- | -------------------------------------------- |
| `Field[] getFields()    `               | 返回所有成员变量对象的数组（只能拿public的） |
| ` Field[] getDeclaredFields()  `        | 返回所有成员变量对象的数组，存在就能拿到     |
| ` Field getField(String name)     `     | 返回单个成员变量对象（只能拿public的）       |
| `Field getDeclaredField(String name)` ` | 返回单个成员变量对象，存在就能拿到           |

### 17.5 获取成员变量并获取值和修改值

| 方法                                  | 说明   |
| ------------------------------------- | ------ |
| `void set(Object obj, Object value）` | 赋值   |
| ` Object get(Object obj)    `         | 获取值 |

```java
public class ReflectDemo5 {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, IllegalAccessException {
    Student s = new Student("zhangsan",23,"广州");
    Student ss = new Student("lisi",24,"北京");

    //需求：
    //利用反射获取成员变量并获取值和修改值

    //1.获取class对象
    Class clazz = Class.forName("com.itheima.reflectdemo.Student");

    //2.获取name成员变量
    //field就表示name这个属性的对象
    Field field = clazz.getDeclaredField("name");
    //临时修饰他的访问权限
    field.setAccessible(true);

    //3.设置(修改)name的值
    //参数一：表示要修改哪个对象的name？
    //参数二：表示要修改为多少？
    field.set(s,"wangwu");

    //3.获取name的值
    //表示我要获取这个对象的name的值
    String result = (String)field.get(s);

    //4.打印结果
    System.out.println(result);

    System.out.println(s);
    System.out.println(ss);

  }
}


public class Student {
  private String name;
  private int age;
  public String gender;
  public String address;


  public Student() {
  }

  public Student(String name, int age, String address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }


  public Student(String name, int age, String gender, String address) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.address = address;
  }

  /**
     * 获取
     * @return name
     */
  public String getName() {
    return name;
  }

  /**
     * 设置
     * @param name
     */
  public void setName(String name) {
    this.name = name;
  }

  /**
     * 获取
     * @return age
     */
  public int getAge() {
    return age;
  }

  /**
     * 设置
     * @param age
     */
  public void setAge(int age) {
    this.age = age;
  }

  /**
     * 获取
     * @return gender
     */
  public String getGender() {
    return gender;
  }

  /**
     * 设置
     * @param gender
     */
  public void setGender(String gender) {
    this.gender = gender;
  }

  /**
     * 获取
     * @return address
     */
  public String getAddress() {
    return address;
  }

  /**
     * 设置
     * @param address
     */
  public void setAddress(String address) {
    this.address = address;
  }

  public String toString() {
    return "Student{name = " + name + ", age = " + age + ", gender = " + gender + ", address = " + address + "}";
  }
}

```

