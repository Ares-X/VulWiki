---
cnvd: "CNVD-2022-23942"
source: "MrWQ/vulnerability-paper"
product: "Spring Framework / Spring4Shell"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2022-23942"
referenced_identifiers: "CVE-2022-22965"
identifier_role: "primary"
identifier_status: "unknown"
title: "Spring框架远程命令执行漏洞复现及分析"
prerequisites: "来源所述条件，未列明部分仍待核：写低于 5.3.18/5.2.20，最终却用仅 JDK9+Spring 判定；未限定具体部署与绑定入口"
side_effects: "未执行；本文需注意的操作影响：临时黑名单不应覆盖原有安全配置；全局 InitBinder 直接 setDisallowedFields 可能替换应用原有列表，且部分模式含误插空格"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/RN5UCYtVNvszudjL1mztsg"
id: "vw-8a79126b998f3c4e86204c5c"
entity_id: "ve-8a79126b998f3c4e86204c5c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：写低于 5.3.18/5.2.20，最终却用仅 JDK9+Spring 判定；未限定具体部署与绑定入口

代码与实验材料：大量“如下图/请求”位置空白，关键攻击包、链和结果图缺失；容器启动名称不一致

来源证据范围：有微信原稿，缺官方公告和 CVE 结构映射

- **结论使用边界（1）**：排查结论扩大为所有 JDK9+Spring；依据：综合判断只有 JDK&gt;=9、使用 Spring 两项，忽略已知 Tomcat WAR 数据绑定链，产生大量误报。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：修复时间线内部冲突；依据：前文给 5.3.18/5.2.20 作为阈值，末尾仍说目前官方无补丁。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：环境命令不能对应运行；依据：pull vulfocus/spring-core-rce-2022-03-29，run 却用 vulnerable-app 未说明重命名或构建。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：复现正文实质缺失；依据：“完整利用链”“POST 数据包”“Webshell 执行 id”后均无载荷或对应图片链接。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（5）**：临时黑名单不应覆盖原有安全配置；依据：全局 InitBinder 直接 setDisallowedFields 可能替换应用原有列表，且部分模式含误插空格。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring框架远程命令执行漏洞复现及分析

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/RN5UCYtVNvszudjL1mztsg)

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/XwsrahE41AbuvviceVHjHOevlGiawNtp4NYRA1NsspxLfeYdcPo1GticwYSAdXy52wP9Ficj1aWibKGgwQDVgjkiak0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**Spring框架远程命令执行漏洞复现及分析**

**漏**

**洞**

**概**

**述**

2022年3月30日，Spring框架曝出RCE 0day漏洞，国家信息安全漏洞共享平台（CNVD）已收录了Spring框架远程命令执行漏洞（CNVD-2022-23942），考虑到Spring框架的广泛应用，漏洞被评级为危险。

通过该漏洞可写入webshell，可命令执行。在Spring框架的JDK9版本(及以上版本)中，远程攻击者可在满足特定条件的基础上，通过框架的参数绑定功能获取AccessLogValve对象并诸如恶意字段值，从而触发pipeline机制并写入任意路径下的文件。

漏洞触发条件如下：

1.使用JDK9及以上版本的Spring MVC框架；

2.Spring框架以及衍生的框架spring-beans-*.jar文件或者存在CachedIntrospectionResults.class

漏洞影响版本如下：

jdk版本在9及以上的使用了版本低于5.3.18和5.2.20的Spring框架或其衍生框架构建的网站或应用。



  

**漏**

**洞**

**复**

**现**

使用docker搭建SpringCore RCE测试环境，这里使用vulfocus提供的，大概几百M。

docker pull vulfocus/spring-core-rce-2022-03-29:latest，在8888端口上开启spring，环境中要基于tomcat，这里tomcat是Spring自带的中间件。

docker run -p 8888:8080 --name vulnerable-app vulnerable-app



直接访问docker中的测试环境，返回ok，证明系统启动成功。



通过网上公布的POC，主要是利⽤class对象构造利⽤链，对Tomcat的日志配置进行修改，然后，向⽇志中写⼊shell。

