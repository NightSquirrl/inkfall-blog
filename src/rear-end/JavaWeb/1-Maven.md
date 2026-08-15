---
title: 😤 1.Maven
tag:
  - Maven
  - JavaWeb
# recommend: 1
---

## 1. 初识 Maven

> 🤔网站:
>
> Maven 官网:https://maven.apache.org/
>
> Maven 仓库https://mvnrepository.com/

### 1.1 什么是 Maven

Maven是Apache旗下的一个开源项目，是一款用于管理和构建java项目的工具。

官网:https://maven.apache.org/

### 1.2 Maven的作用

使用Maven能够做什么呢？

1. 依赖管理
2. 统一项目结构
3. 项目构建

#### 依赖管理 ：

​	方便快捷的管理项目依赖的资源(jar包)，避免版本冲突问题

当使用maven进行项目依赖(jar包)管理，则很方便的可以解决这个问题。     我们只需要在maven项目 的pom.xml文件中，添加一段如下图所示的配置即可实现。

#### 统一项目结构:

> 使用不同的工具创建项目,创建出的项目结构是不一样的.

- 提供标准、统一的项目结构

#### 项目构建 :

- maven提供了标准的、跨平台(Linux、Windows、MacOS) 的自动化项目构建方式

- 而Maven提供了一套简单的命令来完成项目构建。

## 2. Maven 概述

### 2.1  **Maven**模型

项目对象模型 (Project Object Model)

依赖管理模型(Dependency)

构建生命周期/阶段(Build lifecycle & phases)

1.  构建生命周期/阶段(Build lifecycle & phases)

![image-20231117193904551](https://img.picgo.net/2023/11/17/image-20231117193904551fd04609b4a1e1ad2.png)

以上图中紫色框起来的部分，就是用来完成标准化构建流程 。当我们需要编译，Maven提供了一个编译插件供我们使用；当我们需要打包，Maven就提供了一个打包插件供我们使用等。

2. 项目对象模型 (Project Object Model)

   ![image-20231117193943836](https://img.picgo.net/2023/11/17/image-202311171939438362c7053d574585634.png)

以上图中紫色框起来的部分属于项目对象模型，就是将我们自己的项目抽象成一个对象模型，有自己专属的坐标，如下图所示是一个Maven项目：

![image-20231117194013293](https://img.picgo.net/2023/11/17/image-20231117194013293d10d4266fce5cf08.png)

> 坐标，就是资源(jar包)的唯一标识，通过坐标可以定位到所需资源(jar包)位置

![image-20231117194035429](https://img.picgo.net/2023/11/17/image-202311171940354294a52e2feec6af267.png)

3.  依赖管理模型(Dependency)

![image-20231117194058523](https://img.picgo.net/2023/11/17/image-20231117194058523ef0e9bde5913f16f.png)

以上图中紫色框起来的部分属于依赖管理模型，是使用坐标来描述当前项目依赖哪些第三方jar包

![image-20231117194117433](https://img.picgo.net/2023/11/17/image-20231117194117433ba78e147561a7048.png)

之前我们项目中需要jar包时，直接就把jar包复制到项目下的lib目录，而现在书写在pom.xml文件中的坐标又是怎么能找到所要的jar包文件的呢？

> 答案：Maven仓库

### 2.2 Maven 仓库

仓库：用于存储资源，管理各种jar包

> 仓库的本质就是一个目录(文件夹)，这个目录被用来存储开发中所有依赖(就是jar包)和插件

Maven仓库分为：

本地仓库：自己计算机上的一个目录(用来存储jar包)

中央仓库：由Maven团队维护的全球唯一的。仓库地址：**https://repo1.maven.org/maven****2/**

远程仓库(私服)：一般由公司团队搭建的私有仓库

当项目中使用坐标引入对应依赖jar包后，首先会查找本地仓库中是否有对应的jar包如果有，则在项目直接引用如果没有，则去中央仓库中下载对应的jar包到本地仓库如果还可以搭建远程仓库(私服)，将来jar包的查找顺序则变为： 本地仓库 --> 远程仓库--> 中央仓库

### 2.3 Maven 安装

下载地址：**https://maven.apache.org/download.cgi**

> Window

Maven安装配置步骤：

1. 解压安装

2. 配置仓库
   1. 在解压的文件夹中 bin 的同级目录新建文件夹 mvn_repo,用来存储依赖的 jar
   2. 进入到conf目录下修改settings.xml配置文件
   3. 使用超级记事本软件，打开settings.xml文件，定位到53行 // 主要是用来指定本地仓库的位置
   4.  复制标签，粘贴到注释的外面（55行）
   5.  复制之前新建的用来存储jar包的路径，替换掉标签体内容

3. 配置Maven环境变量 
   1. Maven环境变量的配置类似于JDK环境变量配置一样
   2.  在系统变量处新建一个变量MAVEN_HOME
      1. MAVEN_HOME环境变量的值，设置为maven的解压安装目录
   3. 在Path中进行配置
      1. PATH环境变量的值，设置为：%MAVEN_HOME%\bin
   4. 打开DOS命令提示符进行验证，出现如图所示表示安装成功
      1. mvn -v
4. **配置阿里云私服**

由于中央仓库在国外，所以下载jar包速度可能比较慢，而阿里公司提供了一个远程仓库，里面基本也都有开源项目的jar包。

进入到conf目录下修改settings.xml配置文件：

1). 使用超级记事本软件，打开settings.xml文件，定位到160行左右

2). 在标签下为其添加子标签，内容如下：

```tex
<mirror> <id>alimaven</id> <name>aliyun maven</name> <url>http://maven.aliyun.com/nexus/content/groups/public/</url> <mirrorOf>central</mirrorOf>
</mirror>
```

> 注: 只可配置一个(另一个要注释!) ，不然两个可能发生冲突，导致jar包无法下载!!!!!!!

![image-20231117194714607](https://img.picgo.net/2023/11/17/image-202311171947146078242b254f2012bf2.png)

## 3. IDEA 集成 Maven

### 3.1 **配置****Maven**环境

#### 3.1.1 **当前工程设置**

1、选择 IDEA中 File => Settings => Build,Execution,Deployment => Build Tools => Maven

![image-20231117195031711](https://img.picgo.net/2023/11/17/image-202311171950317116b778f277a0911fe.png)

2、设置IDEA使用本地安装的Maven，并修改配置文件及本地仓库路径

![image-20231117195057280](https://img.picgo.net/2023/11/17/image-20231117195057280936f456bd67d5ff7.png)

> Maven home path ：指定当前Maven的安装目录
>
> User settings file ：指定当前Maven的settings.xml配置文件的存放路径
>
> Local repository ：指定Maven的本地仓库的路径 (如果指定了settings.xml, 这个目录会自动读取出来, 可以不用手动指定) 

3、配置工程的编译版本为11

Maven默认使用的编译版本为5（版本过低）

![image-20231117195206726](https://img.picgo.net/2023/11/17/image-2023111719520672699d35486f53bda00.png)

上述配置的maven环境，只是针对于当前工程的，如果我们再创建一个project，又恢复成默认的配置了。 要解决这个问题， 我们就需要配置全局的maven环境。

#### 3.1.2 **全局设置**

1、进入到IDEA欢迎页面

- 选择 IDEA中 File => close project
- 进入全局配置界面
- ![image-20231117195307144](https://img.picgo.net/2023/11/17/image-2023111719530714431b35baaf4e1486b.png)

2、打开 All settings , 选择 Build,Execution,Deployment => Build Tools => Maven

![image-20231117195327952](https://img.picgo.net/2023/11/17/image-202311171953279522820038298d5cdd7.png)

3、配置工程的编译版本为11

![image-20231117195349546](https://img.picgo.net/2023/11/17/image-20231117195349546bd68ad7f8c1b797d.png)

这里所设置的maven的环境信息，并未指定任何一个project，此时设置的信息就属于全局配置信息。以后，我们再创建project，默认就是使用我们全局配置的信息

### 3.2 **Maven****项目**

#### 3.2.1 **创建****Maven**项目

1、创建一个空项目

![image-20231117195503776](https://img.picgo.net/2023/11/17/image-20231117195503776bb2ca17c57a07e93.png)

![image-20231117195517246](https://img.picgo.net/2023/11/17/image-20231117195517246c1f4b4687e8a23fd.png)

2、创建模块，选择Maven，点击Next

![image-20231117195547102](https://img.picgo.net/2023/11/17/image-20231117195547102cd517adaa2ceb7da.png)

![image-20231117195607604](https://img.picgo.net/2023/11/17/image-20231117195607604d57ac6cc3fa495ad.png)

3、填写模块名称，坐标信息，点击finish，创建完成

![image-20231117195630300](https://img.picgo.net/2023/11/17/image-202311171956303007adf3f84a1328aa2.png)

4、在Maven工程下，创建HelloWorld类

> Maven项目的目录结构:
>
> maven-project01
>
> ​	|--- src (源代码目录和测试代码目录)
>
>  		|--- main (源代码目录)
>			
>  			|--- java (源代码java文件目录)
>			
>  			|--- resources (源代码配置文件目录)
>			
>  		|--- test (测试代码目录)
>
> ​			 |--- java (测试代码java目录)
>
> ​			 |--- resources (测试代码配置文件目录)
>
> |--- target (编译、打包生成文件存放目录) 

#### 3.2.2 **POM**配置详解

POM (Project Object Model) ：指的是项目对象模型，用来描述当前的maven项目。

- 使用pom.xml文件来实现

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                               http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- POM模型版本 -->
    <modelVersion>4.0.0</modelVersion>
    <!-- 当前项目坐标 -->
    <groupId>com.itheima</groupId> <artifactId>maven_project1</artifactId> <version>1.0-SNAPSHOT</version>
    <!-- 打包方式 -->
    <packaging>jar</packaging>
  </project>
  ```

pom文件详解：

- pom文件的根标签，表示当前maven项目

- 声明项目描述遵循哪一个POM模型版本
  - 虽然模型本身的版本很少改变，但它仍然是必不可少的。目前POM模型版本是4.0.0

- 坐标 ：
  - 定位项目在本地仓库中的位置，由以上三个标签组成一个坐标

- maven项目的打包方式，通常设置为jar或war（默认值：jar） 

3.2.3  **Maven**坐标详解

什么是坐标？

- Maven中的坐标是 资源的唯一标识 , 通过该坐标可以唯一定位资源位置

- 使用坐标来定义项目或引入项目中需要的依赖

Maven坐标主要组成

- groupId：定义当前Maven项目隶属组织名称（通常是域名反写，例如：com.itheima）

- artifactId：定义当前Maven项目名称（通常是模块名称，例如 order-service、goodsservice）

- version：定义当前项目版本号

如下图就是使用坐标表示一个项目：

![image-20231117200108886](https://img.picgo.net/2023/11/17/image-20231117200108886c65e9a9ec96f5286.png)

**注意：**

​	上面所说的资源可以是插件、依赖、当前项目。

​	我们的项目如果被其他的项目依赖时，也是需要坐标来引入的。

### 3.3 **导入****Maven****项目**

方式**1：使用Maven面板，快速导入项目**

打开IDEA，选择右侧Maven面板，点击 + 号，选中对应项目的pom.xml文件，双击即可

![image-20231117200236974](https://img.picgo.net/2023/11/17/image-2023111720023697483efc30393418e37.png)

> 说明：如果没有Maven面板，选择 View => Appearance => Tool Window Bars
>
> ![image-20231117200259470](https://img.picgo.net/2023/11/17/image-20231117200259470b80c4972ea3f9898.png)

方式2:使用 idea 导入模块项目

File => Project Structure => Modules => + => Import Module

![image-20231117200340571](https://img.picgo.net/2023/11/17/image-202311172003405712504e682ff5e155d.png)

找到要导入工程的pom.xml

![image-20231117200357162](https://img.picgo.net/2023/11/17/image-20231117200357162a6497124c05c3d42.png)

![image-20231117200408679](https://img.picgo.net/2023/11/17/image-2023111720040867993a6e67067a7186c.png)

## 4. 依赖管理

### 4.1 **依赖配置**

依赖：指当前项目运行所需要的jar包。一个项目中可以引入多个依赖：

例如：在当前工程中，我们需要用到logback来记录日志，此时就可以在maven工程的pom.xml文件中，引入logback的依赖。具体步骤如下：

1. 在pom.xml中编写标签

2. 在标签中使用引入坐标

3. 定义坐标的 groupId、artifactId、version

```xml
<dependencies>
  <!-- 第1个依赖 : logback -->
  <dependency> <groupId>ch.qos.logback</groupId> <artifactId>logback-classic</artifactId> <version>1.2.11</version>
  </dependency>
  <!-- 第2个依赖 : junit -->
  <dependency> <groupId>junit</groupId>
    <artifactId>junit</artifactId> <version>4.12</version>
  </dependency>
</dependencies>
```

4. 点击刷新按钮，引入最新加入的坐标
   1. 刷新依赖：保证每一次引入新的依赖，或者修改现有的依赖配置，都可以加入最新的坐标

![image-20231117200534995](https://img.picgo.net/2023/11/17/image-20231117200534995a351abe86547a79c.png)

> 注意事项：
>
> 1. 如果引入的依赖，在本地仓库中不存在，将会连接远程仓库 / 中央仓库，然后下载依赖
>
> （这个过程会比较耗时，耐心等待）
>
> 2. 如果不知道依赖的坐标信息，可以到mvn的中央仓库
>
>    （**https://mvnrepository.com/**）中搜索

### 4.2 **依赖传递**

#### **4.2.1** **依赖具有传递性**

早期我们没有使用maven时，向项目中添加依赖的jar包，需要把所有的jar包都复制到项目工程下。如下图所示，需要logback-classic时，由于logback-classic又依赖了logback-core和slf4j，所以必须把这3个jar包全部复制到项目工程下



我们现在使用了maven，当项目中需要使用logback-classic时，只需要在pom.xml配置文件中，添加logback-classic的依赖坐标即可。

![image-20231117200808248](https://img.picgo.net/2023/11/17/image-2023111720080824898395c2924d10851.png)

在pom.xml文件中只添加了logback-classic依赖，但由于maven的依赖具有传递性，所以会自动把所依赖的其他jar包也一起导入。

依赖传递可以分为：

1. 直接依赖：在当前项目中通过依赖配置建立的依赖关系

2. 间接依赖：被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源

![image-20231117200904871](https://img.picgo.net/2023/11/17/image-202311172009048717f2d28f0b2c51775.png)

#### **4.2.2** **排除依赖**

问题：之前我们讲了依赖具有传递性。那么A依赖B，B依赖C，如果A不想将C依赖进来，是否可以做到？

答案：在maven项目中，我们可以通过排除依赖来实现。

什么是排除依赖？

排除依赖：指主动断开依赖的资源。（被排除的资源无需指定版本）

```xml
<dependency> <groupId>com.itheima</groupId> <artifactId>maven-projectB</artifactId> <version>1.0-SNAPSHOT</version>
  <!--排除依赖, 主动断开依赖的资源-->
  <exclusions>
    <exclusion> <groupId>junit</groupId> <artifactId>junit</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

### 4.3 **依赖范围**

在项目中导入依赖的jar包后，默认情况下，可以在任何地方使用

如果希望限制依赖的使用范围，可以通过标签设置其作用范围

作用范围：

1. 主程序范围有效（main文件夹范围内）

2. 测试程序范围有效（test文件夹范围内）

3. 是否参与打包运行（package指令范围内）

![image-20231117201102541](https://img.picgo.net/2023/11/17/image-2023111720110254105dfde47404f28d1.png)

如上图所示，给junit依赖通过scope标签指定依赖的作用范围。 那么这个依赖就只能作用在测试环境，其他环境下不能使用。

scope标签的取值范围：

![image-20231117201201529](https://img.picgo.net/2023/11/17/image-20231117201201529bbe85636c9184b75.png)

### 4.4 **生命周期** 

clean：清理工作。

default：核心工作。如：编译、测试、打包、安装、部署等。

site：生成报告、发布站点等。

三套生命周期又包含哪些具体的阶段呢, 我们来看下面这幅图:

![image-20231117201250926](https://img.picgo.net/2023/11/17/image-202311172012509260516e74f57b58832.png)

我们看到这三套生命周期，里面有很多很多的阶段，这么多生命周期阶段，其实我们常用的并不多，主要关注以下几个：

• clean：移除上一次构建生成的文件

• compile：编译项目源代码

• test：使用合适的单元测试框架运行测试(junit)

• package：将编译后的文件打包，如：jar、war等

• install：安装项目到本地仓库

生命周期的顺序是：clean --> validate --> compile --> test --> package -->verify --> install --> site --> deploy

我们需要关注的就是：clean --> compile --> test --> package --> install

> 说明：在同一套生命周期中，我们在执行后面的生命周期时，前面的生命周期都会执行。

> 思考：当运行package生命周期时，clean、compile生命周期会不会运行？
>
> clean不会运行，compile会运行。 因为compile与package属于同一套生命周期，而clean与package不属于同一套生命周期。

#### 执行

在日常开发中，当我们要执行指定的生命周期时，有两种执行方式：

1. 在idea工具右侧的maven工具栏中，选择对应的生命周期，双击执行

2. 在DOS命令行中，通过maven命令执行

```shell
mvn clean
mvn compile
mvn test
mvn package
mvn install
```

### 4.5 **更新依赖索引**

有时候给idea配置完maven仓库信息后，在idea中依然搜索不到仓库中的jar包。这是因为仓库中的jar包索引尚未更新到idea中。这个时候我们就需要更新idea中maven的索引了，具体做法如下：

打开设置----搜索maven----Repositories----选中本地仓库-----点击Update

![image-20231117212044691](https://img.picgo.net/2023/11/17/image-20231117212044691528ef1fb3f9672d6.png)

### 4.6 **清理**maven仓库

初始情况下，我们的本地仓库是没有任何jar包的，此时会从私服去下载（如果没有配置，就直接从中央仓库去下载），可能由于网络的原因，jar包下载不完全，这些不完整的jar包都是以lastUpdated结尾。此时，maven不会再重新帮你下载，需要你删除这些以lastUpdated结尾的文件，然后maven才会再次自动下载这些jar包。

## 2. Maven高级

### 2.1 分模块设计与开发

所谓分模块设计，顾名思义指的就是我们在设计一个 Java 项目的时候，将一个 Java 项目拆分成多个模块进行开发。

![image-20231118211217327](https://img.picgo.net/2023/11/18/image-202311182112173277f56afc415c0e9b5.png)

> **分模块设计就是将项目按照功能****/****结构拆分成若干个子模块，方便项目的管理维护、拓展，也方便模块**键的相互调用、资源共享。**

#### 2.1.1 **实现**

1. **创建**maven**模块** **tlias-pojo**，存放实体类

   ![image-20231118211516056](https://img.picgo.net/2023/11/18/image-2023111821151605618ac32383d1fa8b9.png)

2. 复制实体类到这里

 ![image-20231118211530806](https://img.picgo.net/2023/11/18/image-20231118211530806e6e0e07f6eed4322.png)

3. 引入依赖

```xml
<dependencies>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version>
  </dependency>
</dependencies>
```

> 类似如此将所有的功能全部拆分 

### 2.2 依赖的继承和聚合

#### 2.2.1 **继承**

我们可以再创建一个父工程 tlias-parent ，然后让上述的三个模块 tlias-pojo、tliasutils、tlias-web-management 都来继承这个父工程 。 然后再将各个模块中都共有的依赖，都提取到父工程 tlias-parent中进行配置，只要子工程继承了父工程，依赖它也会继承下来，这样就无需在各个子工程中进行配置了。

```xml
<parent>
  <groupId>...</groupId>
  <artifactId>...</artifactId>
  <version>...</version>
  <relativePath>....</relativePath>
</parent>
```

##### 2.2.1.1  **实现**

1. 创建maven模块 tlias-parent ，该工程为父工程，设置打包方式pom(默认jar)。

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>2.7.5</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
<groupId>com.itheima</groupId>
<artifactId>tlias-parent</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>pom</packaging
```

> Maven打包方式：
>
> jar：普通模块打包，springboot项目基本都是jar包（内嵌tomcat运行）
>
> war：普通web程序打包，需要部署在外部的tomcat服务器中运行
>
> pom：父工程或聚合工程，该模块不写代码，仅进行依赖管理

2.  在子工程的pom.xml文件中，配置继承关系。

```java
<parent>
  <groupId>com.itheima</groupId>
  <artifactId>tlias-parent</artifactId>
  <version>1.0-SNAPSHOT</version>
  <relativePath>../tlias-parent/pom.xml</relativePath>
  </parent>
  <artifactId>tlias-utils</artifactId>
  <version>1.0-SNAPSHOT</version>
```

这里是以 tlias-utils 为例，指定了其父工程。其他的模块，都是相同的配置方式。

> - 在子工程中，配置了继承关系之后，坐标中的groupId是可以省略的，因为会自动继承父工程的 。
>
> - relativePath指定父工程的pom文件的相对位置（如果不指定，将从本地仓库/远程仓库查找该工程）。
>   - ../ 代表的上一级目录

3. 在父工程中配置各个工程共有的依赖（子工程会自动继承父工程的依赖）。

```xml
<dependencies>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version>
  </dependency>
</dependencies>
```

##### 2.2.1.2 **版本锁定**

如果项目中各个模块中都公共的这部分依赖，我们可以直接定义在父工程中，从而简化子工程的配置。然而在项目开发中，还有一部分依赖，并不是各个模块都共有的，可能只是其中的一小部分模块中使用到了这个依赖。

在maven中，可以在父工程的pom文件中通过` <dependencyManagement> `来统一管理依赖版本。

父工程：

​	dependencyManagement中的依赖并不会进行依赖的下载

```xml
<!--统一管理依赖版本-->
<dependencyManagement>
  <dependencies>
    <!--JWT令牌-->
    <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt</artifactId>
      <version>0.9.1</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

子工程：

```xml
<dependencies>
  <!--JWT令牌-->
  <dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
  </dependency>
</dependencies>
```

> - 在父工程中所配置的` <dependencyManagement> `只能统一管理依赖版本，并不会将这个依赖直接引入进来。 这点和 `<dependencies>` 是不同的。
>
> - 子工程要使用这个依赖，还是需要引入的，只是此时就无需指定 `<version> `版本号了，父工程统一管理。变更依赖版本，只需在父工程中统一变更。

##### 2.2.1.3 **属性配置** - 版本的集中管理

1. 自定义属性

```xml
<properties>
 <lombok.version>1.18.24</lombok.version>
</properties>
```

2. 引用属性

```xml
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>${lombok.version}</version>
</dependency>
```

### 2.3 聚合

**聚合：**将多个模块组织成一个整体，同时进行项目的构建。

**聚合工程：**一个不具有业务功能的“空”工程（有且仅有一个pom文件） 【PS：一般来说，继承关系中的父工程与聚合关系中的聚合工程是同一个】

**作用：**快速构建项目（无需根据依赖关系手动构建，直接在聚合工程上构建即可）



#### 2.3.1 实现

在maven中，我们可以在聚合工程中通过 `<moudules>` 设置当前聚合工程所包含的子模块的名称。我们可以在 tlias-parent中，添加如下配置，来指定当前聚合工程，需要聚合的模块：

```xml
<!--聚合其他模块-->
<modules>
  <module>../tlias-pojo</module>
  <module>../tlias-utils</module>
  <module>../tlias-web-management</module>
</modules>
```

### 2.4 私服

#### 2.4.1 **资源上传与下载**

资源上传与下载，我们需要做三步配置，执行一条指令。

第一步配置：在maven的配置文件中配置访问私服的用户名、密码。

第二步配置：在maven的配置文件中配置连接私服的地址(url地址)。

第三步配置：在项目的pom.xml文件中配置上传资源的位置(url地址)。

> 私服仓库说明：
>
> RELEASE：存储自己开发的RELEASE发布版本的资源。
>
> SNAPSHOT：存储自己开发的SNAPSHOT发布版本的资源。
>
> Central：存储的是从中央仓库下载下来的依赖

> 项目版本说明：
>
> - RELEASE(发布版本)：功能趋于稳定、当前更新停止，可以用于发行的版本，存储在私服中的RELEASE仓库中。
>
> - SNAPSHOT(快照版本)：功能不稳定、尚处于开发中的版本，即快照版本，存储在私服的SNAPSHOT仓库中。



1.设置私服的访问用户名/密码（在自己maven安装目录下的conf/settings.xml中的servers中配置）

```xml
<server>
  <id>maven-releases</id>
  <username>admin</username>
  <password>admin</password>
</server>
<server>
  <id>maven-snapshots</id>
  <username>admin</username>
  <password>admin</password>
</server>
```

2. 设置私服依赖下载的仓库组地址（在自己maven安装目录下的conf/settings.xml中的mirrors、profiles中配置）

```xml
<mirror>
  <id>maven-public</id>
  <mirrorOf>*</mirrorOf>
  <url>http://192.168.150.101:8081/repository/maven-public/</url>
</mirror>
```

```xml
<profile>
  <id>allow-snapshots</id>
  <activation>
    <activeByDefault>true</activeByDefault>
  </activation>
  <repositories>
    <repository>
      <id>maven-public</id>
      <url>http://192.168.150.101:8081/repository/mavenpublic/</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>true</enabled>
      </snapshots>
    </repository>
  </repositories>
</profile>
```

3. IDEA的maven工程的pom文件中配置上传（发布）地址(直接在tlias-parent中配置发布地址)

```xml
<distributionManagement>
  <!-- release版本的发布地址 -->
  <repository>
    <id>maven-releases</id>
    <url>http://192.168.150.101:8081/repository/mavenreleases/</url>
  </repository>
  <!-- snapshot版本的发布地址 -->
  <snapshotRepository>
    <id>maven-snapshots</id>
    <url>http://192.168.150.101:8081/repository/mavensnapshots/</url>
  </snapshotRepository>
</distributionManagement>
```