利用方法非常简单，该漏洞真的是⼀个核弹级别的漏洞，因为，我们很简单的就可以获取到class对象，那剩下的就是利⽤这个class对象构造利⽤链，修改Tomcat的⽇志配置，向⽇志中写⼊shell。⼀条完整的利⽤链如下：



利⽤链是⼀个修改Tomcat⽇志配置操作，再利⽤⽇志写入shell。

具体的攻击步骤如下，先后发送以上5个利用链的请求，我这里使用POST一次发送，因为，分布依次发送，有时会导致Spring出问题，系统出错。

发送POST数据包如下：

数据包格式Content-Type:application/x-www-form-urlencoded。





成功写入shell到网站根目录，如下图所示：



进一步写入webshell到网站根目录，POST数据包如下：



Webshell执行id命令





  

**排**

**查**

**方**

**法**

  

**(一)JDK版本号排查**

在业务系统的运行服务器上，执行“java -version”命令查看运行的JDK版本，如果版本号小于等于8，则不受漏洞影响。

**(二)Spring框架使用情况排查**

1.如果业务系统项目以war包形式部署，按照如下步骤进行判断。

（1）解压war包：将war文件的后缀修改成.zip ,解压zip文件。

（2）在解压缩目录下搜索是否存在 spring-beans-*.jar 格式的jar文件（例如spring-beans-5.3.16.jar）,如存在则说明业务系统使用了spring框架进行开发。

（3）如果spring-beans-*.jar 文件不存在，则在解压缩目录下搜索CachedIntrospectionResuLts.class 文件是否存在，如存在则说明业务系统使用了Spring框架开发。 

2.如果业务系统项目以jar包形式直接独立运行，按照如下步骤进行判断。

（1）解压jar包：将jar文件的后缀修改成.zip,解压zip文件。

（2）在解压缩目录下搜索是否存在spring-beans-*.jar 格式的jar文件（例如spring-beans-5.3.16.jar）,如存在则说明业务系统使用了spring框架进行开发。

（3）如果spring-beans-*.jar 文件不存在，则在解压缩目录下搜索CachedIntrospectionResuLts.class 文件是否存在，如存在则说明业务系统使用了spring框架进行开发。

**(三)综合判断**

在完成以上两个步骤排查后，同时满足以下两个条件可确定受此漏洞影响：

1.JDK版本号在9及以上的；

2.使用了spring框架或衍生框架。

  



  

**安**

**全**

**建**

**议**

  

目前，Spring官方无官方补丁，建议采用以下二个临时方案进行防护，并及时关注官方补丁发布情况，按官方补丁修复漏洞。

**(一）WAF防护**

在WAF等网络防护设备上，根据实际部署业务的流量情况，实现对“class.*”“Class.*”“*.class.*”“*.Class.*”等字符串的规则过滤，并在部署过滤规则后，对业务运行情况进行测试，避免产生额外影响。

**(二）临时修复措施**

需同时按以下两个步骤进行漏洞的临时修复:

1.在应用中全局搜索@InitBinder注解，看看方法体内是否调用dataBinder.setDisallowedFields方法，如果发现此代码片段的引入，则在原来的黑名单中，添加{"class.*","Class. *","*. class.*", "*.Class.*"}。(注:如果此代码片段使用较多,需要每个地方都追加)

2. 在应用系统的项目包下新建以下全局类，并保证这个类被Spring 加载到(推荐在Controller 所在的包中添加).完成类添加后，需对项目进行重新编译打包和功能验证测试。并重新发布项目。

```
import org.springframework.core.annotation.Order;

import org.springframework.web.bind.WebDataBinder;

import org.springframework.web.bind.annotation.ControllerAdvice;

import org.springframework.web.bind.annotation.InitBinder;

@ControllerAdvice

@Order(10000)

public class a{

@InitBinder

public void setAllowedFields(WebDataBinder dataBinder) {

String[] abd = new String[]{"class.*", "Class.*", "*.class.*", "*.Class.*"};

dataBinder.setDisallowedFields(abd);

}

}
```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
